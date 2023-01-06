<template>
  <h2>{{user.displayName}}'s saved lists</h2>
  <div v-if="playlists">
    <ListView :playlists="playlists"/>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/Listview.vue'
export default {
  components:{ListView},
  setup(){
    const {user}=getUser()
    const {documents:playlists}=getCollection('playlists',['saved','array-contains',user.value.uid])
    console.log(playlists)
    // const playlists=computed(()=>{
    //   return playlists.value.s
    // })
    return {playlists,user}
  }
}
</script>

<style>

</style>