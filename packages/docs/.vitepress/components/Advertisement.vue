<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #aside-ads-before>
      <div class="advertising">
        <div>
          <a
            href="https://learn.cuixueshe.com/p/t_pc/goods_pc_detail/goods_detail/p_63f3795ee4b06159f73e6452?product_id=p_63f3795ee4b06159f73e6452"
          >
            广告位
          </a>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
.advertising {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 12px;
  min-height: 256px;
  text-align: center;
  line-height: 18px;
  font-size: 13px;
  font-weight: 500;
  background-color: var(--vp-c-bg-alt);
}
</style>
