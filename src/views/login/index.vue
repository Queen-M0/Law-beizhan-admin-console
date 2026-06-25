<template>
  <div class="login-page">
    <div class="login-page__veil"></div>
    <div class="login-page__emblem"></div>
    <div class="login-orb login-orb--one"></div>
    <div class="login-orb login-orb--two"></div>

    <div class="login-panel">
      <div class="login-panel__hero">
        <p class="eyebrow">LAW BEIZHAN ADMIN</p>
        <h1>北展法律集团后台管理系统</h1>
        <p class="desc">
          以更克制的结构、更高级的视觉和更顺手的交互，管理官网内容、咨询线索和基础配置。
        </p>

        <div class="hero-metrics">
          <div>
            <strong>8</strong>
            <span>核心模块</span>
          </div>
          <div>
            <strong>1</strong>
            <span>最小闭环</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>后台独立鉴权</span>
          </div>
        </div>
      </div>

      <el-card shadow="never" class="login-card">
        <template #header>
          <div class="login-card__header">
            <div>
              <strong>管理员登录</strong>
              <p>请输入手机号和密码。</p>
            </div>
            <el-button link @click="fillDemoAccount">填充测试账号</el-button>
          </div>
        </template>

        <div class="test-account">
          <p><span>测试账号</span>13540805374</p>
          <p><span>测试密码</span>12345678</p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @keyup.enter="handleSubmit"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" maxlength="11" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" class="submit-btn" @click="handleSubmit">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { showSuccessMessage } from '@/utils/message'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  phone: '',
  password: '',
})

const rules: FormRules<typeof form> = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的 11 位手机号', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

function fillDemoAccount() {
  form.phone = '13540805374'
  form.password = '12345678'
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)

  if (!valid) {
    return
  }

  loading.value = true

  try {
    await authStore.login(form)
    showSuccessMessage('登录成功')
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 20%, rgba(59, 130, 246, 0.18), transparent 28%),
    radial-gradient(circle at 82% 78%, rgba(245, 158, 11, 0.16), transparent 24%),
    linear-gradient(135deg, #edf3fa 0%, #e7eef8 42%, #f7f4ee 100%);
}

.login-page::before,
.login-page::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-page::before {
  background:
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px) 0 0 / 96px 96px,
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px) 0 0 / 96px 96px;
  mask-image: radial-gradient(circle at center, black 42%, transparent 100%);
  opacity: 0.3;
}

.login-page::after {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0.08)),
    radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.7), transparent 22%);
  opacity: 0.6;
}

.login-page__veil {
  position: absolute;
  inset: auto -6% -12% auto;
  width: 56vw;
  height: 72vh;
  background:
    radial-gradient(circle at 72% 36%, rgba(245, 158, 11, 0.16), transparent 20%),
    radial-gradient(circle at 38% 70%, rgba(16, 185, 129, 0.06), transparent 18%);
  filter: blur(24px);
  opacity: 0.75;
}

.login-page__emblem {
  position: absolute;
  right: 4%;
  top: 10%;
  width: min(42vw, 620px);
  height: min(42vw, 620px);
  opacity: 0.18;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='120' y1='100' x2='660' y2='720' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231E3A8A'/%3E%3Cstop offset='1' stop-color='%23F59E0B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='400' cy='400' r='300' stroke='url(%23g)' stroke-width='10' opacity='.24'/%3E%3Cpath d='M400 160l150 70v60h-300v-60l150-70z' fill='url(%23g)' opacity='.18'/%3E%3Cpath d='M250 310h300v34H250zm28 34h52v158h-52zm220 0h52v158h-52zm-122 0h24v158h-24zM220 486h360v24H220zm40 24h280v22H260z' fill='url(%23g)' opacity='.2'/%3E%3Cpath d='M205 604h390' stroke='url(%23g)' stroke-width='14' stroke-linecap='round' opacity='.18'/%3E%3Cpath d='M400 270c0 76-34 132-88 170m88-170c0 76 34 132 88 170M312 440l-34 52m0 0h68m-34-52l34 52m122-52l-34 52m0 0h68m-34-52l34 52' stroke='url(%23g)' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' opacity='.28'/%3E%3C/svg%3E")
+    center / contain no-repeat;
  filter: drop-shadow(0 24px 54px rgba(15, 23, 42, 0.12));
}

.login-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(6px);
  opacity: 0.75;
}

.login-orb--one {
  top: 8%;
  left: 6%;
  width: 220px;
  height: 220px;
  background:
    radial-gradient(circle at 36% 36%, rgba(59, 130, 246, 0.28), rgba(59, 130, 246, 0.08) 55%, transparent 72%);
}

.login-orb--two {
  right: 5%;
  bottom: 10%;
  width: 260px;
  height: 260px;
  background:
    radial-gradient(circle at 44% 44%, rgba(245, 158, 11, 0.28), rgba(245, 158, 11, 0.08) 56%, transparent 74%);
}

.login-panel {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 440px;
  gap: 42px;
  width: min(1120px, 100%);
  align-items: center;
}

.login-panel__hero {
  padding: 20px 10px;
  text-shadow: 0 8px 24px rgba(255, 255, 255, 0.5);

  h1 {
    margin: 0 0 18px;
    font-size: clamp(38px, 6vw, 60px);
    line-height: 1.05;
    color: #0f172a;
    letter-spacing: 0.02em;
  }
}

.eyebrow {
  margin: 0 0 14px;
  color: #f59e0b;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.2em;
}

.desc {
  max-width: 540px;
  margin: 0;
  color: #475569;
  font-size: 16px;
  line-height: 1.8;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 560px;
  margin-top: 28px;

  div {
    padding: 18px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(148, 163, 184, 0.18);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
  }

  strong {
    display: block;
    margin-bottom: 6px;
    color: #0f172a;
    font-size: 24px;
  }

  span {
    color: #64748b;
    font-size: 13px;
  }
}

.login-card {
  border: none;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  box-shadow:
    0 28px 72px rgba(15, 23, 42, 0.14),
    0 2px 0 rgba(255, 255, 255, 0.72) inset;
}

.login-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 6px 0 0;
    color: #6b7280;
    font-size: 13px;
  }
}

.test-account {
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  p {
    margin: 0;
    color: #475569;
    font-size: 13px;
    line-height: 1.8;
  }

  p + p {
    margin-top: 4px;
  }

  span {
    display: inline-block;
    min-width: 60px;
    margin-right: 8px;
    color: #0f172a;
    font-weight: 700;
  }
}

.submit-btn {
  width: 100%;
  height: 46px;
  border: none;
  background: linear-gradient(135deg, #1d4ed8, #2563eb 52%, #f59e0b);
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.22);
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #334155;
}

@media (max-width: 1100px) {
  .login-panel {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .login-page__emblem {
    right: -6%;
    top: 6%;
    width: 520px;
    height: 520px;
  }
}

@media (max-width: 720px) {
  .login-page {
    padding: 18px;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
  }

  .login-card__header {
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }
}
</style>
