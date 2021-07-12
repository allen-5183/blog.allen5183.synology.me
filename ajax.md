
#

## Ajax 的基礎

- AJAX 是「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術）的縮寫，簡單說就是網頁不用重新整理，就能即時地透過瀏覽器去跟伺服器溝通，撈出資料。
- Ajax 可以讓 Web 應用程式如同 Windows 應用程式一般，在瀏覽器建立快速、更佳和容易使用的操作介面。
- Ajax 是由 **Jesse James Garrett** 最早提出的名稱，事實上， Ajax 並不是全新的網頁技術，它是以一種新方法來整合現存的多種網頁技術，被大量使用在 Google 網頁設計，例如： Gmail、 Google Suggest 和 Google Maps。
- Ajax 技術是使用非同步 HTTP 請求，在瀏覽器和 Web 伺服器之間傳遞一般文字、 HTML 、 XML 或 JSON 等資料，當與使用者互動後， Ajax 技術可以只更新部分網頁內容，而不用重
新載入整頁網頁。例如：在 YouTube 首頁搜尋影片，如下圖所示：

  <img src="http://blog-images.allen5183.synology.me/Ajax.png" width=50% height=50% class="nofancybox" />

## 非同步 HTTP 請求

- Ajax 技術的核心是非同步 HTTP 請求（ Asynchronous HTTP Requests ），此種 HTTP 請求可以不用等待伺服端回應，即可讓使用者執行其他互動操作，例如：更改購物車的購買商品數量後，不需等待重新載入整個網頁，或自行按下按鈕來更新網頁，就可以接著輸入送貨的相關資訊。

- 簡單的說，非同步 HTTP 請求可以讓網頁使用介面，不會因為 HTTP 請求的等待回應而中斷，因為同步 HTTP 請求需要重新載入整頁網頁內容，如果網路稍慢，可能看見空白頁和網頁逐漸載入的過程，這是和 Windows 應用程式使用者介面之間的最大差異。

- 傳統 HTTP 請求的過程是同步 HTTP 請求（Synchronous HTTP Requests ），當使用者在瀏覽器網址欄輸入 URL 網址後，按 【 移至 】 鈕，就可以將 HTTP 請求送至 Web 伺服器，在處理後，將請求結果的 HTML 網頁傳回瀏覽器來顯示，如下圖所示：

   <img src="http://blog-images.allen5183.synology.me/ajax2.jpg" width=50% height=50% class="nofancybox" />
  
## Ajax 應用程式架構
Ajax 應用程式架構的最大差異是在客戶端，使用JavaScript 的 Ajax 引擎來處理 HTTP 請求，和取得伺
服端回應的文字、 HTML 、 XML 或 JSON 資料（由伺服端網頁技術來產生），如下圖所示：
