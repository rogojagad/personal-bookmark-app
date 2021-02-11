<template>
  <div class="form-container">
    <form @submit.prevent="handleOnSubmit()">
      <text-input
        label="Username"
        name="username"
        :max-length="15"
        v-model="username"
      ></text-input>

      <password-input
        label="Password"
        name="password"
        v-model="password"
      ></password-input>

      <button :disabled="!this.isDisabled">Login</button>
    </form>
  </div>
</template>

<script>
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./../../constants";
import PasswordInput from "./../formInput/PasswordInput";
import TextInput from "./../formInput/TextInput";

export default {
  components: { PasswordInput, TextInput },
  computed: {
    isDisabled() {
      return Boolean(this.password && this.username);
    },
  },
  data() {
    return {
      password: null,
      username: null,
    };
  },
  methods: {
    async handleOnSubmit() {
      const response = await this.$http.post("user/auth", {
        username: this.username,
        password: this.password,
      });

      const accessToken = response.data[ACCESS_TOKEN_KEY];
      const refreshToken = response.data[REFRESH_TOKEN_KEY];

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      this.$router.push({ name: "bookmark-page" });
    },
  },
};
</script>

<style scoped></style>
