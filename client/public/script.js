const { sign } = require("crypto");

// 获取 DOM 元素
const imageFileInput = document.getElementById('imageFile');
const uploadButton = document.getElementById('uploadButton');
const resultContainer = document.getElementById('resultContainer');
const resultElement = document.getElementById('result');
const signButton = document.getElementById('signButton');
const publicKeyInput = document.getElementById('publicKey');
const privateKeyFileInput = document.getElementById('privateKeyFile');
const signContainer = document.querySelector('.sign-container');
let imageHash = '';

// 上传按钮点击事件
uploadButton.addEventListener('click', async () => {
    const file = imageFileInput.files[0];

    // 检查是否选择了文件
    if (!file) {
        alert('Please select an image file to upload.');
        return;
    }

    // 使用 FormData 打包文件数据
    const formData = new FormData();
    formData.append('image', file);

    try {
        // 发送 POST 请求到后端
        const response = await fetch('http://localhost:3000/api/images/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // 获取并解析响应数据
        const data = await response.json();

        // 获取图片哈希值
        imageHash = data.hash;

        // 显示结果
        resultElement.textContent = `Image uploaded successfully. Image hash: ${imageHash}`;
        resultContainer.style.display = 'block';
        signContainer.style.display = 'block';
    } catch (error) {
        // 处理错误
        alert('Upload failed. Please try again.');
        console.error('Error:', error);
    }
});

signButton.addEventListener('click', async () => {
    const publicKey = publicKeyInput.value.trim();
    const privateKeyFile = privateKeyFileInput.files[0];

    // 检查是否上传了图片
    if (!imageHash) {
        alert('Please upload an image first.');
        return;
    }

    // 检查是否输入了公钥
    if (!publicKey) {
        alert('Please enter a public key.');
        return;
    }

    // 检查是否选择了私钥文件
    if (!privateKeyFile) {
        alert('Please select a private key file.');
        return;
    }

    try {
        // 读取私钥文件
        const privateKey = await privateKeyFile.text();

        // 发送 POST 请求到后端
        const response = await fetch('http://localhost:3000/api/images/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash: imageHash,
                publicKey: publicKey,
                privateKey: privateKey,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            resultElement.textContent = `Signed successfully and stored in blockchain. Blockchain length: ${result.blockchainLength}`;
        } else {
            resultElement.textContent = 'Error: ${result.error}';
        }
    } catch (error) {
        // 处理签名错误
        alert('Sign failed. Please try again.');
        console.error('Error:', error);
    }
});