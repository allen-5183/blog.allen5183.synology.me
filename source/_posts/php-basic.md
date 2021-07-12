---
title: PHP 基礎篇
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2021-04-07 20:50:50
urlname: php-basic
author: allen
img:
coverImg:
password:
summary:
tags:
- php
categories: php
---
 
## PHP 基礎

### 1. php 簡介

&emsp;&emsp;PHP，即 `PHP: Hypertext Preprocessor`，是一種被廣泛應用的開源通用指令碼語言，尤其適用於 `Web` 開發並可嵌入 `HTML` 中。
&emsp;&emsp;它的語法利用了 `C`、`Java` 和 `Perl`，易於學習。
&emsp;&emsp;該語言的主要目標是允許 web 開發人員快速編寫動態生成的 web 頁面，但 `PHP` 的用途遠不只於此。

### 2. php 概述與名詞解釋

#### 2.1 基本語法與名詞解釋

**php標記**：當 php 開始解析一個檔時，會尋找起始和結束標記，也就是 <font color='red'>\<?php</font> 和 <font
color='red'>?></font>。
&emsp;&emsp;&emsp;&emsp;&nbsp;這告訴 `php` 開始和停止解析二者之間的代碼。
&emsp;&emsp;&emsp;&emsp;&nbsp;此種解析方式使得 `php` 可以被嵌入到各種不同的文檔中，而任何起始和結束標記之外的部分都會被 `php` 解析器忽略。

**分隔符號**: `php` 需要在每個語句後用分號；結束指令，需要注意的是必須採用英文輸出。
**注釋方法**: `php` 的注釋雖然支持 `c`、`c++`、`unix shell` 風格等的注釋方法，但我們仍然保持在 `js` 中的注釋風格即可，其餘注釋方法暫且不提。
**輸出方法**: <font color='red'>echo </font>命令表示輸出，而寫在 `echo` 後面的代碼能夠直接被顯示出來。

#### 2.2 變數

- **描述**：變數是其所表示的值可以發生改變的量，
&emsp;&emsp;&emsp;在 php 中的變數用一個<font color='red'>美元符號</font>後面跟<font color='red'>變數</font>名來表示。
- **語法**：<font color='red'>$變數名稱</font>
- **規則**：變數名稱與 php 中其它的標籤一樣遵循相同的規則。
&emsp;&emsp;&emsp;一個有效的變數名由字母或底線開頭，後面跟上任意數量的字母，數位，或底線。
- **注意**：
&emsp;(1) `php` 中變數名稱是<font color='red'>大小寫敏感</font>的
&emsp;(2) `php` 中變數可以直接在寫出變數名稱後直接使用，而不需要 js 中的 "聲明賦值"過程。
&emsp;(3) `php` 中變數之間的賦值總是【賦值傳遞】，如果必須【地址傳遞】則需要使用 `&` 符號
&emsp;(4) `php` 中變數的作用域採用函數級作用域(暫時)。

- **例子**:

  ```php
  $var='allen';
  $Var=' welcome!';
  echo "$var,$Var";  // 輸出 "allen welcome!"
  ```

#### 2.3 常數

- **描述**：常數指在腳本執行期間該值不能改變的識別字。
&emsp;&emsp;&emsp;常數預設為大小寫敏感，傳統上常數識別字總是大寫的。
- **語法**：<font color='red'>define('常數名稱', '簡單值');</font>
- **規則**：常數名稱和其它任何 PHP 標籤遵循同樣的命名規則。
&emsp;&emsp;&emsp;合法的常數名稱以字母或底線開始，後面跟著任何字母，數位或底線。
- **注意**：
&emsp;(1) 常數實際上可以認為是【巨集定義】在php中的一個體現
&emsp;(2) 為了區分變數和常數，我們約定常數在定義時均使用大寫
&emsp;(3) php 中實際上並不是所有的常數的值都不能改變，MC(魔術常數)就能夠發生改變。

- **例子**：

  ```php
  define('FRANK', '沃德田·辣麼帥');
  echo FRANK;
  ```

  > 魔術常數: 這些常數的值會隨著它們在代碼中的位置改變而改變，這些魔術常數不區分大小寫，如下:

  | 魔術常數       |      說明                                                                           |
  |---------------|:------------------------------------------------------------------------------------|
  | __LINE__      |取得運行程式的行號。                                                                   |
  | __FILE__      |取得文件在本機的路徑與檔名。                                                            |
  | __DIR__       |取得文件在本機的路徑。除非是根目錄，否則目錄路徑名稱不包括最後的「/」符號。(PHP 5.3新功能)    |
  | __FUNCTION__  |取得函數的名稱(PHP 4.3.0 新增)。自PHP 5 起返回的函數名稱即是原定義名稱，英文字母區分大小寫。 |
  | __CLASS__     |取得類別名稱(PHP 4.3.0 新增)。自PHP 5 起返回的類別名稱即是原定義名稱，英文字母區分大小寫。   |
  | __METHOD__    |取得類別的方法名稱(PHP 5.0.0 新增)。返回的方法名稱即是原定義名稱，英文字母區分大小寫。       |
  | __NAMESPACE__ |取得區分大小寫的命名空間名稱(PHP 5.3.0 新增)。                                          |

- **例子**：

  ```php
  <?php

  namespace MyProject;

  $a = __line__;
  $b = __file__;
  $c = __dir__;
  $f = __CLASS__;
  $h = __namespace__;

  echo "取得運行程式的行號 {$a} <br>";
  echo "取得文件在本機的路徑與檔名 {$b} <br>";
  echo "取得文件在本機的路徑 {$c} <br>";

  class test
  {
    public function fun()
    {
        $d = __function__;
        echo "取得函數的名稱 {$d} <br>";
    }
    public function meth()
    {
        $e = __class__;
        $f = __method__;

        echo "取得類別的名稱 {$e} <br>";
        echo "取得類別的方法名稱 {$f} <br>";

    }
  }
  $obj = new test();
  $obj->fun();
  $obj->meth();

  echo "取得區分大小寫的命名空間名稱 {$h}";
  ```

#### 2.4 運算式

- **描述**：運算式是 php 中的基石，可以說在 php 中縮寫的任何內容都是運算式。
&emsp;&emsp;&emsp;官方給出的概念是【任何有值的東西均可以稱為是運算式】
- **語法**：在 php 中運算式無法精確的被給出一個語法來設定，但可以簡單設立一個通俗的標準。
&emsp;&emsp;&emsp;<font color='red'>那就是語句如果不加分號的部分，就是運算式。</font>
- **注意**：
&emsp;&emsp;&emsp;上面的說法並不完全準確，畢竟有一些語句是不使用分號結尾的。
&emsp;&emsp;&emsp;例如流程控制中的 if 等結構，還有函數等結構。
&emsp;&emsp;&emsp;因此上面的說法只是 "簡單" 設立的一個標準。
- **例子**：

  ```php
  function foo(){ return 5;} //函數運算式
  $c = $a++;                 //賦值運算式
  ```

### 3. php 常見資料類型

&emsp;&emsp;php 中的資料類型相較於 js 多了很多種，但其中相當一部分對於我們來說鮮少用到。因此我們只在這為大家介紹常見的幾種資料類型。
介紹資料類型之前，為大家提供兩個方法來判別變數的資料類型：
&emsp;&emsp;<font color='red'>var_dump(變數|運算式)</font>：函數用來查看運算式的值和歸屬類型。
&emsp;&emsp;<font color='red'>gettype(變數|運算式)</font>：函數用來查看變數或運算式的類型。

#### 3.1 布林類型：Boolean

- **描述**： boolean 是最簡單數值型別，用來表示運算式的真值。
- **語法**：<font color='red'> 一般使用`TRUE`或`FALSE`常數來指定布林值，兩者均不區分大小寫</font>
- **注意**：
  a. 可以使用<font color='red'> (bool) </font>或<font
color='red'> (boolean) </font>強制轉換修飾符，來對非布林數值型別的變數或運算式進行強制類型轉換。
  b. 當轉換為布林數值型別時，以下值被認為是 FALSE

  - 布林值 FALSE 本身
  - 整型值 0（零）
  - 浮點型值 0.0（零）
  - 空字串，以及字串 "0"
  - 不包括任何元素的陣列
  - 特殊類型 NULL（包括尚未賦值的變數）

  c. 所有其它值都被認為是 TRUE（包括任何資源 和 NAN）
- **強調**：
&emsp;&emsp;-1 和其它非零值（不論正負）一樣，被認為是 TRUE

#### 3.2 整數類型：Integer

- **描述**：整數指的是集合 ℤ = {..., -2, -1, 0, 1, 2, ...} 中的某個數
- **語法**：
&emsp;a. 整數值可以使用十進位，十六進位，八進制或二進位表示，
&emsp;&emsp;前面可以加上可選的符號（- 或者 +）。
&emsp;b. 二進位表達的 integer 自 `PHP 5.4.0` 起可用。
&emsp;c. 要使用八進制表達，數位前必須加上 `0`（零）。
&emsp;&emsp;要使用十六進位表達，數位前必須加上 `0x`。
&emsp;&emsp;要使用二進位表達，數位前必須加上 `0b`。
- **注意**：
&emsp;a. PHP7 以前的版本,如果向八進位數傳遞了一個非法數字（即 8 或 9），
&emsp;&emsp;則後面其餘數字會被忽略。PHP7 以後,會產生 `Parse Error` 錯誤
&emsp;b. PHP 中沒有整除的運算子。 1/2 產生出 float 0.5。
&emsp;c. 使用<font color='red'>(int)</font>或<font
color='red'>(integer)</font>方法對非整數變數或運算式進行強制類型轉換
- **強調**：
&emsp;&emsp;絕不要將未知的分數強制轉換為 integer，這樣有時會導致不可預料的結果。

#### 3.3 浮點類型：Float

- **描述**：浮點類型，又被稱為浮點數 Float或者雙精度數 double 或者實數 real。
- **語法**：可以通過一下任何一種類型來定義
&emsp;&emsp;<font color='red'>\$a = 1.234;
&emsp;&emsp;\$b = 1.2e3;
&emsp;&emsp;\$c = 7E-10;</font>
- **注意**：
&emsp;&emsp;a. 永遠不要直接比較兩個浮點數的大小，因為這樣沒有任何意義
&emsp;&emsp;b. 如果必須比較浮點數大小，則可以採用【epsilon】機器極小值方式進行比較。
&emsp;&emsp;c. NAN表示數學上無法用浮點數具體描述出的數字，
&emsp;&emsp;&emsp;和true之外的任何值進行鬆散或嚴格比較的結果都會是false。
- **強調**：
&emsp;&emsp;由於 NAN 代表著任何不同值，不應拿 NAN 去和其它值進行比較，包括其自身 。

#### 3.4 字元類型：String

- **描述**：字元類型也叫字串類型，是由一系列字元構成。
&emsp;&emsp;&emsp;其中每一個字元等同於一個位元組，因此 php 中只能支援 256 字元集，
&emsp;&emsp;&emsp;也正因為這樣其不支持 `Unicode`。
- **語法**：php 中字串有兩種定義語法，`單引號`和`雙引號`定義。
- **注意**：
&emsp;&emsp;a. php 字串中使用轉義字元\來描述容易引起歧義的內容
&emsp;&emsp;b. php 對雙引號定義的字串中的變數可以進行內容解析，而單引號則不行。
&emsp;&emsp;c. php 字串允許多行定義，但會忽略多餘的空格和換行。
&emsp;&emsp;d. <font color='red'>php中字串拼接採用 `.` 點運算子實現！ 不是 `+` 加號</font>
- **例子**：

  ```php
  $frank = '張先森';
  echo 'my name is $frank'."<br/>";
  echo "my name is $frank";
  ```
  
- `echo` 與 `print` 的差異
  1. 比較print 和echo 函式的執行速度差異。

     ```php
     $s = microtime(1);
     for ($i = 0; $i < 1000000; $i++){
       echo "";
     }
     $e = microtime(1);
     echo "Use 'echo': ".($e - $s)."\n";
 
     $s = microtime(1);
     for ($i = 0; $i < 1000000; $i++){
       print "";
     }
     $e = microtime(1);
     echo "Use 'print': ".($e - $s)."\n";
     ```

     結果:
         Use 'echo': 0.065550088882446
         Use 'print': 0.080870151519775
  2. print 和echo 兩個函數的用法差異。
     - `PHP` 中 `echo` 和 `print`的功能基本相同（輸出），但是兩者之間還是有細微差別的。
       `echo` 輸出後沒有返回值，但 `print` 有返回值，當其執行失敗時返回 `flase`。 因此可以作為一個普通函數來使用。  
       這意味著 `print` 可用在一些複雜的運算式中，而 `echo` 則不行。但是，因為 `echo` 語句不要求返回任何數值，所以在代碼中 `echo` 語句的運行效率要略微快於 `print` 語句。
     - `echo` 可以輸出多個字串，像下面這樣：
       `echo 'a','b','c';` 或 `echo ('a'),('b'),('c');`  但不可為 `echo ('a','b','c');`
     - `print` 只能輸出一個字串，它可以表現得像一個函式，比如你可以如下使用：
       `$r = print "Hello World";`  得到返回值 $r = 1

     ```php
     <?php
       $a='hello ';$b='php world!';echo $a,$b.'<br />';//echo 可以用逗號分隔字串變數來顯示
       print $a.$b.'<br />';//而print不能使用逗號，只能用點號分隔，
       //print $a,$b.'<br />';//這裡使用逗號時報錯。
     ?>
     ```
  
##### heredoc

一般 PHP 會將要輸出的 HTML 用單引號或雙引號包起來，單引號和雙引號的差異是在雙引號內可以使用 PHP 變數，單引號則不行。

但是如果很長的一段 HTML，會顯得程式碼不易維護，此時可以使用 `heredoc` 語法，

- **例子**：

  ```php
  <<<EndOfDoc
  <!DOCTYPE html>
  <html>
  <head><title>TITLE</title></head>
  </html>
  EndOfDoc;
  ```

>使用 <<< 語法要特別注意的是：

- EndOfDoc 是標籤名稱可自定，但上下要一樣
- 開始標籤名稱可加單引號或雙引號，加單引號後其內容不支援 PHP 變數，加雙引號與不加雙引號是相同的功能。
- 開始的標籤名稱後面不可有任何字元，包括空白。
- 結束的標籤名稱要使用分號結尾，前後都不得有空白。

- **例子**：

  ```php
  <?php
    $myLanguage = "PHP";

    $ShowStr = <<<Msg
               我最喜歡的網頁程式語言是: $myLanguage <br />
               許多學生都說: "It's easy, It's good."
    Msg;
    echo $ShowStr;
  ?>
  ```

##### nowdoc

若要在頁面上顯示程式的原始碼，就須改用 `nowdoc` 語法(PHP 5.3 新增)，表示方法的結構
與 `heredoc` 相同，不同的是 `nowdoc` 對於內容中變數及跳脫字元不會進行編譯，而是直接顯示字串內容。

- **格式**

  ```php
  $變數名稱 = <<<'自訂名稱'
             字串內容...........
             ...............
  自訂名稱;
  ```

>注意
 nowdoc 語法結構表示法定義字串時，起始的自訂名稱前後要加上單引號 `'`, 結尾的自訂名稱就不用。

- **例子**：

  ```php
  <?php
   $myLanguage = "PHP";

   $ShowStr = <<<'Msg'
              我最喜歡的網頁程式語言是: $myLanguage <br />
              許多學生都說: "It's easy, It's good."
   Msg;
   echo $ShowStr;
  ?>
  ```

#### 3.5 陣列類型：Array

- **描述**：php 中的陣列實際上一個有序映射，映射就是把 keys 關聯到 values上的類型。
- **語法**：
&emsp;&emsp;<font color='red'>array( key => value , ... )</font>
&emsp;&emsp;// 鍵（key）可是是一個整數 `integer` 或字串 `string`
&emsp;&emsp;// 值（value）可以是任意類型的值 。
&emsp;&emsp;<font color='red'>自 `php 5.4` 起，可以直接通過短陣列定義方式[]來替代array()。</font>
- **注意**：
&emsp;&emsp;a. php 中 echo僅用來輸出簡單值，而複雜資料類型則需要通過print_r()函數來輸出
&emsp;&emsp;b. php 中的陣列實際上更相似與 js中的物件結構。
&emsp;&emsp;c. php 中陣列的讀取和賦值可以通過<font color="red">陣列名稱[鍵名]</font>方式來讀寫。
&emsp;&emsp;d. php 中陣列的長度讀取通過<font color='red'> count() </font>函數實現
&emsp;&emsp;e. php 中陣列內部添加原本並不存在的 key 值，不會補齊之間的差值，
&emsp;&emsp;&emsp;而是僅添加當前新輸入的 key 值。例：$arr[100] = 100.並不會為陣列添加 100 個元素
- **例子**：

  ```php
  print_r($frank = ['11','22','33']);
  print_r($frank[0]);
  $frank[100] = 960;
  print_r($frank);
  echo count($frank);
  ```

#### 3.6 對象類型：Object

- **描述**： php 中想要創建一個物件，則必須通過 new 語句產生實體一個類別得到。
- **語法**：<font color='red'>$obj = new Func;</font>
- **注意**：
&emsp;&emsp;a. php 中類別由 `class` 關鍵字聲明，類別名稱後沒有小括弧。
&emsp;&emsp;b. php 中類別內部的方法由 `->` 箭頭來調用，而不是 `.` 點運算子。
- **例子**：

  ```php
  class Peo{
    function eat(){
      echo '我會吃飯';
    }
  }
  $frank = new Peo;
  print_r($frank->eat());
  ```

- **補充**：對於類別和物件的使用方法遠不止如此，而在資料類型當中我們只需要知道物件類型是如何創建的即可，剩餘部分會在類別和物件中詳細說明。

#### 3.7 空數值型別：NULL

- **描述**： NULL 表示變數未被賦值的狀態，NULL 類型唯一可能的值就是 NULL。
- **注意**： NULL 值不區分大小寫，NULL 或 null 都可以
- **例子**：

  ```php
  echo $a;  //Undefined variable
  $temp = null;
  var_dump($temp);  // NULL
  echo "<script>
    var a;
    console.log(a);
  </script>";

  var_dump($frank = NULL); //NULL
  ```

#### 3.8 資源型別

資源通常是利用特殊的函數所傳回代表資源的值。因為資源型別的變數，其值建構的方法包含了如檔案處理、資料庫處理或繪圖處理等動作的內容，所以是無法由其他的資料型別轉換而來的。

- **例子**：

  ```php
  $conn = mysqli_connect("localhost:3306", "root", "1qaz@wsx");
  $conn = null;
  ```

### 4. php運算子

&emsp;&emsp;php 中運算子和 js 中的運算子大同小異，因此整體上來講可以直接按照經驗進行使用。但畢竟存在差別，因此列出兩個明顯的運算規則區別：

#### 4.1 字串的拼接符號不再是 `+` 加號運算子，而是 `.` 點運算子

#### 4.2 字串內的 `+=` 運算子號也不再表示拼接，而是使用 `.=` 來進行拼接

&emsp;&emsp;原本的 `+=` 僅用來單純的數學運算累加。

- **例子**：

  ```php
  $str1 = '123';
  var_dump($str1+= '456');//int(579)
  $str1 = '123';
  var_dump($str1.= '456');//string(6) "123456"
  ```

### 5. php流程控制語句

&emsp;&emsp;php 中流程控制語句與 js 中的流程控制語句語法基本一樣，可以直接使用。
&emsp;&emsp;php 中不但包括了 js 中原有的語句，還新添加了一些流程控制：

#### 5.1 快速遍歷不再是for-in結構，而是提供了一個foreach語句

- **描述**：`foreach` 語法結構提供了遍歷陣列的簡單方式，`foreach` 僅能夠應用於陣列和物件。
&emsp;&emsp;&emsp;如果嘗試應用於其他資料類型的變數，或者未初始化的變數將發出錯誤資訊。
- **語法**：

  ```php
  foreach (array_expression as $value) {    statement  }
  或者
  foreach (array_expression as $key => $value) {   statement  }
  ```

- **注意**：
&emsp;&emsp;a. 第一種格式遍歷給定的 `array_expression` 陣列。每次迴圈中，當前單元的值被賦給 `$value` 並且陣列內部的指標向前移一步
&emsp;&emsp;&nbsp;（因此下一次迴圈中將會得到下一個單元）。
&emsp;&emsp;b. 第二種格式做同樣的事，只除了當前單元的鍵名也會在每次迴圈中被賦給變數 `$key`。

- **例子**：

  ```php
  $arr = [1,2,3,4,5];
  foreach ($arr as $index => $value) {
    echo '$arr[' . $index. ']:' . $value. "<br/>";
  }
  ```

#### 5.2 文件引入語句 include 和 require

&emsp;&emsp;文件的單次引入語句 `include_once` 和 `require_once`

- **描述**： `include` 和 `require` 語句都表示包含並運行指定檔。
&emsp;&emsp;&emsp;但未找到文件 `include` 會發出一條警告，後者會發出一個致命錯誤

- **語法**：
&emsp;&emsp;&emsp;<font color='red'>include '檔案名稱|檔案路徑;'</font>
- **注意**：
&emsp;&emsp;&emsp;a. 當一個檔案被包含時，其中所包含的代碼繼承了 `include` 所在行的變數範圍。
&emsp;&emsp;&emsp;&emsp;從該處開始，調用檔在該行處可用的任何變數在被調用的檔中也都可用。
&emsp;&emsp;&emsp;&emsp;b. 不過所有在包含檔中定義的函數和類別都具有全域作用域。
- **例子**：

  ```php
  vars.php
  <?php
   $color = 'green';
   $fruit = 'apple';
  ?>
  ```

  ```php
  test.php
  <?php>
    echo "A $color $fruit"; //A
    include "var.php";
    echo "A $color $fruit"; //A green apple
  ?>
  ```

### 6. php 函數

php中的函數結構和js中的函數結構基本持有相同的語法結構和特徵。

**例如**：
函數的聲明語法由 `function` 命令聲明，
函數參數寫在小括弧內部，
函數返回值在函數內部採用 `return` 關鍵字聲明，
函數可以先使用後聲明
函數內部返回的函數(閉包)
php中的作用域也採用函數級別，因此函數內部的變數無法在函數外部直接訪問。
…

但 php 中函數的作用域部分與 js 中的函數還是存在一些區別的。

- **例如**：
在函數外部定義的全域變數並不能在函數內部直接使用，
而是需要通過關鍵字 `global` 在函數內部再次聲明才可以。

- **例如**：

  ```php
  $num = 100;       //設置全域變數 $num
  function func(){
    global $num;    //在函數內部聲明$num為全域變數，否則調用出錯
    echo $num;      //輸出結果為100，證明訪問成功
    $num++;         //對全域變數做出修改
  }
  func();
  echo $num;        //在函數外部再次輸出$num，得出結果101
  ```

>通過上面的例子得出：
 &emsp;&emsp;在 php 的函數中如果想要使用哪怕是全域變數，也必須採用關鍵字 global聲明一次。
 &emsp;&emsp;否則無法生效。

#### 使用者自訂函式

- `自訂函數`具有提升性。

  ```php
  function 名稱(參數1,參數2...){
     :
  }
  ```

- `php_function.php`

  ```php
  <body>
  <?php
    function test(){
     echo "ABC";
    }

    function init(){
     speak();
     calc();
    }

    function speak(){
     echo "Hello world";
    }

    function calc(){
     echo 1024*1024;
    }

    init();
    test();
  ?>
  </body>
  ```

#### 帶函式的參數

- `php_function_2.php`

  ```php
  <body>
  <?php                       <?php
     function dinner(){          function dinner($item){
      echo "牛排";                 echo $item;
     }                           }
                        ==>
     diner();                    diner("牛排");
  ?>
  </body>                      
  ?>
  ```

  **多個參數的函數**
- `php_function_3.php`

  ```php
  <body>
  <?php
    function eat($a, $b){
     echo "今天" . $a . "吃" . $b . "<br>" ;
    }

    eat("早餐", "漢堡");
    eat("中餐", "牛肉麵");
  ?>
  </body>
  ```

  `PHP3` 函式定義一定要放在函式呼叫的前面。
  `PHP4` 以後就無此限制。

  但是有兩種函式例外:
  1. 條件式函式: 函式定義在條件式中，所以須在該條件成立後，才能呼叫該函式。

     ```php
     <?php
       $status = TRUE;
       //這裡還不能呼叫函式 Greeting()
       if($status){
         function Greeting(){
           echo "Welcome! ";
         }
       }
       //此處之後才可以呼叫函式 Greeting()
       Greeting();
     ?>
     ```

  2. 函式中的函式: 函式定義在其他函式中，那麼須在呼叫其他函數後，才能呼叫該函式。

     ```php
     <?php
       function MyFunction(){
         function Greeting(){
           echo "Welcome!";
         }
       }
       //此處尚不能呼叫函式 Greeting();
       MyFunction();
       //此處之後才能呼叫函式 Greeting();
       Greeting();
     ?>
     ```

#### 函式的參數傳遞

1. 傳值呼叫(call by value): 預設
   呼叫端與被呼叫端的參數都有一獨立的記憶體，不論名字相同與否。

   `php_call_by_value.php`

   ```php
   <body>
   <?php
    $num1 = 1;                 //$n1 的值為 100  
    $num2 = 100;               //$n2 的值為 1
    function swap($n1, $n2)    //$num1 的值為1
    {                          //$num2 的值為100
      $temp = $n1;
      $n1 = $n2;
      $n2 = $temp;
      echo '$n1的值為'.$n1.'<br>';
      echo '$n2的值為'.$n2.'<br>';
    }
    swap($num1, $num2);
    echo '$num1的值為'.$num1.'<br>';
    echo '$num2的值為'.$num2.'<br>';
   ?>
   </body>
   ```

   ```bash
   $n1       1   ->  100
   --------------
   $n2     100   ->  1
   --------------
   $num1     1
   --------------
   $num2   100  
   --------------
   $temp     1
   ```

2. 傳址呼叫
   `php_call_by_reference.php`

   ```php
   <body>
   <?php                                 結果:
     $num1 = 1;                          $n1 的值為 100
     $num2 = 100;                        $n2 的值為 1
     function swap(&$n1, &$n2)           $num1 的值為 100
     {                                   $num2 的值為 1
      $temp = $n1;
      $n1 = $n2;
      $n2 = $temp;
      echo '$n1的值為'.$n1.'<br>';
      echo '$n2的值為'.$n2.'<br>';
     }
     swap($num1, $num2);
     echo '$num1的值為'.$num1.'<br>';
     echo '$num2的值為'.$num2.'<br>';
   ?>
   </body>
   ```

#### 設定參數預設值

- `php_set_function_defaultParaValue.php`

  ```php
  <body>
  <?php
    function drink($kind = '茶')
    {
      echo '請給我一杯'.$kind.'<br>';
    }
      drink();
    drink('咖啡');
  ?>
  </body>
  ```

#### 變動長度參數串列

即函示的參數無一定個數，為了處理它，必須借助下列函式。

- func_num_args(): 傳回函式的參數個數
- func_get_arg(n): 傳回函式的第 n+1 個參數
- func_get_args(): 傳回一個陣列，裡面包含所有的參數，起始鍵為 0。

- `php_variable_length_argument_list.php`

  ```php
  <?php
    function tour()
    {
     if (func_num_args() == 0)
       echo '沒有指定地點！';
     else
       for($i = 0; $i < func_num_args(); $i++) {
         echo func_get_arg($i) . '<br>';
       }
    }
    tour('台北', '台中', '高雄');
  ?>
  ```

  結果:
  &emsp;&emsp;台北
  &emsp;&emsp;台中
  &emsp;&emsp;高雄

#### 函式傳回值

使用關鍵字 `Return` 參數的函數。

- `php_function_return_one.php`

  ```php
  <body>
  <?php
   function Convert2F($DegreeC)
   {
     return $DegreeC * 1.8 + 32;
   }
   echo '攝氏30度可以轉換為華氏'.Convert2F(30).'度';
  ?>
  </body>
  ```

  因為函式只能傳回一個值，若要傳回多個值用陣列。

- `php_function_return_multi.php`

  ``` php
  <body>
  <?php
    function ExpValue($X)
    {
      $Result[0] = $X;
      $Result[1] = $X * $X;
      $Result[2] = $X * $X * $X;
      return $Result;
    }

    $ReturnArray = ExpValue(10);
    foreach($ReturnArray as $Value)
      echo $Value.'<br>';
    ?>
  </body>
  ```

&emsp;&emsp;&emsp; 結果:
&emsp;&emsp;&emsp; 10
&emsp;&emsp;&emsp; 100
&emsp;&emsp;&emsp; 1000

  >PS: 省略 return 會回傳一個 null

#### 全域變數 v.s. 區域變數

全域變數:定義在區塊內的都是。
區域變數:定義在方法內的。

- `php_global_vs_local.php`

  ```php
  <?php
    $Msg = "Hello, This is outside of Func1().";  //設定全域變數Msg的值
    echo $Msg.'<br>';            //顯示全域變數Msg的值
    Func1();                     //呼叫Func1() 函式
    echo $Msg.'<br>';            //顯示全域變數Msg的值

    function Func1()
    {
     $Msg = "Hello, This is inside of Func1()."; //設定另一個同名區域變數Msg的值
     echo $Msg.'<br>';                           //顯示區域變數Msg的值
    }
  ?>
  ```

&emsp;&emsp;&emsp;結果:
&emsp;&emsp;&emsp;Hello, This is outside of Func1().
&emsp;&emsp;&emsp;Hello, This is inside of Func1().
&emsp;&emsp;&emsp;Hello, This is outside of Func1().

- `php_global_variable.php`

  ```php
  <?php
    $Msg = "Hello, This is outside of Func1().";    //設定全域變數Msg的值
    echo $Msg.'<br>';         //顯示全域變數Msg的值
    Func1();                  //呼叫Func1() 函式
    echo $Msg.'<br>';         //顯示全域變數Msg的值

    function Func1()
    {
      global $Msg;           //使用global將Msg定義為全域變數
      $Msg = "Hello, This is inside of Func1().";  //設定全域變數Msg的值
      echo $Msg.'<br>';                            //顯示全域變數Msg的值
    }
  ?>
  ```

&emsp;&emsp;&emsp;結果:
&emsp;&emsp;&emsp;Hello, This is outside of Func1().
&emsp;&emsp;&emsp;Hello, This is inside of Func1().
&emsp;&emsp;&emsp;Hello, This is inside of Func1().

#### 靜態變數

對區域函數來說，當呼叫函式時，區域變數會被建立，而在函式執行完畢後，區域變數會被釋放。

- `php_local_variable_scope.php`

  ```php
  <?php
    function Add($Result=0)
    {
     //$Result 預設的值是 0
     $Result += 1;            //將區域變數Result的值加1
     echo $Result.'<br>';     //在網頁上顯示區域變數Result的值
    }
    Add();                    //呼叫函式
    Add();                    //呼叫函式
  ?>
  ```

&emsp;&emsp;&emsp;結果:
&emsp;&emsp;&emsp;1
&emsp;&emsp;&emsp;1

  >若要保留函式內的區域變數的值，須使用 `static` 關鍵字。

- `php_static_variable_scope.php`

  ```php
  <?php
    function Add()
    {
      static $Result;       //使用static將Result定義為靜態變數
      $Result += 1;         //將靜態變數Result的值加1
      echo $Result.'<br>';  //在網頁上顯示靜態變數Result的值
    }
    Add();                 //呼叫函式
    Add();                 //呼叫函式
   ?>
  ```

#### 匿名函式(anonymous)

- > 5.30 支援，允許程式設計師建立函數可不使用名稱。

  `php_anonymous_function.php`

  ```php
  <body>
  <?php
   $greet = function($name)
   {
    printf("Hello %s\r\n", $name);
   };

   $greet("World!");
   $greet("PHP!");
  ?>
  </body>
  ```

#### 可變動函式(variable function)

指可以動態設定函式的名稱。

- 一般函數表示為  funcName (){}

- 可變動函式指函數名稱用一變數來代替 $funcName(), 這個名稱可以設定不同的值，即可以使用不同的名稱.

- `php_variable_function.php`

  ```php
  <body>
  <?php
    function CircleArea($R)
    {
     echo "半徑為 $R 的圓面積為".($R * $R * 3.1416)."<br>";
    }
    function SquareArea($L)
    {
     echo "長度為 $L 的正方形面積為".($L * $L)."<br>";
    }
    $func = 'CircleArea';
    //可變動函式 $func()
    $func(10);        //會執行函式呼叫CircleArea(10);
    $func = 'SquareArea';
    $func(10);        //會執行函式呼叫SquareArea(10);
  ?>
  </body>
  ```

#### PHP 內建函式

`php_practice.php`

下面的 \$a 與 \$b 的值由表單作輸入。

- `function.php`

  ```php
  <body>
  <?php
    $a= "早餐";
    $b= "漢堡";
    function eat($a, $b)
     echo "今天" . $a . "吃" . $b . "<br>" ;
    }
    eat($a,$b);
  ?>
  </body>
  ```

&emsp;&emsp;解答:

- `php_practice.php`

  ```php
  <body>
    <form action="function.php"　method="post">
      <select name="a">
       <option value="早餐">早餐</option>
       <option value="中餐">中餐</option>
       <option value="晚餐">晚餐</option>
       <option value="宵夜">宵夜</option>
      </select>
      <input type="text" name="b"><br>
      <input type="submit" value="送出">
    </form>
  <body>
  ```

`php` 中和 `javascript` 不同，`php 內對於類別和物件是有準確的定義和關鍵字聲明的。

因此暫時撇開目前對類別和物件所保留的認知，讓我們一起來看看在 php 中類別和對象是如何規定的。

我們從下面幾個角度來討論一下 php 中的類別和物件：

### 7. php 類別與對象

`php` 中和 `javascript` 不同，`php` 內對於類別和物件是有準確的定義和關鍵字聲明的。
因此暫時撇開目前對類別和物件所保留的認知，讓我們一起來看看在 `php` 中類別和對象是如何規定的。
我們從下面幾個角度來討論一下`php`中的類別和物件：

#### 7.1 php 中的類別

- **描述**：php中類別的定義都以關鍵字 `class` 開頭，後跟類別名稱，再後面跟著一對花括弧。
&emsp;&emsp;&emsp;括弧內包含有類別的**屬性**、**方法**、**常數**、**建構函式**、**解構函式**。
- **語法**：<font color='red'> class 類別名稱 {  類別內部的結構  }</font>
- **說明**：
&emsp;&emsp;a. 類別名稱可以是任何非 `PHP` 保留字的合法標籤。
&emsp;&emsp;&emsp;一個合法類別名稱以字母或底線開頭，後面跟著若干字母，數字或底線。
&emsp;&emsp;b. 一個類別可以包含有屬於自己的常數，變數【屬性】以及函數【即方法】。
- **例子**：

  ```php
  class Peo{
    public $peoName = 'allen';
    function showSelf(){
      echo 'hello world!';
    }
  }
  ```
  
- 使用物件的方式來操作 HTML 網頁

  ```php
  //先定義一個可代表網頁的類別
  class WebPage{
    //儲存網頁標題的成員
    var $title;
    //顯示網頁的方法
    function show(){
      echo <<<HTML_TEXT    // 用 heredoc 語法定義的網頁內容
           <!DOCTYPE html>
           <html>
           <head><title>$this->title</title></head>
           <body><p>WebPage 類別 </p></body>
  HTML_TEXT;         
    }
  }  //整個類別定義都放在一對大括號中
  $obj1 = new WebPage();
  $obj2 = new WebPage();
  $obj1->title = "新標題";
  $obj1->show();
  ```

#### 7.2 php 中的物件

- **描述**：要創建一個類別的實例，必須使用 `new` 關鍵字。類別應在被產生實例化之前定義。
- **語法**：<font color='red'>$對象名稱 = new 類別名稱();</font>
- **說明**：
 &emsp;&emsp;a. 對於創建物件的語句中，`new` 後面的類別名稱後有沒有小括弧都可以。
 &emsp;&emsp;b. 物件與物件之間的傳值仍然是賦值傳遞，只不過傳遞的內容是一個記憶體位址。

- **例子**：

  ```php
  <?php
   class Peo
   {
    //宣告成員
    public $peoName = 'allen';
    //定義方法
    public function showSelf()
    {
      echo "hello world! <br>";
      echo $this->peoName . "<br>";
    }
   }

   $peo = new Peo;
   $peo->peoName = "aby";
   $peo->showSelf();
   print_r($peo);
  ```

- **輸出**：
  hello world!
  allen
  Peo Object ( [peoName] => allen )

#### 7.3 php 中類別的屬性與屬性類型關鍵字

- **描述**: 類別內部的變數成員稱為屬性，或欄位、特徵。
- **語法**: <font color='red'>由關鍵字`public`，`protected`，`private`，或者`var`
開頭，然後跟一個普通的變數聲明來組成。
&emsp;&emsp;&nbsp;class 類別名稱{
&emsp;&emsp;&emsp;[public|private|protected] $變數名稱(屬性名稱) = 屬性值;
&emsp;&emsp;&emsp;[public|private|protected] function 方法名稱(參數1,參數2,…){  方法內容代碼;  }
&emsp;&emsp;&nbsp;}
</font>
- **說明**：
&emsp;&emsp;a. 屬性中的變數可以初始化，但初始化的值必須是常數。
&emsp;&emsp;b. 類別的屬性和方法如果沒有寫明類型關鍵字，則都預設是公有
<font color='orange'>
&emsp;&emsp;&emsp;public: 被定義為公有的類別成員可以在任何地方被訪問。
&emsp;&emsp;&emsp;protect：被定義為受保護的類別成員則可以被其自身以及其子類別和父類別訪問。
&emsp;&emsp;&emsp;private：被定義為私有的類別成員則只能被其定義所在的類別訪問。
&emsp;&emsp;&emsp;var: 以該關鍵字定義的成員能夠被任何程式碼存取(public 的別名)
</font>
&emsp;&emsp;c. 在類別的成員方法中，可以用 `->` 來訪問非靜態屬性，其中 `->` 稱為物件運算子。<br>
&emsp;&emsp;d. 若 public、private、protected 省略不寫，表示為 public。<br>

- **例子**：

  ```php
  class Peo{
    //聲明公有屬性
    public $peoName = 'allen';  
    //聲明私有方法
    private function showSelf(){
      echo 'hello world!';
    }
    //聲明公有方法
    public function canUsedFunc(){
      //$this是一個虛擬變數(物件)，表示當前正在調用這個方法的物件，注意 peoName 前面沒有 '$' 符號。
      $this->peoName;
      $this->showSelf();
    }
  }
  //產生實體一個 Peo類別的物件
  $peo = new Peo();
  //通過->訪問物件的公有屬性
  echo $peo->peoName;
  //修改物件的公有屬性
  $peo->peoName = 'allen';
  echo $peo->peoName;
  //調用物件的公有方法，間接執行私有方法
  $peo->canUsedFunc();  
  ```

  ><font color='red'> \$this 虛擬變數</font>
   在程式中直接使用 `->` 修改物件的成員值，這在物件導向程式設計中是不建議的作法，因為通常類別會將成員『封裝』起來，亦即讓物件以外的程式，無法存取成員。這時候就會使用 `$this` 來存取物件的成員。`$this` 是個特殊的**參照變數**，在方法之中它代表的是『物件本身』。
   `$this` 配合 `->` 運算子即可以用來存取物件成員。

  >方法的定義原則和一般函式相同，但PHP保留以『兩個』底線字元(__) 為開頭的方法名稱(名稱以兩個底線字元開頭的方法稱為 Magic Method)，所以不要用以兩個底線字元當成方法名稱的開頭。

#### 7.4 php 中的類別常數與靜態變數

- **描述**：php中的**類別常數**和**靜態變數**是存在與類別結構中的兩個不同與常見屬性的兩種結構。
- **語法**：類別常數由關鍵字 `const` 聲明，而靜態變數則使用關鍵字 `static` 聲明

  <font color='red'>
  &emsp;&emsp;&emsp;&emsp;class 類別名稱{<br>
  &emsp;&emsp;&emsp;&emsp;&emsp; const 類別常數(沒有$開頭) = 簡單值;</br>
  &emsp;&emsp;&emsp;&emsp;&emsp; static 靜態變數(有$開頭) = 簡單值;</br>
  &emsp;&emsp;&emsp;&emsp;}
  </font>

- **說明**：
  &emsp;&emsp; a. 由 `const`聲明的類別常數不允許發生任何改變，一經聲明值即固定，一律為 `public`。
  &emsp;&emsp; b. 由 `static`聲明的靜態變數的語句，則僅在類別被聲明的時候執行一次，但可以修改。
  &emsp;&emsp; c. 無論是 `const` 聲明的類別常數還是`static` 聲明的靜態變數，兩者的調用方式均為 `::` 調用
  &emsp;&emsp; d. 兩者在調用的時候均可以不產生實體物件直接通過**類別名稱**調用。

- **例子1:**

  ```php
  class Peo{
    const peoName = 'allen'; //聲明類別常數
  }
  echo Peo::peoName;         //不產生實體也能直接通過類別名稱訪問
  $peo = new Peo();
  echo $peo::peoName;        //產生實體後可以通過物件訪問
  ```

- **例子2:**

  ```php
  class Peo{
    static $peoAge = 18;         //聲明靜態變數
  }
  echo Peo::$peoAge . "<br/>";   //直接通過類別名稱訪問
  Peo::$peoAge++;                //修改靜態變數的值
  echo Peo::$peoAge . "<br/>";   //確認修改

  $peo = new Peo();              //產生實體物件，但靜態變數聲明語句不執行
  echo $peo::$peoAge;            //輸出靜態變數是剛才修改的值。

  **輸出**
  18
  19
  19
  ```

- **例子3:**
  
  ```php
  class MyMath
  {
    public static function Cubic($X)
    {
      return $X * $X * $X;
    }
  }
  echo '5的三次方為'.MyMath::Cubic('5');
  ```

  >由於沒有建立物件，故不能使用 `->` 運算子，而是改用 `::` 運算子。

- **例子4:**

  ```php
  class Circle
  {
    const PI = 3.14;
    public $Radius;
    public function ShowArea()  
    {
      echo '圓面積為'.($this->Radius * $this->Radius * self::PI);  
    }
  }
  echo '圓周率為'.Circle::PI.'<br>';
  $Obj = new Circle();
  $Obj->Radius = 10;
  $Obj->ShowArea();
  ```

  >self 關鍵字代表目前類別

#### 7.5 php 中類別的建構與解構函數

##### 7.5.1 php 中類別的建構函數

- **描述**：建構函數是類別在產生實體物件的時候自動執行，用來説明類別去建構物件的函數。
&emsp;&emsp;&emsp;`php` 為所有的類別都提供了一個和類別名稱相同的隱藏建構函數。
&emsp;&emsp;&emsp;可以通過顯示編寫或通過 `__construct` 函數來主動進行編輯。
- **語法**：
  <font color='red'>
  class 類別名稱{
    &emsp;//function __construct(){  主動修改的代碼  }
    &emsp;function 類別名稱(){  主動修改的代碼  }
  }</font>

- **說明**：兩種寫法都能夠實現建構函數的主動編輯，但是需要知道系統自動提供的是第二種結構
- **例子**：

  ```php
  class Peo{
    public $peoName;
     function __construct(){
       $this->peoName = '預設值';
     }
  }
  $peo = new Peo();
  echo $peo->peoName;
  ```

  **輸出**
  預設值

##### 7.5.2 php 中類別的解構函數

**解構函式(destructor)**
是用來釋放物件所佔用之系統資源的函式，在釋放物件時會自動執行，無須在程式碼內加以呼叫，常見的是釋放動作有清除設定值、關閉檔案、結束資料庫連接、中斷網路連線等。
`PHP` 支援的解構函式名稱為 <font color='red'>__destruct</font>，沒有參數、也沒有回傳值。

- **例子**：

  ```php
  class Peo{
    public $peoName;
    function __construct($Str){
      $this->peoName = $Str;
      echo "已經建立名字為" . $this->peoName . "的物件! <br/>";  
    }
  
    function __destruct(){
     $this->peoName = null; //清除員工的名字
     echo "這個物件已經被釋放";
    }
  }

  $peo = new Peo('allen');//建立物件(會自動執行建構函式)
  $peo = null;            //釋放物件(會自動執行解構函式)
  ```

  **輸出**
  已經建立名字為allen的物件!
  這個物件已經被釋放

##### 7.5.3 `self` 和 `$this` 的差異
  
1. `self` 是參照到目前的 `class`， `$this`是參照到目前的 `object`(已經被宣告的實體上)
2. `self` 可使用在 `static` 上，`$this` 不行。
   `static method` 因為沒有物件的實體，所以需要注意不可以使用 `$this` ，要用 `self::`
   可以直接存取 `static method` (如 `self::method()`)，但是無法直接存取 `static property` 中的預先宣告的值

3. 可用 `new self()` 呼叫自己。
  
4. 範例

   ```php
   <?
   class name
   {
     public $name;
     public function getname(){
        return $this->name = "mick";
     }

     public function getnamebythis(){
       return $this->getname();
     }

     public function getnamebyself(){
       return self::getname();
     }
   }

   class name2 extends name{
     public function getname(){
       return $this->name = "jeff";
     }
   }

   $newname = new name2();
   echo $newname->getnamebythis() . "<br/>"; // 出現的是mick
   echo $newname->getnamebyself() . "<br/>"; // 出現的是jeff
   ?>
   ```

#### 7.6 比較物件

可以使用下列兩個運算子比較物件:

- `==`: 當兩個物件隸屬於相同類別且具有相同屬性與值時，回傳回 `true`。
- `===`: 兩個物件指向相同類別的相同案例時，回傳回 `true`。

- **例子**：

  ```php
  class Peo
  {
    public $peoName;
    //定義名稱為 peoName 的屬性以存取名字
    public function __construct($Str)
    {
        //透過建構函式指派名字
        $this->peoName = $Str;
    }
  }
  //令 $Obj1 指向 peoName 屬性為 'allen' 的案例
  $Obj1 = new Peo("allen");
  //令 $Obj2 指向 peoName 屬性為 'allen' 的另一案例(跟 $Obj1 不同)
  $Obj2 = new Peo("allen");
  //令 $Obj3 指向 $Obj1 所指向的案例
  $Obj3 = $Obj1;

  if ($Obj2 == $Obj1) {
     echo '$Obj2 的成員與值均和 $Obj1 相同 ' . '<br>';
  } else {
     echo '$Obj2 的成員與值均和 $Obj1 不同 ' . '<br>';
  }

  if ($Obj2 === $Obj1) {echo '$Obj2 和 $Obj1 指向相同案例' . '<br>';
  } else {
      echo '$Obj2 和 $Obj1 指向不同案例' . '<br>';
  }

  if ($Obj3 === $Obj1) {echo '$Obj3 和 $Obj1 指向相同案例' . '<br>';
  } else {
      echo '$Obj3 和 $Obj1 指向不同案例' . '<br>';
  }
  ```

  **輸出**
  `$Obj2` 的成員與值均和 `$Obj1` 相同
  `$Obj2` 和 `$Obj1` 指向不同案例
  `$Obj3` 和 `$Obj1` 指向相同案例

#### 7.7 php 中的繼承

- **描述**：繼承有時也被稱為類別擴展。是指子類別會繼承父類別所有公有的和受保護的屬性方法。
&emsp;&emsp;&emsp;在php中使用 `extends` 關鍵字來實現繼承。
- **語法**：<font color='red'>
&emsp;&emsp;class SonClassName extends FatherClassName{
&emsp;&emsp;&emsp;子類別結構
&emsp;&emsp;} </font>
- **說明一**：
&emsp;&emsp; a. 除非子類別覆蓋了父類別的方法，否則被繼承的方法都會保留其原有功能。
&emsp;&emsp; b. 繼承對於功能的設計和抽象是非常有用，避免了重複編寫大量相同的公有結構。
&emsp;&emsp; c. 對於公有屬性和方法的繼承，子類別可以直接隨意使用。
&emsp;&emsp; d. 對於受保護的屬性和方法的繼承，可以在【父類別或子類別內部】使用。
&emsp;&emsp; e. 對於私有的屬性和方法，子類別不能夠繼承。
<br/>

- **說明二**：  無多重繼承功能(一個子類別有多個父類別)，但有:
  1. 鏈狀繼承(chained inheritance)。
     例如: 類別 B 繼承 類別  A, 而類別  C 又繼承類別 B

     ```php
     class A{
      :
     }

     class B extends A{
      :
     }

     class C extends B{
      :
     }
     ```

  2. 一個父類別有多個子類別

     ```php
     class W{
      :
     }

     class X extends W{
      :
     }

     class Y extends W{
      :
     }

     class Z extends W{
      :
     }
     ```

- **例子**：

  ```php
  class Father{
   public $pubPro = '父類別公開的屬性';
   protected $protecPro = '父類別受保護的屬性';
   private $priPro = '父類別私有的屬性';

   public function fatherPublicPut(){
     echo $this->pubPro."<br/>";
     echo $this->protecPro."<br/>";
     echo $this->priPro."<br/>";}
   protected function fatherProtectPut(){
     echo $this->pubPro."<br/>";
     echo $this->protecPro."<br/>";
     echo $this->priPro."<br/>";}
   private function fatherPrivatePut(){
     echo $this->pubPro."<br/>";
     echo $this->protecPro."<br/>";
     echo $this->priPro."<br/>";
   }
  }

  class Son extends Father{
    public function SonSelfPut(){
      echo $this->pubPro."<br/>";
      echo $this->protecPro."<br/>";
      echo $this->priPro."<br/>";
    }
  }

  $father = new Father();
  echo $father->pubPro;        //父類公開的屬性
  echo $father->protecPro;     ///報錯，受保護屬性外部無法直接訪問
  echo $father->priPro;        //報錯，私有屬性外部無法訪問  

  $father->fatherPublicPut();  //父類公開的屬性、父類受保護屬性、父類私有屬性
  $father->fatherProtectPut();
  $father->fatherPrivatePut(); //報錯，受保護方法外部無法直接訪問
                               //報錯，私有方法外部無法直接訪問

  $son = new Son();
  echo $son->pubPro;           //父類公開的屬性(繼承來的)
  echo $son->protecPro;        //報錯，受保護屬性外部無法直接訪問
  echo $son->priPro;           //報錯，私有屬性外部無法訪問
  $son->fatherPublicPut();     //父類公開的屬性、父類受保護屬性、父類私有屬性(繼承來的)
  $son->fatherProtectPut();    //報錯，受保護方法外部無法直接訪問
  $son->fatherPrivatePut();    //報錯，私有方法外部無法直接訪問

  $son->SonSelfPut();
  //父類公開的屬性、父類受保護的屬性、報錯(證明繼承的屬性只有public和protected的屬性)
  ```

#### 7.8 php 中覆蓋繼承自父類別的方法

&emsp;&emsp;&emsp;「覆蓋」(override)指的是子類別將繼承父類別的方法重新定義，而且在這過程中父類別的方法並不會受到影響。通常透過覆蓋的方法技巧來實作物件導向設計的「多型」(polymorphism)。

- **例子**：

  ```php
  class Payroll                               //定義父類別
  {
    public $Name;                             //定義屬性(能夠被繼承)
    public function Payment($Hours, $PayRate) //定義方法(能夠被繼承)
    {
      return $Hours * $PayRate;
    }
  }

  class BonusPayroll extends Payroll          //定義子類別
  {
    public function Payment($Hours, $PayRate) //覆蓋父類別的方法
    {
      return $Hours * $PayRate + 5000;
    }
  }

  echo '尚未加上獎金的薪資為'.Payroll::Payment(100, 80).'<br>';
  echo '加上獎金之後的薪資為'.BonusPayroll::Payment(100, 80).'<br>';
  ```

#### 7.9 php 中呼叫父類別內被覆蓋的方法

&emsp;&emsp;**子類別如何呼叫父類別內被覆蓋的方法呢 ?**

以 7.8 中的例子來說明，由於子類別再重新定義 `Payment()` 方法中有部分敘述和父類別的 `Payment()` 方法相同，所以可以用呼叫父類別的 `Payment()` 方法來取代，如下:

- **改法一**： 用 `parent`關鍵字。

  ```php
  //覆蓋類別的方法
  public static function fatherPublicPut($Hours, $PayRate)
  {
    //return $Hours * $PayRate + 5000;
    return parent::Payment($Hours, $PayRate) + 5000;
  }
  ```

- **改法二**： 用 `父類別名稱`。

  ```php
  //覆蓋類別的方法
  public static function fatherPublicPut($Hours, $PayRate)
  {
    //return $Hours * $PayRate + 5000;
    return Payroll::Payment($Hours, $PayRate) + 5000;
  }
  ```  

  >原則上，子類別可以覆蓋繼承自父類別的任何方法，但有時可能不希望父類別的某個方法不要被子類別所覆蓋，此時可以在父類別定義該方法時加上 `final` 關鍵字，例如下面敘述將禁止子類別覆蓋父類別的 `Payment()` 方法。

  ```php
  final public function Payment($Hours, $PayRate)
  ```

#### 7.10 php 子類別的建構與解構函式

&emsp;&emsp;&emsp;原則上，子類別會繼承父類別的建構函式與解構函式，若子類別沒有定義自己的建構函式與解構函式，一旦建立隸屬於子類別的物件或釋放隸屬於子類別的物件，就會分別自動執行父類別的建構函式與解構函式(例子1)，但如果子類別自己有定義建構式與解構式，則會自動執行子類別自己的建構函式與解構函式(例子2)。

- **例子1:**

  ```php
  class ParentClass
  {
    protected $Field1;
    function __construct($Value)
    {
      $this->Field1 = $Value;
      echo '建立物件時成功將Field1的值設定為'.$this->Field1.'<br>';
    }

    function __destruct() 
    {
      $this->Field1 = 0;
      echo '釋放物件時成功將Field1的值設定為'.$this->Field1.'<br>';
    }
  }
  class ChildClass extends ParentClass 
  {
    protected $Field2;
  }
  $MyObject = new ChildClass(100);
  $MyObject = NULL;
  ```

  **輸出**
  &emsp;&emsp;建立物件時成功將 Field1 的值設定為 100
  &emsp;&emsp;釋放物件時成功將 Field1 的值設定為 0

- **例子2:**

  ```php
  class ParentClass
  {
    protected $Field1;
    function __construct($Value)
    {
      $this->Field1 = $Value;
      echo '建立物件時成功將Field1的值設定為'.$this->Field1.'<br>';
    }

    function __destruct()
    {
      $this->Field1 = 0;
      echo '釋放物件時成功將Field1的值設定為'.$this->Field1.'<br>';
    }
  }
  
  class ChildClass extends ParentClass
  {
    protected $Field2;
    function __construct($Value)
    {
      $this->Field2 = $Value;
      echo '建立物件時成功將Field2的值設定為'.$this->Field2.'<br>';
    }
    function __destruct()
    {
      $this->Field2 = 0;
      echo '釋放物件時成功將Field2的值設定為'.$this->Field2.'<br>';
    }
  }
  $MyObject = new ChildClass(100);
  $MyObject = NULL;
  ```

  **輸出**
  &emsp;&emsp;建立物件時成功將 Field2 的值設定為 100
  &emsp;&emsp;釋放物件時成功將 Field2 的值設定為 0

  <br/>

  >在子類別呼叫父類別的建構函式或解構函式，可以使用下列敘述，其中建構函式的參數取決於實際狀況，而解構函式則沒有參數:
  
  ```php
  parent::_construce(參數);
  parent::destruct();
  ```

#### 7.11 php 中抽象方法

&emsp;&emsp;&emsp;「抽象方法」(abstract method)是一種特殊方法，它必須放在「抽象類別」(abstract class)內，抽象類別只有定義方法，沒有實作的部分，而且實作的部分必須藉由子類別來提供實作或擴充其功能，同時不可將其建立成其他物件，換句話說，抽象類別只能被繼承，不能被案例化(實體化)。

- **例子**：
  抽象方法必須放在抽象類別當中，且需為公開方法

  ```php
  //此敘述的開頭要有 abstract, 因為抽象方法必須放在抽象類別中。
  abstract class Payroll
  {
    public $EmpName;
    abstract public function Payment($Hours, $PayRate); //定義抽象方法
  }

  class BonusPayroll extends Payroll
  {
    //覆蓋抽象方法(參數個數必須相同)
    public function Payment($Hours, $PayRate)
    {
      return $Hours * $PayRate + 5000;
    }
  }
  echo '加上獎金之後的薪資為'.BonusPayroll::Payment(100, 80)'<br>';
  ```

  輸出:
  
#### 7.12 php 中的命名空間

&emsp;&emsp;「命名空間」是一種命名方式，用來組織各個類別、函式、常數等，它和這些元素的關係就像檔案系統中目錄與檔案的關係相同，其目的如下:

- 解決名稱衝突的問題: 當撰寫的 `PHP` 程式和 `PHP` 內建或其它人撰寫的類別、函式、常數發生名稱衝突時，可以利用命名空間來解決。

- 提供設定別名的功能: 當 `PHP` 程式裡類別、函式或常數的名稱太長會不易理解時，可以利用命名空間來設定簡短易讀的別名(alias)。

>事實上，若沒遇到上述的問題，可以不採用命名空間的方式。
 `use` 和 `namespace` 這兩個操作子都必需是全域的，寫在文件的最上方，換句話說，不能寫在函式、方法或類別中。

下面兩段程式碼，其功能是相同，但第二段程式碼有加入命名空間的概念。

- 代碼一
  
  ```php
  $Obj = new Class1;
  ```

- 代碼二
  
  ```php
  $Obj = new \Class1;
  ```

- 範例:
  舉例說，`MyClass` 隸屬於 `\A\B\C` 的命名空間，則可以如下方式來建立:

  ```php
  $Obj = new \A\B\C\MyClass;
  ```

  >其中反斜線 `\` 表示「全域範圍」，就像檔案系統中的根目錄一樣。

  原則上，命名空間的命名方式及分類是依照類別、函式、常數的性質而定，同時 `PHP` 程式均放在全域範圍 `\` 內。若要在 `PHP` 程式中自訂命名空間，可以使用 `namespace` 關鍵字，如下例子:

  ```php
  namespace my\name;            //在全域範圍內定義 my\name命名空間
  class MyClass {}              //在 \my\name命名空間內定義MyClass類別
    function Myfunction() {}    //在 \my\name命名空間內定義Myfunction函式
    const MYCONST = 1;          //在 \my\name命名空間內定義MYCONST常數
    $X = new \my\name\MyClass;  //建立 MyClass類別的物件，寫成 $X = new MyClass;亦可
    $Y = \my\name\MYCONST;      //定義 Y 為常數 MYCONST，寫成$Y = MYCONST;亦可
    echo $Y;                    //顯示Y的値
  ```

  >注意 namespace 敘述須放在檔案的最前端。此外，PHP5 已經支援命名空間，但 PHP6 在這項功能有點問題，若欲順利執行前面的例子程式，必須將版本回復到 PHP5，同時要重新啟動 Web Server，以便設定生效。

  最後來設定別名，以 上例說明子，假設在第2行的下一行插入如下敘述，表示使用 `use` 關鍵字將 `my\name` 命名空間的別名設定為 A:

  ```php
  use my\name as A;
  ```

  如此一來，第6、7行可以改寫成下，使用別名 A 取代 `my\name` 命名空間:
  
  ```php
  $x = new A\MyVlass;
  $y = A\MYCONST;
  ```

### 8. php 會話 session 與緩存 cookie（擴展）

&emsp;`session`和`cookie`都會是我們在`ajax`請求部分詳細說明的內容。但是我們有必要在這裡先對其概念有一個大致的瞭解，這樣有助於更好的理解後面部分的內容。

- **名詞解釋**：
&emsp;<font color='red'><b>`cookie`</b>指的是當訪問頁面的時，由後臺發往前臺頁面資料時所夾帶的一小段資訊。
&emsp;<b>`session`</b>可以理解為一種不斷驗證口令以獲得用戶持久連接的 "存取機制"。 </font>
- **原理說明**：
&emsp;當後臺返回給前臺資料的時候，添加的一段"持久"的資訊。
&emsp;因此這段資訊必須在php後臺代碼中插入添加。

- **相關技術**：
&emsp;(1) `php` 中 `$_GET` 和 `$_POST` 對象，用於在 `php` 中獲取 `get` 和 `post` 請求的資料物件
&emsp;(2) `php` 中 `time()` 用於獲取當前的時間戳記，單位是秒。支持加減法。
&emsp;(3) `php` 中 `setcookie('key','value',過期時間);` 用於設置緩存。
&emsp;(4) `html` 中 `document.cookie` 用來獲取頁面所保存的 `cookie` 值。類型是字串。

- **HTML 代碼:**

  ```javascript
  $('button').click(function (){
   $.ajax({
     type:"post",
     url:"php文件地址",
     data:{
       username:"allen",
       password:"1qaz@wsx"
     },
     dataType:"json",
     success:function(data){
       //console.log(data);
       if (data.msg == "OK") {
         alert("login OK");
       }
     }
   });
  });
  ```

- **PHP代碼：**

  ```php
  $uname = $_POST["username"];
  $upass = $_POST["password"];

  if( ($uname == 'allen') && ($upass== '1qaz@wsx')){
    setcookie('username', $uname, time() + 24 * 60 * 60);
    setcookie('password', $upass, time() + 24 * 60 * 60);
    //echo "登入成功";
    $success = array('msg'=>'OK', 'info'=>'hello');
    echo json_encode($success);
  }else{
    //echo "登入失敗";
    $success = array('msg'=>'fail', 'info'=>'hello');
  }
  ```

---
