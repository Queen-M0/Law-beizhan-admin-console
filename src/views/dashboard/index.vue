<template>
  <div class="dashboard">
    <section class="dashboard__header">
      <div>
        <p class="dashboard__tag">DASHBOARD</p>
        <h2>后台工作台</h2>
        <p>
          这里是北展法律集团后台管理系统的统一入口，主要处理内容运营、咨询管理、站点配置和团队资料维护。
        </p>
      </div>
    </section>

    <section class="dashboard-grid">
      <article class="info-card">
        <h3>登录已接入</h3>
        <p>当前后台已切换为统一登录方式，后续页面都可以沿用同一套权限和会话逻辑。</p>
      </article>
      <article class="info-card">
        <h3>人物管理</h3>
        <p>律师和专家页面共用同一套表单和列表逻辑，后续只需要维护统一人物模型。</p>
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: grid;
  gap: 20px;
}

.dashboard__header {
  padding: 2px 2px 0;
}

.dashboard__tag {
  margin: 0 0 8px;
  color: #b26b00;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.dashboard__header h2 {
  margin: 0;
  color: #16263a;
  font-size: 28px;
}

.dashboard__header p {
  margin: 10px 0 0;
  max-width: 820px;
  color: #64748b;
  line-height: 1.8;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.info-card {
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(15, 28, 44, 0.08);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

.info-card h3 {
  margin: 0 0 10px;
  color: #16263a;
}

.info-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.8;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
