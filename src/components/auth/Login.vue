<template>
  <v-container>
    <v-card width="400" class="mx-auto mt5" :elevation="20" :loading="loading">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            label="Email"
            v-model="email"
            prepend-icon="mdi-account-circle"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :error-messages="errorMessages"
            @input="passwordChange()"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="info" @click="login()">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loading: false,
      valid: false,
      email: "",
      password: "",
      showPassword: false,
      errorMessages: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    login() {
      if (this.valid == false) {
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "garage" });
          this.loading = false;
          return response;
        })
        .catch(error => {
          this.errorMessages = error;
          this.loading = false;
        });
    },
    passwordChange() {
      if (this.errorMessages != "") {
        this.errorMessages = "";
      }
    }
  }
};
</script>

<style></style>
