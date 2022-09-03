
import { Button,
         Modal,
         Form,
         Input,
         InputNumber,
         Select } from 'antd';
import React, { useState,memo} from 'react';
import { operateWorks} from "@/api/work"
import { OperateWorksParams } from "@/interface/api"
import { SmileOutlined } from '@ant-design/icons';

function AddWorksList (){
  let tempParams:OperateWorksParams = {
    previewUrl: "",
    realUrl: "",
    remark: "",
    subtype: "",
    subtypeId: "",
    type: "",
    typeId: "",
    worksCover: "",
    worksDeadline: "",
    worksDemand: "",
    worksName: "",
    worksPrice:0,
    worksProcess: "",
    worksStatus:0
  }
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addParams, setAddParams] = useState(tempParams);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async() => {
    setModalText('保存中');
    setConfirmLoading(true);
   let res =  await operateWorks(addParams)
    if(res.data.code === '0' ){
        setVisible(false)
        setConfirmLoading(false);
    }
    
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };  

  const  formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      > 
          <Form {...formItemLayout}>
    <Form.Item
      label="Fail"
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </Form.Item>

    <Form.Item label="Warning" validateStatus="warning">
      <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
    </Form.Item>

    <Form.Item
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="I'm the content" id="success" />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <Input placeholder="Warning" id="warning2" />
    </Form.Item>
  </Form>
      </Modal>
    </>
  );
};

export default memo(AddWorksList)
