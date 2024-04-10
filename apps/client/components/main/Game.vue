<template>
  <template v-if="currentGameMode === GameMode.Dictation">
    <DictationMode></DictationMode>
  </template>
  <template v-else-if="currentGameMode === GameMode.ChineseToEnglish">
    <ChineseToEnglishMode></ChineseToEnglishMode>
  </template>
  <Tips></Tips>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
  <MusicAudio></MusicAudio>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ChineseToEnglishMode from "~/components/mode/chineseToEnglish/ChineseToEnglishMode.vue";
import DictationMode from "~/components/mode/dictation/DictationMode.vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import MusicAudio from "./Audio.vue";
import AuthRequired from "./AuthRequired.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { currentGameMode } = useGameMode();

onMounted(() => {
  courseTimer.reset();
});
</script>
