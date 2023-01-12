import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import Topbar from "../../components/topbar/Topbar";
import "./uploadImage.css";

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const formData = new FormData();
    
        const changeHandler = (event) => {
            setSelectedFile(event.target.files[0]);

        };

    function FileUploadPage(){
            formData.append('file', selectedFile);
            fetch("/v1/uploadImage", {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
                method: "POST",
                body: formData
              })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
       
        };

   
    return (
      <div>
        <Topbar/>
    <div className="upload">
      <div className="uploadWrapper">
        <div className="uploadLeft">
          <h3 className="uploadLogo">Tomcat</h3>
          <span className="uploadDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="uploadRight">
          <div className="uploadBox">
            <h1>Change your profile image</h1>
            <input type="file" name="file" onChange={changeHandler} />
           <button className="uploadButton" onClick={FileUploadPage}>Save</button>
          </div>
        </div>
      </div>
    </div>

      </div>
        
    );
};

export default UploadImage;