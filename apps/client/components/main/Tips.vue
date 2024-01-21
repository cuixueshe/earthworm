<template>
  <div>
    <TipItem
      text="tab"
      description="show answer"
      keyboardKey="Tab"
      handler="{handleToAnswer}"
    ></TipItem>
    <TipItem
      text="control"
      description="play soundmark"
      keyboardKey="Control"
      handler="{playSound}"
    ></TipItem>
  </div>
</template>

<script setup lang="ts">
import TipItem from "./TipItem.vue";
</script>

<style scoped></style>
