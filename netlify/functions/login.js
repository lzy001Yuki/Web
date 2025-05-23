exports.handler = async (event, context) => {
  // 模拟的用户数据库
  const users = [
    { username: "Yuki", password: "1111" },
    { username: "user2", password: "password2" },
  ];

  // 限制只接受 POST 请求
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 获取请求体中的用户名和密码
  const { username, password } = JSON.parse(event.body || "{}");

  // 验证用户是否存在
  const user = users.find(user => user.username === username && user.password === password);

  // 如果找到用户，则返回成功状态，否则返回未授权状态
  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "登录成功" }),
    };
  } else {
    return {
      statusCode: 401, // 未授权
      body: JSON.stringify({ success: false, error: "用户名或密码错误" }),
    };
  }
};