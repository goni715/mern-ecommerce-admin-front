import React, {useEffect, useRef} from 'react';
import {BiArrowBack} from "react-icons/bi";
import {GetEnquiryRequest, UpdateEnquiryRequest} from "../../ApiServices/EnquiryApiRequest";
import {useSelector} from "react-redux";
import {
    selectEnquiryComment,
    selectEnquiryEmail,
    selectEnquiryMobile,
    selectEnquiryName, selectEnquiryStatus
} from "../../redux/state-slice/enquirySlice";
import {useNavigate} from "react-router-dom";

const ViewEnquiry = ({id}) => {

    let statusRef = useRef();
    const navigate = useNavigate();


    useEffect(()=>{
        (async () => {
            await GetEnquiryRequest(id);
        })();
    },[id])


    const EnquiryName = useSelector(selectEnquiryName);
    const EnquiryEmail = useSelector(selectEnquiryEmail);
    const EnquiryMobile = useSelector(selectEnquiryMobile);
    const EnquiryComment = useSelector(selectEnquiryComment);
    const EnquiryStatus = useSelector(selectEnquiryStatus);


    const goBack = () => {
        navigate(-1);
    };




    //Update Status
    const UpdateStatus = async () => {
        let status = statusRef.value.trim();
        let result = await UpdateEnquiryRequest(status,id);
        if(result === true){
            await GetEnquiryRequest(id);
        }
    }




    return (
        <>
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-4 title">View Enquiry</h3>
                    <button onClick={goBack} className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1">
                        <BiArrowBack className="fs-5" /> Go Back
                    </button>
                </div>
                <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Name:</h6>
                        <p className="mb-0">{EnquiryName}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Mobile:</h6>
                        <p className="mb-0">
                            <a href={"tel:+91"+EnquiryMobile}>{EnquiryMobile}</a>
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Email:</h6>
                        <p className="mb-0">
                            <a href={"mailto:"+EnquiryEmail}>{EnquiryEmail}</a>
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Comment:</h6>
                        <p className="mb-0">{EnquiryComment}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Status:</h6>
                        <p className="mb-0">{EnquiryStatus}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Change Status:</h6>
                        <div>
                            <select key={Date.now()} ref={(select)=>statusRef=select} defaultValue={EnquiryStatus} onChange={UpdateStatus} className="form-control form-select" id="">
                                <option value="Submitted">Submitted</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEnquiry;