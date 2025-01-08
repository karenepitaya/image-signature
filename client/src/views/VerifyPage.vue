<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>验证页面</h1>
          <v-form @submit.prevent="verifyImage">
            <v-file-input label="上传图片" v-model="file" />
            <v-btn type="submit" color="primary">验证</v-btn>
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
      async verifyImage() {
        const formData = new FormData();
        formData.append('image', this.file);
  
        const response = await fetch('/api/images/verify', {
          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
        console.log(result);
      },
    },
  };
  </script>  