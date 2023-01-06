import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";
const {user}=getUser()
const useStorage=()=>{
    const error=ref(null)
    const url=ref(null)
    const path=ref(null)

    const uploadImage=async(file)=>{
       path.value=`covers/${user.value.uid}/${file.name}` 
       const storageRef=projectStorage.ref(path.value)
       try {
        const res=await storageRef.put(file)
        url.value=await res.ref.getDownloadURL()
       } catch (err) {
            console.log(err.message)
            error.value=err.message
       }
    }
    const deleteImage=async(path)=>{
        const storageRef=projectStorage.ref(path)
        try {
            await storageRef.delete()
        } catch (err) {
            console.log(err.message)
            error.value=err.message
        }
    }
    return {url,path,error,uploadImage,deleteImage}
}
export default useStorage