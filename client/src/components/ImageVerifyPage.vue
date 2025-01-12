<template>
    <div>
        <h1>Image Verify Page</h1>
        <p>Selected Account:</p>
        <pre>{{ account }}</pre>
        <!-- 在这里可以继续实现验证功能 -->
    </div>
</template>

<script>
export default {
    name: "ImageVerify",
    props: {
        account: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
/* 添加你自己的样式 */
</style>