const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 计算图片的哈希值（支持 SHA-256）
async function computeImageHash(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
}

// 确保目录存在，不存在则创建
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

module.exports = {
  computeImageHash,
  ensureDirectoryExists,
};