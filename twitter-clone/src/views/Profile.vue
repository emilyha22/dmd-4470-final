<template>
  <div class="feed-flex">
    <section class="nav">
    <div id="nav">
      <img class="bee-img" src="@/assets/buzztalk.png">
      <div><router-link to="/feed">Feed</router-link></div>
      <div><router-link to="/profile">Profile</router-link></div>
      <button class="logout" v-on:click = "logOut">Logout</button>
    </div>
    </section>

    <section class="posts">
    <h1>Profile</h1>
    <form v-on:submit.prevent ='sendMessage' id="user-msg">
    <textarea v-model="message" type="text" placeholder="Enter your message"></textarea>
    <button :disabled = '!message' type='submit' id="user-msg-btn">Post!</button>
    </form>
    <main>
      <h4>Your Posts</h4>
      <div v-for="(msg, index) in messages" v-bind:key="'index-'+index" class="message profile" :class = "['message', sentOrReceived(msg.userUID)]">
        <span class="retweet">{{ msg.retweetBy }}</span>
        <p class="person">{{ msg.email }}</p>
        <p class="message-text">{{ msg.text }}</p>
        <div class="buttons">
          <p class="likes-num">{{ msg.likes }}<button v-bind:key="'index-'+index" v-on:click = "liked(msg)" class="like" id="like">Like</button></p>
          <p><button v-bind:key="'index-'+index" v-on:click = "retweet(msg)" class="like" id="like">Retweet</button></p>
        </div>
      </div>
    </main>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  mounted () {
    this.db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const changes = snapshot.docChanges()
      changes.forEach((change) => {
        if (change.type === 'added') {
          console.log('added', change.doc.id)
          this.messages = snapshot.docs.map(doc => doc.data())
          const msg = change.doc.data()
          msg.id = change.doc.id
        }
        if (change.type === 'modified') {
          console.log('updated', change.doc.data())
        }
      })
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
      id: null
    }
  },

  methods: {
    retweet (msg) {
      console.log(msg)
      const user = firebase.auth().currentUser
      console.log(user)
      console.log(msg.email)
      const retweetMsg = {
        retweetBy: 'retweeted by: ' + user.email,
        email: msg.email,
        text: msg.text,
        created: msg.createdAt,
        createdAt: new Date(),
        userUID: user.uid
      }
      this.db.collection('messages').add(retweetMsg)
    },

    liked (msg) {
      var currentLikes = msg.likes
      msg.likes = currentLikes + 1
      console.log(msg)
      this.db.collection('messages').doc(msg.id).update({
        likes: msg.likes
      })
    },

    logOut () {
      firebase.auth().signOut()
      console.log('hello')
      this.$router.replace({ name: 'login' })
    },

    sentOrReceived (userUID) {
      return userUID === this.user.uid ? 'sent' : 'recieved'
    },

    async sendMessage (event) {
      const messageInfo = {
        userUID: this.user.uid,
        email: this.user.email,
        text: this.message,
        createdAt: Date.now(),
        likes: 0
      }
      await this.db.collection('messages').add(messageInfo)

      this.message = ''
    }
  }
}
</script>

<style lang="css">
div#profile.message.recieved{
    display: none;
}
</style>
