import React from 'react';

const DemoPage = () => {



    let Colors = [
        {
            _id: "646650ea2d6702b107ae26a6",
            ColorName: "red",
            createdAt: "2023-05-18T16:23:06.185Z",
            updatedAt: "2023-05-18T16:23:06.185Z"
        },
        {
            _id: "646a468a8a9822997fd6f6d8",
            ColorName: "#0080ff",
            createdAt: "2023-05-21T16:27:54.330Z",
            updatedAt: "2023-05-23T08:48:30.402Z"
        },
        {
            _id: "646a464e8a9822997fd6f6d4",
            ColorName: "#008040",
            createdAt: "2023-05-21T16:26:54.519Z",
            updatedAt: "2023-05-21T16:26:54.519Z"
        },
        {
            _id: "646650fb2d6702b107ae26ac",
            ColorName: "black",
            createdAt: "2023-05-18T16:23:23.457Z",
            updatedAt: "2023-05-18T16:23:23.457Z"
        }
    ];



    let color = [
        "646a464e8a9822997fd6f6d4",
        "646a468a8a9822997fd6f6d8"
    ];


    let ColorArray=[];

    color.forEach((item,i)=>{
        let result = Colors.find((currentValue)=>currentValue._id === item);
        ColorArray.push(result.ColorName);
    });

    console.log(ColorArray)














    return (
        <>

           <h1>Demo Page</h1>

        </>
    );
};

export default DemoPage;