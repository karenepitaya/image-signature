const crypto = require('crypto');

// 区块链模拟类
class Blockchain {
    constructor() {
        this.chain = [];  // 存储所有的区块
        this.createGenesisBlock();  // 创建创世区块
    }

    // 创建创世区块
    createGenesisBlock() {
        const genesisBlock = this.createBlock('000000', 'Genesis Block');
        this.chain.push(genesisBlock);
    }

    // 创建一个新块
    createBlock(previousHash, data) {
        const block = {
            timestamp: new Date().toISOString(),
            previousHash: previousHash,
            hash: this.calculateHash(data),
            data: data
        };
        return block;
    }

    // 计算区块的哈希值
    calculateHash(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    // 添加新块
    addBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const newBlock = this.createBlock(previousBlock.hash, data);
        this.chain.push(newBlock);
    }

    // 获取最新的区块链
    getChain() {
        return this.chain;
    }
}

module.exports = Blockchain;