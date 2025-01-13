<template>
    <div class="result-area">
        <p v-if="resultMessage">{{ resultMessage }}</p>
    </div>
</template>

<script>
export default {
    props: {
        resultMessage: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.result-area {
    width: 300px;
    text-align: center;
    font-size: 16px;
    color: #333;
}
</style>