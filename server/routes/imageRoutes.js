const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const Blockchain = require('../utils/blockchain');  // 引入区块链模拟类
const { error, timeStamp } = require('console');

const blockchain = new Blockchain();  // 创建一个新的区块链实例
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

router.post('/sign', (req, res) => {
    const { hash, publicKey } = req.body; // 从请求体中获取哈希值
   
    // 检查哈希值和公钥是否提供
    if (!hash || !publicKey) {
        return res.status(400).json({ error: 'Hash is required' });
    }

    // 检查哈希值是否存在于缓存中
    if (!imageCache.has(hash)) {
        return res.status(400).json({ error: 'Hash not found in cache'});
    }

    try {
        // 加载私钥
        const privateKey = fs.readFileSync('private.pem', 'utf8');

        // 使用私钥对哈希值进行签名
        const sign = crypto.createSign('SHA256');
        sign.update(hash);
        sign.end();
        const signature = sign.sign(privateKey, 'hex');

        // 将签名存储到区块链（可以选择存储更多信息）
        blockchain.addBlock({
            hash,
            signature,
            publicKey,
            timeStamp: Date.now(),
        });

        res.json({
            message: 'Signature generated successfully',
            hash: hash,
            signature: signature,
            publicKey: publicKey,
            blockchainLength: blockchain.chain.length, // 区块链长度
        });
    } catch (err) {
        console.error('Error during signing:', err);
        res.status(500).json({ error: 'Failed to sign the hash' });
    }
});

module.exports = router;