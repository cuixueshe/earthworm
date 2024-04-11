<template>
  <template v-if="currentGameMode === GameMode.Dictation">
    <DictationMode></DictationMode>
  </template>
  <template v-else-if="currentGameMode === GameMode.ChineseToEnglish">
    <ChineseToEnglishMode></ChineseToEnglishMode>
  </template>
  <template v-else-if="currentGameMode === GameMode.Music">
    <MusicMode></MusicMode>
  </template>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ChineseToEnglishMode from "~/components/mode/chineseToEnglish/ChineseToEnglishMode.vue";
import DictationMode from "~/components/mode/dictation/DictationMode.vue";
import MusicMode from "~/components/mode/music/MusicMode.vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import AuthRequired from "./AuthRequired.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";

const { currentGameMode } = useGameMode();

onMounted(() => {
  courseTimer.reset();
});
</script>
