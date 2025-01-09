const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { updateEnvFile } = require("./updateEnvFile"); // 导入 updateEnvFile 方法

// 获取根目录的绝对路径
const rootPath = path.resolve(__dirname, "../../");  // 返回两层目录

async function main() {
    // 获取部署者的账户
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 部署合约
    const SignatureStorage = await ethers.getContractFactory("SignatureStorage");
    const signatureStorage = await SignatureStorage.deploy();

    console.log("SignatureStorage contract deployed to:", signatureStorage.address);

    // 保存合约地址到 .env 文件
    updateEnvFile(rootPath, "CONTRACT_ADDRESS", signatureStorage.address);

    // 通过事件确认合约部署成功
    await signatureStorage.deployed();
    console.log("Contract deployed successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });