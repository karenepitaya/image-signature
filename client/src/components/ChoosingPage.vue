<template>
    <div class="choosing-page">
        <h1>Account Selected</h1>
        <p><strong>Index:</strong> {{ account.index }}</p>
        <p><strong>Address:</strong> {{ account.address }}</p>
        <div class="action-buttons">
            <button @click="navigateToSign">Sign Image</button>
            <button @click="navigateToVerify">Verify Image</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChoosingPage",
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    methods: {
        navigateToSign() {
            console.log("Navigate to Sign Image with account:", this.account);
            // 在这里实现跳转到签名页面的逻辑
        },
        navigateToVerify() {
            console.log("Navigate to Verify Image with account:", this.account);
            // 在这里实现跳转到验证页面的逻辑
        }
    }
};
</script>

<style scoped>
.choosing-page {
    text-align: center;
    padding: 20px;
    font-family: 'Consolas', monospace;
}

h1 {
    font-size: 2rem;
    color: #333;
}

p {
    font-size: 1.2rem;
    color: #555;
    margin: 10px 0;
}

.action-buttons {
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #4A64E3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #3849b3;
}

button:active {
    transform: scale(0.95);
    background-color: #2e3b8e;
}
</style>