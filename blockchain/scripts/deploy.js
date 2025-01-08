async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const ImageStorage = await ethers.getContractFactory("ImageStorage");
    const imageStorage = await ImageStorage.deploy();

    console.log("ImageStorage contract deployed to:", imageStorage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });