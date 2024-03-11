<template>
  <div class="max-w-[42rem]">
    <table class="text-xs border-separate border-spacing-1/2">
      <thead>
        <th></th>
        <th :colspan="colspan" v-for="{ colspan, month } in thead" :key="month" class="text-left font-normal">
          {{ month }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tbody" :key="weeks[i]">
          <td class="relative w-8">
            <span class="absolute bottom-[-3px]">{{ i % 2 !== 0 ? weeks[i] : '' }}</span>
          </td>
          <td class="p-0" v-for="(cell, j) in row" :key="j">
            <div v-if="cell" class="tooltip block" :data-tip="cell.tips">
              <div :class="`cell ${cell.bg}`"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-between px-8">
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-xs">{{ year || yearOptions[0].label }}</div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="item in yearOptions" :key="item.value" @click="initTable(item.value)"><a>{{ item.label }}</a></li>
        </ul>
      </div>

      <div class="flex items-center gap-1 text-xs">
        <div>Less</div>
        <div class="cell"></div>
        <div class="cell low"></div>
        <div class="cell moderate"></div>
        <div class="cell high"></div>
        <div class="cell veryhigh"></div>
        <div>More</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useCalendarGraph } from '~/composables/user/calendarGraph'
import type { CalendarData, EmitsType } from '~/composables/user/calendarGraph'

const props = defineProps<{ data: CalendarData[] }>()
const emits = defineEmits<EmitsType>()

const { initTable, renderBody, weeks, thead, tbody, year, yearOptions } = useCalendarGraph(emits)

onMounted(() => {
  initTable()
})

watchEffect(() => {
  tbody.value = renderBody(props.data)
  console.log(`( CalendarGraph.vue: tbody.value )===============>`, tbody.value);
})

</script>

<style scoped>
.cell {
  @apply w-2.5 h-2.5 rounded-sm bg-[#ebedf0] dark:bg-[#2d333b];
}

.low {
  @apply bg-[#9be9a8] dark:bg-[#0e4429];
}

.moderate {
  @apply bg-[#40c463] dark:bg-[#006d32];
}

.high {
  @apply bg-[#30a14e] dark:bg-[#26a641];
}

.veryhigh {
  @apply bg-[#216e39] dark:bg-[#39d353];
}
</style>
