import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import SigninComp from "../../components/SigninComp";
import ImageGenerator from "../../components/ImageGenerator";
import GetImage from "./GetImage";


export default function GenerateImage({ data }) {
    
    const [image, setImage] = useState(true)
    const [login, setLogin] = useState(false)
    const { user} = useAuthContext()

    return (
        <div className="image-generator">
           
            <div className="tool-body image-generator-body">
                <ImageGenerator user={user} setLogin={setLogin} setImage={setImage} data={data} />
                {image && <GetImage user={user} data={data} />}
                {login && <SigninComp />}
			</div>
        </div>
  )
}
