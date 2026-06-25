<template>
  <section class="page-card placeholder">
    <div>
      <p class="placeholder__tag">{{ tag }}</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tag: string
  description: string
}>()
</script>

<style scoped lang="scss">
.placeholder {
  min-height: 240px;
  display: flex;
  align-items: center;
}

.placeholder__tag {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0 0 12px;
}

p:last-child {
  margin: 0;
  color: #6b7280;
  line-height: 1.7;
}
</style>
