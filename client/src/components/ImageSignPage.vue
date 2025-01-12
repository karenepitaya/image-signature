<template>
    <div>
        <h1>Image Sign Page</h1>
        <p>Selected Account:</p>
        <pre>{{ account }}</pre>
        <!-- 在这里可以继续实现签名功能 -->
    </div>
</template>

<script>
export default {
    name: "ImageSign",
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