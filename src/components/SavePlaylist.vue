<template>
  <button @click="handleSave" v-if='!isSafe'>Save Source</button>
  <button v-else @click="handleUnsave">Saved</button>
</template>

<script>
import getUser from '@/composables/getUser'
import useDocument from '@/composables/useDocument'
import { ref } from '@vue/reactivity'

export default {
    props:['playlist'],
    setup(props){
        const {user}=getUser()
        const isSafe=ref(props.playlist.saved.includes(user.value.uid))
        const{error,updateDoc}=useDocument('playlists',props.playlist.id)
        const handleSave = async()=>{
            if(!props.playlist.saved.includes(user.value.uid)){
                isSafe.value=true
                await updateDoc({
                    saved:[...props.playlist.saved,user.value.uid]
                })          
            }
        }
        const handleUnsave=async()=>{
            isSafe.value=false
            const saved=props.playlist.saved.filter((saveid)=>{
                return saveid!=user.value.uid
            })
            await updateDoc({saved})
        }
        return{handleSave,isSafe,handleUnsave}
    }
}
</script>

<style>

</style>