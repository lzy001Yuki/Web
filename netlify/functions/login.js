exports.handler = async (event, context) => {
  // 模拟一个静态用户数据库
  const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  // 仅允许 POST 请求
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 解析请求体
  const { username, password } = JSON.parse(event.body);

  // 验证用户
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "登录成功", user }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "用户名或密码错误" }),
    };
  }
};