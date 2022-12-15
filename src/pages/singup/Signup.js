import { Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/logo192.png'
import Clients from '../../components/Clients'
import './Signup.css'
import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Signup() {
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const { dispatch } = useAuthContext()
	const navigation = useNavigate()

  const {data, isPending, error ,validation, postData}=useFetch('https://auth-system-production.up.railway.app/v1/api/auth/signup', "POST");
  function handleSubmit(e){
    e.preventDefault();
    postData({
      name,
      email,
      password
    })  }
    useEffect(()=>{
      if(data){
if(data.success){
  localStorage.setItem("token",data.data.accessToken)
  dispatch({ type: 'LOGIN', payload: data.success })
				navigation('/tools')
}
      }
    },[data ,navigation])

  return (
    <div className='signup'>
       <div className="left">
        <img src={logo} alt="logo" />
        <h2>Continue to AI</h2>
        <form onSubmit={handleSubmit} className='frm'>
            <div>
                <label htmlFor="">Name</label>
               <br /> 
               <input  
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  />

            </div>
            <div>
                <label htmlFor="">Email</label>
                <br /> <input type="email" 
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 required
                 />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <br /> <input type="password" 
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
                 required
                 />
            </div>
           {!isPending&& <div className="btn"><button>SIGNUP</button></div>}
            {isPending &&
            <div className="btn" disabled><button>Loading..</button></div>}
           
           {validation&& <p className='alert'>{validation}</p>}
            <div className="terms">
               <p className='check'> <input type="checkbox" />Accept T&Cs and Privacy Policy</p>
              <p>Already have an Account<Link className='signed'
               to='/signin'>Signin</Link></p>
            </div>
        </form>
        </div>
      <div className="right">
<Clients />
      </div>
     
    </div>
  )
}
