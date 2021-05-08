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
  <h1>Feed</h1>
  <form v-on:submit.prevent ='sendMessage' id="user-msg">
    <textarea v-model="message" type="text" placeholder="Enter your message"></textarea>
    <button :disabled = '!message' type='submit' id="user-msg-btn">Post!</button>
  </form>

  <main>
    <div v-for="(msg, index) in messages" v-bind:key="'index-'+index" class="message" :class = "['message', sentOrReceived(msg.userUID)]">
      <span class="retweet">{{ msg.retweetBy }}</span>
      <p class="person">{{ msg.email }}</p>
      <p class="message-text">{{ msg.text }}</p>
      <div class="buttons">
        <p v-if="repost" class="likes-num">{{ msg.likes }}<button v-bind:key="'index-'+index" v-on:click = "liked(msg)" class="like" id="like">Like</button></p>
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
      retweets: [],
      likes: 0,
      id: null,
      repost: true
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
        userUID: user.uid,
        likes: 0
      }
      this.db.collection('messages').add(retweetMsg)
      console.log(this.repost)
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
        createdAt: new Date(),
        likes: 0,
        id: null
      }
      await this.db.collection('messages').add(messageInfo)

      this.message = ''

      this.db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        const changes = snapshot.docChanges()
        changes.forEach((change) => {
          if (change.type === 'added') {
            this.db.collection('messages').doc(change.doc.id).update({
              id: change.doc.id
            })
          }
        })
      })
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
