import api from './axios'

export const loginUser = async (username, password) => {
  // We disable the automatic toast error here since we handle login errors inside the Login component
  const response = await api.post(
    '/auth/login',
    { username, password },
    { showToast: false }
  )
  return response.data
}
