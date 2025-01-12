<template>
    <div class="upload-section">
        <input type="file" @change="uploadImage" accept="image/*" />
    </div>
</template>

<script>
export default {
    methods: {
        async uploadImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await this.$axios.post('http://localhost:3000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.$emit('upload-success', response.data.hash); // 通知父组件上传成功
            } catch (error) {
                this.$emit('upload-failure', error.response?.data?.error || error.message); // 通知父组件上传失败
            }
        },
    },
};
</script>

<style scoped>
.upload-section {
    margin: 20px 0;
}
</style>