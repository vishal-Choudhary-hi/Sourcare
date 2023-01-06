<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input required type="text" placeholder="Display Name" v-model="displayName">
        <input required type="email" placeholder="Email" v-model="email">
        <input required type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{error}}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useSignup from '../composables/useSignup'
import { ref } from '@vue/reactivity'
import {useRouter} from 'vue-router'

export default {
    setup(){
      const router=useRouter()

        const displayName=ref('')
        const password=ref('')
        const email=ref('')
        const {error,signup,isPending}=useSignup()
        const handleSubmit=async ()=>{
            const res=await signup(email.value,password.value,displayName.value)
            if(!error.value)
                router.push({name:'Home'})
        }
        return {email,password,displayName,handleSubmit,error,isPending}
    }
}
</script>

<style>

</style>