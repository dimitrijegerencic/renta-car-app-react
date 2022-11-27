import React from 'react';
import {useParams} from 'react-router-dom';

const TestPage3 = () => {
    let {element, id} = useParams();
    return(
        <div>
            This is page 3
            <div>Element is: {element}</div>
            <div>Id is: {id}</div>
        </div>
    )
}

export default TestPage3;
