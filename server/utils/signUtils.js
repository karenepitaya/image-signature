const { ethers } = require("ethers");
require("dotenv").config();  // 加载 .env 文件
const SignatureStorageABI = require("./../../blockchain/artifacts/contracts/ImageStorge.sol/SignatureStorage.json").abi;
const waitOn = require("wait-on");

/**
 * 签名哈希值
 * @param {string} hash - 图片的哈希值
 * @param {string} privateKey - 用户的私钥
 * @returns {string} - 签名后的数据
 */
function signHash(hash, privateKey) {
    try {
        const wallet = new ethers.Wallet(privateKey); // 用私钥生成签名钱包
        const signature = wallet.signMessage(hash); // 签名哈希值
        return signature;
    } catch (error) {
        console.error("Error signing hash:", error);
        throw new Error("Failed to sign hash");
    }
}

/**
 * 存储签名到区块链
 * @param {string} hash - 签名图片的哈希值
 * @param {string} signature - 签名
 * @param {string} address - 用户的地址
 * @param {number} accountIndex - 用户所选账户的号码
 */
async function storeToBlockchain(hash, signature, address, accountIndex) {
    // 等待区块链节点可用
    try {
        console.log("Waiting for blockchain node to be available...");
        await waitOn({ resources: ["tcp:127.0.0.1:8545"], timeout: 15000 });
    } catch (error) {
        console.error("Blockchain node is not reachable:", error);
        return { success: false, error: "Blockchain node is not reachable" };
    }

    // 设置provider和合约地址
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // 连接到 hardhat 节点获取 provider
    const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY; // 部署者的私钥
    const wallet = new ethers.Wallet(deployerPrivateKey, provider); // 用部署者的私钥生成钱包连接 provider
    const contractAddress = process.env.CONTRACT_ADDRESS; // 合约部署者的地址

    // 获取合约实例
    const contract = new ethers.Contract(contractAddress, SignatureStorageABI, wallet);

    try {
        // 调用合约存储签名
        const tx = await contract.storeSignature(hash, signature, address, accountIndex);
        await tx.wait(); // 等待交易确认

        console.log("Signature stored successfully on the blockchain:", tx);
        return { success: true, txHash: tx.hash }; // 返回成功和交易哈希
    } catch (error) {
        console.error("Error storing signature on blockchain:", error);
        return { success: false, error: error.message }; // 返回失败信息
    }
}

module.exports = { signHash, storeToBlockchain };