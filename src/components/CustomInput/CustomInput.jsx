import React from 'react';

const CustomInput = ({type, label, id, val, onChng, onBlr, defaultVal}) => {



    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type={type}
                    className="form-control"
                    id={id}
                    placeholder={label}
                    onChange={onChng}
                    onBlur={onBlr}
                    value={val}
                />
                <label htmlFor={label}>{label}</label>
            </div>
        </>
    );
};

export default CustomInput;