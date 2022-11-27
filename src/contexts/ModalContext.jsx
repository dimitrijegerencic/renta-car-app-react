import React, {createContext, useContext, useState} from 'react';
import Modal from "../components/modal/Modal";
// import {useSearchParams} from "react-router-dom";

const ModalContext = createContext({});

const ModalProvider = ({children}) => {
    const initialModalData = {title: null, content: null}
    const [isVisible, setIsVisible] = useState(false)
    // const [searchParams, setSearchParams] = useSearchParams();
    const [modalData, setModalData] = useState(initialModalData)

    const open = ({title, content}) => {
        setModalData({title: title, content: content})
        setIsVisible(true)
        // setSearchParams({"modal":"open"})
    }

    const close = () => {
        setModalData(initialModalData)
        setIsVisible(false)
        // searchParams.delete("modal");
        // setSearchParams(searchParams);
    }

    // useEffect(() => {
    //     const modalParam = searchParams?.get("modal")
    //
    //     if(modalParam === "open"){
    //         setIsVisible(true)
    //     }else{
    //         setIsVisible(false)
    //     }
    // }, [searchParams])

    const data = {
      open: (data) => open(data),
      close: () => close()
    }

    return( <ModalContext.Provider value={data}>
        {isVisible && <Modal
            title={modalData?.title}
            isVisible={isVisible}
            close={() => close()}
            content={modalData?.content}
        />}
        {children}
    </ModalContext.Provider>)
}

export const useModal = () => {
    return useContext(ModalContext)
}

export default ModalProvider;