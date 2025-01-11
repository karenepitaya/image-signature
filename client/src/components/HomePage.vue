<template>
    <div class="homepage">
        <h1>Accounts List</h1>
        <div class="accounts">
            <!-- 使用 v-for 循环显示每个账户 -->
            <div v-for="account in accounts" :key="account.index" class="account-card">
                <p><strong>Index:</strong> {{ account.index }}</p>
                <p><strong>Address:</strong> {{ account.address }}</p>
                <button @click="selectAccount(account)">Select Account</button>
            </div>
        </div>
    </div>
</template>

<script>
// 如果选择使用 axios 导入（如果使用 axios，请确保已安装 axios）
import axios from "axios";

export default {
    name: "HomePage",
    data() {
        return {
            accounts: [],  // 用来存储从 JSON 加载的账户数据
        };
    },
    created() {
        // 页面创建时调用方法获取 JSON 数据
        this.loadAccounts();
    },
    methods: {
        // 使用 fetch 方法加载 accounts.json 数据
        async loadAccounts() {
            try {
                const response = await axios.get("/accounts.json");  // 加载 public/accounts.json 文件
                this.accounts = response.data;  // 将数据存储到 accounts 数组中
            } catch (error) {
                console.error("Error loading accounts:", error);
            }
        },
        // 处理选择账户的逻辑（例如：将选中的账户存储在状态管理中）
        selectAccount(account) {
            console.log("Selected Account:", account);
            // 你可以在这里做其他操作，比如导航到签名页面，或者保存选择的账户
        },
    },
};
</script>

<style scoped>

.homepage {
  text-align: center;
  padding: 20px;
  font-family: 'Consolas', monospace;  /* 使用 Consolas 字体 */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.accounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.account-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.account-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.account-info {
  margin-bottom: 15px;
}

.account-info p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>