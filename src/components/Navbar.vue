<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/symbol.png" alt="Symbol here" />
      <h1><router-link :to="{ name: 'Home' }">SourCare</router-link></h1>
      <div class="links">
        <div v-if="user">
          <p>{{ user.displayName }}</p>
          <router-link :to="{ name: 'UserPlaylist' }"
            >My contributions</router-link
          >
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create source list</router-link
          >
          <router-link :to="{ name: 'MySaveList' }">My save lists</router-link>
          <button v-if="!isPending" @click="handleLogout">Logout</button>
          <button v-if="isPending" @click="handleLogout" disabled>
            Loading
          </button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
export default {
  setup() {
    const router = useRouter();
    const { user } = getUser();
    const { error, logout, isPending } = useLogout();
    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        console.log("Logout done");
        router.push({ name: "Login" });
      }
    };
    return { handleLogout, error, isPending, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 50px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 15px;
  font-size: 15px;
}
img {
  max-height: 60px;
}
p {
  display: inline;
}
</style>
