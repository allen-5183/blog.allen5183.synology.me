---
title: php & mysql
urlname: php-mysql
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-09-29 21:15:43
author:
img:
coverImg:
password:  
summary:
tags: 
 - php
 - mysql
categories: php&mysql
---

<style>
.img-center {
    display: block;
    margin: auto;
}

.img-logo{
  max-width: 180px;
  max-height: 96px;
  display: block;
  margin-right: .7em;
  margin-left: .7em;
  margin-bottom: 10px;
  padding: 0;
  float: left;
  clear: right;
}
</style>

## MySQL 資料庫簡介

`MySQL` 是一種開放原始程式碼的關係型數據庫管理系統（RDBMS），使用最常用的資料庫管理語言--結構化查詢語言（SQL）進行資料庫管理。

<img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/2020-08-23-15-21-57.png" class="nofancybox img-center"  />

`MySQL` 是開放原始程式碼的，因此任何人都可以在 `General Public License` 的許可下下載並根據個性化的需要對其進行修改。

`MySQL`
因為其速度、可靠性和適應性而備受關注。大多數人都認為在不需要事務化處理的情況下，`MySQL` 是管理內容最好的選擇。

時至今日 `MySQL` 和 `php` 的結合絕對是完美.很多大型的網站也用到 `Mysql` 資料庫.

## MySQL資料庫的視覺化工具

### 1.1. phpmyadmin

<p style="margin-bottom:130px;"><a href='https://www.phpmyadmin.net/'><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/phpmyadmin-logo.png" class="img-logo nofancybox"></a></p>
  
### 1.2. Navicat for MySQL

<p style="margin-bottom:100px;"><a href='https://www.navicat.com/cht/products/navicat-for-mysql'><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/navicat_logo_rainbow.png" class="img-logo nofancybox"/></a></p>

### 1.3. MySQL Workbench

<p style="margin-bottom:150px;"><a href='https://dev.mysql.com/downloads/workbench/'><img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/MySQLWorkbench.png" class="img-logo nofancybox"/></a></p>

>ps：需要說明一點就是無論是 `phpmyadmin` 也好還是 `navivat for mysql` 或 `MySQL Workbench` 也好，兩者都僅是一個對於資料庫操作和管理的工具，他們並不是資料庫本身。

練習:
&emsp;&emsp;通過 `phpmyadmin` 工具，新建一個資料庫名為 `libraryDB`

- 為這個資料庫添加一張表，表中有 5 個欄位，分別為
  【bookId】【bookName】【bookAuthor】【bookPrice】【bookNum】
- 查詢表中所有條目。
- 添加兩個條目，並再次查詢所有條目。
- 修改其中 `Id` 是 2 的條目，價格改成 300，數量改成 1000。
  修改完畢後查詢 `id` 是 2 的條目。
- 刪除 `id` 是 1 的條目。

## php 連接資料庫與基本操作配置

- (1) `php` 創建資料庫【連接】
  語法：Object <font color='red'>mysqli_connect("功能變數名稱","DB帳號","DB密碼","DB庫名稱")</font>
  例子：`$con = mysqli_connect('localhost','root','','frankdb');`

- (2)向 `DB` 中插入資料時包含中文出現亂碼的解決方案
  語法：<font color='red'>mysqli_query($con,"set names utf8");</font>
  說明：設置成功會返回 `1`，根據實際情況並不一定必須保存返回結果。

- (3)設置 `client` 端和 `server` 端保持字元編碼一致
  語法：

  ```php
  mysqli_query($con,"set character_set_client=utf8");
  mysqli_query($con,"set character_set_results=utf8");
  ```

- (4)執行 `sql` 語句
  語法：<font color='red'>$結果 = $DB連接->query(sql語句);</font>
  例子： `var_dump($result = $con->query($sql));`

## php 操作資料庫【增刪改查】操作

- (1) 使用 `sql` 語句基本【範本】
  提供範本並不是說以後我們操作資料庫就都採用這種結構，而是對於初學者而言我們在沒有接觸過資料庫的情況下，這樣的範本能夠説明我們快速的上手從php中操作mysql資料庫。

&emsp;a. 建立連接
&emsp;b. 判斷是否連接
&emsp;c. 設置編碼
&emsp;d. <font color='red'>創建sql語句</font>
&emsp;e. <font color='red'>執行sql語句，並獲得結果</font>
&emsp;f. 判斷結果條數
&emsp;g. 拼湊結果
&emsp;h. json化返回

  ```php
  $con = mysqli_connect('localhost','root','1qaz@wsx','class');  //a.建立連接
  if($con){                                                      //b.判斷是否連接
    echo "<pre>";
    mysqli_query($con,'set names utf8');
    mysqli_query($con,'set character_set_client=utf8');          //c.設置編碼
    mysqli_query($con,'set character_set_results=utf8');

    $sql = 'select * from friendslist where 1';                  //d.創建 sql 語句
    $result = $con->query($sql);                                 //e.執行sql語句，並獲得結果

    if($result->num_rows>0){                                     //f.判斷結果條數
      for($i=0,$jsonInfo=[]; $row=$result->fetch_assoc();$i++){  //g.拼湊結果
        $jsonInfo[] = $row;
      }
      echo json_encode($jsonInfo);                               //h.json化返回
    }
  }
  ```

- (2) sql查詢語句
  描述：表示去資料庫中指定的表內根據條件查詢指定的內容
  語法： `$sql = "select 【信息】 from 【哪張表】 where 【查詢準則】";`
  說明：
  - a.【信息】有兩種寫法：
    一是寫*星號，代表查詢所有欄位對應的資訊

    ```sql
    $sql = "select * from friendslist where 1";
    ```

    二是寫指定欄位，代表查詢某個欄位對應資訊，如果有多個則用逗號隔開

    ```sql
    $sql = "select friendsName from friendslist where 1";
    ```

  - b.【哪張表】就是直接寫出對應表的名字即可
  - c.【查詢準則】有兩種寫法：
    一是無條件查詢，那麼直接寫1即可。
  
    ```sql
    $sql = "select * from class where 1";
    ```

    二是有條件查詢，在後面寫出額外的查詢準則。如果有多個用and或or連接

    ```php
    $sql = "select * from class where cName='aby'";
    $sql = "select * from class where cName='aby' and cSex='f';
    $sql = "select * from class where cSex='m' or cAge=18";
    ```

  - (3) sql插入語句

    語法：

    ```php
    $sql = "insert into 表名(欄位1,欄位2,...) values ('值1','值2',...)";
    $sql = "insert into 表名 values(值1,值2,...)";
    ```

  - (4) sql修改語句

    語法：

    ```php
    $sql = "update 表名 set 欄位1='新值1',… where id=$id",…;
    ```

  注意：修改的關鍵字是 `update`，而不是 `updata`！！
  注意：`where`後面的條件可以和修改的內容相同。

  - (5) sql刪除語句

    語法：

    ```sql
    $sql = 'delete from 表名 where 條件';
    ```

  - (6) html與php+MySQL完成前後端交互
        <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/2020-08-23-16-08-59.png" width=60% height=40% class="nofancybox img-center" />

  **前端關鍵部分代碼：【ajax請求】**

  ```js
  $.ajax({
    type:'post',
    url:'add.php',
    dataType:"json",
    data:{
     friendsName:$('.fname').val(),
     …
    },
    success:function(data){console.log(data);},
    error:function(error){console.log(error);}
  });
  ```

  **後臺部分代碼：【 php 接受 ajax request，並通過 echo 給出 response】**

  ```php
  $con = mysqli_connect('localhost','root','','frankdb');
  $success = array("code" => "success");
  $error = array("code" => "error");
  if($con){
    mysqli_query($con,'set names utf8');
    mysqli_query($con,'set character_set_client=utf8'); 
    mysqli_query($con,'set character_set_results=utf8');

    $fname = $_POST['friendsName'];
    …
    $result = $con->query("insert into friendslist values($fname,…)");
    if($result){
      echo json_encode($success);
    }
  }else{
    echo json_encode($error);
  }
  ```

- (7) 登錄案例

對於登錄案例的業務邏輯各位應當都不陌生，但具體的實現過程需要我們細化到語句才可以。在本例中我們並不過多的考慮在實現登錄過程中前端語法部分對使用者的要求，而把重心暫時放在如何實現WEB請求回應上面。而我們已經瞭解並掌握的部分有：

(1)將使用者輸入資訊發送給後臺-------- `ajax` 請求實現
(2)後臺接收使用者發送的內容-------- `php`中的 `$_POST` 或 `$_GET` 對象獲取
(3)在資料庫中搜索目標條目-------- `sql` 查詢語句
(4)返回前端response-------- `echo` 語句返回 `json_encode` 內容

因此我們亟待解決的問題就只剩下了一個：

<font color='red'>使用者輸入併發送給後臺的資料，應如何判斷其是合法帳戶？</font>

答案呼之欲出：

   資料庫中不存在和使用者輸入的資訊相匹配的條目，則該帳戶不存在，即登錄失敗。而如果存在則登錄成功。

操作資料庫的基本步驟大多相同，只不過是sql語句結構的區別。不同的sql語句能夠完成不同的功能，因此學習如何操作資料庫實際上就是在學習如何編寫sql語句。

## html與php+MySQL完成前後端交互

### CRUD 範例

資料操縱語言（Data Manipulation Language, DML）是用於資料庫操作，
歐美地區的開發人員把這四種指令，以「CRUD」(分別為 Create, Read, Update,
Delete英文四字首字母縮略的術語)來稱呼；而亞洲地區使用漢語的開發人員，或可能以四個漢字：增、查、改、刪 來略稱。  

#### 1. 創建資料庫**

```sql
create database class;
```

#### 2. 創建資料表**

```sql
CREATE TABLE `class`.`students` (
   `cID` TINYINT(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT ,
   `cName` VARCHAR(20) NOT NULL ,
   `cSex` ENUM('F','M') NOT NULL DEFAULT 'F' ,
   `cBirthday` DATE NULL DEFAULT NULL ,
   `cEmail` VARCHAR(100) NULL DEFAULT NULL ,
   `cPhone` VARCHAR(50) NULL DEFAULT NULL ,
   `cAddr` VARCHAR(255) NULL DEFAULT NULL ,
   `cHeight` TINYINT(3) UNSIGNED NULL DEFAULT NULL ,
   `cWeight` TINYINT(3) UNSIGNED NULL DEFAULT NULL ,
    PRIMARY KEY (`cID`)) ENGINE = InnoDB;
```

> PS:
  長度值:     指輸入的字數
  編碼與排序: 數字或英文字母不用指定沒問題，中文必要，沒設的話會繼承資料庫的設定。
  最後用瀏覽來檢視設定正確與否。

#### 3. 插入20筆資料**

```sql
INSERT INTO `students` (`cName`, `cSex`, `cBirthday`, `cEmail`, `cPhone`, `cAddr`, `cHeight`, `cWeight`) 
VALUES
   ('簡奉君', 'F', '1987-04-04', 'elven@superstar.com', '0922988876', '台北市濟洲北路12號', 160, 49),
   ('黃靖輪', 'M', '1987-07-01', 'jinglun@superstar.com', '0918181111', '台北市敦化南路93號5樓', 175, 72),
   ('潘四敬', 'M', '1987-08-11', 'sugie@superstar.com', '0914530768', '台北市中央路201號7樓', 162, 65),
   ('賴勝恩', 'M', '1984-06-20', 'shane@superstar.com', '0946820035', '台北市建國路177號6樓', 178, 72),
   ('黎楚寧', 'F', '1988-02-15', 'ivy@superstar.com', '0920981230', '台北市忠孝東路520號6樓', 164, 45),
   ('蔡中穎', 'M', '1987-05-05', 'zhong@superstar.com', '0951983366', '台北市三民路1巷10號', 172, 75),
   ('徐佳螢', 'F', '1985-08-30', 'lala@superstar.com', '0918123456', '台北市仁愛路100號', 158, 56),
   ('林雨媗', 'F', '1986-12-10', 'crystal@superstar.com', '0907408965', '台北市民族路204號', 166, 48),
   ('林心儀', 'F', '1988-12-01', 'peggy@superstar.com', '0916456723', '台北市建國北路10號', 168, 50),
   ('王燕博', 'M', '1993-08-10', 'albert@superstar.com', '0918976588', '台北市北環路2巷80號', 169, 68),
   ('簡奉君1', 'F', '1967-04-04', 'elven1@superstar.com', '0922988871', '台北市濟洲北路12號1', 161, 41),
   ('黃靖輪1', 'M', '1967-07-01', 'jinglun1@superstar.com', '0918181112', '台北市敦化南路93號5樓1', 172, 73),
   ('潘四敬1', 'M', '1967-08-11', 'sugie1@superstar.com', '0914530763', '台北市中央路201號7樓1', 163, 67),
   ('賴勝恩1', 'M', '1964-06-20', 'shane1@superstar.com', '0946820034', '台北市建國路177號6樓1', 174, 71),
   ('黎楚寧1', 'F', '1968-02-15', 'ivy1@superstar.com', '0920981235', '台北市忠孝東路520號6樓1', 165, 42),
   ('蔡中穎1', 'M', '1967-05-05', 'zhong1@superstar.com', '0951983367', '台北市三民路1巷10號1', 176, 73),
   ('徐佳螢1', 'F', '1965-08-30', 'lala1@superstar.com', '0918123458', '台北市仁愛路100號1', 157, 54),
   ('林雨媗1', 'F', '1966-12-10', 'crystal1@superstar.com', '0907408969', '台北市民族路204號1', 168, 45),
   ('林心儀1', 'F', '1968-12-01', 'peggy1@superstar.com', '0916456720', '台北市建國北路10號1', 169, 56),
   ('王燕博1', 'M', '1963-08-10', 'albert1@superstar.com', '0918976581', '台北市北環路2巷80號1', 160, 67);
```

#### 4. 新建 `php-mysql-basic.php`

   **需先連線**

- 第一種寫法

   ```php
   <?php
     $user = "root";
     $password = "1qaz@wsx";
     $host = "localhost:3306";
     $db = "class";
     $port = "3306";

     $conn = mysqli_connect($host,$user,$password) or die("資料庫連線錯誤");  
   ?>
   ```

- 第二種寫法

   ```php
   <?php
     $user = "root";
     $password = "1qaz@wsx";
     $host = "localhost";
     $db = "class";
     $port = "3306";

     $conn = mysqli_connect($host,$user,$password,$db,$port) or die("資料庫連線錯誤");
   ?>
   ```

   > 輸入網址: `http://localhost/php-mysql-basic.php` 若連線正常，畫面會是一片空白。

**5. 選擇資料庫**

   ```php
   <?php
     $user = "root";
     $password = "1qaz@wsx";
     $host = "localhost:3306";
     $db = "class";
     $port = "3306";

     $conn = mysqli_connect($host,$user,$password) or die("資料庫連線錯誤");
     @mysqli_select_db($conn, $db);
     @mysqli_query($conn, "set names utf8");  //資料庫編碼
     @mysqli_set_charset($conn, "utf8");      //字元集
   ?>
   ```

**6. 資料庫查詢**

   ```php
   <?php
     $sql = "SELECT * FROM `students`";    //大小寫無關
     $result = mysqli_query($conn, $sql);  //執行 SQL 語法, 查詢結果放到  $result

     //取出資料庫資料
     $row = mysqli_fetch_assoc($result);  //取出一筆資料

     //先用簡單方式取出
     echo $row['cID'] . $row['cName'] . $row['cSex']. $row['cBirthday']. $row['cEmail']. $row['cPhone']. 
$row['cAddr']. $row['cHeight']. $row['cWeight']
   ?>
   ```

   結果:  畫面如下，呈現亂碼。
   <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/2020-08-23-17-44-04.png" width=60% height=40% class="nofancybox img-center" />

   問題: 取出中文字出問題
   網頁: <meta charset="utf-8"> 是 UTF-8; 資料庫編碼也採: UTF-8, 但有些瀏覽器會判斷錯誤，確認抓出資料時是用
`UTF-8` 的方式再編碼; 所以在從連線後 `mysqli_select_db($conn, $db);`, 需在這裡後面加入:

   ```sql
   mysqli_query($conn, "set Names utf8");
   ```

   在檢視頁面是否中文正常顯示。
   <br/>
   再增加資料庫連線字元集設定:
   `mysqli_set_charset($conn, "utf8");`  
   <br/>

   **註解掉上面的語法**

   ```php
   //$row = mysqli_fetch_assoc($result);  //取出一筆資料
   //echo $row['cID'] . $row['cName'] . $row['cSex']. $row['cBirthday']. $row['cEmail']. $row['cPhone']. 
$row['cAddr']. $row['cHeight']. $row['cWeight'];
   ```

   **改用**

   ```php
   while($row = mysqli_fetch_assoc($result)){
     echo $row['cID'] . $row['cName'] . $row['cSex']. $row['cBirthday']. $row['cEmail']. $row['cPhone']. 
$row['cAddr']. $row['cHeight']. $row['cWeight'] . "<br>";
   }
   ```

  >測試: 利用 `phpmyadmin`  新增加一筆資料後，再執行程式看結果會不會也多一筆。

**7. 加入表格**
將上面 `php-mysql-basic.php` 的 `while{}` 部分, 改寫到 `<body>` 內。 因要用  `Table` 表示，在  `<?php  ..  ?>`
裡面寫較有
問題。

第一種方法: 將 `html` 寫在  `<?php  :  ?>` 內:
方法: 將上面 `php-mysql-basic.php` 另存新檔成 `php-mysql-1.php`

```php
<style>
  table, td{
    border-collapse: collapse;
  }
</style>

</head>
<body>
<h1 align="center">學生資料管理系統</h1>

<!-- 資料內容 -->
<?php
echo "<table border='1' align='center'>";
//表格表頭
echo "<tr>
        <th>座號</th>
        <th>姓名</th>
        <th>性別</th>
        <th>生日</th>
        <th>電子郵件</th>
        <th>電話</th>
        <th>住址</th>
        <th>身高</th>
        <th>體重</th>
     </tr>";
while ($row_result = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>" . $row_result["cID"] . "</td>";
    echo "<td>" . $row_result['cName'] . "</td>";
    echo "<td>" . $row_result['cSex'] . "</td>";
    echo "<td>" . $row_result['cBirthday'] . "</td>";
    echo "<td>" . $row_result['cEmail'] . "</td>";
    echo "<td>" . $row_result['cPhone'] . "</td>";
    echo "<td>" . $row_result['cAddr'] . "</td>";
    echo "<td>" . $row_result['cHeight'] . "</td>";
    echo "<td>" . $row_result['cWeight'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_free_result($result);
mysqli_close($conn); //關閉資料庫連接
 ?>
</body>
</html>
```

第二種方法: 將 `php` 寫在  `html` 內:
方法: 將上面 `php-mysql-basic.php` 另存新檔成 `php-mysql-2.php`

```php
<style>
  table, td{
    border-collapse: collapse;
  }
</style>

</head>
<body>
<h1 align="center">學生資料管理系統</h1>
<table border="1" align="center">
  <!-- 表格表頭 -->
  <tr>
    <th>座號</th>
    <th>姓名</th>
    <th>性別</th>
    <th>生日</th>
    <th>電子郵件</th>
    <th>電話</th>
    <th>住址</th>
    <th>身高</th>
    <th>體重</th>
    <th colspan="2">功能</th>
  </tr>

<?php
  while($row_result=mysqli_fetch_assoc($result)){
?>
  <tr>
      <td><?php echo $row_result["cID"];?></td>
      <td><?php echo $row_result["cName"];?></td>
      <td><?php echo $row_result["cSex"];?></td>
      <td><?php echo $row_result["cBirthday"];?></td>
      <td><?php echo $row_result["cEmail"];?></td>
      <td><?php echo $row_result["cPhone"];?></td>
      <td><?php echo $row_result["cAddr"];?></td>
      <td><?php echo $row_result["cHeight"];?></td>
      <td><?php echo $row_result["cWeight"];?></td>
   </tr>
   <?php } ?>
  </table>  
```

**8. 將資料庫連線獨立成外部檔案處理**
`connDB.php`

```php
$user = "root";
$password = "1qaz@wsx";
$host = "localhost:3306";
$db = "class";
$port = "3306";

$conn = mysqli_connect($host, $user, $password) or die("資料庫連線錯誤");
@mysqli_select_db($conn, $db);
@mysqli_query($conn, "set names utf8"); //資料庫編碼
@mysqli_set_charset($conn, "utf8"); //字元集
```

在 `<h1 align="center">學生資料管理系統</h1>` 下面新增:

```php
<p align="center">目前資料筆數：<?php echo $total_records;?>，<a 
href="php-mysql-2-add.php">新增學生資料</a>。</p>
```

在 `<td><?php echo $row["cWeight"]; ?></td>` 下面新增:

```html
<td><a href='php-mysql-2-update.php?cID=".$row_result["cID"]."'>修改</a></td>
<td><a href='php-mysql-2-del.php?cID=".$row_result["cID"]."'>刪除</a></td>
```

修改 `php-mysql-2.php`, 刪除下面內容:

```php
$user = "root";
$password = "1qaz@wsx";
$host = "localhost:3306";
$db = "class";
$port = "3306";

$conn = mysqli_connect($host, $user, $password) or die("資料庫連線錯誤");
@mysqli_select_db($conn, $db);
@mysqli_query($conn, "set names utf8"); //資料庫編碼
@mysqli_set_charset($conn, "utf8");     //字元集
```

換成:
`require_once "connDB.php";`

**9. 分頁處理**
在 `$result = mysqli_query($conn, $sql);` 後面加入以下程式碼:

```php
//分頁
//預設每頁筆數
$pageRow_records = 3;
//預設頁數
$num_pages = 1;
//若已經有翻頁，將頁數更新
if (isset($_GET['page'])) {
    $num_pages = $_GET['page'];
}
//本頁開始記錄筆數 = (頁數-1)*每頁記錄筆數
$startRow_records = ($num_pages - 1) * $pageRow_records;
//未加限制顯示筆數的SQL敘述句
$sql_query = "SELECT * FROM `students`";
//加上限制顯示筆數的SQL敘述句，由本頁開始記錄筆數開始，每頁顯示預設筆數
$sql_query_limit = $sql_query . " LIMIT " . $startRow_records . ", " . $pageRow_records;
//以加上限制顯示筆數的SQL敘述句查詢資料到 $result 中
$result = mysqli_query($conn, $sql_query_limit);
//以未加上限制顯示筆數的SQL敘述句查詢資料到 $all_result 中
$all_result = mysqli_query($conn, $sql_query);
//計算總筆數
$total_records = mysqli_num_rows($all_result);
//計算總頁數=(總筆數/每頁筆數)後無條件進位。
$total_pages = ceil($total_records / $pageRow_records);
?>
```

在 `php-mysql-2.php` 的 `</body>` 前面加入以下:

```html
<table border="0" align="center">
  <tr>
    <?php if ($num_pages > 1) { // 若不是第一頁則顯示 ?>
    <td><a href="php-mysql-2.php?page=1">第一頁</a></td>
    <td><a href="php-mysql-2.php?page=<?php echo $num_pages-1;?>">上一頁</a></td>
    <?php } ?>
    <?php if ($num_pages < $total_pages) { // 若不是最後一頁則顯示 ?>
    <td><a href="php-mysql-2.php?page=<?php echo $num_pages+1;?>">下一頁</a></td>
    <td><a href="php-mysql-2.php?page=<?php echo $total_pages;?>">最後頁</a></td>
    <?php } ?>
  </tr>
</table>
<table border="0" align="center">
  <tr>
    <td>頁數：</td>
    <?php
    for($i=1;$i<=$total_pages;$i++){
       echo "<td>";
       if($i==$num_pages)
         echo $i;
       else
         echo "<a href='php-mysql-2.php?page=$i'>$i</a>";
         echo "</td>";  
       }
    ?>
    </td>
  </tr>
</table>
```

**10. 新增資料的處理(Create)**
新增檔案 `php-mysql-2-add.php`

前端畫面處理:

```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>學生資料管理系統</title>
</head>
<body>
<h1 align="center">學生資料管理系統 - 新增資料</h1>
<p align="center"><a href="php-mysql-2.php">回主畫面</a></p>
<form action="" method="post" name="formAdd" id="formAdd">
  <table border="1" align="center" cellpadding="4">
    <tr>
      <th>欄位</th><th>資料</th>
    </tr>
    <tr>
      <td>姓名</td><td><input type="text" name="cName" id="cName" required></td>
    </tr>
    <tr>
      <td>性別</td><td>
      <input type="radio" name="cSex" id="radio" value="M" checked>男
      <input type="radio" name="cSex" id="radio" value="F">女
      </td>
    </tr>
    <tr>
      <td>生日</td><td><input type="date" name="cBirthday" id="cBirthday" required></td>
    </tr>
    <tr>
      <td>電子郵件</td><td><input type="text" name="cEmail" id="cEmail" required></td>
    </tr>
    <tr>
      <td>電話</td><td><input type="text" name="cPhone" id="cPhone" required></td>
    </tr>
    <tr>
      <td>住址</td><td><input name="cAddr" type="text" id="cAddr" size="40" required></td>
    </tr>
     <tr>
      <td>身高</td><td><input name="cHeight" type="number" id="cHeight" size="40" required></td>
    </tr>   
    <tr>
      <td>體重</td><td><input name="cWeight" type="number" id="cWeight" size="40" required></td>
    </tr>    
    <tr>
      <td colspan="2" align="center">
      <input name="action" type="hidden" value="add">
      <input type="submit" name="button" id="button" value="新增資料">
      <input type="reset" name="button2" id="button2" value="重新填寫">
      </td>
    </tr>
  </table>
</form>
</body>
</html>
```

後端畫面處理:
在 `<html>` 標籤前面加入後端處理。

```php
<?php
if(isset($_POST["action"])&&($_POST["action"]=="add")){
    include("connDB.php");
    $sql_query = "INSERT INTO `students` (`cName` ,`cSex` ,`cBirthday` ,`cEmail` ,`cPhone` 
,`cAddr`,`cHeight`,`cWeight`) VALUES (";
    $sql_query .= "'".$_POST["cName"]."',";
    $sql_query .= "'".$_POST["cSex"]."',";
    $sql_query .= "'".$_POST["cBirthday"]."',";
    $sql_query .= "'".$_POST["cEmail"]."',";
    $sql_query .= "'".$_POST["cPhone"]."',";
    $sql_query .= "'".$_POST["cAddr"]."')";
    $sql_query .= "'".$_POST["cHeight"]."')";
    $sql_query .= "'".$_POST["cWeight"]."')";

    mysqli_query($conn,$sql_query);
    mysqli_close($conn);//關閉資料庫連接
    //重新導向回到主畫面
    header("Location: php-mysql-2.php");
}
?>
```

**11. 更新資料的處理(Update)**
新增檔案: `php-mysql-2-update.php`

前端畫面處理:

```php
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>學生資料管理系統</title>
</head>
<body>
<h1 align="center">學生資料管理系統 - 修改資料</h1>
<p align="center"><a href="php-mysql-2.php">回主畫面</a></p>
<form action="" method="post" name="formFix" id="formFix">
  <table border="1" align="center" cellpadding="4">
    <tr>
      <th>欄位</th><th>資料</th>
    </tr>
    <tr>
      <td>姓名</td><td><input type="text" name="cName" id="cName" value="<?php echo 
$row_result["cName"];?>"></td>
    </tr>
    <tr>
      <td>性別</td><td>
      <input type="radio" name="cSex" id="radio" value="M" <?php if($row_result["cSex"]=="M") echo 
"checked";?>>男
      <input type="radio" name="cSex" id="radio" value="F" <?php if($row_result["cSex"]=="F") echo 
"checked";?>>女
      </td>
    </tr>
    <tr>
      <td>生日</td><td><input type="date" name="cBirthday" id="cBirthday" value="<?php echo 
$row_result["cBirthday"];?>"></td>
    </tr>
    <tr>
      <td>電子郵件</td><td><input type="text" name="cEmail" id="cEmail" value="<?php echo 
$row_result["cEmail"];?>"></td>
    </tr>
    <tr>
      <td>電話</td><td><input type="text" name="cPhone" id="cPhone" value="<?php echo 
$row_result["cPhone"];?>"></td>
    </tr>
    <tr>
      <td>住址</td><td><input name="cAddr" type="text" id="cAddr" size="40" value="<?php echo 
$row_result["cAddr"];?>"></td>
    </tr>
    <tr>
      <td>住址</td><td><input name="cHeight" type="text" id="cHeight" size="40" value="<?php echo 
$row_result["cHeight"];?>"></td>
    </tr>
    <tr>
      <td>住址</td><td><input name="cWeight" type="text" id="cWeight" size="40" value="<?php echo 
$row_result["cWeight"];?>"></td>
    </tr>
    <tr>
      <td colspan="2" align="center">
      <input name="cID" type="hidden" value="<?php echo $row_result["cID"];?>">
      <input name="action" type="hidden" value="updata">
      <input type="submit" name="button" id="button" value="更新資料">
      <input type="reset" name="button2" id="button2" value="重新填寫">
      </td>
    </tr>
  </table>
</form>
</body>
</html>
```

後端畫面處理:
於 `<html>` 前追加下面程式碼:

```php
<?php 
include("connDB.php");
if(isset($_POST["action"])&&($_POST["action"]=="updata")){ 
 $sql_query = "UPDATE `students` SET ";
 $sql_query .= "`cName`='" . $_POST["cName"] . "',";
 $sql_query .= "`cSex`='" . $_POST["cSex"] . "',";
 $sql_query .= "`cBirthday`='" .$_POST["cBirthday"] . "',";
 $sql_query .= "`cEmail`='" . $_POST["cEmail"] . "',";
 $sql_query .= "`cPhone`='" . $_POST["cPhone"] . "',";
 $sql_query .= "`cAddr`='" . $_POST["cAddr"] . "' ";
 $sql_query .= "WHERE `cID`=" . $_POST["cID"]; 
 mysqli_query($conn,$sql_query);
        mysqli_close($conn);//關閉資料庫連接
 //重新導向回到主畫面
 header("Location: php-mysql-2.php");
}
$sql_db = "SELECT * FROM `students` WHERE `cID`=" . $_GET["cID"];
$result = mysqli_query($conn,$sql_db);
$row_result= mysqli_fetch_array($result, MYSQLI_BOTH);
mysqli_close($conn);//關閉資料庫連接
?>


```

**12. 刪除資料的處理(Delete)**
前端畫面處理:

```php
<?php
include("connDB.php");
?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>學生資料管理系統</title>

<script>
    function myFunction(){
        if (confirm("\n您確定要刪除這筆資料嗎?\n刪除後無法恢復\n")) return true;
        return false; 
    }
</script>

</head>
<body>
<h1 align="center">學生資料管理系統 - 刪除資料</h1>
<p align="center"><a href="php-mysql-2.php">回主畫面</a></p>
<form action="" method="post" name="formDel" id="formDel">
  <table border="1" align="center" cellpadding="4">
    <tr>
      <th>欄位</th><th>資料</th>
    </tr>
    <tr>
      <td>姓名</td><td><?php echo $row_result["cName"];?></td>
    </tr>
    <tr>
      <td>性別</td><td>
      <?php if($row_result["cSex"]=="M") echo "男"; else echo "女";?>
      </td>
    </tr>
    <tr>
      <td>生日</td><td><?php echo $row_result["cBirthday"];?></td>
    </tr>
    <tr>
      <td>電子郵件</td><td><?php echo $row_result["cEmail"];?></td>
    </tr>
    <tr>
      <td>電話</td><td><?php echo $row_result["cPhone"];?></td>
    </tr>
    <tr>
      <td>住址</td><td><?php echo $row_result["cAddr"];?></td>
    </tr>
    <tr>
    <tr>
      <td>身高</td><td><?php echo $row_result["cHeight"];?></td>
    </tr>
    <tr>
    <tr>
      <td>體重</td><td><?php echo $row_result["cWeight"];?></td>
    </tr>
    <tr>
      <td colspan="2" align="center">
      <input name="cID" type="hidden" value="<?php echo $row_result["cID"];?>">
      <input name="action" type="hidden" value="delete">
      <input type="submit" name="button" id="button" value="刪除這筆資料">
      
      <!--
      <button onclick="return myFunction();">刪除這筆資料</button>
      -->
      </td>
    </tr>
  </table>
</form>
</body>
</html>
```

### 登錄案例

#### 前端

FrontEnd.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<span>用戶名稱:</span><input type="text" class="username" /><br />
<span>用戶密碼:</span><input type="password" class="password" /><br />
<button>登入</button>
<script src="js/jquery-1.12.3.min.js"></script>
<script>
  $(function() {
    $('button').click(function() {
       console.log('button click');
       $.ajax({
         type: 'post',
         url: './BackEnd.php',
         dataType: 'json',
         data: {
           myUname: $('.username').val(),
           myUpass: $('.password').val(),
         },
         success: function(resp) {
           if (resp.infoCode == 0) {
             //document.location.href = "新頁面的url";
             $('#output').html(resp.name + '  ' + '<font color="green">登入成功</font>');
           } else if (resp.infoCode == 1) {
              alert('登錄失敗，賬戶名或密碼錯誤');
           } else {
              alert('網絡連接失敗，請檢查網絡連接！');
           }
         },
         error: function() {
           alert('登入失敗!');
         },
         complete: function() {},
       });
    });
  });
</script>

<body>
  <div id="output"></div>
</body>
</html>
```

#### 後端

BackEnd.php

```php
<?php
$username = $_POST['myUname'];
$userpass = $_POST['myUpass'];
$success = array('msg' => 'OK');

//宣告一結合陣列
// $success = ['msg' => 'OK'];
// $success = array('msg' => 'OK');
// return

$conn = mysqli_connect("localhost", "root", "1qaz@wsx", "class") or die("連線失敗");

if ($conn) {
  mysqli_query($conn, 'set names utf8');
  mysqli_query($conn, 'set character_set_client=utf8');
  mysqli_query($conn, 'set character_set_results=utf8');

  $sql = "SELECT * FROM members WHERE 1";
  $result = mysqli_query($conn, $sql);

  $info = [];
  while ($row = mysqli_fetch_assoc($result)) {
    //$info[] = $row;
    //判斷是否與當前記錄的用戶名相同
    if ($row['m_username'] == $username) {
      //如果相同，繼續判斷是否與當前記錄的密碼相同
      if ($row['m_passwd'] == $userpass) {
        //0代表登錄成功
        $success["infoCode"] = 0;
        $success["name"] = $row['m_name'];
      } else {
        //1代表登錄失敗
        $success["infoCode"] = 1;
      }
      break;
    } else {
        //2代表數據庫連接失敗
        $success["infocode"] = 2;
    }
  }

  // if (mysqli_num_rows($result) > 0) {
  //     $info = [];
  //     for ($i = 0; $row = mysqli_fetch_assoc($result); $i++) {
  //         $info[$i] = $row;
  //     }
  //     $flag = 0;
  //     for ($j = 0; $j < count($info); $j++) {
  //         if ($info[$j]['m_username'] == $username) {
  //             if ($info[$j]['m_passwd'] == userpass) {
  //                 $success[infoCode] = 0;
  //                 $flag = 1;
  //                 break;
  //             }
  //         }
  //     }
  //     if ($flag == 0) {
  //         $success['infocode'] = 1;
  //     } else {
  //         $success['infocode'] = 0;
  //     }
  // }
}

echo json_encode($success);
```

- 對照表

  | 程序導向介面的函式 | 物件導向介面的方法或成員      |
  |:-------------------|:------------------------------|
  |mysqli_connect      |new mysqli::__construct() 建構方法 |
  |mysqli_connect_errno|mysqli::connect_errno 成員     |
  |mysqli_set_charset()|mysqli::set_charset()          |
  |mysqli_query        |mysqli::query()                |
  |mysqli_fetch_array  |mysqli_result::fetch_array()   |
  |mysqli_num_rows     |mysqli_result::$num_rows  成員 |
