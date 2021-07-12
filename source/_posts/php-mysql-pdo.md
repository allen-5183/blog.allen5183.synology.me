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
password: 5616b70ad3dda5e6509877de73ccd63eddb79073a6749dcbd1ec23f1bbb0856a
summary:
tags: 
 - php
 - mysql
categories: php&mysql
---

## 1. singleton

&emsp;&emsp;`singleton` 中文名稱為 `單例模式`，是一種**建構類別**的設計模式(一套編寫類別的規範、技巧，將它作成公版來給大家使用；設計模式有許多種，例如:工廠模式、簡單工廠模式、抽象工廠模式、複雜模式、單例模式、高抽象模式..等)。其目的是為了在全域獲取這個類別的物件時<font color='red'>總是能獲取到唯一的物件</font>，而不是每次創建實體時都創建出新的物件的一種類別結構。特別的在 `DB` 操作中，`DB` 連接這種物件就必須是通過 `單例模式` 來實現的。

- 說明

  在 `JS` 中寫一個類別:

  `01單例模式.html`

  ```javascript
  <script>
    //定義一個類別 Peo 具有特徵(姓名、年紀)
    function Peo(pname, page){
      this.perName = pname;
      this.peoAge = page;
    }
    //實例化，每一次對同類別實例化，都會產生新的物件，如下
    var allen = new Peo('allen', '18');
    var aby = new Peo('aby', '20');
  </script>
  ```

  >類別的主要目的在建構物件，所以每次創建類別都會獲得一個實體，這是正常操作現象，但是為了達到在全局開發中，對一個類別，不管創建幾次都只會得到一個物件，所以有了這個類別的設計模式:單例模式。

  ```php
  class DBConnectionSingleton{
    //通過私有，靜態聲明單例物件
    //私有: 保證只能在這個類別底下訪問
    //靜態: 只在 class DBConnectionSingleton{::} 聲明時被執行一次。
    private static $conn = null;
    //function __construct(){}
    public static function getconn(){
      //self 指該類別內部
      //如果它的靜態屬性: $conn 是空的話
      //::調用類常數或靜態變數用
      if(!self::$conn){
        /*第一次時存在 private static $conn = null;
          $conn = null 即 false(假)， !假 => true，所以執行 new self();
          第二次後就視 "private static $conn = null;" 不存在了。 (!self::$conn) => 結果 !true => false，所以不執行 new self();
       通過靜態執行一次的特點保證物件唯一性
        */
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
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-1.png' class='nofancybox img-center' />
  
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

  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-2.png' width='60%' height='40%' class='nofancybox img-center' />
  
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

- 目的: 透過單例模式來確保唯一的 $PDO 對象去操作資料庫。

- 說明:
  操作資料庫時，後台的 php 頁面 與 mysql DB 是兩個獨立的東西，資料庫如同一表格，而 php 如同一文件，若要操作資料庫需要借助像是 document 類似的對象，這裡就是之前建立的\$PDO 對象。
  所以要操作資料庫就得透過 $PDO 對象，但如果操作:

  - PHP 要插入資料到資料庫時時，先找到一個 \$PDO 對象。
  - PHP 要刪除資料到資料庫時時，再先找到一個 $PDO 對象。
  - :

    假設此刻資料庫為空，若有兩個對象 \$PDO 來操作:
    case1: 一個 \$PDO 先+1, 另一個 \$PDO 再-1, 不會有問題發生。
    case2: 但順序若相反，先做 -, 但資料庫此刻並無數據(一開始為空)，所以操作會失敗。

    意味著若使用兩個  \$PDO 對象來操作，結果可能會不相同;因為沒辦法確認哪一個 \$PDO 對象會先執行(程序是多執行緒性的)。
    所以解決的唯一辦法，就是指定同一個 \$PDO 對象來做操作。

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
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-3.png' class='nofancybox' />

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
      　  self::$pdo = new PDO("mysql:host=localhost;dbname=class", "root", "1qaz@wsx");  
         self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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

## Ajax與Http協議

## Ajax與Http協議詳解

我們在jQuery中已經提到了Ajax，並且通過$.ajax()方法實現了和前後臺完成的簡單交互。但事實上在工作當中jQuery所提供的功能卻是遠遠不夠的，絕大部分的公司實際上並不希望他們的開發者使用現有的Ajax框架，而是選擇自行封裝一個功能相似但針對性卻更強的內容。因此我們必須知道在js內部，Ajax到底是怎樣工作的。

而在此之前，讓我們先對Ajax本身做一些詳細的說明。

- 描述：Ajax全名為Asynchronous javascript and xml。
       <font colr='red'>是指圍繞【由js向伺服器發起http請求】這個功能而開發的一整套完整的做法。</font>

- 由來：99 年 Microsoft 公司第一次在 IE5.0中引入此功能
       04 年 Gmail 發佈、05 年 Google Map發佈時此功能才被重視
       05 年 2月 Ajax正式提出
       06 年 W3C 發佈其對應的國際化標準

- 概述：Ajax模組在處理網路請求的時候包括以下四個步驟
  1. 創建Xhr對象
  2. 發出HTTP請求
  3. 接收伺服器回傳的資料
  4. 更新網頁數據

- 補充：`Ajax`可以發出同步請求，也可以發出非同步請求。
       但大多數情況下指的是非同步請求，因為同步的 `Ajax` 請求對流覽器會產生"阻塞效應"。

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

## xhr對象

## xhr物件發送請求整體感知

【Ajax發送請求】這件事情並不是一句話帶過就可以的，在Ajax中對整個請求從創建到發送都有著一套嚴格的標準流程。就好像車間生產產品，流水線上每一個步驟的操作完畢之後才能打包出售。

在Ajax規則中，"請求"<font color='red'>從創建到被發送</font>需要至少經歷如下幾個步驟：

通過XMLHttpRequest類創建xhr對象
為xhr物件添加屬性與回檔方法
令xhr物件執行open()方法，指明請求被發往某處
令xhr物件執行send()方法，發出請求。

- 說明：XMLHttpRequest物件用來在【流覽器】與【伺服器】之間傳送資料。
     <font color='red'>通俗上來說將此物件稱為request請求物件、請求物件或請求。</font>

### xhr 物件的常用屬性與方法

&emsp;&emsp;在整體感知中我們看到的例子中的屬性和方法，基本都是要掌握的內容。或許有一些內容並沒有體現在上面，但相信我他們都會是你今後離不開的東西。

#### onreadystate 屬性

- 描述：`onreadystatechange` 屬性指向一個回呼函數。
       當頁面的載入狀態發生改變的時候 `readyState` 屬性就會跟隨發生變化，
       而這時 `readystatechange` 屬性所對應的回呼函數就會自動被調用。

- 語法：<font color='red'>xhr.onreadystatechange = function(){};</font>

#### readyState 屬性

- 描述：是一個唯讀屬性，用一個整數和對應的常量來表示 `XMLHttpRequest` 請求當前所處的狀態
       一般會在 `onreadystatechange` 事件的回呼函數中，
       通過判斷 `readyState` 屬性的值，進而執行不同狀態對應的函數。

- 語法：
  
  ```php
  xhr.onreadystatechange = function(){
   if(xhr.readyState == n){
     // 執行對應的函數
   }
  }
  ```

- 說明：
  值為 `0`,對應常量 `UNSENT`
  表示 `XMLHttpRequest` 實例已經生成，但是 `open()` 方法還沒有被調用。

  值為 `1`,對應常量 `OPENED`
  表示 `send()` 方法還沒有被調用，仍然可以使用 `setRequestHeader()` 設定 `HTTP` 請求頭

  值為 `2`,對應常量 `HEADERS_RECEIVED`
  表示 `send()` 方法已經執行，並且頭資訊和狀態碼已經收到。

  值為 `3`,對應常量 `LOADING`
  表示正在接收伺服器傳來的 `body` 部分的資料，如果 `responseType` 屬性是text或者空字串，responseText就會包含已經收到的部分資訊。

  值為 `4`,對應常量 `DONE`，表示伺服器資料已經完全接收，或者本次接收已經失敗了。

#### status屬性

- 描述：表示本次請求所得到的HTTP狀態碼，它是一個整數。

- 語法：
  
  ```php
  if(xhr.readyState == n){
    if(xhr.status == 200){
     //通信成功
    }
  }
  ```

- 說明：
    a.本屬性是唯讀屬性。
    b.本屬性有以下可能值：

  200, OK，訪問正常
  301, Moved Permanently，永久移動
  302, Move temporarily，暫時移動
  304, Not Modified，未修改
  307, Temporary Redirect，暫時重定向
  401, Unauthorized，未授權
  403, Forbidden，禁止訪問
  404, Not Found，未發現指定網址
  500, Internal Server Error，伺服器發生錯誤

- 補充：一般來說認為 200 就是通信成功的標誌。

#### statusText屬性

- 描述：表示伺服器發送的狀態提示，是一個唯讀字串。
- 語法：`<font color='red'>xhr.statusText</font>`
- 說明：不同於status屬性，該屬性返回狀態碼所對應的狀態資訊。
       比如OK。

#### responseText屬性

- 描述：返回從伺服器接收到的字串內容，該屬性為唯讀。
       如果本次請求沒有成功或者資料不完整，該屬性就會等於null。
       如果伺服器返回的資料格式是JSON，就可以使用responseText屬性來進行資料解析。

- 語法：`<font color='red'>xhr.responseText</font>`

#### open()方法

- 描述：表示要將請求發往某處，只是設置而不是真的發送。

- 語法：xhr.open('請求類型'，'url地址'，是否非同步);

- 說明：
  - 第一個參數用來設置 `get/post` 請求
  - 第二個參數用來設置請求發送到的 `url` 地址
  - 第三個參數是布林值用來設置是否非同步發送，預設 `false` 表示同步。

- 補充：
  目前因為我們的頁面都採用 `localhost` 方式在本地主機直接訪問，
  因此 `url` 直接寫出 `php` 檔的相對路徑即可。

  而如果通過其他方式打開可能會引起js的跨域問題，就會報錯。
  而這並不是今天的內容。

#### setRequestHeader()方法

- 描述：用於設置HTTP頭信息。
- 語法：xhr.setRequestHeader(‘key’，’value’);
- 說明：
     本方法必須在open()之後、send()之前被調用
     本方法用來設置在請求發送時，一併被發送出的一些補充資訊
- 例子：

  ```php
  xhr.setRequestHeader('Content-Type', 'application/json'); 
  xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
  xhr.send(JSON.stringify(data));
  ```

#### send()方法

- 描述：用於實際發出HTTP請求。
- 語法：`xhr.send(formData);`
- 說明：`send()`方法的參數是表單數據，為 `post` 請求準備。
       如果是 `get` 請求則參數直接寫 `null` 即可。

## xhr對象發送post請求

- 描述：`post` 請求和 `get` 請求的差異就在於多了一個表單數據，
       在 `xhr` 物件中可以通過 `FormData` 進行構建

- 語法：

  ```php
  var formData = new FormData();
  formData.append('key',value);//value如果是字串類型要加引號。
  xhr.send(formData);
  ```

- 說明：
      至於formData的創建時機和位置，只要你能夠在請求發送出去之前
      也就是xhr.send()語句被寫出之前添加給xhr對象
      那麼你願意把formData放在哪就放在哪。

- 例子：

  ```php
  var userName = document.querySelector('.userName').value;
  var password = document.querySelector('.password').value;
  var formData = new FormData();
  formData.append('userName',userName);
  formData.append('password',password);
  ```

## xhr物件的相容性問題

- 描述：xhr物件的獲取方式在IE和非IE下是需要使用不同方法。
- 語法：
      標準流覽器支援的方法為: XMLHttpRequest()
      IE流覽器支援的方法為: ActiveXObject()
- 例子：

  ```php
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else if(window.ActiveXObject){
    xhr = new ActiveXObject();
  }
  ```

說明：可以直接使用三目運算子解決

  ```php
  xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("");
  ```

## 請求超時timeout與超時監聽ontimeout

- 描述：timeout屬性等於一個整數，用來設置當請求發出後等待接收回應的時間。
       ontimeout()方法則是當等待超時後，自動執行的回檔方法。

- 語法：

  ```php
  xhr.timeout = xxx;
  xhr.ontimeout=function(){
     console.error("The request for"+url地址+"timed out");
  };
  ```

- 說明：timeout屬性單位是毫秒，表示當請求發出後等待回應的時間。
       如果在設置的時間內沒能收到後臺回應的內容，則認為請求超時(執行ontimeout)。
- 補充：如果該屬性等於0，就表示沒有時間限制。
- 例子：
  
  ```php
  xhr.timeout = 5000;//5秒後超時
  xhr.ontimeout = function(){
    console.error("The request for "+ajax.php+"timed out.");
  };
  ```

## 登錄post請求實例

- 要求

1. 在 `html` 頁面中獲取使用者資訊，並在點擊的時候將資訊 `post` 到後臺。
2. 在 `php` 檔中通過 `$_POST` 對象獲取 `html` 檔發來的資訊，並根據輸入內容進行回應擴展。
3. 如果前兩問能夠自行實現並且沒問題，則使用 `sql` 語句來檢查輸入的用戶名密碼是否是 `DB` 中的條目，並根據 `DB` 的檢索結果回饋給用戶。

>小貼士：操作db的時候，最好php原生操作和pdo操作都寫一遍。
        另外sql語句要求不看提示自行編寫。

## 發送檔進度條實例(擴展)

---

## 封裝Ajax與跨域

### 引言

&emsp;&emsp;對於`Ajax`現在相信大家已經不會陌生了，無論是原生的`XMLHttpRequest` 方式發送還是通過 `jQuery`
框架中提供的 `$.ajax` 方式。但是從實際工作角度來說並不是所有的公司都喜歡採用上面兩種方式進行請求的發送。

其原因在於：

- <font color='red'>原生的方式過於繁瑣，並且大量重複代碼。</font>
- <font
color='red'>jQuery的方式雖然方便，但必須引入jQuery框架，而框架中不是所有的內容都能用到，這就造成了大量無用代碼的堆積。佔用資源
因此我們自行封裝滿足於我們需求的`Ajax`框架就勢在必行，這節課我們就一起來封裝一個屬於我們自己的`Ajax`框架。</font><br>
在此之前為了能更好的的理解今天的內容，讓我們先一起複習一下前兩種方式：
- 原生Ajax請求
- jQuery中的$.ajax()請求

### 原生Ajax請求

- 範例
  
  ```php
  var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        console.log(JSON.parse(xhr.responseText));
      }else{
        console.log(xhr.statusText);
      }
    }
  }
  xhr.open('請求類型get/post','請求位址url',true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(如果post請求則在這些formData);
  ```

### jQuery中的$.ajax()請求

- 範例
  
  ```php
  <script src='xxx/jquery1.12.3.min.js'></script>
  <script>
    //… 
    $.ajax({
      type:'get|post',
      url:'http://xxxx/xxx.php',
      dataType:'json',
      data:'如果是post請求則必須寫',
      success:function(jsonData){
        console.log(jsonData);
      },
      error:function(err){
        console.log(err);
      }
    });
  </script>
  ```
  
  >jq的方式簡便快捷又好用，相比之下原生的寫法簡直麻煩。
   而這，正是我們要自行封裝 `Ajax` 的原因：
   因為 `jq` 的方式簡便快捷，但是 `jq` 框架卻過於龐大。
   所以我們要自行編寫一個屬於我們自己的，只用於處理 `Ajax` 的簡便框架。

### 封裝 Ajax

&emsp;&emsp;實際上自封裝 `Ajax` 請求檔，就是將原生 `Ajax` 的請求步驟抽象為一個函數，並單獨生成一個 `js` 檔保存，當用到的時候直接引入這個檔的過程。
&emsp;&emsp;很顯然這是個一次性的工作，封裝完畢之後我們以後直接拿來直接使用即可。
封裝 `Ajax` 大致分成下列幾個步驟：

#### <font color='red'>提供創建xhr物件的相容性函數。</font>

- 讓我們先創建一個 `js` 檔，並命名為 `EncapsulationAjax.js`。(這就是我們的框架檔)
- 在這個檔內部先聲明一個無參函數，命名為 `createXhr`。
  `function createXhr(){}`
- 這個函數是為了獲得 `xhr` 相容性物件才書寫的，因此在裡面書寫相容性代碼
  
  ```php
  function createXhr(){
    return window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject(‘’);
  }
  ```

#### <font color='red'>提供發送請求的對外介面</font>

- 聲明對外發送請求的介面，命名為 `ajax`。
  `function ajax(){}`

- 為介面設置一個json格式的參數用於接收相關資料，命名為 `jsonObj`
  `function ajax(jsonObj){}`

#### <font color='red'>設計並約定對外介面的參數規格</font>

- 規格
  |欄位名稱|表示含義|資料類型|可選值及描述
  |:-----:|:--------:|------:|:------:|
  | method|請求發送方式|string|'get','post'|
  | data|發送請求參數|json|若無參數可以不寫|
  | async|同步|非同步|boolean|默認為true，表示非同步|
  | url|請求發送位址|string|後臺url地址|
  |success|請求成功回檔|function|成功後自動執行的回呼函數|
  |error|請求失敗回檔|function|失敗後在動執行的回呼函數|

#### <font color='red'>實現對外介面中參數處理</font>

- 對外介面中創建xhr對象

  ```php
    function ajax(jsonObj){
      var xhr = createXhr();
  }
  ```
  
- 根據請求方式設置參數。
  
  ```php
  function ajax(jsonObj){
    var xhr = createXhr();
  
    function params(data){
      var arr = [];
      for(var i in data){
        arr.push(i+"="+data[i]);
      }
      return arr.join("&");
    }
    jsonObj.data = params(jsonObj.data);

    if(obj.method === "get"){
      obj.url += obj.url.indexOf("?")==-1
      ?"?"+jsonObj.data
      :"&"+jsonObj.data;
    }
  }
  ```
  
#### <font color='red'>實現對外介面中回應處理</font>

- 根據請求方式設置回呼函數。

  ```php
  function ajax(jsonObj){
    //…
    if(jsonObj.async === true){
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            jsonObj.success(JSON.parse(xhr.responseText));
          }else{
            jsonObj.error(xhr.statusText);
        }
      }
    }
    //加入  
    if(jsonObj.async == false){
     jsonObj.error(xhr.statusText);
    }
  }
  ```

#### <font color='red'>實現對外介面中發送處理</font>

- 調用open+send函數。

  ```php
  function ajax(jsonObj){
    //…
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method === "post"){
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.send(obj.data);
    }else{
      xhr.send();
    }
  }
  ```
  
#### <font color='red'>設置命名空間，避免全域變數污染。</font>

&emsp;&emsp;因為我們所編寫的js檔中存在大量全域變數，而這樣的全域變數會對其他檔中的內容造成不可預估的影響。在js中函數可以劃分作用域，因此我們採用自執行函數將整體包裹，避免了內部創建的變數對全域變數造成的影響。

但是這樣一來帶來的一個重要問題就是，內部創建的函數對外也變成了不可見狀態，因此我們可以借助window物件來將內部創建的對外介面設置為“可見狀態”.

- 範例
  
  ```php
  (function(){
    //…
    funtion ajax(){
      //…
    }

    window.ajax = ajax;
  }());
  ```

  到此為止一個名為EncapsulationAjax的框架封裝完成了。

  這個框架歸屬於我們自己，並且具有我們所期待的一系列特點：
  - 羽量級，寥寥幾十行代碼
  - 相容性，能夠處理IE中很多版本的Ajax請求
  - 便捷性，參數都是自己規定的，用著方便
  - 擴展性，如果還需要更多的功能直接添加進去即可，不會有任何內容衝突。

### 案例：使用自封裝 Ajax

- 要求：

  1. `html` 文檔結構如下：
  2. <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-4.png' class='nofancybox img-center' />
  3. 發送 `Ajax` 使用 `EncapsulationAjax.js` 提供的方法實現。
  4. `php` 文檔內容如下：

     ```php
     if($_POST){
       echo json_encode(array('info'=>$_POST, 'desc'=>'post')); 
     }else{
      echo json_encode(array('info'=>$_GET, 'desc'=>'get')); 
     }
     ```

- `post` 請求的返回結果

  <div style="display:inline-block;verticle:middle;width:300px">
     <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-5.png'  class='nofancybox img-center' />
  </div>

- get請求的返回結果
  
  <div style="display:inline-block;verticle:middle;width:300px">
     <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/php-mysql-pdo-6.png' class='nofancybox img-center' />
  </div>

### 案例：動態載入瀑布流

- 要求：

  1. 整體html結構和js部分都和之前的代碼沒有衝突和區別只是需要將【原本的類比資料】變成【真正的Ajax請求來的數據】。
  2. 對於獲取資料而言，採用 `get` 請求。
  3. 最後需要將整個處理瀑布流載入過程的代碼，放置到 `success` 中執行
  4. `php` 後臺檔中只需要將圖片的路徑位址構建，並返回即可。

  ```php
  $imgArr = ['http://127.0.0.1/waterfall/i1.jpg','http://127.0.0.1/waterfall/i2.jpg',…];
  $finalArr = array('desc'=>'success', 'imgArr'=>$imgArr);
  echo json_encode($finalArr);

  ajax({
    method:'get',
    url:'waterfall.php',
    async:true,
    success:function(data){
      //…構建瀑布流的代碼
    },
    error:function(error){
      console.log(error);
    }
  });
  ```

### 跨域

#### 流覽器同源政策

- 起源：1995年，同源政策由 `Netscape` 公司引入流覽器。
- 含義：最初的目的是某頁面所設置的 `cookie`，只能由其 "同源" 頁面打開。
- 說明："同源"：協議相同、功能變數名稱相同、埠相同
- 例子：`http://www.frank.com/sxt/page.html` 這個網址

  > 協議是：http://
    功能變數名稱是：`www.allen.com`
    埠是：80（預設埠可以省略）。

  它的同源情況如下：
  `http://www.frank.com/sxt2/other.html`：同源
  `http://frank.com/sxt/other.html`：不同源（功能變數名稱不同）
  `http://v3.www.frank.com/sxt/other.html`：不同源（功能變數名稱不同）
  `http://www.frank.com:81/dir/other.html`：不同源（埠不同）

- 目的：同源政策的目的，是為了保證使用者資訊的安全，防止惡意的網站竊取資料。

- 限制：隨著互聯網的發展，"同源政策"越來越嚴格。目前，如果非同源，共有三種行為受到限制：

  1. Cookie、LocalStorage 和 IndexDB 無法讀取。
  2. DOM 無法獲得。
  3. AJAX 請求不能發送。

- 補充：凡事都有利有弊，儘管限制是有必要的，但在有些情況下合理的用途也會因"同源政策"而受到影響。

  因此我們將要為大家介紹的一些規避上述限制的手段，就是【跨域】的由來。

#### Ajax 跨域

- 描述： `Ajax` 跨域指的是將 `Ajax` 請求進行跨域處理，而不是說在 `Ajax` 中提供了跨域的方法。
- 由來： 同源政策中明確規定 `Ajax` 請求只能發給同源的網址，否則就會發生跨域報錯。
- 解法： 除了設置代理之外頁面中有三種常見的解決跨域的手段，

  > 而根據我們所掌握的內容來考慮，我們只學習最常見的一種叫做 `JSONP` 的方法。
  > 其餘另外兩種分別叫做 `webSocket` 和 `CORS`。

#### JSONP跨域方案(get請求)

- 描述：`JSONP` 是伺服器與用戶端跨源通信的最常用方法。
       最大特點就是簡單適用，老式流覽器全部支援，對伺服器改造非常小。

- 本質：實際上利用了 `script` 標籤引入 `js` 檔，並解析執行的原理。

- 語法
  1. 在 `html` 中插入 `script` 標籤，並利用 `script` 標籤發起跨源請求

     ```php
     var script = document.createElement('script');script.setAttribute("type","text/javascript");
     script.src = '跨源url地址?【前後端約定回檔關鍵字】=【回呼函數名】';
     document.body.appendChild(script);
     ```
  
  2. 在伺服器對應 `php` 檔中通過拼接字串，類比函式呼叫。並將要返回資料通過回呼函數參數返回。

     ```php
     $response = $_GET['前後端約定回檔關鍵字'];  
     echo $response."(".json_encode(要返回資料).")";
     ```
  
  3. 在 `html` 頁面中，顯式寫出回呼函數。這樣當跨源請求完成後對應回呼函數會自動執行。

     ```php
     function 回呼函數名(data) {
       console.log(data);
     };
     ```

- 優點
  1. 由於使用 `script` 腳本作為請求，因此實際上請求和傳統的引入 `js` 腳本沒有任何區別。
  2. 而在返回的資料中我們也儘量類比出了 `js` 調用函數的語法，因此只要在頁面中聲明了回呼函數就會自動被調用。
  3. 再者作為參數的【伺服器端】的 `JSON` 資料，在 `js` 中是被直接識別為物件，因此在回呼函數中也避免了使用 `JSON.parse` 的步驟。
