import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";

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
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
       
        };

    return (
        <div>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={FileUploadPage}>Submit</button>
			</div>
		</div>
    );
};

export default UploadImage;