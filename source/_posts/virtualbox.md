---
title: virtualbox
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-12-27 18:55:14
urlname: virtualbox
author: allen
img:
coverImg:
password: 5616b70ad3dda5e6509877de73ccd63eddb79073a6749dcbd1ec23f1bbb0856a
summary:
tags: virtualbox
categories: virtualbox
---
 

## 1. 安裝版本

首先我們要先下載 VirtualBox，請到[官網](https://www.virtualbox.org/)按下大大的 `Download` 按鈕吧；接著選擇 `Windows hosts` 版本進行下載，然後就執行安裝檔下一步按到底。

## 2. 攜帶版本

1. 至官網 [Protable-VirtualBox](https://www.vbox.me/) 下載 [Portable-VirtualBox_v5.1.22-Starter_v6.4.10-Win_all.exe](https://www.vbox.me/files/Portable-VirtualBox_v5.1.22-Starter_v6.4.10-Win_all.exe)。

2. 點擊該執行檔後，選擇一個資料夾(這裡用 V: 作示範)，解壓縮.
   ![20210128092733](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128092733.png)

3. 到資料夾 `V:\Protable-VirtualBox\data\language`
   將 `chinese.ini` 另存新檔 `taiwan.ini` 後，利用 `word` 讀檔後翻譯成繁體，複製完整內容，貼回 taiwan.ini。

   >存檔前，記得要先關閉 Word。

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128093541.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128093641.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128093719.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128094040.png)

4. 打開資料夾 V:\Protable-VirtualBox\data\settings\vboxinstall.ini, 修改要下載的檔案。

   ```javascript
   [download]
    key1=http://download.virtualbox.org/virtualbox/6.0.24/VirtualBox-6.0.24-139119-Win.exe
    key2=http://download.virtualbox.org/virtualbox/6.0.24/Oracle_VM_VirtualBox_Extension_Pack-6.0.24-139119.vbox-extpack
    update=http://www.vbox.me/update/
   [startvbox]
   key=1
   ```

   > 參考網站提供內容: `http://download.virtualbox.org/virtualbox` , 可下載其他版本。

5. 選擇要下載 32位元或64位元版本
   勾選，檔提取或壓縮完畢後運行 portable-VirtualBox
   按下 "下載 VirtualBox的安裝檔"
   開始下載，下載完後， 按下確定，開始拷貝資料到 `V:\Portable-VirtualBox\app32` 與 `V:\Portable-VirtualBox\app64`。

6. 啟動若出現:
   無法獲取 VirtualBox COM 物件。 應用程式現在將終止時:
   把所有 `V:\Portable-VirtualBox\app64\drivers` 的驅動程式 (*.inf) 都執行安裝一次.

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128094816.png)

7. 啟動後修改路徑:
   喜好設定 -> 一般 -> 預設機器資料夾: V:\Portable-VirtualBox\data\.VirtualBox\Machine

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128094858.png)

8. 建立虛擬機器
   ![新增機器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128111445.png)

   ![名稱和作業系統](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128111701.png)

   ![記憶體大小](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128111753.png)

   ![硬碟](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128111845.png)

   ![硬碟檔類型](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128111923.png)

   ![存放裝置實體硬碟中](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128112002.png)

   ![檔案位置和大小](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128112039.png)

   ![檔案位置和大小](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128112125.png)

9. 安裝作業系統
   ![設定](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128133936.png)

   ![加入光碟機](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134202.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134303.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134349.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134444.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134549.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128134634.png)

   調整啟動磁碟順序， `win10x64.iso` 光碟片，為第一優先啟動。

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128140749.png)

   按下「啟動」開始安裝系統
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128141337.png)

   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128141419.png)

   安裝擴充套件: 裝置 > 插入 `Guest Additions CD` 映像，
   ![20210128143123](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128143123.png)

   ![20210128143208](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128143208.png)

   會要求重新啟動。

   安裝完成後，可以退出`Guest Additions CD` 映像片。
   ![20210128143357](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128143357.png)

10. 網路驅動程式安裝
   step1: 進到網路連線，滑鼠右鍵點選「區域連線」，再點選「內容」
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128095121.png)

   step2: 在「區域連線 內容」視窗中點選「安裝」
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128095200.png)

   step3: 在「請選取網路連線類型」視窗中點選「服務」，再點選「新增」
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128095732.png)

   step4: 在「選取網路服務」視窗中點選「從磁片安裝」
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128095815.png)

   step5: 在「從磁片安裝」視窗中點選「瀏覽」
   step6: 在「找出檔案位置」視窗中，進入您VirtualBox Portable的資料夾路徑如 「V:\Portable-VirtualBox\app64\drivers\network\netlwf」下，點選 netflt 資料夾中的的 「VBoxNetFlt.inf」，在點選「確定」進行安裝
   ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210128095854.png)

   step7: 安裝完畢後會發現「區域連線 內容」視窗中多了「VirtualBox Bridged Networking Driver」
   step8: 在 `VirtualBox` 的網路連線，而我們點選「橋接介面卡(Bridged Adapter)」，使VirtualBox裡的作業系統可以存取我們的區域網路，這樣就可以使用pietty對安裝好的作業系統進行連線了。
