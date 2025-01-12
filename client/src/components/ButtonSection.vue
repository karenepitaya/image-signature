<template>
    <div class="button-section">
        <button :disabled="!isUploaded" @click="requestSign">
            Sign Image
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isUploaded: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        requestSign() {
            if (!this.isUploaded) {
                alert('Please upload an image first!');
                return;
            }
            this.$emit('sign-request'); // 通知父组件发起签名请求
        },
    },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #4A64E3; /* 按钮背景色 */
  color: white; /* 按钮字体颜色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.1s ease; /* 添加过渡效果 */
  align-self: center; /* 垂直居中对齐 */
}

button:hover {
  background-color: #3a52c1;
}

button:active {
  transform: scale(0.95); /* 点击时缩小按钮 */
  background-color: #2e3b8e; /* 点击时改变背景色 */
}

button:disabled {
    background-color: grey;
    cursor: not-allowed;
}
</style>