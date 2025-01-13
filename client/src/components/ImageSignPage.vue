<template>
    <div class="image-sign-page">
        <h1>Image Signing</h1>
        <!-- 图片上传区 -->
        <UploadSection @upload-success="handleUploadSuccess" @upload-failure="handleUploadFailure" />
        <!-- 按钮区 -->
        <ButtonSection :is-uploaded="isUploaded" @sign-request="handleSignRequest" />
        <!-- 信息展示区 -->
        <InfoSection :message="infoMessage" />
    </div>
</template>

<script>
import UploadSection from './UploadSection.vue';
import ButtonSection from './ButtonSection.vue';
import InfoSection from './InfoSection.vue';

export default {
    components: { UploadSection, ButtonSection, InfoSection },
    data() {
        return {
            isUploaded: false, // 上传成功状态
            infoMessage: '', // 信息展示
            imageHash: '', // 存储上传成功的哈希值
        };
    },
    name: "ImageSign",
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 上传成功的回调
        handleUploadSuccess(hash) {
            this.imageHash = hash; // 存储上传成功的哈希值
            this.isUploaded = true; // 更新上传成功状态
            this.infoMessage = `Upload successful! Image hash: ${hash}`;
        },
        // 上传失败的回调
        handleUploadFailure(error) {
            this.imageHash = ''; // 清空哈希值
            this.isUploaded = false;
            this.infoMessage = `Upload failed: ${error}`;
        },
        // 签名请求的回调
        async handleSignRequest() {
            try {
                const response = await this.$axios.post('http://localhost:3000/api/sign', {
                    privateKey: this.account.privateKey,
                    address: this.account.address,
                    accountIndex: this.account.index,
                    hash: this.imageHash,
                });
                this.infoMessage = `Sign successful: ${response.data.message}`;
            } catch (error) {
                this.infoMessage = `Sign failed: ${error.response?.data?.error || error.message}`;
            }
        },
    }
};
</script>

<style scoped></style>