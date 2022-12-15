import { useEffect, useState } from "react";

export const useAuth = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [validation,setvalidation]=useState(null)
	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			setIsPending(true);
			try {
				setError(null);
				const res = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        "authorization": `Bearer ${localStorage.getItem("token")}`
                    }
				});
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
				setData(data);
				setIsPending(false);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("The fetch was aborted");
				} else {
					setIsPending(false);
					setError(error.message);
				}
			}
		};
		fetchData();
		return () => controller.abort();
	}, [url]);

	return { data, isPending, error, validation};
};
