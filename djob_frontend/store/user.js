import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      isAuthenticated: false,
      email: null,
      token: null,
    },
  }),

  actions: {
    initStore() {
      this.user.isAuthenticated = false;
      const storedToken = localStorage.getItem("user.token");
      const storedEmail = localStorage.getItem("user.email");

      if (storedToken) {
        this.user.token = storedToken;
        this.user.email = storedEmail;
        this.user.isAuthenticated = true;
      }
    },

    setToken(token, email) {
      this.user.token = token;
      this.user.email = email;
      this.user.isAuthenticated = true;

      localStorage.setItem("user.token", token);
      localStorage.setItem("user.email", email);
    },

    removeToken() {
      this.user.token = null;
      this.user.email = null;
      this.user.isAuthenticated = false;

      localStorage.setItem("user.token", '');
      localStorage.setItem("user.email", '');
    },
  },
});
