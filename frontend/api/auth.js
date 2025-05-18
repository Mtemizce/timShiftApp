// frontend/api/auth.js
import { api } from '../lib/api'

export const loginRequest = (credentials) =>
  api('/auth/login', 'POST', credentials)

export const getMe = () =>
  api('/auth/me')
