const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

// 配置 multer 用于文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 上传的图片将存储在 uploads 文件夹
    },
    filename: (req, file, cb) => {
        // 使用时间戳 + 原文件名，避免文件重名
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

// 上传图片的路由
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // 计算图片哈希值（SHA-256）
    const filePath = path.join(__dirname, '../../', req.file.path);
    const fileBuffer = require('fs').readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        hash: hash, // 返回图片哈希值
    });
});

module.exports = router;