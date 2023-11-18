import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


let schema = Yup.object().shape({
    email: Yup
        .string()
        .email("Email should be valid")
        .required("Email is Required"),
    password: Yup
        .string()
        .max(16, 'Must be 16 characters or less')
        .min(6, 'Minimum 6 characters')
        .required("Password is Required"),
});


const Registration = () => {



    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
        },
    });


    return (
        <>
            <div className="py-5" style={{background: "#ffd333", minHeight:"100vh"}}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                    <h3 className="text-center title">Registration</h3>

                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="error mt-2">
                            {formik.touched.email && formik.errors.email}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="Email Address">Email Address</label>
                        </div>

                        <div className="error mt-2">
                            {formik.touched.password && formik.errors.password}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="Password">Password</label>
                        </div>

                        <button type="submit" className="border px-3 py-2 py-2 text-white fw-bold w-100" style={{background: "#ffd333"}}>
                            Registration
                        </button>
                    </form>

                </div>
            </div>

        </>
    );
};

export default Registration;