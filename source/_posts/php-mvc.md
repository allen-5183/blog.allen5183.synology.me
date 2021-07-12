---
title: php mvc 框架
top: false
cover: false
toc: true
mathjax: false
comments: true
date: 2020-11-29 22:08:28
urlname: php_mvc
author:
img:
coverImg:
password: 91c7d8df4d6f54259e2cf62c147901bba0bdd6b9daa8506ae89d66994bf4a1cb
summary:
tags: 
  - mvc
  - php
categories: php
  
---
 
[php MVC](https://www.awaimai.com/128.html)

## 1. 簡介

&emsp;&emsp; `MVC` 模式（Model-View-Controller）是軟體工程中的一種軟體架構模式。

- `MVC` 把軟體系統分為三個基本部分： 模型（Model）、視圖（View）和控制器（Controller）。
- `PHP` 中 `MVC` 模式也稱 `Web MVC`，從上世紀 70 年代進化而來。
- `MVC` 的目的是實現一種動態的程式設計，便於後續對程式的修改和擴展簡化，並且使程式某一部分的重複利用成為可能。
  除此之外，此模式通過對複雜度的簡化，使程式結構更加直觀。

- MVC 各部分的職能：
  
  - 模型 `Model` – 管理大部分的業務邏輯和所有的資料庫邏輯。模型提供了連接和操作資料庫的抽象層。
  - 控制器 `Controller` - 負責回應使用者請求、準備資料，以及決定如何展示資料。
  - 視圖 `View` – 負責渲染資料，通過 `HTML` 方式呈現給使用者。
  
  </br>

  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/web_mvc.gif' class='nofancybox img-center' />

- 一個典型的 Web MVC 流程：

  1. `Controller` 截獲用戶發出的請求；
  2. `Controller` 調用 `Model` 完成狀態的讀寫操作；
  3. `Controller` 把資料傳遞給 `View`；
  4. `View` 渲染最終結果並呈獻給用戶。

- `MVC` 的設計，`Controller` 是程式的進入點，掌控整體流程，也是事件的觸發器。如下圖:
  <img src='https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/controller.png' class='nofancybox img-center' />

- `Controller` 處理的來源，就是接收網址與參數，例如：

  `http://php_mvc.edu/message.php?Action=add`

  由 `URL` 知道，使用者想讀取的頁面是 `message.php`
  使用者的行為(此範例定義為 Action)是 `add`
  程式將由此進入控制點後
  由 `Controller進行` 事件的觸發，初步定義 `Controller` 想要達到以下的效果:
  
  ```javascript
  1. 可讀取對應的檔案 Ex : controller.message.php
  2. 觸發 message_add 物件的事件
  3. 將結果回傳到 message_add.html中
  4. 頁面結果呈現
  ```

  以上是 `Controller` 所構思開發的整體邏輯，接下來就是實作部分了

## 2. 代碼規範

&emsp;&emsp;在目錄設置好以後，我們接下來規定代碼的規範：

- `MySQL` 的資料表名需小寫或小寫加底線，如：item，car_orders。
- 模組名稱（Models）需用大駝峰命名法，即首字母大寫，並在名稱後添加 `Model`，如：
  ItemModel，CarModel。
- 控制器（Controllers）需用大駝峰命名法，即首字母大寫，並在名稱後添加 `Controller`，如：`ItemController`，`CarController`。
- 方法名稱（Action）需用小駝峰命名法，即首字母小寫，如： `index`，`indexPost`。
- 視圖（Views）部署結構為控制器名稱/行為名稱，如：`item/view.php`，`car/buy.php`。

## 3. 目錄準備

&emsp;&emsp; 設計 `Myphp` 框架

project                 WEB 部署根目錄
├─app                   應用目錄
│  ├─controllers        控制器目錄
│  ├─models             模組目錄
│  ├─views              視圖目錄
├─config                設定檔目錄
|  |-config.php         設定檔文件
├─fastphp               框架核心目錄
│ ├─base                MVC基類目錄
│ ├─db                  資料庫操作類目錄
│ ├─myphp.php           內核文件  
├─static                靜態檔目錄
├─index.php             入口文件

>然後按照下一步，把 `Nginx` 或者 `Apache` 的網站根目錄配置到 `project` 目錄。

## 4. 重新定向

&emsp;&emsp;重定向的目的有兩個：設置根目錄為 `project` 所在位置，以及將所有請求都發送給 `index.php` 文件。

- 如果是 `Apache` 伺服器，在 project 目錄下新建一個 `.htaccess` 檔，內容為：
  
  ```yml  
  <IfModule mod_rewrite.c>
    # 打開 Rerite功能
    RewriteEngine On

    # 如果請求的是真實存在的檔或目錄，直接訪問
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    # 如果訪問的檔或目錄不是真事存在，分發請求至 index.php
    RewriteRule . index.php
  </IfModule>
  ```

- 如果是 `Nginx` 伺服器，修改設定檔，在 `server` 塊中加入如下的重定向：
  
  ```yml
  location / {
    # 重新向所有非真是存在的請求到index.php
    try_files $uri $uri/ /index.php$args;
  }
  ```

  >這樣做的主要原因是：
   （1）靜態檔能直接訪問。
       &emsp;&emsp;&nbsp;&nbsp;如果檔案或者目錄真實存在，則直接訪問存在的檔案/目錄。
       &emsp;&emsp;&nbsp;&nbsp;比如，靜態檔 `static/css/main.css` 真實存在，就可以直接訪問它。
   （2）程式有單一的入口。
       &emsp;&emsp;&nbsp;&nbsp;這種情況是請求位址不是真實存在的檔案或目錄，這樣請求就會傳到 `index.php` 上。
       &emsp;&emsp;&nbsp;&nbsp;例如，訪問位址：localhost/item/detail/1，在檔案系統中並不存在這樣的檔或目錄。
       &emsp;&emsp;&nbsp;&nbsp;那麼，`Apache`或 `Nginx` 伺服器會把請求發給 `index.php`，並且把功能變數名稱之後的字串賦值給 `REQUEST_URI` 變數。
       &emsp;&emsp;&nbsp;&nbsp;這樣在 `PHP` 中用 `$_SERVER['REQUEST_URI']` 就能拿到 `/item/detail/1`。

## 5. PHP MVC 核心文件

### 5.1 入口文件

- 在 `myphp` 目錄下新建 `index.php` 入口檔，檔內容為：作用是保存一些常用配置。
- 程式碼
  
  ```php
  <?php
  //定義應用目錄為當前目錄
  define('APP_PATH', __DIR__ . '/');

  //開啟偵錯模式
  define('APP_DEBUG', true);

  //加載框架文件
  require APP_PATH . "myphp/myphp.php";

  //加載配置框架文件
  $config = require APP_PATH . "config/config.php";

  //實例化框架類別 (myphp/myphp.php)

  (new myphp\myphp($config))->run();
  ```

### 5.2 配置文件

- 作用是保存一些常用配置。
- `config.php` 檔內容如下，作用是定義資料庫連接參數參數，以及配置預設控制器名稱和操作名稱：
- 程式碼
  
  ```php
  <?php
  // 資料庫配置(2 維陣列) db[ ["host"]=>"localhost" ] ]    array[ley]
  $config['db']['host'] = 'localhost';
  $config['db']['username'] = 'root';
  $config['db']['password'] = '1qaz@wsx';
  $config['db']['dbname'] = 'myphp';

  // 預設控制器和操作名稱
  $config['defaultController'] = 'Item';
  $config['defaultAction'] = 'index';
  return $config;
  ```

### 5.3 框架核心類別

- 入口檔對框架類做了兩步操作：產生實體，調用 `run()` 方法。
- 產生實體操作接受 `$config` 參數配置，並保存到物件屬性中。

- `run()` 方法則調用用類自身方法，完成下面幾個操作：
  1. 類自動載入
  2. 環境檢查
  3. 過濾敏感字元
  4. 移除全域變數的老用法
  5. 路由處理

- 在 `myphp` 目錄下新建核心類別檔案，名稱 `myphp.php`，代碼：
  
  ```php
  <?php
    namespace myphp;

    // 框架根目錄
    defined('CORE_PATH') or define('CORE_PATH', __DIR__);

    /**
    * my 框架核心
    */
    class myphp
    {
      // 配置內容
      protected $config = [];
      public function __construct($config)
      {
        $this->config = $config;
      }

      // 運行程式
      public function run()
      {
        spl_autoload_register(array($this, 'loadClass'));
        $this->setReporting();
        $this->removeMagicQuotes();
        $this->unregisterGlobals();
        $this->setDbConfig();
        $this->route();
      }

      // 路由處理
      public function route()
      {
        $controllerName = $this->config['defaultController'];
        $actionName = $this->config['defaultAction'];
        $param = array();

        $url = $_SERVER['REQUEST_URI'];
        // 清除?之後的內容
        $position = strpos($url, '?');
        $url = $position === false ? $url : substr($url, 0, $position);
        // 刪除前後的“/”
        $url = trim($url, '/');

        if ($url) {
            // 使用 "/" 分割字串，並保存在陣列中
            $urlArray = explode('/', $url);
            // 刪除空的陣列元素
            $urlArray = array_filter($urlArray);

            // 獲取控制器名
            $controllerName = ucfirst($urlArray[0]);

            // 獲取動作名
            array_shift($urlArray);
            $actionName = $urlArray ? $urlArray[0] : $actionName;

            // 獲取URL參數
            array_shift($urlArray);
            $param = $urlArray ? $urlArray : array();
        }

        // 判斷控制器和操作是否存在
        $controller = 'app\\controllers\\'. $controllerName . 'Controller';
        if (!class_exists($controller)) {
            exit($controller . '控制器不存在');
        }
        if (!method_exists($controller, $actionName)) {
            exit($actionName . '方法不存在');
        }

        // 如果控制器和操作名存在，則產生實體控制器，因為控制器物件裡面
        // 還會用到控制器名和操作名，所以產生實體的時候把他們倆的名稱也
        // 傳進去。結合Controller基類一起看
        $dispatch = new $controller($controllerName, $actionName);

        // $dispatch保存控制器產生實體後的物件，我們就可以調用它的方法，
        // 也可以像方法中傳入參數，以下等同於：$dispatch->$actionName($param)
        call_user_func_array(array($dispatch, $actionName), $param);
    }

    // 檢測開發環境
    public function setReporting()
    {
        if (APP_DEBUG === true) {
            error_reporting(E_ALL);
            ini_set('display_errors','On');
        } else {
            error_reporting(E_ALL);
            ini_set('display_errors','Off');
            ini_set('log_errors', 'On');
        }
    }

    // 刪除敏感字元
    public function stripSlashesDeep($value)
    {
        $value = is_array($value) ? array_map(array($this, 'stripSlashesDeep'), $value) : stripslashes($value);
        return $value;
    }

    // 檢測敏感字元並刪除
    public function removeMagicQuotes()
    {
        if (get_magic_quotes_gpc()) {
            $_GET = isset($_GET) ? $this->stripSlashesDeep($_GET ) : '';
            $_POST = isset($_POST) ? $this->stripSlashesDeep($_POST ) : '';
            $_COOKIE = isset($_COOKIE) ? $this->stripSlashesDeep($_COOKIE) : '';
            $_SESSION = isset($_SESSION) ? $this->stripSlashesDeep($_SESSION) : '';
        }
    }

    // 檢測自訂全域變數並移除。因為 register_globals 已經棄用，如果
    // 已經棄用的 register_globals 指令被設置為 on，那麼區域變數也將
    // 在腳本的全域作用域中可用。 例如， $_POST['foo'] 也將以 $foo 的
    // 形式存在，這樣寫是不好的實現，會影響代碼中的其他變數。 相關資訊，
    // 參考: http://php.net/manual/zh/faq.using.php#faq.register-globals
    public function unregisterGlobals()
    {
        if (ini_get('register_globals')) {
            $array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
            foreach ($array as $value) {
                foreach ($GLOBALS[$value] as $key => $var) {
                    if ($var === $GLOBALS[$key]) {
                        unset($GLOBALS[$key]);
                    }
                }
            }
        }
    }

    // 配置資料庫資訊
    public function setDbConfig()
    {
        if ($this->config['db']) {
            define('DB_HOST', $this->config['db']['host']);
            define('DB_NAME', $this->config['db']['dbname']);
            define('DB_USER', $this->config['db']['username']);
            define('DB_PASS', $this->config['db']['password']);
        }
    }

    // 自動載入類
    public function loadClass($className)
    {
        $classMap = $this->classMap();

        if (isset($classMap[$className])) {
            // 包含內核檔
            $file = $classMap[$className];
        } elseif (strpos($className, '\\') !== false) {
            // 包含應用（application目錄）檔
            $file = APP_PATH . str_replace('\\', '/', $className) . '.php';
            if (!is_file($file)) {
                return;
            }
        } else {
            return;
        }

        include $file;

        // 這裡可以加入判斷，如果名為$className的類、介面或者性狀不存在，則在調試模式下拋出錯誤
    }

    // 內核檔命名空間映射關係
    protected function classMap()
    {
        return [
            'fastphp\base\Controller' => CORE_PATH . '/base/Controller.php',
            'fastphp\base\Model' => CORE_PATH . '/base/Model.php',
            'fastphp\base\View' => CORE_PATH . '/base/View.php',
            'fastphp\db\Db' => CORE_PATH . '/db/Db.php',
            'fastphp\db\Sql' => CORE_PATH . '/db/Sql.php',
        ];
    }
  }
  ```
  
  下面重點講解主請求方法 `route()`，它也稱路由方法。
  路由方法的主要作用是：截取URL，並解析出控制器名稱、方法名稱和URL參數。
  假設我們的 `URL` 是這樣：
  `yoursite.com/controllerName/actionName/queryString`
  當流覽器訪問上面的 `URL`，`route()` 從全域變數 `$_SERVER['REQUEST_URI']` 中獲取到字串 `/controllerName/actionName/queryString`。
  然後，會將這個字串分割成三部分：`controllerName`、`actionName` 和 `queryString`。
  例如，`URL` 連結為：`yoursite.com/item/detail/1/hello`，那麼 `route()` 分割之後，
  - `ControllerName` 名就是：`item`
  - `actionName` 名就是：`detail`
  - `URL` 參數就是：array(1, hello)
    分割完成後，路由方法再產生實體控制器：itemController，並調用其中的detail方法 。

### 5.4 Controller 基礎類別

接下來，就是在 `myphp` 中創建 `MVC` 基類，包括控制器、模型和視圖三個基類。
在 `myphp/base/` 目錄下新建控制器基類，檔案名 `Controller.php`，功能就是總調度，內容如下：

- 程式碼
  
  ```php
  <?php
    namespace fastphp\base;

    /**
     * 控制器基類
     */
    class Controller
    {
      protected $_controller;
      protected $_action;
      protected $_view;

      // 構造函數，初始化屬性，並產生實體對應模型
      public function __construct($controller, $action)
      {
        $this->_controller = $controller;
        $this->_action = $action;
        $this->_view = new View($controller, $action);
      }

      // 分配變數
      public function assign($name, $value)
      {
        $this->_view->assign($name, $value);
      }

      // 渲染視圖
      public function render()
      {
        $this->_view->render();
      }
   }
  ?>
  ```

  `Controller` 類用 `assign()` 方法實現把變數保存到 `View` 物件中。
  這樣，在調用 `$this->render()` 後視圖檔就能顯示這些變數。

### 5.5 Model 基礎類別

- 新建模型基類，繼承自資料庫操作類Sql類。
- 因為資料庫操作比較複雜，所以SQL操作我們單獨創建一個類。
- `Model` 基類涉及到3個類：`Model` 基類本身，它的父類 `SQL`，以及提供資料庫連接控制碼的 `Db` 類。
- 在 `myphp/base/` 目錄下新建模型基類檔，名為 `Model.php`，代碼如下：

  ```php
  <?php
    namespace myphp\base;

    use myphp\db\Sql;
    class Model extends Sql
    {
        protected $model;
        public function __construct()
        {
            // 獲取資料庫表名
            if (!$this->table) {

               // 獲取模型類名稱
               $this->model = get_class($this);

               // 刪除類名最後的 Model 字元
               $this->model = substr($this->model, 0, -5);

               // 資料庫表名與類名一致
               $this->table = strtolower($this->model);
            }
        }
    }
  ?>  
  ```

  在 `myphp/db/目錄下建立一個資料庫基類 Sql.php，代碼如下：

  ```php
  <?php
     namespace fastphp\db;
     use \PDOStatement;

     class Sql
     {
       // 資料庫表名
       protected $table;

       // 資料庫主鍵
       protected $primary = 'id';

       // WHERE和ORDER拼裝後的條件
       private $filter = '';

       // Pdo bindParam()綁定的參數集合
       private $param = array();

       /**
        * 查詢準則拼接，使用方式：
        *
        * $this->where(['id = 1','and title="Web"', ...])->fetch();
        * 為防止注入，建議通過$param方式傳入參數：
        * $this->where(['id = :id'], [':id' => $id])->fetch();
        *
        * @param array $where 條件
        * @return $this 當前物件
        */
        public function where($where = array(), $param = array())
        {
          if ($where) {
            $this->filter .= ' WHERE ';
            $this->filter .= implode(' ', $where);

            $this->param = $param;
          }

          return $this;
        }

        /**
         * 拼裝排序條件，使用方式：
         *
         * $this->order(['id DESC', 'title ASC', ...])->fetch();
         *
         * @param array $order 排序條件
         * @return $this
        */
        public function order($order = array())
        {
          if($order) {
            $this->filter .= ' ORDER BY ';
            $this->filter .= implode(',', $order);
          }

          return $this;
       }

       // 查詢所有
       public function fetchAll()
       {
         $sql = sprintf("select * from `%s` %s", $this->table, $this->filter);
         $sth = Db::pdo()->prepare($sql);
         $sth = $this->formatParam($sth, $this->param);
         $sth->execute();

         return $sth->fetchAll();
       }

       // 查詢一條
       public function fetch()
       {
          $sql = sprintf("select * from `%s` %s", $this->table, $this->filter);
          $sth = Db::pdo()->prepare($sql);
          $sth = $this->formatParam($sth, $this->param);
          $sth->execute();

          return $sth->fetch();
       }

       // 根據條件 (id) 刪除
       public function delete($id)
       {
          $sql = sprintf("delete from `%s` where `%s` = :%s", $this->table, $this->primary, $this->primary);
          $sth = Db::pdo()->prepare($sql);
          $sth = $this->formatParam($sth, [$this->primary => $id]);
          $sth->execute();

          return $sth->rowCount();
       }

       // 新增數據
       public function add($data)
       {
         $sql = sprintf("insert into `%s` %s", $this->table, $this->formatInsert($data));
         $sth = Db::pdo()->prepare($sql);
         $sth = $this->formatParam($sth, $data);
         $sth = $this->formatParam($sth, $this->param);
         $sth->execute();

        return $sth->rowCount();
      }

      // 修改資料
      public function update($data)
      {
         $sql = sprintf("update `%s` set %s %s", $this->table, $this->formatUpdate($data), $this->filter);
         $sth = Db::pdo()->prepare($sql);
         $sth = $this->formatParam($sth, $data);
         $sth = $this->formatParam($sth, $this->param);
         $sth->execute();

        return $sth->rowCount();
      }

      /**
       * 預留位置綁定具體的變數值
       * @param PDOStatement $sth 要綁定的PDOStatement對象
       * @param array $params 參數，有三種類型：
       * 1）如果SQL語句用問號?預留位置，那麼$params應該為
       *    [$a, $b, $c]
       * 2）如果SQL語句用冒號:預留位置，那麼$params應該為
       *    ['a' => $a, 'b' => $b, 'c' => $c]
       *    或者
       *    [':a' => $a, ':b' => $b, ':c' => $c]
       *
       * @return PDOStatement
       */
      public function formatParam(PDOStatement $sth, $params = array())
      {
          foreach ($params as $param => &$value) {
            $param = is_int($param) ? $param + 1 : ':' . ltrim($param, ':');
            $sth->bindParam($param, $value);
          }

      return $sth;
    }

    // 將陣列轉換成插入格式的sql語句
    private function formatInsert($data)
    {
        $fields = array();
        $names = array();
        foreach ($data as $key => $value) {
            $fields[] = sprintf("`%s`", $key);
            $names[] = sprintf(":%s", $key);
        }

        $field = implode(',', $fields);
        $name = implode(',', $names);

        return sprintf("(%s) values (%s)", $field, $name);
    }

    // 將陣列轉換成更新格式的sql語句
    private function formatUpdate($data)
    {
        $fields = array();
        foreach ($data as $key => $value) {
            $fields[] = sprintf("`%s` = :%s", $key, $key);
        }

        return implode(',', $fields);
    }
  }
  ```

  應該說，`Sql` 基類是框架的核心部分。為什麼？
  因為通過它，我們創建了一個 SQL 抽象層，可以大大減少了資料庫的程式設計工作。
  雖然 `PDO` 介面本來已經很簡潔，但是抽象之後框架的可靈活性更高。
  `Sql` 類裡面有用到 `Db:pdo()`方法，這是我們創建的Db類，它提供一個PDO單例。
  在 `myphp/db/` 目錄下創建 `Db.php` 檔，內容：

  ```php
  <?php
    namespace fastphp\db;
    use PDO;
    use PDOException;

    /**
     * 資料庫操作類。
     * 其$pdo屬性為靜態屬性，所以在頁面執行週期內，
     * 只要一次賦值，以後的獲取還是首次賦值的內容。
     * 這裡就是PDO物件，這樣可以確保運行期間只有一個
     * 資料庫連線物件，這是一種簡單的單例模式
     * Class Db
    */
    class Db
    {
      private static $pdo = null;

      public static function pdo()
      {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        try {
            $dsn    = sprintf('mysql:host=%s;dbname=%s;charset=utf8', DB_HOST, DB_NAME);
            $option = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);

            return self::$pdo = new PDO($dsn, DB_USER, DB_PASS, $option);
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
      }
    }
  ?>
  ```

### 5.6 View 基礎類別

---

## PHP 框架自製

**參考文獻:**

1. [「七天自製PHP框架」第一天:路由與控制器](https://www.cnblogs.com/sweng/p/6624827.html)
2. [「七天自製PHP框架」第二天:模型與資料庫](https://www.cnblogs.com/sweng/p/6624845.html)
3. [「七天自製PHP框架」第三天:PHP實現的設計模式](https://www.cnblogs.com/sweng/p/6666008.html)
4. [「七天自製PHP框架」第四天:模型關聯](https://www.cnblogs.com/sweng/p/7089991.htm)

<https://www.bilibili.com/s/video/BV1cg4y1z7Gh>

## 1. 路由與控制器

## 2. 模型與資料庫

### 2.1 何謂模型

我們的 `WEB` 系統一定會和各種資料打交道，實際開發過程中，往往一個類別對應了關聯式資料庫的一張或多張資料表，這裡就會出現兩個問題。

1. 類別和資料表，一方修改會導致另一方的修改，只要資料表結構不定下來，業務邏輯的開發幾乎沒法開工

2. 獲取資料時會牽涉很多 `SQL` 語句的拼接，如果資料結構變動，這些 `SQL` 需要改寫，假如要開發一個溫溼度系統，我們設計兩個 `Model` 和兩張資料表。

- 第一張資料表，表名是 `post`，儲存博客文章，資料如下：

  |id |content
  |:--|:----------
   1 | hello
   2 | world

- 第二張資料表，表名是 `comment`，儲存博客文章的評論，資料如下：

  |id |content|postid
  |:--|:---|:-------
   1 |c11|1
   2 |c12|1
   3 |c21|2

> post 和 comment 是一對多的關係，每一篇博客文章對應了多條評論，每一條評論只屬於一篇文章。

- `Model` 類的設計之前，我們先定義好三個介面:
  
  ```php
  interface IModel{
    public static function all();
    public static function get($id);
    public static function where($condition,$value);
  }

- 定義 Model 類別
  
  ```php
  class Model implement IModel{
    public static $table;
    public ststic $db;
    public function __constructor(){
      self::$db=new MySQL();
    }

    public static function get($id){
        return self::where('id',$id);
    }

    public static function where($condition,$value){
        $sql=sprintf("select * from %s where %s='%s'",self::$table,$condition,$value);
        return self::$db->Query($sql);
    }

    public static function all(){
        $sql=sprintf("select * from %s",self::$table);
        return self::$db->Query($sql);
    }
  }
  ```

這三個介面分別負責了三種查詢：遍歷查詢，條件查詢，按編號查詢，其實這三種介面的設計並不是最科學的，甚至get方法不過是where的一種特殊形式，但是這樣的設計並不影響我們工程，甚至也有助於理解，我們後期會對這段代碼做改動。
之所以在 `Model` 類裡就完成了 `SQL` 的拼接，就是希望在子類中不必重複再寫 `SQL`。

- 然後定義 Post 類別
  
  ```php
  class PostModel extends Model{
    public $postid;
    public function __construct(){
        parent::__construct();
        parent::$table='post';
    }
  ```

- 定義 Comment 類別
  
  ```php
  class CommentModel extends Model{
    public $commentid;
    public function __construct(){
        parent::__construct();
        parent::$table='comment';
    }
  ```

- 我們可以在控制器的方法中寫這樣的代碼來完成調用資料
  
  ```php
  $post=new PostModel();
  $post::all();
  $arr=$post::get('1');
  var_dump($arr);

  $comment=new CommentModel();
  $arr=$comment::get('2');
  var_dump($arr);
  ```

### 2.2 模型與資料庫

- 先寫一個 `DB` 抽象類別，規定類需要實現的方法。

  ```php
  abstract class DB{
    private $IP;
    private $user;
    private $pwd;
    private $name;
    private $connection;

    abstract public function Execute($sql);
    abstract public function Query($sql);
  }
  ```

>這裡以 `MySQL` 資料為例，當然你也完全可以實現一套 `Sqlite` 資料庫的介面。

- 程式碼
  
  ```php
  class MySQL extends DB{
    public function MySQL(){
        /*Config*/
        $this->IP='*';
        $this->ServerID='*';
        $this->ServerPassword='*';
        $this->DataBaseName='*';
        /*End of Config*/

        $this->connection=mysqli_connect($this->IP,$this->ServerID,$this->ServerPassword,$this->DataBaseName);

        if(!$this->connection){
            die('Could not connect'.$this->connection);
        }

        mysqli_query($this->connection,'set names utf8');
    }

    public function Execute($sql){
        return mysqli_query($this->connection,$sql);
    }

    public function Query($sql){
        $result=mysqli_query($this->connection,$sql);
        $arr=array();
        while($row=mysqli_fetch_array($result)){
            $arr[]=$row;
        }
        return $arr;
    }
    public function Close(){
        mysqli_close($this->connection);
    }
  }
  ```

  >談到資料庫類，上述的寫法仍不是最好的，因為我們可以使用單例模式來保證DB 類只有一次初始化，來節省硬體資源的開銷。

## 3. `PHP` 實現的設計模式

### 3.1 為什麼要使用設計模式？

設計模式，為了達到 **可複用**這個目標，而設計的一套相互協作的類。

>可以參考《Design Patterns: Elements of Reusable Object-Oriented Software》，四位作者（Gang of Four）在書中列舉了業界聞名的23種設計模式。

這裡先介紹我們框架要涉及的三種設計模式。

- 單例模式（singleton）
  
  單例模式可以保證一個類別只有一個物件實例，常用在資料庫存取類，從而節省硬體資源的消耗。

  這裡，我們改寫上面的 `MySQL` 類別

  ```php
  class MySQL extends DB{
    private static $instance=null;
    public static function getInstance(){
        if(self::$instance==null){
            self::$instance=new MySQL();
        }
        return self::$instance;
    }

    public function MySQL(){
        /*Config*/
        $this->IP='*';
        $this->ServerID='*';
        $this->ServerPassword='*';
        $this->DataBaseName='*';
        /*End of Config*/

        $this->connection=mysqli_connect($this->IP,$this->ServerID,$this->ServerPassword,$this->DataBaseName);

        if(!$this->connection){
            die('Could not connect'.$this->connection);
        }

        mysqli_query($this->connection,'set names utf8');
    }

    public function Execute($sql){
        return mysqli_query($this->connection,$sql);
    }

    public function Query($sql){
        $result=mysqli_query($this->connection,$sql);
        $arr=array();
        while($row=mysqli_fetch_array($result)){
            $arr[]=$row;
        }
        return $arr;
    }
    public function Close(){
        mysqli_close($this->connection);
    }
  }
  ```

  這裡要注意的是，如果產生實體一個 `MySQL` 類，我們不再寫
  `$db=new MySQL();`

  而是這樣：
  `$db=MySQL::getInstance();`

  因為只有 `getInstance` 這個靜態函數，才能保證只調用一次 `MySQL` 類的構造函數。

- 面板模式（Facade）
  因為命名空間的問題，面板模式可以保證一個類別的諸多方法看似是 **一個類別提供的**，這裡我們先設計一個簡單的服務提供者類別:

  ```php
  class ServiceProvider{
    public function Write($arg){
        echo $arg;
    }
  }
  ```

  這個類別只有一個 `Write` 方法，就是把參數列印出來，然後定義一個 `Facade` 類別。

  ```php
  class Facade{
    public static function getInstance($classname,$args){
        return new $classname($args);
    }

    public static function getFacadeAccessor(){
        //
    }

    public static function __callstatic($method,$args){
      $instance=static::getInstance(static::getFacadeAccessor(),$args);
      return call_user_func_array(array($instance,$method),$args);
    }
  }
  ```

  要理解這個類，我們只要關注最後一個函數，就是 `__callstatic` 魔術方法。這個方法就是 `Facade` 類型物件或者其子類在調用他自身沒有定義過的函數時，
  就會調用 `__callstatic` 方法，而這個方法最後調用了 `call_user_func_array` 函數，就是把任務交給提供這項服務的類去完成，同時完成參數的傳遞。

  我們再寫一個 `Facade` 子類別

  ```php
  class MyFacade extends Facade{
    public static function getFacadeAccessor(){
        return ServiceProvider::class;
    }
  }
  ```

  這裡注意，子類實現了父類沒有具體實現的getFacadeAccessor方法，這個方法就是要告訴父類的__callstatic方法：**我作為Facade，代表的是什麼哪個類，任務就由他來實現吧**，從語法上看，只是返回了一個表示類名的字串。所以父類起初並不知道它的子類都代表著什麼“服務提供者類”，只有當子類的靜態函數被調用後，因為子類沒有該靜態函數，所以父類的 `__callstatic` 方法被啟動了。

- 抽象工廠（Factory）
  我對抽象工廠有一個粗俗的理解：*物件與字串的對應**，也就是用一個字串就可以創造一個類的物件。這種做法主要用在兩種情況下是很方便的：
  1. 類名不穩定，會在專案中頻繁修改
     類名修改，很多時候並不是設計者的**命名潔癖**或者**命名強迫症**導致的修改，而是在項目的不斷反覆運算，發覺這個類設計的不合理。如果這個類用的不頻繁，那麼改個類名只要手工做一些小的修改即可，但是如果這個類通篇存在於代碼之中（假如是資料庫類），那修改工作量就大了，當然，我們也可以對代碼檔使用**字串替換**，但是假如一個 `PHP` 寫成的專案，`PHP` 檔有幾十上百個，這也是不合理的事。
  2. 類的設計者並不是類的使用者
     類的設計者和類的使用者不是同一個開發人員，那麼記憶一個字串或許比記憶一個類名要生動的多。我們都學過電腦網路原理，都知道記憶一個功能變數名稱要比記憶一個IP位址要生動的多，這就是 `DNS` 解決的問題。

  因為抽象工廠很多教材都有涉及，不再贅述，本文將介紹一下目前非常流行的服務容器。
  我們希望整個工程項目中，DB類，Session類，FileSystem類“拿來即用”，不用每次繁瑣的初始化，比如寫$db=new DB(arg1,arg2);這類語句，也希望DB等類型的物件像一個“全域”變數一般，在整個程式運行期間，隨時可以調用。
  服務容器可以讓調用DB等類型的程式師不用知道這個類太多的細節，甚至可以用一個字串的別名來創建這樣一個物件。
  我們定義一個服務容器類

  ```php
  class Container{
    public $bindings;
    public function bind($abstract,$concrete){
        $this->bindings[$abstract]=$concrete;
    }
    public function make($abstract,$parameters=[]){
        return call_user_func_array($this->bindings[$abstract],$parameters);
    }
  }
  ```

  可以把服務容器簡單的看成一個全域變數，bind方法就是用關聯陣列把字串和構造函數做綁定。
  至此，有了服務容器，我們的Model類就要做修改了

  ```php
  class Model implements IModel{
    public static $table;
    public static $container;

    public static $db;
    public function __construct(){
        self::$container=new Container();
        self::$container->bind('db',function(){
            return MySQL::getInstance();
        });

        self::$db=self::$container->make('db',[]);
    }

    public static function get($id){
        return self::where('id',$id);
    }

    public static function where($condition,$value){
        $sql=sprintf("select * from %s where %s='%s'",self::$table,$condition,$value);
        return self::$db->Query($sql);
    }

    public static function all(){
        $sql=sprintf("select * from %s",self::$table);
        return self::$db->Query($sql);
    }
   }
   ```

   觀察上面代碼，我們同時用了單例模式和服務容器。
   總結：如果要做一個PHP框架，應該要做好代碼的複用。設計模式一直是很多爭論的焦點，“究竟該不該使用設計模式？”，本文開始，我也努力回避“過於糾結這個問題”，我認為，設計模式有其存在的價值，至少在具體專案中，確實在很多版本反覆運算中節省了工作量，提高工作效率，但是如果在一個小項目中為了“秀一下我會設計模式”而使用設計模式，就不合理了。

## 4. 模型關聯

平時做 `PHP` 專案常常要和 **新聞發佈**，**博客評論**打交道，而每一次寫功能都會重寫**相似**的代碼，如果能夠把這一塊代碼做好重用，以後只需修改幾個參數就能用在另一個項目，就可以很短時間完成一個功能。

當然使用 `PHP` 框架，會讓你工作效率得到成倍的提升，但是，你的學習成本也就跟著上去了。

最初使用 `Laravel` 框架的時候，覺得 `Eloquent` 的語法實現得很美，比如：

- 範例
  
  ```php
  $comments = App\Post::find(1)->comments;
  foreach ($comments as $comment) {
    //
  }
  ```

  如何做模型關聯。
  
  模型，簡單點說，就是把資料庫中這麼多表格抽象成若干個物件，使得開發的過程中，不用再關心資料表的結構，而是專心類別和物件的設計。
  就拿在微信朋友圈發消息來說，這裡涉及到了3個物件：消息（純文字，圖片，或者圖文），點贊，評論。

  ![ ](images/php_mvc/model.png)

  根據這個圖，我們設計三個類：

  ```php
  class MessageModel extends Model{
    public static $data;
    public static $name;
    public $messageid;
    public function __construct(){
        parent::__construct();
        $this::$name='message_list';
        $this::$table='message';
    }
  }

  class LikeModel extends Model{
    public static $data;
    public static $name;
    public $likeid;
    public function __construct(){
        parent::__construct();
        $this::$name='like_list';
        $this::$table='messagelike';
    }
  }

  class CommentModel extends Model{
    public $commentid;
    public function __construct(){
        parent::__construct();
        $this::$name='comment_list';
        $this::$table='reply';
    }
  }
  ```
  
  這是典型的 **一對多** 的模型，也就是一個 `Message` 物件對應了多個 `Like` 物件和 `Comment` 物件，而一個 `Like` 物件或者 `Comment` 只對應了一個 `Message` 物件。

  有人說，為什麼不用 `SQL` 中的 `where` 或者 `join` 來查詢？
  因為我實在厭倦了拼接 `SQL`，實在太無趣了。
  關鍵是查詢完得到的多維陣列，還需要寫一段代碼來組裝成物件陣列，讓我不得不思考怎麼避免這低效勞動。
  我的方案是每一個 `Model` 都實現這樣的介面，讓你儘量少寫 `select`

  ```php
  public static function get($id){
    return self::where('id',$id);
  }

  public static function where($condition,$value){
    $sql=sprintf("select * from %s where %s='%s'",self::$table,$condition,$value);
    return self::$db->Query($sql);
  }

  public static function first($num){
    $sql=sprintf("select * from %s limit %s",self::$table,$num);
    return self::$db->Query($sql);
  }

  public static function all(){
    $sql=sprintf("select * from %s",self::$table);
    return self::$db->Query($sql);
  }
  ```

  那如果要實現一對多，怎麼辦？ `Laravel` 使用了 `trait` 特性，讓 `Model` 來 `use` 這個特性。這裡我們簡單的做一個函數：

  ```php
  public function HasMany(Model $model,$foreignkey){
    for($i=0;$i<count($this::$data);++$i){
        $this::$data[$i][$model::$name]=[];
        for($j=0;$j<count($model::$data);++$j){
            if($this::$data[$i][$foreignkey]==$model::$data[$j][$foreignkey]){
                array_push($this::$data[$i][$model::$name],$model::$data[$j]);
            }
        }
    }
  }
  ```

  對於三張資料表：Message，Like，Comment 來說，Message的主鍵是msgid，而msgid同時也是Like和Comment這兩張表格的外鍵，靠著外鍵，三張表形成了一對多的關係。

  所以憑藉這樣的一個關聯陣列的操作，我們把Like和Comment陣列作為一個關聯陣列的Value塞入Message陣列中的一個元素。
  最後我們測試一下效果：
  
  ```php
  $messageModel=new MessageModel();
  $messageModel::$data=$messageModel::all();

  $likeModel=new LikeModel();
  $likeModel::$data=$likeModel::all();

  $commentModel=new CommentModel();
  $commentModel::$data=$commentModel::all(10);

  $messageModel->HasMany($likeModel,'msgid');
  $messageModel->HasMany($commentModel,'msgid');

  echo json_encode($messageModel::$data);
  ```

  >最後使用 `JSON` 格式輸出，結構一目了然，給前端調用也很便利

  ```php
  [
    {
      "0" : "2017/6/25"





    }
  ]
  ```
