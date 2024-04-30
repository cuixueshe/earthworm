<template>
  <div class="relative my-8 flex items-center justify-center">
    <div class="z-10 flex items-center justify-center">
      <td class="w-[300px] text-center">
        <div class="join mr-12">
          <input
            v-for="mode in getTipOptions()"
            class="btn join-item btn-sm"
            type="radio"
            name="gameMode"
            :value="mode.value"
            :aria-label="mode.label"
            :checked="currentTip === mode.value"
            @change="toggleTipItem(mode.value as TipItem)"
          />
        </div>
      </td>
    </div>
    <!-- <PrevAndNextBtn /> -->
  </div>
</template>

<script setup lang="ts">
import { TipItem, useTips } from "~/composables/music/tip";

const { currentTip, getTipOptions, toggleTipItem } = useTips();
</script>
