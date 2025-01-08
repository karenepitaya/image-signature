<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>签名页面</h1>
        <v-form @submit.prevent="signImage">
          <v-file-input label="上传图片" v-model="file" />
          <v-btn type="submit" color="primary">签名</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    async signImage() {
      const formData = new FormData();
      formData.append('image', this.file);

      const response = await fetch('/api/images/sign', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    },
  },
};
</script>