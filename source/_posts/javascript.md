---
title: javascript
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2021-01-21 21:12:59
urlname: javascript
author:
img:
coverImg:
password:
summary:
tags: 
 - javascript
categories: javascript
---

1. **前身**:
   Netscape 網景公司, LiveScript 文稿語言, 網景與昇陽(Sun Microsystem co.) 共推 WWW 文稿語言的標準,最後改名 JavaSript。

   - 腳本(Script): 一種直譯語言，直譯程式是一個指令一個動作，一列一列的執行腳本程式碼。
   - JavaScript 這類腳本語言不需要編譯，所以撰寫和除錯十分容易，而且一經更改馬上就可以執行，看到執行結果。
   - 直譯的腳本語言有一些缺點，在執行效率上比不上編譯的程式語言，對於一些大型應用程式來說，程式執行效率的差異就會更加明顯，而且腳本語言不能單獨執行，需要直譯程式才能執行，例如：HTML網頁中的 JavaScript 程式需要瀏覽器支援才能執行。
   - 補充 HTML 及 JAVA 的不足.
   <escape>
     <table>
        <tr>
           <th></th>
           <th>JavaScritp</th>
           <th>Jave</th>
        </tr>
        <tr>
        <td>語言</td>
           <td>Object Type</br>
               Interpreted</br>
               物件基礎(Object-based), 無類別繼承</td>
           <td>Object Type</br>
               Compiled</br>
               物件導向(Object-Oriented), 類別繼承</td>
        </tr>
        <tr>
        <td>資料型態</td>
        <td>loose</td><td>strong</td>
        </tr>
        <tr>
          <td>與 HTML 關聯</td>
          <td>嵌入式</td>
          <td>獨立於 HTML 文件外(用<Applet>呼叫)</td>
        </tr>
     </table>  
   </escape>

   - 鬆散的資料型態
     1. 宣告變數時，無須宣告資料型態。
     2. 程式執行時自動轉換。

2. JS 的歷史:  
   JavaScript 的版本有 2 種講法:
   **數字**或**年代**
   例: ECMAScript 6(ES6)/ECMAScript(ES2015): 指 ECMAScript 的第六版修訂，於 2015 年完成標準化。
   例: ECMAScript 2016: 預計的第七版 ECMAScript 修訂。

   >因新版本尚未穩定，瀏覽器也未都支援，所以這裡用較新且較穩定 ES6 或  ES7 版本。

3. JS 的寫法:撰寫格式
     - 利用專用標籤 `<script></script>`
       - 格式一: HTML 一載入時即執行 Script。
  
         ```javascript
         <Script>
          <!- document物件用於將目前的文件資訊輸出至使用者螢幕 -->
          document.write("JavaScript程式一")
         </Script>
            :
         </head>
         ```

         > document.write()方法會在網頁元件載入之後清空所有內容，再將括號()內的資料顯示在網頁，單純測試可以，但正式寫網頁，應使用 HTML 元件將資料顯示於網頁，例如:`<div>顯示的資料</div>`

       - 格式二: 指定使用語言。
  
         ```javascript
         <Script language="JavaScript">
           document.write("JavaScript程式二")
         </Script>
         ```

         >常用 Script 有 `VBScript` 與 `JavaScript` 兩種。

       - 格式三: 包含於說明標籤之中。
  
         ```javascript
         <Script>
         <!-- document.write("JavaScript程式三") // -->
         </Script>
         <noscript>
            你的瀏覽器不支援 Javascript!
         </noscript>
         ```

         >註: 支援當碰到瀏覽器不支援時,置於文件說明標籤之中的程式碼，將被視為一般說明文字，不至於發生錯誤訊息。

       - 格式四: 宣告成外部檔案。
  
         ```javascript
         <Script src="sayHello.js">
         </Script>  //標籤中並不包含任何程式碼，而是將程式寫在另一個檔案中，利用 SRC 將該外部程式檔案指出，呼叫並執行之。
         ```

     - 利用HTML標籤
       - 放在 Anchor(錨) 當中。

         ```html
         <A HREF="javascript:alert('這樣也可以')"> 按我吧！</A>
         ```

       - 透過 event handler(事件處理程序)。

         ```html
         //並不是所有Javascript的程式碼都會放在 <SCRIPT>… </SCRIPT>標籤組當中
         <input type="button" value=" 按我吧 " onClick="alert('很簡單吧！')">
         ```

4. JS 的執行環境
   - 文字編輯器:
     - [Edit Plus](https://www.editplus.com/)
     - [UltraEdit](https://goo.gl/21zz3w)
     - [Sumlime Text](https://www.sublimetext.com/)
     - [Notepad++](https://notepad-plus-plus.org/)
   - IDE 工具
     - [Visula Studio Code](https://code.visualstudio.com/)
     - [WebStorm](https://www.jetbrains.com/webstorm/)
     - [Eclipse](https://www.eclipse.org/)
   - 線上編輯器:
     - [JSFiddle](https://jsfiddle.net/)
     - [CodePen](https://codepen.io/)
     - [JS-Bin](https://jsbin.com/?html,js,output)
     - [Plunker](https://plnkr.co/)
   - 使用 Node.Js 來執行 Js:
     - 環境安裝:
       (a). 從 [Node.js 官網](https://nodejs.org/en/download/)，下載檔案之後自行編譯安裝。或是下載已經編譯好的安裝包。
       即直接按下頁面中 "Windows Installer" 的 LTS(Long Term Service) 版本, 下載後,點擊該軟體開始安裝.
            可以根據不同平台系統選擇你需要的 [Node.js](https://nodejs.orgdist/) 安裝包。

          ```javascript
          $node --version //檢查已安裝的 nodejs 版本.
          ```

       (b) 使用 NVM(Node Version manager) 安裝與管理。
        - 至 [Node Version Manager (nvm) for Windows](https://github.com/coreybutler/nvm-windows)下載，ZIP檔後解壓縮
        - 進入解壓縮出來的資料夾，執行 `nvm-setup`
        - 前面接受授權後都 Next 即可， 在 [ Select Destinatiom Location ] 的項目中可先行記下程式安裝的存放位置，再來持續 Next 至完成安裝即可
        - 開啟 我的電腦 ，在位置列上打上前面所述要記下的安裝存放位置
        - 進到 nvm 的資料夾中，在 install 指令檔上，右鍵使用 以系統管理員執行
        - 進到命令提示字元中，按 ENTER 鍵出現如下圖後即可關閉相關視窗
        - 開啟命令提示字元，或開始在搜尋欄上打上 cmd
        - 在命令提示字元中，打上 nvm 出現如下圖表示 nvm 安裝成功

       (c) 指令說明

          ```bash
          nvm version           //查看 nvm 安裝的版本
          nvm list：查看 Node.js //已安裝的版本
          nvm list available    //查看提供哪些 Node 版本
          nvm install 版本號     //(不能有含v)：安裝指定的 Node 版本
          nvm use <版本號>       //指定使用 Node 版本
          ```

     - 測試:
  
       ```bash
       cd ~
       mkdir nodejs     // 建立專案資料夾
       cd nodejs        // cd 專案目錄
       touch test.js    // 建立一文字檔, 取名稱為 test.js
       ```

       在 Nodejs 官網找到 「About」-> 範例 -> 複製 -> 貼上 test.js 內。

       ```javascript
       const hostname = '127.0.0.1';  // 指定伺服器主機名稱
       const port = 3000;             // 指定伺服器 Port
       const server = http.createServer((req, res) => {
         // 產生 Web Service
         res.statusCode = 200;//回應 html 中的標頭給需求端其中包含狀態碼200請求成功
         res.setHeader('Content-Type','text/plain'); //標頭內容類型為文字檔 
         res.end('Hello World\n');  // 表示header,body 結束,建議每一回應都要作結束
       });
       server.listen(port, hostname, () => {
         //監聽伺服器端印出訊息
         console.log(`Server running at http://${hostname}:${port}/`);  
       });
       ```

       ```bash
       node test.js
       ```

       Server running at <http://127.0.0.1:3000/>

       修改 test.js 如下:

       ```javascript
       res.setHeader('Content-Type', 'text/html'); // 'text/plain' 需改成 'text/html' 否則回應的是一般文字
          res.end('Hello My < u> My First Program. < /u>'); //伺服器將訊息回傳到前端來顯示， Ctrl + C 終止執行
       ```

5. 瀏覽器支援度查尋工具
   - [ECMAScript6 compatibility table](https://kangax.github.io/compat-table/es6/)
   - [Can I use... Support tables](https://caniuse.com/)
  
6. 關於瀏覽器的快取(catche)功能
瀏覽器每次瀏覽網頁，會將網頁上的靜態資源(外部 CSS、JS 檔、圖檔)等作暫存，當使用者再次瀏覽同一份網頁時，這些外部資源就不會重新被載入，優點:加快網頁載入速度，同時減少伺服器負擔。缺點:當你修改這些靜態資源之後，如果快取時間還未到期，瀏覽器就只會顯示暫存的舊資料，除非使用者清除快取或是使用Ctrl+F5鍵強制重新載入。

為了避免使用者瀏覽舊資料，建議可以在修改 CSS 檔、CSS 檔、JS 檔或圖檔之後，將連接的外部檔名稱加上問號? 以及隨意字串，例如: `<script src="test.js?v001">` 如此一來，瀏覽器就會認為網址不同，而向伺器要求重新載入。

>隨意字串可以是英文字母或是數字，可以自訂版本號碼或是日期，只要不與舊版本重複就可以，例如:

```javascript
test.js?20200906
test.js?al
```

### JavaScript 的用途

1. 操作 HTML DOM

2. 網頁遊戲
   HTML5 具備跨平台特性以及提供完整的 WebGL API, 使用 JavaScript 與 HTML5 Canvas
元素能在網頁瀏覽器展現高品質的 2D 和 3D 圖形，執行效率與影音動畫效果一點都不輸給APP,
在不須下載額外的軟件下，只要使用手機瀏覽器開起頁面就可以開始玩。

   >**WebGL (Web Graphics Library)**
   是基於 OpenGL ES 的 JavaScript API， OpenGL ES 是嵌入式加速 3D
圖形標準。能快速完成需要大量計算的複雜渲染著色(render)，透過 JavaScript 就能設定與使用 WebGL API,
讓瀏覽器能夠在不使用外掛程式的情況下呈現高效率及高品質的圖形。

   以下兩款 HTML5 遊戲:
   (1) [Sumon](https://sumonhtml5.ludei.com/)
   (2) [Emberwind](http://operasoftware.github.io/Emberwind/)

3. 操作 HTML5 前端資料儲存
   HTML5 提供新功能 Web Storage, 包括 sessionStorage 以及 localStogare，
可以暫時將資料儲存於網頁瀏覽器，不需要及時存取後端資料庫，等到網路連線時再與後端資料庫同步，如此一來，就能解決
Web APP 離線使用的問題。

   localStorage: 以 key-value 方式儲存資料，使用者關閉瀏覽器 localStorage 的資料仍然會存在。

   **例子:**
   下面程式指定 localStorage 的 key 值為  count, 用來記錄瀏覽次數，第一次進入網頁 localStorage.count
值指定為 1, 之後更新頁面就會將 localStorgae.count 值 +1。

   ```javascript
   <script>
     localStorage.count = (localStorage.count)? Number(localStorage.count)+1: 1;
     document.write("瀏覽次數:" + localStorage.count + "次 .");

   </script>
   ```

4. Node.js 後端平台
   Node.js 是一個網站應用程式開發平台，採用 Google 的 V8 引擎，主要使用在 Web 程式開發， Node.js
具備內建核心模組並提供模組管理工具 NPM, 安裝  Node.js 時 NPM 也會
   一併安裝，使用 NPM 指令能下載各種第三方模組來使用，擴充容易。

5. Console 瀏覽器主控台
   - `console.log();`
     **例子**:

     ```javascript
     console.log("顯示 5+7", (5+7));
     ```

   - F12 進入除錯模式後，直接在 console 下執行指令與 JS 運算。
     <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/javascript-1.png' class='nofancybox img-center' />

   - `assert(assertiojn, 錯誤訊息);`
      assertion 是一種邏輯判斷式，結果只有 True、false，如果是假，則輸出錯誤訊息。
     **例子**:

     ```javascript
     x =5;
     console.assert(x>10, "沒有大於10");
     ```
  
   - `error(訊息);`
     error() 方法只會輸出錯訊息到主控台，刮號內可為字串、物件。

     **例子**:

     ```javascript
     var myObj ={name: "aby", tel: "07-7112345"};
     console.error(myObj);
     ```

   - `clear();`
     語法:
     console.clear();

     用來清除主控台上的訊息。執行之後主控台輸出 『Console was cleared』。

   - `count();`
     語法:
     console.count(label);

     Count() 是顯示呼叫次數，括號內可放要辨識的標籤，不加標籤則以 default 顯示。

     例如:

     ```javascript
     console.count();    //輸出  default: 1
     console.count("A"); //輸出  A: 1
     console.count("A"); //輸出  A: 2
     console.count("B"); //輸出  B: 1
     console.count();    //輸出  default: 2
     ```

   - `group()` 與 `groupEnd()`
     語法:
     console.group(label); //開始分組
     console.groupEnd();   //結束分組

     Group() 方法主要用來建立分組訊息的開示位置，之後的訊息都會歸類於這一個分組，直到 groupEnd()
     方法來結束分組。

     例如:

     ```javascript
     console.log("Hi");           // Hi
     console.group("A組");        // A組
     console.log("Hello");        // Hello
     console.log("這是A組的訊息");// 這是A組的訊息
     console.groupEnd();
     console.log("離開分組");    //  離開分組
     ```

   - `time()` 與 `timeEnd()`
     語法:
     console.time(label);      //開始計時
     console.timeEnd(label);   //結束計時

     time() 方法主要用來計算計算程式執行的時間長度，單位是毫秒(ms),如果有多個程式需要計時，可以在
     括號內加上標籤。

     例如:

     ```javascript
     console.time("for loop");     // 開始計時
     for(i=0;i<100;i++){
       console.log("hi");
     }
     console.timeEnd("for loop");  // 結束計時
     ```

## JavaScript 基礎語法

### 註解符號

1. 單行註解用 (**//**)
2. 多行註解用 (/*..註解..*/)

### 變數宣告與資料型別

#### 資料型別

- number(數值)
  整數或帶有小數點的浮點數，JavaScript 採用 IEEE 754 雙精確度(64位元) 格式來儲存，IEEE 754
標準的浮點數並不能精確的表示小數，所以在做小數點運算時必須小心，例如:
  
  ```javascript
  var a = 0.1 + 0.2;
  ```

  上述的值並不會等於 0.3, 而是 0.30000000000000004。
  所有使用 IEEE 754 標準實作浮點數，都會有此問題，因為電腦只認識 0 跟 1,再將十進位轉成二進位制計算時產生的精確度誤差，大多數的程式語言都已經針對精確度問題做處理，但JS則必須手動排除這問題，下面有兩方法解決:

  1. 將數值比例放大，變成浮點數，運算之後再除以放大的倍數。
     例如:

     ```javascript
     var a = (0.1 * 10 + 0.2 * 10) / 10;
     ```

  2. 使用內建的 toFixed() 函數，強制取道小數點的指定位數。
     例如:

     ```javascript
     var a = 0.1 + 0.2;
     a.toFixed(1);
     ```

- string(字串)
  - 字串由0個或0個義上的字元結合而成，用一對雙引號或單引號框住字元，字串內可不輸入字元，稱為空字串。
  - 字串屬原生型別，原生型別不是物件，所以沒有任的屬性，為了方便使用，可以把原生型別當物件使用，JS
引擎會自動轉型成對應的物件型別，這樣就可以使用物件的屬性(null、undefine 除外)。例如:
  - JS 不支援單一字元的函數，例如: VB 或 C++ 語言的 'chr()' 函數，只能使用單一字元的字串，例如 "J"、'c'，若連一個字元都沒有, "" 就是空字串。
  
  - length 是字串物件的屬性，用來得知字串的長度。
  
    ```javascript
    var mystring = "Hello, !";
    document.write(mystring.length);
    ```

  - 逸出字元:
    |Escape 逸出字元|    說明   ||
    |--------------|:----------|:----------------|
    | \b           | Backspace | 倒退             |
    | \f           | FF        | Form Feed(換頁)  |
    | \n           | LF        | Line Feed(換行)  |
    | \r           | CR        |Enter鍵，游標回行首|
    | \t           | Tab 鍵    |   水平定位        |
    | \'           | 「'」符號  |    單引號        |
    | \"           | 「"」符號  |    雙引號        |
    | \\           | 「\」符號  |    反斜線        |
  
- boolean(布林)
  只有兩種值，true(1) 跟 false(0)。 任何值都可以被轉換成不林值。

  1. false、0、空字串、NaN、null、undefined 都會轉成 false。
  2. 其他的值都會成為 true。
  3. 可以用 Boolean() 函數來將值轉換成布林值，例如:

     ```javascript
     console.log(Boolean(0));    //false
     console.log(Boolean(123));  //true
     console.log(Boolean(""));   //false
     console.log(Boolean(1));    //true
     ```

- object(物件)
  除了原型型別(number、string、boolean、undefined)，其他可以歸類到物件型別(Object)，像是
function、Object、Array、Date等。例如:
  {age: '17'}  物件
  [1,2,3]      陣列
  function(){} 函數
  new Data()   日期

- array(陣列)
- null(空值)
  若想要將某個變數的值清除，就可以指定該變數的值為 null。 例如:
  
  ```javascript
  var x=2;
  console.log(x); // 2
  x = null;
  console.log(x); // null
  console.log(x == null); //true
  ```

  **關於 undefined、null、NaN、infinity**
  
  1. null 與 undefined 同屬原生型別，使用 typeof() 來查詢型別時:
  
     ```javascript
     console.log(typeof(null));      // 得到 Object
     console.log(typeof(undefined)); // 得到 undefined
     ```

     是用運算子(\==)  比較 null 與 undefined 會得到 true。
     但是用運算子(\===) 比較 null 與 undefined 會得到 false。

     其實 null 不是 object(物件)，ECMAScript 曾想修護該 Bug,但考慮程式兼容，typeof(null) 仍會是 Object。

  2. NaN 表示無效的數字，會傳回 NaN 的兩狀況:
     - 進行運算時的運算元資料型別無法轉換為數字，如:

       ```javascript
       var x ="a";
       y = Number(x);
       console.log(y); //NaN
       ```

       Number() 是將物件轉為數值的函數，由於 x 是字串，無法轉為數字，因此印出y時就會顯示 NaN。

     - 無意義的運算，如: 0/0

       可以利用 isNan() 函數來檢查是否為 NaN，例如:

       ```javascript
       console.log(isNaN(-1));       //false
       console.log(isNaN('Hello'));  //true
       ```
  
  3. Infinity 是數學的無限大，非 0 的數字除上0, 結果都是 infinity，例如:
     1/0 會傳會 Infinity、 -1/0 會傳回 -Infinity。
     利用 isFinity() 可以檢查是否為有限數字，例如:

     ```javascript
     console.log(isFinite(2/0)); //false
     console.log(isFinite(2/2)); //true
     ```

  4. JavaScipt 數值資料型態擁有一些特殊值的字串，通常是出現在數值資料型態發生錯誤:
     |     數值的特殊值字串         |    說明                      |
     |:---------------------------|:----------------|
     | NaN                        |Not a number,當算術運算式的運算結果是不正確資料時，如: 字串或 Undefined|
     | Positive Infinity          |數值太大超過正數值的範圍  |
     | Negative Infinity          |數值太大超過負數值的範圍  |
     | Positive and Negative 0    |JavaScript用來區分+0和-0|

- Undifined(未定義)
  指變數沒有宣告，或者是有宣告變數，但尚未指定變數的值。例如:

  ```javascript
  var x;
  console.log(x);  //Undefined
  ```

  可以使用 typeof 關鍵字來判斷變數型態是否為 undefined。 例如:

  ```javascript
  var x;
  console.log(typeof x === "undefined");  //true
  ```

  >三個等號(===) 是嚴格相等，用來比較兩邊是否相等。

- Symbol(符號)
  Symbol 是 ES6(ECMAScript 6) 新定義的原生資料型態，Symbol 類型的值透過 Symbol() 函數來產生，Symbol() 函數有一個 description 屬性，用來定義 Symbol 的名稱，傳回的值是唯一的識別值。例如:

  ```javascript
  var x = Symbol('s');
  var y = Symbol('s');
  document.write(x===y); //false
  ```

  >由於 Symbol() 每次傳回的符號值都是唯一的，因此 x 與 y 比較是否相等就會傳回 false(否)。

#### 變數宣告

JavaScript 會在變數宣告與使用動態配置記憶體，並且具有回收記憶體的機制(garbage collection, 簡稱GC)，但GC 機制無法由JavaScript 程式來控制，而是一段時間自動尋找不需要的物件，釋放記憶體。以變數來說，當記憶體的作用範圍結束，就不需要使用了，這時GC 就會將記憶體釋放。

##### 變數宣告的方式

- 宣告變數

  ```javascript
  var name;
  ```

- 宣告多個變數
  
  ```javascript
  var name, score;
  ```

- 宣告變數並初始化
  
  ```javascript
  var name="Eileen", score=25, flag="true";
  ```

  變數宣告時並不需要加上型別，JavaScript 會視需求自動轉換變數型態，例如:

  ```javascript
  var thisValue;
  thisValue = 123;    //變數 thisValue 的內容為數值 123
  thisValue ="Hello"; //變數 thisValue 的內容為字串 Hello
  ```

  >底下幾種數值與字串轉換的情況，需特別注意:
  >(1). JavaScript 允許字串相加，當字串內容為數值時，使用 + 號相連接，運算結果，仍然為字串。
  >(2). 當字串內容為數值，使用減、乘、除號相連接，運算結果為數值。
  >(3). null 乘以任何數值皆為零。

  範例:

  ```javascript
  <script>
  var x="5", y="3", z="1", w=null;
  a = x+y+z;  //字串內容為數值時，相加仍是字串。 531
  b=x-y-z;    //字串內容為數值時，相減為數值。  1
  c = w * 55; //變數值為null,乘以任何數值為零。 0
  console.log("x+y+z=", a);
  console.log("x-y-z=", b);
  console.log("w*55", c);
  <script>
  ```

  使用 var、let(ES6 新增)、const(ES6 新增) 定義變數。

##### 變數名稱的限制

JavaScript 雖然是較寬鬆的語法，不過變數名稱還是有些規則是必須遵守的:

1. 第一個字母須是字母(大小寫均可)或是底線，之後的字元可以是數字、字母或底線。
2. 區分大小寫，`var ABC` 並不等於 `var abc`。
3. 變數名稱不能用  javaScript
的保留字，所謂保留字是指程式開發時已定義好的詞庫，每一識別字都有特別的意義，所以程式設計者不可以重複賦予不同的用途。

   abstract | boolean  |  break     |    bye   |   case   |
   ---------|:--------:|-----------:|:--------:|:--------:|
   catch    | char     |  class     |  const   | continue |
   default  | do       |  double    |  else    | extends  |
   false    | final    | finally    |  float   | for      |
   function | goto     |    if      |implements| import   |
   in       |instanceof|   int      |interface | long     |
   native   | new      |  null      | package  | private  |
   protected| public   |  return    |  short   | static   |
   super    | switch   |synchronized|  this    | throw    |
   throws   |transient |   true     |  try     | var      |
   void     | while    |   with     |          |          |

### 資料型態的轉換

#### 資料型態強制轉換

- 因為 JavaScript 是一種鬆散型態的程式語言，所謂變數的資料型態是指變數值的資料型態。
- JavaScript 具有自動轉換資料型別的特性，是優點(撰寫程式更靈活有彈性)也是缺點(造成困惱)，例如:

  ```javascript
  let x=3; y='5';
  let z = x+y;
  console.log("x+y=",z);  // 35
  console.log(typeof z);  // string
  ```

  >依照前面所提， 上式 JS 相加為兩變數做相串，可以判斷得到 z = "35"。

  ```javascript
  function billing(x, y){
    let z = x+y;
    return z;
  }
  billing(3, '5');
  ```

  **結果**: 35
  上述 `billing(x,y)` 乃一計費的程式，若沒注意輸入資料型別，得到的值將很離譜。例如: `billing(3,'5')`。

  >為避免諸如此類問題，可以先檢查傳入的引數是否為數字，例如:

  ```javascript
  function billing(x, y){
    if(typeof(x) === "number" && typeof(y)==="number"){
      let z = x+y;
      return z;
    }else return false
  }
  billing(3, '5');
  ```

#### 資料型態的轉換函式(內建強制轉換型別)

- parseInt(): 將字串轉為整數

  ```javascript
  a = parseInt("32");      //  a = 32
  b = parseInt("55.87");   //  a = 55
  c = parseInt("3天");     //  c = 3
  d = parseInt("page 2");  //  d = NaN
  ```

- parseFloat: 將字串轉為浮點數

  ```javascript
  a = parseFloat("35.345");  // a = 35.345
  b = parseFloat("55.87");   // b = 55.87
  ```

- Number(): 將物件或字串轉為數值

  ```javascript
  a = Number("10a");        //  a=NaN
  b = Number("11.5");       //  b = 11.5
  c = Number(true);         //  c = 1
  d = Number(new Date());   //  d = 1553671784021(傳回1970/1/1至今的毫秒數)
  ```

   > <font color='red'>Date 物件</font>是以世界標準時間(UTC)1970年1月1日的毫秒數值來儲存時間，因此使用
   Number()將  Date 物件轉換為數值就會得到 1970年1月1日到程式執行當下的時間。

- eval()
  將運算式的字串參數當作運算式，函數可以傳回運算式的計算結果。

  ```javascript
  eval("20 + 4 * 5");        //  40   算數運算式
  eval("intBalance = 1000"); //  1000 指定敘述
  eval("5>4");               //  true 邏輯或比較運算式

#### 變數作用範圍

變數依照**作用範圍**分為全域變數與區域變數。
區域變數乃指變數只能存活在一個特定區域範圍，像是一個函數，該變數只能在函數內使用，但全域變數是存活在整個程式，

1. 使用 var 宣告變數: 變數的可用範圍(scope) 以<font color='red'>函式區塊</font>為分界線，及函數外用 var 宣告的變數都是全域變數。

   舉例:

   - Case1: 沒有函數，所以全部範圍都屬於同一個 scope，for(){} 外面與裡面的i 指同一個i。

     ```javascript
     for(var i=0;i<3;i++){
       console.log(i);
     }
     console.log(i);  //印出 3
     ```

   - Case2: for() 裡面的 i 在函式內，整個函式是一個scope，外面部分的 console.log(i) 又屬於另一個 scope。

     ```javascript
     function test(){
       for(var i=0;i<3;i++){
         console.log(i);
       }
     }
     console.log(i); // <font color='red'>錯誤，找不到變數 i </font>
     ```

2. 使用 `let` 宣告變數: 變數的可用範圍(scope) <font color='red'>以程式區塊(即大括號)</font>為分界線。

   >for ()<font color='red'>{}</font>,與 if ()<font color='red'>{}</font>、 function test<font
color='red'>{}</font> 都算。

   - Case1: or(){} 是一個 scope，外面的 console.log(i) 又是另一個 scope。

     ```javascript
     for(let i=0;i<3;i++){
       console.log(i);
     }
     console.log(i);  //錯誤，找不到變數i
     ```  

   - Case2: `let` 是一個更嚴格 scope 的概念，包括 `function`、`for`、`if` 都是一個獨立的 scope。

     ```javascript
     function test(){
       for(let i=0;i<3;i++){
         console.log(i);
       }
     }
     console.log(i);  //錯誤，找不到變數i
     ```

3. 使用 `const` 宣告常數: 常數的資料 <font color='red'>不能變動</font>。

   例:

   ```javascript
   var v=3;
   v = "Hello World "; // 變數中的資料可變動

   let i;              //宣告變數，可以暫時不給資料
   i =0;               //變數中的資料可變動

   const x;            //錯誤:常數宣告時，一定要給資料

   const c=100;        //正確，宣告常數，同時給定資料
   c=50;               //錯誤:不能更動常數中的資料
   ```

#### 變數存在與否

- 使用 if(變數名稱) 判斷變數存在與否。
  
  ```js
  if(strName)
    document.write('strName 存在' + "<br />")
  else
    document.write('strName 不存在' + "<br />")    
  ```

- 使用 windows 物件的屬性。

  ```js
  if(window.strName)
    document.write('strName 存在' + window.strName + "<br />")
  else
    document.write('strName 不存在' + window.strName + "<br />")    
  ```

- 範例:

  ```javascript
  <script>
  // 變數宣告
  var strName = "陳會安";
  // 檢查變數是否存在
  if (window.strName)
     document.write("strName存在:" + window.strName + "<br/>");
  else
     document.write("strName不存在:" + window.strName + "<br/>");
  // 一個不存在的變數
  if (window.intBalance)
     document.write("intBalance存在:" + window.intBalance + "<br/>");
  else
     document.write("intBalance不存在:" + window.intBalance + "<br/>");
  </script> 
  ```

>上述 if 條件不論變數是否宣告，都可以檢查變數是否存在，不過，此 if 條件的程式碼並不適用**布林資料**型態的變數檢查。

### 運算式與運算子

#### 運算式

運算子和運算元的組合稱為運算式。例如: 1+2=3, 其中的『+』 是運算子，1和2是運算元。

**JavaScript 運算式分四種如下**:

- 指定運算式
  如: =、+=、-=、*=、/=、%=..等。
  
  ```javascript
  a=3;
  ```

- 算術運算式
  由常數、變數、函式、括號、運算子(+、-、*、/、)所組成的式子。例如:

  ```javascript
  a+b;
  a++;
  (a+b)%10;
  a-8*b/c;
  ```

- 字串運算式
  兩個以上的字串利用『+』號可以組合成一個新的字串，例如:
  
  ```javascript
  "Hello!!" + "World "; //輸出結果: "Hello!!World"
  ```

  若運算式中同時含有數值與字串，則數值會自動轉換為字串。例如:

  ```javascript
  let a="我今年", b=18, c=" 歲"; 
  d= a+ b +c; //輸出結果 d= 我今年18 歲
  ```

- 布林運算式
  布林運算式通常搭配邏輯運算子(&&)來比較兩個運算式(expression)，寫法如下:

  ```javascript
  x=10;
  y=10;
  (x>25) && (y>10); //輸出結果: false
  ```

#### 運算子  

- 指定運算子
  將指定運算子右方的值指定給左方的變數，最常用的就是等號(=)。

  |指定運算子| 範例 | 說明                  |
  |:---------|:---- |:----------------------|  
  |=         | a=b  | 將 b 的值指定給 a     |
  |+=        | a+=b | a = a+b               |
  |-=        | a-=b | a = a-b               |
  |\*=       | a*=b | a = a*b               |
  |/=        | a/=b | a = a/b               |
  |%=        | a%=b | a = a%b  (% 為取餘數) |

- 算術運算子
  算術運算子就是一些基本的四則運匴，包括加、減、乘、除、以及取餘數等等。為了讓運算式更精簡，運算常用到的增量運算，例如:
a=a+1； 可以用 a++ 來表示，下表為常用的算術運算子:

  |算術運算子| 範例  | 說明
  |:---------|:------|:---|  
  |+         | a=b+c |  加|
  |-         | a=b-c |  減|
  |\*        | a=b*c |  乘|
  |/         | a=b/c |  除|
  |%         | a=b%c | 取餘數|
  |++        | a++   | 相當於 a=a+1|
  |--        | a--   | 相當於 a=a-1|
  |++a       |       | 運算前增量|
  |a++       |       | 運算後增量|
  |--a       |       | 運算前減量|
  |a--       |       | 運算後減量|

- 比較運算子
  比較運算子通常用於比較兩個運算元或運算式之間的大小關係，當關係成立時結果為true(1)，關係不成立時則未false(0)，下表詳列常用的比較運算子。

  |比較運算子 | 範例    |結果a=5|說明 |
  |:----------|:--------|:------|:----|  
  |==         | a == 10 | false |等於 |
  |!=         | a != 10 | false |不等於|
  |>          | a  > 10 | false |大於|
  |>=         | a >= 10 | false |大於或等於|
  |<          | a <  10 | true  |小於|
  |<=         | a <= 10 | false |小於或等於|
  
- 邏輯運算子
  邏輯運算子多數用來檢查條件是否符合，下表詳列常用的邏輯運算子。

  | 邏輯運算子| 範例     |說明  |
  | :---------|:---------|:-----|  
  |&&         | a && b   | and(只有a與b兩方都為真，結果才為真)|
  |\|\|       | a \|\| b | or(只要a與b一方為真，結果就為真)|
  !           | !a       | Not(只要不符合a者，皆為真)|
  
#### 運算子優先順序

- 當程式執行時，擁有較高優先順序的運算子會在擁有較低的運算子之前執行。例如，乘法會比加法先被執行。

  下表列出 JavaScript 運算子的優先順序，由高優先順位排到最低順位。

  |功能             | 運算子    |
  |:----------------|:----------|
  |刮號             | []、()    |  
  |變數、增量、減量 | ++、--、~ |  
  |乘除法           | *、/、%   |
  |加減法           | +、-      |
  |位移             | <<、>>    |
  |比較             | <、<=、>、>=|
  |等值、不等值     | ==、!=      |
  |位元邏輯         | &           |
  |位元互斥邏輯     | ^           |
  |位元邏輯         | \|          |
  |且               | &&          |
  |或               |  \|\|       |
  |三項運算子       | ?:          |
  |算數             |  =          |

## 程式控制結構

結構化程式設計一定包含循序、選擇、重覆三種結構，分別敘述如下:

### 1. 循序

程式循序的，由上至下執行。

### 2. 選擇

#### 2.1 單選

- if(條件式) else
  
  ```javascript
  if ( score >= 60) console.log('及格')
  ```
  
#### 2.2 複選

- if(條件式)...else
  
  ```javascript
  if ( score >= 60) console.log('及格') else console.log('不及格')
  ```

#### 2.3 多選

- if(條件式)...else if(條件式)...else if(條件式)...else
  
  ```javascript
  let y = prompt("input a number: 1 - 100", "");            
  if (y >= 90)                                              
    console.log("優等");                                  
  else if (y >= 80 && y < 90)                               
    console.log("甲等");                                  
  else if (y >= 70 && y < 80)                               
    console.log("乙等");                                  
  else if (y >= 60 && y < 70)                               
    console.log("丙等");                                  
  else                                                      
    console.log("不及格");                                  
  ```

  > 2 個以上條件以上，須注意:
    比大於時，順序要  大 → 小。
    比小於時，順序要  小 → 大。

- switch...case

  ```javascript
         
  let z = prompt("input a number: 1 - 100", "");
  switch (true) {
    case (z >= 90):
      console.log("優等");
      break;
    case (z >= 80 && z < 90):
      console.log("甲等");
      break;
    case (z >= 70 && z < 80):
      console.log("乙等");
      break;
    case (z >= 60 && z < 70):
      console.log("丙等");
      break;
    default:
      console.log("不及格");
      break;
  }  
  ```

  > 針對某一值的處理用  SWITCH(),  比大小通常用 if 來判斷處理。
  
### 3. 重覆

- for
  
  ```js
  let i;
  for (i = 1; i <= 5; i++) {
    document.write("整數: " + i + "<br/>");
    intSum += i;
  }

- for/in    主要是在顯示物件的所有屬性

  ```js  
  for (prop in objAddress) {
    document.write("屬性: " + prop + "=" + objAddress[prop] + "<br/>");
  }

- while(條件){敘述 ...}       **前測迴圈**

  ```js
  while(i <= 6) {
    document.write("整數: " + i + "<br/>");
    intSum += i;
    i++;
  }

- do{ 敘述 .. }while(條件);   **後測迴圈**

- break & continue
  - break
    當某些條件成立時，強迫終止迴圈的執行，如同 switch 條件使用 `break` 關鍵字跳出程式區塊。

    ```js
    if (number == null || number == target)
      break;
    ```

  - continue
    可以馬上繼續下一次迴圈的執行，不過，它並不會執行程式區塊中位在 `continue` 關鍵字之後的程式碼，如果使用 for 或 for/in 迴圈，一樣也會自動更新計數器變數。

    ```js
    if (number != target){
      document.write(number + "太小<br/>");
      continue
    }
    ```

  - 範例

    ```js
    <script>
    // 變數宣告
    var target = 36;
    var number = 0;
    var times = 0;
    // 無窮迴圈
    do {
        number = window.prompt("輸入數字", number);
        // 離開無窮迴圈
        if (number == null || number == target)
            break;
        // 判斷是太大或太小
        if (number > target) {
            alert(number + "太大!");
            times++;
            continue;
        }
        else
            if (number != target) {
                alert(number + "太小!");
                times++
                continue;
            }          
    } while (true);
    if (number == null)
       document.write("不猜了! 答案為: " + target + "<br/>");
    else {
       document.write("猜對了! 答案為: " + target + "<br/>"); 
       document.write("共猜了: " + (times+1) + "次<br/>"); 
    }  
    ```

### 4. JavaScript 的雀狀迴圈

- 指迴圈中在擁有其它迴圈。例如:

  ```javascript
  for(i=1;i<=9;i++){
    ....
    j=1;
    while(j < 9){
      ....
      j++;
    }
  }
  ```

- 範例

  ```js
  <script>
  document.write("<table border='1'>");
  // 變數宣告
  var i, j;
  // 表格的標題列
  document.write("<tr><td></td>");
  for (i=1;i<=9;i++)
    document.write("<td><b>" + i + "</b></td>");
  document.write("<tr>");
  // 巢狀迴圈
  for (i=1;i<=9;i++) {
    document.write("<tr>");
    document.write("<td><b>" + i + "</b></td>");
    j = 1;
    while (j <= 9) { // 內層迴圈
       document.write("<td>");
       document.write(i + "*" + j + "=" + i*j);
       document.write("</td>");
       j++;
    }
    document.write("</tr>");
  }
  document.write("</table>");
  </script>
  ```

## JavaScript 函數與物件

### 1. JavaScript 的函數

- 事實上，JavaScript 資料型態都是一種物件，函數也是，而且函數可以視為一種 JavaScript 的「全域方法」。
- 函式無傳回值時, 稱為 「程序」。
- 「函數呼叫」: 指 JS 中執行函數。

#### 1.1 JavaScript 的內建函數

- escape()
  - 使用 URL 編碼傳入的參數字串，可以傳回加碼後的字串。
  - 字串編碼, 返回以 ISO Latin 字元集來表示參數的16進制編碼。

  ```js
  strMsg = "A";
  strURLcode = escape(strMsg);
  ```

- unescape()
  - 解碼參數的 URL 編碼字串，可以傳回還原成編碼前的原始字串。
  - 字串解碼, 把指定的16進制編碼值返回一個ASCII 字串。

  ```js
  strOriginal  = unescape(strURLcode);
  ```

  - 範例

    ```js
    <script>
    // 變數宣告
    var strMsg = "JavaScript+jQuery+Node.js網頁設計"; 
    var strURLcode, strOriginal;
    strURLcode = escape(strMsg);  // 進行加碼
    document.write("原始字串 : " + strMsg + "<br/>");
    document.write("URL編碼 : " + strURLcode + "<br/>");
    strOriginal = unescape(strURLcode); // 還原字串
    document.write("還原的字串 : " + strOriginal + "<br/>");
    </script>
    ```

- isNaN()
  檢查其參數是否是非數值, 若為非數字回傳 true。

   ```javascript
   isNaN(12);  // false 
   ```

#### 1.2 JavaScript 的自訂函數

JavaScript 函數是由 function 關鍵字、函數名稱和程式區塊組成，

##### 1.2.1 沒有參數的 JavaScript

- 格式  

  ```js
  function 函數名稱()
  {
    JavaScript 敘述
  }
  ```

- 範例

  ```js
  <script>
   function writeString(){
     document.write("歡迎使用JavaScript!<br/>");
   }
  </script>
  </head>
  <body>
   <h2>使用函數顯示文件內容</h2>
   <hr/>
  <script>
   // 呼叫函數
   writeString();
  </script>
  ```

##### 1.2.2 有參數的 JavaScript

- 格式  
  
  ```javascript
  function 函數名稱(傳入參數1, 傳入參數2, …)
  {
    JavaScript 敘述
  }
  ```
  
- 範例

  ```js
  <script>
   function writeNString(strMsg, intnumber) {
    for(var i=1; i<=intnumber; i++) {
      document.write(strMsg + "<br/>");
    }
   }
  </script>
  </head>
  <body>
  <h2>使用函數參數顯示網頁內容</h2>
  <hr/>
  <script>
  // 呼叫函數
  writeNString("JavaScript網頁程式設計", 3);
  </script>
  ```

##### 1.2.3 JavaScript 函數的傳回值

- 格式  

  ```js
  function 函數名稱(傳入參數1, 傳入參數2, …)
  {
    JavaScript 敘述
    return 傳回值
  }
  ```

- 範例

  ```js
  <script>
   // 加到N的總和
   function sumToN(intNumber) {
    var intSum = 0; 
    for(var i=1; i<=intNumber; i++) {
      intSum += i;
    }
    return intSum;
   }
  </script>
  </head>
  <body>
  <h2>函數的傳回值</h2>
  <hr/>
  <script>
   var intSum = sumToN(10);
   document.write("1加到10的值 : " + intSum + "<br/>");
  </script>
  ```

##### 1.2.4 JavaScript 函數的傳值或傳址參數

- 傳值: 將變數值傳入函數，函數會另外配置記憶體空間來儲存參數值，所以不會變更原始的變數值
- 傳址: 將變數實際儲存的記憶體位址傳入，如果在函數中變更參數值，也會同時變動原始的變數值
  <br>
  依據不同資料型態擁有不同的預設傳遞方式（比較操作指的是2個不同資料型態變數之間的比較）

  |        資料型態        | 方式 | 說明                        |
  |:----------------------|:----|:----------------------------|  
  |數值, 字串和布林         |傳值 |參數傳遞和比較操作都是使用傳值方式|
  |物件, 陣列和函數         |傳址 |參數傳遞和比較操作都是使用傳址方式|
  |字串物件                | 傳址|參數傳遞和比較操作都是使用傳址方式|

  >注意! 上表的**字串資料型態**和**字串物件**不同，字串資料型態是宣告變數且指定變數值為字串，如下所示:

  ```javascript
  var a = "張振三";  //字串
  ```

  若是字串物件需要使用 new 運算子建立物件，如下所示:

  ```javascript
  var obja = new String("張振三");  //字串物件
  ```
  
  兩個字串物件 obja 進行比較時，使用的是**傳址**方式，如下所示: 雖然字串物件的內容相同，但是其比較結果仍能然為 false。

  ```javascript
  var objb = new String("張振三"); //字串物件
  document.write((obja == objb) + "<br />"); // 比較結果為 false
  ```
  
  如果比較時任一變數為**字串資料型態**，使用的就是**傳值**方式，如下所示: 其比較結果為 true。

  ```javascript
  document.write((a==obja) + "<br />"); // 比較結果為 true
  ```

  上述程式碼比較前面的字串變數 a 和 obja, 其中變數 a 為字串變數，使用的是傳值，因為字串內容相同，所以比較結果為 true。
  <br />

  如果 2 個 Array 物件進行比較，就算兩個陣列都擁有相同的元素，也永遠不會相等，如下所示:

  ```javascript
  var arra = new Array("a","b","c"); // 建立陣列 a
  var arrb = new Array("a","b","c"); // 建立陣列 b
  document.write((arra==arrb) + "<br.>"); // 結果為 false
  document.write((arra.toString() == arrb.toString()) + "<br.>"); // 結果為 true
  ```

  比較兩陣列使用傳址方式，所以結果為 false, 如果需要檢查兩個陣列元素內容是否相同，請使用 toString() 方法，此時的結果為 true。

  如果將物件和陣列傳入函數，雖然使用的是傳址方式，但是在函數中的程式碼只能更改物件屬性和陣列元素，並不能更改物件或陣列本身。
  
- 範例:

  ```javascript
  <script>
  // number和boolean參數為傳值
  function funcA(c, b){
     c++;
     b = false;
     document.write("在funcA為 :"+c+"/"+b+"<br/>");
  }
  // object為傳址和字串參數為傳值
  function funcB(objA, a){
     objA.name = "江小魚";
     a = "陳允傑";
     document.write("在funcB為 : "+objA.name+"/"+a+"<br/>");
  }
  </script>
  </head>
  <body>
  <h2>測試傳值和傳址的函數呼叫</h2>
  <hr/>
  <script>
  // 宣告變數
  var c = 1;        // 數值
  var b = true;     // 布林
  var a = "樟山";            // 字串
  var objA = new Object();  // 建立物件實例
  objA.name = "樟山";
  document.write("呼叫funcA前 : "+c+"/"+b+"<br/>");
  funcA(c,b);  // 呼叫函數
  document.write("呼叫funcA後 : "+c+"/"+b+"<br/>");
  document.write("呼叫funcB前 : "+objA.name+"/"+a+"<br/>");
  funcB(objA, a);  // 呼叫函數
  document.write("呼叫funcB後 : "+objA.name+"/"+a+"<br/>");  
  </script>
  ```

##### 1.2.5 JavaScript 函數的參數陣列

JavaScript 函數都擁有一個「參數陣列」物件，叫做 `arguments` 物件(即其他程式語言的不定長度參數列)。
當呼叫函數傳入參數時，函數就算沒有指明參數名稱，一樣可以使用參數陣列的物件取得參數個數和個別參數值，例如: 函數 `sumInt()` 沒有任何參數，如下所示:

- 例:

  ```javascript
  function sumInt(){
   ....
  }
  ```

上述函數 `sumInt()` 雖沒有任何參數，不過還是可以在呼叫時傳遞參數，如下所示:

- 例:

  ```javascript
  sumInt(100,45,567,234)
  ```

  上述程式碼在呼叫 `sumInt()` 函數時共傳入 4 個參數，在函數中可以使用 `arguments` 物件的 `length` 屬性
  取得傳遞多少個參數，如下所示:

- 例:

  ```javascript
  sumInt.arguments.length; //取出參數陣列長度
  sumInt.arguments[0];  //取值
  sumInt.arguments[1];  //取值
  sumInt.arguments[2];  //取值
  sumInt.arguments[3];  //取值
  ```

- 範例:

  ```javascript
  <script>
  // 使用參數陣列取得傳遞的參數
  function sumInt() {
     var sum = 0;
     // 取得傳遞的所有參數
     for(var i=0; i<sumInt.arguments.length; i++) {
       sum += sumInt.arguments[i];
     }
     return sum;
  }
  </script>
  </head>
  <body>
  <h2>函數的參數陣列</h2>
  <hr/>
  <script>
  // 宣告變數
  var sum = 0;
  sum = sumInt(100,45,567,234);
  document.write("函數sumInt(100,45,567,234): "+sum+"<br/>");  
  </script>
  ```

### 2. JavaScript 函數的變數範圍

JavaScript 變數範圍會影響程式碼的變數存取，在 JS 擁有兩種變數範圍:

- 區域變數(Local Variable)
  在函數內宣告的變數，變數只能在函數程式區塊知終使用，函數之外的程式碼並無法存取此變數。

- 全域變數(Global Variable)
  如果變數是在函式外宣告，整個 JavaScript 程式檔的函數和程式碼都可以存取此變數。

  >JavaScript 不支援**區塊函數**範圍，也就是說在條件或迴圈程式區塊中宣告的變數，在宣告之後的程式區塊之外也可以存取此變數，並不是只有在程式區塊中才能存取此變數，如下範例。

  ```javascript
  <script>
  // 宣告全域變數
  var a = 1;
  var b = 2;
  // 函數A
  function funcA(){
    // 宣告區域變數
    var a = 3;  // 設定區域變數
    var b = 4;  // 設定區域變數
  }
  // 函數B
  function funcB(){
    a = 3;   // 設定全域變數
    b = 4;   // 設定全域變數
  }
  </script>
  </head>
  <body>
  <h2>測試程序函數的變數範圍</h2>
  <hr/>
  全域變數 a, b<br/>
  funcA宣告區域變數 a, b<br/>
  funcB沒有宣告任何的區域變數<br/><br/>
  <script>
  document.write("<table border='1'>");
  document.write("<tr>");
  document.write("<td>執行過程</td><td>全域變數a值</td><td>全域變數b值</td>");
  document.write("</tr>");
  document.write("<tr><td>初始值</td><td>" + a + "</td>");
  document.write("<td>" + b + "</td></tr>");
  funcA();  // 呼叫funcA
  document.write("<tr><td>呼叫funcA後</td><td>" + a + "</td>");
  document.write("<td>" + b + "</td></tr>");
  funcB();  // 呼叫funcB
  document.write("<tr><td>呼叫funcB後</td><td>" + a + "</td>");
  document.write("<td>" + b + "</td></tr>"); 
  document.write("</table>"); 
  ```

### 3 JavaScript 的物件

JavaScript 是一種原型基礎的物件導向程式語言，支援三種特性。

#### 3.1 物件導向

- 封裝(Encapsulation)
  將資料和函數建立成物件，簡單說，物件是資料和處理資料函數(方法)組合成的黑盒子。

  物件導向程式語言中定義物件是使用「類別」，及建立一個抽象資料型態，但 JS 無類別，可以使用建構函數來建立物件。

- 繼承(inheritance)
  繼承是物件再利用，當定義一個類別後，其他類別可以繼承此類別的屬性和方法，並且新增或取代繼承物件的屬性和方法來擴充其功能，  JavaScript 使用 `Prototype` 物件來實作繼承。

- 多型(Polymorphism)
  乃最複查特性，類別如果需要處理各種不同資料型態，我們並不需要針對不同資料型態建立多個類別，只需繼承基礎資料型態的類別，擴充此類別建立同名方法來處理各種不同資料型態，因為方法的名稱相同，只是參數和程式碼不同，所以也稱**同名異式**。

#### 3.2 物件、屬性、方法

- 物件(Object)
  是`資料`和`處理資料函數`的綜合體，不用考慮物件內部的處理方式，只需將它視為一個黑盒子，知道物件提供
  那些屬性(資料)和方法(處理資料的函數)，和如何使用這些屬性和方法即可。

  事實上，JavaScript 物件只是名稱和值成對的集合，即『物件文字值』(Object Literals),可以使用一對大括號包圍成對屬性名稱和屬性值來建立物件，如下所示:

  ```javascript
  var objStudent = {
    name: '張深',
    age: 5
  };
  ```

  JavaScript 也可以使用 new 運算子加上建構函數來建立物件，相當於其他物件導向程式語言的「實例」(Instance)，如下所示:

  ```javascript
  var objCard = new Object();
  ```
  
  上述 Object() 為 JavaScript 內建的物件建構函數，或稱為類別的建構子，當然也可以自行建立物件的建構函數，但它不是類別。

  ```javascript
  function objCard(){
    敘述式;
  }

  objCard Card = new objCard();
  ```

- 屬性(Properties)
  物件屬性可以存取物件儲存的資料，例如: String 物件的 String.lengt 屬性，可以取得字串長度。
  存取物件屬性式使用 「.」運算子，基本語法如下:

  ```javascript
  objName.propertyName;
  ```

- 方法(Method)
  Javacript 物件的方法是用來處理儲存資料的函數，例如: String 物件擁有 String.sustr() 方法，其處理
  的就是字串物件的內容。物件方法的基本語法，如下所示:

  ```javascript
  objName.methodName();
  ```

#### 3.3 支援的物件

- 內建物件(Intrinsic)
  11 種內建物件 Array、Boolean、Date、Function、Global、Math、Number、Object、RegExp、Error、String 物件。

- 自訂物件(Custome Objects)

  JavaScript 能夠建立使用者自訂的物件，擴充 JavaScript 的功能。

- 宿主物件(Host Objects)
  宿主物件是指 JavaScript 執行環境提供的物件，以瀏覽器的執行環境來說，就是 DOM(Document Object Model),這是一個階層架構的物件模型。

### 4 自訂 JavaScript 的物件

JavaScript 能夠自訂物件來擴充 JavaScript 的功能，不只如此，JavaScript 還能提供擴充 JavaScript 內建物件，新增內建物件的屬性或方法。

#### 4.1 使用 Object 物件建立自訂物件

在 JavaScript 可以直接建立 Object 後，新增所需的屬性和方法，如下所示:

- 例:

  ```javascript
  //使用 new Object 建立新物件
  var objCard = new Object();
  //新增物件的屬性
  objCard.name = "張三";
  objCard.age = 20;
  objCard.phone = "02-2222222";
  objCard.email = "nchysan@ms2.hinet.net"
  ```
  
  上述程式碼的物件屬性名稱是自行定義，自訂物件 objCard 擁有屬性 name、age、phone、email。也可以使用
  物件文字值(Object Literal) 來建立物件，如下:

- 例:

  ```javascript
  var objCard = {
   name : "張三";
   age  : 20;
   phone : "02-2222222";
   email : "nchysan@ms2.hinet.net"
  ```

  上述大括號中是屬性名稱和值(即鍵和值)的集合。

- 範例:

  ```html
  <h2>使用Object物件建立自訂物件</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objCard = new Object();
  // 新增物件屬性
  objCard.name = "陳會安";
  objCard.age = 42;
  objCard.phone = "02-22222222";
  objCard.email = "hueyan@ms2.hinet.net";
  // 顯示物件屬性
  document.write("姓名 : " + objCard.name + "<br/>");
  document.write("年齡 : " + objCard.age + "<br/>");
  document.write("電話 : " + objCard.phone + "<br/>");
  document.write("郵件 : " + objCard.email + "<br/>");
  ```

#### 4.2 with 程式區塊

javascript 提供物件處理的相關程式敘述:`for/in` 和 `with`

- `for/in` 走訪和顯示物件的所有屬性。
- `with`   針對物件建立程式區塊，在程式區塊的程式碼不需要指名物件名稱，即可新增屬性和顯示屬性內容:
  
  ```javascript
  with(objCard){
    name = "陳會安";
    age = 42;
    phone = "02-22222222";
    email = "hueyan@ms2.hinet.net";
    document.write("姓名 : " + name + "<br />");
    document.write("年齡 : " + age  + "<br />");
  }
  ```
  
  上述程式碼是針對物件 `objCard` 運作，因為 `with` 程式區塊已經將 `objCard` 視為預設物件，所以在括號之中的程式碼就不用指出物件名稱，存取屬性也是直接使用屬性名稱即可。

  ```javascript
  <h2>with程式區塊</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objCard = new Object();
  with(objCard) {
     // 新增屬性
     name = "陳安";
     age = 42;
     phone = "02-22222222";
     email = "hueyan@ms2.hinet.net";
     // 顯示物件屬性
     document.write("姓名 : " + name + "<br/>");
     document.write("年齡 : " + age + "<br/>");
     document.write("電話 : " + phone + "<br/>");
     document.write("郵件 : " + email + "<br/>");
  }
  </script>
  ```

#### 4.3 使用建構函數來建立物件

「建構函數」是一個函數，能夠定義物件的屬性和方法，使用建構函數建立物件有兩個步驟:

- 步驟一  使用建構函式宣告物件
  建構函數的語法是一個 JavaScript 函數，在建構函數可以定義物件屬性和方法，可以視為一個物件宣告(但它並不是類別)，如下所示:

  ```javascript
  function name(name,age,phone,email){
    this.name = name;
    this.age  = age;
    this.phone = phone;
    this.email = email;
  }
  ```

  上述建構函數 nameCard() 擁有數個參數可以建立屬性值，`this` 關鍵字指的是建立的物件本身，上述函數定義物件擁有屬性 name、age、phone、email。

  this 關鍵字在建構函數中可以參考到物件本身，也就是建構函數準備建立的自訂物件，因為函數參數和屬性同名，所以使用 this 關鍵字表示是指定物件的屬性值，而不是函數的參數。

- 步驟二  使用 new 運算子建立物件
  在定義宣告物件的建構函數後，就可以使用 new 運算子建立物件，如下所示:

  ```javascript
  objCard = new nameCard("陳安", 42, "02-2222222", "chena@ms2.hinet.net"); 
  ```

  上述程式碼使用 new 運算子建立物件時，建構函數 nameCard() 傳入的參數就是物件的屬性值，如果在建立
  物件時沒有指定屬性值，一樣可以在建立後再指定物件的屬性值，如下所示:

  ```javascript
  objCard = new nameCard();
  objCard.name = "樟山";
  objCard.age =35;
  objCard.phone = "02-2222222";
  objCard.email = "chensan@ms2.hinet.net";
  ```

  範例:
  
  ```javascript
  <script>
  // 物件的建構函數
  function nameCard(name,age,phone,email) {
     this.name = name;
     this.age = age;
     this.phone = phone;
     this.email = email;
  }
  </script>
  </head>
  <body>
  <h2>使用建構函數建立物件</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objMyCard = new nameCard("陳會安", 42, 
                "02-22222222","hueyan@ms2.hinet.net");
  var objCard = new nameCard();  // 建立物件
  // 設定屬性
  objCard.name = "江小魚";
  objCard.age = 35;
  objCard.phone = "03-33333333";
  objCard.email = "hueyan@yahoo.com.tw";
  // 顯示objMyCard物件屬性
  document.write("姓名 : " + objMyCard.name + "<br/>");
  document.write("年齡 : " + objMyCard.age + "<br/>");
  document.write("電話 : " + objMyCard.phone + "<br/>");
  document.write("郵件 : " + objMyCard.email + "<br/><hr/>");
  // 顯示objCard物件屬性
  document.write("姓名 : " + objCard.name + "<br/>");
  document.write("年齡 : " + objCard.age + "<br/>");
  document.write("電話 : " + objCard.phone + "<br/>");
  document.write("郵件 : " + objCard.email + "<br/>");
  </script>
  ```

#### 4.4 物件的階層架構

javaScript 物件可以建立「物件階層架構」，因為物件屬性可以是另一個子物件，可以讓我們建立階層關係的物件架構，例如: nameCard 物件擁有子物件 phoneList, 這個子物件是用來儲存住家電話和手機電話號碼，如下所示:

- 範例:

  ```javascript
  function nameCard(name,age,phone,email){
   this.name = name;
   this.age=age;
   this.phone = new phoneList(phone, "N/A");
   this.email=email;
  }
  ```
  
  上述建構函數 nameCard() 的 phone 屬性建立另一個物件，它是使用 phone.List() 建構函數，如下所示:

  ```javascript
  function phoneList(homephpne, cellphone){
    this.homephone = homephone;
    this.cellphone = cellphone;
  }

  ```

  上述建構函數 phoneList() 擁有2個參數 homephone 和 callphone，在 nameCard() 參數只傳遞一個 phone 參數設定 homepage 屬性, cellphone 屬性值為 N/A, 如果需要設定手機電話號碼，如下所示:

  ```javascript
  objMyCard.phone.cellphone = "0901-66666";
  ```

  上述程式碼的 objMyCard 物件是使用 nameCard() 建構函數建立的物件，然後在 phone 物件的 cellphone 屬性指定手機電話號碼，很明顯的! 可以看出 cellphone 是 phone 子物件的屬性。

  換句話說，如果某一個人擁有2隻手機，雖然可以重新修改建構函數新增一個屬性，物件屬性能夠在 JavaScript 程式碼動態的新增，稱為「實例擴充」(Instance Extension)，不同於使用 `Prototype` 物件的「類別擴充」(Class Extension)。

  換句話說。只需替 objCard 物件新增一個屬性來儲存額外手機的電話號碼即可，如下所示:

  ```javascript
  objCard.cellphone = ""0900-77777;
  ```
  
  上述程式碼的 objCard 物件為 nameCard() 建立的物件，替這個物件新增 cellphone 屬性，它是專屬於 objCard 物件, 另一個物件 objMyCard 並沒有此屬性。

  此時 objCard 物件可以存取2個 callphone 屬性，一個是新增的 cellphone 屬性，另一個是存取子物件 phone 的 objCard.phone.cellphone 屬性。

- 範例:
  在 JavaScript 程式建立 2 個建構函數 nameCard() 和 phoneList(), 然後建立階層關係的自訂物件，如下所示:
  
  ```javascript
  <script>
  // 物件的建構函數
  function nameCard(name,age,phone,email) {
    this.name = name;
    this.age = age;
    this.phone = new phoneList(phone, "N/A");
    this.email = email;
  }
  // 物件的建構函數
  function phoneList(homephone,cellphone) {
    this.homephone = homephone;
    this.cellphone = cellphone;
  }
  </script>
  </head>
  <body>
  <h2>新增物件的子物件</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objMyCard = new nameCard("陳會安", 42,
                  "02-22222222","hueyan@ms2.hinet.net");
  // 設定手機電話號碼
  objMyCard.phone.cellphone = "0901-666666";
  var objCard = new nameCard("江小魚", 35, "03-33333333" ,
                           "hueyan@yahoo.com.tw");
  // 新增另一隻手機的屬性
  objCard.cellphone = "0900-777777";
  // 顯示objMyCard物件屬性
  document.write("姓名 : " + objMyCard.name + "<br/>");
  document.write("電話 : " + objMyCard.phone.homephone + "<br/>");
  document.write("手機1 : " + objMyCard.phone.cellphone + "<br/>");
  document.write("手機2 : " + objMyCard.cellphone + "<br/><hr/>");
  // 顯示objCard物件屬性
  document.write("姓名 : " + objCard.name + "<br/>");
  document.write("電話 : " + objCard.phone.homephone + "<br/>");
  document.write("手機1 : " + objCard.phone.cellphone + "<br/>");
  document.write("手機2 : " + objCard.cellphone + "<br/>");
  </script>
  ```

  上述結果依序顯示物件 objMyCard(上面)和 objCard(下面)的所有屬性值，電話和手機1是 phone 子物件的屬性 homepohne 和 cellphone  。

  手機2為 objCard 物件新增的 cellphone 屬性，此方法只能新增個別物件的專屬屬性，所以另一個 objMyCard 物件並沒有此屬性，顯示的值為 undefined。

#### 4.5 新增物件的方法

- 範例:
  之前顯示物件的屬性值，都是用 document.write() 方法，現在換另一種方式，可以新增 print() 方法顯示名片資料，如下所示:

  ```javascript
  function nameCard(name,age,phone,email){
    this.name=name;
    this.age=age;
    this.phone=phone;
    this.email=email;
    this.print=printCard;
  }
  ```

  上述建構函數 nameCard() 最後的 print 是一個方法，值 printCard 指向參考的 printCard() 函數，如下所示:

  ```javascript
  function printCard(){
    document.write("姓名 : " +  this.name + "<br/>");
    document.write("年齡 : " +  this.age + "<br/>");
    document.write("電話 : " +  this.phone + "<br/>");
    document.write("郵件 : " +  this.email + "<br/>");
    document.write("姓名 : " +  this.name + "<br/>");
  }
  ```

  上述函數是 nameCard 物件的方法，在函數中使用 this 關鍵字取得物件的屬性值。

- 範例:
  nameCard 物件新增 print() 方法，這個方法可以顯示物件屬性的名片資料:

  ```javascript
  <script>
  // 物件的建構函數
  function nameCard(name,age,phone,email) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.print = printCard;
  }
  // 物件方法
  function printCard() {
    document.write("姓名 : " + this.name + "<br/>");
    document.write("年齡 : " + this.age + "<br/>");
    document.write("電話 : " + this.phone + "<br/>");
    document.write("郵件 : " + this.email + "<br/><hr/>");
  }
  </script>
  </head>
  <body>
  <h2>新增物件方法</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objMyCard = new nameCard("陳會安", 42,
                  "02-22222222","hueyan@ms2.hinet.net");
  var objCard = new nameCard();  // 建立物件
  // 設定屬性
  objCard.name = "小魚";
  objCard.age = 35;
  objCard.phone = "03-33333333";
  objCard.email = "hueyan@yahoo.com.tw";
  // 顯示objMyCard物件屬性
  objMyCard.print();
  // 顯示objCard物件屬性
  objCard.print();
  </script>
  ```

  >**JavaScript 的靜態屬性和方法**
   JavaScript 也可以建立其他物件導向程式語言的**靜態屬性**和**方法**(即類別屬性和方法)，因為建構函數相當於是類別，且 JavaScript 函數就是物件，可以直接在建構函數新增靜態屬性，如下所示:

  ```javascript
  nameCard.belong = "王捷";
  ```

  上述程式碼是在 nameCard() 建構函數新增屬性，同樣的可以新增靜態方法:

  ```javascript
  nameCard.now = function(){
    return new Date();
  }
  ```

  上述程式碼新增 now() 方法傳回來現在的日期/時間。 因為是靜態屬性和方法，使用 nameCard() 物件名稱來存取此屬性和呼叫方法，如下所示:

  ```javascript
  document.write("名片簿屬於: " + nameCard.belong + "</br>");
  document.write("現在日期/時間: " + nameCard.());
  ```

- 完整範例:
  
  ```javascript
  <script>
  // 物件的建構函數
  function nameCard(name,age,phone,email) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.print = printCard;
  }
  // 物件方法
  function printCard() {
    document.write("姓名 : " + this.name + "<br/>");
    document.write("年齡 : " + this.age + "<br/>");
    document.write("電話 : " + this.phone + "<br/>");
    document.write("郵件 : " + this.email + "<br/><hr/>");
  }
  // 新增靜態屬性
  nameCard.belong = "陳允傑";
  // 新增靜態方法
  nameCard.now = function() {
    return new Date();
  };
  </script>
  </head>
  <body>
  <h2>新增物件方法</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objMyCard = new nameCard("陳會安", 42,
                  "02-22222222","hueyan@ms2.hinet.net");
  var objCard = new nameCard();  // 建立物件
  // 設定屬性
  objCard.name = "江小魚";
  objCard.age = 35;
  objCard.phone = "03-33333333";
  objCard.email = "hueyan@yahoo.com.tw";
  // 顯示objMyCard物件屬性
  objMyCard.print();
  // 顯示objCard物件屬性
  objCard.print();
  document.write("名片簿屬於: " + nameCard.belong + "<br/>");
  document.write("現在日期/時間: " + nameCard.now());
  </script>
  ```

### 5 Prototype 物件

JavaScript 支援 Prototype 物件，能夠新增物件的屬性或方法，讓我們實作 Prototype 物件的繼承。

#### 5.1 類別基礎和原型基礎程式語言

JavaScript 是一種「原型基礎」(Prototype-based) 程式語言，有別於 C++、Java 或 C# 的「類別基礎」(Class-based)程式語言。

- 類別基礎和原型基礎語言
  類別基礎程式語言的類別(Class)是一種抽象資料型態，它和物件實例(Instance)是不同的，��用類別的藍圖來建立物件實例；在**原型基礎**程式語言的類別和物件之�����，其分野並不明顯，類別事實上就是物件。
  <br>

  物件在原型基礎程式語言屬於一個實際的實體，可以使用現成的物件作為原型(Prototype)來建立其他物件，這個物件可以分享原型物件的屬性和方法，換句話說，就是使用 `Prototype` 物件來繼承其他物件。

- 物件的 prototype 屬性
  JavaScript 的每一個物件都擁有 prototype 屬性，這個屬性是一個 Prototype 物件，Prototype 物件的屬性會被所有物件所繼承，使用prototype 屬性的優點，如下:
  - 使用 prototype 屬性擴充物件可以大量減少物件使用的記憶體空間。
  - 不論是否已經建立物件，都可以使用 prototype 屬性來擴充物件的屬性和方法。
  
#### 5.2 新增 Prototype 物件的屬性

- JavaScript 的 prototype 屬性能夠擴充 JavaScript 內建物件或自訂物件的屬性，例如:在自訂物件circle 建立 PI 屬性，如下列所示:

  ```javascript
  circle.prototype.PI = 3.1415926;
  ```

不同於原型 function 中只能針對指定物件新增屬性，prototype 屬性在所有建立的物件都會新增 PI 屬性。

> 注意: JavaScript 只允許使用 new 運算子建立的物件使用 prototype 屬性，例如: String、Date 或 Array, 並不能使用在字串資料型態。

- 範例:
  建立 circle() 建構函數，然後使用 prototype 屬性新增 PI 屬性，如下所示:
  
  ```html
  <script>
  // 物件的建構函數
  function circle(r, color) {
    this.r = r;
    this.color = color;
    this.display = showCircle;
  }
  // 物件方法
  function showCircle() {
    document.write("半徑 : " + this.r + "<br/>");
    document.write("色彩 : " + this.color + "<br/>");
    document.write("圓周率 : " + this.PI + "<br/><hr/>");
  }
  </script>
  </head>
  <body>
  <h2>新增Prototype物件的屬性</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objCircle1 = new circle(2, "red");
  var objCircle2 = new circle(3, "green");
  // 新增Prototype物件的屬性
  circle.prototype.PI = 3.1415926;  
  // 執行物件方法
  objCircle1.display();
  // 執行物件方法
  objCircle2.display();
  </script>
  ```

#### 5.3 新增 Prototype 物件的方法

- 使用 prototype 屬性在上述範例新增 area() 方法，這個方法就是計算圓面積的 getArea() 函數，如下所示:

  ```javascript
  function gerArea(){
    var result = this.PI * this.r * this.r;
    document.write("圓面積 : " + result + "<br /><hr />");
  }
  ```

  上述函數是物件 circle 的方法，不過，這並不是在建構函數定義的方法，而是使用 prototype 屬性新增的方法，如下所示:

  ```js
  circle.prototype.area = getArea;
  ```

- 範例:
  擴充上述 `circle` 物件，使用 `prototype` 屬性新增 `area()` 方法，如下所示:

  ```js
  <script>
  // 物件的建構函數
  function circle(r, color) {
    this.r = r;
    this.color = color;
    this.display = showCircle;
  }
  // 物件方法
  function showCircle() {
    document.write("半徑 : " + this.r + "<br/>");
    document.write("色彩 : " + this.color + "<br/>");
    document.write("圓周率 : " + this.PI + "<br/><hr/>");
  }
  // 新增Prototype物件方法
  function getArea(){
    var result = this.PI * this.r * this.r;
    document.write("圓面積 : " + result + "<br/><hr/>");   
  }
  </script>
  </head>
  <body>
  <h2>新增Prototype物件的方法</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objCircle1 = new circle(2, "red");
  var objCircle2 = new circle(3, "green");
  // 新增Prototype物件的屬性
  circle.prototype.PI = 3.1415926;
  //新增Prototype物件的方法
  circle.prototype.area = getArea;  
  // 執行物件方法
  objCircle1.display();
  objCircle1.area();  // 執行Prototype方法
  // 執行物件方法
  objCircle2.display();
  objCircle2.area();  // 執行Prototype方法
  </script>
  ```

  上圖例顯示的圓面積是執行物件的 `area()` 方法，可以看到所有物件都可以執行 `prototype` 屬性新增的方法。

#### 5.4 擴充 JavaScript 內建物件的方法

- JavaScript 物件的 prototype 屬性不只可以新增自訂物件的方法，對於 JavaScript 內建物件，一樣可以使用 Prototype 物件新增物件的方法，例如:

  ```javascript
  var objMessage = new String("JavaScript 程式設計");
  ```

  上述 String 物件使用 new 運算子建立物件，只需使用 prototype 屬性就可以新增 String 物件的方法，如下所示:

  ```javascript
  String.prototype.reverse = reverse_string;
  String.protptype.even = even_string;
  ```

  上述程式碼新增 String 物件的 reverse() 和 even() 方法，使用的函數是反向顯示的 reverse_string(), 和只顯示字串中偶數字元的 even_string() 函數。

- 範例
  使用 prototype 屬性新增內建物件 String 的兩個 reverse() 和 even() 方法，這些方法是在建立物件前使用 Prototype 物件新增的物件方法，如下:
  
  ```javascript
  <script>
  // 新增的物件方法
  function reverse_string() {
   for (var i = (this.length-1); i >= 0; i--)
      document.write(this.charAt(i));
   document.write("<br/>");
  }
  // 新增的物件方法
  function even_string() {
   var output = "";
   for (var i = 0; i < this.length; i+=2)
      output += this.charAt(i);
   return output;
  }
  // 擴充物件方法
  String.prototype.reverse = reverse_string;
  String.prototype.even = even_string;
  </script>
  </head>
  <body>
  <h2>擴充JavaScript內建物件的方法</h2>
  <hr/>
  <script>
    // 建立內建物件String
    var objMessage = new String("JavaScript網頁程式設計");
    document.write("原始字串: " + objMessage + "<br/>");
    // 執行物件方法
    objMessage.reverse();
    strOutput = objMessage.even();  // 執行物件方法
    document.write(strOutput + "<br/>");
  </script>
  ```

#### 5.5 Prototype 物件的繼承

- JavaScript 物件的繼承可以將一個物件擴充成其他物件，換句話說，不但可以使用物件作為原型來建立其他物件，還可以擴充物件的屬性和方法，例如: position 物件的建構函數，如下所示:

  ```javascript
  function position(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
  ```

  上述 `position()` 建構函數定義圖形的基本資料，包含位置 x、y 和色彩 color 屬性，接著建立  `circle` 物件繼承 `position` 物件，如下所示:

  ```javascript
  function circle(r){
    this.r =r;
    this.info = showCircleInfo;
    function showCircleInfo(){
      var result = 3.1415926 * this.r * this.r;
      document.write("半徑 : " + this.r  + "<br/>");
      document.write("X 座標 : " + this.x  + "<br/>");
      document.write("Y 座標 : " + this.y  + "<br/>");
      document.write("圓形色彩 : " + this.color  + "<br/>");
      document.write("圓面積 : " + result + "<br/>");
    }
  }
  ```

  上述函數是 circle 物件的建構函數，可以看到新增屬性 r 和方法 info，函數 ShowCircleInfo() 就是方法 info (JavaScript 的函數中可以定義另一個函數)，內含 position 物件的屬性，現在可以在 circle 物件使用 prototype 屬性繼承 position 物件，如下所示:

  ```javascript
  circle.prototype = new position();
  ```

  上述程式碼使用 new 運算子建立 position 物件，此時的 circle 物件就可以繼承 position 物件的屬性和方法。
  
- 範例
  建立建構函數的物件宣告，然後在 circle 物件使用 prototype 屬性繼承 position 物件，如下所示:

  ```javascript
  <script>
  // 基礎物件的建構函數
  function position(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  // 繼承物件circle的建構函數
  function circle(r) {
    this.r = r;
    this.info = showCircleInfo;
    // 物件circle()的方法
    function showCircleInfo() {
       var result = 3.1415926 * this.r * this.r;
       document.write("半徑 : " + this.r + "<br/>");
       document.write("X座標 : " + this.x + "<br/>");
       document.write("Y座標 : " + this.y + "<br/>");
       document.write("圖形色彩 : " + this.color + "<br/>");
       document.write("圓面積 : " + result + "<br/>"); 
    }
  }
  // Prototype物件的繼承
  circle.prototype = new position();
  </script>
  </head>
  <body>
  <h2>Prototype物件的繼承</h2>
  <hr/>
  <script>
  // 建立自訂物件
  var objCircle = new circle(2);
  // 設定物件屬性
  with(objCircle) {
     x = 100;
     y = 50;
     color = "green"; 
  }
  // 執行物件方法info
  objCircle.info();
  </script>
  ```
  
  上述圖例顯示 circle 物件的屬性，部分屬性是使用 prototype 屬性繼承自 position 物件。

---

## JavaScript 內建物件

### 1. JavaScript 內建物件

JavaScript 擁有內建物件和自訂物件。事實上，各種資料型態的變數都是物件，變數在宣告和指定值後馬上就擁有對應的方法和屬性。

#### 1.1 JavaScript 內建物件的種類

JavaScript 物件依照建立方式的不同可以分為使用變數宣告的**隱性物件**，和使用 new 運算子建立物件的**顯性物件**。

- 隱性物件(Implicit objects)
  JavaScript 的各種資料型態變數，在宣告和指定值後就是一個物件，例如: 數值、字串和布林資料型態的變數等，如下所示:

  ```javascript
  var str = "JavaScript 程式設計";
  ```

  上述程式碼宣告變數 str 是一個隱性 String 物件，雖然可以使用 String 物件的方法，不過隱形物件不支援 prototype 屬性，如下所示:

  ```javascript
  str.prototype.count;
  ```

  上述程式碼會導致 JavaScript 程式執行錯誤，而且，隱形物件也無法隨意擴充物件的屬性。

- 顯性物件(Explicit objects)
  JavaScript 物件如果是使用 new 運算子建立物件，這個物件就是一個顯性物件，如下所示:

  ```javascript
  var str = new String("JavaScript 程式設計");
  ```

  上述程式碼建立的也是一個字串變數，不過，這是一個 String 物件，顯性物件支援新增屬性和 Prototype 屬性。
  
#### 1.2 javaScript 內建物件

JavaScript 提供十一種內建物件，常用內建物件如下:

- Boolean 物件
  Boolean 物件是一種資料型態，提供建構函數可以建立布林資料型態的物件，如下所示:

  ```javascript
  objBoolean = new Boolean();
  ```

  上述程式碼使用 new 運算子建立布林物件，括號參數如為 false、0、null、NaN或空字串的布林值為 fasle;否則為 true。
  當使用 var 宣告布林變數且指定值後，布林變數將自動轉換成 Boolean 物件。

- Function 物件
  JavaScript 函數就是一個 Function 物件，建立方式，如下所示

  ```javascript
  function mod(x,y){
    return (x % y);
  }
  ```

  上述程式區塊是一個餘數函數，也可以使用 new 運算子建立函數的 Function 物件，如下所示:

  ```javascript
  var mod = new Function("x", "y", "return(x%y)");
  ```

  上述程式碼建立 mod() 函數，不論使用哪一種方法建立函數，都可以使用相同程式碼旯呼叫它，如下所示:

  ```javascript
  value = mod(4,5);
  ```

  Function 物件是函數，如果函數擁有參數，這些傳入參數是 arguments 物件。

- Global 物件
  Global 物件不能使用 new 運算子建立，在腳本語言引擎初始後就會自動建立此物件。在 Global 物件擁有2個屬性，如下表所示:

  |    屬性   | 說明                             |
  |:---------|:-------------------------------------|  
  |Infinity  |取得 Number.POSITIVE_INFINITY 的初始值  |
  |NaN       |取得 Number.NaN 的初始值|
  
  Global 物件的屬性不用指名  Global 物件, 直接使用屬性名稱即可，如下所示:
  
  ```javascript
  Infinity
  NaN
  ```

- Number 物件
  Number 物件類似 Boolean 物件可以建立數值資料型態的變數，如下列所示:

  ```javascript
  objNum = new Number(value);
  ```

  上述程式碼使用 new 運算子建立 Number 物件，參數 value 為數值變數的值，通常使用 Number 物件的目的是為了使用 toString()方法將數值資料轉換成字串。

  Number 物件屬性的語法為: `Number.propertyname;`,  其常用屬性的說明，如下表所示:

  |    屬性   | 說明                             |
  |:---------|:-------------------------------------|  
  |MAX_VALUE |傳回 JavaScript數值的最大值，約1.79E+308 |
  |MIN_VALUE |傳回 JavaScript最接近0的值，約 5.00E-324 |
  |NaN       |一種特殊值，表示運算式或變數值不是數值      |
  |NEGATIVE_INFINITY|傳回比 -Number.MAX_VALUE 更大的負值 |
  |POSITIVE_INFINITY|傳回比 Number.MAX_VALUE 更大的正值 |

- Object 物件
  Object 物件可以建立 JavaScript 支援的物件，如下所示:

  ```javascript
  Objobject = new Object(value);
  ```

  上述程式碼使用 new 運算子建立 Object 物件，參數 value 如果是 String,它是一個字串物件，Boolean 是 Boolean 物件等。

- RegExp 物件
  RegExp 物件是 JavaScript 「正規表達式」(Regular Expression)物件。
  
### 2. JavaScript 的 String 物件

字串屬於 JavaScript 的基本資料型態，字串變數本身就是一種 String 物件。

#### 2.1 建立 String 物件

String 物件的方法可以格式化字串或進行子字串操作，簡單說，就是處理字串變數的資料，可以直接宣告字串變數或使用 new 運算子建立 String 物件，如下所示:

```javascript
var objstr1 = ""JavaScript;
var objstr2 = new String("網頁程式設計");
```

上述程式碼都可以建立 String 物件，不論使用哪一種方法建立 String 物件，都可以使用以下方法來處理字串內容。

- HTML 標籤的格式編排
  String 物件提供一系列格式編排方法，可以將String 物件的字串內容輸出成對應的HTML標籤，相關的方法(下表 string 代表 String 物件的字串內容)，如下表所示:

  |       方法     | 說明                             |
  |:---------------|:-------------------------------------|  
  |anchor()        |傳回<a>string</a>標籤字串 |
  |big()           |傳回<big>string</big>標籤字串|
  |blink()         |傳回<blink>string</blink>標籤字串 |
  |bold()          |傳回<b>string</b>標籤字串 |
  |fixed           |傳回<tt>string</tt> 標籤字串 |
  |fontcolot(color)|傳回<font color="color">string</font> 標籤字串 |
  |fontsize(size)  |傳回<font size="size">string</font> 標籤字串 |
  |italics()       |傳回<i>string</i>標籤字串 |
  |link(url)       |傳回<a href="url">string</a>標籤字串 |
  |small()         |傳回<small>string</small>標籤字串 |
  |strike()        |傳回<strike>string</strike>標籤字串 |
  |sub()           |傳回<sub>string</sub>標籤字串 |
  |sup()           |傳回<sup>string</sup>標籤字串 |

  JavaScript 程式使用 String 物件的方法，可以將字串使用 HTML 標籤的格式編排來輸出內容:
  
  ```javascript
  <script>
  // 測試字串
  var str="JavaScript網頁程式設計";
  document.write("anchor(): " + str.anchor() + "<br/>");
  document.write("big(): " + str.big() + "<br/>");
  document.write("blink(): " + str.blink() + "<br/>");
  document.write("bold(): " + str.bold() + "<br/>");
  document.write("fixed(): " + str.fixed() + "<br/>");
  document.write("fontcolor('red'): " + str.fontcolor("red") + "<br/>");
  document.write("fontsize(5): " + str.fontsize(5) + "<br/>");
  document.write("italics(): " + str.italics() + "<br/>");
  document.write("link('URL'): " + str.link("http://www.hinet.net") + "<br/>");
  document.write("small(): " + str.small() + "<br/>");
  document.write("strike(): " + str.strike() + "<br/>");
  document.write("sub(): " + str.sub() + "<br/>");
  document.write("sup(): " + str.sup() + "<br/>");
  </script>
  ```

  如上所顯示 String 物件格式編排方法的結果，這些輸出都可以對應到 HTML 標籤的編排效果。

#### 2.2 字串長度與大小寫

- 物件提供方法和屬性可以取得字串長度和英文字串的大小寫轉換，相關屬性說明，如下所示:

  |      屬性      | 說明                             |
  |:--------------|:---------------------------------|  
  |length         |取得字串的長度                      |

  相關 String 物件的方法，如下所示:

  |      屬性     | 說明                             |
  |:-------------|:---------------------------------|  
  |toLowerCase() |將字串的英文字母都轉換成小寫字母      |
  |toUpperCase() |將字串的英文字母都轉換成大寫字母      |
  
- 範例
  使用 String 物件的方法來取得字串長度和進行英文字母的大小寫轉換。

  ```html
  <h2>字串長度與大小寫</h2>
  <hr/>
  <script>
  // 測試字串
  var str1="JavaScript";
  var str2= new String("網頁程式設計");
  document.write("測試的英文字串: \"" + str1 + "\"<br/>");
  document.write("測試的中文字串: \"" + str2 + "\"<br/>");
  document.write("英文字串長度: " + str1.length + "<br/>");
  document.write("中文字串長度: " + str2.length + "<br/>");
  document.write("全部小寫: " + str1.toLowerCase() + "<br/>");
  document.write("全部大寫: " + str1.toUpperCase() + "<br/>");
  </script>
  ```

  在上述最上方的2個字串為測試的中英文字串，接著中英文字串的長度，最後是英文字串的大小寫轉換。

#### 2.3 取得字串的指定字元

- 在字串處理時如果需要取得字串指定位置的字元，String 物件提供兩種方法來取得指定位置的字元，相關方法說明，如下所示:

  |        屬性      | 說明                             |
  |:-----------------|:---------------------------------|  
  |charAt(index)     |取得參數index位置的字元，索引值是從0開始|
  |charCodeAt(index) |取得參數index位置的Unicode統一字碼|

  >上述2種方法傳入參數index都是以0開始，第1個字元為0,第2個字元為1,依序類推。

- 範例
  使用 String 物件的方法取得指定位置的字元和 Unicode 內碼。

  ```html
  <h2>取得字串的字元</h2>
  <hr/>
  <script>
  // 測試字串
  var str1="JavaScript";
  var str2= new String("網頁程式設計");
  document.write("測試的英文字串: \"" + str1 + "\"<br/>");
  document.write("測試的中文字串: \"" + str2 + "\"<br/>");
  document.write("英文字元charAt(4): " + str1.charAt(4) + "<br/>");
  document.write("中文字串charAt(4): " + str2.charAt(4) + "<br/>");
  document.write("英文字元charCodeAt(4): " + str1.charCodeAt(4) + "<br/>");
  </script>
  ```  

  上述結果上方為中英文原始的測試字串，接著取得位置索引值為4的中英文字元，即第5個字元，最後取得英文字元S的 Unicode 字碼為 83。

#### 2.4 子字串的搜尋

- String 物件提供功能強大的子字串搜尋方法，可以輕鬆在字串中搜尋所需的子字串，相關方法的說明，如下所示。

  |          方法         | 說明                             |
  |:---------------------|:---------------------------------|  
  |indexOf(string, index)|傳回第1次搜尋到字串的索引位置，沒有找到傳回-1,傳入參數是搜尋字串，index為開始搜尋的索引位置|
  |lastIndexOf(string)   |如同indexOf()方法，不過是從尾搜尋到頭的反向搜尋|
  |math(string)          |如同indexOf()和lastIndexOf(),不過傳回的為找到的字串，沒有找到傳回null|
  |search(string)        |與 indexOf() 的功能相似|

- 範例
  使用 String 物件的相關方法來搜尋指定的子字串。

  ```html
  <h2>字串搜尋</h2>
  <hr/>
  <script>
  // 測試字串
  var str1="JavaScript";
  var str2= new String("網頁程式設計");
  document.write("測試的英文字串: \"" + str1 + "\"<br/>");
  document.write("測試的中文字串: \"" + str2 + "\"<br/>");
  document.write("英文字元indexOf('a'): " + str1.indexOf('a') + "<br/>");
  document.write("英文字元indexOf('a', 2): " + str1.indexOf('a', 3) + "<br/>");
  document.write("中文字串indexOf('程式'): " + str2.indexOf('程式') + "<br/>");
  document.write("英文字元lastIndexOf('a'): " + str1.lastIndexOf('a') + "<br/>");
  document.write("英文字元match('Script'): " + str1.match('Script') + "<br/>");
  document.write("中文字串match('程式'): " + str2.match('程式') + "<br/>");
  document.write("英文字元search('Script'): " + str1.search('Script') + "<br/>");
  document.write("中文字串search('學習'): " + str2.search('學習') + "<br/>");
  </script>
  ```

  上述結果為由上而下分別顯示原始測試字串和測試各種方法的字串搜尋結果。

#### 2.4 子字串的處理

- String 物件提供方法可以取代、分割和取出字串中所需的子字串，相關方法的說明(string1 和  string2 為子字串)，如下所示。

  |            方法         | 說明                             |
  |:------------------------|:---------------------------------|  
  |replace(string1, string2)|將找到的 string1 子字串取代成 string2|
  |split(string)            |傳回 Array 物件，使用參數 string 作為分割字串，可以將字串轉換成 Array 物件|
  |substr(index,length)     |從 index 開始取出 length 個字元|
  |substring(index1, index2)|取出 index1 到  index2 之間的子字串|
  |concat(string)           |將 string 字串新增到 String 物件的字串後|

  上述 concat() 方法的呼叫需要使用指定敘述，如下所示:

  ```javascript
  str3 = str1.concat(str2);
  ```

  上述程式碼相當於 str3=str1+str2。

- 範例
  使用 String 物件的方法取出字串中的子字串，並且使用 concat() 方法連接2個字串。

  ```html
  <h2>子字串處理</h2>
  <hr/>
  <script>
  // 測試字串
  var str1="JavaScript";
  var str2= new String("網頁程式設計");
  document.write("測試的英文字串: \"" + str1 + "\"<br/>");
  document.write("測試的中文字串: \"" + str2 + "\"<br/>");
  document.write("英文replace('Java','VB'): "+str1.replace('Java','VB')+"<br/>");
  document.write("中文split('程式'): " + str2.split('程式') + "<br/>");
  document.write("英文substr(2,4): " + str1.substr(2,4) + "<br/>");
  document.write("中文substring(2,5): " + str2.substring(2,5) + "<br/>");
  // 連接2個字串
  str3 = str1.concat(str2);
  document.write("連接字串str1.concat(str2): " + str3 + "<br/>");
  </script>
  ```

  上述結果為前二列是中英文測試的原始字串，下方是各種子字串處理的執行結果，最後將中英文字串接合成一個字串。

### 3. JavaScript 的 Array 物件

JavaScript 資料型態並沒有陣列，而是使用 Array 物件建立陣列，每一個陣列元素事實上就是 Array 物件的屬性。

#### 3.1 JavaScript 的一維陣列

基本上 JavaScript 陣列和物件的分野並不明顯，陣列擁有陣列元素如同物件擁有屬性，JavaScript 陣列事實上就是一個特殊物件。

- 建立一維陣列
  如同 C/C++、C#、Java或 Visual Basic 語言的陣列元素是使用數值的索引值來存取元素，JavaScript 陣列的索引值是從0 開始，JavaScript 宣告陣列的方法就是建立 Array 物件，如下所示:

  ```javascript
  var userename = new array(5);
  ```

  上述程式碼使用 new 運算子建立 Array 物件，參數 5 表示有5個元素，索引值是從0開始，因為只有一個索引，所以是建立一維陣列。然後可以使用索引值來指定陣列的元素值，如下所示:

  ```javascript
  username[0] = "Joe";
  username[1] = "Jone";
    :
  username[4] = "Merry";
  ```

  上述程式碼指定陣列元素的內容，也可以在建立 Array 物件時，直接在參數指定陣列元素值，如下所示:

  ```javascript
  var tipe = new Array(100,200,300);
  ``
  上述兩個方法都可以建立 JavaScript 陣列，其中 username[] 陣列是一個字串陣列，tips[] 陣列是數值陣列。

- 訪問一維陣列
  可以使用 `for` 迴圈走訪和顯示陣列元素，如下所示:

  ```javascript
  for(var i=0; i < 5; i++){
    document.write(username[i] + "<br />")
  }
  ```

  上述程式碼使用陣列索引值取得每一個陣列元素的值，迴圈的結束條件是使用 length 屬性取得陣列尺寸.

- 範例:
  使用 Array 物件建立一維的數值和字串陣列，然後使用 for 迴圈顯示陣列的所有元素。
  
  ```html
  <h2>JavaScript的一維陣列</h2>
  <hr/>
  <script>
  var tips = new Array(100,200,500);
  var username = new Array(5);
  username[0] = "Joe";
  username[1] = "Jane";
  username[2] = "Tony";
  username[3] = "Tom";
  username[4] = "Merry";
  // 使用迴圈顯示陣列值
  for(var i = 0; i < tips.length; i++){
     document.write(tips[i] + "<br/>");
  }
  // 使用迴圈顯示陣列值
  for(var i = 0; i < 5; i++){
     document.write(username[i] + "<br/>");
  }
  </script>
  ```

  上述結果分別顯示2個陣列的所有元素，上方數值為tips[]陣列，下方字串屬於 username[] 陣列。

#### 3.2 Array 物件的屬性和方法

- Array 物件提供屬性和方法可以取得陣列尺寸、排列陣列元素、合併陣列和反轉陣列元素。Array物件的屬性說明，如下表說明:

  |            屬性         | 說明                             |
  |:------------------------|:---------------------------------|  
  |length                   |取得陣列的元素個數，即陣列尺寸|

  Array 物件的相關方法說明，如下表所示:
  |            屬性         | 說明                             |
  |:------------------------|:---------------------------------|  
  |join()                   |將陣列的元素使用字串方式顯示，每個陣列元素是使用「,」符號分隔|
  |reverse()                |將陣列元素反轉，本來是陣列的最後一個元素成為第一個元素      |
  |sort()                   |將陣列所有元素進行排序|
  |concat(array)            |將參數的陣列合併到目前的陣列|

- 範例:
  建立2個測試陣列，然後分別測試 Array 物件的屬性和方法。

  ```html
  <script>
  function showArray(username) {
     // 使用迴圈顯示陣列值
     for(var i = 0; i < username.length; i++){
        document.write(username[i] + ",");
     }
     document.write("<br/>");
  }
  </script>
  </head>
  <body>
  <h2>Array物件的方法</h2>
  <hr/>
  <script>
  var username = new Array("Joe","Jane","Tony","Tom");
  var username1 = new Array("陳會安","江小魚","陳允傑");
  document.write("陣列元素共: " + username.length + "個<br/>");
  // 顯示陣列元素
  document.write(username.join() + "<br/>");
  username.reverse();  // 反轉陣列
  showArray(username); // 顯示陣列元素
  username.sort(); // 排序
  showArray(username); // 顯示陣列元素
  username = username.concat(username1); // 結合兩陣列
  showArray(username); // 顯示陣列元素
  </script>
  ```

  上述依序顯示陣列元素的個數，各種 Array 物件方法的執行結果，最後一列將兩個陣列合成一個陣列。

#### 3.3 JavaScript 的多維陣列

- JavaScript 的 Array 物件並不能直接建立二維或多維陣列，不過，因為Array物件的元素可以是另一個Array物件，所以仍然可以在 JavaScript 程式碼建立多維陣列，如下所示:

  ```javascript
  var users = new Array(5);
  for(var i=o; i<5; i++){
    users[i] = new Array(2);
  } 
  ```

  上述程式碼建立擁有5個元素的Array物件 users[],接著使用for迴圈將每個陣列元素分別建立成擁有2個元素的Array 物件，即 5x2 的二維陣列，然後可以指定二維陣列的元素值，如下所示:

  ```js
  users[0][0] = "Joe";
  users[0][1] = "1234";
  users[1][0] = "Jane";
  users[1][1] = "5678";
  ...
  users[4][0] = "Merry";
  users[4][1] = "5678";
  ```

  上述程式碼指定二維陣列的元素值，同樣方式可以將 Array 物件擴充成多維陣列。

- 範例:
  使用 Array 物件建立 5x2 的二維陣列，當指定二維陣列值後，使用兩層迴圈顯示二維陣列的值。

  ```html
  <h2>JavaScript的二維陣列</h2>
  <hr/>
  <script>
  // 建立二維陣列
  var users = new Array(5);
  for(var i = 0; i < 5; i++)
     users[i] = new Array(2);
  users[0][0] = "Joe";
  users[0][1] = "1234";
  users[1][0] = "Jane";
  users[1][1] = "5678";
  users[2][0] = "Tony";
  users[2][1] = "9012";
  users[3][0] = "Tom";
  users[3][1] = "1234";
  users[4][0] = "Merry";
  users[4][1] = "5678";
  // 使用迴圈顯示陣列值
  for(var j = 0; j < users.length; j++){
     for(i = 0; i < users[i].length; i++)
        document.write(users[j][i] + ",");
     document.write("<br/>");
  }
  </script>
  ```

  上述程式碼顯示二維陣列的值，供五列，每列擁有二個元素。

### 4. JavaScript 的 Date 物件

Date 物件可以取得電腦的系統時間和日期，並且提供相關方法可以將它轉換成所需的日期或時間資料。

#### 4.1 取得日期和時間

- 物件在使用 new 運算字建立物件後，就可以取得系統的時間和日期資料，如下所示:

  ```javascript
  var dttoday = new Date();
  ```
  
  上述程式碼建立 Date 物件後，可以使用下表方法取得時間和日期資料，其說明如下表所示:

  |            方法          | 說明                             |
  |:------------------------|:---------------------------------|  
  |getDate()                |傳回日期值 1 ~ 31|
  |getDay()                 |傳回星期值 0 ~ 6,也就是星期日到星期六|
  |getMonth()               |傳回月份值 0 ~ 11，也就是一到十二月|
  |getFullYear()            |傳回完整年份，例如: 2014|
  |getYear()                |傳回年份，如果在 1900~1999 之間，傳回後兩碼，例如: 1999年傳回99,否則傳回完整年份|
  |getHours()               |傳回小時 1 ~ 31|
  |getMinutes()             |傳回分鐘 1 ~ 31|
  |getSeconds()             |傳回秒數 1 ~ 31|
  |getMilliseconds()        |傳回千分之一秒為單位的秒數 1 ~ 31|
  |getTime()                |傳回自 1/1/1970 年開始的秒數，以千分之一(毫秒)為單位|
  
- 範例:
  使用 Date 物件方法取得系統時間、日期和星期。

  ```html
  <h2>取得日期時間</h2>
  <hr/>
  <script>
  var weekday=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
  var dttoday = new Date();
  // 取得系統日期
  var output = dttoday.getDate() + "/";
  output += (dttoday.getMonth() + 1) + "/";
  output += dttoday.getFullYear() + "<br/>";
  document.write("系統日期: " + output);
  // 取得系統時間
  output = dttoday.getHours() + ":";
  output += dttoday.getMinutes() + ":";
  output += dttoday.getSeconds() + "<br/>";
  document.write("系統時間: " + output);
  document.write(weekday[dttoday.getDay()]);
  </script>
  ```

  上述程式碼顯示使用 Date 物件方法取得系統日期、時間和今天是星期幾。

- 範例:

  ```html
  <body>
    <script>
       let d = new Date(); 
       console.log(d); //現在時間
     
       let year = d.getFullYear();
       //現在月，會有問題，因是陣列資料，抓的是索引值 [1,2,3,4,5,6,7,8,9,10,11,12]
       //let month= d.getMonth();
       let month= d.getMonth()+1;
     
       //日
       let date = d.getDate();
     
       //星期
       //[0,1,2,3,4,5,6]，雖是陣列，但 0 是星期日,　除了星期日外1 ~ 6 不會有問題
       let day  = d.getDay();
     
       console.log(year);  　　//現在年
       //console.log(month); 　//現在月，會有問題，抓的是索引值 [1,2,3,4,5,6,7,8,9,10,11,12]
       console.log(month); 
       console.log(date);  　　//現在日
       console.log(day);   　　//現在星期
    </script>
  </body>
  ```

  //星期日顯示的解決:
  原:
  
  ```javascript
  let day  = d.getDay();`
  ```
  
  改:
  
  ```javascript
  let day  = d.getDay();
     if(day == 0){
       day = "日";
     }
  ```
  
  //但這樣改法，星期日表示用中文的 "日", 其他卻是數字？所以用下方法：
  
  ```javascript
  let day  = d.getDay();
  let dayArray = ["日", "一", "二", "三", "四", "五", "六"];
  let dayArray_en = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let dayArray_jp = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  console.log(dayArray[day]);
  ```
  
#### 4.2 設定日期和時間

- Date 物件提供數種方法來存取日期與時間，注意!這些設定方法並不是修改電腦的系統日期和時間，只是設定Date 物件儲存的日期和時間，Date 物件設定日期和時間的相關說明如下所示:

  |            方法          | 說明                             |
  |:------------------------|:---------------------------------|  
  |setDate()                |設定 Date 物件的日期 1 ~ 31|
  |setMonth()               |設定 Date 物件的月份 0 ~ 11|
  |setFullYear()            |設定 Date 物件的完整年份|
  |setYear()                |設定 Date 物件的年份，在 1900~1999 間只需使用兩位，例如: 1999使用99，否則需要使用完整年份|
  |setHours()               |設定 Date 物件的小時 0 ~ 23|
  |setMinutes()             |設定 Date 物件的分鐘 0 ~ 59|
  |setSeconds()             |設定 Date 物件的秒數 0 ~ 59|
  |setMilliseconds()        |設定 Date 物件的秒數，以千分之一秒為單位，0 ~ 999|
  |setTime()                |設定 Date 物件的時間，自1/1/1970 年開始，以千分之一為單位|

  Date 物件提供一組對應方法，可以設定和取得UTC日期和時間，例如:setDate() 方法對應 setUTCDate(); getHours() 方法對應 getUTCHours()等。

  >「UTC」(Universal Coordinated Standard) 稱為國際標準時間業就是「GMT」(Greenwich Mean Time) 格林威治標準時間，如下所示:
  > Wed Nov 11 04:30:14 UTC+0800 2020
  > 上述字串是本地的日期時間，UTC+0800 表示本地時間轉換為UTC時間再加8小時，可以使用 toGMTString() 方法將本地時間轉換成GMT時間，也就是UTC時間。

- 範例:
  使用 Date 物件方法設定物件的日期和時間。

  ```html
  <h2>設定日期時間</h2>
  <hr/>
  <script>
  var newdate = new Date();
  // 設定日期
  newdate.setDate("11");
  newdate.setMonth("10");    // 11月
  newdate.setFullYear("2020");
  newdate.setHours("4");
  newdate.setMinutes("30");
  document.write(newdate);
  </script>
  ```

  上述程式碼顯示使用 Date 物件方法設定的日期和時間，這是 Date 物件記錄的時間和日期，並不是電腦的系統日期和時間。

  |            方法          | 說明                             |
  |:------------------------|:---------------------------------|  
  |getTimezoneOffset()      |傳回本地時間和GMT的時間差，以分為單位  |
  |toGMTString()            |設定 Date 物件的月份 0 ~ 11|
  |toLocalString()          |設定 Date 物件的完整年份|
  |parse(Date)              |設定 Date 物件的年份，在 1900~1999 間只需使用兩位，例如: 1999使用99，否則需要使用完整年份|
  |UTC(U,M,D..)             |設定 Date 物件的小時 0 ~ 23|
  |setMinutes()             |設定 Date 物件的分鐘 0 ~ 59|
  |setSeconds()             |設定 Date 物件的秒數 0 ~ 59|
  |setMilliseconds()        |設定 Date 物件的秒數，以千分之一秒為單位，0 ~ 999|
  |setTime()                |設定 Date 物件的時間，自1/1/1970 年開始，以千分之一為單位|

#### 4.3 日期和時間的轉換

- Date 物件提供日期和時間轉換方法，可以取得時間差、轉換成千分之一秒數或輸出成字串等轉換操作，GMT為格林威治標準時間，相關方法說明，如下表:

  |            方法          | 說明                             |
  |:------------------------|:---------------------------------|  
  |getTimezoneOffset()      |傳回本地時間和 GMT 的時間差，以分為單位|
  |toGMTString()            |傳回轉換成 GMT 時間的字串|
  |toLocalString()          |傳回將GMT轉換成本地時間的字串|
  |parse(Date)              |傳回參數 Date 物件從 1/1/1970 到本地時間的毫秒數，以千分之一為單位|
  |UTC(Y,M,D...)            |傳回參數年-月-日-時-分-秒從 1/1/1970 到 GMT 時間的毫秒數，以千分之一秒為單位

  上表 parse() 和 UTC() 方法和其他時間轉換方法在使用上有些不同，這2個方法不用建立物件，因為它是Date()建構函數的方法(相當於其他語言的靜態/類別方法)，如下所示:

  ```html
  document.write(Date.parse(dttoday));
  document.write(Date.UTC(2020,04,30,12,1,0));
  ```

  上述程式碼直接使用 Date.parse() 和 Date.UTC() 執行方法，參數 dttoday 是 Date 物件變數 dttoday

#### 4.4 取得系統的時間

JavaScript 的 Date 物件可以取得系統時間，換句話說，只需定是執行 JavaScript 函數，就可以使用 Date 物件建立網頁小時鐘。

JavaScript 小時鐘需要使用 Window 物件的計時器方法 `setTimeOut()`，方法參數可以設定在間隔時間後執行指訂函數或網頁，對應的 clearTimeout() 方法可以清除計數器.

- 範例:
  使用 Date 物件和 Window 物件的計時器方法建立網頁小時鐘，使用GIT圖檔，顯示系統時間。

  ```html
  <script>
  var timer = null;
  // 顯示數字圖片
  function displayClock(num) {
    var dig = parseInt(num/10);
    var timetag="<img src='images\\" + dig + ".gif'>";
    dig = num%10;
    timetag +="<img src='images\\" + dig + ".gif'>";
    return timetag;
  }
  // 停止計時
  function stopClock() {
   clearTimeout(timer);
  }
  // 開始計時
  function startClock() {
    var time = new Date();
    // 取得時間
    var hours = displayClock(time.getHours()) + ":";
    var minutes = displayClock(time.getMinutes()) + ":";
    var seconds = displayClock(time.getSeconds());
    // 顯示時間
    show.innerHTML = hours + minutes + seconds;
    timer = setTimeout("startClock()",1000);
  }
  </script>
  </head>
  <body onload="startClock()" onunload="stopClock()">
  <div id="show"></div>
  ```

  上述結果是網頁小時鐘，顯示的並不是靜態時間，而是真的會走得小時鐘。

### 5. JavaScript 的 Math 物件

JavaScript 的 Math 物件擁有數學常數和函數的屬性和方法，Math 物件不同於 JavaScript 其他內建物建，Math 物件是由腳本語言引擎所建立，所以不需要使用 new 運算子建立物件，在 JavaScript 程式碼可以直接使用 Math 物件的屬性和方法，即其他物件導向語言的靜態/類別方法。

#### 5.1 Math 物件的屬性

- Math 物件的屬性都是一些數學常數，屬性的說明如下表所示:

  |         屬性            | 說明                             |
  |:------------------------|:---------------------------------|  
  |E                        |傳回本地時間和 GMT 的時間差，以分為單位|
  |LN2                      |ln2  = 0.6931471805599453|
  |LN10                     |ln10 = 2.302585092994046|
  |LOG2E                    |$\log_2e$ = 1.4426950408889633|
  |LOG10E                   |$\log_e$  = 0.4342944819032518|
  |PI                       |圓周率 = 3.141592653589793|
  |SORT1_2                  |$\sqrt{\frac {1}{2}}$ = 0.7071067811865476|
  |SORT2                    |$\sqrt{2}$ = 1.4142135623730951|
  
- 範例
  在 JavaScript 程式顯示 Math 物件的屬性清單。

  ```html
  <body>
  <h2>Math物件的屬性</h2>
  <hr/>
  <script>
  document.write("E: " + Math.E + "<br/>");
  document.write("LN2: " + Math.LN2 + "<br/>");
  document.write("LN10: " + Math.LN10 + "<br/>");
  document.write("LOG2E: " + Math.LOG2E + "<br/>");
  document.write("LOG10E: " + Math.LOG10E + "<br/>");
  document.write("PI: " + Math.PI + "<br/>");
  document.write("SQRT1_2: " + Math.SQRT1_2 + "<br/>");
  document.write("SQRT2: " + Math.SQRT2 + "<br/>");
  </script>
  ```

  上述顯示 Math 物件的屬性名稱和值，這些都是數學常數。

#### 5.2 Math 物件的亂數、最大和最小值

- Math 數學物件，提供對資料的數學計算、建立亂數、最大值和最小值的方法，相關方法的說明，如下表示:
  
  |          方法            | 說明                             |
  |:------------------------|:---------------------------------|  
  |max(value1,value2)       |傳回2個參數中的最大值|
  |min(value1,value2)       |傳回2個參數中的最小值|
  |random()                 |結果為0-1間的一個隨機數(包括0,不包括1)|
  |round(value)             |將參數值四捨五入後傳回|
  |ceil(n)                  |返回大於等於 n 的最小整數|
  |ceil(Math.random()*10)   |獲取1到10的隨機整數，取0的機率極小|
  |floor(num)               |引數num為一個數值，函式結果為num的整數部分|
  |floor(Math.random()*10)  |可均衡獲取0到9的隨機整數。
  |round(num)               |引數num為一個數值，函式結果為num四捨五入後的整數|
  |round(Math.random())     |可均衡獲取0到1的隨機整數。
  |round(Math.random()*10)  |獲取0到10的隨機整數，其中獲取最小值0和最大值10的機率少一半。

- 範例一:
  使用 Math 物件的方法取得2個數字的最大值和最小值，然後取得0-10和0-100之間的亂數值。

  ```html
  <h2>Math物件的亂數、最大和最小</h2>
  <hr/>
  <script>
  document.write("最大值max(34, 78): " + Math.max(34,78) + "<br/>");
  document.write("最小值min(34, 78): " + Math.min(34,78) + "<br/>");
  document.write("四捨五入round(34.567):" + Math.round(34.567) + "<br/>");
  document.write("四捨五入round(34.567):" + Math.round(34.467) + "<br/>");
  document.write("亂數random(): " + Math.random() + "<br/>");
  // 0-10的亂數
  var no = Math.round(Math.random()*10);
  document.write("0-10亂數: " + no + "<br/>");
  // 0-100的亂數
  no = Math.round(Math.random()*100);
  document.write("0-100亂數: " + no + "<br/>");
  </script>
  ```  

- 範例二
  使用 Math 物件的方法取得亂數

  ```javascript
  //方案一
  Math.random().toString(36).substr(2)

  //方案二
  function randomWord(randomFlag, min, max) {
    var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
           'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C',
           'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
           'X', 'Y', 'Z'
    ];

    // 隨機產生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }

  //方案三
  // 指定具体 len 位数
  function getRandomStr(len) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < len; i++)
            /* 
              if possible.length = 62 
              Math.floor(Math.random() * 62 => 取 0 ~ 61 的整數
              取出的 10 個字是 "ABCDEFGHIJ" 其中之一
            */ 
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
  }

  //生成3 - 32 位隨機串：
  console.log(randomWord(true, 3, 32))
  //生成43位隨機串：
  console.log(randomWord(false, 43))
  ```

  >上述顯示 Math 物件方法取得最大、最小值、亂數和四捨五入方法的執行結果。

#### 5.3 Math 物件的數學方法

- Math 物件提供數學的三角函數和指數的方法，相關方法的說明，如下表所示:

  |          方法           | 說明                             |
  |:------------------------|:---------------------------------|  
  |abs()                    |傳回絕對值|
  |acos()                   |反餘弦函數|
  |asin()                   |反正弦函數|
  |atan()                   |反正切函數|
  |ceil()                   |傳回大於或等於參數的最小整數|
  |cos()                    |餘弦函數|
  |exp()                    |自然數的指數 $\ e^2 $ |
  |floor()                  |傳回大於或等於參數的最大整數|
  |log()                    |自然對數|
  |pow()                    |次方|
  |sin()                    |正弦函數|
  |sqrt()                   |傳回參數的平方根|
  |tan()                    |正切函數|

### 6. JavaScript 的 Error 物件

例外處理(Exception Handling) 是JavaScript 的錯誤控制機構，當程式碼有錯誤時，可以在程式出錯時提供解決方案。

#### 6.1 JavaScript 的例外處理

JavaScript 的 Error 物件可以取得執行時的錯誤資料，建立 JavaScript 程式碼的例外處理。

##### 6.1.1 Error 物件

- Error 物件儲存 JavaScript 執行時產生的錯誤資訊，當 JavaScript 執行階段的錯誤產生後，Error 物件會自動建立，此物件的屬性說明，如下表所示。

  |   屬性    | 說明                             |
  |:----------|:---------------------------------|  
  |number     |錯誤碼，這是一個 32-bit 值，其中後 16-bit 才是真正的錯誤碼|
  |message    |錯誤訊息字串|
  |description|如同 message 屬性，這也是錯誤說明的字串|

##### 6.1.2 JavaScript 例外處理程式敘述

- JavaScript 例外處理程式敘述是: `try/catch/finally` 可以處理 JavaScript 執行階段的錯誤，如下所示:

  ```javascript
  try{
    ...
  }catch(e){
    ...
  }finally{
    ...
  }
  ```

  上述例外處理敘述可以分為三個程式區塊，如下所示:
- try 程式區塊: 在此區塊的程式碼是 JavaScript 需要例外處理的程式碼。
- catch 程式區塊: 如果try程式區塊的程式碼發生錯誤，在這個程式碼區塊傳入的參數e是Error物件，可以取得Error物件屬性的錯誤資訊，並且建立例外處理的程式碼。
- finally 程式區塊: 這是一個選擇性的程式區塊，不論例外是否產生，都會執行此區塊的程式碼。

- 範例:
  使用 `try/catch/finally` 程式敘述建立 JavaScript 執行階段的例外處理。

  ```html
  <h2>JavaScript的例外處理</h2>
  <hr/>
  <script>
  var x = 10;
  try { 
     x = y;  // 測試的錯誤程式碼
  }
  catch(e) {
     // 例外處理的程式碼
     document.write("錯誤碼: " + (e.number & 0xFFFF) + "<br/>");
     document.write("錯誤說明(message): " + e.message + "<br/>");
     document.write("錯誤說明(description): " + e.description + "<br/>");
  }
  finally {
     // 顯示測試值
     document.write("<hr/>測試值x = " + x + "<br/>");
  }
  </script>

  ```

  上述可以看到取得 Error 物件顯示的錯誤訊息，測試變數 x 的值為 10。

#### 6.2 JavaScript 多層的例外處理架構

- JavaScript 可以使用 try/catch/finally 程式敘述建立多層例外處理架構，例如: 兩層例外處理架構，如下所示:

  ```javascript
  try{
    ...
    try{
      throw 運算式
    }catch(e){
      //第二層的例外處理
      ...
      throw(e); //丟到外層的例外處理
    }
  }catch(e){
    //第一層的例外處理
    ...
  }finally{
    ...
  }
  ```

  上述程式區塊擁有兩層例外處理敘述，第二層try程式區塊使用 throw 關鍵字產生使用者自訂的錯誤訊息。

  在第二層catch程式區塊可以處理第二層try程式區塊的錯誤，如果不屬於第二層處理的錯誤，就使用throws關鍵字將錯誤丟到上一層catch程式區塊進行處理。

- 範例
  使用兩層 `try/catch/finally` 程式敘述，第一層是 JavaScript 執行階段的例外處理；第二層是使用者自訂的例外處理。

  ```html
  <h2>JavaScript多層的例外處理架構</h2>
  <hr/>
  <script>
  var x = 0;
  // 第一層例外處理
  try {
     // 第二層例外處理
     try {
        if(x == 0)
           // 程式產生的錯誤訊息   
           throw "x等於零";   
        else
           x = y;
     }
     catch(e) {
         // 第二層的例外處理, 處理程式產生的錯誤
         if(e == "x等於零"){
             document.write("第二層的例外處理 : <br/>");
             document.write("自訂的錯誤說明: " + e + "<br/>"); 
         }
         else  
             // 非內部處理的例外
             throw e;  // 丟到外層的例外處理 
     }   
  }
  catch(e) {
     // 第一層的例外處理, JavaScript的執行錯誤
     document.write("第一層的例外處理 : <br/>");   
     document.write("錯誤碼: " + (e.number & 0xFFFF) + "<br/>");
     document.write("錯誤說明: " + e.description + "<br/>");
  }
  finally {
     // 顯示測試值
     document.write("<hr/>測試值x = " + x + "<br/>");
  }
  </script>
  ```

  在上例可以看到測試變數x的值為1。所以顯示第一層的例外處理。錯誤訊息為 Error 物件的屬性，如果更改為 x =0, 此時的錯誤訊息是自訂的例外訊息。

### 7. 物件的共用屬性和方法

JavaScript 內建物件擁有一些共用屬性和方法，這些屬性和方法可以使用在大部分的內建物件。

#### 7.1 JavaScript 物件的共用屬性

- JavaScript 物件的 `constructor` 屬性是共用屬性，constructor 屬性可以取得建立物件使用的建構函數名稱，JavaScript 內建物件除了 Global 和 Math 物件外都支援此屬性。

- 在使用 new 運算子建立 test 物件後，就可以使用 if 條件檢查物件的建構函數，如下所示:

  ```javascript
  if(test.constructor == String){
    ....
  }
  ```

  上述 JavaScript 程式碼檢查物件的建構函數是否為 String()。

#### 7.2 JavaScript 物件的共用方法

JavaScript 物件常用的共用方法有 toString() 和 valueOf()，這兩個方法可以顯示物件內容。

- toString() 方法
  toString() 方法可以傳回物件的內容，傳回值為字串，其語法如下所示:

  ```javascript
  object.toString();
  ```

  上述程式碼可以輸出物件內容的字串，各內建物件輸出的內容，如下所示:

  |    物件   | 傳回字串                             |
  |:---------|:-------------------------------------|  
  |Array     |將陣列元素轉換成「,」符號分隔的字串       |
  |Boolean   |true傳回字串"true";false 傳回字串"false"|
  |Date      |傳回日期和時間的字串                     |
  |Error     |傳回錯誤訊息的字串                      |
  |Function  |傳回字串格式"function name(){...}",其中 name 為呼叫toString()方法的函數名稱|
  |Number    |傳回數值字串                           |
  |String    |傳回Sring物件的內容                    |
  
- valueOf() 方法
  valueOf() 方法可以傳回物件值，不過 Math 和 Error 物件不支援 valueOf() 方法，其語法如下所示:

  ```javascript
  object.valueOf();
  ```

  上述程式碼可以輸出物件內容，各內建物件輸出的內容，如下所示:

  |    物件   | 傳回字串                             |
  |:---------|:-------------------------------------|  
  |Array     |將陣列元素轉換成「,」符號分隔的字串，如同Array.toString()和Array.join()方法|
  |Boolean   |傳回布林值|
  |Date      |傳回前晚到現在的秒數，以千分之一秒為單位   |
  |Function  |傳回函數的本身|
  |Number    |傳回數字     |
  |Object    |傳回物件本身  |
  |String    |傳回字串     |

## 事件

### 事件類型

1. 傳統的事件
   早已經存在並受到廣泛支援的事件。

   - windows 事件
     |事件名稱 (JS)  | 事件名稱 (jQuery)  | 說明  |
     |:-------------|:------------------|:-------|
     | onload       | load              |載入事件(HTML/IMG 影像/外部樣式表 全部載入完成)  |
     | unonload     | unload            |當瀏覽器移除視窗或框架內的網頁時會觸發此事件  |
     | onfocus      | focus             |當焦點移到瀏覽器視窗時會觸發此事件  |
     | onblur       | blur              |當焦點從瀏覽器視窗移開時會觸發此事件    |
     | onerror      | error             |當瀏覽器視窗發生錯誤時會觸發此事件    |
     | onscroll     | scroll            |當瀏覽器視窗捲動時會觸發此事件    |
     | onresize     | resize            |當瀏覽器視窗改變大小時會觸發此事件    |

     > `focus`，`blur`，`error` 等事件也可能在其他元素上觸發(例如: `<input>`)，而 `scroll` 事件也可能在其他可捲動的元素上觸發

   - 鍵盤事件
     |事件名稱 (JS)  | 事件名稱 (jQuery)  | 說明  |
     |:-------------|:------------------|:-------|
     | onkeydown    | keydown           |當使用者在元素上按下按鍵時會觸發此事件  |
     | onkeyup      | keyup             |當使用者在元素上放開按鍵時會觸發此事件  |
     | onkeypress   | keypress          |當使用者在元素上按下再放開按鍵時會觸發此事件  |

   - 滑鼠事件
     |事件名稱 (JS)  | 事件名稱 (jQuery)  |說明 |
     |:-------------|:------------------|:------|
     | onmousedown  | mousedown         |當使用者在元素上按下滑鼠按鍵時會觸發此事件  |
     | onmouseup    | mouseup           |當使用者在元素上放開滑鼠按鍵時會觸發此事件  |
     | onmouseover  | mouseover         |當使用者將滑鼠移過元素時會觸發此事件  |
     | onmousemove  | mousemove         |當使用者將滑鼠在元素上移動時會觸發此事件  |
     | onmouseoou   | mouseout          |當使用者將滑鼠從元素上移開時會觸發此事件 |
     | onmouswheel  | mousewheel        |當使用者在元素上滾動滑鼠滾輪時會觸發此事件  |
     | onclick      | click             |當使用者在元素按一下滑鼠按鍵時會觸發此事件  |
     | onmouswheel  | mousewheel        |當使用者在元素按兩下滑鼠按鍵時會觸發此事件  |

   - 表單事件
     |事件名稱 (JS)  | 事件名稱 (jQuery)  |說明 |
     |:-------------|:------------------|:------|
     | onsubmit     | submit            |當使用者傳送表單時會觸發此事件  |
     | onreset      | reset             |當使用者清除表單時會觸發此事件  |
     | onselect     | select            |當使用者在文字欄位選取文字時會觸發此事件  |
     | onchange     | change            |當使用者在修改表單欄位時會觸發此事件  |
     | onfocus      | focus             |當焦點移到表單欄位時會觸發此事件  |
     | onblur       | blur              |當焦點從表單欄位移開時會觸發此事件  |

2. HTML5 事件
   HTML5 提供 API 功能，新增許多事件處理。
   例如: 對影像與聲音的 Video/Audio API 新增:
   `loadstart`，`progress`，`suspend`，`abort`，`error`，`emptied`，`stalled`，`loadedmetadata`，`loadeddata`，`canplay`，`canplaythrough` 等事件。

3. DOM 事件
   指的是 W3C 提出的 Document Object Model(DOM)Level 3 Events Specification，除了將傳統的事件標準化之外，還新增一些新的事件，例如:
   `focusin`，`focusout`，`mouseenter`，`mouseleave`，`textinput`，`wheel` 等，可以參考官方文件: `http://www.w3.org/TR/uievents`

4. 觸控事件
   指針對平、手機裝置，由 W3C 所制定的觸控規格，裡面主要有 `touchstart`，`touchmove`，`touchend`，`touchcancel` 等事件。
   參考網站: `http://www.w3.org/TR/touch-events/`， Apple 或 iPad 可參考 `https://developer.apple.com/`

### 加入監聽事件

- JS
  `.addEventListener("事件名稱",函數[,useCapture])`
   >useCapture: false 預設，表示當內層和外層元素都有發生指定的事件時，先從內層元素開始執行處理程式

- jQuery
  `.bind("事件名稱",函數)`                **只能對當前頁面上已有的元素添加事件綁定**

### 移除監聽事件
  
- JS
  `removeEventListener("事件名稱",函數名稱[,useCapture]);`
  
- jQuery
  `.unbind("事件名稱",函數名稱);`          **移除該事件上綁定的所有監聽函數**
  `.unbind();`                           **移除該元素上所有事件綁定**
  
> 強調: 要想移除事件監聽, 必須使用有名的函數綁定事件監聽；如果添加事件監聽時使用的是匿名函數,則不可能移除。

### 實用範例

1. 列印網頁

   ```javascript
   
   
   ```
