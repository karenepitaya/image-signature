// 引入必要模块
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // 引入 path 模块来处理文件路径
const cors = require('cors'); // 引入 cors 模块来处理跨域请求

// 创建 Express 应用
const app = express();
const PORT = 3000; // 后端服务运行端口

// 中间件配置
app.use(cors());  // 允许跨域访问
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 引入路由
const imageRoutes = require('./routes/imageRoutes');
app.use('/api', imageRoutes); // 将路由挂载到 /api 路径下

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});