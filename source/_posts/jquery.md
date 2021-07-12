---
title: jquery
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-11-16 13:26:40
urlname: jquery
author:
img:
coverImg:
password: 5616b70ad3dda5e6509877de73ccd63eddb79073a6749dcbd1ec23f1bbb0856a
summary:
tags: jquery
categories: jquery
---
 

## 1. jQuery 基本概念

> 學習目標：學會如何使用 jQuery，掌握 jQuery 的常用 api，能夠使用 jQuery 實現常見的效果。

### 1.1 為什麼要學習 jQuery?

- 【01-讓div 顯示與設置內容(JS).html】

- 使用 javascript 開發過程中，有許多的缺點：

  ```javascript
  1. 查找元素的方法太少，麻煩。
  2. 遍歷偽陣列很麻煩，通常要嵌套一大堆的for迴圈。
  3. 有相容性問題。
  4. 想要實現簡單的動畫效果，也很麻煩
  5. 代碼冗餘。
  ```

### 1.2 jQuery 初體驗

- 【02-讓div顯示與設置內容(jQuery).html】

- 範例

  ```javascript
  $(document).ready(function () {
    $("#btn1").click(function () {
    //隱式反覆運算：偷偷的遍歷，在jQuery中，不需要手動寫for迴圈了，會自動進行遍歷。
        $("div").show(200);
    });

    $("#btn2").click(function () {
        $("div").text("我是內容");
    });
  });
  ```

- 優點總結：

  ```javascript
  1. 查找元素的方法多種多樣，非常靈活
  2. 擁有隱式反覆運算特性，因此不再需要手寫for迴圈了。
  3. 完全沒有相容性問題。
  4. 實現動畫非常簡單，而且功能更加的強大。
  5. 代碼簡單、粗暴。
  ```

> 沒有對比，就沒有傷害，有了對比，處處戳中要害。

### 1.3 什麼是 jQuery?

- > jQuery的官網 [http://jquery.com/](http://jquery.com/)
- > jQuery就是一個js庫，使用jQuery的話，會比使用JavaScript更簡單。

- `js` 庫：把一些常用到的方法寫到一個單獨的 `js` 檔，使用的時候直接去引用這 `js` 檔就可以了。（animate.js、common.js）

&emsp;&emsp;我們知道了，`jQuery` 其實就是一個 `js` 檔，裡面封裝了一大堆的方法方便我們的開發，其實就是一個加強版的 `common.js`，因此我們學習 `jQuery`，其實就是學習 `jQuery` 這個 `js` 檔中封裝的一大堆方法。

### 1.4 jQuery 的版本

- > 官網下載地址：[http://jquery.com/download/](http://jquery.com/download/)
- > `jQuery` 版本有很多，分為 1.x 2.x 3.x

- 大版本分類：

  ```javascript
  1.x 版本：能夠相容IE678流覽器
  2.x 版本：不相容IE678流覽器
  1.x 和 2.x 版本 `jquery` 都不再更新版本了，現在只更新 `3.x` 版本。

  3.x 版本：不相容 IE678，更加的精簡（在國內不流行，因為國內使用 jQuery 的主要目的就是相容IE678）
  ```

- 關於壓縮版和未壓縮版

  ```javascript
  jquery-1.12.4.min.js:壓縮版本，適用於生產環境，因為檔比較小，去除了注釋、換行、空格等東西，但是基本沒有顆閱讀性。
  jquery-1.12.4.js:未壓縮版本，適用于學習與開發環境，源碼清晰，易閱讀。
  ```

### 1.5 `jQuery` 的入口函數

- 使用 `jQuery` 的三個步驟：

  ```javascript
  1. 引入 `jQuery` 文件
  2. 入口函數
  3. 功能實現
  ```

- 關於jQuery的入口函數：

  ```javascript
  //第一種寫法
  $(document).ready(function() {

  });
  //第二種寫法
  $(function() {

  });
  ```

- `jQuery` 入口函數與 `js` 入口函數的對比

  ```javascript
  1. JavaScript的入口函數要等到頁面中所有資源（包括圖片、檔案）載入完成才開始執行。
  2. jQuery的入口函數只會等待文檔樹載入完成就開始執行，並不會等待圖片、檔的載入。
  ```

### 1.6 `jQuery` 物件與 `DOM` 物件的區別（重點）

- 歸納

  ```javascript
  1. DOM 對象：使用 JavaScript 中的方法獲取頁面中的元素返回的物件就是 DOM 物件。
  2. jQuery 對象：jquery 物件就是使用 jquery 的方法獲取頁面中的元素返回的物件就是 `jQuery` 物件。
  3. jQuery 物件其實就是 DOM 物件的包裝集（包裝了 DOM 物件的集合（偽陣列））
  4. DOM 物件與 jQuery 物件的方法不能混用。
  ```

- `DOM` 物件轉換成 `jQuery` 物件：

  ```javascript
  var $obj = $(domObj);
  // $(document).ready(function(){});就是典型的DOM物件轉jQuery物件

  ```

- `jQuery` 物件轉換成 `DOM` 物件：

  ```javascript
  var $li = $("li");
  //第一種方法（推薦使用）
  $li[0]
  //第二種方法
  $li.get(0)
  ```

- 【練習：隔行變色案例.html】

### 1.7 `$` 符號的實質

- `$` 符號代表是什麼 ?
  
  ```javascript
  $(function () {

  });
  console.log(typeof $);
  ```

  - 結果
    function

- `$` 其實就是一個函數，以後用$的時候，記得跟小括弧 $();
  這函式能作什麼，依參數不同，功能就不同，有 3 種功能。
  
  ```javascript
  1. 入口函式。
  2. 把 dom 物件轉換成 jquery 物件。
  3. 用來找物件。
  
- 參數不同，功能就不同，3 種用法

 1. 參數是一個 function, 入口函數

    ```javascript
    $(function(){

    });
    ```

 2. 參數可以是一個 `DOM` 對象, 把 `DOM` 物件轉換成 `jquery` 物件

    ```jajascript  
    $(document).ready(function () {
  
    });
    ```

    >$(document) 把 `DOM` 的 `document` 物件轉換成 `jQ` 對象, 所以就可用 `jQ` 的 `ready()` 方法。

 3. 參數是一個字串(有一定格式),用來找物件。

    ```javascript
    $("div"); $("div ul"); $(".current");
    ```

### 1.8 選擇器

#### 1.8.1 什麼是 `jQuery` 選擇器

- `jQuery` 選擇器是 `jQuery` 為我們提供的一組方法，讓我們更加方便的獲取到頁面中的元素。注意：- `jQuery` 選擇器返回的是 `jQuery` 物件。

- `jQuery` 選擇器有很多，基本相容了 `CSS1` 到`CSS3` 所有的選擇器，並且 `jQuery` 還添加了很多更加複雜的選擇器。【查看 `jQuery` 文檔】

- `jQuery` 選擇器雖然很多，但是選擇器之間可以相互替代，就是說獲取一個元素，你會有很多種方法獲取到。所以我們平時真正能用到的只是少數的最常用的選擇器。

> 找 jQuery 對象與有許多方法。

#### 1.8.2 基本選擇器

- 基本選擇器
  | 名稱       | 用法               | 描述                            |
  | ----------| ------------------ | :------------------------------ |
  | ID選擇器   | $("#id");          | 獲取指定ID的元素                 |
  | 類別選取器 | $(".class");       | 獲取同一類class的元素             |
  | 標籤選擇器 | $("div");          | 獲取同一類標籤的所有元素           |
  | 聯集選擇器 | $("div,p,li");     | 使用逗號分隔，只要符合條件之一就可。 |
  | 交集選擇器 | $("div.redClass"); | 獲取 class 為 redClass 的div元素      |

> 總結：跟 `css` 的選擇器用法一模一樣。

### 1.9 層級選擇器

- 層級選擇器
  | 名稱     | 用法       | 描述                                                    |
  |----------|-----------|:--------------------------------------------------------|
  |子代選擇器 |$("ul>li");|使用 > 號，獲取兒子層級的元素，注意，並不會獲取孫子層級的元素   |
  |後代選擇器 |$("ul li");|使用空格， 代表後代選擇器，獲取 ul 下的所有 li 元素，包括孫子等 |

> 跟 CSS 的選擇器一模一樣。

- 表單選擇器
  例一 `.disabled` 查找所有不可用 `input` 元素。

  ```html
  <form>
    <input type="email" name="email" disabled="disabled"  />
    <input type="text" name="id" />
  </form>
  ```

  ```jquery
  $("input:disabled")
  ```

  - 結果
    `[ <input type="email" name="email" disabled="disabled" />]`
<br>
  例二 `.enabled` 查找所有可用 `input` 元素。

  ```html
  <form>
    <input type="email" name="email" disabled="disabled" />
    <input type="text" name="id" />
  </form>
  ```

  ```jquery
  $("input:enabled")
  ```

  - 結果
    `[<input type="text" name="id" />]`

### 1.10 過濾選擇器

- 這類別選取器都帶冒號:

  | 名稱         | 用法                                | 描述                                                        |
  | ------------ | ----------------------------------- | :---------------------------------------------------------- |
  | :eq（index） | $("li:eq(2)").css("color", "red");  | 獲取到的li元素中，選擇索引號為2的元素，索引號index從0開始。 |
  | :odd         | $("li:odd").css("color", "red");    | 獲取到的li元素中，選擇索引號為奇數的元素                    |
  | :even        | $("li:even").css("color", "red");   | 獲取到的li元素中，選擇索引號為偶數的元素                    |

【案例：隔行變色】

### 1.11 篩選選擇器(方法)

- 篩選選擇器(方法)
  > 篩選選擇器的功能與過濾選擇器(對象都是用字串包起來)有點類似，但是用法不一樣，篩選選擇器主要是方法。

  | 名稱                 | 用法                        | 描述                              |
  |:-------------------- |:----------------------------|:----------------------------------|
  | children(selector)   | $("ul").children("li")      | 相當於$("ul>li")，子類別選取器    |
  | find(selector)       | $("ul").find("li");         | 相當於$("ul li"),後代選擇器       |
  | siblings(selector)   | $("#first").siblings("li"); | 查找兄弟節點，不包括自己本身。    |
  | parent()             | $("#first").parent();       | 查找父親                          |
  | eq(index)            | $("li").eq(2);              | 相當於$("li:eq(2)"),index從0開始  |
  | next()               | $("li").next()              | 找下一個兄弟                      |
  | prev()               | $("li").prev()              | 找上一次兄弟                      |

### 1.12 下拉式選單案例

- **`mouseenter` 與 `mouseover` 的區別**

### 1.13 突出展示案例

### 1.14 視窗褶合展示

### 1.15 精品展示案例

### 1.16 index()方法詳述

### 1.17 複習

### 1.18 `jQuery` 的除錯

- `jQuery` 執行不會報任何錯誤，因為 `JS` 中程式碼任一行有錯誤就會停止後面的指令繼續執行。

- 會什麼在 `JS` 中，執行有錯誤會報錯而 `jQuery` 不會呢?
  `JS` 找不到對象時會返回 NONE，針對這 NONE 對象是不能做任何事情的且會報錯，但是 `JQ` 即使找不到對象也是返回一個 jQuery 對象，只是裡面沒有內容值(屬性或方法..et)，即 `.length=0`。例如: `jQuery.fn.init[0]`。

- `jQuery` 會出現問題只有找不到對象，那如何除錯呢?

  1. 使用 `console.log()` 或 alert()。
  2. 使用瀏覽器除錯模式中的斷點功能，檢查所有選取對象是否有找到對象的**內容**。

### 1.19 總結

- `jquery`: 簡單、粗暴
  
  `jq` 和 `js` 的關係
  `js` 是什麼？ `js` 是一門程式設計語言
  `jq` 僅僅是基於 `js` 的一個庫，`jq` 可理解為就是開發 `js` 的一個工具。
  
- 概念
  1. 為什麼要學 `jquery` ？ 簡單，粗暴 沒有相容性問題
  2. 什麼是 `jquery`？ `js` 庫，說白了就是 `js` 檔，裡面有一大堆的方法
  3. 使用 `jquery` 的步驟：  1. 引入 `jquery` 文件 2. 入口函數 功能實現
  4. 版本：1.x 2.x 3.x   1.x   壓縮版和未壓縮版
  5. 入口函數：  `$(document).ready(function)`，  `$(function(){})`
  6. `jQuery` 物件與 `DOM` 物件
     區別：方法不能混用
     聯繫： `DOM --> jq`   花錢，  jq--> dom  [0]， get(0)
  
- `$` 的實質：`function`

  ```javascript  
  console.log($ === jQuery);
  $(function () {

  });
  ```
  
- 選擇器
  
  1. 基本選擇器:  標籤、類別、id選擇器、交集、並集。
  2. 層級選擇器： 子代、後代  
  3. 過濾選擇器：
     :odd:奇數  even:偶數  :eq：指定下標
     :first  :last  :gt  :lt

  4. 篩選選擇器
     children(): 找兒子
     find():     找後代(兒子、孫子)
     parent():   找爹
     siblings(): 找兄弟，不包括自己
     next:       下一個兄弟
     prev:       上一次兄弟
     eq:         指定下標

- `index()`：返回的當前元素在所有兄弟裡面的索引。

---

## 2. `jQuery` 操作(樣式、屬性、動畫、節點)

### 2.1 `jQuery` 的操作樣式

#### 2.1.1 `css` 操作

&emsp;&emsp;&emsp;功能: 設置或者修改樣式，操作的是 `style` 屬性

- 操作單個樣式

  ```javascript
  //name: 需要設置樣式名稱
  //value: 對應的樣式值
  css(name, value);
  //案例
  $('#one').css("background", "gray");  //背景樣式修改為灰色
  ```

- 設置多個樣式

  ```javascript
  //參數是一個對象，對象中包含了需要設置的樣式名稱和樣式值
  css(obj);
  //案例
  $('#one').css({
    "background", "gray",
    "width","400px",
    "height", "200px"
  });
  ```

- 獲取樣式

  ```javascript
  //name: 需要獲取樣式的名稱
  `css(name)`;
  //案例
  $("div").css("background-color");
  ```

  >注意: 獲取樣式操作只會返回第一個元素對應的樣式值。

- 隱式迭代:
  
  1. 設置操作的時候，如果是多個元素，那麼給所有的元素設置相同的值。
  2. 獲取操作的時候，如果是多個元素，那麼只會返回第一個元素的值。

#### 2.1.2. `class` 操作

&emsp;&emsp;&emsp;改樣式可用 `css();` 或 `class()` 來修改，但 `class()` 適用於有多個樣式時用(直接定義一個類別)。

- `案例: 2.1.2 class 操作.html`

- 添加樣式類別

  ```javascript
  //name:需要填加的樣式類名，注意參數不要帶點 .
  addClass("name");
  //案例，給所有的div 添加 one 的樣式
  $("div").addClass("one");
  ```

- 移除樣式類別
  
  ```javascript
  //name:需要移除的樣式類別名稱
  removeClass("name");
  //案例，移除 div 中 one 的樣式類別名稱
  $("div").removeClass("one");
  ```

- 判斷是否有某個樣式類別
  
  ```javascript
  //name:用於判斷的樣式類別名稱，返回值為 true false
  hasClass("name");
  //案例，判斷第一個 div 是否有 one 的樣式類別
  $("div").hasClass("one");
  ```

- 切換樣式類別
  
  ```javascript
  //name:需要切換的樣式類別，如果有，移除該樣式，如果沒有，添加該樣式
  toggleClass("name");
  //案例，判斷第一個 div 是否有 one 的樣式類別
  $("div").toggleClass("one");
  ```

- 【案例: tab 檔切換案例】  

### 2.2. jQuery 操作屬性

#### 2.2.1. attr 操作

- 設置單個屬性

  ```javascript
  //第一個參數: 需要設置的屬性名稱
  //第二個參數: 對應的屬性值
  attr("屬姓名稱", "屬性值");
  //案例
  $("img").attr("title", "Hello");
  $("img").attr("alt",   "World");
  ```

- 設置多個屬性

  ```javascript
  //參數是一個對象，包含了需要設置的屬性名稱和屬性值。
  attr("屬姓名", "屬性值");
  //案例
  $("img").attr({
    "alt": "World",
    "title": "Hello",
    "style": "opacity: .5"
  });
  ```

- 獲取屬性
  
  ```javascript
  傳需要獲取的屬性名稱，返回對應的屬性值。
  ```

- 【案例: 美女相冊案例】
  
#### 2.2.2. prop 操作

- 【案例: 表格全選案例】

### 2.3 jQuery 動畫

`jQuery` 提供了三組動畫，這些動畫都是標準的、有規律的效果，jQuyery 孩提供了自定義動畫的功能。

- 【案例: 演示 jQuery 動畫】

#### 2.3.1 三組基本動畫

##### 2.3.1.1 顯示(show)與隱藏(hide)是一組動畫

##### 2.3.1.2 滑入(slideUp)與滑出(slideDown)，效果與捲窗門類似

##### 2.3.1.3 淡入(fadeIn)與淡出(fadeOut)與切換 (slideToggle)

- 語法
  
  ```javascript
  show([speed], [callback]);
  //speed(可選):動畫的執行時間
  // 1. 如果不傳，就沒有動畫效果。如果是 slide 和 fade 系列，預設是 normal。
  // 2. 毫秒值(比如 1000), 動畫在 1000 毫秒執行完成(建議)
  // 3. 固定字串，slow(600)，normal(400)，fast(200), 如果傳其他字串，則預設為 normal
  // callback(可選): 執行完成動畫後執行的回調函數。
  ```

  **【案例:下拉菜單動畫版】**
  **【案例:幻燈片案例】**

#### 2.3.2 自定義動畫

- `animate` 自定義動畫

- 語法

  ```javascript
  $(selector).animate({params}, [speed],[easing], [callback]);
  // {params}: 要執行動畫的  CSS 屬性，帶數字(必填)
  // speed: 執行動畫時長(可選)
  // easing: 執行效果，預設為swing(緩動) 可以是 linear(均速)
  // callback: 動畫執行完後立即執行回調函數(可選)
  ```

#### 2.3.3 動畫佇列與停止動畫

- **【案例:手風琴特效】**

##### 2.3.3.1 動畫佇列

##### 2.3.3.2 stop() 使用

- 在同一個元素上執行多個動畫，那麼對於這個動畫來說，後面的動畫會被放到動畫佇列中，等前面的動畫執行完成了才會執行。

- 語法
  
  ```javascript
  //stop 方法: 停止當前正在執行動畫
  stop(clearQueue,  jumpToEnd);
  //第一個參數: 是否清除佇列
  //第二個參數: 是否跳轉到最終效果
  ```

##### 2.3.3.3 停止動畫

- **【案例:音樂導航】**

### 2.4 jQuery 節點操作

#### 2.4.0 動態創建節點

#### 2.4.1 `jquery` 創建與添加節點

- 創建節點
- 說明
  
  ```javascript
  //$(htmlstr)
  //htmlstr: html 格式的字符串
  $("<span>這是一個span元素</span>")
  ```

- 添加節點
- 說明
  
  ```javascript
  //append appendTo
  //append prepentto
  //before
  //after
  ```

  **【城市選擇案例】**

#### 2.4.2 清空節點與刪除節點

- 說明
  
  empty: 清空指定節點的所有元素，自身保留(清理門戶)。

  ```javascript
  $("div").empty();  // 清空 div 的所有內容(建議使用，會清除子元素上綁定的內容)
  $("div").html(""); // 使用 html 方法來清除元素，不建議使用，會造成記憶體 leak,綁定的事件不會被清除。
  ```

  >remove: 相對於 empty, 自身也刪除(自殺)

  ```javascript
  $("div").remove();
  ```

#### 2.4.3 克隆節點

- 作用: 複製匹配的元素

  ```javascript
  //複製$(selector)所匹配到的元素(深度複製)
  //cloneNode(true)
  //返回值為複製的新元素，和原來的元素沒有任何關係了。即修改新元素，不會影響到原來的元素。
  $(selector).clone();
  ```

  **【微博發佈案例】**
  **【彈幕效果案例】**

---

## 3. `jQuery` 特殊屬性操作、`jQuery` 事件機制、`jQuery` 補充知識點

### 3.1 `jQuery` 特殊屬性操作

#### 3.1.1 複習

#### 3.1.2 `val` 方法

- `val` 方法用於設置和獲取表單元素的值，例如 `input`、`textarea` 的值。
  
  ```javascript
  //設置值
  $("#name").val("張三");
  //獲取值
  $("#name").val();
  ```

  【示範案例：京東搜索】

#### 3.1.3 `html` 方法與 `text` 方法

- `html` 方法相當於 `innerHTML`，  `text` 方法相當於 `innerText`

  ```javascript
  //設置內容
  $("div”).html("<span>這是一段內容</span>”);
  //獲取內容
  $("div”).html()

  //設置內容
  $("div”).text("<span>這是一段內容</span>”);
  //獲取內容
  $("div”).text()
  ```
  
  >區別：`html` 方法會識別 `html` 標籤，`text` 方法會那內容直接當成字串，並不會識別 `html` 標籤。

#### 3.1.4 `width` 方法與 `height` 方法

- 設置或者獲取高度

  ```javascript
  //帶參數表示設置高度
  $("img").height(200);
  //不帶參數獲取高度
  $("img").height();
  ```

- 獲取網頁的可視區寬高
  
  ```javascript
  //獲取可視區寬度
  $(window).width();
  //獲取可視區高度
  $(window).height();
  ```

#### 3.1.5 `scrollTop` 與 `scollLeft` 方法

- 設置或者獲取垂直捲動條的位置

  ```javascript
  //獲取頁面被捲曲的高度
  $(window).scrollTop();
  //獲取頁面被捲曲的寬度
  $(window).scrollLeft();
  ```

  【案例：3.1.8 仿騰訊固定功能表列案例】
  【案例：3.1.7 小火箭返航案例】

#### 3.1.6 `offset` 方法與 `position`

- `offset` 方法獲取元素距離 `document` 的位置，`position` 方法獲取的是元素距離有定位的父元素的位置。

  ```javascript
  //獲取元素距離document的位置,返回值為物件：{left:100, top:100}
  $(selector).offset();
  //獲取相對於其最近的有定位的父元素的位置。
  $(selector).position();
  ```
  
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/offset_position.jpg' width='80%' height='40%' class='nofancybox img-center' />
  
#### 3.1.7 小火箭返回頂部案例

#### 3.1.8 固定導航案例

### 3.2 `jQuery` 事件機制

&emsp;&emsp;`JavaScript` 中已經學習過了事件，但是 `jQuery` 對 `JavaScript` 事件進行了封裝，增加並擴展了事件處理機制。`jQuery` 不僅提供了更加優雅的事件處理語法，而且極大的增強了事件的處理能力。

#### 3.2.1 `jquery` 事件機制的發展歷程

- 歷程　簡單事件綁定 -> `bind` 事件綁定  ->  `delegate` 事件綁定 -> `on` 事件綁定(推薦)

- `簡單事件`註冊

 ```javascript
　click(handler)        按一下事件
　mouseenter(handler)   滑鼠進入事件
　mouseleave(handler)   滑鼠離開事件
 ```

　缺點：不能同時註冊多個事件

- `bind` 方式註冊事件

  ```javascript
  //第一個參數：事件類型
  //第二個參數：事件處理常式
  $("p").bind("click mouseenter", function(){
     //事件回應方法
  });
  ```

  缺點：不支援動態事件綁定

- `delegate` 註冊委託事件

  ```javascript
  // 第一個參數：selector，要綁定事件的元素
  // 第二個參數：事件類型
  // 第三個參數：事件處理函數
  $(".parentBox").delegate("p", "click", function(){
    //為 .parentBox下面的所有的p標籤綁定事件
  });
  ```

  缺點：只能註冊委託事件，因此註冊時間需要記得方法太多了

#### 3.2.2 `on` 註冊事件的兩種方式

&emsp;&emsp;可以執行簡單自己註冊事件與委託代理事件。

- `on` 註冊事件(重點)

  > `jQuery1.7` 之後，`jQuery` 用 `on` 統一了所有事件的處理方法。
  > 最現代的方式，相容 `zepto`(移動端類似 `jQuery` 的一個庫)，強烈建議使用。
  
  - `on 註冊簡單事件
  
    ```javascript
    // 表示給 $(selector) 綁定事件，並且由自己觸發，不支持動態繫結。
    $(selector).on("click", function() {});
    ```

  - `on` 註冊委託事件
  
    ```javascript
    // 表示給 $(selector) 綁定代理事件，當必須是它的內部元素 `span` 才能觸發這個事件，支持動態繫結
    $(selector).on("click", "span", function() {});
    ```

  - `on` 註冊事件的語法：
  
    ```javascript
    第一個參數：`events`，綁定事件的名稱可以是由空格分隔的多個事件（標準事件或者自訂事件）
    第二個參數：`selector`, 執行事件的後代元素（可選），如果沒有後代元素，那麼事件將有自己執行。
    第三個參數：`data`，傳遞給處理函數的資料，事件觸發的時候通過 `event.data` 來使用（不常使用）
    第四個參數：`handler`，事件處理函數。

    $(selector).on(events[,selector][,data],handler);
    ```

#### 3.2.3 事件的執行順序

#### 3.2.4 表格刪除功能

#### 3.2.5 移除事件綁定

- unbind方式（不用）

  ```javascript
  $(selector).unbind(); //解綁所有的事件
  $(selector).unbind("click"); //解綁指定的事件
  ```

- undelegate方式（不用）

  ```javascript
  $(selector).undelegate();         //解綁所有的 delegate 事件
  $(selector).undelegate("click");  //解綁所有的 click 事件
  ```

- off方式（推薦）

  ```javascript
  //解綁匹配元素的所有事件
  $(selector).off();
  //解綁匹配元素的所有click事件
  $(selector).off("click");_
  ```

#### 3.2.6 事件對象

- `jQuery` 事件物件其實就是js事件物件的一個封裝，處理了相容性。

  ```javascript
  //screenX和screenY        對應螢幕最左上角的值
  //clientX和clientY        距離頁面左上角的位置（忽視捲軸）
  //pageX和pageY            距離頁面最頂部的左上角的位置（會計算捲軸的距離）

  //event.keyCode           按下的鍵盤代碼
  //event.data              存儲綁定事件時傳遞的附加資料

  //event.stopPropagation() 阻止事件冒泡行為
  //event.preventDefault()  阻止流覽器默認行為
  //return false:           既能阻止事件冒泡，又能阻止流覽器預設行為。
  ```

#### 3.2.7 阻止冒泡和阻止瀏覽器的預設行為

#### 3.2.8 `delay` 的用法

### 3.3 `jQuery` 補充知識點

#### 3.3.1 鏈式編程

- 通常情況下，只有設置操作才能把鏈式程式設計延續下去。因為獲取操作的時候，會返回獲取到的相應的值，無法返回 `jQuery` 物件。

  ```javascript
  end(); // 篩選選擇器會改變 jQuery 物件的DOM物件，想要回復到上一次的狀態，並且返回匹配元素之前的狀態。
  ```

  【案例：五角星評分案例】

#### 3.3.2 五星評分案例

#### 3.3.3 `each` 方法

- `jQuery` 的隱式反覆運算會對所有的 `DOM` 物件設置相同的值，但是如果我們需要給每一個物件設置不同的值的時候，就需要自己進行反覆運算了。

  作用：遍歷 `jQuery` 物件集合，為每個匹配的元素執行一個函數
  
  ```javascript
  // 參數一表示當前元素在所有匹配元素中的索引號
  // 參數二表示當前元素（DOM物件）
  $(selector).each(function(index,element){});
  ```

  【案例：不同的透明度】

#### 3.3.4 `$` 衝突

- `jQuery` 使用 `$` 作為標示符，但是如果與其他框架中的$衝突時，`jQuery` 可以釋放 `$` 符的控制權.

  ```javascript
  var c = $.noConflict(); //釋放$的控制權,並且把$的能力給了c
  ```

#### 3.3.5 複習

---

## `jquery 插件`

- 常用插件

  插件：`jquery` 不可能包含所有的功能，我们可以通过插件扩展 `jquery` 的功能。
  `jQuery` 有着丰富的插件，使用这些插件能给 `jQuery` 提供一些额外的功能。

### 4.1 `jquery.color.js` 的使用

- animate不支持颜色的渐变，但是使用了jquery.color.js后，就可以支持颜色的渐变了。

  使用插件的步骤
  
  ```javascript
  1. 引入jQuery文件
  2. 引入插件（如果有用到css的话，需要引入css）
  3. 使用插件
  ```

### 4.2 `jquery.lazyload.js` 的使用

- 懒加载插件

### 4.3 `jqueryui` 實現新聞模塊

- `jQueryUI` 專指由 `jQuery` 官方維護的UI方向的插件。

- 官方 API：[http://api.jqueryui.com/category/all/](http://api.jqueryui.com/category/all/)

- 其他教程：[jQueryUI教程](http://www.runoob.com/jqueryui/jqueryui-tutorial.html)

- 基本使用:

  ```javascript
  1. 引入 `jQueryUI` 的樣式檔
  2. 引入 `jQuery`
  3. 引入 `jQueryUI` 的 `js` 文件
  4. 使用 `jQueryUI` 功能
  ```

  使用 `jquery.ui.js` 實現新聞模組的案例

### 4.4 原型初體驗

### 4.5 簡易版本的 `jquery` 插件

- 原理：`jquery` 外掛程式其實說白了就是給 `jquery` 物件增加一個新的方法，讓 `jquery` 物件擁有某一個功能。

  ```javascript
  //通過給 `$.fn` 添加方法就能夠擴展 `jquery` 物件
  $.fn. pluginName = function() {};

  ```

### 4.6 手風琴

### 4.7 手風琴測試

---

## `javascript` 與  `jquery` 的差異整理

|  功能  |   javascript                | 案例                        | jQuery                                            |   案例                                          |    描述
|--------|-----------------------------|-----------------------------|---------------------------------------------------|-------------------------------------------------|----------------
|樣式操作|style.樣式 = "樣式值";       |style.backgroundColor="red"; |css("樣式名","樣式值");                            |css("backgroundColor", "red")                    |設置單個樣式  
|        |                             |                             |css(obj)                                           |css({"backgroundColor":"red","fontSize":"15px"}) |設置多個樣式
|        |                             |                             |css("樣式名")                                      |css({"backgroundColor":"red","fontSize":"15px"}) |獲取樣式
|        |className = "樣式類別名稱"   |className ="aa bb cc dd";    |addClass("樣式名");                                |addClass("aa bb cc dd");                         |添加類
|        |                             |removeClass("樣式類名");     |removeClass("樣式名");                             |removeClass("one");                              |移除類
|        |                             |                             |hasClass("樣式名")                                 |                                                 |判斷類
|        |                             |                             |toggleClass("樣式名")                              |                                                 |切換類
|屬性操作|SetAttibute("屬性名","值");  |                             |attr("屬性名","值")                                |attr({"屬性名1","值1","屬性名2","值2" });        |用法與css一樣
|        |                             |                             |prop()                                             |                                                 |操作布林類型的屬性，disabled checked selected
|        |                             |                             |removeAttr()                                       |removeAttr:                                      |移除屬性
|動畫    |                             |                             |show/hide                                          |                                                 |
|        |                             |                             |slideDown/slideUp/slideToggle                      |                                                 |
|        |                             |                             |fadeIn/fadeOut/fadeToggle                          |                                                 |
|        |                             |                             |animate(prop, [speed], [swing/linear], [callback]) |                                                 |
|        |                             |                             |stop()                                             |                                                 |
|節點操作|                             |                             |$()                                                |                                                 |創建節點  
|        |                             |                             |append                                             |                                                 |添加節點
|        |                             |                             |appendTo                                           |                                                 |添加節點
|        |                             |                             |prepend                                            |                                                 |添加節點
|        |                             |                             |prependTo                                          |                                                 |添加節點  
|        |                             |                             |before                                             |                                                 |添加節點  
|        |                             |                             |after                                              |                                                 |添加節點  
|        |                             |                             |remove                                             |                                                 |刪除節點
|        |                             |                             |empty                                              |                                                 |清空節點
|        |                             |                             |clone()                                            |                                                 |克隆節點
|        |innerText                    |innerText = "Hello";         |text("Hello");
|        |innerHtml                    |innerHtml = "\<b>Hello\</b>";|html('<b>Hello</b>');                              |                                                 |
