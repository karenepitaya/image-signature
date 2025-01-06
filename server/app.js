// 引入必要模块
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // 引入 path 模块来处理文件路径

// 创建 Express 应用
const app = express();
const PORT = 3000; // 后端服务运行端口

// 中间件配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由配置
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../client/public/index.html'));
});

// 引入路由
const imageRoutes = require('./routes/imageRoutes');
app.use('/api/images', imageRoutes);

// 提供前端静态资源
app.use(express.static(path.join(__dirname, '../client/public'))); // 假设前端文件放在 client/public 目录下

// 启动服务
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});