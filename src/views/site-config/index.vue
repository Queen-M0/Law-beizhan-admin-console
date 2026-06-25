<template>
  <admin-form-page
    tag="SITE CONFIG"
    title="站点配置"
    description="统一维护站点名称、联系方式、关于模块基础文案等配置。"
    :form-fields="formFields"
    :default-form="defaultForm"
    :load-api="loadApi"
    :save-api="saveApi"
  />
</template>

<script setup lang="ts">
import AdminFormPage from '@/components/admin-form-page.vue'
import { getSiteConfig, updateSiteConfig } from '@/api/admin'
import type { AdminFormField } from '@/types/admin'

const formFields: AdminFormField[] = [
  { prop: 'siteName', label: '站点名称', required: true, span: 12 },
  { prop: 'siteSubtitle', label: '站点副标题', span: 12 },
  { prop: 'phone', label: '联系电话', span: 12 },
  { prop: 'location', label: '地理位置', span: 12 },
  { prop: 'address', label: '地址', span: 12 },
  { prop: 'email', label: '邮箱', span: 12 },
  { prop: 'aboutTitle', label: '关于模块标题', span: 12 },
  { prop: 'aboutIntro', label: '关于模块简介', type: 'textarea', rows: 3, span: 24 },
  { prop: 'aboutParagraphOne', label: '关于段落一', type: 'textarea', rows: 4, span: 24 },
  { prop: 'aboutParagraphTwo', label: '关于段落二', type: 'textarea', rows: 4, span: 24 },
  { prop: 'aboutBadge', label: '关于标签', span: 12 },
  { prop: 'consultationTitle', label: '咨询模块标题', span: 12 },
  { prop: 'consultationIntro', label: '咨询模块简介', type: 'textarea', rows: 3, span: 24 },
]

function defaultForm() {
  return {
    siteName: '',
    siteSubtitle: '',
    phone: '',
    location: '',
    address: '',
    email: '',
    aboutTitle: '',
    aboutIntro: '',
    aboutParagraphOne: '',
    aboutParagraphTwo: '',
    aboutBadge: '',
    consultationTitle: '',
    consultationIntro: '',
  }
}

function loadApi() {
  return getSiteConfig()
}

function saveApi(payload: Record<string, unknown>) {
  return updateSiteConfig(payload)
}
</script>

