<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create New Source list</h3>
    <input type="text"  required placeholder="Source list Title" v-model="title">
    <textarea placeholder="Write about this source list..." v-model="description"></textarea>
    <label>Upload source list cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{fileError}}</div>
    <button v-if="!isPending"> Create</button>
    <button v-else disabled> Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'
import {useRouter} from 'vue-router'
export default {
    setup(){
        const {url,path,uploadImage}=useStorage()
        const{error,addDoc}=useCollection('playlists')
        const router=useRouter()
        const {user}=getUser()

        const title=ref('')
        const description=ref('')
        const fileError=ref(null)
        const file=ref(null)
        const isPending=ref(false)
        //allowed file types
        const types=['image/png','image/jpeg']
        const handleSubmit=async()=>{
            if(file.value){
                isPending.value=true
                await uploadImage(file.value)
                const res=await addDoc({
                    title:title.value,
                    description:description.value,
                    userId:user.value.uid,
                    userName:user.value.displayName,
                    coverUrl:url.value,
                    filePath:path.value,
                    songs:[],
                    saved:[],
                    createdAt:timestamp()
                })
                if(!error.value){
                    router.push({name:'PlaylistDetails',params:{id:res.id}})
                }
                isPending.value=false
            }
        }
        const handleChange =(e)=>{
            const selected=e.target.files[0]
            if(selected && types.includes(selected.type)){
                file.value=selected
            }else{
                file.value=null
                fileError.value="Please select an image file of type (png ot jpeg)"
            }
        }
        return {title,description,isPending,handleSubmit,handleChange,fileError}
    }
}
</script>

<style>
    input[type="file"]{
        border:0;
        padding:0;
    }
    label{
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button{
        margin-top: 20px;
    }
</style>