<template>
  <div class="addSong">
    <button v-if="!showForm" @click="showForm = true">Add Sources</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a new source</h4>
      <input type="text" placeholder="Title" required v-model="title" />
      <input type="text" placeholder="Type" required v-model="type" />
      <input type="text" placeholder="Link" required v-model="link" />
      <input type="file" placeholder="Choose file" @change="handleChange" />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
export default {
  props: ["playlist"],
  setup(props) {
    const { updateDoc } = useDocument("playlists", props.playlist.id);

    const showForm = ref(false);
    const title = ref(null);
    const type = ref(null);
    const link = ref(null);
    const file = ref(null);
    const { url, path, uploadImage } = useStorage();
    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);
      }
      const newLink = {
        title: title.value,
        type: type.value,
        link: link.value,
        filePath: path.value,
        coverUrl: url.value,
        id: Math.floor(Math.random() * 1000000),
      };
      await updateDoc({
        songs: [...props.playlist.songs, newLink],
      });
      title.value = "";
      link.value = "";
      type.value = "";
      showForm.value = false;
    };
    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = "Please select an image file of thye (png ot jpeg)";
      }
    };
    return { title, type, link, showForm, handleSubmit, handleChange };
  },
};
</script>

<style scoped>
.addSong {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
  border-radius: 10px;
}
</style>
