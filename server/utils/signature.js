const crypto = require('crypto');

/**
 * 使用私钥对哈希值进行签名
 * @param {string} hash - 图片的 SHA-256 哈希值
 * @param {string} privateKey - 私钥
 * @param {string} passphrase - 私钥的 passphrase
 * @returns {string} 签名
 */
function signHash(hash, privateKey, passphrase) {
    try {
        // 使用 SHA-256 算法对哈希值进行签名
        const sign = crypto.createSign('SHA256');
        sign.update(hash);
        sign.end();
        const signature = sign.sign({ key: privateKey, passphrase: passphrase }, 'hex');
        return signature;
    } catch (error) {
        console.error('Error during signing:', error);
        throw new Error('Failed to sign the image');
    }
}

module.exports = { signHash };