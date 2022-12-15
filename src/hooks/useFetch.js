import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET",istoken) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)
  const [validation,setvalidation]=useState(null)

  const postData = (postData) => {
    if(istoken){
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      "authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(postData)
    })}
    if(!istoken){
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
       
        },
        body: JSON.stringify(postData)
      })}
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, 
          { ...fetchOptions, signal: controller.signal })
       
        const data = await res.json()
        console.log(data)
        if(!data.success){
if(data.data){
  if(data.data.name&&
    data.data.password&&
    data.data.email){
      setvalidation(
      `${data.data.name}`  
      `${data.data.email}`  
      `${data.data.password}`  
      )
    }
    else if(data.data.name){
      setvalidation(data.data.name)
    }
    else if(data.data.password){
      setvalidation(data.data.password)
    } else if(data.data.email){
      setvalidation(data.data.email)
    }
}else{
  setvalidation(data.message)
}
throw new Error(data.message)
        }
        setvalidation(data.message)
        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError(err.message)
        }
      }
    }

    // invoke the function
    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error,validation, postData }
}