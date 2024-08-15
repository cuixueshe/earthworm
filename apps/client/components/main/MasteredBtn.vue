<template>
  <button
    class="btn btn-outline btn-sm"
    @click="handleMastered"
  >
    掌握
  </button>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

import { useMastered } from "~/composables/main/useMastered";
import { isAuthenticated } from "~/services/auth";

const { handleMastered } = useMasteredShortcut();

function useMasteredShortcut() {
  const { markStatementAsMastered } = useMastered();

  function handleMastered() {
    if (!isAuthenticated()) {
      toast.warning("需要登录哦");
      return;
    }

    markStatementAsMastered();
  }

  return {
    handleMastered,
  };
}
</script>

<style scoped></style>
