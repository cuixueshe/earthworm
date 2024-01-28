<template>
    <div v-if="showLoading" class="loading-container">
        <div class="loading-square"></div>
    </div>
</template>
  
<script setup lang="ts">
defineProps({
    showLoading: Boolean
});
</script>
  
<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.loading-square {
    width: 50px;
    height: 50px;
    background-color: #7a7dbd;
    animation: spin 1s linear infinite;
    border-radius: 8px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
    
  
  
  