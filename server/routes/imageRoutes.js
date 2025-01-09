const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { computeImageHash, ensureDirectoryExists } = require('../utils/uploadUtils'); // 引入上传工具函数
const { signHash, storeToBlockchain } = require("../utils/signUtils"); // 引入签名函数与存储函数
const { verifySignature } = require("../utils/verifyUtils"); // 引入验证签名函数

const router = express.Router();

// 配置 multer 用于文件上传
const uploadDir = path.join(__dirname, '../../uploads'); // 定义上传目录
ensureDirectoryExists(uploadDir); // 确保上传目录存在

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 上传的图片将存储在 uploads 文件夹
    },
    filename: (req, file, cb) => {
        // 使用时间戳 + 原文件名，避免文件重名
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

// 全局缓存区，用于存储图片哈希值和路径
const imageCache = new Map();

// 上传图片的路由
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const filePath = path.resolve(req.file.path); // 获取上传图片的绝对路径
      const hash = await computeImageHash(filePath); // 计算图片哈希值
  
      // 将哈希值和路径存储到缓存区
      imageCache.set(hash, filePath);
  
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        hash: hash, // 返回图片哈希值
      });
    } catch (error) {
      console.error('Error processing upload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// 数字签名的路由
// TODO: 不允许对同一张图片重复签名
// TODO: 允许同一账号对不同图片签名
router.post("/sign", async (req, res) => { 
    const { privateKey, address, accountIndex, hash } = req.body;

    // 检查请求体是否完整
    if (!privateKey || !address || accountIndex == null) {
        return res.status(400).json({ error: "Incomplete request body" });
    }

    // 检查缓存是否存在
    if (!imageCache.has(hash) || !hash) {
        return res.status(400).json({ error: "Image not uploaded or invalid hash" });
    }

    try {
        // 签名哈希值
        const signature = signHash(hash, privateKey);

        // 存储签名信息到区块链
        const storeSuccess = await storeToBlockchain(hash, signature, address, accountIndex);

        if (storeSuccess) {
            return res.json({ message: "Signature stored successfully" });
        } else {
            throw new Error("Failed to store signature on blockchain");
        }
    } catch (error) {
        console.error("Error during signing process:", error);
        return res.status(500).json({ error: "Signing process failed" });
    }
});

// 验证签名的路由
router.post("/verify", async (req, res) => {
    try {
        const { hash } = req.body;

        // 检查hash值是否存在
        if (!hash) {
            return res.status(400).json({ error: "Hash value is required" });
        }

        // 验证签名
        const verificationResult = await verifySignature(hash);

        if (!verificationResult.exists) {
            return res.json({ message: verificationResult.message });
        }

        return res.json({ 
            message: verificationResult.message, 
            data: verificationResult.data
        });
    } catch (error) {
        console.error("Error during verification process:", error);
        return res.status(500).json({ error: "Verification process failed" });
    }
});

module.exports = router;