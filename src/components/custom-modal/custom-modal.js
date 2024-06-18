import React from 'react';
import { Modal } from 'antd';
import "./custom-modal.css"

const CustomModal = ({ title, isModalOpen, setIsModalOpen, onTab }) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='customModal'>
                <p>{title}</p>
                <Modal width={360} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p className='modalDesc'>
                        Are you sure you want to delete the user from the database?
                    </p>
                    <div className='modalButtonDiv'>
                        <button onClick={() => {
                            onTab()
                            handleOk()
                        }} className='modalButton'><p className='yesButton'>
                                Yes</p></button>
                        <button onClick={handleCancel} className=' second'><p className='notButton'>
                            Not now</p></button>

                    </div>
                </Modal>
            </div>
        </>
    );
};
export default CustomModal;