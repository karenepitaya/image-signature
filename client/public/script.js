// 获取 DOM 元素
const imageFileInput = document.getElementById('imageFile');
const uploadButton = document.getElementById('uploadButton');
const resultContainer = document.getElementById('resultContainer');
const resultElement = document.getElementById('result');

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

        // 显示结果
        resultElement.textContent = JSON.stringify(data, null, 2);
        resultContainer.style.display = 'block';
    } catch (error) {
        // 处理错误
        alert('Upload failed. Please try again.');
        console.error('Error:', error);
    }
});