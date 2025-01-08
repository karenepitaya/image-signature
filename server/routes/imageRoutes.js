const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const imageCache = new Map();  // 定义一个全局缓存区，存储图片哈希值和路径

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

    // 获取上传图片的路径
    const filePath = path.join(__dirname, '../../', req.file.path);
    const fileBuffer = fs.readFileSync(filePath);
    // 计算图片哈希值（SHA-256）
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // 将哈希值和路径存储到缓存区
    imageCache.set(hash, filePath);

    res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        hash: hash, // 返回图片哈希值
    });
});


// TODO待修改成区块链签名
router.post('/sign', (req, res) => {
    const { hash, publicKey, privateKey, passphrase } = req.body; // 从请求体中获取哈希值
   
    // 检查哈希值和密钥对是否提供
    if (!hash || !publicKey || !privateKey) {
        return res.status(400).json({ error: 'Hash, public key, and privateKey are required' });
    }

    // 检查哈希值是否存在于缓存中
    if (!imageCache.has(hash)) {
        return res.status(400).json({ error: 'Hash not found in cache'});
    }

    try {
        // 使用私钥对哈希值进行签名
        const signature = signHash(hash, privateKey, passphrase);

        // TODO>将签名存储到区块链（可以选择存储更多信息）

        res.json({
            message: 'Signature generated successfully',
            hash: hash,
            signature: signature,
            publicKey: publicKey,
        });
    } catch (err) {
        console.error('Error during signing:', err);
        res.status(500).json({ error: 'signed successfully, but something went worong' });
    }
});

module.exports = router;