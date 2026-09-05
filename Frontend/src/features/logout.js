import api from '../../utils/axios.js'

async function logout() {
  try {
    const {data} = await api.get("/api/auth/logout")
    console.log(data);
    
  } catch (error) {
    return res.status(500).json({LogoutErr:`${error}`})
  }
}

export default logout