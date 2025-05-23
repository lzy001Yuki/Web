const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 模拟一个静态用户数据
const users = [
  { username: "Yuki", password: "1111" },
  { username: "user2", password: "password2" },
];

// 首页重定向到登录页面
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// 登录接口
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.redirect("/score.html");
  } else {
    res.send("<h1>登录失败，用户名或密码错误！<a href='/index.html'>重新登录</a></h1>");
  }
});

// 忘记密码/注册接口可扩展
// ...

// 启动服务器
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});