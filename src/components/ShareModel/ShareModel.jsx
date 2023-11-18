import React from 'react';
import './ShareModel.css';
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {
    selectShareModalShow,
    SetShareModalShow
} from "../../redux/state-slice/ModalSlice";
import store from "../../redux/store/store";

const ShareModel = () => {

    const ShareModalShow = useSelector(selectShareModalShow);
    const handleClose = () => {
        store.dispatch(SetShareModalShow(false))
    }


    return (
        <>
            <Modal size="lg" show={ShareModalShow} onHide={handleClose} >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                   <h1>This is Goni Hales</h1>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ShareModel;