# 
## 專案功能
* 使用者本地登入、註冊功能
* 使用者第三方號登入、註冊功能
* 查看所有已儲存的支出紀錄
* 查看所有支出項目的總額
* 個別查看各個項目的支出明細
* 新增、修改、刪除一筆支出紀錄


## 開始使用
1.確認已安裝Node.js  
2.將本專案clone進本地端
```js
git clone https://github.com/Berutorion/alphacamp-practicce.git
```
3.安裝套件 package.json 中的相依套件
```js
npm install
```
4.建立.env檔，設定環境變數，具體變數請查看.env.example

5.建立種子資料
```js
npm run seed
```
當出現以下訊息表示建立成功:
```js
種子資料已建立完成
種子資料已建立完成
```
6.執行程式
```js
npm run start
```
7.當cmd出現以下這行表示啟動成功
```js
Express server is working on http://localhost:3000/
```
8.接著在瀏覽器輸入
```js
http://localhost:3000/
```
種子資料的帳號為:
```bash
email : user@example
password : 123456
```
## 開發環境
 * [express](https://www.npmjs.com/package/express): 4.18.1
 * [express-handlebars](https://www.npmjs.com/package/express-handlebars): 6.0.6  
 * [Node.js](https://nodejs.org/zh-tw/download/) : 16.15.0
 * express-session: 1.17.3
 * dotenv : 16.0.1
 * method-override : 3.0.0
 * mongoose : 6.5.4
 * bcryptjs : 2.4.3
 * connect-flash : 0.1.1
 * passport : 0.6.0
 * passport-facebook : 3.0.0
 * passport-local : 1.0.0
