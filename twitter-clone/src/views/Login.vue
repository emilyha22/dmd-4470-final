<template>
    <div class="main-div">
    <section class="background">
        <img src="@/assets/Ngaruroro.png">
    </section>
    <form @submit.prevent = "pressed">
      <img class="bee-img" src="@/assets/buzztalk.png">
      <div id="nav">
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="error" class="error">{{error.message}}</div>
      <div class="email">
          <input type="email" v-model="email" placeholder="email">
      </div>
      <div class="password">
          <input type="password" v-model="password" placeholder="password">
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
</template>

<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'
export default {
  methods: {
    async pressed () {
      try {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.replace({ name: 'feed' })
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  }
}
</script>

<style lang="css">
</style>
