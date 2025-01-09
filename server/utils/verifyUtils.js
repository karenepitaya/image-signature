const ethers = require("ethers");
const SignatureStorageABI = require("./../../blockchain/artifacts/contracts/ImageStorge.sol/SignatureStorage.json").abi;
require("dotenv").config();

// 初始化 provider 和合约地址
const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // 连接到 hardhat 节点获取 provider
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY; // 部署者的私钥
const wallet = new ethers.Wallet(deployerPrivateKey, provider); // 用部署者的私钥生成钱包连接 provider
const contractAddress = process.env.CONTRACT_ADDRESS; // 合约部署者的地址

// 获取合约实例
const contract = new ethers.Contract(contractAddress, SignatureStorageABI, wallet);

/**
 * 验证签名
 * @param {string} hash - 图片的哈希值
 * @returns {object} - 返回验证结果和签名信息
 */
async function verifySignature(hash) {
    try {
        // 从合约中调用 getSignature 函数获取存储的信息
        const signatureInfo = await contract.getSignature(hash);

        // 如果 `userAddress` 是零地址，说明合约中没有存储此哈希
        if (signatureInfo.userAddress === ethers.ZeroAddress) { 
            // ethers.constants.ZeroAddress 是零地址https://docs.ethers.org/v6/api/constants/
            // 神金，ethers第六版改了，ethers.constants.AddressZero 变成了 ethers.ZeroAddress
            return { exists: false, message: "No signature found on the blockchain" };
        }

        // 如果找到签名信息，返回数据
        return {
            exists: true,
            message: "Signature found on the blockchain",
            data: {
                userAddress: signatureInfo.userAddress,
                accountIndex: signatureInfo.accountIndex.toString(), // TODO转为普通数字
                timestamp: signatureInfo.timestamp.toString(), // TODO转为可读时间, 啥是bigNumber？
            },
        };
    } catch (error) {
        console.error("Error verifying signature:", error);
        throw new Error("Failed to verify signature");
    }
}

module.exports = { verifySignature };