import React from 'react';
import {UploadMultipleImageRequest, UploadRequest} from "../ApiServices/UploadApiRequest";
import {FaCloudUploadAlt} from "react-icons/fa";


const UploadPage = () => {

    const handleClick = async () => {
        let myFile = document.getElementById('file').files[0];
        let formData = new FormData();
        formData.append("image", myFile);
        await UploadRequest(formData);
    }





    const uploadFiles = async () => {
        let myFiles = document.getElementById('files').files;
        let formData = new FormData();

        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }

        await UploadMultipleImageRequest(formData);
    }






    const clickImage = () => {
        let fileInput = document.getElementById("file-input");
        fileInput.click();
    }

   /* const handleChange = async ()=>{
        let myFile = document.getElementById("file-input").files[0];
        let formData = new FormData();
        formData.append("image", myFile);
        await UploadRequest(formData);

    }

    */


    const handleChange = async ()=>{
        let myFiles = document.getElementById('file-input').files;
        let formData = new FormData();

        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }

        await UploadMultipleImageRequest(formData);
    }



    return (
        <>



            <div className="m-5 p-5">
                <b>Upload Single Picture</b>
                <br/> <br/>
                <input className="form-control w-25 form-control-lg" id="file" type="file" />
                <br/>
                <button onClick={handleClick} className="btn btn-primary">Upload</button>
            </div>

            <br/> <br/>

            <div className="mt-5 p-5">
                <b>Upload Multiple Picture</b>
                <br/> <br/>
                <input className="form-control w-25 form-control-lg" id="files" type="file" multiple />
                <br/>
                <button onClick={uploadFiles} className="btn btn-primary">Upload</button>
            </div>


            <div className="w-50 d-flex justify-content-center">
                <div className="wrapper2">
                    <form action="#" onClick={clickImage}>
                        <input id="file-input" type="file"  hidden onChange={handleChange} multiple/>
                            <FaCloudUploadAlt className="uploadIcon"/>
                            <p className="uploadDesc">Browse File to Upload</p>
                    </form>
                </div>
            </div>
            <br/> <br/> <br/> <br/><br/>

        </>
    );
};

export default UploadPage;