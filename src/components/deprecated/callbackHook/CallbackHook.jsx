import React, {useCallback, useMemo} from "react";

const CallbackHook = ({prop1, prop2}) => {
    const onClick = () => console.log("clicked")

    const click = useCallback(() => console.log(prop1), [prop1])

    const a = useMemo(() => a + 1, [])

    return <div>
        <button onClick={() => onClick()}>Click me!</button>
    </div>
}

export default CallbackHook;