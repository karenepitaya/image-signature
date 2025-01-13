<template>
    <div class="upload-area" @click="triggerFileUpload">
        <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="handleFileUpload" />
        <p v-if="!uploadedFileName">Click to upload an image</p>
        <p v-else>Uploaded: {{ uploadedFileName }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            uploadedFileName: "", // 上传文件名
        };
    },
    methods: {
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        async handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("http://localhost:3000/api/upload", formData);
                if (response.data.hash) {
                    this.uploadedFileName = file.name;
                    this.$emit("upload-success", response.data.hash); // 通知父组件上传成功
                } else {
                    this.$emit("upload-failure"); // 通知父组件上传失败
                }
            } catch (error) {
                console.error("Upload error:", error);
                this.$emit("upload-failure"); // 通知父组件上传失败
            }
        },
    },
};
</script>

<style scoped>
.upload-area {
    width: 300px;
    height: 200px;
    border: 2px dashed #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>