<template>
  <div class="layout-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand__mark">BZ</div>
        <div>
          <strong>北展后台</strong>
          <p>Admin Console</p>
        </div>
      </div>

      <el-menu
        class="menu"
        :default-active="activeMenu"
        router
        background-color="transparent"
        text-color="#dbe4f0"
        active-text-color="#ffffff"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon v-if="item.icon">
            <component :is="icons[item.icon]" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </aside>

    <section class="main-panel">
      <header class="topbar">
        <div>
          <p class="topbar__eyebrow">LAW BEIZHAN ADMIN</p>
          <h1>{{ currentTitle }}</h1>
          <p class="topbar__desc">围绕内容、咨询和站点配置的后台管理控制台。</p>
        </div>

        <div class="topbar__actions">
          <div class="user-meta">
            <strong>{{ authStore.user?.name || '管理员' }}</strong>
            <span>{{ authStore.user?.phone || '-' }}</span>
          </div>
          <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
        </div>
      </header>

      <main class="content">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChatDotRound,
  Document,
  House,
  OfficeBuilding,
  Picture,
  Setting,
  Star,
  Tickets,
  User,
} from '@element-plus/icons-vue'
import { menuRoutes } from '@/router/routes'
import { useAuthStore } from '@/store/modules/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const icons: Record<string, Component> = {
  ChatDotRound,
  Document,
  House,
  OfficeBuilding,
  Picture,
  Setting,
  Star,
  Tickets,
  User,
}

const menuItems = menuRoutes.map((routeItem) => ({
  path: routeItem.path,
  title: String(routeItem.meta?.title || ''),
  icon: String(routeItem.meta?.icon || ''),
}))

const activeMenu = computed(() => route.path)
const currentTitle = computed(() => String(route.meta.title || '后台管理'))

function handleLogout() {
  authStore.logout(false)
  router.push('/login')
}
</script>

<style scoped lang="scss">
.layout-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(245, 158, 11, 0.14), transparent 22%),
    linear-gradient(180deg, #f4f7fb 0%, #eef3f9 100%);
}

.sidebar {
  position: relative;
  padding: 22px 16px;
  color: #fff;
  background:
    linear-gradient(180deg, rgba(8, 15, 30, 0.98), rgba(17, 29, 54, 0.98)),
    radial-gradient(circle at top, rgba(245, 158, 11, 0.16), transparent 30%);
  box-shadow: 12px 0 36px rgba(15, 23, 42, 0.12);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 22px;

  p {
    margin: 4px 0 0;
    color: #8ea0b8;
    font-size: 12px;
    letter-spacing: 0.08em;
  }
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #fbbf24, #f97316);
  color: #111827;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(251, 191, 36, 0.24);
}

.menu {
  border-right: none;
}

.menu :deep(.el-menu-item) {
  margin: 8px 0;
  border-radius: 14px;
}

.menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(59, 130, 246, 0.14));
}

.main-panel {
  display: grid;
  grid-template-rows: auto 1fr;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.74);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.topbar__eyebrow {
  margin: 0 0 8px;
  color: #f59e0b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.topbar h1 {
  margin: 0 0 6px;
  font-size: 24px;
  color: #0f172a;
}

.topbar__desc {
  margin: 0;
  color: #64748b;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 13px;
  color: #475569;
}

.content {
  padding: 26px 30px 34px;
}

@media (max-width: 960px) {
  .layout-shell {
    grid-template-columns: 1fr;
  }

  .topbar,
  .topbar__actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
