import React, {useId, useRef} from "react";

const InputRefExample = () => {
    const inputRef = useRef(null);
    const id = useId();

    // const id = uniqid();
    const focusInput = () => {
        inputRef?.current.focus()
    }

    return <div>
        <input id={id} ref={inputRef} placeholder="Search..."/>
        <button onClick={() => focusInput()}>Focus input</button>
    </div>
}

export default InputRefExample;