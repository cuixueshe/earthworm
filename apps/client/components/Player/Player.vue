<script setup lang="ts">
  import { onMounted } from "vue";
  import Player from "xgplayer";
  import "xgplayer/dist/index.min.css";

  import Poster from "~/assets/demo-video.png";

  const props = defineProps({
    videoUrl: String,
  });

  onMounted(() => {
    let player = new Player({
      id: "player",
      url: props.videoUrl,
      width: "85%",
      height: 650,
      poster: Poster,
      videoFillMode: "fill",
      commonStyle: {
        playedColor: "#9d59ef",
        volumeColor: "#9d59ef",
      },
    });
  });
</script>

<template>
  <div id="player"></div>
</template>

<style>
  .xgplayer .xg-options-list li:hover,
  .xgplayer .xg-options-list li.selected {
    opacity: 1;
    color: #9d59ef;
  }
</style>
