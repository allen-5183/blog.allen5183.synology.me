---
title: 原生 Ajax 對象
top: true
cover: false
toc: true
mathjax: false
comments: true
date: 2020-10-05 11:12:09
urlname: ajax
author:
img:
coverImg:
password: 62bda85617a55878023eeed685dee9d8f605ab313b3cdbc647fe73073aab0d49
summary:
tags: 
 - ajax
 - http
categories: ajax
---
 
## Ajax 與 Http 協議



### Ajax 與 Http 協議詳解

&emsp;&emsp;在 **jQuery** 中 已經提到了 **Ajax**，並且通過 **`$.ajax()`** 方法實現了和前後臺完成的簡單交互。但事實上在工作當中 **jQuery** 所提供的功能卻是遠遠不夠的，絕大部分的公司實際上並不希望他們的開發者使用現有的 **Ajax** 框架，而是選擇自行封裝一個功能相似但針對性卻更強的內容。因此我們必須知道在 **js** 內部，**Ajax** 到底是怎樣工作的。

而在此之前，讓我們先對 **Ajax** 本身做一些詳細的說明。

- 描述 **Ajax** 全名為 `Asynchronous javascript and xml`。
&emsp;&emsp;&emsp;<font color='red'>是指圍繞【由 js 向伺服器發起 `http` 請求】這個功能而開發的一整套完整的做法。</font>

- 由來
  - 99 年 Microsoft 公司第一次在 `IE5.0` 中引入此功能
  - 04 年 Gmail 發佈、05 年 Google Map 發佈時此功能才被重視 
  - 05 年 2 月 Ajax 正式提出
  - 06 年 W3C 發佈其對應的國際化標準

- 概述 Ajax模組在處理網路請求的時候包括以下五個步驟
  1. 創建 `Xhr` 對象
  2. 構建 `Xhr` 對象的屬性和方法
  3. 由 `Xhr` 對象發出 `HTTP` 請求
  4. 通過 `Xhr` 對象的方法，接收伺服器回傳的資料
  5. 更新網頁數據

這幾個步驟都離不開 `Xhr` 對象，可見其重要性，如同操作 DOM 時所需要的對象 `document`。

- 補充
  - Ajax可以發出同步請求，也可以發出非同步請求。
     &nbsp;但大多數情況下指的是非同步請求，因為同步的Ajax請求對流覽器會產生"阻塞效應"

  - HTTP(超文本傳輸協議)
    可以透過此協議來進行文本或超文本(視頻、圖片、二進制等)文件的發送，簡單說，把所有數據打包成二進制採用 `JSON` 格式來發送。

> JSON 文件

  JSON 是字符串形式，本身是一種字符串的轉碼格式，表現為 JavaScript 的對象結構，但本質是由單引號所定義的字串，為何需要字符串，因為物聯網中要傳送數據，必須使用字符串，這是由硬體所決定，所有數據傳輸都必須採用字符串，由硬體決定，計算機中處裡數據只能0(沒過電)或1(過電)，這裡使用 1 個 bit 來控制，而在數據上基本單位 byte = 8bit， 定義了一字符串 'A' 代表了要產生 65 (100000001)，發送到電腦中即處理 100000001(高低低低低低低高) 電位。

- 範例:

  ```js
  $.ajax(function(){
      type:   ,
      url:    ,
      dataType:
      success:function(){},
      error:function(){} 
  });
  ```

  ```php
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status == 200){
        console.log(JSON.parse(xhr.responseText));
      }else{
        console.error(xhr.statusText);
      }
    }
  }
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.open('GET','ajax.php',true);
  xhr.timeout = 5000;
  xhr.send(null);
  ```

### xhr 對象

#### 1. xhr 物件發送請求整體感知

【Ajax 發送請求】這件事情並不是一句話帶過就可以的，在 `Ajax` 中對整個請求從創建到發送都有著一套嚴格的標準流程。就好像車間生產產品，流水線上每一個步 驟的操作完畢之後才能打包出售。

在 `Ajax` 規則中，"請求" <font color='red'>從創建到被發送</font>需要至少經歷如下幾個步驟：

通過 `XMLHttpRequest` 類別創建 `xhr` 對象
為 `xhr` 物件添加屬性與回調方法
令 `xhr` 物件執行 `open()` 方法，指明請求被發往某處
令 `xhr` 物件執行 `send()` 方法，發出請求。

- 說明：`XMLHttpRequest` 物件用來在【流覽器】與【伺服器】之間傳送資料。
       <font color='red'>通俗上來說將此物件稱為 `request` 請求物件、請求物件或請求。</font>

#### 2. xhr 物件的常用屬性與方法
在整體感知中我們看到的例子中的屬性和方法，基本都是要掌握的內容。或許有一些內容
並沒有體現在上面，但相信我他們都會是你今後離不開的東西。

##### 2.1 onreadystate 屬性

- 描述 `onreadystatechange` 屬性指向一個回呼函數。
&emsp;&emsp;&emsp;當頁面的載入狀態發生改變的時候 `readyState` 屬性就會跟隨發生變化，而這時 `readystatechange` 屬性所對應的回呼函數就會自動被調用。
- 語法 <font color='red'>xhr.onreadystatechange = function(){};</font>
  <br>
  >DOM 中 `readystatechange` 事件的每個對象都有一個 readyState 屬性，其中有五個可能值，如下表所示:

  |屬性值    | 說明 |
  |:------- | -------
  | uninitialized（未初始化）|對象存在但尚未初始化。 
  | loading（正在載入）|物件正在載入資料。
  | loaded（載入完畢）|物件載入資料完成。
  | interactive（交互）|可以操作物件了，但還沒有完全載入(外部資源)。
  | complete（完成）|物件已經載入完畢。

- 範例

  `xhr_org.html`

  ```html
  <!DOCTYPE html>
  <html>
  <head lang="en">
    <meta charset='utf-8'/>
    <title>xhr 對像</title>
  </head>
  <body>
  <button>發送請求</button>
  <script>
    var btn = document.querySelector('button');
    btn.onclick = function (){

    };
  </script>
  </body>
  </html>
  ```

  `xhr.php`
  
  ```php
  
  <?php
    $success = array('msg' => 'OK');
    echo json_encode($success);
  ?>
  ```

##### 2.2 readyState 屬性

- 描述 是一個唯讀屬性，用一個整數和對應的常量來表示XMLHttpRequest請求當前所處的狀態一般會在onreadystatechange事件的回呼函數中，通過判斷readyState屬性的值，進而執行不同狀態對應的函數。

- 語法
  
  ```php
  xhr.onreadystatechange = function(){
   if(xhr.readyState == n){
     // 執行對應的函數
   }
  }
  ```

- 說明
  1. 值為 0,對應常數 `UNSENT`
     表示 `XMLHttpRequest` 實例已經生成，但是 `open()方法`還沒有被調用，尚未提出請求。

  2. 值為 1,對應常數 `OPENED`
         表示 `send()` 方法還沒有被調用，仍然可以使用 `setRequestHeader()` 設定 `HTTP` 請求頭

  3. 值為 2,對應常數 `HEADERS_RECEIVED`
     表示 `send()` 方法已經執行，並且頭資訊和狀態碼已經收到，伺服器尚未收到。

  4. 值為 3,對應常數 `LOADING`
     表示正在接收伺服器傳來的 `body` 部分的資料，如果 `responseType` 屬性是 `text` 或者空字串，`responseText` 就會包含已經收到的部分資訊，伺服器正在接收。

  5. 值為 4,對應常數 `DONE`，表示伺服器資料已經完全接收，或者本次接收已經失敗了。

##### 2.3 status 屬性

- 描述 表示本次請求所得到的 HTTP 狀態碼，它是一個整數。

- 語法

  ```php
  if(xhr.readyState == n){
    if(xhr.status == 200){
     //通信成功
    }
  }
  ```

- 說明
  a.本屬性是唯讀屬性。
  b.本屬性有以下可能值：

    
  |  代碼 | 狀態資訊|說明 |
  |:-----|:---------------------|:------|
  |200   | OK                   |訪問正常|
  |301   | Moved Permanently    |永久移動|
  |302   | Move temporarily     |暫時移動|
  |304   | Not Modified         |未修改   |
  |307   | Temporary Redirect   |暫時重定向|
  |401   | Unauthorized         |未授權 |
  |403   | Forbidden            |禁止訪問|
  |404   | Not Found            |未發現指定網址|
  |500   | Internal Server Error|伺服器發生錯誤|

- 補充 一般來說認為 `200` 就是通信成功的標誌。

##### 2.4 statusText 屬性

- 描述 表示伺服器發送的狀態提示，是一個唯讀字串。
- 語法 <font color='red'>xhr.statusText</font>
- 說明 不同於 `status` 屬性，該屬性返回狀態碼所對應的狀態資訊。比如 `OK`。

##### 2.5 responseText 屬性

- 描述 返回從伺服器接收到的字串內容，該屬性為唯讀。
       如果本次請求沒有成功或者資料不完整，該屬性就會等於 `null`。
       如果伺服器返回的資料格式是 `JSON`，就可以使用 `responseText` 屬性來進行資料解析。

- 語法 <font color='red'>xhr.responseText</font>

##### 2.6 open()方法

- 描述 表示要將請求發往某處，只是設置而不是真的發送。

- 語法 <font color=red>xhr.open('請求類型'，'url地址'，是否非同步);</font>
- 說明
  第一個參數用來設置 `get/post` 請求
  第二個參數用來設置請求發送到的 `url` 地址
  第三個參數是布林值用來設置是否非同步發送，預設 `false` 表示同步。
- 補充
  目前因為我們的頁面都採用 `localhost` 方式在本地主機直接訪問，因此 `url` 直接寫出 `php` 檔的相對路徑即可。

  而如果通過其他方式打開可能會引起 `js` 的跨域問題，就會報錯。

##### 2.7 setRequestHeader()方法

- 描述 用於設置HTTP頭信息。
- 語法 xhr.setRequestHeader(‘key’，’value’);
- 說明
      本方法必須在 `open()` 之後、`send()` 之前被調用
      本方法用來設置在請求發送時，一併被發送出的一些補充資訊
- 例子

  ```php
  xhr.setRequestHeader('Content-Type', 'application/json'); 
  xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
  xhr.send(JSON.stringify(data)); 
  ```

##### 2.8 send()方法

- 描述 用於實際發出 `HTTP` 請求。
- 語法 `xhr.send(formData);`
- 說明 `send()`方法的參數是表單數據，為 `post 請求準備。
       如果是 `get` 請求則參數直接寫 `null` 即可。

### xhr對象發送 post 請求

- 描述 `post` 請求和 `get` 請求的差異就在於多了一個表單數據，在 `xhr` 物件中可以通過 `FormData` 進行構建。
- 語法
  ```php
  var formData = new FormData();
  formData.append('key',value); // value 如果是字串類型要加引號。
  xhr.send(formData);
  ```
- 說明
      至於 `formData` 的創建時機和位置，只要你能夠在請求發送出去之前。
      也就是 `xhr.send()` 語句被寫出之前添加給 `xhr` 對象
      那麼你願意把 `formData 放在哪就放在哪。

- 範例
  前台:
  `post&compatible_org.html`

  ```html
  <!DOCTYPE html>
  <html>
  <head lang="en">
    <meta charset='utf-8'/>
    <title> xhr對像 post請求與兼容性問題</title>
  </head>
  <body>

    <button>發送請求</button>
    <script>
      var btn = document.querySelector('button');
      btn.onclick = function (){

      };
    </script>
  </body>
  </html>
  ```

  後台: 收到的數據，直接返回
  `post&compatible_org.php`
  
  ```php
  
  <?php
    $success = array('msg' => 'OK', 'info'=>$_POST);
    echo json_encode($success);
  ?>
  ```

  測試執行結果。

  >get 請求若有參數要傳遞，可以透過 url，如下方法。
  >
   ```html
   xhr.open('get', 'xhr.php?uname=allen&upass=1234', true); 
   ```

### xhr 物件的相容性問題

- 描述 `xhr` 物件的獲取方式在 `IE` 和非IE下是需要使用不同方法。
- 語法
      標準流覽器支援的方法為: `XMLHttpRequest()`
      IE流覽器支援的方法為:  `ActiveXObject()`
- 例子：

  ```php
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else if(window.ActiveXObject){
    xhr = new ActiveXObject();
  }
  ```

  > 說明：可以直接使用三目運算子解決
  ```php
  xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("");
  ```

#### 登錄 post 請求實例
- 要求
  1. 在 html 頁面中獲取用戶訊息，並在點擊的時候將訊息 POST 到後台
  2. 在 php 文件中通過 $_POST 對象獲取 html 文件發來的訊息，並根據輸入內容進行響應。

- 擴展
  3. 如果前兩句能夠自行實現並且沒問題，則使用 sql 語句來檢查輸入的用戶密碼是否是DB 的項目，並根據DB 的檢索結果反饋給用戶。

- 前台 `post&compatible.php`
  修改:
  - 原式: `<button>發送請求</button>`
  - 成為: `<button>登陸</button>`  

- 後台
  修改 `post&compatible_org.php` 成為 `post&compatible.php` 如下:

  ```php
  <?php
	$username = $_POST['uname'];
	$password = $_POST['upass'];
	$success = array('msg' => 'OK');

	$con = mysqli_connect('localhost','root','1qaz@wsx','class');
	if($con){
		mysqli_query($con, 'set names utf8');
		mysqli_query($con, 'set character_set_client=utf8');
		mysqli_query($con, 'set character_set_results=utf8');
		//
		$sql = "select * from userinfolist where 1";
		$result = $con->query($sql);
		//獲取數據庫數據
		if($result->num_rows>0){
			$info = [];
			for($i=0; $row=$result->fetch_assoc(); $i++){
				$info[$i] = $row;
			}
		}
		//判斷是否登錄成功
		$flag = false;//默認false表示登錄失敗，如果能登錄成功，則變為true
		for($j=0; $j<count($info); $j++){
			if($info[$j]['userName'] == $username){
				if($info[$j]['password'] == $password){
					$success['infoCode'] = 0;
					$flag = true;
					break;
				}
			}
		}
		if($flag == false){
			$success['infoCode'] = 1;
		}
	}else{
		$success['infoCode'] = 2;//0代表成功，1代表失敗，2代表數據庫連接失敗
	}
	echo json_encode($success);
  ?>
  ```

### 請求超時 timeout 與超時監聽 ontimeout

- 需求
  正常使用 `Ajax 功能`，乃透過 send() 提出請求後，等到伺服器回應得到 200 前端才繼續處理,在本地端操作沒有問題，不會有延遲，但是若與遠端伺服器交互，可能會有延遲問題發生，有可能前端頁一直在等伺服器的回應。
  
- 描述
      `timeout` 屬性等於一個整數，用來設置當請求發出後等待接收回應的時間。
      `ontimeout()`方法則是當等待超時後，自動執行的回調方法。

- 語法：

  ```php
  xhr.timeout = xxx;
  xhr.ontimeout=function(){
    console.error("The request for"+url地址+"timed out");
  };
  ```

- 說明
      `timeout` 屬性單位是毫秒，表示當請求發出後等待回應的時間。
                如果在設置的時間內沒能收到後臺回應的內容，則認為請求超時(執行 `ontimeout`)。
- 補充：如果該屬性等於 0，就表示沒有時間限制。
- 例子：
  
  ```php
  xhr.timeout = 5000; //5秒後超時
  xhr.ontimeout = function(){
    console.error("The request for "+ajax.php+"timed out.");
  };
  ```

- 範例:
  後台: `time_out.php`
  
  ```php
  <?php

	sleep(10);

	$success = array('msg' => 'OK');
	echo json_encode($success);

  ?>
  ```

  前台: `time_out.html`
  ```html
  <!DOCTYPE html>
  <html>
  <head lang="en">
	<meta charset='utf-8'/>
	<title>請求超時設置</title>
  </head>
  <body>
  <button>發送請求</button>
  <script>
	document.querySelector('button').onclick = function (){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function (){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					console.log(xhr.responseText);
				}
			}
		};

		xhr.timeout = 5000;
		xhr.ontimeout = function (){
			console.log('連接超時，頁面加載失敗，請刷新重試');
		};

		xhr.open('get', 'timeout.php', true);
		xhr.send(null);
	};

  </script>
  </body>
  </html>
  ```

#### 範例: 發送檔進度條實例(擴展)
