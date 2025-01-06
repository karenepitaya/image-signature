// 引入必要模块
const express = require('express');
const bodyParser = require('body-parser');

// 创建 Express 应用
const app = express();
const PORT = 3000; // 后端服务运行端口

// 中间件配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由配置
app.get('/', (req, res) => {
    res.send('Welcome to the Blockchain Image Signature API!');
});

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 引入路由
const imageRoutes = require('./routes/imageRoutes');
app.use('/api/images', imageRoutes);