<template>
    <div class="info-section">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.info-section {
    margin-top: 20px;
    color: green;
}
</style>