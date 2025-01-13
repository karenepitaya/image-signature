<template>
    <div class="button-area">
        <button :disabled="!isEnabled" @click="$emit('verify')" class="verify-button">
            Verify
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isEnabled: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.button-area {
    display: flex;
    justify-content: center;
}

.verify-button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.verify-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>