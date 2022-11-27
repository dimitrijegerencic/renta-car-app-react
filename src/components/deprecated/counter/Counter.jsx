import React, {useEffect, useReducer, useState} from 'react';

// action
// {type, data}
// type - tip izmjene
// data - objekat

//add-by-one
//subtract-by-one
//add-by-five
//subtract-by-five
const reducer = (state, action) => {
    switch (action.type){
        case 'add-by-one':
            return state + 1;
        case 'subtract-by-one':
            return state - 1;
        case 'add-by-five':
            return state + 5;
        case 'subtract-by-five':
            return state - 5;
        default:
            return state;
    }
}

const Counter = () => {
    const [reducerCount, dispatch] = useReducer(reducer, 0);

    useEffect(() => {
        console.log("Something happened")
    })

    useEffect(() => {
        console.log("Something happened")

        return () => {
            console.log("Cleanup event")
        }
    }, [])

    useEffect(() => {
        console.log("Current count is ", reducerCount)
    }, [reducerCount])

    return <div>
        <div>Current count: {reducerCount}</div>
        <button onClick={() => dispatch({type: "add-by-one"})}>Add 1</button>
        <button onClick={() => dispatch({type: "subtract-by-one"})}>Subtract 1</button>
        <button onClick={() => dispatch({type: "add-by-five"})}>Add 5</button>
        <button onClick={() => dispatch({type: "subtract-by-five"})}>Subtract 5</button>
    </div>
}

export default Counter;