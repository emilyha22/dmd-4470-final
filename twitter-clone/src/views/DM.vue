<template>
  <div>
  <section>
    <div id="nav">
      <router-link to="/feed">Feed</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/DM">DMs</router-link>
    </div>
  </section>

  <form v-on:submit.prevent ='sendMessage' id="user-msg">
    <textarea v-model="message" type="text" placeholder="Enter your message"></textarea>
    <button :disabled = '!message' type='submit' id="user-msg-btn">Post!</button>
  </form>

  <main>
    <div v-for="(user, index) in users" v-bind:key="'index-'+index" class="user">
      <p class="person">{{ user.email }}</p>
    </div>
  </main>

  <button v-on:click = "logOut">Logout</button>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  mounted () {
    this.db.collection('users').orderBy('desc').onSnapshot(querySnap => {
      this.users = querySnap.docs.map(doc => doc.data())
    })
  },

  data () {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      username: null,
      email: null,
      message: '',
      messages: [],
      likes: 0,
      users: []
    }
  },

  methods: {
    logOut () {
      firebase.auth().signOut()
      console.log('hello')
      this.$router.replace({ name: 'login' })
    }
  },

  created () {
    var user = firebase.auth().currentUser
    this.username = user.email
  }
}
</script>

<style lang="css">

</style>
