import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo192.png'
import {useFetch} from '../hooks/useFetch'
import Clients from "./Clients";
import './SigninComp.css'
import {useAuthContext} from '../hooks/useAuthContext'

export default function Sigin() {
  const { dispatch } = useAuthContext()
	const navigation = useNavigate()
  const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const {data, isPending, error,validation, postData}=useFetch('https://auth-system-production.up.railway.app/v1/api/auth/signup', "POST");
 function handleSubmit(e){
  e.preventDefault();
  postData({
    
    email,
    password
  })  

	clearHandle();
	};

	const clearHandle = () => {
		setEmail("");
		setPassword("");
	};
 useEffect(()=>{
  if(data){
if(data.success){
localStorage.setItem("token",data.data.accessToken)
dispatch({ type: 'LOGIN', payload: data.success })
			navigation('/tools')
}
  }
},[data , navigation])
  return (
    <div className="signin">
      <div className="left">
        <img src={logo} alt="logo" />
        <h2>Continue to AI</h2>
        <form  className='frm' onSubmit={handleSubmit}>
           
            <div>
                <label htmlFor="">Email</label>
                <br /> <input type="email"
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <br /> <input type="password" 
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}/>
            </div>
            {!isPending&& <div className="btn">
              <button>
                <Link to="/tools" className='li'>
                  SIGNIN</Link></button>
            </div>}
            {isPending &&
            <div className="btn" disabled><button>Loading..</button></div>}
           {validation&& 
           <p className='alert'>{validation}</p>}
           {error&& <p>{error}</p>}
            <div className="terms">
              <p>Don't have an Account<Link className="signed"
              to='/signup'>Signup</Link></p>
            </div>
        </form>
        </div>
        <div className="right">
        <Clients />
        </div>
    </div>

  )
}
