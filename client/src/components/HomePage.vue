<template>
  <div class="homepage" v-if="!selectedAccount">
    <h1>Accounts List</h1>
    <p>Click on an account to select it.</p>
    <div class="accounts">
      <!-- 使用 v-for 循环显示每个账户 -->
      <div v-for="account in accounts" :key="account.index" class="account-card">
        <!-- 左侧信息部分 -->
        <div class="account-info">
          <p><strong>Index:</strong> <em>{{ account.index }}</em></p>
          <p><strong>Address:</strong> <em>{{ account.address }}</em></p>
        </div>
        <!-- 右侧按钮部分 -->
        <button @click="selectAccount(account)">Select Account</button>
      </div>
    </div>
  </div>
  <ChoosingPage v-else :account="selectedAccount" />
</template>

<script>
// 如果选择使用 axios 导入（如果使用 axios，请确保已安装 axios）
import axios from "axios";
import ChoosingPage from "./ChoosingPage.vue"; // 导入新的组件

export default {
  name: "HomePage",
  data() {
    return {
      accounts: [],  // 用来存储从 JSON 加载的账户数据
      selectedAccount: null // 用来存储选中的账户信息
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
      this.selectedAccount = account;
      // 你可以在这里做其他操作，比如导航到签名页面，或者保存选择的账户
    },
  },
  components: {
    ChoosingPage, // 注册新的组件
  },
};
</script>

<style scoped>
.homepage {
  text-align: center;
  padding: 20px;
  font-family: 'Consolas', monospace;
  /* 使用 Consolas 字体 */
  width: 100%;
  /* 确保内容宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 确保内容居中 */
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0px;
  color: #333;
}

h1+p {
  margin-bottom: 20px;
  margin-top: 0;
  color: #555;
}

.accounts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* 自适应列宽 */
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px;
  /* 避免贴边 */
}

.account-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  /* 使用 flex 布局 */
  justify-content: space-between;
  /* 左右对齐 */
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 左右间距 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  align-items: stretch;
}

.account-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.account-info {
  flex: 1;
  /* 左侧信息部分占满可用空间 */
  width: 50%;
  /* 避免内容撑开 */
}

.account-info p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  word-break: break-all;
  /* 强制长字符串换行 */
  overflow-wrap: break-word;
  /* 长单词换行 */
}

button {
  padding: 10px;
  background-color: #4A64E3;
  /* 按钮背景色 */
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
  /* 点击时缩小按钮 */
  background-color: #2e3b8e;
  /* 点击时改变背景色 */
}
</style>