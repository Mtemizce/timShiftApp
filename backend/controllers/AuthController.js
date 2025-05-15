import AuthService from '../services/AuthService.js'

const AuthController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const token = await AuthService.login(username, password)
      res.json({ token })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  },

  me: async (req, res) => {
    res.json({ user: req.user })
  },

  logout: async (req, res) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(400).json({ message: 'Token bulunamadı' })

    await AuthService.logout(token)
    res.json({ message: 'Çıkış yapıldı' })
  } catch (err) {
    res.status(500).json({ message: 'Logout hatası', error: err.message })
  }
}


}

export default AuthController
