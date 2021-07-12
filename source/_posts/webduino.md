---
title: webduino
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2021-02-04 07:10:15
urlname: webdunio
author:
img:
coverImg:
password: 5616b70ad3dda5e6509877de73ccd63eddb79073a6749dcbd1ec23f1bbb0856a
summary: 
tags: 
 - webdunio
categories: webdunio
---
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'></script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css' />
<script src='https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js'></script>

## 資源

- [GitHub](https://github.com/webduinoio)

## Webdunio 與 Adrunio 的差異

|        | Ardunio     |Webdunio         |
|------- | ------------| ----------------|
|開發語言 | C/C++       | HTML/Javascript |
|開發環境 | Ardunio IDE | 瀏覽器、網頁編輯器 |
|連接方式 | USB、藍芽    | WiFI、WebSpcket |
|更新程式 | 連接燒錄     | 立即更新、連線燒錄|

>Ardunio 屬單機作業，不需連接伺服器端，即可獨立工作開發。
 Webdunio 屬連線作業，需連接上伺服器(雲端平台)，是線上開發。

## Webduino 的開發模式

要說是 Webduino 開發模式，不如說是「Web 開發模式」，簡單來說就是如果要「透過網頁」控制物聯網的開發板，就必須在網頁裡頭載入對應的 JavaScript，這樣才能使用對應的 API 來操控 開發板的腳位 (其實就跟網頁載入 JQuery 一模一樣)，舉例來說，當我們已經載入了對應的 JavaScript，只要網頁裡綁定一個 `led.on()` 的事件，對應的 led 燈就會亮起

![20210212230450](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212230450.png)

<a data-fancybox="gallery" href='hhttps://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212230450.png'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212230450_s.png' class="nofancybox  img-center" /></a>

常見的物聯網連線控制的方法有四種：**網際網路控制 (W-Fi)、區域網路控制 (WebSocket)、藍芽 (Bluetooth) 和序列埠 (Serial Port)，

這四種方式各有各的好處，舉例來說要在台灣控制美國的裝置，就必須使用 Wi-Fi 控制，如果要一次穩定的控制「手邊的」多台裝置，就可以考慮 WebSocket 和 Bluetooth 連線，如果只想單純接線控制，就可以採用 Serial Port 的做法。

<a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212230707.png'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212230707_s.png' class="nofancybox  img-center" /></a>

![20210212230707]()

## 連線控制方法

## 元件介紹

### 1. 玩具與馬達

#### 1.1. 伺服馬達

- 概要
  伺服馬達之所以叫做「伺服」馬達，是因為「伺服 servo」表示馬達會依照指示命令動作，由程式要馬達轉幾度，馬達就會轉幾度，但伺服馬達有機械結構上的限制，旋轉的角度是 180 度，但並非完全的 180 度，可能是 1 度到 180 度，或是 -2 度到 177 度都有可能，不過這些誤差都不影響這個範例的實作，這個範例將會介紹如何用 Blockly、HTML 與 JavaScript 去控制伺服馬達。

- 範例影片展示
  影片對應範例：<https://blockly.webduino.io/?page=tutorials/servo-1>

  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/Dar2pSWCSL8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作
  由於伺服馬達需要的電流量較大，因此必須採用獨立電源或是直接使用開發板上頭的 `VCC`，才能供應伺服馬達足夠的電流量，伺服馬達具有三條電線。紅色的為正電，深咖啡色是接地 `GND`，橘色的則是訊號線，而伺服馬達的訊號源接在 `11` 的腳位即可。

  >由於 Webduino 支援開發板種類只會越來越多，接線圖先使用馬克一號與 Fly 示範，對於其他開發板來說，只要 訊號腳接數位腳 (數字)，仍會有一樣的效果。

- 馬克一號接線示意圖：
  ![馬克一號接線伺服馬達](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235139.png)

- Fly 接線示意圖：
  ![FLY 接線伺服馬達](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235321.png)

- 基本操作
  打開 [Webduino Blockly 編輯工具](https://blockly.webduino.io)，在畫面中放入開發板積木，填入 Device ID，在開發板內放入伺服馬達的積木，腳位設定 10，伺服馬達變數名稱設定為 servo。

  >開發板的積木在「開發板控制」目錄下，伺服馬達積木在「玩具及馬達 > 伺服馬達」的目錄下。
  ![伺服馬達 Blockly](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235415.png)

  放入「伺服馬達 servo 旋轉角度」的積木，可以透過圓餅圖調整角度，或直接使用數字積木顯示度數，伺服馬達角度區間為 0~180 度。
  ![伺服馬達旋轉角度](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235442.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以看到伺服馬達旋轉到指定的角度。

  >範例解答：`https://goo.gl/IHNms0`

  進階一點，如果透過「迴圈」和「等待」的積木，就可以自訂伺服馬達左右擺動十次的效果，要實現這個效果，首先放入「重複 10 次」的迴圈積木，在裡頭第一個放入伺服馬達旋轉到 180 度的積木，後面銜接一個「等待 0.5 秒」的積木，接著再放入旋轉到 0 度的積木，再銜接一個「等待 0.5 秒」的積木，如此一來就會重複這些動作十次。

  >迴圈的積木在「基本功能 > 迴圈」目錄下，等待的積木在「進階功能 > 等待」目錄下。
  ![伺服馬達 Blockly](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235539.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以看到伺服馬達先旋轉到一側，接著就會旋轉到另一側，重複這樣一輪的動作十次。

  >範例解答 (雲端平台)：`https://blocklypro.webduino.io/#7ylGNpvKze`
   範例解答 ( 體驗版 )：`https://goo.gl/TKax8r`

- 網頁拉霸操控伺服馬達
  接下來，我們可以透過網頁操控伺服馬達，打開 Webduino Blockly 的網頁互動測試區，下拉選單選擇「拉霸操作」，畫面裡會出現一個網頁拉霸，此時在右下角也會出現對應的積木功能可以選擇。
  ![網頁互動拉霸](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235829.png)

  一開始先設定拉霸數值和伺服馬達旋轉角度都是 90 度，因為這樣才會先讓伺服馬達旋轉到中間的位置。
  ![網頁互動拉霸](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235859.png)

  再來就是透過拉霸的積木，指定最大值、最小值、間距和預設值，拉動拉霸的時候，會顯示拉霸的數值，同時伺服馬達也會旋轉到這個角度。
  ![拉霸控制伺服馬達旋轉角度](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211235919.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以使用網頁拉霸操控伺服馬達，拉霸往右伺服馬達就旋轉到右邊，往左就旋轉到左邊。

  >範例解答 ( 雲端平台 )：`https://blocklypro.webduino.io/?demo=demo-area-06#XQdja1Ew9Q`
   範例解答 ( 體驗版 )：`https://goo.gl/q8cBsb`

- 相關參考
  - 範例解答 - 伺服馬達基本操控(雲端平台)：`https://blocklypro.webduino.io/#7ylGNpvKze`
  - 範例解答 - 網頁操控伺服馬達 (雲端平台)：`https://blocklypro.webduino.io/?demo=demo-area-06#XQdja1Ew9Q`
  - 範例完整程式碼：`http://bin.webduino.io/susih/edit?html,js,output`

### 2. 環境偵測

#### 2.1. 溫濕度偵測

- 溫濕度偵測
  溫濕度傳感器是接收外界環境變數最基本的傳感器，透過溫濕度傳感器，可以準確的偵測溫度與溼度的即時變化，若再搭配一些樣式表、圖表工具或後端資料庫，就可以整合成為非常有用的數據收集應用。

- 接線與實作
  溫濕度傳感器有四支針腳，格子狀的一面面朝自己，左邊數來第一支針腳為 v (接 3.3V)，第二支為 data (接 5)，第三支沒有作用，第四支為 GND。
  ![溫濕度傳感器腳位介紹](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212101404.png)

  因為溫濕度的針腳較細，如果使用杜邦線連接會鬆脫，可使用麵包板進行連接。
  ![Webduino Smart 與溫濕度傳感器接線圖](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212101422.png)

- Webduino Blockly 操作解析
  在畫面中放入開發板積木，開發板下拉選單選擇「Smart」，連線方式選擇「Wi-Fi」，填入 Device ID，在開發板內放入溫濕度傳感器的積木，腳位設定 5。

  >取得 Device ID、使用 IP 來進行 WebSocket 操控，請參考：[Webduino Smart(初始化設定)](https://tutorials.webduino.io/zh-tw/docs/basic/board/smart-setup.html)

  ![20210212104618](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212104618.png)

  放入使用溫濕度傳感器偵測的積木，設定為每 1000 毫秒 (1 秒) 偵測一次，並用網頁互動測試區的「顯示文字」顯示偵測到的數值，透過下拉選單可以選擇偵測溫度或是濕度，溫度單位為「攝氏幾度」，濕度則是「百分比」。
  ![顯示溫濕度傳感器偵測數值](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212104830.png)

  如果要同時顯示溫濕度，可以使用「建立字串」的積木來組合字串，一開始建立字串積木預設只有兩個缺口，透過點選藍色小齒輪，增加缺口的數量。

  >建立字串、文字積木在「基本功能 > 文字」目錄裡。

  ![增加顯示字串](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212104908.png)

  增加了缺口後，在缺口內填入對應的文字以及偵測到的溫濕度，如果需要換行，可輸入<br/>就可以換行。
  ![溫濕度傳感器顯示設定](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212104939.png)

  同時也可以指定顯示文字的大小、行高的設定。

  如果要使用文字大小、行高的積木，必須先打開「網頁互動測試區」，下拉選單選擇「顯示文字」，相關功能就會出現在左側「顯示文字」的目錄內。
  ![設定文字行高與大小](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212105020.png)
  
  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以開始偵測環境的溫濕度了。

  >如果偵測到的數值顯示 undefined，表示溫濕度接觸不良，通常稍微調整接觸的針腳即可解決。
   範例解答：`https://goo.gl/O3ueY3`

- 相關參考
  - 範例解答：`https://goo.gl/O3ueY3`
  - 完整程式碼：`http://bin.webduino.io/yetita/edit?html,js,output`
  - 其他溫濕度教學文：[溫濕度](https://tutorials.webduino.io/zh-tw/docs/basic/sensor/dht.html)

### 3. 無線感應

#### 3.1. RFID

RFID 是 Radio Frequency IDentification 的縮寫，中文翻譯為「無線射頻辨識」，是一種常見的無線通訊技術，透過 RFID 識別裝置 (讀卡器) 所產生的「電磁場」，能讓附著在物品上的「電子標籤」獲得能量進而發送無線電頻率的訊號，RFID 在今日相當的普及，常見於庫存、資產、人員等的追蹤與管理，甚至許多的防偽、畜產管理也都有 RFID 的身影存在。

- 範例影片展示
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/RrCAOgtPHdo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作
  這裏我們使用的 RFID 識別裝置的型號為 RC522，RC522 主要針對 13.56MHZ 的無線電頻率識別，工作電壓為 3.3V ，上頭共有八支接腳，分別是 SDA、SCK、MOSI、MISO、IRQ、GND、RST、VCC，其中 SDA、SCK、MOSI、MISO 負責訊號的輸入和輸出。
  ![20210216112203](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216112203.png)

- <font color=blue>Arduino UNO + Webduino Fly 接線方式</font>
  Arduino UNO 本身的數位腳各自有各自的功能，因此我們將 SDA 接 10，SCK 接 13，MOSI 接 11，MISO 接 12，GND 接在 GND，3.3V 接在 3.3V 的位置。( IRQ 是中斷的腳位，RST 是重置的腳位，因為在本範例中不會用到，所以這裡就不需要接這兩個接腳 )
  ![FLY 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113252.png)

  實際接線照片：
  ![FLY 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113340.png)

  ![FLY 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113402.png)

- <font color=blue>Webduino Smart 接線方式</font>
  如果是使用 Webduino Smart 腳位也有對應功能，所以接線方式就把 15 接 SDA，14 接 SCK，13 接 MOSI，12 接 MISO，GND 接 GND，3.3V 接 3.3V 的位置。

  >如果要使用 Smart 操控，請使用[雲端平台](https://tutorials.webduino.io/zh-tw/docs/cloud/index.html) 更新韌體，韌體版本有 reg 標記表示有支援 RFID。

  ![Smart 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113538.png)

  實際接線照片：
  ![Smart 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113628.png)

- 基本操作
  打開 Webduino Blockly 編輯工具 (`https://blockly.webduino.io`)，因為這個範例會用網頁「顯示文字」來顯示偵測到的每張 RFID 磁卡卡號，所以要先打開 Webduino Blockly 的網頁互動測試區，下拉選單選擇「顯示文字」，此時在右下角會出現對應的積木功能可以選擇。
  ![網頁互動測試](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113709.png)

  把開發板放到編輯畫面裡，填入對應的 Webduino 開發板名稱，開發板內放入 RFID 積木，名稱設定為 rfid，腳位設定為 SDA 10、SCK 13、MOSI 11、MISO 12。( 如果是 Smart 就選擇 SDA 15、SCK 14、MOSI 13、MISO 12 )

  >RFID 相關的積木在「無線感應 > RFID」目錄下。

  ![RFID 積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113859.png)

  擺入 rfid 偵測訊號的積木，透過網頁顯示偵測到的代碼。
  ![RFID 偵測數值](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216113935.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，用 RFID 磁卡去接觸感應器，就可以看到每張卡的對應的卡號了。

  >執行的時候有可能會發生「腳位選錯但仍正確讀取到卡號」的狀況，這是因為 RFID 程式底層不是使用數字，而是使用 SDA、SCK、MOSI 和 MISO 操控，在積木上的腳位則是方便使用者接線識別，不過如果實際接線接錯，仍然是無法順利運作的，要特別注意。
  >範例解答(雲端平台)：`https://blocklypro.webduino.io/?demo=demo-area-01#Xxl0OpoZ81`
  >範例解答 (體驗版)：`https://goo.gl/FEcQvB`

- 相關參考
  - 範例解答 (雲端平台)：`https://blocklypro.webduino.io/?demo=demo-area-01#Xxl0OpoZ81`
  - 範例解答 ( 體驗版 )：`https://goo.gl/FEcQvB`
  - 範例完整程式碼：`http://bin.webduino.io/lutal/edit?html,js,output`

## Webdunio 系列開發板

- 產品
  ![20210211162314](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211162314.png)

- Webduino 控制：一對一、多對一、一對多
  ![20210211162419](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211162419.png)

## Webduino 三大雲端平台

- Blockly 體驗版
  <a href="https://blockly.webduino.io"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211165028.png" width="400px" height="300px"></a>

  >不用註冊、就可使用

- Blockly 模擬器
  <a href="https://simulator.webduino.io/"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211165135.png" width="400px" height="300px"></a>

  >不用註冊、就可使用

- Blockly 雲端平台
  <a href="https://cloud.webduino.io"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210211165213.png" width="400px" height="300px"></a>

  >需註冊、功能最完整

>Webdunio Bit 教育版 與 Micro Bit 相仿功能

## Webduino Smart

### 1. 硬體介紹

- Webduino Smart (介紹)

  Webduino Smart 是 2016 年推出的物聯網開發板，有別於過去馬克 1 號和 Fly 需要搭配 Arduino 才能運作，Smart 可以自行獨立運作，同時也具備連上網際網路 ( Internet ) 和透過區域網路 ( WebSocket ) 操控的能力，相信更能有效地應用在物聯網的開發和各種創意上！

- [Webduino Smart(初始化設定)](https://tutorials.webduino.io/zh-tw/docs/basic/board/smart-setup.html)

  <iframe width="560" height="316" src="https://www.youtube.com/embed/b-7B5fljwG4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  第一次雲端更新 + 取得 Device ID：
  <iframe width="560" height="316" src="https://www.youtube.com/embed/UtY4O5T7JgE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <hr>

  1. **接上電源，輸入 Wi-Fi 帳號密碼連線**
     和馬克一號與 Fly 同樣的第一步驟，就是設定 Wi-Fi 的帳號密碼，不過不同的是，設定完帳號密碼後，我們就可以讓 Smart 純粹透過 WebSocket 走區域網路連線，不需要連到外部的網路環境也能運作，如果想要連線到外部網路環境 ( Internet )，也因為設定了 Wi-Fi 帳密，就可以順利連接到網際網路了。

     第一步就是接上電源，這時候在具備 Wi-Fi 功能的電腦、筆電或行動裝置的 Wi-Fi 搜尋裡，就可以看到有個名為「Smart」的裝置，此時開發板會閃紅燈，接著紅燈恆亮，這是正常的狀況，因為開發板尚未連線至區域網路。( 不過如果你已經照著接下來的步驟設定完成，還是一樣紅燈恆亮應該就是設定錯誤或不正常了 )

     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-01.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-01_s.jpg' class="nofancybox  img-center" /></a>

     點選 `smart` 後輸入預設密碼 `12345678`，進行連線。

     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-02.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-02_s.jpg' class="nofancybox  img-center" /></a>

     有與 `smart` 裝置構成連線的畫面
     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-02-1.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-02-1_s.jpg' class="nofancybox  img-center" /></a>

  2. 設定 Wi-Fi 帳號密碼與顯示名稱
     連線後打開瀏覽器 ( 建議使用 Chrome )，網址列輸入 192.168.4.1，進入設定畫面後設定裝置在 Wi-Fi 搜尋中所顯示的名稱和密碼 ( 避免別人用 12345678 也可以連結到你的裝置 )，Device ID 的部分會在進行第一次韌體更新後配發 ( 下面的步驟會介紹 )，每塊 Smart 會配發唯一的一個 ID，因此您無法填寫與修改。

     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-031.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-031_s.jpg' class="nofancybox  img-center" /></a>

     Wi-Fi 頁籤就可以設定的所在場所的 Wi-Fi SSID 與 PWD，此處可以設定三組 SSID 和 PWD，在不同場域會自動切換。

     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-032.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-032_s.jpg' class="nofancybox  img-center" /></a>

     設定完成後就可以按下 SUBMIT 儲存，出現 Save OK 的字樣表示儲存成功，此時 Smart 開發板會重啟並閃爍紅燈，當紅燈熄滅，且綠燈亮起一次之後，表示 Smart 開發板已經成功連結上家裡或環境內的 Wi-Fi 基地台。( 若紅燈持續閃爍或恆亮，請移除電源，重新操作步驟 1 與步驟 2 )

     >初次使用的用戶，務必在成功連線後，連線 `Internet` 更新韌體，取得 `Device ID`。

     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-04.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-04_s.jpg' class="nofancybox  img-center" /></a>  

     **更新韌體**
     `Smart` 由關機狀態接通電源，亮紅燈時按住小按鍵(不放)->轉成綠燈(不放)->綠燈熄滅->放開按鍵->藍燈->開始更新，勿關電源。等候更新完成，`Smart` 會重新開機。這是第 1 次韌體更新。

     電腦瀏覽器輸入 `192.168.4.1` 連到 `Smart`，看到如下畫面，已經有`Device ID`。至此更新步驟完成。

  3. 獲得區域網路 IP
     設定儲存完成後，移除開發板電源，重新接上開發板電源，這時開發板會開始閃紅燈，和區域網路連線後就會亮起綠燈，一秒後綠燈會消失 ( 若紅燈持續閃爍或亮紅燈，請返回步驟一重新設定 )，此時我們可以在電腦或行動裝置的 Wi-Fi 搜尋裡，看到「我們自訂的名稱_192.168.XXX.XXX 」，以下方的例子來說就是「COOL_192.168.0.230」，記下後面這個 IP 數字，透過這個 IP 我們就可以用 WebSocket 來連線控制了。
     <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-05.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-05_s.jpg' class="nofancybox  img-center" /></a>  

- 預設元件和腳位介紹

  Webduino Smart 是一塊長 3 公分寬 2.5 公分的開發板，重量約 85 公克，腳位有數位腳 ( 0、2、4、5、12、13、14、15、16 )，PWM 腳位 ( 12、13、15 )，類比腳 AD ( A0 )，其他腳位 TX、RX、3.3V、VCC、RST 和 GND 各 1 個。

  開發板內建一個光敏電阻、一個三色燈和一個微型按鈕開關，其中 AD 腳位預設供給光敏電阻使用，三色 LED 燈的紅色使用 15 號腳、綠色使用 12 號腳、藍色使用 13 號腳 ( 三色 LED 燈為「共陰」，在官網其他範例外接的三色 LED 為「共陽」 )，而一個微型按鈕開關則使用了 4 號腳位，使用的時候要特別注意。

- 腳位圖
  ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-01.png)

- 外觀介紹
  1. 大小對照 ( 左邊是四號電池和三號電池 )：
     ![20210209115523](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209115523.png)

  2. 360 度照片：
     ![20210209115543](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209115543.png)

### 2. Webduino Smart 初始化影片

- 初始化設定步驟
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/b-7B5fljwG4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 第一次雲端更新 + 取得 Device ID：

  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/UtY4O5T7JgE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- Webduino Smart 初始化步驟說明

1. <font color='blue'>接上電源，輸入 Wi-Fi 帳號密碼連線</font>

   和 `馬克一號` 與 `Fly` 同樣的第一步驟，就是設定 `Wi-Fi` 的帳號密碼，不過不同的是，設定完帳號密碼後，我們就可以讓 `Smart` 純粹透過 `WebSocket` 走區域網路連線，不需要連到外部的網路環境也能運作，如果想要連線到外部網路環境 (Internet)，也因為設定了 Wi-Fi 帳密，就可以順利連接到網際網路了。
   <br>

   第一步就是接上電源，這時候在具備 Wi-Fi 功能的電腦、筆電或行動裝置的 Wi-Fi 搜尋裡，就可以看到有個名為「Smart」的裝置，此時<font color=red>開發板會閃紅燈，接著紅燈恆亮</font>，這是正常的狀況，因為開發板尚未連線至區域網路。( 不過如果你已經照著接下來的步驟設定完成，還是一樣紅燈恆亮應該就是設定錯誤或不正常了 )

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-01.jpg)

   點選後輸入預設密碼 <font color=orange>12345678</font>，進行連線。

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-02.jpg)

2. <font color='blue'>設定 Wi-Fi 帳號密碼與顯示名稱</font>
   連線後打開瀏覽器 (建議使用 Chrome)，網址列輸入 <font color=orange>192.168.4.1</font>，進入設定畫面後設定裝置在 Wi-Fi 搜尋中所顯示的名稱和密碼 (避免別人用 12345678 也可以連結到你的裝置)，Device ID 的部分會在進行第一次韌體更新後配發 (下面的步驟會介紹)，每塊 Smart 會配發唯一的一個 ID，因此您無法填寫與修改。

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-031.jpg)

   Wi-Fi 頁籤就可以設定的所在場所的  <font color=orange>Wi-Fi SSID 與 PWD</font>，此處可以設定三組 SSID 和 PWD，在不同場域會自動切換。

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-032.jpg)

   設定完成後就可以按下 SUBMIT 儲存，出現 **Save OK** 的字樣表示儲存成功，此時 Smart 開發板會 <font color=orange>重啟並閃爍紅燈，當紅燈熄滅，且綠燈亮起一次之後</font>，表示 Smart 開發板已經成功連結上家裡或環境內的 Wi-Fi 基地台。(若紅燈持續閃爍或恆亮，請移除電源，重新操作步驟 1 與步驟 2)

   >初次使用的用戶，務必在成功連線後，連線 Internet 更新韌體，取得 Device ID。

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-04.jpg)

3. <font color='blue'>獲得區域網路 IP</font>
   設定儲存完成後，移除開發板電源，重新接上開發板電源，這時開發板會開始閃紅燈，和區域網路連線後就會亮起綠燈，一秒後綠燈會消失 ( 若紅燈持續閃爍或亮紅燈，請返回步驟一重新設定 )，此時我們可以在電腦或行動裝置的 Wi-Fi 搜尋裡，看到「<font color=orange>我們自訂的名稱_192.168.XXX.XXX</font>」，以下方的例子來說就是「COOL_192.168.0.230」，記下後面這個 IP 數字，透過這個 IP 我們就可以用 WebSocket 來連線控制了。

   ![Webduino Smart 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-05.jpg)

4. <font color='blue'>打開 Webduino Blockly 進行測試</font>
   打開 Webudino Blockly (`http://blockly.webduino.io`，如果是使用 WebSocket 連線，<font color=orange>網址開頭必須為 http 不能是 https</font>，要特別注意！)，放入開發板的積木，種類選擇 Smart，連線方式選擇 WebSocket，然後填入剛剛的 IP，接著放入三色 LED 燈的積木 ( 使用<font color=orange>三色共陰</font>)，紅色設定 15，綠色 12，藍色 13，並設定三色 LED 燈的顏色為紅色。( 欲使用 Device ID 控制請看步驟五與步驟六 )

   >Webduino Blockly：`http://blockly.webduino.io`
    Webduino Blockly 教學：[Webduino Blockly 基本功能](https://tutorials.webduino.io/zh-tw/docs/basic/blockly/blockly-tutorial-01.html)、[Webduino Blockly 進階功能](https://tutorials.webduino.io/zh-tw/docs/basic/blockly/blockly-tutorial-02.html)

   ![Webduino Smart 連線](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-06.png)

   點選執行，就可以看到 Smart 開發板上頭的三色燈發出紅色光了。

   >解答：`http://blockly.webduino.io/#-KbJUDpxOP4DtqhWwR82`

   ![Webduino Smart 連線](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-07.gif)

5. <font color='blue'>- 連線 Internet 更新韌體</font>
   Webduino Smart 有個很方便的特色功能，當我們透過步驟 1 到步驟 3 初始化設定成功後，就可以連上 Internet 進行遠端更新，方便大家獲取最新的韌體功能，更新的方式很簡單，在步驟 3 接上電源後，按住 Micro USB 旁的微型按鈕開關 ( 按住不放 )。

   注意！如果先按住按鈕，再接電源，會讓 Smart 回復出廠設定，如果回復出廠設定，Wi-Fi SSID 和密碼都必須重新設定。

   按按鈕更新韌體，只是讓基本功能的更新與提升開發板效能更為便利，如果要取得最新版本的韌體，必須透過<font color=orange>雲端平台</font>進行更新。

   ![Webduino Smart 更新](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-08.jpg)

   按住<font color=orange>直到綠燈亮起後，再放開按鈕開關，此時藍色燈會亮起 ，表示開始下載更新檔</font>，下載完成後完成後藍色燈會熄滅，開始進行更新 ( 約 5~10 秒 )，更新完成後紅色燈會亮起，接著會閃紅燈進行連線，連線成功後綠色燈會亮起，當綠燈熄滅，表示我們可以重新開始控制開發板。 (<font color=orange>注意！進行更新的 5~10 秒請勿移除電源，否則可能會造成更新失敗而無法啟用開發板的狀況</font>)
   ![Webduino Smart 更新](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-09.jpg)

   更新完成後可再參考「步驟 1」，透過 192.168.4.1 進入設定頁面，就可以看到版本號已經更新，同時也出現 Device ID 了。
   ![Webduino Smart 更新](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-10.jpg)

   更新後的 Smart，<font color=orange>預設三分鐘後會關閉 Wi-Fi AP 功能</font>(無法在 Wi-Fi 搜尋清單中看到 )，若要持續顯示在 Wi-Fi 清單裡，可勾選 Always enable WiFi AP。

   ![Webduino Smart 更新](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-12.jpg)

6. <font color='blue'>使用 Device ID 控制</font>
   當我們已經透過步驟 5 的遠端更新取得 Device ID，如果不想用 WebSocket 操控，亦可用這組 Device ID 來控制，控制的方法就和 Webduino 馬克一號與 Webduino Fly 一樣，連線方式選擇 Wi-Fi，填入 Deivce ID 就可以操控。

   ![Webduino Smart Wifi](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-setup-11.jpg)

### 3. Smart 應用

#### 3.1. 自走車

- 組裝
  Smart 自走車是 Webduino 自主研發的產品，專為 Smart 開發板量身打造，輕巧、方便又環保！不僅能 DIY 動手玩創意，還能輕鬆學習程式邏輯概念，實作出一台具個人特色的自走車。

- 展示影片
  ![展示影片](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209112838.png)

- 接線與實作
  - 所需材料列表：
    ![Smart 自走車材料](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209112928.png)

  - 將杜邦線從木板的長方形鏤空處穿出（照片以左側馬達固定版為例）
    ![組合馬達與木板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113001.png)

  - 將減速馬達平整面貼緊木板，圓點凸出面朝外，插入螺絲 2.螺絲尾端以螺母固定，指尖頂住螺母並拴緊螺絲
    ![拴入螺絲](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113352.png)

  - 左右馬達固定板完成圖示
    ![馬達固定板完成](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113428.png)

  - 將馬達固定板沿較長軌道滑入
    ![與木板組裝](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113500.png)

  - 插入木頭卡榫固定，並安裝大輪子到馬達兩側
    ![插入木頭卡榫](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113528.png)

  - 自走車頂板正、反面
    ![自走車頂板正反面](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113551.png)

    1.將三角頂板轉至反面，定向輪對準孔位並插入螺絲 2.正面用指尖頂住螺母，將螺絲旋緊 3.定向輪組裝完成圖
    ![定向輪組裝](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113627.png)

  - 杜邦線穿入三角頂板兩側正方形孔，將馬達固定板上緣卡榫處，對準自走車頂板兩側長方形孔位
    ![組裝馬達與頂板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113649.png)

  - 將自走車頂板與馬達固定板卡榫處，向前推到底並插入木頭卡榫固定，插入木頭卡榫固定
    ![組合馬達固定板與頂板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113714.png)

    1.插入固定板 2.頂板上方插入四片小積木 3.將馬達驅動板放入自走車頂部
    ![插入固定板及馬達驅動板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113814.png)

  - 要操控 Smart 自走車，組裝玩車體之後，需要裝上雙馬達驅動板及 Smart 開發板，再接上電源才可運作。
    馬達、馬達驅動板及 Smart 開發板接線示意圖：
    ![接線示意圖](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209113850.png)

    - A 線 ( 馬達右上 ) → 馬達驅動板 B2 → Smart 腳位 14
    - B 線 ( 馬達右下 ) → 馬達驅動板 B1 → Smart 腳位 16
    - C 線 ( 馬達左上 ) → 馬達驅動板 A1 → Smart 腳位 2
    - D 線 ( 馬達左下 ) → 馬達驅動板 A2 → Smart 腳位 5
    - 馬達驅動板 + 號 → Smart 3.3V 腳位
    - 馬達驅動板 - 號 → Smart GND 腳位

  - 實際接線照片：
    ![接線照片](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209114000.png)

  - 馬達、馬達驅動板及 Smart 開發板接線完成照片：
    ![接線照片](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209114023.png)

    以上是 Smart 自走車的組裝步驟，接下來就可以透過 Webduino Blockly 來輕鬆玩轉自走車囉！

- 相關參考
  >Smart 自走車操控教學： [Smart 自走車鍵盤操控](https://tutorials.webduino.io/zh-tw/docs/useful/example/smart-robot-car-remote-control.html)

#### 3.2. 自走車(網頁遙控器操控)

- 操作解析

  打開 `Webduino` 雲端平台，並選擇 [Blockly 編輯工具](https://blocklypro.webduino.io/)，你可以建立一個積木程式專案，並命名為 Smart 自走車 (網頁遙控器操控)。

  ![建立專案](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209144620.png)

  >使用雲端平台之前須先註冊並登入，首次註冊教學請點此：[註冊與登入](https://tutorials.webduino.io/zh-tw/docs/cloud/basic/cloud-register.html)

- Webduino Blockly 操作解析

  接著會進入 Blockly 畫面，打開網頁互動測試區，下拉選單選擇「遙控器」，就會帶出一個網頁遙控器，當完成積木操控程式，就可以用行動裝置打開這個遙控器。
  ![網頁遙控器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209144714.png)

  首先放入開發板及自走車的積木，開發板設定為 Smart，自走車名稱命名為 car，腳位設定右前 14、右後 16、左前 2、左後 5。

  >開發板設定積木在「開發板控制 > 開發板」目錄下。
   自走車的積木在「玩具及馬達 > 自走車」目錄下。

  ![自走車積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209144744.png)

  使用「遙控器按鍵按下」的積木，設定按住向上的圖案時，自走車會往前移動，如果放開就會停止。
  >遙控器積木在「遙控器」目錄下。
  ![網頁遙控器控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209144811.png)

  依序把前進、後退、左轉與右轉的行為放入遙控器的動作裡。
  ![網頁遙控器控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209144830.png)

  填入 `Smart` 開發板 `Device ID`，確認開發板上線，點選右上方紅色按鈕執行，就可以用網頁裡的遙控器操控自走車了。

  >範例解答：`https://blocklypro.webduino.io/#7ggDlVjoPn`

- 行動裝置操控

  如果想透過行動裝置 ( 手機或平板，Android / IOS 皆可 )，只需點選上方「產生即時預覽 QRCode 的按鈕」，點選後會彈出一個 QRCode。
  ![Blockly 產生 QRCode](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145330.png)

  用行動裝置掃描 QRCode，就會打開遙控器的網頁，剛剛所做的積木程式會直接在這個網頁裡執行，也就可以用行動裝操控 Smart 自走車了。
  ![手機遙控器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145403.png)

- 進階功能

  為了發揮行動裝置的功能，凸顯行動裝置和電腦的差異，這邊要來偵測行動裝置的陀螺儀和加速度計，這樣我們就能夠偵測行動裝置的旋轉、翻轉與加速度。在畫面中多綁定一個遙控器事件，當按下中間圓型小點的按鈕，就可以啟動偵測行動裝置陀螺儀的功能，反之放開就取消這功能。

  >行動裝置偵測的積木在「進階功能 > 行動裝置」目錄下。

  ![手機陀螺儀與加速度控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145617.png)

  在偵測旋轉翻轉的區塊內，放入邏輯判斷，判斷三個情形：前後翻轉角度大於 20 ( 表示手機往前翻 )，前後翻轉角度小於 -20 ( 表示手機往後翻 )，以及前後翻轉角度在 -20~20 的區間。

  >邏輯相關積木在「基本功能 > 邏輯」目錄下，數字的積木在「基本功能 > 數學式」目錄下。

  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145753.png)

  在第一個判斷條件內放入判斷左右翻轉的第二層邏輯，目的在偵測手機是往左前、右前還是正前方翻轉。

  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145812.png)

  後面兩個判斷式依此類推，這樣就可以完成手機翻轉時，自走車也會跟著動作的邏輯程式。
  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209145841.png)

  同樣的，點選上方產生即時預覽的 QRCode 按鈕，產生 QRCode，透過行動裝置掃描，就可以使用行動裝置的陀螺儀操控自走車了。( 記得要按住中間原點的黑色按鈕 )

  >範例解答：`https://blocklypro.webduino.io/?demo=demo-area-09#71EN9LPn2x`

- 相關參考

  - 組裝步驟：Smart 自走車 (組裝步驟)
  - 範例解答：Smart 自走車 (網頁遙控器操控)
  - 範例解答：Smart 自走車 (手機陀螺儀操控)
  - 完整程式碼：<https://bin.webduino.io/toxip/edit?html,css,js,output>

#### 3.3. 自走車(超音波避障)

#### 3.3.1 接線與實作

因為**超音波傳感器**與自走車上的**雙馬達驅動板**，同時都會用到 `GND` 的腳位，所以使用麵包板來連接，超音波 `VCC` 接 `Smart` 開發板的 `VCC` 腳位，`Trig` 接 `13`，`Echo` 接 `15`，超音波傳感器的 `GND` 與馬達驅動板的一號針腳都連接到 Smart 開發板的 `GND` 腳位。

- 接線示意圖
  ![Webduino Smart 自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209150739.png)

- 實際接線照片：
  ![超音波避障實際接線照片](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209150808.png)

#### 3.3.2. 操作解析

打開 `Webduino` 雲端平台，並選擇 [Blockly 編輯工具](https://blocklypro.webduino.io/)，你可以建立一個積木程式專案，並命名為 `Smart 自走車(超音波避障)`。

![建立專案](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151334.png)

>使用雲端平台之前須先註冊並登入，首次註冊教學請點此：[註冊與登入](https://tutorials.webduino.io/zh-tw/docs/cloud/basic/cloud-register.html)

#### 3.3.3. Webduino Blockly 操作解析

進入專案 `Blockly` 畫面，打開網頁互動區域，因為這個範例將會使用「顯示文字」來顯示超音波偵測到的距離。當我們選擇下拉選單選擇「顯示文字」，此時在左側積木列的最下方將會出現對應的積木功能可以選擇。
![Webduino Smart 自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151647.png)

接著會進入 `Blockly` 畫面，在畫面中放入開發板積木，開發板下拉選單選擇「Smart」，連線方式選擇「Wi-Fi」，填入 `Device ID`，在開發板內放入自走車積木，腳位設定右前 `14`、右後 `16`、左前 `2`、左後 `5`。再放入超音波傳感器積木，`Trig` 腳位設定 `13`，`Echo` 腳位設定 `15`。

>自走車積木在「玩具及馬達 > 自走車」目錄下。
 超音波傳感器的積木在「環境偵測 > 超音波」目錄下。

![超音波腳位設定](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151714.png)

放入 `ultrasonic` 擷取距離的積木，設定每 `1200 毫秒` (1.2 秒) 偵測一次，並且透過「顯示」積木將距離數值顯示在網頁上。
![顯示偵測距離](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151810.png)

#### 3.3.4. 實作避障車程式

有了距離之後可以使用「邏輯」積木做到自動避障，將邏輯積木放到 ultrasonic 擷取距離的積木內，點擊藍色小齒輪，設定兩個邏輯判斷。

>邏輯積木在「基本功能 > 邏輯」目錄下。
![邏輯判斷小齒輪操作](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151910.png)

透過邏輯判斷，設定與障礙物的距離，當超音波偵測的距離小於 `10` 公分，意味著自走車與障礙物的距離很近。

>大於小於的積木在「基本功能 > 邏輯」目錄下。
 數字積木在「基本功能 > 數學式」目錄下。
![偵測距離遠近判斷](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209151935.png)

開始設定自走車的行進方向，當偵測到的距離小於 10 公分的時候，自走車向後退 1 秒鐘，接著向右轉 1 秒鐘；當偵測到與前方障礙物的距離大於 10 公分，開始直線前進。

>等待的積木在「進階功能 > 等待」目錄下。
 自走車積木在「玩具及馬達 > 自走車」目錄下。
![避障車程式](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209152022.png)

最後，我們將使用到「流程」積木，將自動避障程式碼加入流程中。

>流程，程式碼裡就是 function，在寫程式的時候，常常會遇到需要重複執行的程式碼，為避免過多程式碼重複出現，我們可以設定一個流程，並將「需要被重複執行的程式碼」寫進這個流程中，如此一來，當我們需要重複用到這些程式碼的時候，只要呼叫這段流程，就可以重複執行對應的程式。

相關教學參考：[流程](https://tutorials.webduino.io/zh-tw/docs/blockly/standard/functions.html)

![加入流程的避障車程式](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209152154.png)

將自走車一開始的狀態設定為「停止」，讓程式開始執行後自走車停止 1 秒，開始執行避障功能。
![自走車最初停止狀態](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209152257.png)

以上是自動避障車的實行步驟，做好之後，填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以體驗無人車的威力囉！

>範例解答：`https://blocklypro.webduino.io/?demo=demo-area-01#XBBq1x4ozE`

#### 3.3.5. 相關參考

- 範例解答：`https://blocklypro.webduino.io/?demo=demo-area-01#XBBq1x4ozE`
- 完整程式碼：`https://bin.webduino.io/daqik/edit?html,css,js,output`

### 3.4 Smart 自走車(溫濕度感測車)

- 接線與實作

  溫濕度傳感器有四隻針腳，第一隻針腳為 v(接 VCC)，第二隻為 data(接 12)，第三隻沒有作用，為 N/C，第四隻為 GND(接 GND)。
  ![溫濕度傳感器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153100.png)

  因為溫濕度傳感器與自走車上的雙馬達驅動板，同時都會用到 `GND` 的腳位，所以使用麵包板來連接，溫濕度 `VCC` 接 `Smart 開發板` 的 `VCC` 腳位。
  ![溫濕度感測車接線示意圖](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209220646.png)
  實際接線照片：
  ![溫濕度感測車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153134.png)

- 操作解析

  打開 Webduino 雲端平台，並選擇 [Blockly 編輯工具](https://blocklypro.webduino.io/)，你可以建立一個積木程式專案，並命名為 Smart 自走車 (溫濕度感測車)。
  ![新增專案](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153304.png)

  >使用雲端平台之前須先註冊並登入，首次註冊教學請點此：[註冊與登入](https://tutorials.webduino.io/zh-tw/docs/cloud/basic/cloud-register.html)

- Webduino Blockly 操作解析

  接著在畫面中放入開發板積木，開發板下拉選單選擇「Smart」，連線方式選擇「Wi-Fi」，填入 Device ID，在開發板內放入自走車積木，腳位設定右前 `14`、右後 `16`、左前 `2`、左後 `5`。再放入溫濕度傳感器積木，腳位設定 `13`。

  >開發板設定積木在「開發板控制 > 開發板」目錄下。
   自走車積木在「玩具及馬達 > 自走車」目錄下。
   溫濕度相關的積木在「環境偵測 > 溫濕度」目錄下。

   ![溫濕度腳位設定](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209215221.png)

- 建立 Google 試算表

  首先須先於個人 Google 帳號下建立試算表，接著於試算表之「共用」權限管理功能，更改試算表讀取權限，這個動作是為了讓 Blockly 有權限將溫濕度的數值寫入試算表，教學如下：

  >設定 Google 試算表請參考：[Google 試算表(設定)](https://tutorials.webduino.io/zh-tw/docs/cloud/database/google-spreadsheet.html)

  - 讀取資料

    接著進入專案，將試算表的積木放入編輯畫面中，並在網址的地方，貼上之前建立的試算表網址，如果有更改工作表名稱(與試算表檔名不同)，則積木的工作表名稱也要進行修改。

    >試算表積木在「資料庫 > Google 試算表」目錄下。

    ![試算表網址](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209215433.png)
    放入 dht 偵測溫濕度的積木，設定每 1000 毫秒 ( 1 秒 ) 偵測一次。
    ![偵測溫濕度](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153632.png)

  - 寫入資料

    如果想增加存入的欄位類別，比方說加入「時間」、「溫度」、「濕度」，可透過積木上的小齒輪來增減欄位。
    ![小齒輪教學](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209215703.png)

    >時間積木在「進階功能 > 控制台」目錄下。

    ![濕度偵測](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209215824.png)

    最後，輸入 Device ID，點選右上方紅色按鈕執行，回到 Google 試算表，就會看到資料依序寫入就會看到溫濕度數值囉！
    ![溫濕度存取結果](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153733.png)

    接著將網頁遙控器結合溫濕度紀錄，就可以一邊遙控 Smart 自走車，一邊記錄小車抵達處的溫濕度數值囉！
    ![濕度偵測](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210209153748.png)

    >範例解答 ( 需登入平台 )：`https://blocklypro.webduino.io/?demo=demo-area-09#X33eo9P2B6`

- 相關參考

  - 範例解答：`https://blocklypro.webduino.io/?demo=demo-area-09#X33eo9P2B6`
  - 完整程式碼：`<https://bin.webduino.io/xeyoh/edit?html,css,js,output>

#### 3.5. Smart 開發版與 LCD 螢幕硬體連結

VCC → VCC， GND → GND ， SDA → 04 ， SCL → 05
(注意！Smart 接線只能這樣接 SDA 接 04，SCL 接 05)

![20210210231005](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210210231005.png)

---

## 馬克一號

### 1. 硬體介紹

### 2. 馬克一號 初始化步驟說明

- 初始化影片

  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/cwzpAK_0f2I" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 初始化步驟說明

  - <font color="blue">將馬克一號切換為設定模式</font>
    Webduino 開發板馬克一號，上面有一顆可以左右扳動的小開關，在移除電源的情況下，<font color="orange">將開關扳動至 STA 模式</font>，接上電源，就可以開始進行初始化設定。(此時開發板上的 Off-line 燈號會亮紅燈)。
    ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mark1-setup-01.jpg)

  - <font color="blue">使用 Wi-Fi 搜尋馬克一號</font>
    使用電腦或行動裝置，打開 Wi-Fi 搜尋對應的 Webduino 開發板 SSID 名稱，點選之後輸入密碼，即可讓電腦或行動裝置與 Webduino 開發板連線，開發板的 SSID 與密碼會貼在「裝置說明書」以及開發板上，通常為「wa」開頭。(範例名稱為 wa101)
    ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mark1-setup-02.jpg)

    我的裝置: wd2123
  - <font color="blue">連線馬克一號進行設定</font>
    打開 Chrome 或 Safari 瀏覽器，於網址列輸入「`http://192.168.4.1`」，即可打開 Webduino 開發板的設定頁面，在設定頁面輸入家裡、公司場所或行動裝置分享的網路基地台 SSID 與 PASSWORD。(<font color="orange">此處的 SSID 為「網路基地台」的 SSID，並非 Webduino 開發板，不要填成裝置說明卡上頭的 SSID 與 PASSWORD</font>，SSID 與 PASSWORD 限制 14 個字元，只能大小寫的英文字母與數字的組合)
    ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mark1-setup-03.jpg)

    我的裝置:
    ![PI3-DEVICE](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210210143351.png)

    ![20210210143806](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210210143806.png)
  - <font color="blue">重啟馬克一號</font>
    輸入完 SSID 與 PASSWORD 之後，點選送出，若出現「OK」的字樣，表示 Webduino 開發板已經初始化成功，並且可以和家裡、公司場所或行動裝置分享的網路基地台連線 ( 若遲遲沒有出現「OK」字樣，表示初始化設定不成功，返回步驟 1 重新開始 )，<font color="orange">完成後移除開發板電源，再將開關扳至 AP 模式</font>，重新接上電源即可進行重啟。
    ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mark1-setup-04.jpg)

  - <font color="blue">確認連線是否成功</font>
    Webduino 開發板重啟後，便可將電腦或行動裝置切回正常的網路連線，並連結 `https://webduino.io/device.html`，輸入對應的 device 名稱確認是否連線成功，如果連線成功則會出現 OK 的顯示，連線成功後即可開始玩轉 Webduino。( 若在網頁上沒有對應 Webduino 開發板，則需重啟 Webduino 開發板或返回步驟 1 重新初始化設定)

    >連線確認網址：`https://webduino.io/device.html`
     Off-line 燈號判斷：紅燈熄滅 (連線成功)、紅燈恆亮 (STA 模式 或 連線失敗)、紅燈閃爍 (嘗試連線)。

    我的裝置
    ![20210210150623](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210210150623.png)

    ![20210210150711](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210210150711.png)

  - 開始操作馬克一號
    進行到此步驟，表示 Webduino 馬克一號已經可以自行連上家裡、公司場所或行動裝置分享的網路基地台，並自動連結上雲端的伺服器，可以開始透過 Wi-Fi 去控制 Webduino 開發板囉！
    ![ ](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/connect.jpg)

    >我的馬克一號
     SSIS: wd2123
     PASSWORD: 12345678
     Devide ID: JXeEr

### 3. 馬克一號應用

#### 3.1. 馬克一號自走車(鍵盤操控)

&emsp;&nbsp;Webduino 公仔自走車是 Webduino 自主研發的產品，使用 Webduino 馬克 1 號開發板控制，不僅可以設定行進的模式，更可以接上超音波傳感器讓車子自動閃避障礙物。在這個範例我們會實作設定電腦的鍵盤行為，透過敲打鍵盤讓車子移動。

- 範例影片展示
  <div class="video-container">
     <iframe width="560" height="316" src="https://www.youtube.com/embed/0JT1KAHkMsk" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作
  要操控自走車，首先就是要組裝自走車，先來看一下自走車包含哪些組件，組件分別有：自走車底版 (3D列印)、左右各一顆輪子與馬達、開關、電池盒、馬達驅動板、超音波傳感器和 Webduino 開發板。由於主要的機構都已經焊接完成，組裝上變得相當簡單，只需要幾個步驟即可完成。

  首先把電池放到電池盒內 (需要四顆三號電池)，然後將電池盒放到車子上。
  ![放入自走車電池](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225516.png)

  接著把 Webduino 開發板放到前方的插槽裡。
  ![自走車 + 馬克一號](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225540.png)

  放妥開發板後，先把超音波傳感器插在開發板的左側排插，Trig 11，Echo 10。
  ![自走車接上超音波傳感器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225605.png)

  接著把馬達驅動板插在右側排插，注意會把 3.3V、 6、7、8、9 的腳位接滿，然後在 3.3V 的插孔處會突出一支腳，這支腳已經用電線連結出來，所以是正常的不需理會。
  ![自走車接上馬達驅動版](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225632.png)
  ![自走車接上馬達驅動版](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225647.png)

  到這邊已經組裝完成，打開自走車的電源，就可以開始嘗試操控自走車了。
  ![自走車電源開關](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225703.png)

  最終長相：
  ![Webduino 自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225721.png)

- 操作解析
  打開 [Webduino Blockly 編輯工具](https://blockly.webduino.io)，放入自走車的積木，名稱命名為 `car`，腳位設定右前 `6`、右後 `7`、左前 `8`、左後 `9`。

  >自走車的積木在「玩具及馬達 > 自走車」目錄下。

   ![自走車積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225801.png)

   使用「開始偵測鍵盤按下」的積木，設定按住向上的箭頭時，自走車會往前移動，如果放開就會停止。

  >鍵盤積木在「進階功能 > 鍵盤行為」目錄下。
  
   ![鍵盤控制自走車移動](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225837.png)

  依序把前進、後退、左轉與右轉的行為放入鍵盤的動作。
  ![鍵盤控制自走車移動](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225900.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以用鍵盤操控自走車了。

  >範例解答：`https://goo.gl/nDMS2j`

  其實自走車的原理很簡單，因為馬達分成一左一右兩個，每個又分成往前轉和往後轉，所以可以相等於用四個 LED 來表現。
  ![自走車原理](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225926.png)

  所以如果要讓自走車前進，除了使用自走車前進的積木，也可以透過 LED on 或 off 的行為來表現。
  ![自走車原理](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205225953.png)

- 相關參考

- 範例解答：`https://goo.gl/nDMS2j`
- 範例完整程式碼：`http://bin.webduino.io/ruwun/edit?html,js,output`

#### 3.2. 馬克一號自走車(行動裝置操控)

&emsp;&nbsp;Webduino 公仔自走車是 Webduino 自主研發的產品，使用 Webduino 馬克 1 號開發板控制。在這個範例我們會實作如何透過手機打開網頁，就能操控自走車，甚至還可以使用手機的陀螺儀操控。

- 範例影片展示
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/b2T9SbHfHj0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作
  要操控自走車，首先就是要組裝自走車，先來看一下自走車包含哪些組件，組件分別有：自走車底板 (3D 列印)、左右各一顆輪子與馬達、開關、電池盒、馬達驅動板、超音波傳感器和 Webduino 開發板。由於主要的機構都已經焊接完成，組裝上變得相當簡單，只需要幾個步驟即可完成。

  >詳細組裝參考：[自走車(鍵盤操控)](https://tutorials.webduino.io/zh-tw/docs/useful/example/toycar-keyboard.html)
  
  ![Webduino 自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230607.png)

- 操作解析
  打開 [Webduino Blockly 編輯工具](https://blockly.webduino.io)，打開網頁互動測試區，下拉選單選擇「遙控器」，就會帶出一個網頁遙控器，待會就會用行動裝置打開這個遙控器。
  ![網頁遙控器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230639.png)

  放入自走車的積木，名稱命名為 car，腳位設定右前 6、右後 7、左前 8、左後 9。

  >自走車的積木在「玩具及馬達 > 自走車」目錄下。
  
  ![自走車積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230702.png)

  使用「遙控器按鍵按下」的積木，設定按住向上的圖案時，自走車會往前移動，如果放開就會停止。
  >遙控器積木在「遙控器」目錄下。

  ![網頁遙控器控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230732.png)

  依序把前進、後退、左轉與右轉的行為放入遙控器的動作裡。
  ![網頁遙控器控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230747.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以用網頁裡的遙控器操控自走車了。
  >範例解答：`https://goo.gl/GiFvlr`

- 行動裝置操控
  如果要把剛剛的遙控器轉到行動裝置上面運行，只需要點選最上方「產生即時預覽 QR code」的按鈕。
  ![Blockly 產生 QRCode](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230820.png)

  點選後會彈出一個 QRCode。
  ![Blockly 產生 QRCode](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230836.png)

  用行動裝置掃描這個 QRCode，就會打開遙控器的網頁，剛剛所做的程式碼也會在這個網頁裡執行，也就可以用行動裝置操控自走車了。
  ![手機遙控器](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230858.png)

  為了發揮行動裝置的功能，突顯行動裝置和電腦的差異，這邊要來偵測行動裝置的陀螺儀和加速度計，這樣我們就能夠偵測行動裝置的旋轉、翻轉與加速度。在畫面中多綁定一個遙控器事件，當按下中間圓型小點的按鈕，就可以啟動偵測行動裝置陀螺儀的功能，反之放開就取消這功能。
  >行動裝置偵測的積木在「進階功能 > 行動裝置」目錄下。

  ![手機陀螺儀與加速度控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230919.png)

  在偵測旋轉翻轉的區塊內，放入邏輯判斷，判斷三個情形：前後翻轉角度大於 20 (表示手機往前翻)，前後翻轉角度小於 -20 (表示手機往後翻)，以及前後翻轉角度在 -20~20 的區間。
  >邏輯相關積木在「基本功能 > 邏輯」目錄下，數字的積木在「基本功能 > 數學式」目錄下。

  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205230945.png)

  在第一個判斷條件內放入判斷左右翻轉的第二層邏輯，目的在偵測手機是往左前、右前還是正前方翻轉。
  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231002.png)

  後面兩個判斷式依此類推，這樣就可以完成手機翻轉時，自走車也會跟著動作的邏輯程式。
  ![手機翻轉控制自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231018.png)

  同樣的，點選上方產生即時預覽的 QRCode 按鈕，產生 QRCode，透過行動裝置掃描，就可以使用行動裝置的陀螺儀操控自走車了。( 記得要按住中間原點的黑色按鈕 )
  >範例解答：`https://goo.gl/8jQU3t`

- 相關參考
  範例解答：`https://goo.gl/8jQU3t`
  範例完整程式碼：`http://bin.webduino.io/fuguq/edit?html,css,js,output`

#### 3.3. 馬克一號自走車(循跡功能)

  在之前「公仔自走車」的範例中，已經了解基本的操作方式，這篇範例將利用「自走車循跡升級套件」，為自走車加上「循跡」的功能，讓我們在一般操作控制之外，也能跟隨地上的軌跡移動，甚至可藉由雲端資料庫的輔助，紀錄軌跡並重複行進同樣的路徑。

  >循跡自走車操控頁面：`https://goo.gl/NrTrLb`
   Webduino Blockly 範例程式：`https://goo.gl/8XYAam`

- 範例影片展示
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/vnazkVchsp4" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作
  要使用循跡的功能，必須在自走車的機構安裝「循跡控制板」，如果您手邊的 Webduino 自走車為「白色的」萬向輪支架，則必須更換為 3D 列印的支架。如此一來才可以順利組合循跡控制板，<font color=orange>若自走車上頭已經是「3D 列印支架」則不用更換</font>。
  ![更換自走車萬向輪](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231522.png)

  更換的方式很簡單 ( 已是 3D 列印支架可略過組裝教學 )，首先用螺絲起子鬆開支架的小螺絲，取下支架和萬向輪，萬向輪內有四顆小鋼珠和一顆大鋼珠，千萬注意不要弄丟了 (建議可用磁鐵放在旁邊吸附著)。
  ![自走車分解圖](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231550.png)

  將 3D 列印的支架用原本的螺絲螺帽鎖到車體上，和車體並不會垂直，是正常的現象。
  ![更換自走車萬向輪](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231610.png)

  將萬向輪鎖上，車體的改造就完成了。
  ![更換自走車萬向輪](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231632.png)

  接著移除 Webduino 馬克一號原本的 Arduino Pro mini，換上循跡自走車的 Arduino Pro mini。
  ![更換馬克一號 Arduino Pro Mini9](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231649.png)

  循跡車 Arduino 背面的接線照片如下，如果不小心把線拔除了就按照顏色位置接回去即可。
  ![循跡車 Arduino](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231710.png)

  注意換完的方向要正確，五條線的接頭朝下，灰色線接頭朝上。
  ![馬克一號更換循跡車 Arduino](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231728.png)

  將馬克一號與自走車組合，五條線接頭插入 3D 列印支架的孔洞當中，目的在於要組合循跡控制板。
  ![循跡自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231814.png)

  ![循跡自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231859.png)

  ![20210205231930](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231930.png)

  灰色的線則向上和馬克一號 A3 的腳位連接。
  ![循跡自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205231958.png)

  將循跡控制板插入五條線的接頭，如果在運行的時候發現偵測狀況不理想，可使用十字螺絲起子，調整循跡偵測的靈敏度。
  ![安裝循跡控制板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232024.png)

  最後放入四顆 3 號電池，就完成了 Webduino 循跡自走車的升級改造。
  ![Webduino 循跡自走車](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232045.png)

##### 4.3. 體驗 Webduino 循跡功能

&emsp;&nbsp;打開 Webduino 循跡自走車操控頁面，在上方填入自走車馬克一號的 Device ID，按下 Connect 連線，連線成功之後，就可以開始使用下方的遙控器循跡與記錄功能。

循跡自走車操>控頁面：`https://goo.gl/NrTrLb`

![Webduino 循跡功能](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232142.png)

遙控器第一個部分有三個按鈕：

- 第一個按鈕是「循跡與紀錄軌跡」的功能，點選之後就會啟動循跡功能，只要地上有黑色的線 (寬度需大於四公分)，就會跟隨著黑線移動，同時也會開始記錄移動的軌跡。
- 第二個按鈕是「停止」，除了會停止自走車的動作，同時也停止軌跡的紀錄。
- 最後一個按鈕是「播放」，點選之後自走車就會開始運行上一次紀錄的路徑。

![循跡設定](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232226.png)

遙控器的第二個部分為「軌跡控制板」，當我們在上面繪製線條圖案，自走車就會跑出我們所繪製的形狀。
![繪製循跡路徑](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232246.png)

由於每輛自走車的馬達轉速不見得相同 ( 相同型號的馬達轉速也都會有誤差 )，電池的電量也都會有差異，所以在遙控器最後一個部分提供了「設定」功能：

- 拉霸 Around：修正左右偏移量，如果自走車在跑的時候一直向左偏，就往右調整一些
- 拉霸 Rotational speed：表示速度，速度 100% 表示全速行進
- 拉霸 Radial：微調校正速度。假設在 100% 的速度下 150ms 會跑 50px，但實際上卻只跑了 40px，就必須透過 Radial 修正
- 拉霸 Degree：微調修正轉的角度，原理和 Raidal 相同
![馬達轉速](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232321.png)

##### 4.4. Webduino Blockly 操作

&emsp;&nbsp;如果不想要用遙控器操作，亦可使用 [Webduino Blockly 編輯工具](https://blockly.webduino.io) 實現循跡功能，打開下方的範例網頁，會帶出對應的循跡自走車程式，填入 Device ID，點選右上方的執行按鈕，就會看到自走車沿著黑色路線行進了。

範例程式：`https://goo.gl/8XYAam`

![循跡自走車積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205232423.png)

以上就是 2017 Webduino 循跡自走車的組裝與基本操控。

---

## Webduino Fly

### 1. 商品描述

- Webduino Fly
  Webduino Fly 是因應 Arduino UNO 誕生的開發板，也稱為 Arduino UNO 雲端擴充板，當 Arduino UNO 套用 Webduino Fly 之後，立即就變成具備透過 Wifi 控制的能力，立即擁有完整的 Webduino 開發功能，易學易用，不管是入門使用者、進階開發者、資深研究者等，不需要理會硬體的煩雜技術，只需用 Web 技術，就可以控制 Arduino 相容的感應模組的神兵利器！

  ![Webduino Fly](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214191614.png)

- 產品說明
  - 開關 STA 模式：Wi-Fi 初始化設定
  - 開關 AP 模式：Webduino 模式 ( Wi-Fi )
  - 斷線指示燈：Webduino 模式下，若 Wi-Fi 斷線會亮燈
  - 按鈕：Reset

- 和 Arduino UNO 組裝照片
  ![20210214191754](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214191754.png)

- 初次使用必看
  實作 Webduino Fly 之前，最重要的就是進行初始化設定，初始化設定的目的在於讓 Webduino Fly可以自動上網，請連結至初始化設定教學頁面按照步驟設定，確保可以正常使用。此外，要走 Arduino Firmata 的通訊協定，所以必須「要燒錄具有 Firmata 通訊協定的韌體」，請點選下方網址觀看燒錄步驟與相關設定，讓你的 Arduino UNO 長出 Web 的翅膀，一起遨遊雲端！

### 2. Webduino Fly 初始化設定

使用 Webduino Fly (UNO 雲端擴充板)，可以讓你手邊的 Arduino UNO 變成 Webduino，具備完整的 Webduino 功能，然而使用 UNO 雲端擴充板之前，最重要的就是進行初始化設定，初始化設定的目的在於讓 Webduino UNO 雲端擴充板可以自動上網。

><font color='orange'>Webduino Fly 無法獨立運作，必須搭配 Arduino UNO 操控。</font>
 以下的步驟將會介紹如何進行設定，閱讀過程請注意<font color='orange'>橘黃色</font>的文字，這些文字描述了大家在設定的時候，比較容易犯的錯誤。

Webduino Fly 初始化步驟說明

- 組合 Arduino UNO 與 Webduino Fly

  將「Webduino Fly」與「Arduino UNO」組合，就成為「Webduino UNO 開發板」。
  ![Webduino Fly+Arduino Uno](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200228.png)

- 將 Webduino Fly 切換為設定模式

  在 Webduino Fly 上面會有一顆可以左右扳動的小開關，將開關扳動至 STA 模式，就可以開始進行初始化設定。
  ![初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200307.png)

- 使用 Wi-Fi 搜尋 Webduino Fly

  使用電腦或行動裝置，打開 Wi-Fi 搜尋對應的 Webduino 開發板 SSID 名稱，點選之後輸入密碼，即可讓電腦或行動裝置與 Webduino 開發板連線，開發板的 SSID 與密碼會貼在「裝置說明書」或開發板上，通常為「wa」開頭。(範例名稱為 wa101)
  ![Webduino 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200408.png)

- 連線 Webduino Fly 進行設定

  打開 Chrome 或 Safari 瀏覽器，於網址列輸入「`http://192.168.4.1`」，即可打開 Webduino 開發板的設定頁面，在設定頁面輸入家裡、公司場所或行動裝置分享的網路基地台 SSID 與 PASSWORD。(<font color='orange'>此處的 SSID 為「網路基地台」的 SSID，並非 Webduino 開發板，不要填成裝置說明卡上頭的 SSID 與 PASSWORD</font>，且 SSID 與 PASSWORD 有限制 14 個字元，只能大小寫的英文字母與數字的組合，要特別注意！)
  ![Webduino 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200514.png)

- 重啟 Webduino Fly
  輸入完 SSID 與 PASSWORD 之後，點選送出，若出現「OK」的字樣，表示 Webduino 開發板已經初始化成功，並且可以和家裡、公司場所或行動裝置分享的網路基地台連線 ( 若遲遲沒有出現「OK」字樣，表示初始化設定不成功，返回步驟 3 重新開始 )，完成後先移除開發板電源，再將開關扳至右側 ( AP 模式 )，重新接上電源即可進行重啟。
  ![Webduino Fly 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200658.png)

- 確認連線是否成功
  Webduino 開發板重啟後，便可將電腦或行動裝置切回正常的網路連線，並連結 `https://webduino.io/device.html`，輸入對應的 device 名稱確認是否連線成功，如果連線成功則會出現 OK 的顯示，連線成功後即可開始玩轉 Webduino。(若在網頁上沒有對應 Webduino 開發板，則需重啟 Webduino 開發板或返回步驟 2 重新初始化設定)

  >連線確認網址：`https://webduino.io/device.html`
   Off-line 燈號判斷：<font color='orange'>紅燈熄滅 (連線成功)、紅燈恆亮 (STA 模式 或 連線失敗)、紅燈閃爍 (嘗試連線)</font>。

  ![Webduino Device ID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200805.png)

  如果是使用 Webduino Fly 還有一個更簡單的判斷方式，在板子上有一個紅色的小 LED 燈，正在連線的時候紅色 LED 會發亮，連線成功後就會熄滅，若 LED 燈持續閃爍，表示沒有連線成功，這時請重啟 Webduino 開發板，或返回步驟 2 重新初始化設定。
  ![Webduino Fly 初始化](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210214200831.png)

- Webduino Fly 已經可以連線網路基地台
  進行到此步驟，表示 Webduino 開發板已經可以自行連上家裡、公司場所或行動裝置分享的網路基地台，並自動連結上雲端的伺服器，我們就可以開始透過 Wi-Fi 去控制 Webduino 開發板囉！

- Webduino Fly 韌體更新
  在最新的版本中，Webduino Fly 新增了更多的功能，為了能夠使用這些功能，我們需要先將 Webduino Fly 的韌體程式更新。而 Webduino Fly 具有兩種韌體更新方式，分別為雲端更新和 Arduino 燒錄，這裡推薦使用<font color=orange>雲端更新</font>。

- [雲端更新教學(推薦)](https://tutorials.webduino.io/zh-tw/docs/cloud/basic/webduino-device-update.html)

### 3. Device 裝置管理(雲端更新)

  如果已經透過 Webduino Device 裝置管理新增與認證裝置，下一步就可以開始進行雲端更新。不論裝置是否在身邊，只要裝置處於上線狀態，就能透過雲端更新的方式輕鬆進行遠端更新，甚至可以多台裝置同時更新、同時設定。

- 雲端更新韌體
  雲端更新的方式很簡單，一開始先勾選需要雲端更新的裝置，點選左上方的「更新韌體」按鈕，雲端更新可以進行單選或是多選，但所選取的裝置必須為<font color=orange>同一種類型且經過認證</font>，如果發現多選之後無法點選更新按鈕，可能是包含了不同類型的裝置，或有某些裝置尚未經過認證。(更新版本請參考下方「雲端更新版本」 )

  >更新韌體支援的開發板：馬克一號、Fly
   Smart 目前僅支援「雲端更新版本」，更新後一併將韌體升級至最新版，請繼續往下閱讀雲端更新版本的內容

  ><font color=orange>開發板 SSID 為 wa6000 號之前的開發板無法進行更新</font>，需寄回 Webduino 進行更新 ( 例如 wa6001 可以更新，wa5999 無法更新 )，郵寄地址：80661 高雄市前鎮區復興四路 12 號 2 樓之 6，慶奇科技收。( 請於信封或包裹內容描述「無法進行雲端更新，協助更新版本」)

  ![雲端更新開發板](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215122350.png)

  點選更新韌體按鈕之後，可以從下拉選單選擇需要更新的韌體。

  >注意，若是使用馬克一號或 Fly，請先將「版本」更新至 1.8.5 以上才能進行韌體更新。

  ![選擇更新韌體](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215122539.png)

  選擇完成後就會開始進行更新，更新完成，開發板就會變成相對應的韌體了。

  >注意，更新的時候切勿移除開發板電源或中斷網路連線，避免更新失敗。

  ![開發板更新完成](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215123108.png)

  使用 Webduino 雲端平台更新的好處，只要裝置都經過認證，就可以一次勾選多台裝置同時更新。

  >同時更新必須為同一種類型的開發板。

  ![多台裝置同時更新](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215123145.png)

  在燒錄完成的訊息提示裡，也會標註每一個裝置的燒錄狀態，燒錄成功會用綠色表示，燒錄失敗會用紅色表示。

  ![燒錄狀態](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215123210.png)

- 雲端更新版本
  除了更新操控元件的韌體外，亦可透過「更新版本」的按鈕，將開發板核心程式更新，近一步取得更穩定的開發板核心程式。(注意，更新的時候<font color=orange>切勿移除開發板電源或中斷網路連線</font>，避免更新失敗。)

  >雲端更新版本支援的開發板：馬克一號、Fly、Smart

  ![更新版本](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215123658.png)

- [Arduino 韌體下載與燒錄](https://goo.gl/4qJ9j1)

### 4. 應用

#### 4.1. 控制單顆 LED 燈

只有一顆 LED 燈的接線方式很簡單，首先，LED 燈有「長短腳」之分，長腳接「高電位」(帶有數字的腳位)，短腳接「低電位」(GND、接地)，因此我們只要直接將 LED 插到腳位上即可，或使用麵包板與麵包線外接出來，在這裡長腳接 10，短腳接 GND。

![20210215125016](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215125016.png)

- Webduino Blockly 操作解析
  打開 [Webduino Blockly 編輯工具](https://blockly.webduino.io)，在第一個範例裡頭，我們將會點選網頁「燈泡圖案」來控制 LED 燈的切換，所以要先點選右上方「網頁互動測試」的按鈕，打開內嵌測試的網頁，用下拉選單選擇「點擊燈泡」，就會出現讓我們可以點選燈泡的網頁。

  ![20210215130442](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130442.png)
  從編輯工具左側的積木選單中選擇「開發板」，將開發板放到畫面當中，填入對應的 Webduino 開發板名稱 ( Device 名稱，不要勾選串連 )，接著選擇「LED 燈」的積木，將 LED 燈的積木放到開發板積木的缺口內，腳位設定為 10 ( 因為剛剛把長腳接在 10 號腳 )。
  ![20210215130510](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130510.png)
  
  因為要和網頁互動，所以我們要從積木選單的最下方「網頁互動」，點選「點擊燈泡」，就會看到很多點擊網頁燈泡圖片互動的選項。

  ![20210215130526](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130526.png)

  把「點擊燈泡執行」的積木放到編輯畫面裡，代表點擊燈泡時要做些什麼事情。

  ![20210215130540](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130540.png)

  在執行的內容放入「邏輯」的積木，判斷點擊燈泡時，依據當時的狀態做出相對的反應，而我們也可以利用邏輯積木上面「藍色小齒輪」，添增邏輯選項。

  ![20210215130555](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130555.png)

  根據邏輯，判斷「當燈泡是 on」的話，點擊燈泡就會變成「off」，反之就是「on」。
  ![20210215130606](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130606.png)

  完成後，確認開發板上線 ( 點選「檢查連線狀態」查詢 )，點選紅色的執行按鈕，就可以開始。

  ![20210215130623](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215130623.png)

  點擊內嵌網頁裡的燈泡圖片，就可以輕鬆地控制 LED 燈的明暗，然而我們也可以點選「JavaScript 頁籤」，就可以看到完整的程式碼邏輯，同時也可以複製這些代碼，貼到自己的網頁原始碼當中，就可以在自己的網頁裡實現一模一樣的行為囉！

  (解答： `https://blockly.webduino.io/#-K4pR8RaEF6IkiWdAYk7`)

#### 4.2. 控制光敏電阻

首先我們放入開發板的積木，下拉選單選擇 WebSocket ( 注意，使用 WebSocket 的工具網址必須是 http 開頭 )，填入開發板的 ip 位址，放入光敏電阻的積木，類比腳位選擇 A0
![20210215215604](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215215604.png)

放入光敏電阻開始偵測的積木，並讓偵測的數值顯示在網頁互動測試區域裡，點選右上方紅色按鈕執行，就會看到光的數值轉換為小數點呈現出來了。
(解答：`<http://blockly.webduino.io/#-KbJWK4xVaxi0BEUct-U>)
![20210215215621](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215215621.png)

如果覺得直接類比訊號讀入的浮點數不是自己想要的數值，我們可以透過「四捨五入」和「尺度轉換」兩種積木，將光敏電阻的數值，轉換成 0 到 100 之間，小數點兩位的數值顯示。
(解答：`http://blockly.webduino.io/#-KbJWUprpSwvmWuBjfcU`)

![20210215215758](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215215758.png)
![20210215215811](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215215811.png)

還記得之前才提過的 Smart 三色燈初體驗 嗎？我們也可以透過簡單的邏輯判斷，讓數值 0~0.2 顯示紅色，0.2~0.4 顯示綠色，0.4~0.6 顯示藍色，大於 0.6 就，三色燈元件和光敏電阻的搭配，只需要一塊小小的 Smart 開發板就能搞定。
![20210215215828](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210215215828.png)

點選右上方紅色按鈕執行，用手去遮住光敏電阻，或是用燈去照光敏電阻，就會看見 Smart 的三色燈出現不同的顏色。 (解答：`http://blockly.webduino.io/#-KbJXCjhMYgmr6Pm7Gud`)

#### 4.3. RFID(控制 Youtube)

- 範例影片展示
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/RrCAOgtPHdo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
- 接線與實作
  接線方式和上一篇範例一模一樣，將 SDA 接 10，SCK 接 13，MOSI 接 11，MISO 接 12，GND 接在 GND，VCC 接在 3.3V 的位置，此外因為腳位限制，所以在這個範例<font color=blue>必須使用 Arudino UNO 和 Webduino FLY 雲端擴充板搭配進行</font>。
  ![Fly 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216120035.png)

  實際接線照片：
  ![Fly 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216120134.png)

- <font color=blue>Webduino Smart 接線方式</font>
  如果是使用 Webduino Smart 腳位也有對應功能，所以接線方式就把 15 接 SDA，14 接 SCK，13 接 MOSI，12 接 MISO，GND 接 GND，3.3V 接 3.3V 的位置。

  >如果要使用 Smart 操控，請使用 雲端平台 更新韌體，韌體版本有 reg 標記表示有支援 RFID。

  ![Smart 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216120238.png)

  實際接線照片：
  ![Smart 接線 RFID](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216120258.png)

- Webduino Blockly 操作解析
  打開 Webduino Blockly 編輯工具 (`https://blockly.webduino.io`)，因為這個範例會需要知道 RFID 感應卡的「卡號」，所以必須先用網頁「顯示文字」來顯示偵測到的每張 RFID 磁卡的卡號，先打開 Webduino Blockly 的網頁互動測試區，下拉選單選擇「顯示文字」，此時在右下角會出現對應的積木功能可以選擇。(如果已經知道卡號則可略過這個步驟。)

  ![網頁互動測試](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121447.png)

  把開發板放到編輯畫面裡，填入對應的 Webduino 開發板名稱，開發板內放入 RFID 的積木，名稱設定為 rfid，腳位設定為 10、13、11、12，放入「偵測訊號」的積木，在我們拿 RFID 磁卡或磁扣去感應讀卡器的時候，右邊的網頁就會顯示對應的識別碼。( 如果是 Smart 就選擇 SDA 15、SCK 14、MOSI 13、MISO 12 )

  >RFID 的積木在「無線感應 > RFID」目錄下。

  ![RFID 積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121518.png)

  填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，用不同的磁卡或磁扣去感應讀卡器，就會出現識別碼，這時我們先把這些對應的代碼記下來，待會就要用這些代碼來判斷。

  ![偵測磁卡與磁扣代碼](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121556.png)

  回到右邊的網頁互動測試區，下拉選單選擇「Youtube」，此時在右下角會出現對應的積木功能可以選擇。

  ![Youtube 網頁互動](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121623.png)

  Youtube 的積木都在左邊網頁互動裡面，一開始我們要先載入 Youtube 模組，注意！模組只需要載入一次，因此該積木不要放到 RFID 偵測到訊號的區塊裡，不然會變成每次偵測都會載入一次模組，就會出錯了。
  ![Youtube 模組積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121647.png)

  打開 Youtube，選擇一段影片，複製這段影片的網址，回到剛剛的畫面貼上。

  >注意，網址不支援使用 Youtube 分享功能的「縮網址」。

  ![20210216121717](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121717.png)

  如果說我們想要利用磁扣切換播放的影片，只要放入「更換 Youtube 影片」的積木，把要更換的影片網址填進去就可以切換。

  ![設定磁卡切換 Youtube 影片](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121750.png)

  除了切換影片，也可以把 RFID 磁卡當作控制 Youtube 的方式，下圖是透過三張卡片，分別控制影片的播放、暫停與停止。
  ![設定磁卡控制影片播放](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210216121819.png)

  做好之後，填入裝置 Device ID，確認開發板上線，點選右上方紅色按鈕執行，就可以開始用 RFID 磁卡控制 Youtube 影片了。

  執行的時候有可能會發生「腳位選錯但仍正確讀取到卡號」的狀況，這是因為 RFID 程式底層不是使用數字，而是使用 SDA、SCK、MOSI 和 MISO 操控，在積木上的腳位則是方便使用者接線識別，不過如果實際接線接錯，仍然是無法順利運作的，要特別注意。

  範例解答：`https://goo.gl/Se8IN7`

- 相關參考
  - 範例解答：`https://goo.gl/Se8IN7`
  - 範例完整程式碼：`http://bin.webduino.io/giki/edit?html,js,output`

---

## 智慧追蹤 ( 伺服馬達 + 攝影機 )

### 範例影片展示

<https://youtu.be/-l4bSdcpeME>

### 接線與實作

伺服馬達具有三條電線。紅色的為正電，深咖啡色是接地 GND，橘色的則是訊號線，伺服馬達需使用 5V 或 VCC 的供電，或者使用獨立電源進行供電，此處我們將伺服馬達的訊號腳接在開發板的數位腳 ( 5 腳位 )。

**操作解析**
打開 Webduino Blockly 編輯工具 (`https://blockly.webduino.io`)，因為這個範例會使用人臉追蹤，所以要打開網頁互動測試區，下拉選單選擇「影像追蹤」，選擇之後在左側積木清單的最下方，就會出現對應的積木。
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/servo.jpg"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/servo3_s.jpg" class="nofancybox  img-center"/></a>


在畫面中放入開發板積木，填入 `Device ID`，在開發板內放入伺服馬達的積木，腳位設定 `5`，伺服馬達變數名稱設定為 `servo`。

>開發板的積木在「開發板控制」目錄下，伺服馬達積木在「玩具及馬達 > 伺服馬達」的目錄下。
  <a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/servo1.jpg"><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/servo4_s.jpg" class="nofancybox  img-center"/></a>

再來需要設定三個變數，並將變數更名 servoAngle、check 和 videoWidth

- 變數 `servoAngle` 是「伺服馬達旋轉的角度」，將伺服馬達的初始化角度設為 `90` 度 ( 伺服馬達左右擺動為 `0 ~ 180` 度 )
- 變數 `check` 則是「人臉座標和影片畫面中心的差距」，如果是 `0` 表示人臉在畫面的中間
- 變數 `videoWidth` 則是追蹤影片畫面的寬度。

>變數的積木在「變數」目錄下。
![伺服馬達設定積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223625.png)

接著使用「影像追蹤」的積木，並設定為「追蹤人臉」，再來放入變數 facePosition 與數學運算的積木，將 facePosition 的數值設定為「<font color=orange>追蹤數值 x - ((影片寬度/2) - (追蹤數值 width/2))</font>」，目的在於判斷人臉是在中間的位置。

數學運算的積木在「基本功能 > 數學式」目錄下。
![影像追蹤積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223728.png)

如果不容易理解數學公式，可以參考下面的分解圖。
![影像追蹤積木原理](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223747.png)

原理大概如下圖所示，因為人臉的座標不斷在變化，如果要確定人臉是在「中間」，就必須透過一系列數學運算的轉換，如此才能把人臉移動的位置，對應到伺服馬達旋轉角度上。
![影像追蹤積木原理](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223808.png)

接著放入邏輯積木，透過藍色小齒輪增加判斷條件，讓人臉位置如果在 -30 ~ 30 之間的話，伺服馬達不會移動，如果超過這個區間，伺服馬達就會開始轉動，直到人臉又進入這個區間為止。
![設定伺服馬達偵測影像旋轉角度](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223827.png)

最後多增加伺服馬達旋轉角度判斷，如果 servoAngle 大於 180，就讓 servoAngle 保持在 180，如果 servoAngle 小於 0，就讓 servoAngle 保持在 0。
![設定伺服馬達偵測影像旋轉角度](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210205223844.png)

確認開發板上線，點選右上方紅色按鈕執行程式，就會看到攝影機所拍攝的畫面出現在網頁互動區，如果偵測到的人臉不在中心位置，就會自動轉向直到人臉進入中心位置為止。

- 積木
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye_s.jpg' class="nofancybox  img-center" /></a>
>解答：<https://goo.gl/sEMe9A>

相關參考
範例解答：`https://goo.gl/sEMe9A`
範例完整程式碼：`https://bin.webduino.io/qugib/edit?html,css,js,output`
人臉追蹤教學文：[LED (人臉追蹤)](https://tutorials.webduino.io/zh-tw/docs/useful/component/led-tracking-face.html)
伺服馬達教學文：[伺服馬達](https://tutorials.webduino.io/zh-tw/docs/basic/component/servo.html)

---

## Smart 智慧屋

### 材料列表

<a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-01.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-01_s.jpg' class="nofancybox  img-center" /></a>

### 1. 組裝房子

1. 首先將 A 板 B 板分別拆下，底部對齊，垂直安裝。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-02.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-02_s.jpg' class="nofancybox  img-center" /></a>

2. C 板對齊 A 板凹槽，C 板對齊 B 板凸位，3 板子相互垂直安裝。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-03.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-03_s.jpg' class="nofancybox  img-center" /></a>

3. D 板對齊 A 板凹槽，D 板對齊 B 板凸位，互相垂直安裝。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-04.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-04_s.jpg' class="nofancybox  img-center" /></a>

### 2. 組裝門

1. 將門板 I 底部凸出處，斜插入 A 板圓孔位。
2. 將 J 板圓孔套在門板 I 上端凸出處。
3. 豎直門板，對齊嵌入。
4. 嘗試轉動門軸，可以順利轉動即可進行安裝馬達。

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-05.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-05_s.jpg' class="nofancybox  img-center" /></a>

### 3. 組裝門把機關

1. 如圖先將軸柄安裝至伺服馬達上，透過雲端平台拖拉積木程式，校正為 90 度，再將軸柄拿掉。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-06.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-06_s.jpg' class="nofancybox  img-center" /></a>

2. 取出 K、Ｌ ( 1、2、3、4、5、6 )。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-07.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-07_s.jpg' class="nofancybox  img-center" /></a>

3. 組合成門把。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-08.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-08_s.jpg' class="nofancybox  img-center" /></a>

4. 將門把安裝至門上。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-09.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-09_s.jpg' class="nofancybox  img-center" /></a>

5. 將門把安裝到馬達上
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-10.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-10_s.jpg' class="nofancybox  img-center" /></a>

### 4. 安裝 Smart 開發板及 LCD 顯示器

1. Smart 開發板放置在 A 板中央孔位，LCD 顯示器可以嵌入 B 板大長方形孔位中。

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house11.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house11_s.jpg' class="nofancybox  img-center" /></a>  

### 5. 組裝牆壁、屋頂安裝 Smart 開發板及 LCD 顯示器

1. H 板兩邊缺口垂直朝下安裝。
   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-12.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-12_s.jpg' class="nofancybox  img-center" /></a>
2. 將 F 板凹槽旁短邊朝 H 板屋脊方向安裝。

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-13.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-13_s.jpg' class="nofancybox  img-center" /></a>
3. E 板底部對齊 A 板凹槽，C、D 板凹槽與 E 板凸位相互垂直對齊安裝。

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-14.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-14_s.jpg' class="nofancybox  img-center" /></a>
4. G 板凹槽旁短邊朝屋脊方向安裝，確認小屋是否穩固。

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-15.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-15_s.jpg' class="nofancybox  img-center" /></a>  

### 6. 完成組裝

   <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-16.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-house-16_s.jpg' class="nofancybox  img-center" /></a>

## 智慧插座

- 範例影片展示
  <div class="video-container">
    <iframe width="560" height="316" src="https://www.youtube.com/embed/nFEY_k_2zxQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

- 接線與實作

  我們使用的插座有兩個插孔，其中一個插孔會接上家用電，同時這個插孔會提供 `Webduino` 開發板電源，然後透過繼電器來控制另外一個插孔的供電與否，因此我們會把接在插孔上的單心線，接到繼電器的「公共」與「常開」端，然後繼電器的 VCC 接在開發板的 5V，GND 接在 GND，Vin 訊號腳可以接在 2~13。

  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-01.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-01_s.jpg' class="nofancybox img-center" /></a>

  所需材料列表：

  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-02.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-02_s.jpg' class="nofancybox img-center" /></a>

  一開始先把插座和插座背板結合，插座有卡榫，直接裝上去就可以。

  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-03.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-03_s.jpg' class="nofancybox img-center" /></a>

  中間的空間剛好可以放入繼電器，可以直接卡進去或是用熱熔膠固定，插座則看照片放入五根單心線，單心線很硬，直接塞進去插座的接孔內就可以 (內有金屬夾片會自動卡住 )

  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-04.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-04_s.jpg' class="nofancybox img-center" /></a>

  組合插頭與電線，直接把電線的頭去皮，分別鎖到插頭上即可。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-05.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-05_s.jpg' class="nofancybox img-center" /></a>

  把單心線和電線，用快速接頭連接，同時也把單心線接到繼電器上面 ( 公共端 與 常開端)。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-06.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-06_s.jpg' class="nofancybox img-center" /></a>

  繼電器的另一側用杜邦線接出來。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-07.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-07_s.jpg' class="nofancybox img-center" /></a>

  組合外殼。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-08.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-08_s.jpg' class="nofancybox img-center" /></a>

  上蓋用螺絲固定 ( 若螺絲太小可用墊片與螺帽輔助 )。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-09.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-09_s.jpg' class="nofancybox img-center" /></a>

  和開發板連線就完成囉！插座上有兩個插孔，一個是固定供電給開發板，透過 Wi-Fi 來控制另外一個插孔有沒有電。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-10.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-10_s.jpg' class="nofancybox img-center" /></a>

- Webduino Blockly 操作解析
  打開 [Webduino Blockly 編輯工具](https://blockly.webduino.io)，把開發板放到編輯畫面裡，填入對應的 Webduino 開發板名稱，然後放入 LED 的積木，名稱設定為 `led`，腳位設定為 `10`。

  >LED 的積木在「發光元件 > LED 燈」目錄下。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-11.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-11_s1.jpg' class="nofancybox img-center" /></a>

  打開網頁互動測試區，下拉選單選擇「點擊燈泡」，待會要透過點擊這個燈泡圖案，控制智慧插座上的電燈或電器，選擇點擊燈泡之後，在左側積木清單的下方就會有對應的積木可以使用。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-12.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-12_s.jpg' class="nofancybox img-center" /></a>

  為了讓燈泡圖片和插座的電燈狀態一至，一開始先放入 led 狀態 off 和燈泡狀態 off 的積木。
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-13.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/smart-socket-13_s2.jpg' class="nofancybox img-center" /></a>

  最後放入點擊燈泡要執行的動作，動作就是「狀態切換」，如果原本是 on 就會變成 off，原本是 off 就會變成 on。

  確認開發板上線，點選右上方紅色按鈕執行程式，點擊網頁燈泡圖片，就會看到燈泡圖片和插座上的電燈同時亮起，再點一下就會同時關閉。

  >解答：`https://goo.gl/3FKjzi`

- 關參考
- 範例解答： `https://goo.gl/3FKjzi`
- 範例完整程式碼： `https://bin.webduino.io/mujod/edit?html,css,js,output`
- 只會插座三十篇完整教學：[主題課程：實戰智慧插座](https://tutorials.webduino.io/zh-tw/docs/socket/index.html)

### 使用網頁操控智慧插座

- 順利連上 `Wi-Fi` 之後，可以透過下列方法來檢查裝置有沒有在線上。
  
  <a data-fancybox="gallery" href='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/online.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/online_s.jpg' class="nofancybox img-center" /></a>

- Webduino 程式用法
  
  比較不熟悉的人所設計的，也就是透過「積木組裝」的方式來撰寫程式邏輯，接著來看一下對應的網頁程式要怎麼運作，首先我們點選右上方的程式編輯器，就會打開一個以 jsbin 為基底的編輯頁面，從這邊可以看到預設引入了幾支 JavaScript，撇除 JQuery、Firebase 和 runtime 這三個第三方 JavaScript，最主要就是要**引入「 webduino-min.js 」還有「 webduino-blockly.js 」這兩個 JavaScript，**這樣我們才有操控開發板以及燈泡的 API 可以使用。

  ```html
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Webduino</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://webduino.io/components/webduino-js/dist/webduino-all.min.js"></script>
    <script src="https://blockly.webduino.io/webduino-blockly.js"></script>
    <script src="https://blockly.webduino.io/lib/firebase.js"></script>
    <script src="https://blockly.webduino.io/lib/runtime.min.js"></script>
  </head>

  <body>
  </body>
  </html>
  ```

  JS 的原始碼可以參考：

  - `https://github.com/webduinoio/webduino-js`
  - `https://github.com/webduinoio/webduino-blockly`

  首先看到開發板的部分，透過 boardReady 判斷裝置是否上線，當上線之後就會執行內容的 function。

  ```javascript
  boardReady('裝置的 device 名稱', function (board) {
    board.systemReset();  // 加入這行，裝置在第一次連線的時候，所有腳位輸出預設低電位 ( 0、off )
    board.samplingInterval = 250; // 類比腳位取樣時間
  });
  ```

  因為裝置預設一次只能夠有一個人操控 (後面上線的會把前面上線的踢掉)，為了避免這種狀況，我們就必須要修改裝置的屬性，把 boardReady 的第一個變數改成物件的形式 <font color=red>{device:'裝置的 device 名稱', multi: true}</font>，這段 <font color=red>multi: true</font> 就是可以讓多人同時操控的關鍵屬性。

  ```javascript
  boardReady({device:'裝置的 device 名稱', multi: true}, function (board) {
  board.systemReset();
  board.samplingInterval = 250;
  });
  ```

  再來看到控制「繼電器」的部分，因為訊號對於繼電器來說不是 1 (高電位、on) 就是 0 (低電位、off)，所以可以直接使用 LED 的控制方法，LED 的控制方法有以下幾種：

  - <font color=red>getLed(board, pin)</font>
    設定 LED 為哪塊板子的幾號腳位。
  - <font color=red>on(callback)</font>
    設定輸出腳位為高電為 ( 1、on )，如果有 callback 的話，在執行 .on() 之後就會執行 callback 的函式。
  - <font color=red>off(callback)</font>
    設定輸出腳位為低電位 ( 0、off )，如果有 callback 的話，在執行 .off() 之後就會執行 callback 的函式。
  - <font color=red>blink(time,callback)</font>
    設定 LED 閃爍 ( 高電位低電位切換，time 是毫秒 )，如果有 callback 的話，在每次閃爍之後就會執行 callback 的函式。
  - <font color=red>intensity</font>
    設定「低電位」輸出強度。 ( 0~1 之間的浮點數，例如：.intensity=0.5 )
  - <font color=red>toggle()</font>
   設定狀態切換，如果上一次是高電位，下一次就會是低電位。

- 網頁控制

  簡單來說，如果我們要在網頁裡面放一個按鈕，點選按鈕，燈泡就會發亮，再點選一次燈泡就會熄滅，我們可以這樣寫：

  ```javascript
  $(function(){

    var led,
      a = 1,
      btn = $('#btn');

    boardReady({device:'你的裝置名稱', multi: true}, function (board) {
      board.systemReset();
      board.samplingInterval = 250;
      led = getLed(board, 10);
      btn.on('click',function(){
        a = a * -1;
        if(a>0){
          led.on();
        }else{
          led.off();
        }
      });
    });
  }); 
  ```

  完整程式碼：`http://bin.webduino.io/tagum/1/edit?html,js,output`
  ![20210212234043](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210212234043.png)

- 小結
  以上就是透過基本的網頁來操控插座上的電器，其實原理非常的簡單，只要把實際的電器「網頁變數化」，就可以像一般網頁操作變數一樣的來操作了。

---

## WebEye

`WebEye` 是目前市面上最快速入門 AIoT (AI+IoT) 的神兵利器，不僅能在電腦裝置上運行，也能完美支援行動裝置的操作使用。透過 `Webduino Blockly` 程式積木，搭配影像辨識訓練和人臉辨識學習，輕鬆開發千變萬化的影像辨識應用。

### 1. WiFi 設定方法

有兩種方法可以進行 WiFi 設定 (任選一種)，WebEye 預設連接的 WiFi SSID 為 webduino.io，密碼為 webduino

- 方法一：使用 `WebEye` 設定畫面 (與 `Smart` 開發板相同)

  1. `WebEye` 的設定畫面
     `WebEye` 設定 `wifi` 方式和 `Smart` 開發板一樣，如不知道如何進入 `WebEye` 設定頁面，可以 參考此[教學](https://tutorials.webduino.io/zh-tw/docs/basic/board/smart-setup.html)

     >注意：載入設定畫面需等待30秒，是正常的哦

     ![Webeye](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye.png)

  2. 按下 [Update] 彈出視窗 [Save OK] 就可以斷電，重新插上電源
  3. 看到 WiFi清單顯示 wd???_xxx.xxx.xx.xx 就表示上網，如下圖
     ![Webeye上網一](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye1.png)

- 方法二：透過 Webduino Smart 開發板自動設定 WiFi<此方法是透過連接 Smart 開發板，取得WiFi 設定>

  1. Smart韌體更新到最新版本 3.2.5以上
  2. 依照[學習手冊](https://tutorials.webduino.io/zh-tw/docs/basic/board/smart-setup.html)先設定好 Smart 的 WiFi，確認連線正常。
  3. Smart 移除電源，將 GND/VCC 和 WebEye 對接、TX 腳位和 WebEye IO13 腳位 連接。
  4. Smart 插上電源後會將 WiFi 設定傳送給 WebEye。
  5. WebEye LED 停止閃爍後即可將 IO13 腳的連線移除。

  ![Webeye上網二](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye2.png)

### 2. 使用方式

將 WebEye 開機並等待 LED 燈停止閃爍完全熄滅時,查看WiFi清單,可開啟 Chrome 瀏覽器輸入wdxxx_ 底線後的 IP位置(電腦必須和 WebEye 在相同區網):

1. 開啟筆記型電腦或手機,掃描 WiFi
   ![Webeye上網一](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye3.png)
2. 瀏覽器輸入 `http://192.168.10.147/jpg` 出現影像表示設定成功。IP 並非永遠固定，請在每次 WebEye 連上網路後重新查詢。

>注意事項
 WebEye 僅支援 2.4G 頻段網路，請勿設定 5G 頻段網路。

### 3. 遠端影像設定方法

開啟遠端影像可以跨網域取得 WebEye 影像。
警告：遠端影像功能將佔用網路頻寬與流量，計費型網路請酌量使用。

#### 3.1 開啟遠端影像

1. 確認 WebEye 已經設定好 WiFi 並成功連上網路。
2. 依照上述方法取得 IP，開啟瀏覽器輸入 `http://[IP]/remote` (例如 `http://192.168.10.147/remote`)，會進入遠端影像設定畫面。
   ![20210227222749](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210227222749.png)

   ![Webeye開啟遠端影像](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye4.png)
3. 不需要修改 Hostname 及 Interval，直接按下 [OK]。如果這兩個欄位已經被修改過 ，可先按下 [Default] 取得預設值。
4. 設定完成後會取得 Remote URL。
5. 在瀏覽器輸入 Remote URL，看見影像表示設定成功。

#### 3.2 關閉遠端影像

1. 進入遠端影像設定畫面。
2. 清除 Hostname 並按下 [OK]。
3. 顯示 Remote: disable! 表示關閉成功
   ![Webeye關閉遠端影像](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye6.png)

#### 3.3 LED 燈號意義

WebEye 內建一顆 LED 燈，依據亮暗及閃爍速度代表不同意義。
![LED 燈號意義](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye7.png)

1. 開機後搜尋網路時：慢速閃爍
2. 進入 SmartConfig WiFi 設定時：慢速閃爍
3. 開機後檢查或更新韌體時：快速閃爍
4. 連上 WiFi 準備就緒後：關閉

### 4. WebEye 程式積木使用方式

1. 打開程式積木範例: `https://blocklypro.webduino.io/#XJLQm5lBv1`
   - 填入 Smart 開發板的 DeviceID
   - 填入 WebEye **遠端影像網址**
  
   ![遠端影像網址](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye9.png)

2. 完整程式積木與使用方式
   共有5顆按鈕，按鈕1,3控制鏡頭左右，按鈕2,5控制鏡頭上下，按鈕4設定鏡頭回原點。

   ![完整程式積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye10.png)

### 5. WebEye 行動裝置使用方式

網頁使用網址: `https://webduinoio.github.io/webeye/app.html#????@http://????????`

`????：`填上 Smart 的 DeviceID
`http://????????：`填上WebEye 遠端網址（Remote URL）

- 範例: `https://webduinoio.github.io/webeye/app.html#Ga6o@http://http://webeye.webduino.io/camera/LoaqO8L2M/live`

### 6. 擴充積木使用教學

#### 6.1. 啟用兌換卷

兌換券(領取與添加新功能)
Webduino 除了原有的服務，額外提供加值功能，透過輸入「功能兌換券」代碼，就能讓原本的帳號多一項隱藏版功能，例如：專案數增加、Line 程式積木、影像辨識積木...等。

- 實作流程
  首先，進入 Webduino 雲端平台，註冊帳號並登入：`https://cloud.webduino.io/`
  ![20210225154414](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225154414.png)

  接著，點選 Blockly 程式積木
  ![20210225154448](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225154448.png)

  並於畫面右上角點選「兌換券按鈕」
  ![20210225154927](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225154927.png)

  輸入兌換券序號後，按下確定
  ![20210225155016](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225155016.png)

  兌換卷序號:  1902437108
  提供 「氣象資料擷取積木」與 「Google 試算表加強版: SpreadSheet」。

#### 6.2. 影像分類: 搭配後端影像訓練平台，將訓練好的影像模型直接套用在積木上使用

- 影像辨識積木
  ![20210225155832](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225155832.png)

- 訓練模型
  1. 收集大量訓練用的照片，並加以分類
     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210225160447.png)

     > 新增資料集 => 資料集名稱: dataset0 => 上傳  Webcam 影像 => 擷取影像 => 上傳

  2. 訓練資料管理 - 新增剪刀、石頭、步資料集
     2.1. 新增剪刀資料集
     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye11.png)
     2.2. 新增石頭資料集，方法同上。
     2.3. 新增步資料集，方法同上。

     完成後，如下圖:
     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye12.png)

  3. 建立影像識別模型
     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye13.png)

     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye14.png)

     ![20210225160447](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/webeye15.png)

- 使用 Webeye 時
  
  要啟動 camera，需兌換「人臉辨識+情緒感知」卷，才有積木功能。

#### 6.3. 人臉辨識: 可偵測人臉特徵值，直接套用在積木上使用

- 人臉積木範例
  
  載入人臉模型後，啟動影像來源 (WebCam 或 WebEye)，每秒一次取得人臉特徵

#### 6.4. 情緒辨識: 可偵測情緒，直接 套用在積木上使用

更詳細使用方式請參考[簡報教學](https://docs.google.com/presentation/d/1QOBeUtaaU6M3H6Y8gqbgk33zAGgML2Rwg8LldE99l-w/edit#slide=id.g5f979813d1_0_356)

---

## 使用兌換券 (領取與添加新功能)

Webduino 除了原有的服務，額外提供加值功能，透過輸入「功能兌換券」代碼，就能讓原本的帳號多一項隱藏版功能，例如：專案數增加、Line 程式積木、影像辨識積木...等。

### 1. 實作流程

首先，進入 Webduino 雲端平台，註冊帳號並登入：`https://cloud.webduino.io/`
![登入 Cloud 雲端平台](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210221133023.png)

接著，點選 Blockly 程式積木
![點選 Blockly 程式積木](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210221133051.png)

並於畫面右上角點選「兌換券按鈕」
![點選兌換券](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210221133115.png)

輸入增加專案數序號後，按下確定
![輸入增加專案數序號](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210221133140.png)

專案數將從原本的 20 個，增加為 50 個
![專案數增加](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210221133158.png)

相關參考
Webduino 雲端平台：[基本介紹](https://tutorials.webduino.io/zh-tw/docs/cloud/index.html)

## 連動多塊開發版

1. 首先把開發板的積木放到畫面當中，注意在開發板的積木後方有個可勾選的項目「串聯」，將有需要連動的開發板，就勾選串連，放入「當開發板串連完成後執行」的積木，我們將要執行的事件放在缺口內，如此一來就可以確保開發板都上線完成後才會執行。

   >注意，只要有勾選串連的開發板，就一定要使用串連完成的積木。

   <a data-fancybox="gallery" href='hhttps://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/multi-board-01.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/multi-board-01_s.jpg' class="nofancybox  img-center" /></a>

2. 把偵測 RFID 的邏輯積木放在「串連完成後執行」的缺口內，當值等於 `8C7DDD32` ，LED 就會亮起，當不是，LED 就會熄滅。

   <a data-fancybox="gallery" href='hhttps://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/multi-board-02.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/multi-board-02_s.jpg' class="nofancybox  img-center" /></a>

## 使用者自定義函式

**流程**，在程式碼裡面就是 `function`，在寫程式的時候，常常會遇到需要重複執行的程式碼，這些重複的程式碼可能從十幾行道幾百行不等，如果每重複一次都得重寫一次，勢必會造成不小的困擾，所以我們可以設定一個流程，並在這個流程中寫入對應程式碼，如此一來，當我們需要重複用到這些程式碼的時候，只要呼叫這段流程，就可以重複執行對應的程式。

官網介紹: `https://tutorials.webduino.io/zh-tw/docs/blockly/standard/functions.html`

## [自訂積木]

### 1. 法蘭斯自訂積木清單  

`https://github.com/fustyles/webduino/blob/master/CustomBlock.txt`

### 2. 增加本功能之操作

左下角齒輪 -> 積木[使用自有積木] -> 匯入

自訂積木: `https://fustyles.github.io/webduino/EDU_addCustomBlocks/blockly.json`

### 3. 各種應用  

#### 人臉辨識 (tfjs face-api.js)

- 說明
  使用face-api.js (TensorFlow.js)卷積神經網絡（CNN）開發的Webduino自訂積木程式，可擷取人臉128 個值的特徵向量經分類器(如歐氏距離)辨識影像當中的人臉相似度的距離。可應用於機場出入關、智慧型手機解鎖、上下班打卡、智慧ATM、智慧住宅等。
  >參考資料： `https://omnixri.blogspot.com/2020/12/ai.html`

- 匯入網址: `https://fustyles.github.io/webduino/faceapi_recognize_20201012/blockly.json`

- 積木範例: `https://blocklypro.webduino.io/#XJLeox51d8`
  
1. 比對照片資料夾格式參考:
   - github: `"https://fustyles.github.io/webduino/faceapi_20200402/facelist/"`
   - 本機端:  `webduino/faceapi_20200402/facelist/`

2. 下載模型資料夾放在
   - github: `"https://fustyles.github.io/webduino/faceapi_20200402/"`
   - 本機網站上執行: webduino/faceapi_20200402/

#### 全身辨識 (MediaPipe Holistic)

- 匯入網址: `https://fustyles.github.io/webduino/holistic_20201012/blockly.json`

#### Google 試算表 SQL 語法查詢

- 匯入網址: `https://fustyles.github.io/webduino/SpreadsheetSQL_20210403/blockly.json`

#### Barcode 辨識

- 匯入網址: `https://fustyles.github.io/webduino/barcode_20210216/blockly.json`

#### QR code 辨識 (instascan)

- 匯入網址: `https://fustyles.github.io/webduino/instascan.js_20201012/blockly.json`

#### 文字辨識 (tesseract.js)

- 匯入網址: `https://fustyles.github.io/webduino/tesseract.js_20201012/blockly.json`

#### 臉部偵測 (Tracking.js)

- 匯入網址: `https://fustyles.github.io/webduino/trackingface_20201012/blockly.json`

#### 顏色偵測 (Tracking.js)

- 匯入網址: `https://fustyles.github.io/webduino/trackingcolor_20201012/blockly.json`

#### 深度學習 (tfjs KNN-Classifier)

- 匯入網址: `https://fustyles.github.io/webduino/knn-classifier_20201012/blockly.json`

#### 臉部偵測 (tfjs face-api.js)

- 匯入網址: `https://fustyles.github.io/webduino/faceapi_detect_20201012/blockly.json`

#### 姿態偵測 (tfjs posenet)

- 匯入網址: `https://fustyles.github.io/webduino/posenet_20201012/blockly.json`

#### 臉部偵測 (tfjs blazeface)

- 匯入網址: `https://fustyles.github.io/webduino/Blazeface_20201012/blockly.json`

#### 物件偵測 (Microsoft Azure Custom Vision)

- 匯入網址: `https://fustyles.github.io/webduino/Azure_ClassifyImage_20190901/blockly.json`

- 積木: 進階功能 > 自訂視覺
  
  <a data-fancybox="gallery" href='hhttps://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/Azure_Custom_Vision.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/Azure_Custom_Vision_s.jpg' class="nofancybox  img-center" /></a>

#### 物件偵測 (tfjs coco-ssd)

- 匯入網址: `https://fustyles.github.io/webduino/coco-ssd_20201012/blockly.json`

#### 物件偵測 (tfjs mobilenet_20201012)

- 匯入網址: `https://fustyles.github.io/webduino/mobilenet_20201012/blockly.json`

#### 機器學習 (tfjs teachable machine)

- 匯入網址: `https://fustyles.github.io/webduino/teachablemachine_20201012/blockly.json`

- 積木: 進階功能 > 機器學習 (自訂模型)
  
  <a data-fancybox="gallery" href='hhttps://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/teachablemachine.jpg'><img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/teachablemachine_s.jpg' class="nofancybox  img-center" /></a>

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

####

- 匯入網址: ``

<https://teachablemachine.withgoogle.com/models/yz3DC_pki/>

---

## Blockly - 來自Google的可視化編程工具

![20210630151105](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630151105.png)

`Google Blockly`是一款基於Web的、開源的、可視化程序編輯器。你可以通過拖拽块的形式快速構建程序，而這些所拖拽的每個块就是組成程序的基本單元。可視化編程完成，Blockly直接支持JavaScript、Python、PHP、Lua、Dart語言源碼的導出。此外，還可以將Blockly編輯器快速集成到Web、Android或iOS環境中。

因近期參與一個機器人項目，可視化編程是項目需求之一。故以Web版本（HTML 和JavaScrip）為例，整理一下Blockly 的使用方法及各功能點。


