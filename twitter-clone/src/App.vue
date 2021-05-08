<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700&display=swap');

.top-header{
  margin-top: 20px;
  font-family: 'Karla', sans-serif;
}

a{
  font-family: 'Karla', sans-serif;
}

.header-text{
  font-size: 30px;
  margin-bottom: 15px;
  font-family: 'Karla', sans-serif;
  color: #1C1D1D;
}

input{
    border-radius: 0px;
    padding: 10px 10px;
    outline: none;
    border: 1px solid #d2d2d2;
    margin-bottom: 10px;
    width: 200px;
    border-radius: 5px;
    font-family: 'Karla', sans-serif;
}

input:focus{
  border: 1px solid #1C1D1D;
}

button{
  font-family: 'Karla', sans-serif;
    padding: 10px 20px;
    outline: none;
    border: none;
    background: #1C1D1D;
    color: white;
    width: 222px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #1C1D1D;
    margin-top: 10px;
    transition:.2s ease-in-out;
}

button:hover{
  background: white;
  border: 1px solid #1C1D1D;
  color: #1C1D1D;
}

.error{
  color: red;
  margin-bottom: 10px;
}

textarea{
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
}

.person{
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.message-text{
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: left;
}

.message{
    display: flex;
    align-items: flex-start;
    background: #ffffff;
    flex-direction: column;
    margin: 25px 0px;
    padding: 30px;
    border: 1px solid gainsboro;
    border-radius: 7px;
}

#nav a.router-link-exact-active {
    color: #F2C41E;
    text-decoration: none;
}

#nav a{
  text-decoration: none;
}

form{
    padding: 60px 100px;
    width: 50vw;
}

form#user-msg {
    display: flex;
    flex-direction: column;
    padding: 0px 0px 60px 0px;
    width:100%;
}

button#user-msg-btn{
  width:100%;
}

.background img{
  object-fit: cover;
  height: 100vh;
  width: 50vw;
}

.main-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.background{
    height: 100vh;
    width:50vw;
}

#like{
    background: transparent;
    width: 64px;
    color: #000000;
    padding: 5px;
    border: 1px solid #fcd765;
    font-weight: 600;
    border-radius: 50px;
    margin-left: 10px;
}

#like:hover{
    background: #fcd765;
}

.feed-flex{
  display: flex;
  justify-content: space-around;
}

.posts{
  width:60%;
  margin-left: 26%;
}

div#nav div {
    padding: 25px 64px;
    background: #ffffff;
    border-bottom: 1px solid;
}

  .nav{
  margin-top: 30px;
  position: fixed;
  top: 0;
  left: 50px;
  }

button.logout {
    margin-top: 30px;
}

img.bee-img {
  width:230px
}

.retweet{
    font-size: 16px;
    color: #f2c51f;
    margin-bottom: 18px;
    font-weight: 600;
}

.profile.message.message.recieved{
  display: none;
}

.message.message.sent {
  border: 1px solid #f2c51c;
}

.buttons{
  display: flex;
}

</style>
