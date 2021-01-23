import React from 'react';
import { useParams } from 'react-router-dom';

function ViewContent() {

    var {params} = useParams()
    console.log({params})

    return(
        <div>{params}</div>
    )
}

export default ViewContent