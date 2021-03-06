[![Stories in Ready](https://badge.waffle.io/lauraluo/reactMockjs.png?label=ready&title=Ready)](https://waffle.io/lauraluo/reactMockjs)
# 前端開發環境說明

## 目的

讓前端可以在開發期間獨立後端進行組件的開發及維護，使用react、scss、jade  

## 功能簡介


*   伺服器： [node Express ](http://expressjs.com/zh-tw/)  
*   Javascript Lint： [eslint](http://eslint.org/)  
*   Javascript Bundle：[browserify](http://browserify.org/)、[watchify](https://github.com/substack/watchify)、[babelify](https://github.com/babel/babelify)  
*   單元測試工具： [jest](https://facebook.github.io/jest/)、[enzyme](https://github.com/airbnb/enzyme)、  
*   ES6兼容：[babel](https://babeljs.io/) (es2015、[transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/))  
*   即改即看結果：[livereload](http://livereload.com/)  
*   組件展示：[storybook](https://github.com/storybooks/react-storybook)  
*   前端自動化工具：[gulp](http://gulpjs.com/)  


## 環境準備

安裝node v7.7.3以上  

```
到 [官網](https://nodejs.org/en/)下載安裝包，並安裝
```

使用npm全域安裝gulp  

```
npm install -g gulp
```

使用npm全域安裝 storybook  

    npm install -g getstorybook

安裝react單元測試工具  

```
npm install -g jest-cli
```

安裝所有專案需要的nodel module包：請先移動到專案目錄底下，並且在終端機輸入以下指令

```
npm isntall
```

安裝chrome extenstion livereload外掛  

![](https://quip.com/blob/ORVAAAN6LpO/Vpbi6vt1sh40SelOXFrXJQ?a=VIBTnICsKW9ungi3TLvC3VmgkdGGrYGnyEKVQH6FfyQa)

```
到chrome extension中心 ( [連結](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=zh-TW) )下載擴充
```

### 測試環境是否成功安裝

請在終端機輸入以下命令  

```
gulp develop
```

如果環境正確運作的話，你可以在[http://localhost:3002](http://localhost:3002) 看到你的首頁


## 開發環境介紹

### scss


*   原始檔在`./src/scss`目錄底下  
*   編譯過的css檔案在`./public/css/`底下  


### javascript(jsx)

新增一個React組件：創健一個`DemoComponent.jsx`，並放置在`src/components/demo/`目錄底下  

```js
import React, {Component} from 'react'
//引用node module裡的react，並使用變數"React"代表

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <p>this is demo</p>
            </div>
        );
    }
}
export default DemoComponent;

```


*  組件(component)檔名一律大寫駝峰
*  使用es6的[module system](https://wohugb.gitbooks.io/ecmascript-6/content/docs/class.html)


引用一個React組件，並在網頁上安裝這個組件：新增一個`demo.jsx`檔，放置在`./src`目錄底下  

```js
import DemoComponent from './components/demo/TestComponent';  
import ReactDOM from 'react-dom';  
import React from 'react';  

ReactDOM.render(  
    <DemoComponent/>,  
    document.getElementById('demo')  
)  
```

* 一個頁面通常只會有一隻初始化用的jsx檔，其他都是被引用的module。  
* 同時它也會是javascript bundle的入口，預設都在`/src`，第一層目錄底下。  
* bundle工具會無視第二層目錄底下的其他js或是jsx檔。
* bundle完的檔案，會在`public/js`目錄底下，繼承檔名並且加上後綴：*.bundle.js


> 有關於es5與es6之間，react的語法差異可以參考[這篇文章](http://blog.techbridge.cc/2016/04/04/react-react-native-es5-es6-cheat-sheet)

### 使用node(express)新增一個網站頁面

首先，新增一個`index.jade`檔, 並放置在`views/demo`目錄底下  

```jade
//宣告layout  
extends ../_layout  
//在此設定必需要在，頁面載入前引用的javascript(不含共用)  
block headScripts  
    //script(src="js/test.bundle.js")  

block styles  
    //在此設定必需要在此頁引用的樣式(不含共用)  
    //link(rel="stylesheet", href="/css/test.css")  

block content  
    h1 This is Demo  
    div#demo  

block scripts  
    //在此設定必需要在，頁面載入後引用的javascript(不含共用)  
    //script(src="js/demo.bundle.js")
```


*   引入的其他資源(腳本/樣式/圖檔)路徑階相對於`public`目錄底下  
*   可以利用資料夾組織及管理你的頁面  
*   可以在該視圖上載入所需腳本及樣式檔：  
*   `block headScripts`：必需要在頁面載入前引用的javascript(不含共用)  
*   `block styles`：必需要在此頁引用的樣式(不含共用)  
*   `block content`：jade (html)文本  
*   `block scripts`：頁面載入後(body結尾前)引用的javascript(不含共用)  


在專案根目錄底打開`server.js`，在檔案中增加下列程式碼片段  

```js
app.get('/demo', function(req, res) {  
    //利用res物件指定回傳視圖的路徑(相對於專案根目錄)  
    res.render('demo/index.jade');  
});
```

在沒有指定檔名的狀況，預設會讀取指定目錄底下的index.jade檔，因此我們可以省略如下：  

```js
//與上一段程式碼，會獲得一樣的結果。  
app.get('/demo', function(req, res) {  
    res.render('demo');  
});
```
*   req：請求物件  
*   res：回饋物件，可以在這裡指定回傳的視圖，以及資料  


最後你應該能在 [http://localhost:3002/demo](http://localhost:3002/demo)  看見你的網頁  

> 這裡在node express稱之為新增一個router，雷同於.net MVC在controller底下新增一個action


### 使用Mock.js生成隨機數據，攔載ajax

原理/思路：在開發過程中為了保持功能模組的純淨，將假資料的邏輯跟相關程式碼，集中放置在`McokComponent.jsx`，開發者可以依開發需求客制化這個組件，並且利用[HOC](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)的方式裝飾你的組件。

再說明實例之前，讓我們先了解一些需要知道的基本知識：

* React的裝飾者模式：React Higher Order Components(hoc)參考[React Higher Order Components in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)
* 工具Mock.js的詳細介紹：參考[官方文件](http://mockjs.com/)


使用方式如下

```js
import RootComponent from './components/index/RootComponent';
import MockProvider from './components/index/MockProvider'
import ReactDOM from 'react-dom';
import React from 'react';

//將模組與假資料連結在一起
var Index = MockProvider(RootComponent);

ReactDOM.render(
	<Index/>,
	document.getElementById('index')
)
```

明白使用邏輯後，讓我們看看`MockProvider`的程式碼長什麼樣子

```js
import React from 'react'
import Mock from 'mockjs'

function AttachedToMock(WrappedComponent, configs) {
    class MockComponent extends React.Component {
        constructor(props) {
            super(props);
            //宣告假資料的長相
            this.mockTemplate = {
                'list|1-10': [
                    {
                        'id|+1': 1,
                        'email': '@EMAIL'
                    }
                ]
            };
            //利用mock產生初始化資料
            this.state = {initData: Mock.mock(this.mockTemplate)};
        }

        componentWillMount = () => {
            //欄截所有對*.json發送的ajax,並回傳設計好的資料結構
            Mock.mock(/\.json/, this.mockTemplate);
            Mock.setup({timeout: '200-600'});
            
        }

        render() {
            return <WrappedComponent  initData={this.state.initData} {...this.props}/>
        }
    }

    return MockComponent;
}

export default AttachedToMock;
```
* 正式發佈程式時，所有import * from  `*/MockProvider` 相關的路徑，都會被替換為`src/components/core/ReplaceMockProvider`，以防開發者在發佈程式的過程中，不小心打包到含有假資料的程式碼。
* 你可以在[http://localhost:3002](http://localhost:3002),看見結果

### 啟用livereload功能

要使用livereload請安裝對應的瀏覽器外掛，需手動啟用(預設狀況為不開啟)。啟用方式以Chrome為例：點擊右上方Icon，當Icon中間的圓點為實心的灰色，代表功能正常啟用。 

![](https://quip.com/blob/ORVAAAN6LpO/-KT4YPoyFBB0woOLvMusKA?a=8GJJNKVS6af7aLtaMJJ9J3EeYL2r0xZtiyUuSMVHVDAa)

### 撰寫單元測試

在`src/components/demo`目錄底下，新增一個`DemoComponent.spec.jsx`檔案，並加入以下程式碼。  

```js
import React from 'react'  
import { expect } from 'chai'; //引用斷言庫 
import {mount, render, shallow} from 'enzyme'  
import DemoComponent from "./DemoComponent"  

describe('DemoComponent: ', () => {  

    const wrapper = mount(<DemoComponent/>);  

    it('應該要顯示文字，"this is demo"', () => {  
        expect(wrapper.text()).to.contain('this is demo');  
    })  
});

```
打開終端機，進入專案目錄，輸入以下指令，運行測試結果  
```
jest src/components/demo/DemoComponent.spec.jsx
```

測試結果如下

![](https://quip.com/blob/ORVAAAN6LpO/zNCcAzd-vbkqZBqCSbyoww?a=qj739YiKZ0CPYASHX9vRlOh2XkKagIa3TmCYUt8YAN0a)

## 運行開發環境

### 使用vscode

打開偵錯頁籤 > 選擇`開發模式`  > 按下綠色箭頭運行  

![](https://quip.com/blob/ORVAAAN6LpO/u0UMNPEi4xyFYp1VUHDGUA?a=GafA5Nm7WFBclBxj4w7NsJB1RHoe70pMMSGyeSpsYhAa)

> 障礙排除：使用vscode時，有時無法正常停止運行，請參考[這篇作法](http://stackoverflow.com/questions/28564077/grunt-task-freeing-up-the-port)，移除被佔用的port

### 使用終端機指令

在vscode界面上按下快速鍵，`cmd+shift+M`，打開終端機輸入命令字元  

```
gulp develop
```

## 發佈程式碼

由於本環境僅用作前端人員獨立的開發環境，發佈模式的目的在於：將javascript進行壓縮，其它與開發模式並無差異。  

### 使用vscode

打開偵錯頁籤 > 選擇`發佈模式`  > 按下綠色箭頭運行  

![](https://quip.com/blob/ORVAAAN6LpO/1fdcqZreNn_qfOHkW5y5jA?a=aa1fhIGZnMKIihwSnrDdNX7XB6Z5oWvdmBaZx2ia8Msa)

### 使用終端機機指令

在vscode界面上按下快速鍵 `cmd+shift+M`，打開終端機輸入命令字元  

```
gulp deploy
```

> 如何將程式同步到正式環境，請參考[這一篇文章(待補)](http://google.com.tw)

## 運行測試任務

在vscode界面上按下快速鍵 `cmd+shift+M`，打開終端機輸入命令字元  

### 批次測試

```
npm test
```

### 指定單一測試任務

```
jest path/to/my-test.jsx
```

> 關於測試的寫作技巧，請參考[這一篇文章(待補)](http://google.com.tw)

## 運行Storybook(組件展示)

```
npm run storybook
```

## 其他

### 專案結構及檔案說明

請參考專案底下的`fileStructure.txt`  

```js
├── README.md  
├── config //node config  
├── fileStructure.txt //檔案結構說明  
├── gulpfile.js  
├── package.json  //node專案檔
├── public //編譯完的程式碼，除了圖檔images外，開發者應該不會需要編輯
|  ├── css   
|  ├── images //圖檔  
|  └── js //javascript bundle的結果，*.bundle.js
├── server.js  //node express
├── src //原始程式碼(src底下的第一層jsx為程式打包的入口)  
|  ├── components //react組件  
|  ├── demo.jsx //bundle入口  
|  ├── index.jsx //bundle入口     
|  └── scss //樣式檔目錄  
├── stories //模組展式
├── views //視圖  
├── wdio.conf.js  
└── yarn.lock
```

### 專案相關網址

*   開發環境  [http://localhost:3002](http://localhost:3002/)  
*   storybook [http://localhost:6006](http://localhost:6006/)  


### 推荐VSCode擴充功能

待補
