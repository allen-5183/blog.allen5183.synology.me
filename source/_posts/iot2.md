---
title: 物聯網綜合應用(二)
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2021-06-02 12:23:55
urlname: iot
author: allen
img:
coverImg:
password:
summary:
tags: 
- iot
- wiot
categories:
- iot
---
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'></script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css' />
<script src='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js'></script>

## 0. 課程準備

1. [雲端硬碟](https://drive.google.com/drive/folders/1YhOhREq4PmGqmGdS4rLc_dzmm0w92UTs?usp=sharing)
2. [生活智慧屋展示](https://www.youtube.com/embed/zvrGOu8QFSo)
   <br>
   <iframe width="560" height="315" src="https://www.youtube.com/embed/zvrGOu8QFSo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
3. [講義](https://drive.google.com/file/d/1EYgZEVWCqUnCRPuZ4-5JPg1hLfFeTPQs/view?usp=sharing)

## 1. 硬體建置
### 1.1 配線圖
- 樹莓派腳位圖

  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210602102127.png'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210602102127_s.png' class="nofancybox  img-center" /></a>

- 樹莓派與其他裝置連接腳位圖

  |PI3 B+ 腳位  | PI3 B+ 功能描述|其他裝置腳位 
  |:------------|:---------------|:----------------
  PI3 B+ 18   |GPIO 24           |Buzzer I/O
  PI3 B+ 2    |5V Power          |Buzzer VCC、SG 900 VCC(紅)
  PI3 B+ 6    |GND               |Buzzer GND、SG 900 GND(褐)
  PI3 B+ 11   |GPIO 17           |DHT 11 Out
  PI3 B+ 4    |5V Power          |DHT +
  PI3 B+ 20   |GND               |DHT - 
  PI3 B+ 12   |GPIO 18 PCM_CLK   |SG 900 訊號(橘)
  PI3 B+ 37   |GPIO 26           |RELAY IN1
  PI3 B+ 13   |GPIO 27           |RELAY IN2
  PI3 B+ 15   |GPIO 22           |RELAY IN3
  PI3 B+ 16   |GPIO 23           |RELAY IN4
  PI3 B+ 24   |GPIO  8 SPIO_CE0_N|RFID RC522 SDA
  PI3 B+ 23   |GPIO 11 SPIO_SCLK |RFID RC522 SCK
  PI3 B+ 19   |GPIO 10 SPIO_MOSI |RFID RC522 MOSI
  PI3 B+ 21   |GPIO  9 SPIO_MISO |RFID RC522 MISO
  PI3 B+ 25   |GND               |RFID RC522 GND
  PI3 B+ 22   |GPIO 25           |RFID RC522 RST
  PI3 B+ 17   |3V3 Power         |RFID RC522 3.3V

### 1.2 網路設定參考

有兩處可以修正網卡設定，擇一來設定，第一種方法會優先。
  
1. `sudo nano /etc/dhcpcd.cong`
2. `sudo nano /etc/network/interfaces`
     
   ```conf
   #表示使用 localhost
   auto lo 
   # 有網路卡 eth0，則用靜態方式設定 IP:
   iface eth0 inet static
   static ip_address=192.168.57.40
   static routers=192.168.57.254
   static domain_name_servers=8.8.8.8 168.95.1.1
  
   # DHCP
   #iface eth0 inet dhcp
   # 有網路卡 eth0，則使用 dhcp 獲取 IP:
   #static domain_name_servers=8.8.#8.8 168.95.1.1

   # Wifi
   #auto wlan0 #有 WLAN 使用 wlan0 裝置名稱
   #wlan裝置可以熱拔插
   #allow-hotplug wlan0
   #有WLAN 網路時，使用 wpa-psk 認證方式
   #iface wlan0 inet dhcp
   #wpa-ssid "yvts"
   #wpa-psk  "yvtsyvts"
   ```
   
   **重新啟動**
   `sudo /etc/init.d/networking restart`

## 2. 環境設置

### 2.1 SSH 免密碼登入

1. 使用系統管理者權限，修改檔案 `c:\windows\system32\drivers\etc\hosts`

   增加一筆資料如下:

   ```bash
   192.168.xxx.xxx    smarthome.edu.tw
   ```

2. 測試:

   ```bash
   ping smarthome.edu.tw
   ```
3. 本機端(Window)，安裝 [Git](https://git-scm.com/downloads) 
4. 設定識別資料, 使用 `Git bash` 開啟終端機視窗後，執行如下命令:

   ```bash
   git config --global user.name  "John Doe"
   git config --global user.email  johndoe@example.com
   
   #指定編輯器
   git config --global core.editor "'C:/Program Files (x86)/Notepad++/notepad++.exe' -multiInst -nosession"
   #or
   git config --global core.editor "'C:/tools/nano.exe' -multiInst -nosession"   
   git config --list
   ```

5. 配置 `sshd` 服務，允許認證金鑰檔案:
  
   ```bash
   #登入 PI
   ssh pi@smarthome.edu.tw
   #修改 SSH Daemon 服務組態檔
   sudo nano /etc/ssh/sshd_config
   # 將最前面的註解符號 `#` 取消掉，如下
     AuthorizedKeysFile      .ssh/authorized_keys
   ```

6. 在定時備份或批次遠端處理，往往需要免密碼登入遠端主機工作。為達此目的，首先必須在 client 端產生一組 key，包含公開金鑰（Public Key）與私密金鑰（Private Key），將公鑰送到要登入的主機，相互對應做免密碼的登入。

   ```bash
   #檢查有無私鑰與公鑰(本機端 PC)
   ls -al ~/.ssh/id_rsa.pub
   ls -al ~/.ssh/id_rsa
   #若沒有金鑰的話，key 的產生方法：
   ssh-keygen -t rsa -C xxx@gmail.com

   Generating public/private rsa key pair.
   Enter file in which to save the key (/root/.ssh/id_rsa):
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   Your identification has been saved in /root/.ssh/id_rsa.
   Your public key has been saved in /root/.ssh/id_rsa.pub.
   The key fingerprint is:
   c3:e9:25:65:00:c8:65:cb:e8:fe:4e:7e:ce:06:a4:9d root@kvm8.deyu.wang
   The key's randomart image is:
   +--[ RSA 2048]----+
   |   . o+..        |
   |    o+ . .       |
   |    . o   o      |
   |   .  .. +       |
   |    .+ .S .      |
   |   .. E. +       |
   |    . ...        |
   |     + .o        |
   |     .++o        |
   +-----------------+
   ```

7. 將公開金鑰放到要登入的主機上，利用以下指令完成:

   ```bash
   ssh pi@smarthome.edu.tw 'mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys' < ~/.ssh/id_rsa.pub
   ```

8. 登入測試

   ```bash
   ssh pi@smarthome.edu.tw
   ```

   >特別注意目錄 .ssh 及檔案 authorized_keys 的權限，若群組或其他人的權限過大，除了安全性有問題外，也有可能因 ssh 判斷要對應的金鑰不安全，而無法對應，也就是不能免密碼登入。

9. 調整權限  
   設定 PI 上的authorized_keys 可讀、寫

   ```bash
   ssh pi@smarthome.edu.tw "chmod 600 ~/.ssh/authorized_keys"
   # 設定 PI 上的authorized_keys 唯讀
      ssh pi@smarthome.wda.edu.tw "chmod 400 ~/.ssh/authorized_keys"
   ```

10. 再簡化登入程序: 本機 PC 端，加入 `config`, 簡化 `ssh` 登入指令

    - 在 `~/.ssh` 下新增 `config` 檔案，不需任何副檔名。 
    - 在新增的檔案裡加上你的第一個 SSH config

      `nano ~/.ssh/config`

      ```bash
      Host pi                    # 用來連線的 alias 名稱
      HostName smarthome.edu.tw  # host domain 或 ip
      Port 22                    # host 的 SSH port
      User pi                    # (選填)登入 SSH 的 username，
                                 #  只連 git 的話，可以不必要
      ForwardX11 yes             # (選填) 啟用回傳 GUI
      ```

    - 測試
      `ssh pi`  

11. 常用 SSH 指令

    ```bash
    #基本連線
    ssh username@hostname[ip]  
    #SSH 連線再附加其他指令
    ssh pi mkdir test
    #scp 指定 SSH name
    scp -r ./ pi:/var/www/html/project/
    ```

12. 本機電腦端設定:

    ```bash
    d:
    cd d:\xampp\htdocs
   
    #打開現行工作目錄
    code .
    ```

    然後在 `vscode` 視窗下建立一新目錄 `smarthome`，就可以點擊滑鼠左鍵，來執行下載樹莓派檔案。

13. 安裝 vscode 的套件 `sftp`
    F1 或 Ctrl+Shift+P, 選擇 SFTP:Config

    加入以下設定:

    ```bash
    [
       {
           :
       } ,

       {
        "name": "My Server",
        "host": "smarthome.edu.tw",
        "protocol": "sftp",
        "port": 22,
        "username": "pi",
        "privateKeyPath": "C:/Users/allen/.ssh/id_rsa",
        "remotePath": "/home/pi/www",
        "uploadOnSave": true
      }
    ]  
    ```

### 2.2 安裝 `Apache + MySQL+ PHP`

1. 更新軟體套件清單
   `sudo apt get update y`

2. 更新軟體套件本身
   `sudo apt get upgrade y`

3. 重啟
   `reboot`

#### 2.2.1 安裝 Apache PHP

1. 安裝軟體

   ```bash
   sudo apt get install apache2 y
   sudo apt get install php y
   sudo apt get install php mysql y
   sudo apt get install php mbstring y
   sudo systemctl restart apache2
   sudo nano /etc/apache2 apache2.conf ## 設定文件
   ```

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601160012.png"><img src="small/20210601160012_s.png" class="nofancybox  img-center" /></a>
   </br>
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601160111.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601160111_s.png" class="nofancybox  img-center" /></a>

   `sudo nano /etc/ports.conf`

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601160507.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601160507_s.png" class="nofancybox  img-center" /></a>

   **重啟伺服器**
   `sudo systemctl restart apache2`

2. 驗證 `apache` 正常運作：

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601161921.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601161921_s.png" class="nofancybox  img-center" /></a>

   ```bash
   cd /var/www/html/
   sudo mv index.html index1.html
   ```

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601162829.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601162829_s.png" class="nofancybox  img-center" /></a>

3. 修改根目錄：

   ```bash
   mkdir -p /home/pi/www/web
   sudo chown -R pi:www-data /home/pi/www/web
   chmod -R 770 /home/pi/www/web
   sudo nano /etc/apache2/apache2.conf
   ```

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601165908.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601165908_s.png" class="nofancybox  img-center" /></a>

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601165936.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601165936_s.png" class="nofancybox  img-center" /></a>

   `sudo nano /etc/apache2/sites-enabled/000-default.conf`

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601163545.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601163545_s.png" class="nofancybox  img-center" /></a>

   > cd /etc/apache2/sites-available
     ln -s /etc/apache2/sites-enabled/000-default.conf
     sudo systemctl restart apache2

4. 加入虛擬新網域

   - 新網域名稱: `smarthome.edu.tw`
   - 建立資料夾: `mkdir ~/www/smarthome`
   - 修改現有檔案: `nano /etc/apache2/sites-enabled/000-default.conf`

     ```conf
     <VirtualHost *:80>
       ServerName smarthome.edu.tw
       #ServerAdmin webmaster@localhost
       DocumentRoot /home/pi/www/smarthome

       <Directory /home/pi/www/smarthome>
         Options indexes FollowSymLinks
         AllowOverride None
         Require all granted
       </Directory>
     </VirtualHost>
     ```

5. 重啟 `Apache` 伺服器
   `sudo systemctl restart apache2`

6. 開啟 `PHP` 錯誤日誌
   `sudo nano /etc/php/7.0/apache2/php.ini`

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601163646.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601163646_s.png" class="nofancybox  img-center" /></a>

#### 2.2.2 安裝 MySQL

- 安裝
  `apt cache search mysql server`
  `sudo apt get install mysql server`

- Setting MySQL/MariaDB root password  
  
  ```bash
  sudo mysql u root p
  mysql> use mysql;
  mysql> update user set plugin='' where u ser='root';
  mysql> flush privileges;

  (刷新權限，當你直接通過 update 權限後，需要通過刷新使你的授權有效)

  mysql> exit
  sudo mysql_secure_installation
  sudo mysql u root p
  ```

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601170430.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601170430_s.png" class="nofancybox  img-center" /></a>

  [參考文獻](https://websiteforstudents.com/mariadb--installedinstalled--witwithouthout--passwordpassword--promptsprompts--forfor--rootroot--onon--ubuntuubuntu--1717--1010--1818--0404--beta/beta/)

#### 2.2.3 安裝 phpmyadmin

- 安裝 `sudo nano ~/www/web/info.php`
  
  內容加入：
  
  ```php
  <?php
    phpinfo();
  ?>
  ```

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191331.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191331_s.png" class="nofancybox  img-center"/></a>

- 檢查 `MySql` 版本   
  
  `sudo mysql --version`

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191548.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191548_s.png" class="nofancybox  img-center"/></a>
  
- 檢查 `PHP` 版本  
  `sudo php --version`

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191856.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601191856_s.png" /></a>

- 找尋下載檔案 [phpmyadmin](https://www.phpmyadmin.net/downloads/)

  <a href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601192053.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601192053_s.png" class="nofancybox  img-center" /></a>

  >補充:
   不可以使用 phpmyadmin 4.9+snapshot 的版本(不支援繁體中文，不穩定版本)

- 下載與安裝
  
  ```yml
  cd ~/www/web/
  sudo wget https://files.phpmyadmin.net/phpMyAdmin/4.7.3/phpMyAdmin-4.7.3-alllanguages.tar.gz
  sudo tar -zxvf phpMyAdmin-4.7.3-all-languages.tar.gz
  sudo mv phpMyAdmin-4.7.3-all-languages phpMyAdmin
  ```

#### 2.2.4 解決 缺少 tmp 與 移除其他警告訊息
 
- 現象
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601194654.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601194654_s.png" class="nofancybox  img-center" /></a>
  - 解決 1: 移除設定檔案需要設定一組加密密碼 (blowfish_secret)
  
    ```bash
    sudo cp /var/www/html/phpMyAdmin/config.sample.inc.php  ~/www/web/phpMyAdmin/config.inc.php
    ```

    `sudo nano ~/www/web/phpMyAdmin/config.inc.php`

    將檔案內的 `$cfg['blowfish_secret'] = '';`
    設定為 ：(至少要 32 個字元)

    `$cfg['blowfish_secret'] = 'xxxxxxxxxxxxxxxx';`

    >意思是：加上一堆亂七八糟的英文數字當作秘鑰

  - 解決 2: 移除 `tmp` 警告訊息
    ```bash
    sudo rm -rf /var/www/html/phpMyAdmin/tmp(若本來就存在，刪除再新增)
    sudo mkdir /var/www/html/phpMyAdmin/tmp
    sudo chmod 777 /var/www/html/phpMyAdmin/tm
    ```
    <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601195724.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210601195724_s.png" class="nofancybox  img-center" /></a>

## 3. 影像串流  MJPG-STREAMER for WebCam

### 3.1 說明

&emsp;&emsp;安裝 `mjpg-streamer`， `mjpg-streamer` 是用來將視訊網路串流化，透過 `mjpg` 裡面的解碼器，可以讓影像擷取速率以及畫質有良好的表現。

- [參考文獻](http://www.linux-projects.org/uv4l/installation/)
- PI 上安裝影像串流(mjpg-streamer)，把 `Raspberry Pi` 轉成 `Webcam server`

- PI 上安裝 `Motion`， 動態捕捉, 依照間格時間來抓取.

### 3.2 安裝相關套件

- 步驟
  
  ```bash
  #更新 apt-get
  sudo apt-get update
  sudo apt-get upgrade
  #安裝依賴包
  sudo apt-get install subversion
  sudo apt-get install libjpeg-dev
  sudo apt-get install imagemagick
  sudo apt-get install libv4l-dev
  ```

### 3.3 安裝 `mjpg-streamer`

- 步驟

  ```bash
  mkdir ~/source
  cd ~/source
  # 利用 svn 把最新版的 mjpg-streamer 抓下來
  svn co https://svn.code.sf.net/p/mjpg-streamer/code/
  cd code/mjpg-streamer
  make
  sudo make install

  # 拷貝到 *.so /usr/local/lib
  sudo cp  *.so /usr/local/lib/.
  # 拷貝到 mjpg_streamer 到 /usr/local/bin
  sudo cp mjpg_streamer  /usr/local/bin/.
  ```

### 3.4 停止 `motion`

- 步驟
  
  ```bash
  #如果 motion 還在啟動中，先停掉
  sudo service motion stop
  ```

### 3.5 啟動 `mjpg-streamer`

- 步驟
  
  ```bash
  # 先打開 pi carmera
  sudo raspi-config
  ```

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-1.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-1_s.png' class='nofancybox  img-center' /></a>
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-2.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-2_s.png' class='nofancybox  img-center' /></a>
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-3.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-3_s.png' class='nofancybox  img-center' /></a>
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-4.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-4_s.png' class='nofancybox  img-center' /></a>
  
  **須重開機**

  ```bash
  cd ~/source/code/mjpg-streamer
  sudo ./mjpg_streamer -i "./input_uvc.so -f 10 -r 1024x768 -d /dev/video0 -y -n" -o "./output_http.so -w ./www -p 8080"
  ```

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-5.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_mjpeg-streamer-5_s.png' class='nofancybox  img-center' /></a>
  
  >`320x240` 也可以修改為 `640x480`，如果啟動失敗，請再執行下列程序:

  ```bash
  sudo nano  /etc/modules
  ```

  #加入以下內容 :
  bcm2835-v412

  #重新啟動
  `sudo reboot`

### 3.6 測試

&emsp;&emsp;啟動後在 raspberry ip 位置。例如: `192.168.62.100:8080/stream.html` 中，檢查有沒有看到影像串流。

&emsp;&emsp;`http://smarthome.edu.tw:8080/?action=streamer`

&emsp;&emsp;或
&emsp;&emsp;`http://smarthome.edu.tw:8080/stream_simple.html`

&emsp;&emsp;如果要客制化頁面的，可以再在自己的頁面上加上 `tag`
&emsp;&emsp;`http://192.168.62.100:8080/?action=stream"`，就能捉的到串流影像。

### 3.7 設置登入帳號和密碼

- 關掉服務

  ```bash
  #查指定程序 id
  pidof mjpg_streamer
  #刪除指定 id
  kill -9 [pid of mjpg_streamer]

  sudo ./mjpg_streamer -i "./input_uvc.so -f 10 -r 320x240 -d /dev/video0 -y -n" -o "./output_http.so -w ./www -p 8080 -c userid:password"
  ```

### 3.8 開機時自動執行串流伺服器

- 操作步驟如下:

  ```python
  cd ~/source
  nano mjpg.py
  ```

  內容如下:
  ```yaml
  import os
  os.system('LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_uvc.so -y -r 1024x768 -n" -o "output_http.so -w /home/pi/source/code/mjpg-streamer/www"')
  ```

  #改變屬性(可執行)

  ```bash
  chmod 755 mjpg.py
  sudo nano /etc/crontab
  
  SHELL=/bin/sh

  #0 0 * * * root  python /home/pi/source/mjpg.py
  @reboot root python /home/pi/source/mjpg.py &
  ```

  >注意: import os 與 os.system() 注意前面不要空行

## 4. GPIO 控制

### 4.1 說明

&emsp;&emsp;網頁控制 LED(燈與風扇) Relay Control (GPIO)，現在方法使用國外人寫的一個插件模組[wiringPI](http://wiringpi.com/download-and-install/), 然後在網頁上使用執行 linux shell command 來控制腳位(針腳)用 php 控制．

>可改寫成不用這插件, 直接用 `python` 來控制腳位

### 4.2 腳位控制 GPIO

- 腳位
  |腳位名稱|  用途            |
  |-------|------------------|
  |GPIO26 | RELAY IN1 For Fan|
  |GPIO27 | RELAY IN2 For LED|
  |GPIO22 | RELAY IN3 For LED|
  |GPIO23 | RELAY IN4 For LED|

- 安裝模組 `wiringPi`
  
  ```bash
  `sudo apt-get install wiringpi`
  ```

  >目前 PI 都已內建支援 GPIO，使用命令： `pinout` 可得知腳位訊息。
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-gpio-pinout.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-gpio-pinout_s.png' class='nofancybox  img-center' /></a>

### 4.3 測試有無 `WiringPi` 模組

- 檢查 GPIO 版本
  
  ```bash
  gpio -v
  ```

- 顯示目前所有 GPIO 的輸入或輸出狀態

  ```bash
  sudo gpio readall
  ```

  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_gpio_readall.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_gpio_readalls.png' class='nofancybox  img-center' /></a>
  
### 4.4 測試硬體接線狀態

- 使用下列指令作測試

  ```bash
  gpio -g mode 26 out
  gpio -g write 26 1
  gpio -g write 26 0

  gpio -g mode 27 out
  gpio -g write 27 1
  gpio -g write 27 0

  gpio -g mode 22 out
  gpio -g write 22 1
  gpio -g write 22 0

  gpio -g mode 23 out
  gpio -g write 23 1
  gpio -g write 23 0
  ```
  
  > [GPIO ontrol in config.txt](https://www.raspberrypi.org/documentation/configuration/config-txt/gpio.md)

## 5. DHT 溫溼度偵測

### 5.1 硬體配置

&emsp;&emsp;首先將 `DHTXX` 連接到 `Raspberry Pi` 的 `GPIO (general purpose input/output)` 上，`DHT` 上僅有 `VCC` (使用 3.3V)、`OUT`、`GND` 三個接腳，其中 `OUT` 是資料的輸出，須接在 `GPIO`(14,15,18,23,24,25,6,7,2,3,4,17,27,22,10,9,11) 中的任一接腳上。

&emsp;&emsp;這裡使用的是 GPIO17。

- 範例:
  參考網頁: `https://opendev2016.wordpress.com/2017/04/22/using-raspberry-pi-and-dth11-to-bulid-a-environment-monitor/`

- 建立資料庫與資料表
  
  1. 建立資料庫 `raspberry` 的資料表 `temp`。
     連線進入 [phpmyadmin](http://smarthome.edu.tw/phpmyadmin)
     <a  data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-pi-table-create.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-pi-table-creates.png' class='nofancybox' /></a>

  2. 使用 sql 視窗，建立 table。
  
     ```sql
     --
     -- 資料表結構 `raspberryPI.temp`
     --
     CREATE TABLE `raspberryPI`.`temp` (
       `rowid` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
       `datetime` DATETIME NOT NULL ,
       `temperature` FLOAT NOT NULL ,
       `humidity` FLOAT NOT NULL ,
       PRIMARY KEY (`rowid`)) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
     --
     -- 資料表的匯出資料 `temp`
     --
     INSERT INTO `temp` (`datetime`, `temperature`, `humidity`) VALUES
     ('2017-05-01 09:20:02', 23.2, 60.1),
     ('2017-05-02 09:20:02', 20.1, 70.2),
     ('2017-05-03 09:21:03', 28.3, 88.0),
     ('2017-05-04 09:21:03', 25.4, 70.1),
     ('2017-05-05 09:25:03', 26.5, 63.1),
     ('2017-05-06 09:25:03', 32.1, 74.2),
     ('2017-05-07 09:26:02', 30.2, 89.3),
     ('2017-05-08 09:26:02', 22.2, 64.4),
     ('2017-05-09 09:27:03', 38.3, 62.1),
     ('2017-05-10 09:27:03', 32.4, 56.2),
     ('2017-05-11 09:28:02', 24.5, 69.2),
     ('2017-05-12 09:28:02', 35.6, 51.1);
     ```

     <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-pi-table-create2.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-pi-table-create2s.png' class='nofancybox  img-center' /></a>

### 5.2 安裝 `Adafruit` 範例程式
#### 5.2.1. 法一
1. 先安裝所需套件：

   ```bash
   #更新 apt-get
   sudo apt-get update
   #下載套件 Adafruit_Python_DHT 套件
   cd ~/source
   git clone https://github.com/adafruit/Adafruit_Python_DHT.git
   #安裝
   cd Adafruit_Python_DHT
   sudo python setup.py install
   ```
2. 測試:
   接著就能讀取 `DHTXX` 了，執行寫好的範例 `Python` 程式：

   ```bash
   cd ~/source/Adafruit_Python_DHT/examples
   cp AdafruitDHT.py ~/source/.
   cd ~/source
   python /home/pi/source/AdafruitDHT.py 2302 17
   ```
   參數 `11`   代表 `DHT11，17`   代表我把它接到 `Raspberry Pi` 的 `GPIO 17`。
   參數 `22`   代表 `DHT22，17`   代表我把它接到 `Raspberry Pi` 的 `GPIO 17`。
   參數 `2302` 代表 `DHT2302，17` 代表我把它接到 `Raspberry Pi` 的 `GPIO 17`。

3. 輸出訊息
   Temp=27.0*C  Humidity=81.0%

#### 5.2.2. 法二

1. 先安裝所需套件
   `$ sudo pip install Adafruit_DHT`

2. 若要從 python 3 版本執行，請先安裝套件如下:
   
   ```bash
   sudo apt-get update
   sudo apt-get install python3-pip
   sudo apt-get install python3-dev python3-pip
   sudo python3 -m pip install --upgrade pip setuptools wheel
   ```

3. 編輯 python 程式

   `~/source/dht22.py`

   ```python
   import Adafruit_DHT 

   DHT_SENSOR = Adafruit_DHT.DHT22 
   DHT_PIN = 17  

   while True:
       humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
       if humidity is not None and temperature is not None:
           print("Temp={0:0.2f}*C  Humidity={1:0.2f}%".format(temperature, humidity))
       else:
           print("Failed to retrieve data from HDT22 sensor")   
   ```


### 5.3 修改現有程式碼 `AdafruitDHT.py`

- 程式碼
  
  ```bash
  nano /home/pi/source/AdafruitDHT.py

  #在現有程式碼最前面，引入以下內容
  import urllib
  import urllib2
  import requests
  ```
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-7.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183s.synology.me/images/wiot-dht-7s.png' class='nofancybox  img-center' /></a>

  ```bash
  #在現有程式碼最後面，加入以下程式碼內容
  mydata=[('temperature',temperature),('humidity',humidity)]
  mydata=urllib.urlencode(mydata)
  path = 'http://127.0.0.1/dht_write_temp.php'
  req=urllib2.Request(path, mydata)
  req.add_header("Content-type", "application/x-www-form-urlencoded")
  page=urllib2.urlopen(req).read()
  ```
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-1.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-1s.png' class='nofancybox  img-center' /></a>
  
- 產生程式碼 `dht_write_temp.php` 於網頁目錄 smarthome 下:
  ```php
  <?php
    require_once("connDB.php");
    date_defult_timezone_set("Asia/Taipei");

    $now = date('YmdHis');
    $temp = $_POST['temperature'];
    $humidity = $_POST['humidity'];

    echo "Temperature= " . $temp . "<br>";
    echo "humidity= " . $humidity .  "<br>";

    $sql =  "INSERT INTO temp  VALUES (null, $now,$temp,$humidity)";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo "close connection" . ", Date time=" . $now . ", Temperature=" . $temp . "  Humidity=" . $humidity;
  ?>
  ``` 
- 修改後，再用主程式 `AdafruitDHT.py` 測試，執行後，請檢查資料庫上是否有多一筆資料。
  
  `python /home/pi/source/AdafruitDHT.py 2302 17`

  問題: 會找不到 `url`
  解決: 刪除 `/etc/nginx/sites-enabled/default`

  ```bash
  sudo rm /etc/nginx/sites-enabled/default
  ```

### 5.4 排程

- 步驟

  ```bash
  cd ~/source
  
  #編輯 /home.pi/source/gettemp.sh
  #如果是  DHT11   加入 sudo python /home/pi/source/AdafruitDHT.py 11 17
  #如果是  DHT22   加入 sudo python /home/pi/source/AdafruitDHT.py 22 17
  #如果是  DHT2302 加入 sudo python /home/pi/source/AdafruitDHT.py 2302 17
  #如果是  LCD     加入 sudo python /home/pi/source/Adafruit_Python_DHT/examples/AdafruitDHT.py 22 17

  #編輯自動執行程序 gettemp.sh
  nano gettemp.sh
  
  #加入以下內容
  sudo python /home/pi/source/AdafruitDHT.py 2302 17
  #修改執行權限  
  sudo chmod 777 gettemp.sh
  #加入排程
  sudo crontab -e
  ```
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-2.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-2s.png' class='nofancybox  img-center' /></a>

  ```bash
  #最後面加入以下內容
  */1 * * * * /home/pi/source/gettemp.sh
  ```
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-3.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-3s.png' class='nofancybox  img-center' /></a>
  
  ```bash
  #重新啟動
  sudo reboot
  ```

### 5.5 `DHT` sensor 讀取值後寫入資料庫: `raspberryPI` 的資料表 `temp`

1. 主程式: `/home/pi/www/smarthome/dht_write_temp.php`
2. 先使用網址傳參數方式，測試數據可否正常寫入資料庫，如下步驟:
   使用 `get` 方式，讀取網址傳入數，如下:

   `dht_write_temp.php`

   ```php
   <?php
     require_once("connDB.php");

     //date_defult_timezone_set("Asia/Taipei");

     $now = date('YmdHis');
     $temp = $_GET['temperature'];
     $humidity = $_GET['humidity'];

     echo "Temperature= " . $temp . "<br>";
     echo "humidity= " . $humidity .  "<br>";

     $sql =  "INSERT INTO temp (`datetime`,`temperature`,`humidity`) VALUES ($now,$temp,$humidity)";
     mysqli_query($conn, $sql);
     mysqli_close($conn);
     echo "close connection" . ", Date time=" . $now . ", Temperature=" . $temp . "  Humidity=" . $humidity;
   ?>
   ```

3. 測試步驟
   - 輸入網址與參數: `http://smarthome.edu.tw/dht_write_temp.php?temperature='22'&humidity='60'`  
    <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-4.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-4s.png' class='nofancybox  img-center' /></a>

   - 打開 [phpmyadmin](http://smarthome.edu.tw/phpmyadmin)，查詢 `temperature='22'&humidity='60'` 數據有無寫入到 `raspberryPI.temp`。
     <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-5.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-5s.png' class='nofancybox  img-center' /></a>

4. 確認沒問題後，將程式 `dht_write_temp.php` 的 `GET` 改成 `POST` 方法。

   ```bash
     :
   $temp     = $_POST['temperature'];
   $humidity = $_POST['humidity'];
     :
   ```

5. 觀察 [phpmyadmin](http://smarthome.edu.tw/phpmyadmin) 上的資料表 `temp` 數據，一分鐘有無自動更新一次。

### 5.6 讀取資料庫的 temp 資料表應用集

1. 主程式:   `/home/pi/www/smarthome/dht_read_temp.php`
2. 範例:
  
   - 溫溼度資料管理統:     `http://smarthome.edu.tw/dht_read_temp.php`
   - 溫溼度管理系統(傳統分頁): `http://smarthome.edu.tw/dht_read_temp_paging.php`
   - 溫溼度管理系統(使用 Bootstrap 分頁): `http://smarthome.edu.tw/dht_read_temp_paging_bootstrap.php`
   - 溫溼度表管理系統: 使用 [jQuery.bootpag 分頁控件](https://plugins.jquery.com/bootpag/)
     - `dht_read_temp_paging_bootpag.php`
     - `tempQuery.php`
   - 溫溼度表:
     - `http://smarthome.edu.tw/dht_read_temp_ajax.php` (前端)
     - `http://smarthome.edu.tw/dht_read_temp_ajax_api.php` (後端)

     <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-8.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot-dht-8s.png' class='nofancybox  img-center' /></a>

   - 溫度顯示圖表 (2D): `showTemperatureChart.php`
   - 溫度顯示圖表 (3D): `showChart.php`

### 5.7 溫、濕度資料寫入 LCD 1502

1. LCD 功能啟用
2. 下載 LCD 驅動程式
   ```bash
   $ git clone https://github.com/paulbarber/raspi-gpio
   $ cd raspi-gpio
   $ nano  lcd_display.py
      
	 #修改 ADDRESS 為 0x3f
    import i2c_lib
    from time import sleep

   # LCD Address
   ```

3. `AdafruitDHT.py` 程式碼修改
   ```python
   #!/usr/bin/python
   # Copyright (c) 2014 Adafruit Industries
   # Author: Tony DiCola
   
   # Permission is hereby granted, free of charge, to any person obtaining a copy
   # of this software and associated documentation files (the "Software"), to deal
   # in the Software without restriction, including without limitation the rights
   # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   # copies of the Software, and to permit persons to whom the Software is
   # furnished to do so, subject to the following conditions:
   
   # The above copyright notice and this permission notice shall be included in all
   # copies or substantial portions of the Software.
   # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   # SOFTWARE.
   import sys
   import time   
   sys.path.append("/home/pi/source/raspi-gpio")   
   from lcd_display import lcd   
   import Adafruit_DHT   
   import urllib
   import urllib2
   import requests   
   # Parse command line parameters.
   sensor_args = { '11': Adafruit_DHT.DHT11,
                   '22': Adafruit_DHT.DHT22,
                   '2302': Adafruit_DHT.AM2302 }
   if len(sys.argv) == 3 and sys.argv[1] in sensor_args:
       sensor = sensor_args[sys.argv[1]]
       pin = sys.argv[2]
   else:
       print('Usage: sudo ./Adafruit_DHT.py [11|22|2302] <GPIO pin number>')
       print('Example: sudo ./Adafruit_DHT.py 2302 4 - Read from an AM2302 connected to GPIO pin #4')
       sys.exit(1)
   
   # Try to grab a sensor reading.  Use the read_retry method which will retry up
   # to 15 times to get a sensor reading (waiting 2 seconds between each retry).
   humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
   
   # Un-comment the line below to convert the temperature to Fahrenheit.
   # temperature = temperature * 9/5.0 + 32
   
   # Note that sometimes you won't get a reading and
   # the results will be null (because Linux can't
   # guarantee the timing of calls to read the sensor).
   # If this happens try again!
   
   if humidity is not None and temperature is not None:
       my_lcd = lcd()
       my_lcd.display_string('T:{:.1f}C'.format(temperature) + ' H:{:.1f}%'.format(humidity) , 2)
       my_lcd.display_string(time.strftime("%Y/%m/%d") + " " + time.strftime("%H:%M:%S"), 1)
       print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
   
   else:
       print('Failed to get reading. Try again!')
       sys.exit(1)
   
   mydata=[('temperature',temperature),('humidity',humidity)]
   mydata=urllib.urlencode(mydata)
   path = 'http://127.0.0.1/dht_write_temp.php'
   req=urllib2.Request(path, mydata)
   req.add_header("Content-type", "application/x-www-form-urlencoded")
   page=urllib2.urlopen(req).read()
   ```
## 6. RFID Tag

### 6.1 參考文章

- `http://atceiling.blogspot.com/2017/02/raspberry-pi-rfid.html`
- `https://pimylifeup.com/raspberry-pi-rfid-rc522/`

### 6.2 更新軟體
  
1. 更新 OS

   ```bash
   sudo apt-get update
   # sudo apt -t stretch update

   sudo apt-get upgrade  
   # sudo apt -t stretch upgrade
   ```

2. 更新 RPI OS

   ```bash
   sudo rpi-update
   ```

### 6.3 使用 `raspi-config` 確認已經啟用 `SPI` 協定功能

- 步驟

  ```bash
  #P4 SPI ENABLED
  sudo raspi-config
  ```
  
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_1.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_1s.png' class='nofancybox img-center' /></a>
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_2.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_2s.png' class='nofancybox img-center' /></a>
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_3.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_3s.png' class='nofancybox img-center' /></a>
  <a data-fancybox="gallery" href=""><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_4s.png' class='nofancybox img-center' /></a>
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_5.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_5s.png' class='nofancybox img-center' /></a>

### 6.4 在 `/boot/config.txt` 最後加入以下內容

- 步驟
  
  ```bash
  sudo nano /boot/config.txt
  # 最後加上以下內容
  # RFID  
  dtparam=spi=on
  dtoverlay=spi-bcm2708
  dtoverlay=spi0-hw-cs
  ```

### 6.5 重開 `raspberry pi`

- 步驟
  
  ```bash
  sudo reboot now
  ```

### 6.6 檢查 `spi` 模組是否已經成功安裝

- `lsmod | grep spi`

  > 若出現一下這一行，表示 spi 安裝成功
    spi_bcm2835       20480  0

- 確認 `24pin` 腳設定正確

  ```bash
  gpio readall
  ```
  
### 6.7 線路圖

1. 實體圖
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfids.png' class='nofancybox img-center' /></a>
  
2. PIN 腳對應如下
   | RC522 Pin |  Pi pin     | PI GPIO signal and function
   |-----------|--------------|----------------------------
   | SDA(NSS)  | 24           | CS0 – This is the SPI chip select, active low
   | SCK       | 23           | SCLK – this is the SPI clock
   | MOSI      | 19           | MOSI – data to the RC522
   | MISO      | 21           | MISO – data from the RC522
   | IRQ       |              | None
   | GND       | 6            | GND
   | RST       | 22           | GPIO25
   | 3.3V      | 1            | 2.3V

   > SPI匯流排定義四組 logic signals：
     • SCLK—Serial Clock（自master輸出）
     • MOSI—Master Output, Slave Input（自master輸出）
     • MISO—Master Input, Slave Output（自slave輸出）

### 6.8 透過已下指令安裝相關需要的工具跟範例程式

1. 下載套件與安裝

   ```bash
   cd ~/source
   sudo apt-get install -y python-dev
   # 取得SPI-py程式碼，SPI-py是 python 讀取硬體 SPI 的擴充函式庫：
   git clone https://github.com/lthiery/SPI-Py.git
   # 安裝 SPI 模組
   cd SPI-Py
   sudo python setup.py install
   cd ~/source

2. 安裝 `MFRC522-python`

   ```bash
   git clone https://github.com/mxgxw/MFRC522-python.git
   cd MFRC522-python
   ```

3. 測試

   ```bash
   python Read.py
   ```

   出現問題，如下畫面:
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_6.png"> <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_6s.png' class='nofancybox img-center' /></a>

   問題解決:

   - `python -v`
     問題發生於: 執行於 `version 2.7.13` 上會有問題。

   - 解決: 複製其中的 mfrc522/MFRC522.py 取代下的 /source/MFRC522-python/MFRC522.py
  
     ```bash
     cd ~/source
     git clone https://github.com/pimylifeup/MFRC522-python.git  MFRC522
     cp MFRC522/mfrc522/MFRC522.py ~/source/MFRC522-python/MFRC522.py
     ```

   - 再執行測試

     ```bash
     cd ~/source/MFRC522-python
     python Read.py
     ```

     <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_test.png"><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/wiot_rfid_tests.png' class='nofancybox img-center' /></a>

4. 建立資料表 `rfid`

   ```sql
   USE `raspberryPI`;
   -- 資料表結構 `rfid`
   CREATE TABLE IF NOT EXISTS `rfid` (
     `datetime` datetime NOT NULL,
     `rfid_data` mediumtext COLLATE utf8_unicode_ci NOT NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
   -- 資料表的匯出資料 `rfid`
   INSERT INTO `rfid` (`datetime`, `rfid_data`) VALUES
   ('2017-05-11 14:23:47', '5464521376'),
   ('2017-05-11 14:29:11', '5470155187'),
   ('2017-05-11 14:29:11', '5470155187'),
   ('2017-05-11 14:29:12', '5470155187'),
   ('2017-05-13 19:18:44', '240142129122'),
   ('2017-05-13 19:19:13', '22424124137'),
   ('2017-05-13 19:19:21', '22424124137'),
   ('2017-06-02 11:41:52', '22424124137'),
   ('2017-06-02 11:41:55', '22424124137'),
   ('2017-06-02 11:41:57', '22424124137'),
   ('2017-06-02 11:41:59', '22424124137'),
   ('2017-06-02 11:42:01', '22424124137'),
   ('2017-06-02 11:42:04', '240142129122'),
   ('2017-06-02 11:42:06', '240142129122'),
   ('2017-06-02 11:42:08', '240142129122'),
   ('2017-06-02 11:42:10', '240142129122'),
   ('2017-06-02 11:42:14', '48165248121'),
   ('2017-06-02 11:42:14', '48165248121'),
   ('2017-06-02 11:42:19', '22424124137'),
   ('2017-06-02 11:45:26', '22424124137'),
   ('2017-06-02 11:45:28', '22424124137'),
   ('2017-06-02 11:45:44', '22424124137'),
   ('2017-06-02 11:46:06', '240142129122'),
   ('2017-06-02 11:46:12', '240142129122'),
   ('2017-06-02 14:02:28', '22424124137'),
   ('2017-06-02 14:02:33', '22424124137'),
   ('2017-06-02 14:02:35', '22424124137'),
   ('2017-06-02 14:02:38', '22424124137'),
   ('2017-06-02 14:02:43', '22424124137'),
   ('2017-06-02 14:02:45', '22424124137'),
   ('2017-06-02 14:02:46', '22424124137'),
   ('2017-06-02 14:02:48', '22424124137'),
   ('2017-06-02 14:02:49', '22424124137'),
   ('2017-06-02 14:02:50', '22424124137'),
   ('2017-06-02 14:02:50', '22424124137'),
   ('2017-06-02 14:02:50', '22424124137'),
   ('2017-06-02 14:02:51', '22424124137'),
   ('2017-06-02 14:02:51', '22424124137'),
   ('2017-06-02 14:02:53', '240142129122'),
   ('2017-06-02 14:03:23', '240142129122'),
   ('2017-06-02 14:03:54', '48165248121'),
   ('2017-06-02 14:03:54', '5470155187'),
   ('2017-06-02 14:03:54', '5470155187'),
   ('2017-06-02 14:10:40', '240142129122'),
   ('2017-07-08 14:49:23', '48165248121'),
   ('2017-07-08 14:49:23', '48165248121'),
   ('2017-07-08 14:49:33', '48165248121'),
   ('2017-07-08 14:49:33', '48165248121'),
   ('2017-07-08 14:53:14', '5470155187'),
   ('2017-07-08 14:53:14', '5470155187'),
   ('2017-07-08 14:59:15', '48165248121'),
   ('2017-07-08 14:59:15', '48165248121'),
   ('2017-07-08 14:59:19', '5470155187'),
   ('2017-07-08 14:59:19', '5470155187'),
   ('2017-07-08 14:59:30', '240142129122'),
   ('2017-07-08 14:59:30', '240142129122'),
   ('2017-07-08 14:59:30', '240142129122'),
   ('2017-07-08 14:59:30', '240142129122'),
   ('2017-07-08 14:59:30', '240142129122'),
   ('2017-07-08 14:59:31', '240142129122'),
   ('2017-07-08 14:59:31', '240142129122'),
   ('2017-07-08 14:59:31', '240142129122'),
   ('2017-07-08 14:59:31', '240142129122'),
   ('2017-07-08 14:59:36', '5470155187'),
   ('2017-07-08 14:59:36', '5470155187'),
   ('2017-07-08 14:59:36', '5470155187'),
   ('2017-07-08 14:59:36', '5470155187');
   ```

5. 修正主程式: `Read.py`

   連結 [Read.py](http://ftp.allen5183.synology.me/Read.py) 後, 取代原來檔案 `Read.py`。

6. 產生程式碼 `rfid_write_db.php` 於 `smarthome` 目錄下:
   ```php
   <?php
     require_once("connDB.php");
     date_default_timezone_get("Asia/Taipei");

     $date = date('Ymdhis');
     $rfid_data = $_GET['rfid_data'];

     mysqli_query($conn, "INSERT INTO rfid (datetime,rfid_data) VALUES ($date, $rfid_data)");
     mysqli_close($conn);
     echo "powenk.com get it" . "date time" . $date . ",rdid date=" . $rfid_data;
   ?>
   ```
7. 執行主程式

   ```bash
   python Read.py
   ```

8. 刷 `RFID` 後，檢查是否 `tag` 資料有寫入資料表 `rfid`。

9.  應用原理
  
   嗶卡後將 `rfid` 編碼資料丟入資料庫, 在到資料庫抓取資料記錄的時間, 寫到 rfid 資料表，

   `Read.py`

   `content,response_code=fetch_thing('http://127.0.0.1/rfid_write_db.php',{'rfid_data':x},'GET')`

11. Q&A

   - Q: No module named RPI.GPIO
     A: `pip install RPi.GPIO`

   - Q: PHP 時間不正確
     A:
     - 修正時區

       ```bash
       sudo nano  /etc/php/7.0/fpm/php.ini

       date.timezone = "Asia/Taipei"

       #重啟 `php-fpm` 服務
       sudo service php7.0-fpm restart
       ```

     - 時區修正，安裝  `NTP Server`

       ```bash
       sudo apt-get install ntpdate
       #修改時區
       tzselect       # 選 4)Asia 再選 43)Taiwan，確認 1)Yes
       ```

     - 測試時間
  
       ```bash
       date
       ```

12. 開機時自動執行 `RDID` 偵測:

    #編輯自動執行程序

    ```bash
    cd ~/source
    nano rfid.py
    ```

    import os
    os.system('python /home/pi/source/MFRC522-python/Read.py')

    >PS: `import os` 與 `os.system()` 注意前面不要空行

    #檔案修改成可執行
    `chmod 755 rfid.py`

    #加入排程
    `sudo nano /etc/crontab`
  
    最後面
    #加入以下指令  
    @reboot root python /home/pi/source/rfid.py &

13. 應用

- 寫入資料庫
  讀取 `RFID` 的 Tag ID 後，再透過 `http://smarthome.edu.tw/rfid_write_db.php` 寫入 DB。

- 讀取資料
  `RFID` 的 Tag ID 從資料庫取得，透過 `http://smarthome.edu.tw/rfid_read_db.php`

  ```php
  <?php
    require_once "connDB.php";
    date_default_timezone_get("Asia/Taipei");

    $result = mysqli_query($conn, "SELECT * FROM rfid ORDER BY datetime DESC");

    echo "<form align='center' name='form1' method='post' action=''>";
    echo "<h1 align=\"center\">RFID Tag 資料管理系統</h1>";
    echo "<table align=center border='1' style='border-collapse: collapse' cellpadding='4'>

    <tr>
      <th>日期時間</th>
      <th>Tag Code</th>
    </tr>";

    while ($row = mysqli_fetch_array($result)) {
      echo "<tr>";
      echo "<td>" . $row['datetime'] . "</td>";
      echo "<td>" . $row['rfid_data'] . "</td>";
      echo "</tr>";
    }

    echo "</table>";
    echo "</form>";
    mysqli_close($conn);
  ?>
  ```

- 手動測試:
  `http://smarthome.edu.tw/rfid_write_db.php?rfid_data="test"`

- 顯示於 LCD 1602
  1. Raspberry I2C 功能
     $sudo raspi-config
     ![20210520141632](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210520141632.png)
     <br>
     ![20210520141709](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210520141709.png)

  2. 重新開機
     `sudo shutdown -r now`

  3. 安裝 `RPLCD` 套件
     `pip install RPLCD`

  4. 安裝 `smbus2` 套件
     `pip install smbus2`

  5. 確認 `RPLCD`, `smbus2` 套件皆已正確安裝   
     `pip list`

  6. 尋找 I2C 裝置的位址
     `i2cdetect -y 1`
  
  7. 編輯程式碼 `i2c_lcd.py` 
     `~/source $ nano i2c_lcd.py`

     ```python
     import sys
     import time
     import smbus2
     # 將 smbus 模組用 smbus2 取代
     sys.modules['smbus'] = smbus2
     #引入 smbus2 套件
     from RPLCD.i2c import CharLCD
     #建立一個可透過 I2C 介面來控制 LCD 的 Python 物件。其中 PCF8574 為 I2C 晶片型號，而 address 為我們透過指令 i2cdetect 所找出的裝置位址，而 backlight_enabled=False 則是關閉其背光功能。如果你使用的 I2C 裝置位址與此不同，請記得要加以修改。
     lcd = CharLCD('PCF8574', address=0x27, port=1, backlight_enabled=False)

     try:
         print('按下 Ctrl-C 可停止程式')
         #將螢幕內容清空
         lcd.clear()
         while True:
             #將下一次輸出的開始位置設定為  (0, 0)，也就是第一行的第一個字元
             lcd.cursor_pos = (0, 0)
             lcd.write_string("Date: {}".format(time.strftime("%Y/%m/%d")))
             lcd.cursor_pos = (1, 0)
             lcd.write_string("Time: {}".format(time.strftime("%H:%M:%S")))
             time.sleep(1)
     except KeyboardInterrupt:
         print('關閉程式')
     finally:
         lcd.clear()
     ```  
     

## 9. 樹梅派控制伺服馬達 SG90 Servo 

### 硬體介紹

1. 三隻接腳依序分別為:
   - 控制 (橘色)   RPI 11 BCM 17
   - 電源 (紅色)   RPI 2  +5V
   - 接地 (棕色 )  RPI 6  GND
  
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521092755.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521092755s.png" /></a>

2. 在 `Raspberry Pi` 使用伺服馬達有一些需要特別注意的地方。
 - 首先當然是控制能力。因為 Raspberry Pi 的 PWM 的功能並不算上強大，如果使用的是軟體模擬 PWM，效果更是差強人意。而由於 PWM 是用來控制伺服馬達旋轉角度的機制，所以使得 Raspberry Pi 在控制伺服馬達的角度方面並不是那麼地精準跟穩定。
 - 再來則是電壓的問題。一般伺服馬達無法使用 +3.3V 加以驅動，所以除非透過外部電源，否則就只能使用 +5V 接腳當作供電來源。而 Raspberry Pi 的 +5V 電壓直接來自於 USB (或外接電源)，並沒有經過整流，所以電源的穩定度較差。
 - 最後則是電流的問題。因為 Raspberry Pi 的 +5V 電源來自於 USB (或外接電源)，其實際上能夠輸出的最大電流受到很多因素的影響，所以可能因為輸出電流不夠而造成伺服馬達運作不正常。此外，伺服馬達啟動時通常會有一瞬間的較大電流，也有可能導致板子的損毀。

   
總結來說，如果想要比較精確地控制伺服馬達，尤其是多個伺服馬達時，可以考慮選用專用的 HAT 或是改用 Arduino 等其他控制板。

3. `PWM` 與旋轉角度
   脈衝寬度與旋轉角度的關係是,大多數伺服馬達以 1 ms 的脈衝寬度當作 -90 度，而 2 ms 則為 +90 度。
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093132.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093132s.png" /></a>

   因為我們所使用的 Python 套件必須指定 PWM 的工作週期而非脈衝寬度，所以我們必須先進行轉換。當頻率為 50 Hz 時，則每一個週期為 1/50 = 0.02 秒，也就是 20 毫秒 (ms)。1 ms 的脈衝寬度其工作週期為 1 / 20 * 100% = 5%

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093224.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093224s.png"/> </a>

   同樣的，2 ms 脈衝寬度的工作週期則為 10%。所以我們只要把 PWM 的頻率設定為 50 Hz，然後控制工作週期在 5~10% 之間，就可以從 -90 度旋轉到 +90 度。不過因為其實轉軸外部並沒有任何記號，所以為了方便我們也可以說是從 0 度轉到 180 度 (逆時針方向)。換句話說，旋轉角度與工作週期的關係可用下表呈現：


   旋轉角度 | 工作週期 (當頻率為 50 Hz 時) 
   :------|:-----
    0 度  |	   5%
   45 度  |	6.25%
   90 度  |	7.5%
   135 度 |	8.75%
   180 度	| 10%

   或者也可以用下列圖形加以說明：
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093347.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093347s.png" /> </a>

   其實就是一個一元一次函數。根據前面分析的結果，只要把 5%~10% 之間的差距平分給 180 個角度，就可以控制伺服馬達的旋轉角度了。也就是
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093438.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093438s.png" /></a>

   經過查看 Servo 函式庫的文件後，發現預設 0 度的脈衝寬度是 544 microsecond，也就是 0.544 ms，而預設 180 度的脈衝寬度則是 2400 microsecond，也就是 2.4 ms。而在某些文件中可以看到 SG90 的脈衝寬度為 0.5 ms ~ 2.4 ms，所以使用 1 ms ~ 2 ms 當然就會有很大的偏差。此外，少數資料對 0.5 ms ~ 2.4 ms 的解釋是 SG90 可以擁有更大的旋轉角度，但是很顯然實際上並不是這樣。否則根據這句話來看，SG90 已經可以旋轉接近 360 度了。

   同樣在頻率為 50Hz 的情況下，脈衝寬度為 0.5 ms 時的工作週期為 2.5%，而 2.4 ms 的工作週期則為 12%，所以針對 SG90 修改公式如下：
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093546.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093546s.png" /></a>

   一樣是一個一元一次函數。
   不過在實際撰寫程式時，因為我們希望頻率是可以由程式加以指定，所以需要重新改寫如下：
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093738.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093738s.png" /></a>

   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093738.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093738s.png" /></a>

   此公式即為後面 Python 程式所使用之計算方式。

4. 線路圖
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093705.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521093705s.png" /></a>

5. 說明如下:

 - 在這個範例中我們將使用軟體模擬的 PWM 功能，所以控制接腳 (橘色) 可連結至任一可用於輸出的腳位，這個範例中我們使用實體編號 11 的腳位 (其 BCM 編號為 17)。
 - SG90 的工作電壓為 +4.8V 以上，所以我們必須連結至 Raspberry Pi +5V 的腳位，在此我們將 SG90 電源輸入接腳 (紅色) 連結至實體編號 2 的腳位。
 - 接地接腳 (棕色) 必須接地，所以連結至 Raspberry Pi 的實體編號 6 的腳位。
 - 腳位對應關係整理如下：

   SG90 伺服馬達接腳	|Raspberry Pi GPIO 腳位
   -----------------|---------------------
   橘色 (控制訊號)	  |實體編號 11 (BCM 編號 17)
   紅色 (電源輸入)	  |實體編號 2 (+5V)
   棕色 (接地)	     |實體編號 6 (接地)
 - 如之前所提，伺服馬達的啟動或運作電流可能會過大而造成運作不正常、甚至損毀 Raspberry Pi，因此如果你手邊的伺服馬達並沒有註明型號，也沒有相關規格，請避免直接連結至 Raspberry Pi。

6. 程式代碼
   
   `nano pwm_sg90.py`
   
   ```python
   import RPi.GPIO as GPIO
   import time
   
   CONTROL_PIN = 17
   PWM_FREQ = 50
   STEP=15
   
   GPIO.setmode(GPIO.BCM)
   GPIO.setup(CONTROL_PIN, GPIO.OUT)
   
   pwm = GPIO.PWM(CONTROL_PIN, PWM_FREQ)
   pwm.start(0)
   
   def angle_to_duty_cycle(angle=0):
       duty_cycle = (0.05 * PWM_FREQ) + (0.19 * PWM_FREQ * angle / 180)
       return duty_cycle
   
   try:
       print('按下 Ctrl-C 可停止程式')
       for angle in range(0, 181, STEP):
           dc = angle_to_duty_cycle(angle)
           pwm.ChangeDutyCycle(dc)
           print('角度={: >3}, 工作週期={:.2f}'.format(angle, dc))
           time.sleep(2)
       for angle in range(180, -1, -STEP):
           dc = angle_to_duty_cycle(angle)
           print('角度={: >3}, 工作週期={:.2f}'.format(angle, dc))
           pwm.ChangeDutyCycle(dc)
           time.sleep(2)
       pwm.ChangeDutyCycle(angle_to_duty_cycle(90))
       while True:
           next
   except KeyboardInterrupt:
       print('關閉程式')
   finally:
       pwm.stop()
       GPIO.cleanup()   
   ```
 
7. 程式說明如下:

 - 第 1 行引入 RPi.GPIO 套件，在這個範例中我們將使用這個套件所提供的 PWM 功能。
 - 第 4 行定義控制接腳所連結之 Raspberry Pi 腳位，我們連結的是實體編號 11 的腳位，其 BCM 編號為 17。
 - 第 5 行定義 PWM 所使用的頻率。
 - 第 6 行定義每次旋轉的角度。
 - 第 8 行使用 BCM 編號方式。
 - 第 9 行將控制腳位設定為輸出。
 - 第 11 行宣告 pwm 控制物件。
 - 第 12 行開始 pwm 功能。
 - 第 14~16 行定義角度與工作週期的對應關係，也就是前述的公式三。
 - 第 20~29 行透過兩個 for 迴圈將 SG90 由 0 度逐次旋轉至 180 度，之後再逐次轉回 0 度。
 - 第 30 行將 SG90 軸心旋轉至 90 度。
 - 第 31~32 行執行無任何功能的迴圈，其目的是讓 SG90 的軸心停在 90 度的位置。
 - 第 36~37 行確定程式停止後 pwm 功能會被關閉，而且程式所使用的腳位會回到預設狀態。

 程式完成後，輸入下列指令執行程式
 `python pwm_sg90.py`

### 利用 Raspberry Pi 硬體式 PWM 功能來控制伺服馬達 SG90

1. 支援硬體 PWM 功能的 `pigpio` 模組
2. 使用硬體式的 PWM 功能，所以控制接腳 (橘色) 必須連結至支援硬體 PWM 功能的腳位，使用實體編號 12 的腳位 (其 BCM 編號為 18)。
3. 啟用 pigpio 服務
   sudo service pigpiod start
4. 安裝 pigpio 套件
   pip install pigpio
5. 確認 pigpio 套件已正確安裝
   pip list
6. 線路圖
   <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521094725.png"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210521094725s.png"></a>
7. 說明如下:
 - 在這個範例中我們將使用硬體式的 PWM 功能，所以控制接腳 (橘色) 必須連結至支援硬體 PWM 功能的腳位，這個範例中我們使用實體編號 12 的腳位 (其 BCM 編號為 18)。
 - SG90 的工作電壓為 +4.8V 以上，所以我們必須連結至 Raspberry Pi +5V 的腳位，在此我們將 SG90 電源輸入接腳 (紅色) 連結至實體編號 2 的腳位。
 - 接地接腳 (棕色) 必須接地，所以連結至 Raspberry Pi 的實體編號 6 的腳位。

 - 腳位對應關係整理如下：

   SG90 伺服馬達接腳	|Raspberry Pi GPIO 腳位
   -----------------|---------------------
   橘色 (控制訊號)	  |實體編號 12 (BCM 編號 18)
   紅色 (電源輸入)	  |實體編號 6 (接地)
   棕色 (接地)	     |實體編號 2 (+5V)

8. 如之前所提，伺服馬達的啟動或運作電流可能會過大而造成運作不正常、甚至損毀 Raspberry Pi，因此如果你手邊的伺服馬達並沒有註明型號，也沒有相關規格，請避免直接連結至 Raspberry Pi。
   
9. 利用文字編輯器 (如 nano) 新增 Python 程式    
   `hardware_pwm_sg90.py`

   ```python
   import pigpio
   import time
   
   PWM_CONTROL_PIN = 18
   PWM_FREQ = 50
   STEP = 15
   
   pi = pigpio.pi()
   
   def angle_to_duty_cycle(angle=0):
       duty_cycle = int((500 * PWM_FREQ + (1900 * PWM_FREQ * angle / 180))
       return duty_cycle
   
   try:
       print('按下 Ctrl-C 可停止程式')
       for angle in range(0, 181, STEP):
           dc = angle_to_duty_cycle(angle)
           print('角度={: >3}, 工作週期={: >6}'.format(angle, dc))
           pi.hardware_PWM(PWM_CONTROL_PIN, PWM_FREQ, dc)
           time.sleep(2)
       for angle in range(180, -1, -STEP):
           dc = angle_to_duty_cycle(angle)
           print('角度={: >3}, 工作週期={: >6}'.format(angle, dc))
           pi.hardware_PWM(PWM_CONTROL_PIN, PWM_FREQ, dc)
           time.sleep(2)
       pi.hardware_PWM(PWM_CONTROL_PIN, PWM_FREQ, angle_to_duty_cycle(90))
       while True:
           next
   except KeyboardInterrupt:
       print('關閉程式')
   finally:
       pi.set_mode(PWM_CONTROL_PIN, pigpio.INPUT)   
   ```  

10. 程式說明如下:

- 第 1 行引入 pigpio 套件，在這個範例中我們將透過這個套件使用 Raspberry Pi 的硬體 PWM 功能。
- 第 4 行定義控制接腳所連結之 Raspberry Pi 腳位，我們連結的是實體編號 12 的腳位，其 BCM 編號為 18。
- 第 5 行定義 PWM 所使用的頻率。
- 第 6 行定義每次旋轉的角度。
- 第 8 行宣告 pigpio 控制物件。
- 第 10~12 行定義角度與工作週期的對應關係，也就是這篇文章中的公式三。不過因為 RPi.GPIO 所使用的工作週期參數範圍為 0 ~ 100，而 pigpio 的 hardware_PWM 函式所使用的工作週期參數範圍為 0 ~ 1000000，所以須將原公式乘以 10000。
第 16~25 行透過兩個 for 迴圈將 SG90 由 0 度逐次旋轉至 180 度，之後再逐次轉回 0 度。
- 第 26 行將 SG90 軸心旋轉至 90 度。
- 第 27~28 行執行無任何功能的迴圈，其目的是讓 SG90 的軸心停在 90 度的位置。
- 第 32 行確定程式結束後程式中所使用的腳位會回到預設狀態。

11. 程式完成後，輸入下列指令執行程式

    ```Shell
    python hardware_pwm_sg90.py
    ```
    
## 10. 開機自動執行 `shell` 程式

1. 目的：樹莓派開機時自動執行某些腳本，不用手動設置，減少麻煩。

2. 思路：新建一個自動啟動 `pigpio` 服務的腳本 pigpio.sh，然後添加執行命令到 /etc/rc.local文件中

3. 實現步驟
   3.1. 新建一個 bash shell 腳本
        `touch /home/pi/source/pigpio.sh` 
 
   3.2. 往 `pigpio.sh` 腳本添加如下內容
       
      ```bash 
      #!/bin/bash
      path="/home/pi/source"

      sudo service pigpiod start
      ```
   3.3. 給予腳本 `pigpiod.sh` 許可權並執行，查看是否能正常執行
     
      ```bash
      $ cd /home/pi/source
      $ chmod +x pigpiod.sh
      $ bash ./pigpiod.sh
      ```

   3.4. 在 `/etc/rc.local` 檔中添加執行指令碼命令
     
      ```bash
      :
      if [ "$_IP" ]; then
       printf "My IP address is %s\n" "$_IP"
      fi

      bash  ./home/pi/source/pigpiod.sh #添加這條命令，路徑是絕對路徑
      :
      ```

## 11. 開機自動執行 `python` 程式

### 步驟摘要如下 :
1. `Python` 程式第一行要放 #!/usr/bin/python3 指定執行之解譯器版本
2. 用 chmod 指令將此 Python 程式改為可執行 (+x), 例如 :
   `chmod +x /home/pi/test.py` 
3. 建立 bash shell 程式 `mypython`, 
   ```python
   #!/bin/bash
   ### BEGIN INIT INFO
   # Provides:          mypython
   # Required-Start:    $syslog $network
   # Required-Stop:     $syslog $network
   # Default-Start:     2 3 4 5
   # Default-Stop:      0 1 6
   # Short-Description: starts the mypython
   # Description:       starts mypython using start-stop-daemon
   ### END INIT INFO
   
   # /etc/init.d/mypython
   # 1.新增檔案權限：可以執行
   #   sudo chmod +x /etc/init.d/mypython
   # 2.設定開機啟動
   #   sudo update-rc.d mypython defaults 95
   #   (如果要移除開機啟動：sudo update-rc.d mypython remove)
   #   ( mypython 有修改的話，要執行 systemctl daemon-reload )
   # 3.使用指令碼啟動、停止服務
   #   sudo service mypython start
   #   sudo service mypython stop
   
   case "$1" in
       start)
           echo -n "Starting python: "
           echo "---------------------------------------------------------------------------------" >>/var/log/mypython
           date +"! %Y/%m/%d %a %T : Starting python ." >>/var/log/mypython
           echo start
           #cd /home/pi/inv/
           #./mqtt-ledv4-test.py >> /var/log/inv.log &
           cd /home/pi/source/
           ./test.py &
           echo "Done."
           echo ""
           date +"! %Y/%m/%d %a %T : Finished." >>/var/log/mypython
           echo "---------------------------------------------------------------------------------" >>/var/log/mypython
           touch /var/lock/subsys/python
           ;;
       stop)
           echo -n "Shutting Down python Listeners: "
           echo "---------------------------------------------------------------------------------" >>/var/log/mypython
           date +"! %Y/%m/%d %a %T : Shutting Down python." >>/var/log/mypython
           echo "python"
           #killall -9 mqtt-ledv4-test.py
           killall -9 test.py
           echo "Done."
           rm -f /var/lock/subsys/python
           echo "Done."
           date +"! %Y/%m/%d %a %T : Finished." >>/var/log/mypython
           echo "---------------------------------------------------------------------------------" >>/var/log/mypython
           ;;
       *)
           echo "Usage: mypython { start | stop | restart }"
           exit 1
           ;;
   esac
   exit 0
   ```
4. 修改其中第 38 行與第 51 行的 Python 程式檔名為自己要執行之 Python 程式檔名, 例如 test.py, 然後將此 `mypython` 程式放在 /etc/init.d/ 目錄下, 用 chmod 指令將其權限改為可執行 :
   `sudo chmod +x /etc/init.d/mypython` 
5. 設定 `mypython` 開機自動執行 :
   `sudo update-rc.d mypython defaults 95`
6. 啟動服務 :
   `sudo service mypython start`
7. 重開機檢查 Python 程式是否有在執行
   `ps -ax|grep mypython`

### 取消自動執行程序 :

1. 移除開機啟動設定：
   `sudo update-rc.d mypython remove`
2. 停止服務 :
   `sudo service mypython stop`
3. 刪除 mypython :
   `sudo rm /etc/init.d/mypython`


