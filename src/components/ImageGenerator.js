import './ImageGenerator.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
export default function ImageGenerator({user, login, image, value } ) {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('')
const [num, setNum] = useState('')
const [validations, setValidation] = useState(null)

const { data, validation, error, isPending, postData } =
 useFetch("https://auth-system-production.up.railway.app/v1/api/openai/image-generator", "POST", true);

  const handleSubmit = ((e) => {
  e.preventDefault()
  if (parseInt(num) === 1 || 
  parseInt(num) === 2 || 
  parseInt(num) === 3) {
    if (user) {
      postData({ prompt, num: parseInt(num), size });
      
      setValidation('')
      clearHandle(e)
    } else {
      setValidation('Sign in to Proceed Further')
     image(false)
     login(true)
    }
  } 
  else {
    setValidation("number should be in range of 1 to 3")
  }
}
)

console.log(data)

useEffect(() => {
  if (error === "User does not exist") {
    setValidation(error)
    image(false)
    login(true)
  }
  if (error === "Invalid token") {
    setValidation(error)
    image(false)
    login(true)
  }
}, [error])

  const clearHandle = (e) => {
      e.preventDefault()
      setPrompt('')
      setSize('')
      setNum('')
  }

  return (
    <div>
      <div className="ai-gene">
      <div className="left">
        <div className="top">
          <h3>{value.name}</h3>
          <button>More AI Tools</button>
        </div>
<form onSubmit={handleSubmit}>
        <div className="in">
          {value.textInputs.map(
            (val) =>
              (val.type === 'textarea' && (  <label key={val.key} htmlFor="" ><span className='lab'>{val.label} <span className='sp asterick'>*</span></span> 
                <textarea
                  name=""
                  id=""
                  placeholder={val.placeholder}
                  onChange = {(e) => setPrompt(e.target.value)}
                  value={prompt}
                >
               
                </textarea><br />
               <span className='sp'> {val.minLimit}/{val.maxLimit}</span> </label>
              )) ||
              (val.type === 'option' && <label key={val.key} htmlFor=""><span className='lab'>{val.name}</span><br /> 
              	<select
									name={val.name}
									onChange={(e) => setSize(e.target.value)}
								>
									{val.placeholder.map((opt) => (
										<option key={opt} value={size}>
											{opt}
										</option>
									))}
                  </select>


              </label>) ||
              (val.type === 'text' && <label key={val.key}  htmlFor=""><span className='lab'>{val.name} </span><br />
              <input type="text" 
              onChange = {(e) => setNum(e.target.value)}
              value={num}
              />
              </label>)
          )}
        </div>
       
{validations && <p>{validations}</p>}
        <div className="btn">
          <button onClick={clearHandle}>Clear Input</button>
          {!isPending && <button>Create</button>}
					{isPending && <button disabled>Loading...</button>}
        </div>
        </form>
      </div>
      <div className="right">
        <h3>Image Result</h3>
        <div>
          {data && data.data.map(val => console.log(val))}
        </div>
      </div>
      </div>
    </div>
  )
}
