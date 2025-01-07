// 获取 DOM 元素
const imageFileInput = document.getElementById('imageFile');
const uploadButton = document.getElementById('uploadButton');
const resultContainer = document.getElementById('resultContainer');
const uploadResultContainer = document.getElementById('uploadResultContainer');
const signResultContainer = document.getElementById('signResultContainer');
const uploadResultElement = document.getElementById('uploadResult');
const signResultElement = document.getElementById('signResult');
const signButton = document.getElementById('signButton');
const publicKeyFileInput = document.getElementById('publicKeyFile');
const privateKeyFileInput = document.getElementById('privateKeyFile');
const passphraseInput = document.getElementById('passphrase');
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
        signContainer.style.display = 'block';
        resultContainer.style.display = 'block';
        uploadResultContainer.style.display = 'block';
        uploadResultElement.textContent = `Image uploaded successfully.\nImage hash: ${imageHash}`;
    } catch (error) {
        // 处理错误
        alert('Upload failed. Please try again.');
        console.error('Error:', error);
    }
});

signButton.addEventListener('click', async () => {
    const publicKeyFile = publicKeyFileInput.files[0];
    const privateKeyFile = privateKeyFileInput.files[0];
    const passphrase = passphraseInput.value;

    // 检查是否上传了图片
    if (!imageHash) {
        alert('Please upload an image first.');
        return;
    }

    // 检查是否输入了公钥文件
    if (!publicKeyFile) {
        alert('Please enter a public key file.');
        return;
    }

    // 检查是否选择了私钥文件
    if (!privateKeyFile) {
        alert('Please select a private key file.');
        return;
    }

    // 检查是否输入了私钥密码
    if (!passphrase) {
        alert('Please enter a passphrase for the private key.');
        return;
    }

    try {
        const privateKey = await privateKeyFile.text();
        const publicKey = await publicKeyFile.text();

        // 发送 POST 请求到后端
        const response = await fetch('http://localhost:3000/api/images/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash: imageHash,
                publicKey: publicKey,
                privateKey: privateKey,
                passphrase: passphrase,
            }),
        });

        const result = await response.json();
        
        if (response.ok) {
            // 显示结果
            signResultContainer.style.display = 'block';
            signResultElement.textContent = `Image signed successfully.\nSignature: ${result.signature}`;
        } else {
            alert('Signing failed. maybe the passphrase is wrong.');
            console.error('Error:', result.error);
        }
    } catch (error) {
        // 处理错误
        alert('Signing failed. something went wrong. Please try again.');
        console.error('Error:', error);
    }
});