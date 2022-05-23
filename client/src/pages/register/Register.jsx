import axios from 'axios'
import {useState, useEffect} from 'react'
import "./register.css"

export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
   try {
    const res = await axios.post("/auth/register" , {
      username, email, password // items that we need to insert for registration
    })
    // console.log(res);
    res.data && window.location.replace('/login')

   } catch (error) {
     setError(true)
   }
  }

  
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
           className="registerInput" 
           type="text" 
           placeholder="Enter your username..."
           onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input 
           className="registerInput" 
           type="email" 
           placeholder="Enter your email..." 
           onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input 
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..." 
          onChange={(e) => setPassword(e.target.value)}/>
        <button
           className="registerButton"
           type='submit'
           >Register
           </button>
           {error && <span style={{color:'red'}}>something is wrong</span>}
      </form>
        
    </div>
    )
}