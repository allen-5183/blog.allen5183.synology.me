---
title: mysql 資料庫
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-10-05 19:53:15
urlname: mysql
author:
img:
coverImg:
password: 5616b70ad3dda5e6509877de73ccd63eddb79073a6749dcbd1ec23f1bbb0856a
summary:
tags:
 - mysql
 - MariaDB
categories: mysql
---

## 1. MySQL資料庫使用與管理

### 1.1 關於資料庫

&emsp;&emsp;要使一個網站達到互動的效果，不是讓網頁充滿了動畫、音樂，而是當瀏覽者對網頁提出要求時能出現回應的結果。而這樣的效果，大多必須搭配資料庫的使用，讓網頁讀出儲存在資料庫中的資料，顯示在網頁上，也因為每個瀏覽者對於某一個相同的網頁所提出的要求不同，顯示出的結果即不同，這才是真正的互動網站。

### 1.2 認識資料庫

資料庫 (Database)
&emsp;&emsp;可以說是一些相關資料的集合並進行儲存的地方，我們可以一定的原則與方法新增、編輯、刪除資料的內容，進而搜尋、分析、比對所有資料，取得可用的資訊，產生所需的結果。

目前巿面上的主流是「關聯式資料庫管理系統」（Relational Database Management System），例如：`Access`、`MySQL`、`SQL
Server` 和 `Oracle` 等，可以用來管理關聯式資料庫。

<img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-1.png" class="nofancybox img-center" />

### 1.3 關聯式資料庫

&emsp;&emsp;關聯式資料庫（Relational Database）是由一個或多個資料表所組成，在資料表之間是使用欄位資料值來建立連接，以便實作資料表之間的關聯性。

&emsp;&emsp;在關聯式資料庫是使用二維表格的資料表來儲存記錄資料，在各資料表之間使用欄位值建立關聯性。

例如：使用【學號】欄位值建立兩個資料表之間的關聯性，就可以查詢此學號所修的課程，如右圖所示：

<img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-2.png" class="nofancybox img-center" />

### 1.4 資料表、記錄與欄位

&emsp;&emsp;關聯式資料庫是使用「資料表」（Tables）的二維表格儲存資料，每一個資料表使用「欄位」（Fields）分類成很多群組，每一個群組是一筆「記錄」（Records），例如：通訊錄資料表，如下表所示：

<img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-3.png" class="nofancybox img-center" />

&emsp;&emsp;資料表可以使用「索引」（Index）將資料系統化的整理，以便在大量資料中快速找到所需的資料或進行排序。

例如：在通訊錄資料表使用編號欄位建立主索引鍵，或稱為「主鍵」（Primary Key），如此就可以透過編號來加速資料表記錄的搜尋和排序。

### 1.5 MySQL 資料庫的特色

&emsp;&emsp;早期的資料庫大都屬於操作在單機或是區域網路的系統，雖然在操作上方便，管理上也比較輕鬆，但是談到資料庫本身的效能或是安全性都是相當不利的弱點。

&emsp;&emsp;隨著 Internet 的興起，開始興起 Internet 資料庫的概念，此時資料庫的角色已經化為一個在網際網路上提供資料存取編輯、應用查詢的伺服器了。
&emsp;&emsp;MySQL 資料庫就是這個概念的一個具體表現，在與網站伺服器結合作業後，MySQL 資料庫就成為了一個網路型的資料庫系統。

### 1.6 資料庫的字元集與連線校對(使用phpMyAdmin 管理程式)

- **登入 phpMyAdmin 的管理畫面**
  輸入: `http://127.0.0.1/phpmyadmin`

  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-4.png" width=60% height=40% class="nofancybox img-center" />

- **MySQL 資料庫的字元集與連線校對**
    MySQL 資料庫在 4.1 版本後支援 utf8 字元編碼來儲存，如此即可解決資料在不同語系文字上儲存與顯示上的問題。所以在 MySQL 中讀取或是寫入資料時能指定正確的字元集與連線校對，是維持資料內容正確的重要課題。

- 認識字元集與連線校對：
  字元集 (character set) 是指資料庫中資料文字的編碼方式，而連線校對 (collation) 是資料中字元的排序方式。

- 中文衝碼問題：
  在中文的環境中，我們可以選取 big5 繁體中文與 utf8 的編碼方式做為操作MySQL 資料庫的字元集。

   > 建議中文使用的字元集與連線校對方式:
     在 MySQL 資料庫最完美的解決方式還是選擇使用 `utf8` 的方式來進行文字編碼，如此即可將中文字以 `Unicode` 的方式進行儲存，徹底解決衝碼問題。

- MySQL 使用的字元集與連線校對：
  MySQL 由資料庫、資料表、資料欄位各個層級中，都可以單獨設定採用的字體集與連線校對方式。若在某一層操作時沒有設定使用字體集與連線校對方式為何，就會繼承上一層的設定來使用，若都沒有設定就會以MySQL 資料庫的預設值來做使用標準。

- mysql 裡 `utf8_general_ci` 跟 `utf8_unicode_ci` 連線校對的差異
  mysql 要在兩個 codepage 裡面找出來相對應的字元位置在哪裡。對 `utf8_general_ci` 來說，來源 codepage 裡面的一個字元只能對應到目標 codepage 裡面的一個字元，而 `utf8_unicode_ci` 則可以把來源codepage 裡的一個字元對應到目標 codepage 裡的多個字元（或反過來）。

  例如德文裡的 ß 要轉換成英文的時候如果是用 `utf8_unicode_ci` 轉換會變成正確的 ss ，但是如果用 `utf8_general_ci` 的話則會變成單一的 s 而已。
  所以如果可以的話請盡量用 `utf8_unicode_ci` 而不要用 `utf8_general_ci`，雖然對 multibyte 字元來說這兩個都沒差，但是 utf8 的網頁誰也不知道哪天會不會有這種字元出現在你的網頁上，所以如果設成 `utf8_unicode_ci` 你就不需要擔心貼上去之後資料在轉換間遺失了。

- **新增資料庫**
  回到 phpMyAdmin，我們將要在 MySQL 中建置一個學校班級的資料庫：「class」，並新增一個同學通訊錄資料表：「students」。
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-5.png" width=60% height=40% class="nofancybox img-center" />

  **認識資料表的欄位：**
  在資料表新增前，首要的動作是要先規劃資料表中所要使用的欄位。其中設定資料欄位的類型非常重要，使用正確的資料型態才能正確的儲存、應用資料。

  **數值型態：**
  可運用來儲存、計算的數值資料欄位，例如會員的編號或是產品的價格等。在
  MySQL 中的數值欄位依照所儲存的資料所需空間大小有以下的區別：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-6.png" class="nofancybox img-center" />

  **文字型態：**
  可用來儲存文字類型的資料，如學生姓名、地址等。在 MySQL 中文字型態資料有下列幾種格式：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-59.png" width=60% height=40% class="nofancybox img-center" />

  **日期及時間型態：**
  日期及時間型態：可用來儲存日期或是時間類型的資料，例如會員的生日、留言的時間等。
  MySQL 中的日期及時間型態有下列幾種格式：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-7.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-8.png" class="nofancybox img-center" />

  **特殊資料型態：**
  還有二個特殊的資料型態，嚴格來說它們都屬於文字型態，但是因為它們的內容只能由固定的選項內挑選，又有人稱它們為「列舉資料型態」，內容如下：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-9.png" width=60% height=40% class="nofancybox img-center" />

  **重要的欄位屬性：**
  在建置資料表時，除了要依不同性質的資料選擇適合的欄位型態，有些重要的欄位屬性定義也能在不同的型態欄位中發揮其功能，常用的設定如下：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-10.png" class="nofancybox img-center" />

- 新增資料表
  **欄位規劃：**

  以下我們要新增一個同學個人資料表：「students」，以下是這個資料表欄位的規劃：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-11.png" class="nofancybox img-center" />

  實作如下：
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-12.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-13.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-14.png" class="nofancybox img-center" />

  **資料新增、資料的新增、瀏覽、編輯與刪除**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-15.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-16.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-17.png" class="nofancybox img-center" />
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-18.png" class="nofancybox img-center" />

  **SQL 指令輸入：**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-19.png" class="nofancybox img-center" />

  **資料瀏覽：**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-20.png" class="nofancybox img-center" />

  **資料的編輯：**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-21.png" class="nofancybox img-center" />

  **資料的刪除：**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-22.png" class="nofancybox img-center" />

  **新增欄位：**
  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-23.png" class="nofancybox img-center" />

- **資料庫的備份與還原**
  在 `MySQL` 資料庫裡備份資料，是十分簡單又輕鬆的事情。在本節中我們將說明如何使用 `phpMyAdmin` 備份 `MySQL` 的資料表，以及資料表匯入還原的動作。
  我們可以使用 `phpMyAdmin` 的管理程式選取資料庫中的所有資料表，匯出成一個單獨的文字檔。當資料庫受到損壞或是要將資料搬移到新的 `MySQL` 資料庫時，只要將這個文字檔匯入即可完成。

  - **資料庫備份：**
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-24.png" class="nofancybox img-center" />
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-25.png" class="nofancybox img-center" />
    再按「執行」

  - **資料庫還原：**
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-26.png" class="nofancybox img-center" />
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-27.png" class="nofancybox img-center" />
    再按「執行」
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-28.png" class="nofancybox img-center" />

- **MySQL 資料庫的安全設定**
  MySQL 資料庫管理系統不同於一般檔案型的資料庫，放置在網路上雖然不會直接被下載，但是只要針對MySQL 服務端口進行攻擊，還是有安全上的顧慮。以下將深入討論 MySQL資料庫在安全性上的設定。

  - **對於 MySQL 資料庫的安全問題：**

  MySQL 資料庫是一個存在於網際網路上的資料庫系統，換句話說只要是網際網路上的使用者都可以連接到這個資源，如果沒有權限或其他措施的控管，任何人都可以對 MySQL 資料庫予取予求，為所欲為。

  - **對於 phpMyAdmin 資料庫的安全考量：**
    phpMyAdmin 是一套網頁介面的 MySQL 管理程式，有許多 PHP 的程式設計師都會將這套工具直接上傳到他的 PHP 網站資料夾裡，那麼管理者只要從遠端透過瀏覽器登入phpMyAdmin 來管理的資料庫了！

  - **防堵安全漏洞的好建議：**
    無論是 MySQL 資料庫本身的權限設定或是 phpMyAdmin 管理程式的安全漏洞，為了避免他人透過網路入侵您的資料庫，有幾件事必須要先做的：
    1. **修改 phpMyAdmin**
       管理程式的資料夾名稱。最好是修改成一個不容易猜，與管理或是MySQL、phpMyAdmin等關鍵字。

    2. **為MySQL資料庫的管理帳號加上密碼**
    3. **養成備份 MySQL 資料庫的習慣**

  - **MySQL 的帳號管理**
    在 MySQL 資料庫中的管理者帳號為：「root」，現在我們就使用 phpMyAdmin 來檢視這個帳號的設定。
    1. **檢視帳號設定：**
       <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-29.png" class="nofancybox img-center" />
    2. **修改帳號的權限：**
       每個帳號可以設定對於資料編輯、結構調整，甚至是系統管理的權限。請依照下述步驟檢視目前帳號的權限：
       <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-30.png" class="nofancybox img-center" />
    3. **建立或修改密碼：**
       若您的帳號沒有使用密碼或是要修改原來的密碼，請在該頁繼續往下捲動並進行下述步驟：
       <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-31.png" class="nofancybox img-center" />

- **設定 phpMyAdmin 的登入方式**
   phpMyAdmin 是許多人在管理、操作 MySQL 資料庫最常使用的工具。
   因為 phpMyAdmin 是以網頁的方式存在，無論是管理者或是一般使用者都可以藉由瀏覽器開啟，登入機制的啟用便是防堵沒有帳號權限的人入侵資料庫的最後一道關卡。
   phpMyAdmin 有三種登入認證模式：`config`、`cookie` 及 `http`，以下將說明這三種認證模式的差異與設定方法。

   1. config 登入認證模式：
      若是您的程式是處於本機開發階段，並沒有安全性上的考量，不希望每次使用 phpMyAdmin 來管理操作 MySQL資料庫時都要一再輸入帳號、密碼，造成開發時的困擾，您可以將資料庫的帳號、密碼直接寫到phpMyAdmin 的設定檔 `config.inc.php` 中，如此在進入 phpMyAdmin
時就會直接跳過登入步驟進入管理畫面中。
      a. 將root加入密碼：1234
         <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-32.png" class="nofancybox img-center" />

      b. 開啟「phpMyAdmin/config.inc.php」

         ```php
         /* Authentication type and info */
         $cfg['Servers'][$i]['auth_type'] = 'config';
         $cfg['Servers'][$i]['user'] = 'root';
         $cfg['Servers'][$i]['password'] = '1qaz@wsx';

         /* Bind to the localhost ipv4 address and tcp */
         $cfg['Servers'][$i]['host'] = '127.0.0.1';
         $cfg['Servers'][$i]['port'] = '3306';
         ```

      c. 即可跳過登入步驟進入管理畫面

   2. http 登入認證模式：
      若是您的網站伺服器是使用 httpd 的方式來編譯 PHP 的程式頁面，即可使用 http 登入認證模式，如 Apache 伺服器。但若是使用 CGI 的方式來使用 PHP 程式頁面就不能使用，例如 IIS 伺服器。
      a. 開啟「phpMyAdmin/config.inc.php」

         ```php
         /* Authentication type and info */
         $cfg['Servers'][$i]['auth_type'] = 'http';
         $cfg['Servers'][$i]['user'] = 'root';
         $cfg['Servers'][$i]['password'] = '1qaz@wsx';
         /* Bind to the localhost ipv4 address and tcp */
         $cfg['Servers'][$i]['host'] = '127.0.0.1';
         $cfg['Servers'][$i]['port'] = '3306';
         ```

      b. 即會顯示對話方塊要求輸入帳號、密碼
         <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-33.png" class="nofancybox img-center" />

   3. cookie 登入認證模式：
      這是一種在設定上限制最少，使用上也很方便的認證模式。只要是使用者的瀏覽器允許 cookie 的使用，即可使用cookie 登入認證模式。

         ```php
         /* Authentication type and info */
         $cfg['Servers'][$i]['auth_type'] = 'cookie';
         $cfg['Servers'][$i]['user'] = 'root';
         $cfg['Servers'][$i]['password'] = '1qaz@wsx';
         /* Bind to the localhost ipv4 address and tcp */
         $cfg['Servers'][$i]['host'] = '127.0.0.1';
         $cfg['Servers'][$i]['port'] = '3306';
         ```

- 資料庫的字元集與連線校對(使用命令提示字元介面下使用指令)

  - **設定 MySQL 的管理密碼**
      開啟命令提示字元，輸入以下指令：
      `cd \xampp\mysql\bin`
  - **登入**
    `mysql -uroot -p`
    `mysql -uroot -p -P3066`
    > 首先在指令模式用 MySQL 的 root 帳號連接到 MySQL

  - **修改使用者密碼**
    `mysqladmin -uroot -p1qaz@wsx password 1234`

    >知道密碼的情況下。

  - **忘記 Windows 平台上的 MySQL 密碼**
    1. 停止MySQL服務
    2. 使用命令提示字元

       ```bash
       cd \xampp\mysql\bin
       mysqld --datadir=e:\xampp\mysql\data --skip-grant-tables
       ```

       或 \xampp\mysq\data\my.ini 加入

       ```ini
       [mysqld]
       datadir=/xampp/mysql/data
       socket=/xampp/tmp/mysql.sock
       skip-grant-tables
       ```

       >使用MySQL安全模式啟動，跳過權限檢查

    3. 開啟一個新視窗

       ```sql
       cd \xampp\mysql\bin
       mysql
       mysql> use mysql;
       mysql> describe user;
       mysql> update user set authentication_string=PASSWORD("你的密碼") where user='root';
       mysql> UPDATE mysql.user SET authentication_string = PASSWORD('你的密碼'), plugin = 'mysql_native_password' WHERE User = 'root' AND Host = 'localhost';
       mysql> flush privileges;
       mysql> quit;
       ```

       **檢查欄位與是否是檢視表(View)**

       ```sql
       mysql> select host,user,password,authentication_string,plugin from user;
       mysql> SHOW FULL TABLES IN mysql WHERE TABLE_TYPE LIKE 'VIEW';
       ```

    4. 重新啟動 `MySQL`
    5. 即可登入

- 顯示資料庫

  ```sql
  mysql -uroot -p
  mysql> show databases;
  ```

- 查詢：

  ```sql
  mysql -uroot -p;
  mysql> show databases;
  mysql> use class;
  mysql> show tables;
  mysql> SELECT * FROM `class`.`students`;
  ```

## 2. SQL 語法

### 2.1 結構化查詢語言：SQL

&emsp;&emsp;`SQL` 全名是結構化查詢語言(Structured Query Language)，是用於資料庫中的標準數據查詢語言。
&emsp;&emsp;`SQL` 是目前關聯式資料庫系統所使用查詢語法的標準，使用者可以應用 SQL 語法對資料庫系統進行資料的存取、編輯、刪除及管理...等動作。
&emsp;&emsp;`SQL` 語法的內容是利用簡單的英文語句所構成，使用上十分的白話。

### 2.2 定義資料庫物件語法

&emsp;&emsp;SQL 語法在應用上對於 DDL (Data Definition Language)：定義資料庫物件使用的語法是很基礎而重要的，其中重要的功能關鍵字有：

1. CREATE 建立資料庫的物件。
2. ALTER  變更資料庫的物件。
3. DROP   刪除資料庫的物件。

- 建立資料庫
  CREATE 是 SQL 指中建立資料庫或資料表的關鍵字，新增資料庫的語法如下：

  ```sql
  CREATE DATABASE [IF NOT EXISTS] 資料庫名稱
  [DEFAULT]CHARACTER SET [=] 字元集
  [DEFAULT]COLLATE[=] 連線校對
  ```

- 建立資料表
  新增資料表的動作更為頻繁而重要，其語法如下：

  ```sql
  CREATE TABLE [IF NOT EXISTS] 資料表名稱
  (欄位名稱 資料類別 [資料屬性]
  [,欄位名稱 資料類別 [資料屬性]]...
  ```

  >資料庫或是資料表在新增後，可以使用 `ALTER` 指令語法進行修改。

- 修改資料庫
  `ALTER DATABASE` 指令可以修改存在的資料庫結構，基本語法如下：

  ```sql
  ALTER DATABASE 資料庫名稱
  [DEFAULT] CHARACTER SET [=] 字元集
  [DEFAULT] COLLATE [=] 連線校對
  ```

- 修改資料表欄位
  `ALTER TABLE` 指令可以修改存在的資料表結構，基本語法如下：

  ```sql
  ALTER TABLE 資料表名稱
  CHANGE 原欄位名稱 新欄位名稱 資料類別 [資料屬性]
  [,原欄位名稱 新欄位名稱 資料類別 [資料屬性]]...
  ```

- 新增資料表欄位
  `ALTER TABLE` 指令可以在已存在的資料表中新增資料表欄位，其語法如下：

  ```sql
  ALTER TABLE 資料表名稱
  ADD 欄位名稱 資料類別 [資料屬性]
  [,ADD 欄位名稱 資料類別[資料屬性]]...
  [FIRST | AFTER 欄位名稱];
  ```

- 刪除資料表欄位
  `ALTER TABLE` 指令可以在已存在的資料表中刪除資料表欄位，其語法如下：

  ```sql
  ALTER TABLE 資料表名稱
  DROP 欄位名稱;
  ```

- DROP：刪除資料庫及資料表內容
  資料庫或是資料表在新增後，可以使用 `DROP` 指令語法進行修改。
  刪除資料庫與資料表的語法相似，刪除資料庫的語法如下：

  ```sql
  DROP DATABASE [IF EXISTS] 資料庫名稱;
  ```

  這個刪除資料庫的動作會連同儲存在資料庫中的所有物件，如資料表都一同刪除。刪除資料表的語法如下：

  ```sql
  DROP TABLE [IF EXISTS] 資料表名稱;
  ```

### 2.3 查詢資料庫資料的內容

&emsp;&emsp;SQL 語法在應用上對於 DML(Data Manipulation Language)：查詢維護資料庫資料內容的語法在使用上是更重要的，無論是查詢資料庫或顯示資料庫的內容，更新或刪除資料庫中的資料，都必須依靠這些指令。其中重要的功能關鍵字有：

1. SELECT：查詢選取資料庫中的資料。
2. INSERT：新增資料到資料表中。
3. UPDATE：更改資料表中的資料。
4. DELETE：刪除資料表中的資料。

- SELECT：查詢資料
  資料的查詢應是資料庫系統最重要的工作了，所以 SELECT 可能是 SQL 語法中最重要的指令，因為所有查詢資料的動作都必須由這個指令開始。

  SELECT 基本語法：
  `SELECT` 指令應用於使用者要向資料庫系統查詢資料的時候，其基本的語法格式如下：

  ```sql
  SELECT 欄位名稱 FROM 資料表名稱;
  ```

  **選取所有的欄位：**

  ```sql
  SELECT * FROM students;
  ```

  **指定資料表選取欄位：**
  基本格式如下：

  `SELECT 資料表名稱.欄位名稱　FROM 資料表名稱；`

  例:

  ```sql
  SELECT `students`.`cName` FROM `students`;
  ```

  **AS:設定選取欄位別名：**
  在選取要顯示的欄位時，可能因為該欄位名稱不易判讀或是套用函式而不易顯示，可使用`AS`設定顯示時使用的別名，其基本的語法格式如下：

  ```sql
  SELECT 欄位名稱 AS 欄位別名 FROM 資料表名稱；
  ```

  例:

  ```sql
  SELECT `cID` AS '座號', `cName` AS '姓名' FROM `students`;
  ```

  **SELECT DISTINCT:去除重複資料顯示一筆：**
  如果需要知道某個資料表欄位內有哪些不同的值，而每個值出現的次數並不重要時，可以使用 `SELECT DISTINCT` 的方式去達成，其基本的語法格式如下：

  ```sql
  SELECT DISTINCT 欄位名稱　FROM 資料表名稱；
  ```

  問 1: 想知道全班有幾種性別 ！
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-34.png" class="nofancybox img-center" />

- WHERE：設定篩選條件
  在查詢資料時，並不是每一次都要顯示所有的內容。我們可能會為顯示的資料設定一些條件，來篩選顯示的內容，這就是 `WHERE` 指令的功能。

  **WHERE 基本語法：**
  WHERE 的基本語法格式為：

  ```sql
  SELECT 欄位名稱 FROM 資料表名稱 WHERE 條件敘述句;
  ```

  問 2: 想要由 students 資料表中挑出所有男性的資料！
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-35.png" class="nofancybox img-center" />

  **比較運算子：**
  |   =    |  !=    | <>       |
  |:-------|:-------|:---------
  |   >    |  <=    | IS NULL  |

  **AND、OR、NOT：連接多個條件式：**
  問 3: 想要由 students 資料表中找出座號大於`5`的男生
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-36.png" class="nofancybox img-center" />

  問 4: 想要由 students 資料表中找出座號不大於`5`的男生
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-37.png" class="nofancybox img-center" />

  問 5: 想要由 students 資料表中找出座號大於`5`的男生以外的資料
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-38.png" class="nofancybox img-center" />

- BETWEEN ... AND：設定篩選範圍
  BETWEEN ... AND 基本語法
  BETWEEN ... AND 設定篩選範圍是加在 WHERE 之後，它的基本語法格式為：

  ```sql
  SELECT 欄位名稱 FROM 資料表名稱 WHERE 條件敘述句;
  ```

  **設定數值篩選範圍：**
  問 6: 由 students 資料表中找出座號大於`3`且小於`7`的學生資料
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-39.png" class="nofancybox img-center" />

  **設定日期時間範圍：**
  問 7: 想要尋找日期在 `1987 ~ 1988` 之間的學生資料
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-40.png" class="nofancybox img-center" />

- IN：指定多個篩選值
  `IN` 指定多個篩選值是加在 `WHERE` 之後，它的基本語法格式為：

  ```sql
  SELECT 欄位名稱
  FROM 資料表名稱
  WHERE 欄位名稱 IN (欄位值1,欄位值2,...);
  ```

  若是設定篩選值時，若想要直接由某個欄位指定幾個值來顯示可以使用 IN 進行值的指定。指定的值必須放置在「()」左右括號中，每個值之間以「,」逗號區隔。
  問 8: 想要由 students 資料表中找出座號為 1,3,5,7,9 的學生資料
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-41.png" class="nofancybox img-center" />

- LIKE：設定字串比對的篩選值
  **萬用字元的使用：**
  在文字資料中常要找以某些文字開頭、某些文字結尾，或是字串中包含哪些文字的內容，此時即可以使用 `LIKE` 運算子，並搭配以下萬用字元來進行查詢：

  問 9:  想要由 students 資料表中，出電話號碼是「0918」開頭的學生資料
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-42.png" class="nofancybox img-center" />

  問10: 想要由 students 資料表中，找出學生的名字中有「林」這個字的學生資料。
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-43.png" class="nofancybox img-center" />

  問11: 想要由 students 資料表中，找出學生的地址中有「建國」這個字的資料。
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-44.png" class="nofancybox img-center" />

- ORDER BY：設定查詢結果的排序
  `ORDER BY` 的功能是用來設定欄位，進行排序查詢結果，它的基本語法如下：

  ```sql
  SELECT 欄位名稱
  FROM 資料表名稱
  ORDER BY 指定排序的欄位 排序方式
  ```

  其中排序方式有二種：
  1. **ASC**：遞增排序，由小排到大，也是未指定時預設的排序方法。
  2. **DESC**：遞減排序，由大排到小。

  問12: 想要由 students 資料表所有同學的資料依生日遞減排序。
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-45.png" class="nofancybox img-center" />

  問13: 想要由 students 資料表所有同學的資料依性別遞增排序，再依生日遞減排序。
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-46.png" class="nofancybox img-center" />

- LIMIT：設定查詢顯示的筆數
  LIMIT 可以設定查詢後由哪一筆開始顯示，並顯示多少筆數，它的基本語法如下：

  ```sql
  SELECT 欄位名稱
  FROM 資料表名稱
  LIMIT 開始顯示的筆數,顯示多少筆資料
  ```

  LIMIT 是由查詢後的結果再進行擷取資料的動作，如果與 ORDER BY 進行排序搭配可以輕易取得最前的 10 筆資料或是最後的 10 筆資料的結果。
  也因為如此，LIMIT 在使用時必須放置在 ORDER BY 之後。

  ```sql
  SELECT * FROM `students` ORDER BY `students`.`cSex` ASC, `students`.`cBirthday` DESC LIMIT 5
  ```

### 2.4 MySQL 常用函式

&emsp;&emsp;`MySQL` 資料庫系統本身提供了許多函式可供使用者搜尋資料時進行相關的處理，以下將分成幾個較常使用的函式類別加以介紹。

- 算術運算子與數學函式
  面對數值資料欄位，可以使用算術運算子及數學函式對於欄位的值進行處理成為查詢結果。為了以下的範例說明，我們將要在「students」資料表新增二個欄位：「身高」、「體重」，其格式內容如下：

  |名稱|欄位名稱|資料型態  | 屬性    |NULL   |其他|
  |:---|:-------|:---------|:--------|:------|:---|
  |身高|cHeight |TINYINT(3)|UNSIGNED | 是    |    |
  |體重|cWeight |TINYINT(3)|UNSIGNED | 是    |    |

  問14: 計算每個學生的標準體重，其公式為 `身高-70 x 0.6`，並顯示一欄計算目前體重與標準體重的差距。
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-47.png" class="nofancybox img-center" />

- 數學函數

  | 名稱      |    語法            |
  |:----------|:-------------------|
  |   ABS()   |ABS(數值)           |
  |   POW()   |POW(基數,次方數)    |
  |   SQRT()  |SQRT(數值)          |
  |   PI()    |                    |
  |   ROUND() |ROUND(數值,小數位數)|

  問15: 每個學生的BMI值，其公式為:體重除以身高的平方 (BMI= kg / m^2)
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-48.png" class="nofancybox" />

  > m 指單位: 公尺

- 日期時間函式
  MySQL 可以使用日期時間函式處理資欄位或是語法中相關的部份，常用的函式如下：

  |      函式            |    說明                                                                                   |
  |:---------------------|:------------------------------------------------------------------------------------------|
  | NOW()                | 返回目前日期時間，格式為「YYYY-MM-DD HH:MM:SS」、「YYYYMMDD HHMMSS」或時戳記，依需求返回。|
  | CURDATE()            | 返回目前系統年月日。也可寫為 CURRENT_DATE()，CURRENT_DATE。                               |
  | CURTIME()            | 返回目前系統時分秒。 CURRENT_TIME()，CURRENT_TIME。                                       |
  | YEAR(日期時間)       | 返回指定時間的年份，範圍在 1000 到 9999。                                                 |
  | MONTH(日期時間)      | 返回指定時間的月份，範圍在 1 到 12。                                                      |
  | DAY(日期時間)        | 返回指定時間的日期，範圍在 1 到 31。                                                      |
  | DATE(日期時間)       | 返回指定時間的年月日。                                                                    |
  | TIME(日期時間)       | 返回指定時間的時分秒。                                                                    |
  | HOUR(日期時間)       | 返回指定時間的小時，範圍在 0 到 23。                                                      |
  | MINUTE(日期時間)     | 返回指定時間的分鐘，範圍在 0 到 59。                                                      |
  | SECOND(日期時間)     | 返回指定時間的秒數，範圍在 0 到 59。                                                      |
  | DAYNAME(日期時間)    | 返回指定時間的星期名，如 Sunday、Monday 等。                                              |
  | MONTHNAME(日期時間)  | 返回指定時間的月份名，如 January、Febrary。                                               |
  | QUARTER(日期時間)    | 返回指定時間一年中的季度，範圍 1 到 4。                                                   |
  | DAYOFWEEK(日期時間)  | 返回指定時間的星期索引 (1=週日、2=周一、...7=週六)。                                      |
  | DAYOFMONTH(日期時間) | 與 DAY() 相同, 返回指定時間的日期，範圍在 1 到 31 範圍內。                                |
  | DAYOFYEAR(日期時間)  | 返回指定時間在一年中的日數，在 1 到 366 範圍內。                                          |
  | LAST_DAY(日期時間)   | 返回指定時間該月的最後一天，一般可用來判斷是否為閏年。                                    |
  | TO_DAYS(日期時間)    | 返回指定時間由西元元年到原目前的天數。                                                    |

  問16: 篩選出生日日期在星期二的同學
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-49.png" class="nofancybox img-center" />

  >提示: 利用 DAYNAME() 函數得到 「cBirthday」欄位的星期名稱

  問17: 篩選大於 20 歲的同學
  結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-50.png" class="nofancybox img-center" />

  >提示: 衍生屬性

- 統計函式
  MySQL 的 SQL 語法還提供許多統計函式，可以總計出一些資料表中的彙整資料。為了以下的範例說明，我們要在「class」資料庫中再加入一個儲存成績的資料表：「scorelist」，以下是這個資料表欄位的規劃：

  |   名稱  |  欄位    |  資料型態                 | 屬性               | NULL  | 其他       |
  |:--------|:--------|:---------------------------|:-------------------|:------|:------------
  | 編號    |  id     | TINYINT(4)                 | UNSIGNED           | 否    |            |
  | 座號    |  cID    | TINYINT(2)                 | UNSIGNED ZEROFILL  | 否    |            |
  | 科目    |  course | ENUM('國文','英文','數學') |                    | 否    |            |
  | 分數    |  score  | TINYINT(3)                 |                    | 否    |            |

  - SUM():合計值
    問18: 想要算出全班國文、英文及數學總分
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-51.png" class="nofancybox img-center" />

    問19: 想要算出全班國文總分
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-52.png"  class="nofancybox img-center" />

  - AVG():平均值
    問20: 想要算出全班國文的平均分數
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-53.png" class="nofancybox img-center" />

  - count():計次
    問21: 由 students 資料表統計全班人數
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-54.png"  class="nofancybox img-center" />

  - MAX()、MIN():最大值、最小值
    問22: 找出全班國文最高分
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-55.png"  class="nofancybox img-center" />

    問23: 找出全班數學最低分
    結果: <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-56.png"  class="nofancybox img-center" />

  - GROUP BY:分組排列
    結果: 問24: 想要顯示每個學生的總分
    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-57.png"  class="nofancybox img-center" />

  - HAVING:GROUP BY 的條件式
    若希望對 GROUP BY 的 SQL 敘述加上條件式的限制，就不能使用 WHERE 的方法，而是用 HAVING。

    問25: 想要顯示座號 1 到 5 同學的分數總計
    結果:<img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql-58.png"  class="nofancybox img-center" />

### 2.5 新增、更新、刪除

&emsp;&emsp;查詢雖然是資料庫中重要的功能，但是新增、更新與刪除資料的動作，才是維護資料庫內容的主要核心功能，以下將說明 SQL 語法中新增、更新與刪除資料的指令與語法。

- INSERT:新增資料
  可以使用 `INSERT` 語法為資料表新增資料，其基本語法如下：

  ```sql
  INSERT [INTO] 資料表名稱[(欄位名稱1,欄位名稱2,...)] VALUE (值1, 值2,...);

  ```

  **例:新增繼續新增 3 位同學進入 `students` 資料表**
  |座號|姓名 |性別|生日      |電子郵件    |電話      |地址|身高|體重|
  |:---|:----|:---|:---------|:-----------|:---------|:---|:---|:---|
  |    |Bill1|男  |1988-02-10|Bill1@bb.com|0925932221|台北|176 |89  |
  |    |Bill2|男  |1988-02-10|Bill2@bb.com|0925932222|新竹|170 |81  |
  |    |Bill3|男  |1988-02-10|Bill3@bb.com|0925932223|桃園|172 |84  |

  - 新增一筆資料

    ```sql
    INSERT INTO `students` (`cName`,`cSex`,`cBirthday`,`cEmail`,`cPhone`,`cAddr`,`cHeight`,`cWeight`) VALUES('Bill1','M','1988-02-10','Bill1@bb.com','0925932221','台北','176','89')
    ```

  - 新增多筆資料(以「,」加以區隔)

    ```sql
    INSERT INTO `students` (`cName`,`cSex`,`cBirthday`,`cEmail`,`cPhone`,`cAddr`,`cHeight`,`cWeight`) VALUES ('Bill2','M','1988-02-10','Bill2@bb.com','0925932223','台北','170','81'),('Bill3','M','1988-02-10','Bill3@bb.com','0925932223','台北','172','84')
    ```

- UPDATE:更新資料
  可以使用 `UPDATE` 語法為資料表更新資料，其基本語法如下：

  ```sql
  UPDATE 資料表名稱
  SET 欄位名稱1 = 值1, 欄位名稱2 = 值2,...
  WHERE 條件式;
  ```

  >UPDATE 更新資料的動作可以一次更動多筆資料的內容，所以 `WHERE` 後加上的條件式十分重要，只要符合條件的資料內容即會進行更新的動作，要特別注意。
  - 問 26: 要修改座號為 `11` 同學的身高體重。
  - 解 26:

    ```sql
    UPDATE `students` SET `cHeight`=174, `cWeight`=92 WHERE `cID`=11`
    ```

- DELETE:刪除資料
  可以使用 `DELETE` 語法為資料表刪除資料，其基本語法如下：

  ```sql
  DELETE FROM 資料表名稱
  WHERE 條件式;
  ```

  `DELETE` 刪除資料的動作可以一次刪除多筆資料的內容，所以 `WHERE` 後加上的條件式十分重要，只要符合條件的資料內容即會進行刪除的動作，要特別注意。
  - 問 27: 刪除座號大於 `11` 的同學的資料。
  - 解 27:

    ```sql
    DELETE FROM `students` WHERE `cID`>11;
    ```

### 2.6 多資料表關聯查詢

&emsp;&emsp;除了在一個資料表中選取欄位進行查詢，我們也可以在多個資料表中之中選取不同的欄位，進行查詢的動作。這樣的查詢方式是必須有前提的，那就是資料表之間要有一欄可以指定相關或是建立關聯。

- 結合資料表的查詢
  結合資料表的基本語法，若要結合二個資料表的基本語法如下：

  ```sql
  SELECT 顯示欄位....
  FROM 資料表_A, 資料表_B
  WHERE 資料表_A.相關欄位 = 資料表_B.相關欄位
  ```

  <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql_relation.png" class="nofancybox img-center" />

  - 問 28: 在「class」資料庫中 students 資料表與「scorelist」資料表，分別記錄著學生的個人資料及成績。在這兩個資料表中可以使用 `cID` 欄位結合並進行查詢。
  - 解 28:

    ```sql
    SELECT `students`.`cID`,`scorelist`.`course`,`scorelist`.`score`  FROM `students`, `scorelist` WHERE `students`.`cID` = `scorelist`.`cID`;
    ```

  - 問 29: 在「class」資料庫中 students 資料表與「scorelist」資料表，分別記錄著學生的個人資料及成績。使用 `cID` 欄位結合並進行查詢，顯示出學生座號、姓名及其國文成績的查詢。
  - 解 29:

    ```sql
    SELECT `students`.`cID`, `students`.`cName`, `scorelist`.`score` FROM `students`, `scorelist` WHERE `students`.`cID` = `scorelist`.`cID` AND `scorelist`.`course`='國文 '
    ```

  - 問 30: 在「class」資料庫中 students 資料表與「scorelist」資料表，分別記錄著學生的個人資料及成績。使用 `cID` 欄位結合並進行查詢，想要顯示同學的座號、姓名、總分及總平均的查詢。
  - 解 30:

    ```sql
    SELECT `students`.`cID`, `students`.`cName`, SUM(`scorelist`.`score`) AS `總分`, AVG(`scorelist`.`score`) AS `平均` FROM `students`,`scorelist` WHERE `students`.`cID` = `scorelist`.`cID` GROUP BY `students`.`cID` ORDER BY `總分` DESC
    ```

    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql_relation2.png" class="nofancybox img-center" />
  
### 2.7 使用 JOIN 結合資料表

- JOIN 的基本語法
  - 若要 JOIN 語法結合二個資料表的基本語法如下：

    ```sql
    SELECT 顯示欄位....
    FROM 資料表_A[INNER] JOIN 資料表_B
    ON 資料表_A.相關欄位 = 資料表_B.相關欄位
    ```

  - 另一個方式為：

    ```sql
    SELECT 顯示欄位....
    FROM 資料表_A[INNER] JOIN 資料表_B
    USING(相關欄位)
    ```

  >無論何種方式結合資料表，會顯示的資料必須在兩邊資料表有資料，只要有一方法有，即不會出現在結果中。例如有一個學生沒有登錄成績，就不會顯示結果中，如此很容易有漏失資訊的情況。

- 例:顯示出學生座號、姓名及其國文成績的查詢。

  - 使用 `JOIN`

    ```sql
    SELECT `students`.`cID`, `students`.`cName`,`scorelist`.`score` FROM `students` JOIN `scorelist` WHERE `scorelist`.`course` = '國文';
    ```

- 例:希望可以列出全班同學每個人的成績總分與平均。

  - 使用**結合資料表基本語法**

    ```sql
    SELECT `students`.`cID`, `students`.`cName`, SUM(`scorelist`.`score`),AVG(`scorelist`.`score`) FROM `students`,`scorelist` WHERE `students`.`cID` = `scorelist`.`cID` GROUP BY `students`.`cID`, `students`.`cName`
    ```

    <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql_relation4.png" class="nofancybox img-center" />

  - LEFT JOIN、RIGHT JOIN 語法

    ```sql
    SELECT 顯示欄位 ..
    FROM 資料表 A LEFT|RIGHT JOIN 資料表 B
    ON A.相關欄位＝ B.相關欄位
    ```

    - 使用 JOIN 基本語法：

      ```sql
      SELECT `students`.`cID`, `students`.`cName`, SUM(`scorelist`.`score`), AVG(`scorelist`.score`) FROM `students` JOIN `scorelist` ON `students`.`cID` = `scorelist`.`cID` GROUP BY `students`.`cID`
      ```

      <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql_relation5_1.png" class="nofancybox img-center" />

    - 使用 LEFT JOIN：

      ```sql
      SELECT `students`.`cID`, `students`.`cName`, SUM(`scorelist`.`score`), AVG(`scorelist`.`score`) FROM `students` LEFT JOIN `scorelist` ON `students`.`cID` = `scorelist`.`cID` GROUP BY `students`.`cID`, `students`.`cName`
      ```

      <img src="https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/mysql_relation5_2.png" class="nofancybox img-center" />

- 練習
  - mysql

    ```sql
    --
    -- 資料庫： `mydatabase`
    --
    CREATE DATABASE IF NOT EXISTS `mydatabase` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
    USE `mydatabase`;
    --
    -- 資料表結構 `grade`
    --
    DROP TABLE IF EXISTS `grade`;
    CREATE TABLE IF NOT EXISTS `grade` (
      `GID` int(11) NOT NULL,
      `SNO` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
      `COURSE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
      `SCORE` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
    --
    -- 資料表的匯出資料 `grade`
    --
    INSERT INTO `grade` (`GID`, `SNO`, `COURSE`, `SCORE`) VALUES
    (1, '1001', 'CHI', 70),
    (2, '1002', 'ENG', 80),
    (3, '1002', 'MATH', 90),
    (4, '1003', 'CHI', 80),
    (5, '1003', 'ENG', 70),
    (6, '1003', 'ENG', 70),
    (7, '1005', 'CHI', 50);
    --
    -- 資料表結構 `student`
    --
    DROP TABLE IF EXISTS `student`;
    CREATE TABLE IF NOT EXISTS `student` (
      `SNO` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
      `SNAME` varchar(10) COLLATE utf8_unicode_ci NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
    --
    -- 資料表的匯出資料 `student`
    --
    INSERT INTO `student` (`SNO`, `SNAME`) VALUES
    ('1001', 'JOHN'),
    ('1002', 'MARY'),
    ('1003', 'TOM'),
    ('1004', 'JERRY');
    ```

  - 資料庫: MYDATABASE
  - 資料表(): STUDENT

    |    SNO   |   SNAME  |
    |:-------- |:---------|
    | CHAR(10) | CHAR(10) |
    | 1001     | JOHN     |
    | 1002     | MARY     |
    | 1003     | TOM      |
    | 1004     | JERRY    |

  - 資料表(): GRADE
    | GID |     SNO  |  COURSE  |   SCORE |
    |:----|:---------|:---------|:--------|
    | INT | CHAR(10) | CHAR(10) | INT     |
    | 1   | 1001     | CHI      | 70      |
    | 2   | 1002     | ENG      | 80      |
    | 3   | 1002     | MATH     | 90      |
    | 4   | 1003     | CHI      | 80      |
    | 5   | 1003     | ENG      | 70      |
    | 6   | 1003     | MATH     | 60      |
    | 7   | 1005     | CHI      | 50

  - 使用 JOIN

    ```sql
    select `student`.`SNO`,`student`.`SNAME`,`grade`.`COURSE`,`grade`.`SCORE`
    FROM `student` JOIN `grade`
    ON `student`.`SNO` = `grade`.`SNO`
    ```

  - 使用 JOIN LEFT

    ```sql
    select `student`.`SNO`,`student`.`SNAME`,`grade`.`COURSE`,`grade`.`SCORE`
    FROM `student` LEFT JOIN `grade`
    ON `student`.`SNO` = `grade`.`SNO`
    ```

  - 使用 JOIN RIGHT

    ```sql
    select `student`.`SNO`,`student`.`SNAME`,`grade`.`COURSE`,`grade`.`SCORE`
    FROM `student` RIGHT JOIN `grade`
    ON `student`.`SNO` = `grade`.`SNO`
    ```
