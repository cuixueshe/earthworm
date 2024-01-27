<template>
    <dialog id="rank-progress" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Rank</h3>
            <div v-if="data.list.length === 0" class="py-3">暂无数据</div>
            <div v-else v-for="(item, index) in data.list" key="item.username" class="flex">
                <div>{{ index + 1 }}</div>
                <div>{{ item.username }}</div>
            </div>
            <div v-if="data.self === null && userStore.user">
                您还没有参加过游戏
            </div>
            <div v-else-if="!userStore.user">
                您还未登录
            </div>
            <div v-else>
                您的排名是：{{ Number(data.self) + 1 }}
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { fetchProgressRank } from '~/api/rank';
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const data = ref<ProgressRankVo>({
    list: [],
    self: null
})

onMounted(async () => {
    const res = await fetchProgressRank()
    data.value = res
})
</script>