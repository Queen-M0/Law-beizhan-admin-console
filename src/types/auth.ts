export interface LoginForm {
  phone: string
  password: string
}

export interface LoginPayload {
  phoneNumber: string
  password: string
}

export interface AdminLoginPayload {
  username: string
  password: string
}

export interface UserProfile {
  name: string
  phone: string
}
