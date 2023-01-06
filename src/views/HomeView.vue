<template>
  <div class="home">
    <div v-if="error" class="error">Can not fetch data</div>
    <Listview :playlists="documents"/>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import { ref } from '@vue/reactivity'
import Listview from '@/components/Listview.vue'
export default {
  components: { Listview },
  setup(){
    const playlists=ref(null)
    const {error,documents}=getCollection('playlists')
    return {error,documents}
  }
}
</script>