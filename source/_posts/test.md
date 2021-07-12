https://blog.csdn.net/xiatiancc/article/details/82585649

## Blockly Developer Tools 使用

[Workspace Factory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html)

![20210701163242](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701163242.png)

### 1. 介紹：

1. 定義 Toolbox
   當選項卡選中`Toolbox`時，可以通過中部的 "+" 和 "-"，添加或刪除`Toolbox`中的類或塊。
   ![20210701180234](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701180234.png)

   添加的塊用四種模式，可以都試一下
   - `New Category`，輸入新類名，新建全新的類(test)；
     ![20210701180709](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701180709.png)

     ![20210701180803](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701180803.png)

   - `Standard Category`，輸入標準類的類名，將直接添加整個類；
      ![20210701181200](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701181200.png)

      ![20210701181310](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701181310.png)

    - `Separator`，在類與類之間，新建一個分界線；
      ![20210701181529](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701181529.png)

      可使用上下箭頭來調整分界線位置。
      ![20210701181715](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701181715.png)

    - `Standard Toolbox`，添加完整的`Toolbox`到工作區；
      ![20210701181857](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701181857.png)

      ![20210701182503](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701182503.png)

      ![20210701182706](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701182706.png)

2. Workspace(工作區)
   `Workspace` 的作用就是：將塊拖放到工作區中，以便在定制工作區中預加載它們。

   像`Plane`遊戲中的`seat`塊一樣，而且可以通過中部的選項，定義工作區的樣式，是否添加`Zoom`，是否添加`Grid`，是否添加`Scrollbars`等。
   ![20210701184556](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701184556.png)
 
3. 導出文件
   我們選擇 "All"，一共導出三個文件"toolbox.xml"，"workspace.xml"，"workspace.js"

   ![20210701184712](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701184712.png)

4. 範例

   4.1 超精簡 Blocly
    
   - 建立資料夾 `sample1`，於 `sample1` 資料夾下，新建 html 文件，內容如下:

     `index.html`

     ```html
     <!DOCTYPE>
     <html>
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <title>Simple</title>
 
       <script src="blockly_compressed.js"></script>
       <script src="blocks_compressed.js"></script>
       <script src="messages.js"></script>
     </head>
     <body>

     </body>
     </html>
     ```

   - 於 `index.html`，<body> 內，加入以下程式碼:
     
     ```html
     <div id="blocklyDiv"></div>
     
     <xml id="toolbox" style="display: none">
       <block type="controls_if"></block>
       <block type="controls_whileUntil"></block>
     </xml>

     <script>
        var workspace = Blockly.inject('blocklyDiv',  {toolbox: document.getElementById('toolbox')});
     </script>
     ```

   - 複製 `blockly` 資料夾中的 `blockly_compressed.js`，
     `blocks_compressed.js`，`messages.js`，放到 `sample1` 資料夾下，用瀏覽器打開 `html` 文件。


   4.2 較完整的 Blocly
       Workspace Factory` 來定義 `Blockly` 
   - (1) 定義 `Toolbox`
         ![20210701203954](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701203954.png)

         ![20210701204125](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701204125.png)

         ![20210701204241](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701204241.png)

         ![20210701204331](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701204331.png)

   - (2) 定義 `Workspace`  
         ![20210701204524](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701204524.png)      

         當選項卡選中`Workspace`時，介面看似和`Toolbox`沒什麼區別，不過這裡從左側`Toolbox`中拖拽到工作區的代碼塊，都將預設顯示在你的工作區，像`Plane`遊戲中的`seat`塊一樣，而且可以通過中部的選項，定義工作區的樣式，是否添加`Zoom`，是否添加`Grid`，是否添加`Scrollbars`等。

   - (3) 導出文件
         ![20210701205123](https://cdn.jsdelivr.net/gh/allen-5183/blog.allen5183.synology.me/images/20210701205123.png)

   - (4) 新建 html
         建立資料夾 `sample2`，於 `sample2` 資料夾下，新建 html 文件，內容如下:

     `index.html`

     ```html
     <!DOCTYPE>
     <html>
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <title>Simple2</title>

     </head>
     <body>

     </body>
     </html>
     ```

   - (5) 複製 `workspace.xml` 的內容，到 body 中

     ```xml 
     <xml xmlns="https://developers.google.com/blockly/xml" id="workspaceBlocks" style="display: none"></xml>
     ```

   - (6) 複製 `toolbox.xml` 的內容，到 body 中
   - (7) 將 `workspace.js` 的文件複製到 `sample2` 資料夾下，並修改其內容如下:
         
     ```xml
     --------修改前--------
     /* Inject your workspace */ 
     var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, options);
     --------修改為--------
     /* Inject your workspace */ 
     var workspace = Blockly.inject("blocklyDiv", options);
     ```

   - (8) 修改完成之後，在body底部添加：

     `<script src="workspace.js"></script>`
     





   4.2 在頁面正文中的某個位置添加一個空`div`並設置其大小（放在<body>***** <\body>中）：
   
   ```html
   <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
   ```
   
   4.3 將`workspace.xml`代碼，將其複制添加到`body`中
   4.4 `toolbox.xml`代碼，將其複制添加到`body`中
   4.5 修改`workspace.js`文件
       將
       ```xml
       var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, options);
       ```

       修改成
       ```xml
       var workspace = Blockly.inject("blocklyDiv", options);;
       ```

       修改完成後；將代碼引入到`test2.html`文件中`<body>`底部添加。
       
       ```javascript
       <script src="workspace.js"></script>
       ````

       以上整個操作完成。運行 `test2.html`



 完整代碼：

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Simple</title>
 
 <script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="en.js"></script>
 
</head>
 
<body>
 
<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none"></xml>
 
 <div id="blocklyDiv" style="height: 880px; width: 1200px;"></div>
 
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="test"></category>
  <category name="Math" colour="#5C68A6">
    <block type="math_round">
      <field name="OP">ROUND</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
    <block type="math_single">
      <field name="OP">ROOT</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <block type="math_trig">
      <field name="OP">SIN</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant">
      <field name="CONSTANT">PI</field>
    </block>
    <block type="math_number_property">
      <mutation divisor_input="false"></mutation>
      <field name="PROPERTY">EVEN</field>
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
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
    <block type="math_on_list">
      <mutation op="SUM"></mutation>
      <field name="OP">SUM</field>
    </block>
    <block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_float"></block>
  </category>
  <sep></sep>
  <category name="Text" colour="#5CA68D">
    <block type="text_charAt">
      <mutation at="true"></mutation>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="Ie*|Br(r):@%OQ4|%qp]" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="text_append">
      <field name="VAR" id="L`D:ghw+!B3-uD%#x?Ft" variabletype="">item</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="Ie*|Br(r):@%OQ4|%qp]" variabletype="">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_getSubstring">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR" id="Ie*|Br(r):@%OQ4|%qp]" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <mutation type="TEXT"></mutation>
      <field name="TYPE">TEXT</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
</xml>
  <category name="test">
    <block type="controls_if">
      <next>
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
      </next>
    </block>
  </category>
  <category name="Logic" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>
  <category name="Loops" colour="#5CA65C">
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="controls_whileUntil">
      <field name="MODE">WHILE</field>
    </block>
    <block type="controls_for">
      <field name="VAR" id="cV8(8gw)4+2F=@{-oa%U" variabletype="">i</field>
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      <value name="BY">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="controls_forEach">
      <field name="VAR" id="49TAe6j@7~K]V3lvrC!i" variabletype="">j</field>
    </block>
    <block type="controls_flow_statements">
      <field name="FLOW">BREAK</field>
    </block>
  </category>
  <category name="Math" colour="#5C68A6">
    <block type="math_round">
      <field name="OP">ROUND</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
    <block type="math_single">
      <field name="OP">ROOT</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <block type="math_trig">
      <field name="OP">SIN</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant">
      <field name="CONSTANT">PI</field>
    </block>
    <block type="math_number_property">
      <mutation divisor_input="false"></mutation>
      <field name="PROPERTY">EVEN</field>
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
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
    <block type="math_on_list">
      <mutation op="SUM"></mutation>
      <field name="OP">SUM</field>
    </block>
    <block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_float"></block>
  </category>
  <category name="Text" colour="#5CA68D">
    <block type="text_charAt">
      <mutation at="true"></mutation>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="B0!JU8*uGn](FPPot0b8" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="text_append">
      <field name="VAR" id="-*Z%h!C8]8?:CrB^l[Sb" variabletype="">item</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="B0!JU8*uGn](FPPot0b8" variabletype="">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_getSubstring">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR" id="B0!JU8*uGn](FPPot0b8" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <mutation type="TEXT"></mutation>
      <field name="TYPE">TEXT</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="Lists" colour="#745CA6">
    <block type="lists_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="Jk,w-5|uh#:o4}s(K7F*" variabletype="">list</field>
        </block>
      </value>
    </block>
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_repeat">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_create_with">
      <mutation items="3"></mutation>
    </block>
    <block type="lists_getIndex">
      <mutation statement="false" at="true"></mutation>
      <field name="MODE">GET</field>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="Jk,w-5|uh#:o4}s(K7F*" variabletype="">list</field>
        </block>
      </value>
    </block>
    <block type="lists_setIndex">
      <mutation at="true"></mutation>
      <field name="MODE">SET</field>
      <field name="WHERE">FROM_START</field>
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR" id="Jk,w-5|uh#:o4}s(K7F*" variabletype="">list</field>
        </block>
      </value>
    </block>
    <block type="lists_getSublist">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR" id="Jk,w-5|uh#:o4}s(K7F*" variabletype="">list</field>
        </block>
      </value>
    </block>
    <block type="lists_split">
      <mutation mode="SPLIT"></mutation>
      <field name="MODE">SPLIT</field>
      <value name="DELIM">
        <shadow type="text">
          <field name="TEXT">,</field>
        </shadow>
      </value>
    </block>
    <block type="lists_sort">
      <field name="TYPE">NUMERIC</field>
      <field name="DIRECTION">1</field>
    </block>
  </category>
  <category name="Colour" colour="#A6745C">
    <block type="colour_picker">
      <field name="COLOUR">#ff0000</field>
    </block>
    <block type="colour_random"></block>
    <block type="colour_rgb">
      <value name="RED">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
      <value name="GREEN">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="BLUE">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="colour_blend">
      <value name="COLOUR1">
        <shadow type="colour_picker">
          <field name="COLOUR">#ff0000</field>
        </shadow>
      </value>
      <value name="COLOUR2">
        <shadow type="colour_picker">
          <field name="COLOUR">#3333ff</field>
        </shadow>
      </value>
      <value name="RATIO">
        <shadow type="math_number">
          <field name="NUM">0.5</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
  <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
</xml>
 
 
<script src="workspace.js"></script>
  
</body>
</html>

以上部分內容引用https://www.jianshu.com/p/ed74f318ffc1

/************************************************* ************************************************** **********************************/

如果只想顯示blockly控件，如下面web顯示：



 操作：

（1）在wrokspace上面放置模塊想要放置的模塊

（2）點擊read only選項

（3）如果prewivw框中沒有顯示，點擊



 其中，代碼區別在workspace.js文件中。



新生成的workspace.js文件

/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");
 
var options = { 
	readOnly : true, 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true
};
 
/* Inject your workspace */ 
var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, options);
 
/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */
 
/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 
 
/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
 
————————————————
版权声明：本文为CSDN博主「xiatiancc」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xiatiancc/article/details/82585649
