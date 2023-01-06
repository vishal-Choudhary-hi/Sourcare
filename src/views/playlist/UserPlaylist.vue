<template>
  <h2>{{user.displayName}}'s source lists</h2>
  <div v-if="playlists">
    <ListView :playlists="playlists"/>
  </div>
  <div v-else if="playlists.length">
    <h2>You added nothing yet</h2>
  </div>
  <router-link class="btn" :to="{name:'CreatePlaylist'}">Create a new source list</router-link>
</template>

<script>
  import getUser from '@/composables/getUser'
  import getCollection from '@/composables/getCollection'
  import ListView from '@/components/Listview.vue'
export default {
  components:{ListView},
  setup(){
    const {user}=getUser()
    const {documents:playlists}=getCollection('playlists',['userId','==',user.value.uid])
    return {playlists,user}
  }
}
</script>

<style scoped>
  h2{
    text-align: center;
    margin: 20px;
  }
</style>