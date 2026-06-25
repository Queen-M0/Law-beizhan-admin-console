import { ElMessage } from 'element-plus'

export function showErrorMessage(message: string) {
  ElMessage.error(message)
}

export function showSuccessMessage(message: string) {
  ElMessage.success(message)
}
