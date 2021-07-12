---
title: mysql pdo 物件
urlname: mysql-pdo
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-09-29 21:21:22
author:
img:
coverImg:
password: 91c7d8df4d6f54259e2cf62c147901bba0bdd6b9daa8506ae89d66994bf4a1cb
summary:
tags: 
 - php
 - mysql
categories: php&mysql
---

## 1. singleton

&emsp;&emsp;`singleton` 中文名稱為 `單例模式`，是一種**建構類別**的設計模式(一套編寫類別的規範、技巧，將它作成公版來給大家使用；設計模式有許多種，例如:工廠模式、簡單工廠模式、抽象工廠模式、複雜模式、單例模式、高抽象模式..等)。其目的是為了在全域獲取這個類別的物件時<font color='red'>總是能獲取到唯一的物件</font>，而不是每次創建實體時都創建出新的物件的一種類別結構。特別的在 `DB` 操作中，`DB` 連接這種物件就必須是通過 `單例模式` 來實現的。

- 說明

  介紹在 `JavaScript` 中寫一個類別的方法: 透過原型方式(Prototype)。

  `01單例模式.html`

  ```javascript
  <script>
    //定義一個類別 Peo 具有特徵(姓名、年紀)
    function Peo(pname, page){
      this.perName = pname;
      this.peoAge = page;
    }
    //實例化，每一次對同類別實例化，都會產生新的物件，如下
    var allen = new Peo('allen', '28');
    var amy = new Peo('amy', '23');
  </script>
  ```

  >類別的主要目的在建構物件，所以每次創建類別都會獲得一個實體，這是正常操作現象，但是為了達到在全局開發中，對一個類別，不管創建幾次都只會得到一個物件，所以有了這個類別的設計模式:單例模式。

  ```php
  class DBConnectionSingleton{
    //通過私有，靜態聲明單例物件
    //私有方式: 保證只能在這個類別底下訪問
    //靜態變數: 只在聲明時被執行一次，但是可再改變數值的。
    private static $conn = null;
    //function __construct(){}
    public static function getconn(){
      /* self 指該類別內部
         如果它的靜態屬性: $conn 是空的話 (null 的布林值為 0)
         ::調用類常數或靜態變數用
         第一次時存在 private static $conn = null;
         $conn = null 即 false(假)， !假 => true，所以執行 new self();
         第二次後就視 "private static $conn = null;" 不存在了。 (!self::$conn) => 結果 !true => false，所以不執行 new self();
         通過靜態執行一次的特點保證物件唯一性
      */
      if(!self::$conn){
        self::$conn = new self();
      }
      return self::$conn;
    }
   }

   //外部調用第一次，static 聲明過的方法 getconn() 與 屬性 $conn, 不再被執行(視為不存在)，所以直接作判斷
   if(!self::$conn) //即 $conn 是空的話，將靜態變數 $conn=null 改變值 = new self(), 返回 new self() 給 $conn1
     $conn1 = DBConnectionSingleton::getconn();
   //外部調用第二次，static 聲明過的方法 getconn() 與 屬性 $conn, 不再被執行(視為不存在)，所以直接作判斷
   if(!self::$conn) // 此時 self::$conn 已被第一次作初始化了，所以 self::$conn 是 true，就不會再執行 "self::$conn = new self();", 返回第一次的 new self() 給 $conn2
     $conn2 = DBConnectionSingleton::getconn();
  ```

- 練習: 設計一單例模式

  `單例模式.php`

  ```php
  <?php
  /*
   self: self 在 php 的類別內部使用，表示當前類別本身
         比如在下面的類別中，self 等價於 richestMan
  */

  echo "<pre>";
  class richestMan
  {
    //創建單例類別中的唯一單例，聲明一個私有靜態變數
    private static $richestPeople = null;

    //創建單例方法，用來在全局中獲取唯一單例對象
    public static function findRichestMan()
    {
      //如果這人不存在就創建一個最富有的人
      if (self::$richestPeople == null) {
        self::$richestPeople = new self();
        self::$richestPeople->pname = '最富有的人';
        echo "========";
      }
      //如果存在，那麼就不用創建，而是直接把這個人返回就可以了
      return self::$richestPeople;
    }

    //公有屬性，當對象創建的時候，用來證明對象的身分
    public $pname = "";
  }

  $richMan1 = richestMan::findRichestman();
  $richMan2 = richestMan::findRichestman();
  print_r($richMan1);
  print_r($richMan2);
  ```

  **輸出**
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-pdo-1.png' class='nofancybox img-center' />

- 結論
  為何需要單例模式:
  
  - 例一:購物車
    網站中在任一頁面開啟時，購物車應該都只有一個，依過去類別的概念來作，打開一個頁面實例一個對象一個新的購物車對象，這時就須用單例的結構。
  - 例二:地圖
    全局中只希望一張地圖，否則一經修改又須一張地圖，將耗時耗力。

## 2. PDO 與 DB

- 為何需使用 PDO

  `mysqli_xxx()` 一系列的方法，都是針對 `mysql` 資料庫的操作。

- 問題

  公司成立剛開始人數約莫只有 5人，客戶幾百人，使用 **mysql** 就足夠應付，但公司發展到一規模階段後，比如員工人數有 5000人，用戶從幾千人變成千萬人時，這時 `mysql` 就不夠足以處理業務上的需求，資料庫需變大，這時如把 `mysql DB` 更換成容量更大，體積更大，處理能力更強的資料庫，比如升級成 `oracle`, 但問題是原先的程式都是透過 `mysql` 處理，所以一旦要變更資料庫，資料庫操作的指令也要改變，如果有多個 `php mysql` 程式頁面要轉換(例如: 轉成 `oracl`)，將造成一大維護成本問題產生，所以　`php` 提供了一訪問資料庫通用的方法。
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-pdo-2.png' width='60%' height='40%' class='nofancybox img-center' />

  >通過 `PHP` 操作 `PDO`, `PDO` 會將這些操作自動轉換成想要連接的資料庫操作的方法

- 描述
  - `PDO` 即 `PHP` 資料物件 (`PHP Data Object`)。
  - `PDO` 可被視為是一個工具，而這個工具為 `PHP` 訪問資料庫定義了一個羽量級的一致介面。
  - 實現 `PDO` 介面的每個資料庫驅動可以公開具體資料庫的特性作為標準擴展功能。

- 語法
&emsp;&emsp;&emsp;<font color='red'>$pdo = new PDO("DB名稱:host=主機名稱;dbname=DB名","DB帳號","DB密碼");</font>

- 注意
  - 利用 `PDO` 擴展自身並不能實現任何資料庫功能，必須使用一個具體資料庫的 `PDO` 驅動來訪問資料庫服務。
  - <font color='red'>PDO提供了一個【資料訪問】抽象層，這意味著不管使用哪種資料庫，都可以用相同的函數(方法)來查詢和獲取資料。</font>
  - `PDO` 不提供資料庫抽象層，它不會重寫 `SQL`，也不會模擬缺失的特性。
    如果需要的話，應該使用一個成熟的抽象層。
  - 從 `PHP 5.1` 開始附帶了 `PDO`，在 `PHP 5.0` 中是作為一個PECL擴展使用。
    `PDO` 需要 `PHP 5` 核心的新特性，因此不能在較早版本的 `PHP` 上運行。

- 總結
&emsp;&emsp;&emsp;`PDO` 就像是一把槍，而使用哪種資料庫就好比是選擇不同的子彈。
&emsp;&emsp;&emsp;不管子彈有怎樣的特性，擊發的方法總沒有偏差，都是開槍而已。

  >補充：在連接DB的時候，並不是每一次的連接都能保證一定完成。因此我們必須設置一個"保險"來説明我們監測連接的情況，這個東西就是
   <font color="red"> `try…catch` </font> 機制。

- 範例
  
  ```php
  try{
    $pdo  = new PDO("mysql:host=localhost;dbname=frankdb","root","");
  }catch(PDOException $e){
     echo "錯誤";
     echo $e->getMessage();
  }
  ```

  在整個 `try…catch` 結構中，`try` 部分是可能會出現異常的代碼。
  而當代碼執行的過程當中一旦 `try` 部分的代碼真的發生了異常，那麼會立即將這個異常拋出，並執行 `catch` 部分的代碼。
  `catch` 部分的形參 `$e` 就是用來接收拋出的異常的。

  可以這樣認為：上述結構是獲取 `PDO` 時的一個固定結構！

  `pdo對象與mysql數據庫連接.php`

  ```php
  <?php
  echo "<pre>";
  /* php 的 PDO 連接資料庫
     $pdo = new PDO("mysql:host=localhost;dbname=class", $user, $password);
     print_r($pdo);
     建立若成功會返回一個空對象。PDO 是一個介面，是一個工具，所以裡面什麼都沒有
     pdo 對象是一個在頁面中不可見內容的對象，這個對象只能靠創建成功與失敗來判斷連接，而無法查看內部的屬性和屬性值。
     因為 PDO 物件唯一空值，即為 false, 所以無法用 if ($pdo) 來做判斷是否連線，所以PHP提供另一機制來判斷 
     try{}catch(PDOException $e){}
     輸出:
     PDO object_get(${1:$object, {
     }
  */

  try {
     $pdo = new PDO("mysql:host=localhost;dbname=class", "root", "1qaz@wsx");
     //print_r($pdo);
  } catch (PDOException $e) {
    echo "錯誤";
    echo $e->getMessage();
  }
  ```

## 3. singleton 獲取 PDO

- 目的: 透過單例模式來確保唯一的 `$PDO` 對象去操作資料庫。

- 說明:
  操作資料庫時，後台的 `php` 頁面 與 `mysql DB` 是兩個獨立的東西，資料庫如同一表格，而 `php` 如同一文件，若要操作資料庫需要借助像是 `document` 類似的對象，這裡就是之前建立的 `$PDO` 對象。
  所以要操作資料庫就得透過 `$PDO` 對象，但如果操作:

  - PHP 要插入資料到資料庫時時，先找到一個 `$PDO` 對象。
  - PHP 要刪除資料到資料庫時時，再先找到一個 `$PDO` 對象。
  - :

    假設此刻資料庫為空，若有兩個對象 `$PDO` 來操作:
    case1: 一個 `$PDO` 先加 1, 另一個 `$PDO` 再-1, 不會有問題發生。
    case2: 但順序若相反，先做 減, 但資料庫此刻並無數據(一開始為空)，所以操作會失敗。

    意味著若使用兩個  `$PDO` 對象來操作，結果可能會不相同;因為沒辦法確認哪一個 `$PDO` 對象會先執行(程序是多執行緒性的)。
    所以解決的唯一辦法，就是指定同一個 `$PDO` 對象來做操作。

- 範例
  `03單例模式獲取pdo對像.php`

  ```php
  //通過單例模式，獲取唯一 $PDO:
  class singletonPDO{
    //創建私有 $靜態變數或常數
    private static $pdo = null;
    //獲取單例對象的方法
    public static function getPdo(){
      //當前類的靜態變數, 第一次調用若為空值時
      if(self::$pdo == null){
        //創建一個 $pdo(該 $pdo 為靜態，所以透過 :: 呼叫)
        try{
           self::$pdo = new PDO("mysql:host=localhost;dbname=class", "root", "1qaz@wsx");
        }catch(PDOException $error){
           echo "錯誤訊息為: " . $error->getMessage();
        }
      }
      return self::$pdo;
    }
  }

  //使用
  $pdo1 = singletonPDO::getPdo();
  ```

  每次使用 DB 要連上 DB 都要寫一次，太麻煩，所以將其寫成一獨立檔案，改成:

  `singletonPDO.php`

  ```php
  <?php
  //通過單例模式，獲取唯一 $PDO:
  class singletonPDO
  {
    //創建私有 $靜態變數或常數
    private static $pdo = null;
    //獲取單例對象的方法
    public static function getPdo()
    {
        //當前類的靜態變數, 第一次調用若為空值時
        if (self::$pdo == null) {
            //創建一個 $pdo(該 $pdo 為靜態，所以透過 :: 呼叫)
            try {
                self::$pdo = new PDO("mysql:host=localhost;dbname=class", "root", "1qaz@wsx");
            } catch (PDOException $error) {
                echo "錯誤訊息為: " . $error->getMessage();
            }
        }
        return self::$pdo;
    }
  }
  ?>
  ```

  然後再來引用:

  `03單例模式獲取pdo對像.php`

  ```php
  require_once 'singletonPDO.php';
  $pdo1 = singletonPDO::getPdo();
  $pdo2 = singletonPDO::getPdo();
  $pdo3 = singletonPDO::getPdo();

  //測試，若連線成功會回傳一個 PDO空物件
  print_r($pdo1);
  ```

## 4. PDO 實現 DB 增刪改查

&emsp;在上說明中說過，pdo是一種【資料訪問】層的抽象。
&emsp;因此本質上來講在面對同一種DB進行操作的時候，pdo的操作和php本身直接操作沒有區別。

- 範例
  `04pdo實現mysql增刪改操作.php`

  ```php
  require_once "singletonPDO.php";
  //通過單例方法獲取全域pdo單例對象
  $pdo = singletonPDO::getpdo();

  //exec()方法是pdo物件的執行方法，相當於php中的query()方法.
  $pdo->exec('set names utf8');

  /* 新增
     $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values('test','test','1qaz@wsx','男','2019-08-01','member','test@gmail.com','http://wda.edu.tw/test','098876543','台北市',1,'2008-10-21 12:06:08','2008-10-21 12:06:08')";
  */

  //刪除
  $sql = "DELETE FROM members WHERE m_username='test'";

  if($pdo->exec($sql)){
    //通過 pdo執行db操作
    echo "success";
  }else{
    echo "error";
  }
  ```

- 測試
  開啟網頁，執行 `04pdo實現mysql增刪改操作.php`。
  
- 結果: success
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-pdo-1.png' class='nofancybox img-center' />
  
- 刪除功能
  更換上述程式的 $sql 為:

  ```php
  $sql = "DELETE FROM members WHERE username='test'";
  ```

- 更新功能
  更換上述程式的 $sql 為:

  ```php
  //修改
  $sql = "UPDATE members set `m_sex`= '女'";
  $sql .= " WHERE m_id = 11";
  ```

- 測試: 開啟網頁，執行 `04pdo實現mysql增刪改操作.php`。
- 結果: success

  **<font color='red'>查詢</font>** ，回傳不是布林值:

  ```php
  $sql = "SELECT * FROM members WHERE 1";
  $result = $pdo->exec($sql); //這裡得到的是一個物件
  var_dump($result);   // int(0)
  ```

- 輸出:
  int(0)

  > 新增、刪除、修改執行上沒問題，但**查詢**的結果是一個不可見的值，而且這不可見的值，不知如何處理，這裡需借用 PDO 預處理 `prepare` 和交易處理 `transaction`

## 5. PDO 異常處理 Exception

&emsp;&emsp;**Exception** 指的都是在執行 db 操作的時候發生異常，例如SQL語句異常或語法錯誤。而如果是DB
連接發生的錯誤則不會走本異常處理，而是直接由pdo輸出連接失敗。

- 異常分兩大類:
  - 連接PDO時產生的異常，用 try {} catch(){} 去描述
  - 操作DB時產生的異常，用下面三方法來解決。

  異常處理Exception是指在`try…catch`時發生異常時的處理手段，通常異常處理都是直接拋出提醒即可。而設置提醒的手段有三種設置方式：

- 預設模式
  <font color='red'>主要依賴於系統提供的errorCode和errorInfo屬性實現</font>

- 警報模式：
  <font color='red'>為pdo設置setAttribu(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);</font>
- 中斷模式：
  <font color='red'>為pdo設置setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);</font>
  <font color='orange'>小貼士：需要說明的是異常處理並不是三種模式必須有一種顯式的去表現出來，哪怕一種都不主動寫出也不會認為是違法。只不過主動實現異常處理能夠在異常發生的時候給予我們更好的提示，因此推薦如果允許的情況下盡可能的添加異常處理模組代碼。</font>

  ```php
  try{
    $pdo = new PDO("mysql:host=localhost;dbname=class","root","1qaz@wsx");
    //$pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
    //$pdo -> setAttribut(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  }catch(PDOExeption $e){
    echo $e -> getMessage();
  }

  $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)";

  $res = $pdo->exec($sql);

  if($res){
    echo "succes";
  }
  else{
    echo $pdo -> errorCode();
    echo $pdo -> errorInfo();
  }
  ```

- 範例:

  `05pdo異常捕獲.php`

  ```php
  <?php
  echo "<pre>";
  // 第一類異常，數據庫連接異常
  // 這種異常直接通過try...catch捕獲
  try {
    $pdo = new PDO('mysql:host=localhost;dbname=class', 'root', '1qaz@wsx');

    // 第二類異常，第二種處理方法
    // 設置當數據庫操作發生異常的時候，彈出警報，但程序執行不會中斷
    //$pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    // 第二類異常，第三種處理方法
    // 設置當數據庫操作發生異常的時候，進行中斷
    // $pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  } catch (PDOException $err) {
    echo 'db 連接失敗，原因是：' . $err->getMessage();
  }

  //連接成功的話
  $pdo->exec('set names utf8');
  $sql = "UPDATE members set `m_sex`= '男'";
  $sql .= " WHERE m_id = 11";

  if ($pdo->exec($sql)) {
    echo '操作成功';
  } else {
    // 第二類異常，第一種處理方法(直接通過系統提供的errorCode()和errorInfo()屬性實現)
    echo '操作失敗';
    // echo $pdo->errorCode();
    // echo $pdo->errorInfo();
  }
  ```

  > 注意: 即使 SQL 語句執行成功，但沒更新資料(例:無須改變)，仍會回傳 false。

## 6. PDO 預處理 prepare

&emsp;&emsp; 預處理語句`prepare`是 `pdo` 提供的一中 `db` 操作方式。其語言邏輯與正常的 `pdo` 訪問相同。但區別在於 `prepare` 語句允許用戶在【設置sql語句】與【執行sql語句】之間部分進行參數的注入與提取操作，而不是像正常的pdo訪問一樣直接將參數寫死。

- 正常 `pdo` 直接訪問程序
  【設置 `sql` 語句】→【執行 `sql` 語句】

  ```php
  $sql = "SQL 語句";
  $pdo->exec($sql);
  ```

- 預處理訪問程序
  【設置 `sql` 語句】→ <font color='red'>【執行 sql 語句】</font> →  <font color='red'>【處理sql中參數】</font>  → 【執行sql語句】

  ```php
  $sql = "SQL 語句";
  $pdo->prepare();
  ```

  `prepare` 是另一種像是 `$PDO` 提供資料庫操作 `exec` 的另一種方法，只是部分功能。
  預先處理得到一種結果，再用這結果執行另一新方法，這新方法可處理sql中所需參數，然後最後再執行 `$pdo->exec($sql)`。

- 區別
  在於再處理參數時，預處理可以將當初用  `$pdi->exec();` 處理上，看不到，拿不到，獲取不到的內容，通過處理參數後可取得。

  處理分三部分

  1. 關鍵核心: `prepare()` 預<font color=red>處理 `sql` 語句</font> 和 `execute()` <font color='red'>處理sql 中參數</font> 兩種方法，
  2. bindValue()
  3. bindColumn()

### 6.1 prepare()方法和execute()方法

1. 描述：
   - prepare()方法為預處理sql語句的方法，能夠讓pdo預先處理【半成品的】sql語句。
   並生成一個 `PDOStatementObject` 類型的結果。

   - execute()方法是提供給 PDOStatementObject 類型物件去執行的【成品】sql語句的方法並生成一個 `PDOStatementObject` 類型的結果。

2. 說明：

   - 交由 pdo去prepare預處理的【半成品】sql語句，使用?問號作為預留位置，表示待傳參的參數

   - prepare預處理必須只能處理【半成品】sql語句，如果是完整則需要使用exec方法執行

   - execute()方法允許一個陣列作為參數，將參數帶入到預處理的sql語句中，並且會將結果存放到 PDOStatementObject 對象中。

   - PDOStatementObject 物件在預處理的不同階段有著不同的含義！！不可混淆，必須根據上下文判斷。

3. 語法：
  
   ```php
   $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
   $pdoStatementObject = $pdoStatementObject->prepare($sql);
   echo $pdoStatementObject->execute(array(test','test','1qaz@wsx','男','2019-08-01','member','test@gmail.com','http://wda.edu.tw/test','098876543','台北市',1,'2008-10-21 12:06:08','2008-10-21 12:06:08'));
   ```

   ```php
   $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
   $pdoStatementObject = $pdoStatementObject->prepare($sql);
   ```

   上面寫法等同:

   ```php
   $pdoStatementObject->exec("INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
   ```

4. 範例:

   `06pdo預處理語句.php`

   ```php
   <?php
   echo "<pre>";
   require_once 'singletonPDO.php';
   $pdo = singletonPDO::getPdo();
   $pdo->exec('set names utf8');

   //半成品sql語句
   //只能由prepare 預處理語句執行
   $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
   $halfPro = $pdo->prepare($sql);
   var_dump($halfPro);
   // 得到的是 PDOStatement, PDO 的語句對象，裡面有
   /*
     object(PDOStatement)#2
     (1) {
           ["queryString"]=> string(195) "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
         }
   */
   //將半成品通過 execute方法傳入參數，變成成品
   $result = $halfPro->execute(['test','$test','1qaz@wsx','男','2019-08-01','member','test@gmail.com','http://wda.edu.tw/test','098876543',台北市',1,'2008-10-21 12:06:08','2008-10-21 12:06:08']);
   var_dump($result);   //執行成功回傳 TRUE
   ?>
   ```

### 6.2 bindColumn()方法

- 描述：
  `bindColumn()` 方法允許將執行結果的一列資料綁定到一個指定物件上，本方法需要在 `execute()` 方法執行結束後在執行。

- 語法：<font color='red'>$pdoStatementObject->bindColumn(index,指定變數);</font>

- 說明：

  - 第一個參數表示結果中的第幾列(col)資料。第一列(col)就寫1，以此類推。
    >指: SQL 執行的到結果的欄位索引值。
  - 第二個參數表示資料要賦值給那個變數，隨便一個變數即可。
    >指: 用來儲存該欄位的值。
  - bindColumn()方法一次綁定一列給一個變數，如需綁定多個，則執行多次即可。

- 例子：

  ```sql
  $sql = "SELECT * FROM members WHERE 1";
  $pdoStatementObject = $pdo -> prepare($sql);
  $pdoStatementObject -> execute();
  $pdoStatementObject -> bindColumn(1,$name);
  $pdoStatementObject -> bindColumn(2,$username);
  $pdoStatementObject -> bindColumn(3,$passwd);
  $pdoStatementObject -> bindColumn(4,$sex);
  $pdoStatementObject -> bindColumn(5,$birthday);
  $pdoStatementObject -> bindColumn(6,$level);
  $pdoStatementObject -> bindColumn(7,$email);
  $pdoStatementObject -> bindColumn(8,$url);
  $pdoStatementObject -> bindColumn(9,$phone);
  $pdoStatementObject -> bindColumn(10,$address);
  $pdoStatementObject -> bindColumn(11,$login);
  $pdoStatementObject -> bindColumn(12,$logintime);
  $pdoStatementObject -> bindColumn(13,$jointime);

  while($row = $pdoStatementObject->fetch(PDO::FETCH_COLUMN)){
    echo "{$name}"."----"."{$username}". "----"."{$passwd}"."----"."{$sex}"."----"."{$birthday}"."----"."{$level}"."----"."{$email}"."----"."{$url}"."----"."{$phone}"."----"."{$login}"."----"."{$logintime}"."----"."{$jointime}"."<br/>";
  }
  ```

- 練習: 修改原 `06pdo預處理語句.php` 的SQL 插入操作，變成查詢 `06pdo預處理語句_查詢.php`:

  `06pdo預處理語句_查詢.php`

  ```php
  <?php
  // bindColumn
  echo "<pre>";
  require_once 'singletonPDO.php';
  $pdo = singletonPDO::getPdo();
  $pdo->exec('set names utf8');

  //半成品sql語句
  //只能由prepare 預處理語句執行
  $sql = "SELECT * FROM members WHERE 1";
  $halfPro = $pdo->prepare($sql);
  var_dump($halfPro);
  // 得到的是 PDOStatement, PDO 的語句對象，裡面有
  // object(PDOStatement)#2 (1) {
  // ["queryString"]=>
  //  string(51) "INSERT INTO members values(?,?,?,?,?,?,?,?,?,?,?,?)"
  // }
  //將半成品通過 execute方法傳入參數，但尚讀不出來
  $result = $halfPro->execute();

  //將結果中的內容綁定在指定變數上
  $halfPro->bindColumn(1, $name);
  $halfPro->bindColumn(2, $username);
  $halfPro->bindColumn(3, $passwd);
  $halfPro->bindColumn(4, $sex);
  $halfPro->bindColumn(5, $birthday);
  $halfPro->bindColumn(6, $level);
  $halfPro->bindColumn(7, $email);
  $halfPro->bindColumn(8, $url);
  $halfPro->bindColumn(9, $phone);
  $halfPro->bindColumn(10, $address);
  $halfPro->bindColumn(11, $login);
  $halfPro->bindColumn(12, $logintime);
  $halfPro->bindColumn(13, $jointime);

  //讀取查詢結果
  $info = [];
  for ($i = 0; $row = $halfPro->fetch(PDO::FETCH_COLUMN); $i++) {
    $info[$i] = array('name' => $name, 'username' => $username, 'passwd' => $passwd,
        'sex' => $sex, 'birthday' => $birthday, 'level' => $level,
        'email' => $email, 'url' => $url, 'phone' => $phone,
        'address' => $address, 'login' => $login, 'logintime' => $logintime,
        'jointime' => $jointime,
    );
    print_r($info);
  }

  /* while ($row = $halfPro->fetch(PDO::FETCH_COLUMN)) {
       echo "{$name}" . "----" . "{$username}" . "----" . "{$passwd}" . "----" . "{$sex}" . "----" . "{$birthday}" . "----" . "{$level}" . "----" . "{$email}" . "----" . "{$url}" . "----" . "{$phone}" . "----" . "{$login}" . "----" . "{$logintime}" . "----" . "{$jointime}" . "<br/>"; 
     }
  */
  ```

### 3. bindValue()方法

1. 前言:
   之前的方式，`SQL` 查詢中，使用 `prepare()` 做SQL 語句預處理，得到的半成品，再利用 `execute()`　傳遞所需參數，同時轉換得到成品，但讀不到內容，將結果中的內容透過 `bindColumn()` 來綁定資料在指定變數上。

   若不想使用 `execute()` 來傳遞參數，可以改用 `bindValue()` 來給半成品的 SQL 語句進行傳值。

2. 描述：
   bindValue()方法是提供給　pdo　預處理之後得到的　PdoStatementObject 物件使用的方法，用來給【半成品】的sql語句進行傳值。

3. 語法：<font color='red'>$pdoStatementObject->bindValue(index,value);</font>

4. 說明:
   - 第一個參數表示給sql語句中第幾個參數傳值。第一個就寫1，以此類推。
   - 第二個參數表示給sql語句中的對應參數傳的具體的值。
   - bindValue一次綁定一個參數，如果有多個則需要調用多次。

5. 例子：

   ```sql
   $sql = "INSERT INTO members values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
   $pdoStatementObject = $pdo->prepare($sql);
   $halfPro->bindValue(1, 'test');
   $halfPro->bindValue(2, 'test');
   $halfPro->bindValue(3, '1qaz@wsxd');
   $halfPro->bindValue(4, '男');
   $halfPro->bindValue(5, '2019-08-01');
   $halfPro->bindValue(6, 'member');
   $halfPro->bindValue(7, 'test@gmail.com');
   $halfPro->bindValue(8, 'http://wda.edu.tw/test');
   $halfPro->bindValue(9, '098876543');
   $halfPro->bindValue(10, '台北市');
   $halfPro->bindValue(11, 1);
   $halfPro->bindValue(12, '2008-10-21 12:06:08');
   $halfPro->bindValue(13, '2008-10-21 12:06:08');
   echo $pdoStatementObject->execute();
   ```

   `07pdo補充bindValue方法.php`

   ```php
   echo "<pre>";
   require_once 'singletonPDO.php';
   $pdo = singletonPDO::getPdo();
   $pdo->exec('set names utf8');

   $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

   $halfPro = $pdo->prepare($sql);

   //在prepare()方法和execute()方法之間，對sql語句中的？傳值
   //提供了一種更靈活的方式，來編輯sql語句
   $halfPro->bindValue(1, 'test');
   $halfPro->bindValue(2, 'test');
   $halfPro->bindValue(3, '1qaz@wsxd');
   $halfPro->bindValue(4, '男');
   $halfPro->bindValue(5, '2019-08-01');
   $halfPro->bindValue(6, 'member');
   $halfPro->bindValue(7, 'test@gmail.com');
   $halfPro->bindValue(8, 'http://wda.edu.tw/test');
   $halfPro->bindValue(9, '098876543');
   $halfPro->bindValue(10, '台北市');
   $halfPro->bindValue(11, 1);
   $halfPro->bindValue(12, '2008-10-21 12:06:08');
   $halfPro->bindValue(13, '2008-10-21 12:06:08');

   //習慣上execute()方法不傳參，僅代表執行作用
   $halfPro->execute();
   $result = $halfPro->execute(['test', 'test', '1qaz@wsx', '男', '2019-08-01', 'member', 'test@gmail.com', 'http://wda.ed
   ```

   這種方式好處，是傳遞的值可以寫成一變數,提供了一種更靈活的方式，來編輯 `sql` 語句。

   ```php
   //$name = $_POST['name']
   //$username = $_POST['username']

   echo "<pre>";
   require_once 'singletonPDO.php';
   $pdo = singletonPDO::getPdo();
   $pdo->exec('set names utf8');

   $sql = "INSERT INTO members (`m_name`,`m_username`,`m_passwd`,`m_sex`,`m_birthday`,`m_level`,`m_email`,`m_url`,`m_phone`,`m_address`,`m_login`,`m_logintime`,`m_jointime`)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

   $halfPro = $pdo->prepare($sql);

   //在prepare()方法和execute()方法之間，對sql語句中的？傳值
   //提供了一種更靈活的方式，來編輯sql語句
   $halfPro->bindValue(1, $name);
   $halfPro->bindValue(2, $username);
   $halfPro->bindValue(3, '1qaz@wsxd');
   $halfPro->bindValue(4, '男');
   $halfPro->bindValue(5, '2019-08-01');
   $halfPro->bindValue(6, 'member');
   $halfPro->bindValue(7, 'test@gmail.com');
   $halfPro->bindValue(8, 'http://wda.edu.tw/test');
   $halfPro->bindValue(9, '098876543');
   $halfPro->bindValue(10, '台北市');
   $halfPro->bindValue(11, 1);
   $halfPro->bindValue(12, '2008-10-21 12:06:08');
   $halfPro->bindValue(13, '2008-10-21 12:06:08');

   //習慣上execute()方法不傳參，僅代表執行作用
   $halfPro->execute(); //成功會回傳 true
   ```

## 7. PDO 交易處理 transaction

- 交易：多個事件組成的結構。

- 事件：事件實際上就是<font color=red>預處理語句執行的<b>execute</b>語句</font>。
  >即多個　execute 子句

- 注意：

  1. 整個交易操作必須放到　`try...catch`　中，這是因為我們並不能保證執行的事件一定成功。
     而對於整個交易而言，任何一個事件的失敗都會導致catch的觸發。
     而catch觸發就意味著必須將之前做出的所有的操作都必須還原回滾操作: `$pdo->rollBack()`

  2. 動作陳述式(CRUW)必須在交易開啟之後執行，在交易提交之前停止.
     開啟交易：`$pdo->beginTransaction();`
     關閉交易：`$pdo->commit();`
  
  3. 中文處理方案(避免亂碼)：
     讀取：`$pdo->query("set names utf8");`
     插入：`$pdo->exec('set names utf8');`

  4. 銀行轉帳:
     - 提錢 -> 轉多少 -> 輸入密碼 -> 成功　-> 轉帳成功
     - 提錢 -> 轉多少 -> 輸入密碼 -> 錯誤　-> 轉帳失敗

     > 只有成功，才允許轉錢出去。

- 交易目的：保證只有在交易成功才會有影響發生，否則不會有任何異動

  ```php
  require_once "singletonPDO.php";
  $pdo = singletonPDO::getpdo();
  $pdo->query('set names utf8');
  $pdo->exec('set names utf8');
  try{
     $pdo->beginTransaction();
     $sql = "UPDATE members set `m_sex`=?, `m_login`=?";
     $sql .= " WHERE m_id = ?";
     $pdoso = $pdo->prepare($sql);

     //成功
     $pdoso->execute(array('女', 12, 11’));
     //失敗，參數不符
     $pdoso->execute(array(777));

     echo $pdo->commit();
  }catch (PDOException $e){
     $pdo -> rollBack();
     echo "失敗";
  }
  ```

  `08pdo交易處理transaction方法.php`

  ```php
  <?php
  require_once 'singletonPDO.php';
  $pdo = singletonPDO::getPdo();
  $pdo->exec('set names utf8');

  try {
    //開啟交易處理
    $pdo->beginTransaction();
    //創建一個修改sql語句
    $sql = "UPDATE members set `m_sex`=?, `m_login`=?";
    $sql .= " WHERE m_id = ?";

    $halfPro = $pdo->prepare($sql);

    //執行第一條execute語句(第一個事件)
    $halfPro->execute(['女', 123, 11]);
    //執行第二條execute語句(第二個事件),沒給 m_id， 數據不足，會觸發 Exception，本次交易發生異常
    //操作錯誤，屬於第一類異常，執行到這有問題，就該中斷停止繼續往下執行，異常需設中斷模式
    $halfPro->execute(['lileilei', 100]);

    //提交交易
    $pdo->commit();
  } catch (PDOException $e) {
    $pdo->rollBack();
    echo '交易處理失敗，數據庫回滾到交易開始之前的狀態，沒有受到任何影響';
  }
  ```

  執行第二條 `execute` 語句(第二個事件),沒給 `m_id`， 不足數據，所以會觸發 `Exception`，本次交易發生異常。

  此錯誤為操作錯誤，屬於第一類異常，執行到這裏有問題，就該中斷停止繼續往下執行，異常需設中斷模式，在單例模式產生 `$PDO` 就要加入：
  `$pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`

  ```php
  <?php
  //通過單例模式，獲取唯一 $PDO:
  class singletonPDO
  {
    //創建私有 $靜態變數或常數
    private static $pdo = null;
    //獲取單例對象的方法
    public static function getPdo()
    {
      //當前類的靜態變數, 第一次調用若為空值時
      if (self::$pdo == null) {
        //創建一個 $pdo(該 $pdo 為靜態，所以透過 :: 呼叫)
    　  try {
      　  self::$pdo = new PDO("mysql:host=localhost;dbname=class", "root", "1qaz@wsx"
          self::$pdo->setAttribute(PDO::ATTR_ERRMODEPDO::ERRMODE_EXCEPTION);
        } catch (PDOException $error) {
          echo "錯誤訊息為: " . $error->getMessage();
    　  }
      }
    }
    return self::$pdo;
  }
  ```

## 8. 學生管理實例

---
