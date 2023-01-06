<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input required type="email" placeholder="Email" v-model="email">
    <input required type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{error}}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composables/useLogin.js'
import {useRouter} from 'vue-router'
export default {
    setup(){
      const {error,login,isPending}=useLogin()
      const router=useRouter()

        const email=ref('')
        const password=ref('')

        const handleSubmit=async ()=>{
            const res=await login(email.value,password.value)
            if(!error.value){
                    router.push({name:'Home'})
                }
        }
        return {email,password,handleSubmit,error,isPending}
    }
}
</script>

<style>

</style>