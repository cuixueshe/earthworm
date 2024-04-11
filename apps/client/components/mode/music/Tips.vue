<template>
  <div class="relative flex items-center justify-center my-8">
    <div class="z-10 flex items-center justify-center">
      <td class="w-[300px] text-center">
        <div class="mr-12 join">
          <input
            v-for="mode in getTipOptions()"
            class="join-item btn btn-sm"
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
    <PrevAndNextBtn />
  </div>
</template>

<script setup lang="ts">
import PrevAndNextBtn from "~/components/main/PrevAndNextBtn.vue";
import { TipItem, useTips } from "./tips";

const { currentTip, getTipOptions, toggleTipItem } = useTips();
</script>
