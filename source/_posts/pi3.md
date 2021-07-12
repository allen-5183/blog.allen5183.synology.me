---
title: 樹莓派製作無線路由器
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2021-02-06 19:05:50
urlname: pi3
author: allen
img:
coverImg:
password:
summary: 
tags:
 - iot
 - wiot
 - pi
categories: iot
---

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'></script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css' />
<script src='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js'></script>

## [樹莓派製作無線路由器](https://kknews.cc/zh-tw/digital/gaq66yl.html)

### 1. 軟體安裝和網絡配置

首先安裝兩個製作無線路由器必需的軟體：

1. hostapd： 該軟體能使無線網卡工作在軟 AP(Access Point)模式，作為無線路由器使用，提供其他無線網卡接入上網；
2. wpa_supplicant： 該軟體是一個連接、配置 WIFI的客戶端軟體，讓無線網卡工作在網卡模式，用來連接無線路由器上網。
3. dnsmasq： 該軟體能夠同時提供 `DHCP` 和 `DNS` 服務；

- 安裝

  ```javascript
  sudo apt update
  sudo apt upgrade
  sudo apt install hostapd dnsmasq
  ```

在最新的樹莓派版本中，所有的網絡接口預設使用 `dhcpd` 程序來進行管理並動態獲取 `IP` 位址。因為 `wlan0` 工作在 `AP` 模式，他要給連上來的客戶端提供 `IP` 位址，這時我們需要靜態配置`IP` 位址，所以先在配置文件 `/etc/dhcpcd.conf` 中最下面添加一行去停用 `wlan0` 的 `DHCP`：

- 修改

  ```javascript
  sudo nano /etc/dhcpcd.conf
  :
  #interface eth0
  #fallback static_eth0
  denyinterfaces wlan0
  ```

接下來我們在 `/etc/network/interfaces` 中靜態配置無線網卡的 `IP` 位址，這裡我們將有線網卡的 `IP` 靜態配置成 `192.168.2.13`，網關配置成我的無線路由器的 `IP` 位址 `192.168.2.1`，這個配置需要根據實際網絡情況來配置，假如樹莓派有線網卡連接的路由器的 LAN 口 IP 位址是 `192.168.0.1`，那麼它的IP位址應該是 `192.168.0.x`，`gateway` 就是路由器的 IP 位址 `192.168.0.1`：

- 修改
  
  ```javascript
  sudo nano /etc/network/interfaces
  
  # interfaces(5) file used by ifup(8) and ifdown(8)
  # Please note that this file is written to be used with dhcpcd
  # For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'
  # Include files from /etc/network/interfaces.d:
    source-directory /etc/network/interfaces.d

  auto lo
  iface lo inet loopback

  auto eth0
  iface eth0 inet static
  address 192.168.67.240
  netmask 255.255.255.0
  gateway 192.168.67.254
  dns-nameservers 8.8.8.8 168.95.1.1
  
  allow-hotplug wlan0
  iface wlan0 inet static
  address 192.168.10.1
  netmask 255.255.255.0
  ```

- 關閉 dhcpd 管理樹莓派網絡服務
  
  ```javascript
  sudo systemctl disable dhcpcd 
  ```

- 使用 `networking` 管理樹莓派網絡服務

  ```javascript
  sudo systemctl enable networking 
  ```

- 重啟生效

  ```javascript
  sudo reboot 
  ```

### 2. 無線路由器相關軟體配置

接下來修改 `hostapd` 程序的配置文件，該配置文件是無線路由器的相關配置，該配置中 `ssid` 選項用來配置路由器 `SSID` 為 `Pi3-AP`， `wpa_passphrase` 用來配置連接無線路由器的密碼為 `raspberry` ，

- 修改 `hostapd` 的啟動配置文件：
  
  ```javascript
  sudo nano /etc/hostapd/hostapd.conf
  
  # 該選項配置 hostapd 監聽樹莓派的無線網卡 wlan0
  interface=wlan0
  # 使用 Linux 內核理的 nl80211 驅動
  driver=nl80211
  # 這裡配置樹莓派的熱點名稱
  ssid=Pi3AP
  # 配置 AP 兼容 802.11g
  hw_mode=g
  # IEEE 802.11b/g標準工作在2.4G頻段，頻率範圍為2.400—2.4835GHz，共83.5M帶寬。劃分為14個子信道，每個子信道寬度為22MHz，相鄰信道的中心頻點間隔5MHz。這裡設置使用頻段6
  channel=6
  # 配置AP兼容 802.11n
  ieee80211n=1
  # 使能 WMM，它是 WiFi 多媒體的縮寫,是 802.11e 標準的一個子集,可以把它看作某種協議或者功能。 wmm 主要是用來優化語音、視頻等多媒體數據流的網絡通信質量。
  wmm_enabled=1
  # 設置IEEE 802.11n 標準支持的各項特性
  ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]
  # 指定 MAC 地址過濾規則。0 表示除非在禁止列表否則同意，1 表示除非在同意列表否則禁止。2 表示使用外部RADIUS伺服器
  macaddr_acl=0
  # auth_algs指定採用哪種認證算法，採用位域（bit fields）方式來指定
  auth_algs=1
  # 加入此配置項後重啟啟動 wifi 熱點模塊即可很方便的隱藏 SSID,如需不隱藏則將設置為 0
  ignore_broadcast_ssid=0
  # 使用 WPA2 認證方式
  wpa=2
  # 使用WPA2-PSK
  wpa_key_mgmt=WPA-PSK
  # 設置連接該WiFi的密碼
  wpa_passphrase=raspberry
  # 使用安全性能更高的AES加密，而不是TKIP
  rsn_pairwise=CCMP
  ```

- 修改 `hostapd` 的啟動配置文件，讓系統啟動時能夠找到 `hostapd` 的配置文件：

  ```javascript
  sudo nano /etc/default/hostapd

  # Defaults for hostapd initscript  
  #
  # See /usr/share/doc/hostapd/README.Debian for information about alternative
   methods of managing hostapd.
  #
  # Uncomment and set DAEMON_CONF to the absolute path of a hostapd configuration
  # file and hostapd will be started during system boot. An example configuration
  # file can be found at /usr/share/doc/hostapd/examples/hostapd.conf.gz
  #

  DAEMON_CONF="/etc/hostapd/hostapd.conf"

  # Additional daemon options to be appended to hostapd command:-
  # -d show more debug messages (-dd for even more)
  # -K include key data in debug messages
  # -t include timestamps in some debug messages
  #
  # Note that -B (daemon mode) and -P (pidfile) options are automatically
  # configured by the init.d script and must not be added to DAEMON_OPTS.
  #
  #DAEMON_OPTS=""
  ```

- 這時候，可以使用下面命令啟動測試 `hostapd`

- 測試

  `sudo hostapd -B /etc/hostapd/hostapd.conf`

  Configuration file: /etc/hostapd/hostapd.conf
  Failed to create interface mon.wlan0: -95 (Operation not supported) 不用關心這個錯誤
  wlan0: Could not connect to kernel driver
  Using interface wlan0 with hwaddr b8:27:eb:e1:95:c3 and ssid "Pi3-AP"
  wlan0: interface state UNINITIALIZED->ENABLED
  wlan0: AP-ENABLED

- 啟動 `hostapd`

  ```javascript
  sudo systemctl unmask hostapd
  sudo systemctl enable hostapd
  sudo systemctl start hostapd
  ```

  通過筆記本或電腦會發現 無線AP Pi3-AP，但是連接不上，這是因為樹莓派的無線網卡並沒有開啟 `DHCP` 和 `DNS`伺服器，接下來我們配置 `dnsmasq`。

- 配置 `dnsmasq`

  ```javascript
  sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
  sudo nano /etc/dnsmasq.conf

  # Configuration file for dnsmasq.
  #
  # Format is one option per line, legal options are the same
  # as the long options legal on the command line. See
  # "/usr/sbin/dnsmasq --help" or "man 8 dnsmasq" for details.

  # Use interface wlan0
  interface=wlan0

  # Explicitly specify the address to listen on
  listen-address=192.168.10.1

  # Bind to the interface to make sure we aren't sending things elsewhere
  bind-interfaces

  # Forward DNS requests to 114DNS
  server=8.8.8.8

  # Don't forward short names
  domain-needed

  # Never forward addresses in the non-routed address spaces.
  bogus-priv

  # Assign IP addresses between 192.168.10.100 and 192.168.10.200 with a 12 hour lease time
  dhcp-range=192.168.10.100,192.168.10.200,24h

  #log-queries
  #log-facility=/var/log/dnsmasq.log
  ```

- 啟動  
  
  `sudo service dnsmasq restart`
  
開啟 `DHCP` 和 `DNS` 服務之後，我們的電腦可以獲取 `IP` 位址，並連接到樹莓派上，但是電腦還是不能上網。這時我們需要開啟 `Linux` 的內核的 `IP` 轉發以及使用 `iptables` 做 `NAT` 表，讓無線網卡的數據通過有線網卡轉發出去。

- 開啟 Linux 內核的 IP 轉發功能：

  `sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"`

- 開啟樹莓派有線網卡和無線網卡的轉發功能：

  不管現在 `eth0` 的出口獲得了怎樣的動態 `ip`，`MASQUERADE` 會自動讀取 `eth0` 現在的 `ip` 地址然後做`SNAT` 出去這樣就實現了很好的動態 `SNAT` 地址轉換：

  ```javascript
  sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
  sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
  sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
  ```

  這時候筆記本或手機再連上樹莓派上，就可以上網了。當然，由於上面命令都是手動執行的，樹莓派上電後，並不會執行他們，這時我們需要進行一些配置，讓系統啟動後就生效：

- 保存當前的防火牆策略到配置文件中：
  
  `sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"`

- 修改系統啟動腳本，添加啟動任務：
  
  ```javascript
  sudo nano /etc/rc.local

  sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
  iptables-restore < /etc/iptables.ipv4.nat

  exit 0
  ```

- 然後重啟生效：

  `sudo reboot`

接下來我們的電腦就可以連到樹莓派上上網了。

### 樹莓派切換回網卡模式

在做完無線路由器模式後，如果需要把樹莓派切換回網卡模式連接無線路由器上網，則可以進行如下修改：

首先取消無線路由器的靜態 `IP` 位址配置，並使能 `wpa_supplicant` 軟體：

- 修改
  
  ```javascript
  sudo vim /etc/network/interfaces

  # interfaces(5) file used by ifup(8) and ifdown(8)
  # Please note that this file is written to be used with dhcpcd
  # For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'
  # Include files from /etc/network/interfaces.d:
  source-directory /etc/network/interfaces.d

  auto lo
  iface lo inet loopback
  auto eth0
  iface eth0 inet dhcp

  # wpa_supplicant station mode
  allow-hotplug wlan0
  iface wlan0 inet dhcp
   wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

  # hostapd AP mode
  #allow-hotplug wlan0
  #iface wlan0 inet static
  #address 192.168.10.1
  #netmask 255.255.255.0
  ```

- 取消 `iptables` 路由轉發默認啟動：

  ```javascript
  sudo vim /etc/rc.local

  #!/bin/sh -e
  #
  # rc.local
  #
  # This script is executed at the end of each multiuser runlevel.
  # Make sure that the script will "exit 0" on success or any other
  # value on error.
  #
  # In order to enable or disable this script just change the execution
  # bits.
  #
  # By default this script does nothing.
  # Print the IP address
  _IP=$(hostname -I) || true
  if [ "$_IP" ]; then
   printf "My IP address is %s\n" "$_IP"
  fi

  #sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
  #iptables-restore < /etc/iptables.ipv4.nat

  exit 0
  ```

- 停止 `hostapd` 服務，啟動 `wpa_supplicant` 服務

  ```javascript
  sudo systemctl disable hostapd.service
  sudo systemctl enable wpa_supplicant.service
  sudo reboot
  ```

---

## [安裝 RaspAP 無線基地台](https://kknews.cc/zh-tw/digital/gaq66yl.html)

## 安裝 `UV4L`

`curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -`

- 編輯

  ```bash
  sudo nano /etc/apt/sources.list
  deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main
  ``

- 安裝樹莓派攝像頭模組的 `uv4l`

  ```bash
  sudo apt-get update
  sudo apt-get install uv4l uv4l-raspicam

- 如要開機自動執行，安裝以下：

  `sudo apt-get install uv4l-raspicam-extras`

  >可由以下指令重啟 `uv4l`
   sudo service uv4l_raspicam restart

- 設定 GPU 有 256MB(建議)

- 更新樹莓派韌體：
  `sudo rpi-update`

- 安裝以下套件

  ```bash
  sudo apt-get install uv4l-server uv4l-uvc uv4l-xscreen uv4l-mjpegstream uv4l-dummy uv4l-raspidisp
  sudo apt-get install uv4l-webrtc
  ```

## 安裝 opencv 3.4.3

1. 硬體: `Pi 3 Model B`
2. 系統更新

   ```bash
   sudo apt-get update
   sudo apt-get dist-upgrade
   ```

3. 安裝有助於編譯的小工具：

   ```bash
   sudo apt-get install screen
   sudo apt-get install htop
   ```

4. 安裝以下

   ```bash
   sudo apt-get install build-essential cmake pkg-config
   sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
   sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
   sudo apt-get install libxvidcore-dev libx264-dev
   sudo apt-get install libgtk2.0-dev libgtk-3-dev
   sudo apt-get install libatlas-base-dev gfortran
   ```

5. 下載 `OpenCV3.4.3` 並解壓

   ```bash
   wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.3.zip
   wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.3.zip
   unzip opencv.zip
   unzip opencv_contrib.zip
   ```

6. 安裝以下工具：

   `sudo pip install numpy scipy`

7. 開始編譯：

   ```bash
   cd ~/opencv-3.4.3/
   mkdir build
   cd build

   cmake -D CMAKE_BUILD_TYPE=RELEASE \
       -D CMAKE_INSTALL_PREFIX=/usr/local \
       -D INSTALL_PYTHON_EXAMPLES=ON \
       -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-3.4.3/modules \
       -D BUILD_EXAMPLES=ON ..

   make -j4
   ```

8. 安裝編譯好的檔案後重開機

   ```bash
   sudo make install
   #執行指令更新程式庫：
   sudo ldconfig
   sudo apt-get update
   sudo reboot
   ```

9. 測試是否安裝完成

   ```bash
   python3
   import cv2
   cv2.__version__
   ```

10. 若成功安裝會看到版本訊息

    `'3.4.3'`








<a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210602102127.png'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210602102127_s.png' class="nofancybox  img-center" /></a>

