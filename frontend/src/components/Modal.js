import React from 'react';
import { Modal } from 'antd';
import CropEasy from './crop/CropEasy';
import 'antd/dist/antd.css';
import './../css/modal.css'


const SimpleModal=( props ) => {


  return (
    <>

      <Modal forceRender={true} footer={null} title="Crop Photo" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
        <CropEasy photoURL={props.photoURL} realPhotoURL={props.realPhotoURL} setRealPhotoURL={props.setRealPhotoURL} setPhotoURL={props.setPhotoURL} setOpenCrop={props.setOpenCrop} hideModal={props.handleOk} setFile={props.setFile} />
      </Modal>

    </>
  );
};

export default SimpleModal;
