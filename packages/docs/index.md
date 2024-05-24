---
layout: home
---

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'

// 直接跳转到文档
// 不显示主页
const router = useRouter()
router.go("/get-started/")

</script>
