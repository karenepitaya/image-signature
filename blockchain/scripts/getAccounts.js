const { ethers } = require("hardhat");

async function main() {
    // 获取所有签名账户
    const [deployer, ...accounts] = await ethers.getSigners();

    console.log("Deployer address:", deployer.address);
    console.log("-----------------------------");

    // 获取并打印所有账户的地址、余额、公钥和私钥
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const balance = await ethers.provider.getBalance(account.address); // 获取账户余额

        // 输出地址和余额
        console.log(`Account ${i + 1}:`);
        console.log("Address:", account.address);
        console.log("Balance:", ethers.utils.formatEther(balance)); // 格式化为 Ether

        // 通过构造 Wallet 实例来获取私钥
        const wallet = new ethers.Wallet(account.privateKey);
        console.log("Private Key:", wallet.privateKey); // 输出私钥
        console.log("-----------------------------");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });