<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlistDetails">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete source list</button>
    </div>
    <div class="songList">
      <div v-if="!playlist.songs.length">Nothing here ^_^</div>
      <div v-for="link in playlist.songs" :key="link.id" class="singleSong">
        <a class="details" :href="link.link" target="_blank">
          <div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.type }}</p>
          </div>
          <div class="box" v-if="link.coverUrl">
            <a :href="link.coverUrl">Download</a>
          </div>
        </a>
        <button v-if="ownership" @click="handleDeleteLink(link.id)">
          Delete
        </button>
      </div>
      <AddFile v-if="ownership" :playlist="playlist" />
      <div v-else>
        <SavePlaylist :playlist="playlist" />
      </div>
    </div>
  </div>
</template>

<script>
import AddFile from "@/components/AddFile.vue";
import SavePlaylist from "@/components/SavePlaylist.vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed } from "@vue/runtime-core";
import router from "@/router";
export default {
  props: ["id"],
  components: { AddFile, SavePlaylist },
  setup(props) {
    const { deleteImage } = useStorage();
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { user } = getUser();
    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId === user.value.uid
      );
    });
    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };
    const handleDeleteLink = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id);
      await updateDoc({ songs });
    };
    return { error, playlist, ownership, handleDelete, handleDeleteLink };
  },
};
</script>

<style>
.playlistDetails {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* max-width: 200%;
    max-height: 200%; */
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.singleSong {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--primary);
  margin-bottom: 20px;
}
.details {
  width: 100%;
}
.box {
  display: block;
  margin: auto;
  text-align: center;
}
.box a {
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 2px;
  font-weight: bolder;
  background: #ebebeb;
}
</style>
