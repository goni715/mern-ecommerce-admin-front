import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {selectColorName} from "../../redux/state-slice/colorSlice";
import {GetColorRequest, UpdateColorRequest} from "../../ApiServices/ColorApiRequest";

const UpdateColor = ({id}) => {

    let colorNameRef = useRef();
    let navigate = useNavigate();



    useEffect(()=>{
        (async () => {
            await GetColorRequest(id);
        })();
    },[id])


    let ColorName = useSelector(selectColorName);


    const SaveChange = async () => {

        let colorName = colorNameRef.value.trim();

        if(IsEmpty(colorName)){
            ErrorToast("Please, pick a Color");
        }
        else{

            let result = await UpdateColorRequest(colorName,id);

            if(result === true){
                navigate('/admin/colors-list');
            }

        }


    }




    return (
        <>
            <div>
                <h3 className="title">Update Color</h3>
                <div className="w-50">
                    <div className="form-floating mb-3">
                        <input
                            type="color"
                            ref={(input)=>colorNameRef=input}
                            className="form-control"
                            id="update-brand"
                            placeholder="Enter Brand"
                            defaultValue={ColorName}
                            key={Date.now()}
                        />
                        <label htmlFor="Enter Brand">Enter Color</label>
                    </div>
                    <button onClick={SaveChange} className="btn btn-success border-0 rounded-3 my-5">Save Change</button>

                </div>
            </div>
        </>
    );


};

export default UpdateColor;