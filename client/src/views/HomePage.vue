<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>区块链账户列表</h1>
        <v-card v-for="(account, index) in accounts" :key="index" class="mb-4">
          <v-card-title>账户 {{ index + 1 }}</v-card-title>
          <v-card-text>{{ account }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToPage(account, 'sign')">签名</v-btn>
            <v-btn color="secondary" @click="goToPage(account, 'verify')">验证</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      accounts: [], // 存储从后端获取的账户信息
    };
  },
  methods: {
    async fetchAccounts() {
      const response = await fetch('/api/accounts'); // 假设后端提供此路由返回20个账户
      this.accounts = await response.json();
    },
    goToPage(account, action) {
      this.$router.push({ name: action, params: { account } });
    },
  },
  mounted() {
    this.fetchAccounts();
  },
};
</script>