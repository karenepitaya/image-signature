<template>
    <div class="image-verify-page">
        <!-- 图片上传区 -->
        <UploadArea @upload-success="handleUploadSuccess" @upload-failure="handleUploadFailure" />

        <!-- 按钮区 -->
        <VerifyButton :is-enabled="isUploadSuccess" @verify="handleVerify" />

        <!-- 返回信息展示区 -->
        <ResultDisplay :result-message="resultMessage" />
    </div>
</template>

<script>
import UploadArea from "./UploadArea.vue";
import VerifyButton from "./VerifyButton.vue";
import ResultDisplay from "./ResultDisplay.vue";
import axios from "axios";

export default {
    components: {
        UploadArea,
        VerifyButton,
        ResultDisplay,
    },
    name: "ImageVerify",
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isUploadSuccess: false, // 上传成功状态
            resultMessage: "", // 信息展示
            imageHash: "", // 存储上传成功的哈希值
        };
    },
    methods: {
        // 上传成功的回调
        handleUploadSuccess(hash) {
            this.imageHash = hash; // 存储上传成功的哈希值
            this.isUploadSuccess = true; // 更新上传成功状态
            this.resultMessage = `Upload successful! Image hash: ${hash}`;
        },
        // 上传失败的回调
        handleUploadFailure(error) {
            this.imageHash = ""; // 清空哈希值
            this.isUploadSuccess = false;
            this.resultMessage = `Upload failed: ${error}`;
        },
        // 验证请求的回调
        async handleVerify() {
            try {
                const response = await axios.post("http://localhost:3000/api/verify", {
                    hash: this.imageHash,
                });
                this.resultMessage = `Verify successful: ${response.data.message}\n This image is signed by ${response.data.data.accountIndex}`;
            } catch (error) {
                this.resultMessage = `Verify failed: ${error.response?.data?.error || error.message}`;
            }
        },
    },
};
</script>

<style scoped>
.image-verify-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
}
</style>