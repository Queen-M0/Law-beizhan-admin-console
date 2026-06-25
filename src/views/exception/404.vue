<template>
  <div class="page-card not-found">
    <p>404</p>
    <h2>页面不存在</h2>
    <el-button type="primary" @click="$router.push('/dashboard')">返回工作台</el-button>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 320px;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 12px;

  p {
    margin: 0;
    color: #2563eb;
    font-size: 56px;
    font-weight: 700;
  }

  h2 {
    margin: 0;
  }
}
</style>

