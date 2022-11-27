import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({title, isVisible, close, content}) => {
    return <AntModal
        title={title}
        centered
        visible={isVisible}
        footer={null}
        maskClosable={false}
        onCancel={() => close()}
    >
        {content}
    </AntModal>
}

export default Modal;