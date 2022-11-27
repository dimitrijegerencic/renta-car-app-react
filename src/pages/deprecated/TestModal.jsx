import React from 'react';
import {useModal} from "../../contexts/ModalContext";

const TestModal = () => {
    const {open} = useModal()
    return(
        <div>Test modal
            <button
                onClick={() => {open({
                    title: 'Test modal 1',
                    content: <div>Modal 1 content</div>
                })}}>
                Open modal 1</button>
            <button onClick={() => {open({
                title: 'Test modal 2',
                content: <div>Modal 2 content</div>
            })}}>
                Open modal 2</button>

        </div>
    )
}

export default TestModal;
