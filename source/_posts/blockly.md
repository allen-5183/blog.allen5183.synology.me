# Google Blockly

## Google Blockly 概述

在 2012年6月，Google發布了完全可視化的編程語言`Google Blockly`，這是一款完全開源的，集合多種編程語言的編程工具。很多圖形化編程平台都是基於`Google Blockly`二次開發的，譬如：`APPInventor`、`Wyliodrin`、`Earsketch`等優秀編程平台。`Google Blockly`作為一種易於掌握的圖像化開源編程環境，是編程初學者學習和掌握程序設計方法的有力工具，非常有必要予以了解和掌握。

## 什麼是Google Blockly

1. 一種基於網頁的可視化程序
   `Google Blockly`是基於網頁的可視化編程工具庫。用戶可以以離線或者在線的方式在`Windows`、`Linux`、`MAC`和`Android`平台上的瀏覽器端進行編程操作。可以使用計算機端、手機或平板移動端進行隨時隨地的完成編程設計，教學編程方式多種多樣。

2. 多種開發語言環境庫
   `Blockly`基於圖形化編程設計可以導出`Javascript`、`Python`、`PHP`、`Lua`、`Dart`等多種語言。通過圖形化編程完成程序設計，在`Blockly`中有一個類似語言轉換器的工具箱，可以將圖形化編程語言轉化成多種編程語言代碼。用圖形化編程方式去理解多種程序語言。

3. 開源的自定義編程環境
   `Blockly`是開源的編程工具，用戶可以根據自己編程的特點要求，對`Blockly`工具箱進行自定義設計。同時，`Blockly開發工具`能讓用戶自定義塊導出至工具箱，並在工作區工廠完成對代碼的封裝。如圖所示。

   ![20210630182652](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630182652.png)

## Google Blockly 的編程環境

`Blockly`是一個可用於`Web`、`Android`、`iOS`的可視化代碼編輯器庫

1. **Blockly在線使用**
   打開瀏覽器，在地址欄輸入`https://developers.google.com/blockly/`，前往`Blockly`官網，即可體驗編程。

2. **Blockly的離線環境搭建**
   在`Github`網站或者Blockly主頁上找到對應系統的文件包，下載後，無需安裝，解壓，進入`demos`目錄，打開`index.html`，選擇相應的選項，即可體驗。

   - `Linux`系統，可下載`TAR Ball`，在終端進行文件解壓即可；
   - `Windows`系統，可下載`ZIP File`，並繼續解壓即可;
   - `Github Blockly`地址: `https://github.com/google/blockly`
   - `TAR Ball`地址: `https://github.com/google/blockly/tarball/master`

   - `ZIP File`地址: `https://github.com/google/blockly/zipball/master`

   `Blockly`離線使用都是免安裝的，只需`Clone`或解壓後，進入`demos`目錄，打開`index.html`，選擇相應的選項，即可體驗。

## Blockly開發工具

`Blockly`開發工具是一個基於Web的開發工具，可自動完成`Blockly`配置過程的各個部分，包括創建自定義塊，構建工具箱和配置`Web Blockly`工作區。

使用該工具的`Blockly`開發者進程包括三個部分：

1. 使用`塊工廠`和`塊導出器`創建自定義塊。
2. 使用`Workspace Factory`構建工具箱和默認工作空間。
3. 使用`Workspace Factory`配置工作空間（當前是僅限Web的功能）。

<!-- TOC -->

- [Google Blockly](#google-blockly)
  - [Google Blockly 概述](#google-blockly-概述)
  - [什麼是Google Blockly](#什麼是google-blockly)
  - [Google Blockly 的編程環境](#google-blockly-的編程環境)
  - [Blockly開發工具](#blockly開發工具)
  - [Blockly 創建自定義塊-概述](#blockly-創建自定義塊-概述)
    - [1. 定義一個塊](#1-定義一個塊)
    - [2. 管理庫](#2-管理庫)
    - [3. 導入和導出庫](#3-導入和導出庫)
    - [4. 塊導出器](#4-塊導出器)
    - [4. 工作區工廠](#4-工作區工廠)
    - [5. 代碼生成](#5-代碼生成)
    - [6. 使用新定義的塊](#6-使用新定義的塊)
  - [Blockly 創建自定義塊-Blockly 開發者工具](#blockly-創建自定義塊-blockly-開發者工具)
    - [1. Block Factory標籤](#1-block-factory標籤)
      - [1.1 定義塊](#11-定義塊)
      - [1.2 庫管理](#12-庫管理)
      - [1.3 導入、導出庫](#13-導入導出庫)
    - [2. Block Exporter標籤](#2-block-exporter標籤)
    - [3. Workspace Factory標籤](#3-workspace-factory標籤)
      - [3.1 構建工具箱](#31-構建工具箱)
      - [3.2 無類別的工具箱](#32-無類別的工具箱)
      - [3.3 有類別的工具箱](#33-有類別的工具箱)
      - [3.4 高級塊](#34-高級塊)
      - [3.5 配置工作區（Web Blockly）](#35-配置工作區web-blockly)
      - [3.6 導出](#36-導出)
  - [Blockly - 來自Google的可視化編程工具](#blockly---來自google的可視化編程工具)
    - [1. Blockly 介紹](#1-blockly-介紹)
      - [1.1. 構建Blockly應用](#11-構建blockly應用)
      - [1.2. Blockly與其它方案的比較](#12-blockly與其它方案的比較)
    - [2. 使用Blockly](#2-使用blockly)
      - [2.1. 概述](#21-概述)
      - [2.2. 獲取源碼](#22-獲取源碼)
      - [2.3. 注入Blockly](#23-注入blockly)
      - [2.4. 配置](#24-配置)
      - [2.5. 代碼生成](#25-代碼生成)
      - [2.6. "塊"的導入、導出](#26-塊的導入導出)
      - [2.7. 雲儲存](#27-雲儲存)
  - [Blockly 的配置](#blockly-的配置)
    - [1. 固定尺寸工作區](#1-固定尺寸工作區)
      - [1.1 引入Blockly 腳本](#11-引入blockly-腳本)
      - [1.2 引入語言文件](#12-引入語言文件)
      - [1.3 確定引入位置](#13-確定引入位置)
      - [1.4 添加工具欄](#14-添加工具欄)
      - [1.5 初始化](#15-初始化)
    - [2. 可調尺寸工作區](#2-可調尺寸工作區)
      - [2.1 定義區域](#21-定義區域)
      - [2.2 注入](#22-注入)
      - [2.3 定位](#23-定位)
    - [3. 添加自定義塊（Block）](#3-添加自定義塊block)
      - [3.1 塊定義](#31-塊定義)
      - [3.2 添加工具箱引用](#32-添加工具箱引用)
      - [3.3 添加生成器函數](#33-添加生成器函數)
    - [4. 工具箱（Toolbox）配置](#4-工具箱toolbox配置)
      - [4.1 工具箱定義](#41-工具箱定義)
      - [4.2 類別](#42-類別)
      - [4.3 動態類別](#43-動態類別)
      - [4.4 類別樹](#44-類別樹)
      - [4.5 塊分組](#45-塊分組)
      - [4.6 陰影塊](#46-陰影塊)
      - [4.7 分隔器](#47-分隔器)
      - [4.8 按鈕與標籤](#48-按鈕與標籤)
      - [4.9 禁用](#49-禁用)
      - [4.10 Toolbox的修改](#410-toolbox的修改)
    - [5. 代碼生成器](#5-代碼生成器)
      - [5.1 生成代碼](#51-生成代碼)
      - [5.2 實時生成](#52-實時生成)
    - [6. 網格（Grid）](#6-網格grid)
      - [6.1 使用網格](#61-使用網格)
      - [6.2 網格配置參數](#62-網格配置參數)
    - [7. 縮放（Zoom）](#7-縮放zoom)
      - [7.1 使用縮放](#71-使用縮放)
      - [7.2 縮放配置參數](#72-縮放配置參數)
    - [8. 事件](#8-事件)
      - [8.1 事件監聽](#81-事件監聽)
      - [8.2 事件類型](#82-事件類型)
    - [9. 雲存儲](#9-雲存儲)
      - [9.1 設置應用引擎](#91-設置應用引擎)
      - [9.2 雲端通訊](#92-雲端通訊)
      - [9.3 本地存儲](#93-本地存儲)

<!-- /TOC -->


## Blockly 創建自定義塊-概述

將Blockly集成到應用中後，或多或少總是需要創建一些"塊"。本篇及其後幾篇將介紹Blockly中"塊"定義的過程，並對Web環境（Web Blockly）中"塊"定義做了些單獨說明。

![20210630163747](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630163747.png)

`Blockly` 提供了大量的預定義的"塊"，從數學函數到循環結構等各種功能塊。但功能業務功能的不同，我們還需要定義各種功能塊，以向外部應用程序提供`API`。

創建自定義塊時，最簡單的方法是找到己有的功能相似的塊，然後復制，並根據需要進行修改。

以下是定義一個塊的過程：

### 1. 定義一個塊

- Block Factory
  ![20210702112946](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702112946.png)

  定義一個塊需要使用到`Blockly`開發工具中的`塊工廠(Block Factory)`,塊工廠主要分為三個區域：

  1. 編輯區：對新增塊進行設計和編輯
  2. 預覽區：對編輯區編輯的塊進行實時預覽
  3. 代碼區：代碼區分為兩個部分`Language code`和`Generator stub`，其中`Language code`區指定和控制新增塊所呈現的形狀，`Generator stub`區負責新增塊所要生成的代碼。

  在編輯區的左側，可以看到4個基本塊，`Input`，`Field`，`Type`和`Colour`，它們是四個原料庫，使用者可以從這些庫中獲取所需要的任意“原料”，來合成自己的新塊。

  ![20210702114227](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702114227.png)

  先從最簡單的介紹，`顏色(Colour)`塊，它默認定義了九種基本顏色，直接將你想要的顏色拖到右側，拼接到對應的`colour`的凹槽，便可立即在預覽區看到新塊的顏色。

  ![20210702114306](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702114306.png)

  ![20210702115102](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702115102.png)

  如果默認色彩中沒有你想要的顏色，可以拖動任意色彩塊到編輯區拼接完成後，點擊色塊中的數字，在色塊的下方出現一個圓形的調色盤，轉動調色盤，選擇你喜歡的顏色。

  ![20210702120511](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702120511.png)

  在`Blockly`中，同一類型的塊通常採用相同的顏色，所以新塊的顏色選擇不能僅憑喜歡，還需要前後兼顧。
 一個新塊不僅需要有顏色，還需要與其他塊進行銜接，這就需要設計新增塊的輸入和輸出，它們將決定新增塊的功能、屬性和類別。

  接下來看一看輸入(Input)，這是新增塊與其他塊連接的接口之一。

  ![20210702125438](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702125438.png)

  輸入可以分為三種類型：值輸入(value input)，聲明輸入(statement input)，模擬輸入(dummy input)。首先以值輸入為例，拖動值輸入至右側與Inputs連接，可看到預覽區新增塊多了一個凹槽:

  ![20210702125558](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702125558.png)

  根據需要，使用者還可以添加多個輸入值，但要注意多個輸入值的名字不能相同，否則會出現警告，而且在後續調用的時候，也會衝突報錯，新塊名字也是如此，不能與其他塊同名，就好比如果班裡有兩個學生名字一樣，那老師點名提問的時候就有可能出現兩個同學同時起立的尷尬。

  ![20210702130751](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702130751.png)

  在值輸入中還可以添加域(field)，比如加入最簡單的文本域，即可在輸入中提示對應的文本，域中的下拉選擇框可設置文本的對齊方式。

  ![20210702131225](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702131225.png)

  這些設置完畢，選擇新塊的輸入方式，擴展式和嵌入式。

  ![20210702131728](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702131728.png)

  ![20210702131830](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702131830.png)

  有了輸入之後，別的塊就可以很容易的通過凹槽加入到新塊了，但是，這時另外一個值得考慮的問題又出現了，怎樣將新增塊加入到其他的塊之中呢？我們有五種選擇：

  - no connections 無連接
    ![20210702132149](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132149.png)

  - ← left output
    ![20210702132247](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132247.png)

  - top+bottom connection 上下+按鈕連接
    ![20210702132401](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132401.png)

  - ↑ top connection 上方連接
    ![20210702132440](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132440.png)

  - ↓ bottom connection 下方連接  
    ![20210702132514](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132514.png)

    看完值輸入之後，再一起來看一下另一個常用的輸入類型，`聲明輸入(statement input)`，它通常用作條件控制和循環控制。

    ![20210702132843](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702132843.png)

    使用值輸入和聲明輸入，可以很容易的設計出編程中常用的條件語句和循環語句：

    ![20210702133522](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702133522.png)

    ![20210702133448](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702133448.png)
    
    任務一：自己動手定義一個新塊，並描述它的功能。

    首先，創建一個"塊"，並指定其形狀、字段、和連接點。也可以使用`Blockly Developer Tools`快速實現。

- 更多關於[Blockly Developer Tools](https://itbilu.com/other/relate/r1IhFZV-X.html)
  或者，可以按參考以下API來手寫代碼：
- 更多關於[定義塊（Defining Blocks）](https://itbilu.com/other/relate/H1huYbEWQ.html#define-blocks)
  更高級的用法，可以根據用戶響應改變其形狀等：

- 更多關於[Mutators](https://itbilu.com/other/relate/H1huYbEWQ.html#define-blocks)

### 2. 管理庫

塊由其名稱引用，因此要創建的每個塊都必須具有唯一的名稱。用戶界面強制執行此操作，並在您"保存'新塊或"更新"現有塊時清除。

![20210702134225](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702134225.png)

可以在先前保存的塊之間切換，或通過單擊庫按鈕創建新的空塊。更改現有塊的名稱是快速創建具有類似定義的多個塊的另一種方法。
![20210702134435](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702134435.png)

### 3. 導入和導出庫

塊被保存到瀏覽器的本地存儲，清除瀏覽器的本地存儲將刪除您的塊。要無限期保存塊，您必須下載庫。
您的塊庫將下載為可導入的XML文件，以將您的塊庫設置為下載文件時的狀態。請注意，導入塊庫將替換當前的庫，因此您可能需要先備份導出。

導入和導出功能也是維護和共享不同組自定義塊的推薦方式
![20210702134602](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702134602.png)

### 4. 塊導出器

 如果你設計了塊，並且想要在應用程序中使用它們的時候，可以在塊導出器重完成塊定義和生成器的導出。
 存儲在塊庫中的每個塊都將顯示在塊選擇器中。單擊塊以選擇或取消選擇要導出的塊。如果要選擇庫中的所有塊，請使用“選擇”→“所有存儲在塊庫”選項。如果使用“工作區出廠”選項卡構建了工具箱或配置了工作區，則還可以通過單擊“選擇”→“在工作區工廠中使用”選擇所有使用的塊。

![20210702140320](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702140320.png)

導出設置允許您選擇要定位的生成語言，以及是否需要所選塊的定義。選擇這些文件後，點擊“導出”即可下載文件。

![20210702140504](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702140504.png)

### 4. 工作區工廠

工作區工廠可以方便地配置工具箱和工作區中的默認塊組。您可以使用"工具箱"和"工作區"按鈕在編輯工具箱和起始工作區之間切換。

![20210702140553](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702140553.png)

(1)構建工具箱  此選項卡有助於構建工具箱的XML，該材料假定使用者熟悉工具箱的功能，如果您在此處要編輯工具箱的XML時，可以通過單擊“加載到編輯”加載它。

(2)沒有類別的工具箱  如果您有幾個塊，它們沒有任何類別，想要顯示它們的時候，只需將它們拖動到工作區中，您將看到您的塊出現在工具箱的預覽中。

![20210702135642](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135642.png)

(3)有類別工具箱  如果你想要顯示塊類別，點擊“+”按鈕，並選擇下拉項目為新類別。這將向您的類別列表中添加一個類別，您可以選擇和編輯。選擇“標準類別”以添加單個標準塊類別（邏輯，循環等）或“標準工具箱”以添加所有標準塊類別。使用箭頭按鈕重新排序類別。

![20210702135701](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135701.png)

要更改所選類別名稱或顏色，請使用“編輯類別”下拉菜單。將塊拖動到工作區中將將其添加到所選類別。

![20210702135718](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135718.png)

(4)選擇工作區選項  為配置選項設置不同的值，並在預覽區域中查看結果。啟用網格或縮放會顯示更多配置選項。此外，切換到使用類別通常需要更複雜的工作空間;當您添加第一個類別時，會自動添加垃圾桶和滾動條。

![20210702135738](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135738.png)

(5)將預加載塊添加到工作區  這是可選的，但如果要在工作空間中顯示一組塊，則可能需要: a當應用程序加載時顯示
 b當觸發事件（提高級別，單擊幫助按鈕等）時顯示
 將塊拖動到編輯空間中，可以在預覽區中查看它們。您可以創建塊組，禁用塊，並在選擇某些塊時創建陰影塊。

![20210702135757](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135757.png)

(6)導出  工作區工廠提供以下導出選項：
![20210702135816](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210702135816.png)

 ◎Starter Code：生成html和javascript以注入您的自定義Blockly工作區。
 ◎工具箱生成XML以指定您的工具箱。
 ◎工作區塊生成可以加載到工作區中的XML。

(7)更多創建自定義塊的信息，可參考Google Blockly:
https://developers.google.com/blockly/guides/create-custom-blocks/overview

### 5. 代碼生成

第二步，創建代碼生成器，以將這個新塊導出為指定語言的代碼（如：`JavaScript`、`Python`、`PHP`、`Lua`、或`Dart`）：

- 更多關於[生成代碼](https://itbilu.com/other/relate/H1huYbEWQ.html#generating-gode)
  要生成簡潔又正確的代碼，就需要指定語言的操作列表順序：

- 更多關於[操作優先級](https://itbilu.com/other/relate/H1huYbEWQ.html#operator-precedence)
  創建更複雜的塊需要使用臨時變量和工具函數。當多次輸入時，可以對參數進行緩存：

- 更多關於[緩存參數](https://itbilu.com/other/relate/H1huYbEWQ.html#caching-arguments)

### 6. 使用新定義的塊

完成塊定義後，就可以將其添加到"工具箱"中或在"工作區"中使用：

- 更多關於 [Toolbox](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-toolbox)

---

## Blockly 創建自定義塊-Blockly 開發者工具


[Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html)是一個基於`Web`的開發者工具，它可以通過配置自動化的完成`Blockly`組件開發，包括創建自定義模塊、建立工具箱、並配置`Web Blockly`工作區。

使用工具的`Glockly` 開發過程分為三部分：
- 使用Block Factory 和Block Exporter創建自定義塊
- 使用Workspace Factory構建工具箱和默認工作區
- 使用Workspace Factory配置工作區（目前只有Web功能）

### 1. Block Factory標籤

`Block Factory`標籤用於在自定義塊時的[塊定義](#11-定義塊)和[代碼生成](#2-代碼生成)。你可以通過這個標籤簡單的創建、修改、和保存塊。

#### 1.1 定義塊

以下是`Blockly` 官方的推出的，詳細介紹定義塊步驟視頻的。其UI可能有些過時，但其對塊定義的描述仍然是準確的。

[YouTube原版視頻](https://www.youtube.com/watch?time_continue=112&v=s2_xaEvcVI0)
[百度雲盤下載](https://pan.baidu.com/s/1pLjvhkZ)

#### 1.2 庫管理

所定義的塊通過其名字進行引用，這就要求在創建塊時名稱必須唯一。`Blockly UI`會強制檢查，在"保存"或"更新"時，如果名稱不唯一會進行提示：

![20210630180235](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180235.png)

![20210630180250](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180250.png)

點擊`Block Library`按鈕，可以在之前保存的"塊"之間進行切換或創建新塊。修改現有塊是一種快速創建塊的方法，這樣可以快速創建多個相似的塊。
![20210630180325](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180325.png)

#### 1.3 導入、導出庫

塊會被保存在瀏覽器本地存儲中，如果清除了瀏覽器本地存儲，那麼塊也會被刪除。要將塊持久化保存，就需要將庫導出。你的`Block Library`可以做為一個XML文件被下載，而下載的文件又可以導入，以將`Block Library`設置為下載時的狀態。但需要注意，導入時當前`Block Library`會被XML文件替換。

導入和導出特性是維護和共享不同自定義塊的推薦方法。
![20210630180407](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180407.png)

### 2. Block Exporter標籤

塊設計好後，就需要導出塊定義和生成器以在應用中使用它們。這些操作可以在`Block Exporter`標籤完成。

每個保存在`Block Library`中的塊都可以在`Block Selector`中顯示出來。在"塊"上點擊可以從導出項中選擇或取消，如果全部導出可以"Select"->"All Stored In Block Library"。

構建或配置工作區，可以使用`Workspace Factory`標籤，也可以選擇要使用的塊後再"Select"->"All Used In Workspace Factory"。
![20210630180540](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180540.png)

在"導出設置"中你可以選擇要導出的語言以及是否需要選定塊的定義等。確認選擇後，點擊"Export"即可下載文件。
![20210630180615](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180615.png)

### 3. Workspace Factory標籤

`Workspace Factory`標籤可以幫助你配置工具箱和設置工作區中的默認塊。`Workspace Factory`標籤下有`Toolbox`和`Workspace`兩個按鈕：
![20210630180648](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180648.png)

#### 3.1 構建工具箱

`Toolbox`可以為工具箱構建`XML`，如果你有一個編輯的工具箱的`XML`，那麼可以通過單擊"Load to Edi"來加載它。

#### 3.2 無類別的工具箱

如果你有一些塊要顯示，但不想添加分類。你可以簡單的將其拖到工作區，然後就可以在工作區中看到了。

![20210630180737](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180737.png)

#### 3.3 有類別的工具箱

在如下所示的工作區中，如果你將"塊"分類顯示，那麼可以點擊"+"號並選擇下拉列表項。其中，"New 將添加一個類別到您的類別列表中，你可以選擇和編輯；而"Standard Category"會添加一個標準的`Blockly` 分類（如：`Logic`、`Loops`等）；"Standard Toolbox"會添加所有`Blockly`標準分類到工具箱。通過"上下箭頭"可以對分類進行排序。
![20210630180857](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180857.png)

要修改已選擇塊的名稱和顏色，可以使用"Edit Category"下拉選項。
![20210630180921](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630180921.png)

#### 3.4 高級塊

默認你可以添加任何標準塊或你庫中的塊到工具箱。如果你有在`JSON`文件中而非庫中的塊，這時可以通過"Import Custom Blocks"按鈕將其導入。

有些塊需要一起用或被包含到其它塊中，任何在編輯器中的相關鏈的塊都會做為一個分組被添加到工具箱中。選擇子塊並單擊"Make Shadow"按鈕，附加到另一個塊的塊也可以更改為陰影塊。

#### 3.5 配置工作區（Web Blockly）

要配置工作區的不同部分，則選擇 "Workspace Factory" 再選擇 "Workspace"

"選擇工作區"選項

在[配置選項](#24-配置)中添加不同的值時，可以預覽（Preview）區域中看到結果。啟用網格 [Grid](#6-網格grid)或縮放[Zoom](#7-縮放zoom)可以顯示更多配置選項；除此之外，還可以設置是否顯示垃圾桶（Trashcan）和滾動條（Scrollbars）等。
![20210630181240](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630181240.png)

**工作區添加預加載塊**

這是一個可選項，但如果你想顯示一組工作區中的塊是必要的：

- 當應用加載時
- 當事件觸發時

將塊拖拽到編輯區，就可以在工作區預覽。選擇塊後就可以創建塊分組、禁用塊、使塊做為陰影塊。
![20210630181321](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630181321.png)

#### 3.6 導出
Workspace Factory提供了以下導出選項：

![20210630181355](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630181355.png)

- Starter Code：生成啟動HTML和JavaScript注入到你所定制的工作區
- Toolbox：生成你的工具箱的XML
- Workspace Blocks：生成一個可以加載到工作區的XML


## Blockly - 來自Google的可視化編程工具

![20210630154019](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630154019.png)

### 1. Blockly 介紹

Blockly 是一個向Web或Andorid／iOS應用添加可視化代碼編輯器的庫，Blockly使用相互聯鎖的、圖形化的塊來表示代碼中的概念，如：如變量、邏輯表達式、循環等。這樣，用戶就可以應用編程原理，而不必擔心具體的語法、或命令行。

#### 1.1. 構建Blockly應用

對於用戶來說，Blockly 只是用更直觀的可視化的方式來生成代碼。而對於開發都而言，Blockly只是一個文本框，其包含了語法正確的、用戶生成的代碼。

Blockly可以將"塊"導出為代碼，其支持以下主流語言：

- JavaScript
- Python
- PHP
- Lua
- Dart

構建一個`Blockly`應用一般包括以下步驟：

1. 集成**Blockly**編輯器-最簡單的Blockly編輯器包含了一個"工具箱"來存儲的塊（block）類型，和一個用於安裝塊的“工作區”。詳細集成方法請參考[使用Blockly](https://itbilu.com/other/relate/4JL8NjUP7.html#get-started)，或官方文檔[Web](https://developers.google.com/blockly/guides/get-started/web)和[Android](https://developers.google.com/blockly/guides/get-started/android)
2. 創建應用塊-集成`Blockly`後，就需要創建一些用戶代碼塊，並將其添加到`Blockly 工具箱`。創建自定義塊參考官方文檔[Create Custom Blocks Overview](https://developers.google.com/blockly/guides/create-custom-blocks/overview)
3. 構建應用的其餘部分- Blockly只是解決一代碼生成的部分，而應用的核心是如果使用代碼，這部分還需要開發者自行實現

#### 1.2. Blockly與其它方案的比較

`Blockly` 正在被越來越多可視化編程環境所使用。使用`Blockly`做為可視化編程方案具體有以下幾點優勢：

- 代碼可導出-用戶可基於"塊"提取出通用編程語言，並可平滑過渡到基於文本的編程。
- 開源- Blockly開放所有源碼，你可以復制、修改、並將其應用到你的網站或Andorid等應用中
- 可擴展-你可以按需要調整`Blockly`，包括根據你的`API`添加新自定義"塊'、移不需要的塊和功能等。
- 高可用- Blockly不是玩具，你可以用它來實現複雜的編程任務
- 國際化- Blockly已被翻譯40+種語言

儘管有以上優勢，但`Blockly`不可能成為所有應用的解決方案。以下是一些其它可視化編程方案，可按自己需要選用：

- **Scratch Blocks**: `MIT`設計和實現的一個`Blockly`代碼庫，`Scratch Blocks`提供了一個簡化的編程模型，非常適合於初學者
- **Droplet**:支持`Pencil Code`的圖形化编程编辑器，它的顯著特點是能够夠代码轉換成塊。
- **Snap**:一個從無到有的圖形化編程語言，它不是一個庫，而是一個集成執行環境的完整應用

### 2. 使用Blockly

接下來，我們基於`HTML`和`JavaScript`，來介紹將`Blockly`做為代碼編輯器集成到`Web`應用中的過程。除`Web`應用外，`Blockly`還可以集成到`Android`或`iOS`應用中，詳細請參考官方文檔：

- [入門-Android](https://developers.google.com/blockly/guides/get-started/android)
- [入門-iOS](https://developers.google.com/blockly/guides/get-started/ios)

#### 2.1. 概述

`Blockly` 被設計的可以很容易地安裝到你的`Web`應用中。用戶可以拖動"塊"，而`Blockly`通過"塊"生成代碼，而應用無需為生成代碼做任何事情。對應用來說`Blockly` 僅是一個用戶指定類型語言（`JavaScript`, `Python`, `PHP`, `Lua`, `Dart` 或其它）的文本輸入框。

`Blockly` 是一個完全客戶端應用，它無需服務端的任何支持（除非你要使用雲存儲等服務端功能），且沒有第三方的依賴（除非你想重新編譯內核），一切都是開源的。

#### 2.2. 獲取源碼

`Blockly` 源碼託管在`GitHub`，可以通過`GitHub` 下載或在線查看源碼：

- [下載Zip包](https://github.com/google/blockly/zipball/master)
- [下載Tar包](https://github.com/google/blockly/tarball/master)
- [GitHub在線查看](https://github.com/google/blockly)
  
下載源碼並解壓後，可以在瀏覽器打開 `demos/fixed/index.html`文件，驗證`Blockly`的塊是否可以拖動等。

#### 2.3. 注入Blockly

安裝`Blockly`並驗證其可用後，就可以引入`Blockly`。如，將`Blockly`在`Web`頁面的一個固定尺寸的`div`：

- [固定尺寸的Blockly](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-fixed-size)
  更高級的用法可以讓Blockly 調整大小，以填滿頁面​​：
- [可調尺寸的Blockly](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-resizable)

#### 2.4. 配置

上面的示例的`Blockly.inject`行中，第二個參數是一個鍵/值對字典。其用於配置`Blockly`，可用的配置項有：

- `collapse`- boolean。允許"塊"折疊或展開。如果工具箱有類別，默認為`true`；其它情況為`false`
- `comments`- boolean。允許"塊"有註釋。如果工具箱有類別，默認為`true`；其它情況為`false`
- `css`- boolean。如果設置`false`，則不注入`CSS`；默認為`true`
- `disable`- boolean。使"塊"不可用。如果工具箱有類別，默認為`true`；其它情況為`false`
- `grid`- object。配置一個網格，使塊可以捕獲到。見[Grid](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-grid)
- `horizontalLayout`- boolean。設置`true`則工具箱使用水平佈局；`false`則使用垂直佈局。默認為`false`
- `maxBlocks`- number。最大可創建的"塊"數量。默認為`Infinity`
- `media`- string。`Blockly` 媒體文件目錄路徑。默認為 `"https://blockly-demo.appspot.com/static/media/"`
- `oneBasedIndex`- boolean。設置為`true`則字符串操作索引會從`1`開始；`false`則從`0`開始。默認為`true`
- `readOnly`- boolean。設置為`true`，則禁止用戶編輯。影響"工具箱"和"垃圾桶"。默認為`false`
- `rtl`- boolean。設置為`true`，則鏡像化編輯器。默認為`false`。見[RTL Demo](https://blockly-demo.appspot.com/static/demos/rtl/index.html)
- `scrollbars`- boolean。設置工作區是否可滾動。如果工具箱有類別，默認為`true`；其它情況為`false`
- `sounds`- boolean。設置為`false`，則點擊或刪除時不會播放聲音。默認為`true`
- `toolbox`- XML 節點或`string`。用戶可用"分類"和"塊"的結構樹。
- `toolboxPosition`- string。設置為`start`，則工具箱在上部（水平顯示時）或左則（垂直顯示時）或右則（垂直`LTR`顯示時）。設置為`end`，則在相對僧。默認為`start`
- `trashcan`- boolean。顯示或隱藏"垃圾桶"。如果工具箱有類別，默認為`true`；其它情況為`false`
- `zoom`- object。工作區縮放配置。見[Zoom](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-zoom)

在以上配置中，最重要的選項是`toolbox`。它是一個`XML`節點樹，用於指定工具箱中有哪些可用的"塊"、塊如何分佈、及是否有類別。

更多信息參考[工具箱配置](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-toolbox)

另外，除`Blockly` 的默認"塊"外，定義塊需要通過調用你`Web`應用的`API`來構建。

更多信息參考[創建自定義塊](https://developers.google.com/blockly/guides/create-custom-blocks/overview)

#### 2.5. 代碼生成

`Blockly` 是編程語言，也就不能"運行" `Blockly` 程序。但是你可以將`Blockly` 轉為用戶所需要的`JavaScript`、`Python`、`PHP`、`Dart`或其它語言

- 更多信息參考[代碼生成](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-code-generators)

#### 2.6. "塊"的導入、導出

如果你需要將"塊"導出，以在其它應用中使用或在以後還原。可以調用以下XML：

```xml
var xml = Blockly.Xml.workspaceToDom(workspace);
var xml_text = Blockly.Xml.domToText (xml);
```

調用後，會生成一個最小化的包含用戶"塊"的XML。如果想使導出的`XML`更可讀，那麼可以使用`Blockly.Xml.domToPrettyText`來代替上面方法。

恢復己導出的XML，像下面這樣即可：

```xml
var xml = Blockly.Xml.textToDom (xml_text);
Blockly.Xml.domToWorkspace(xml, 工作區);
```

#### 2.7. 雲儲存

`Blockly` 帶有一個可選的雲存儲功能。它允許用戶保存、加載、共享和發布程序。如果你的項目是在雲端託管，那麼你可以利用此服務的優勢。

- 更多信息參考[雲存儲](https://itbilu.com/other/relate/Ek5ePdjdX.html#configure-cloud-storage)

---

## Blockly 的配置

### 1. 固定尺寸工作區

把`Blockly`放到網頁上最簡單的方法是將其註入到一個空`div`中。

#### 1.1 引入Blockly 腳本

首先，引入Blockly 腳本及核心"塊"：

```javascript
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
```

注意：實際路徑可能與上面不同，請按`Blockly` 的實際位置調整上面路徑

#### 1.2 引入語言文件

引入包含用戶語言的消息定義（本例中使用了英語）：

`<script src="msg/js/en.js"></script>`

#### 1.3 確定引入位置

在頁面創建一個空`div`元素，並設置其尺寸：

`<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>`

#### 1.4 添加工具欄

在頁面任意位置定義好"工具欄"結構：

```xml
</xml id="toolbox" style="display: none">
  </block type="controls_if"></block>
  </block type="controls_repeat_ext"></block>
  </block type="logic_compare"></block>
  </block type="math_number"></block>
  </block type="math_arithmetic"></block>
  </block type="text"></block>
  </block type="text_print"></block>
</xml>
```

#### 1.5 初始化

最後，在頁面底部（</page>之前）創建調用腳本，完成`Blockly`的初始化：

```javascript
<script>
  var workspace = Blockly.inject('blocklyDiv',
   {toolbox: document.getElementById('toolbox')});
</script>
```

`workspace`變量當前並不會使用，但當需要保存“塊”或生成代碼時，它會變得非常重要。如果有多個Blockly 實例注入到同一個頁面時，應保存其返回的工作區保存在不同的變更中。

### 2. 可調尺寸工作區

一個好的`Web`應用將調整`Blockly` 的大小以填充屏幕的可用空間，而不是將其固定成一個尺寸。以下演示了一種創建可調尺寸的`Blockly` 的方法，這本示例中只需簡單的三步，就可以創建一個非固定尺寸的工作區：

#### 2.1 定義區域

使用`HTML`的`table`元素或`div`及`CSS`，創建一個空區域，並確保該區域有一個唯一的`ID`（本例中為blocklyArea）

一個[在線示例](https://blockly-demo.appspot.com/static/demos/resizable/index.html)，在頁底部使用table進行定義

#### 2.2 注入

與創建固定尺寸工作區一樣引入`Blockly`，添加腳本、`blocklyDiv`元素、工具欄、及初始化腳本。

#### 2.3 定位

最後一步是將`blocklyDiv`元素定位到`blocklyArea`元素上。這樣，就需要移除`blocklyDiv`元素的`height`、`width`樣式，並添加絕對定位：

`<div id="blocklyDiv" style="position: absolute"></div>`

然後用一個同樣位於`blocklyDiv`之上的`blocklyArea`取代注入腳本：

```javascript
<script>
  var blocklyArea = document.getElementById('blocklyArea');
  var blocklyDiv = document.getElementById('blocklyDiv');
  var workspace = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});
  var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);
</script>
```

### 3. 添加自定義塊（Block）

雖然 `Blockly` 已經定義了大量的標準塊，但大多數應用仍然需要定義和實現一些自己業務相關的"塊"

"塊"有三個組件構成：

- "塊"（Block）定義對象 - 定義塊的外觀和行為，包括文本、顏色、字段和連接
- 工具箱（Toolbox引用 - 工具箱XML中對塊類型的引用，這樣用戶才能將其添加到工作區中
- 生成器函数- 用於生成塊的代碼字符串。該函數總是使用`JavaScript`編寫，雖然目標語言可能不是`JavaScrpit`，基至運行環境也可能不是`Web`

#### 3.1 塊定義

`Blockly`通過頁面中腳本文件加載"塊"，在`blocks/`目錄下包含了幾個標準塊示例。如果需要創建一個新的塊，就需要創建個包含塊定義的腳本文件，並將其添加到引用頁的`<script>...</script>`標籤中。

一個塊定義類型如下：

JSON定義格式：

```json
Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};
```

JavaScript定義格式：

```javascript
Blockly.Blocks['string_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Returns number of letters in the provided text.');
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
  }
};
```

以上兩咱定義形式是等價的。其中：

- `string_length` - 所定義的"塊"的名稱。由於所有的塊會共享一個命名空間，所以可以使用使用一個類別名來區分分類（本例中是string），拉下來是塊的功能定義（本例中是length）
- `init` - 這個函數用於定義塊外觀、形狀等

上面模塊完成定義後，效果如下：

![20210630133706](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630133706.png)

更多關於塊定義，請參考：[塊自定](https://itbilu.com/other/relate/Ek5ePdjdX.html#custom-block)

#### 3.2 添加工具箱引用

完成定義後，需要使用類型名，將其添加到工具箱中：

```xml
<xml id="toolbox" style="display: none">
  <category name="Text">
    <block type="string_length"></block>
  </category>
  ...
</xml>
```

#### 3.3 添加生成器函數

最後，要將塊解析成代碼，需要定義一個與之對應的生成器函數。生成器函數由於生成語言的不同也會有所不同，標準的生成器函數格式如下：

```javascript
Blockly.JavaScript['text_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};
```

生成器函數會引用塊，以對其進行處理。其輸入（如上面的`VALUE`）的是代碼字符串，然後會將其鏈接到一個更大的表達式中。

### 4. 工具箱（Toolbox）配置

工具箱是用戶可以創建新“塊”的側邊菜單。工具箱的結構使用XML來指定，它可以一個節點樹，也可以是字符串的形式。所定義的XML會在`Blockly`注入到頁面中時傳遞給它。除了手工輸入XML外，還可以使用[Blockly Developer Tools](https://itbilu.com/other/relate/Ek5ePdjdX.html#blockly-developer-tools)來自動生成。

#### 4.1 工具箱定義

以下是一個最小化的工具箱定義示例，在示例中使用了節點定義形式：

```xml
<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_whileUntil"></block>
</xml>
<script>
  var workspace = Blockly.inject('blocklyDiv',
      {toolbox: document.getElementById('toolbox')});
</script>
```

下面定義是字符串定義形式，兩種方式是等價的：

```javascript
<script>
  var toolbox = '<xml>';
  toolbox += '  <block type="controls_if"></block>';
  toolbox += '  <block type="controls_whileUntil"></block>';
  toolbox += '</xml>';
  var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
</script>
```

兩種定義方式，都會生成如下工具箱：

![20210630134435](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630134435.png)

#### 4.2 類別

工具箱中的模塊可以類別進行組織。以下示例中，包含了`Control`和`Logic`兩個分類：

```xml
<xml id="toolbox" style="display: none">
  <category name="Control">
    <block type="controls_if"></block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
  </category>
  <category name="Logic">
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_boolean"></block>
  </category>
</xml>
```

完成定義後，其效果如下：

![20210630134911](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630134911.png)

"分類" 表示會改變`Blockly`的`UI`，以支持更大的應用。而"滾動條"的出現，就提供了一個無限大的工作空間。其它的，如："垃圾桶"、"上下文菜單"等，都可以通過**配置選項**來設置。

定義分類時，可以通過一個`colour`屬性來指定該分類的顏色。顏色使用`0~360`之間的數字表示：

```xml
<xml id="toolbox" style="display: none">
  <category name="Logic" colour="210">...</category>
  <category name="Loops" colour="120">...</category>
  <category name="Math" colour="230">...</category>
>
  <category name="Variables" colour="330" custom="VARIABLE"></category>
  <category name="Functions" colour="290" custom="PROCEDURE"></category>
</xml>
```

設置顏色後，工具欄效果如下：
![20210630135022](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630135022.png)

#### 4.3 動態類別

以下有兩個分類 `Variables`和`Functions`用於指定形為，分類裡面並沒有內容，但定義分類時添加了`custom`屬性，值可以是`VARIABLE`或`PROCEDURE`。這些分類，將使用適合的"塊"自動填充：

```xml
<category name="Variables" custom="VARIABLE"></category>
<category name="Functions" custom="PROCEDURE"></category>
```

開發者還可以使用`custom`屬性來創建動態填充彈出類別。例如，要創建一個自定義的彈出顏色塊：

- 創建自定義屬性：
  `<category name="Colours" custom="COLOUR_PALETTE"></category>`

- 定義提供給分類內容的回調。這個回調應該有一個工作區並返回一個XML塊元素數組：

  ```xml
  /**
   * Construct the blocks required by the flyout for the colours category.
   * @param {!Blockly.Workspace} workspace The workspace this flyout is for.
   * @return {!Array.<!Element>} Array of XML block elements.
   */
  myApplication.coloursFlyoutCallback = function(workspace) {
    // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
    var colourList = myApplication.getPalette();
    var xmlList = [];
    if (Blockly.Blocks['colour_picker']) {
      for (var i = 0; i < colourList.length; i++) {
        var blockText = '<xml>' +
            '<block type="colour_picker">' +
            '<field name="COLOUR">' + colourList[i] + '</field>' +
            '</block>' +
            '</xml>';
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
      }
    }
    return xmlList;
  };
  ```

- 在工作區註冊回調：
  
  ```javascript
  myWorkspace.registerToolboxCategoryCallback(
  'COLOUR_PALETTE', myApplication.coloursFlyoutCallback);
  ```

#### 4.4 類別樹

類別可以嵌套在其它類別中。如下所示，有兩個頂級類別'Core'和'Custom'，每個類別中又包含了兩個子類別：

```xml
<xml id="toolbox" style="display: none">
  <category name="Core">
    <category name="Control">
      <block type="controls_if"></block>
      <block type="controls_whileUntil"></block>
    </category>
    <category name="Logic">
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_boolean"></block>
    </category>
  </category>
  <category name="Custom">
    <block type="start"></block>
    <category name="Move">
      <block type="move_forward"></block>
      <block type="move_backward"></block>
    </category>
    <category name="Turn">
      <block type="turn_left"></block>
      <block type="turn_right"></block>
    </category>
  </category>
</xml>
```

#### 4.5 塊分組

`XML`可以包含自定義塊或塊分組。現在有以下`4`個塊：

1. 一個 `logic_boolean` 塊：
   ![20210630140300](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140300.png)

2. 一個`math_number`塊，用於修改時顯示`42`而不是`0`：
   ![20210630140334](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140334.png)

3. 一個`controls_for`塊，其中包括了 `3` 個`math_number`塊：
   ![20210630140403](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140403.png)

4. 一個`math_arithmetic`塊，其中包括了兩個math_number"陰影塊"：
   ![20210630140429](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140429.png)

以下工具欄中包括了上面4個塊：

```xml
<xml id="toolbox" style="display: none">
  <block type="logic_boolean"></block>

  <block type="math_number">
    <field name="NUM">42</field>
  </block>

  <block type="controls_for">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="BY">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>

  <block type="math_arithmetic">
    <field name="OP">ADD</field>
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
</xml>
```

這些定制塊或組的`XML`與`Blockly`的`XML`存儲格式相同。因此，為此類塊構造`XML`的最簡單方法是使用`Code application`來構建塊，然後切換到XML選項卡並複制結果。

"陰影塊"是執行幾個函數的佔位符塊，它們具有以下特徵：

- 它們表示其父塊的默認值
- 允許用戶直接輸入值，而不需要獲取一個數字或字符串塊。
- 與普通塊不同，如果用戶在其上刪除一個塊，則它們將被替換
- 它們會提示用戶期望的值類型
  
  陰影塊不能直接用Code application構造，但可以通過替換普通塊的XML中的`<block ...>`和`</block>`為`<shadow ...>`和`</shadow>`來構造。

#### 4.6 陰影塊

陰影塊是佔位符塊，它們可執行多種功能：

- 指示其父塊的默認值
- 允許用戶直接輸入值，而不需要數字或字符串塊
- 它們與常規塊不同，如果用戶在其上放置塊，則會被替換
- 它們會通知用戶預期的值類型

陰影塊無法直接使用代碼構建。但可以使用常規塊，然後將XML中的`<block ...>`和`</block>`更改為`<shadow ...>`和`</shadow>`。

#### 4.7 分隔器

添加一個`<sep></sep>`標籤到任意兩個分類之間，將會創建一個"分隔器"。
![20210630140826](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140826.png)

默認情況下，兩個相鄰塊之間的分隔間隔為`24`像素。可以通過修改sep標籤的`gap`屬性來調整距離：

```xml
<xml id="toolbox" style="display: none">
  <block type="math_number"></block>
  <sep gap="32"></sep>
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
  </block>
  <sep gap="8"></sep>
  <block type="math_arithmetic">
    <field name="OP">MINUS</field>
  </block>
</xml>
```

通過調整塊之間間隙，就可以在工具箱中創建邏輯塊組：
![20210630140859](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630140859.png)

#### 4.8 按鈕與標籤

就像"塊"一樣，你也可以將一個按鈕或標籤放在工具欄的任何位置：

```xml
<xml id="toolbox" style="display: none">
  <block type="logic_operation"></block>
  <label text="A label" web-class="myLabelStyle"></label>
  <label text="Another label"></label>
  <block type="logic_negate"></block>
  <button text="A button" callbackKey="myFirstButtonPressed"></button>
  <block type="logic_boolean"></block>
</xml>
```

![20210630141109](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141109.png)

還可以對按鈕和標籤使用CSS樣式。在上面示例中，第一個label標籤使用了自定義樣式，而button則使用了默認樣式。

按鈕需要回調一個函數，但標籤不用。設置按鈕點擊時的回調函數：

`yourWorkspace.registerButtonCallback(yourCallbackKey, yourFunction)。`

#### 4.9 禁用

工具箱中的"塊"，可以在`XML`中通過`disabled`屬性將其禁用：

```xml
<xml id="toolbox" style="display: none">
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  <block type="math_single" disabled="true"></block>
</xml>
```

禁用塊可用於限制用戶的選擇。這可以用於用戶完成某些成就後解鎖塊的場景：

![20210630141202](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141202.png)

#### 4.10 Toolbox的修改

應用可以在任何時候通過調用以下函數來修改工具箱：

`workspace.updateToolbox(newTree);`

在初始配置下，newTree可能是一個節點樹或字符串。唯一的限制就是不能修改模式，也就是說在初始工具箱中定義的類別，那麼新工具箱也必須有；同樣的，初始工具箱中沒有的類別，在新工具箱中也不能有。

別外，更新工具欄可能會導致一些較小的UI重置：

- 在一個工具箱類別，“彈出”如果當前是開啟狀態，那麼會關閉
- 在沒有類別的工具箱中，用戶更改的任何字段（如下拉列表）都將恢復到默認值
- 任何超長工具箱，如果超出了頁面，其滾動條會跳到頂端

### 5. 代碼生成器

大多數`Blockly` 應用都需要將用戶程序轉換為`JavaScript`、`Python`、`PHP`、`Lua`、`Dart`或其它語言，這一轉換過程是由`Blockly` 客戶端完成的。

#### 5.1 生成代碼

首先，引入所需生成語言的生成器。`Blockly` 中包含了以下生成器：

- javascript_compressed.js
- python_compressed.js
- php_compressed.js
- lua_compressed.js
- dart_compressed.js

生成器類需要在blockly_compressed.js之後引入。如：

```javascript
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
```

應用調用時，用戶塊可以隨時從應用中導出到代碼：

```javascript
var code = Blockly.JavaScript.workspaceToCode(workspace);
```

將以上代碼中的`JavaScript`替換為`Python`、`PHP`、`Lua`、或`Dart`就可以生成相應的代碼。

#### 5.2 實時生成

生成的操作非常快，所以頻繁調用生成函數也不會有問題。這樣就可以通過添加`Blockly` 事件監聽來實時生成代碼：

```javascript
function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('textarea').value = code;
}
workspace.addChangeListener(myUpdateFunction);
```

### 6. 網格（Grid）

#### 6.1 使用網格

`Blockly` 的主工作區可以有一個網格。而網格可以對塊進行分隔，從而實現更整潔的佈局。當工作區較大時，這會非常有用。

注入`Blockly` 時，可以在其配置選項中啟用網格：

```javascript
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
         {spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true},
     trashcan: true});
```

#### 6.2 網格配置參數

`Spacing`

網格最重要的配置項就是`spacing`，它定義了網格中點的距離。其默認值是`0`，其結果是不會有網格。以下演示了分別設置為`10､20､40`時的效果：
![20210630141714](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141714.png)

`Length`

`length`是定義網格端點形狀的數字。長度為0的結果是一個看不見的網格，長度為1（默認值）會是點，一個更長的長度會導致交叉，長度等於或大於spacing時將沒有間隔。下面是將length分別設置為1､5和20的示例：
![20210630141734](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141734.png)

`Colour`

`colour`屬性定義了網格端點的顏色，可以使用任何與`CSS`兼容的格式，如：`#f00`、`#ff0000`或`rgb(255,0,0)`，其默認值是`#888`。

以下為將`colour`分別設置為`#000`、`#ccc`和`#f00`的效果：

![20210630141835](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141835.png)

`Snap`

`snap`屬性是一個布爾值，用於設置當放置在工作空間時塊是否應該鎖定到最近的網格點。其默認值為false
![20210630141846](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630141846.png)

### 7. 縮放（Zoom）

#### 7.1 使用縮放

`Blockly` 的主工作區大小是可調的，其大小可以由用戶動態控制，或由開發者設置為靜態的。

`zoom`是`Blocly` 的初始化選項之一：

```javascript
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
     trashcan: true});
```

#### 7.2 縮放配置參數

`controls`

設置為`true`時，會顯示`zoom-centre`、`zoom-in`、and `zoom-out`三個按鈕，默認為`false`。

![20210630142026](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210630142026.png)

`wheel`

設置為`true`時允許鼠標滾輪縮放，默認為`false`

`startScale`

初始放大基數。對於多層應用來說，`startScale`會在第一層設置一個高級值，這樣在子層就可以根據這個值進行更複雜的縮放。默認為`1.0`

`maxScale`

最大可放大倍數，默認為`3`

`minScale`

最小可縮小倍數，默認為`0.3`

`scaleSpeed`

每次放大或縮小時，維放速度比。即：`scale = scaleSpeed ^ steps`。注意，縮小時使用減，而放大時使用加。默認為`1.2`

### 8. 事件

工作區上的每個更改都會觸發事件。這些事件完全描述了每次更改前後的狀態。

#### 8.1 事件監聽

工作區對象（workspace）中有addChangeListener和removeChangeListener兩個方法，可用於監聽事件流。

在以下示例中，會檢測用戶創建的第一條註釋，然後發出警報，並停止監聽，從而不進一步觸發警報：

```javascript
function onFirstComment(event) {
  if (event.type == Blockly.Events.CHANGE &&
      event.element == 'comment' &&
      !event.oldValue && event.newValue) {
    alert('Congratulations on creating your first comment!')
    workspace.removeChangeListener(onFirstComment);
  }
}
workspace.addChangeListener(onFirstComment);
```

此外，`Blockly`還提供了另一種監聽事件流的方法，可以在每個"塊'中定義一個`onchange`函數，該函數會在塊發生變化時被調用。

#### 8.2 事件類型

所有事件都具有以下共同屬性：

- type- string。Blockly.Events.CREATE、Blockly.Events.DELETE、Blockly.Events.CHANGE、Blockly.Events.MOVE、Blockly.Events.UI之一
- workspaceId- string。工作區UUID。工作區可以通過Blockly.Workspace.getById(event.workspaceId)找到
- blockId- string。塊的UUID。塊可以通過workspace.getBlockById(event.blockId)找到
- group- string。UUID 分組。有些事件是不可分割的組中的一部分。例如，在堆棧中插入語句 Blockly.Events.CREATE

`Create`事件，其有兩個附加屬性：

- xml- object。定義新塊及任何連接子塊的XML
- ids- array。包含新塊及任何連接子塊Id的數組

`Blockly.Events.DELETE`

`Delete`事件，其有兩個附加屬性：

- oldXml- object。所刪除塊及任何連接子塊的XML
- ids- array。包含所刪除塊及任何連接子塊Id的數組

`Blockly.Events.CHANGE`

`Change`事件，其有4個附加屬性：

- element- string。'field'、'comment'、'collapsed'、'disabled'、'inline'、'mutate'之一
- name- string。所更改字段的名稱
- oldValue- value。原始值
- newValue- value。修改後的值

- Blockly.Events.MOVE

`Move`事件，其有以下6個附加屬性：

- oldParentId- string。其舊父塊的UUID，當為頂級塊時為Undefined
- oldInputName- string。舊輸入值，當為頂級塊時為Undefined
- oldCoordinate- object。當為頂級塊時，則為X和Y坐標；否則為Undefined
- newParentId- string。其新父塊的UUID，當為頂級塊時為Undefined
- newInputName- string。新輸入值，當為頂級塊時為Undefined
- newCoordinate- object。當為頂級塊時，則為X和Y坐標；否則為Undefined

`Blockly.Events.UI`

`UI`事件，其有以下3個附加屬性：

- element- string。'selected'、'category'、'click'、'commentOpen'、'mutatorOpen'、'warningOpen'值之一
- oldValue- value。原始值
- newValue- value。修改後的值

### 9. 雲存儲

你的應用是託管在雲端的，那麼你可以使用Blockly 的雲存儲功能，並利用這一服務的優勢來保存、加載、分享、或發布你的程序。

#### 9.1 設置應用引擎

首先，需要將`Blockly` 發佈到應用引擎上：

1. 下載並安裝 [Python SDK](https://cloud.google.com/appengine/downloads)
2. 登錄[Google App Engine](https://appengine.google.com/)並創建應用
3. 編輯`appengine/app.yaml`，並將`blockly-demo`中的應用Id修改為上一步所創建的`Id`
4. 複製（或軟鏈接）以下文件及目錄到 `appengine/static/：`
   - demos/
   - msg/
   - media/
   - *_compressed.js

5. 可選：如果你需要在服務器上使用`blockly_uncompressed.js` ，則同樣需要將其複製到`appengine/static/`。複製`core`到`appengine/static/`，並複製`closure-library/`到上級目錄`appengine/`
6. 可選：如果需要運行`Blockly Playground`，那需要像第5步一樣，複製`blocks`、`generators`和`tests`幾個目錄到指定位置
運行`Google App Engine Launcher`，並添加你的`appengine`，然後點擊`"Deploy"`按鈕。如果習慣使用命令行，那麼執行：`appcfg.py --oauth2 update appengine/`
上傳`Blockly` 後，就可以在瀏覽器中輸入步驟2中創建的`URL`。然後就能到看到`Demo`列表，包括雲存儲Demo。

#### 9.2 雲端通訊

在雲存儲`Demo`的`demos/storage/index.html`文件中有以下特點。

首先，有一個加載雲存儲API的腳本：

`<script src="/storage.js"></script>`

請注意，該腳本假設只有頁面上只有一個Blockly 工作區。還有下面這些消息定義，應該根據你需要修改這些定義：

```javascript
BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n%1';
BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
    'Perhaps it was created with a different version of Blockly?';
```

將這些消息解析成其它語言的示例，可以參考`Blockly Games`中的[json](https://developers.google.com/blockly/guides/configure/web/cloud-storage)目錄

保存當前塊調用`BlocklyStorage.link()`即可：

```html
<button onclick="BlocklyStorage.link()">Save Blocks</button>
```

在頁面加載時重新保存，僅需在`Blockly`注入頁面，通過根據`URL`中的`Hash`調用`BlocklyStorage.retrieveXml`：

```javascript
if ('BlocklyStorage' in window && window.location.hash.length > 1) {
  BlocklyStorage.retrieveXml(window.location.hash.substring(1));
}
```

#### 9.3 本地存儲

`storage.jsAPI` 還有瀏覽器本地存儲能力。這可以用於替代云存儲，或二者結合使用。

從本地存儲中恢復塊，只需要在`Blockly`注入後超時調用

`BlocklyStorage.restoreBlocks` 即可：

```javascript
window.setTimeout(BlocklyStorage.restoreBlocks, 0);
```

在用戶離開時自動備份到本地存儲，可調用`BlocklyStorage.backupOnUnload`實現，且其可以通過監聽頁面的unload事件來自動調用：

```javascript
BlocklyStorage.backupOnUnload();
```

範例
一個雲儲存[在線範例](https://blockly-demo.appspot.com/static/demos/storage/index.html)

[九九乘法表](http://blockly-demo.appspot.com/static/apps/code/index.html#qdgjkq)
[終極密碼(猜數字遊戲)](http://blockly-demo.appspot.com/static/apps/code/index.tml#2nkrfv)
[求身體質量指數(BMI值)](http://blockly-demo.appspot.com/static/apps/code/index.html?lang=en#26t3cq)

`https://sites.google.com/site/ssblockly/01blockly/05code%E5%AF%AB%E7%A8%8B%E5%BC%8F%E6%95%99%E5%AD%B8/%E6%95%99%E5%AD%B8%E7%AF%84%E4%BE%8B`









