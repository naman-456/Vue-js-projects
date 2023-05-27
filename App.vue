<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div>
      <!-- <h1>{{pharmacyName}}</h1>
      <div>
          <button @click.prevent="newTabopen">New Tab</button>
      </div> -->
  </div>
  <ComponentParent />
  <router-view/>
</template>
<script>
import ComponentParent from './components/ComponentParent.vue'
  export default{
        data(){
            return{
                pharmacyName: "Apollo Pharmacy"
            }
        },
        components:{
          ComponentParent
        },
        mounted(){
            setTimeout(() => {
                this.pharmacyName = "MedPlus Pharmacy"
            }, 5000)
        },
        methods:{
            newTabopen(){
                window.open("https://www.codewithharry.com", '_blank')
            }
        }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
