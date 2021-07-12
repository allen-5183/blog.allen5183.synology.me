var gulp = require("gulp");
var debug = require("gulp-debug");
var cleancss = require("gulp-clean-css"); //css壓縮組件
var uglify = require("gulp-uglify"); //js壓縮組件
var htmlmin = require("gulp-htmlmin"); //html壓縮組件
var htmlclean = require("gulp-htmlclean"); //html清理組件
var imagemin = require("gulp-imagemin"); //圖片壓縮元件
var changed = require("gulp-changed"); //檔更改校驗組件
var gulpif = require("gulp-if"); //任務 説明調用組件
var plumber = require("gulp-plumber"); //容錯元件（發生錯誤不跳出任務，並報出錯誤內容）
var isScriptAll = true; //是否處理所有檔，(true|處理所有檔)(false|只處理有更改的檔)
var isDebug = true; //是否調試顯示 編譯通過的檔
var gulpBabel = require("gulp-babel");
var es2015Preset = require("babel-preset-es2015");
var del = require("del");
var Hexo = require("hexo");
var hexo = new Hexo(process.cwd(), {}); // 初始化一個hexo物件

// 清除public資料夾
gulp.task("clean", function () {
    return del(["public/**/*"]);
});

// 下面幾個跟hexo有關的操作，主要通過hexo.call()去執行，注意return
// 創建靜態頁面 （等同 hexo generate）
gulp.task("generate", function () {
    return hexo.init().then(function () {
        return hexo
            .call("generate", {
                watch: false
            })
            .then(function () {
                return hexo.exit();
            })
            .catch(function (err) {
                return hexo.exit(err);
            });
    });
});

// 啟動Hexo伺服器
gulp.task("server", function () {
    return hexo
        .init()
        .then(function () {
            return hexo.call("server", {});
        })
        .catch(function (err) {
            console.log(err);
        });
});

// 部署到伺服器
gulp.task("deploy", function () {
    return hexo.init().then(function () {
        return hexo
            .call("deploy", {
                watch: false
            })
            .then(function () {
                return hexo.exit();
            })
            .catch(function (err) {
                return hexo.exit(err);
            });
    });
});

// 壓縮public目錄下的js檔
gulp.task("compressJs", function () {
    return gulp
        .src(["./public/**/*.js", "!./public/libs/**"]) //排除的js
        .pipe(gulpif(!isScriptAll, changed("./public")))
        .pipe(gulpif(isDebug, debug({ title: "Compress JS:" })))
        .pipe(plumber())
        .pipe(
            gulpBabel({
                presets: [es2015Preset] // es5檢查機制
            })
        )
        .pipe(uglify()) //調用壓縮元件方法uglify(),對合併的檔進行壓縮
        .pipe(gulp.dest("./public")); //輸出到目標目錄
});

// 壓縮public目錄下的css檔
gulp.task("compressCss", function () {
    var option = {
        rebase: false,
        //advanced: true, //類型：Boolean 默認：true [是否開啟高級優化（合併選擇器等）]
        compatibility: "ie7", //保留ie7及以下相容寫法 類型：String 默認：''or'*' [啟用相容模式； 'ie7'：IE7相容模式，'ie8'：IE8相容模式，'*'：IE9+相容模式]
        //keepBreaks: true, //類型：Boolean 默認：false [是否保留換行]
        //keepSpecialComments: '*' //保留所有特殊首碼 當你用autoprefixer生成的流覽器首碼，如果不加這個參數，有可能將會刪除你的部分首碼
    };
    return gulp
        .src(["./public/**/*.css", "!./public/**/*.min.css"]) //排除的css
        .pipe(gulpif(!isScriptAll, changed("./public")))
        .pipe(gulpif(isDebug, debug({ title: "Compress CSS:" })))
        .pipe(plumber())
        .pipe(cleancss(option))
        .pipe(gulp.dest("./public"));
});

// 壓縮public目錄下的html檔
gulp.task("compressHtml", function () {
    var cleanOptions = {
        protect: /<\!--%fooTemplate\b.*?%-->/g, //忽略處理
        unprotect: /<script [^>]*\btype="text\/x-handlebars-template"[\s\S]+?<\/script>/gi //特殊處理
    };
    var minOption = {
        collapseWhitespace: true, //壓縮HTML
        collapseBooleanAttributes: true, //省略布林屬性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //刪除所有空格作屬性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //刪除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //刪除<style>和<link>的type="text/css"
        removeComments: true, //清除HTML注釋
        minifyJS: true, //壓縮頁面JS
        minifyCSS: true, //壓縮頁面CSS
        minifyURLs: true //替換頁面URL
    };
    return gulp
        .src("./public/**/*.html")
        .pipe(gulpif(isDebug, debug({ title: "Compress HTML:" })))
        .pipe(plumber())
        .pipe(htmlclean(cleanOptions))
        .pipe(htmlmin(minOption))
        .pipe(gulp.dest("./public"));
});

// 壓縮 public/medias 目錄內圖片
gulp.task("compressImage", function () {
    var option = {
        optimizationLevel: 5, //類型：Number 默認：3 取值範圍：0-7（優化等級）
        progressive: true, //類型：Boolean 默認：false 無失真壓縮jpg圖片
        interlaced: false, //類型：Boolean 默認：false 隔行掃描gif進行渲染
        multipass: false //類型：Boolean 默認：false 多次優化svg直到完全優化
    };
    return gulp
        .src("./public/medias/**/*.*")
        .pipe(gulpif(!isScriptAll, changed("./public/medias")))
        .pipe(gulpif(isDebug, debug({ title: "Compress Images:" })))
        .pipe(plumber())
        .pipe(imagemin(option))
        .pipe(gulp.dest("./public"));
});
// 執行順序： 清除public目錄 -> 產生原始博客內容 -> 執行壓縮混淆 -> 部署到伺服器
gulp.task(
    "build",
    gulp.series(
        "clean",
        "generate",
        "compressHtml",
        "compressCss",
        "compressJs",
        "compressImage",
        gulp.parallel("deploy")
    )
);

// 默認任務
gulp.task(
    "default",
    gulp.series(
        "clean",
        "generate",
        gulp.parallel("compressHtml", "compressCss", "compressJs","compressImage")
    )
);
//Gulp4最大的一個改變就是gulp.task函數現在只支援兩個參數，分別是任務名和運行任務的函數

