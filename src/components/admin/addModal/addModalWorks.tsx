
import { Button,
         Modal,
         Form,
         Input,
         InputNumber,
         Select,
          Checkbox, 
          InputRef, 
          Spin,
           message} from 'antd';
import React, { useRef,
                useState,
                memo} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReduxStore from "@/interface/redux";

import dayjs, { Dayjs } from "dayjs";
import { operateWorks} from "@/api/work"
import { upload } from "@/api/oss";

import { OperateWorksParams } from "@/interface/api"
import { DDate } from "@/interface/type";

import { SmileOutlined } from '@ant-design/icons';
import type { RcFile } from "antd/es/upload";
import { TextAreaRef } from "antd/lib/input/TextArea";

import Text from "@/components/publish/text";
import TimeSelect from "@/components/publish/timeSelect";
import NameInput from "@/components/publish/nameInput";
import AddNumber from "@/components/publish/addNumber";
import GoodUpload from "@/components/publish/upload";

const task = ["任务", "作品"];
const type = ["文本文案", "图片", "音频"];

type PublishStorage = null | {
  date: string;
  bottomAd: number;
  name: string;
  price: number;
  task: number;
  text: string;
  topAd: number;
  type: number;
};


//格式化时间轴
function formate(date: Dayjs): { date: DDate } {
  return {
    date: {
      year: String(date.year()),
      month: String(date.month() + 1),
      date: String(date.date()),
      time: String(date.hour() + ":" + date.minute()),
    },
  };
}

//添加封面水印
function resolveImage(file: Blob) {
  return new Promise((resolve) => {
    let cvs = document.createElement("canvas");
    let img = new Image();
    let fd = new FileReader();
    fd.readAsDataURL(file);
    fd.onload = () => {
      img.src = fd.result as string;
      cvs.width = img.width;
      cvs.height = img.height;
      let ctx = cvs.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      // 在后面添加水印即可
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.globalAlpha = 1;
      ctx.font = "28px";
      ctx.rotate((Math.PI / 180) * -15);
      let lineNumX = 0; // X轴行号
      let lineNumY = 0; // Y轴行号
      let tempX = 0;
      let targetX = 0; // 水印写入的X轴位置
      let targetY = 0; // 水印写入的Y轴位置
      for (let ix = 10; ix < cvs.width; ix += 90) {
        // 水印横向间隔
        lineNumX++;
        lineNumY = 0;
        for (let iy = 10; iy <= cvs.height; iy += 50) {
          // 水印纵向间隔
          lineNumY++;
          tempX = lineNumY * 50 * Math.sin((Math.PI / 180) * 15); // 由于canvas被旋转，所以需要计算偏移量
          targetX = lineNumY & 1 ? ix - tempX : ix - tempX + 60;
          targetY = iy + lineNumX * 90 * Math.tan((Math.PI / 180) * 15);
          ctx.fillText("一隅立画", targetX, targetY);
        }
      }
      cvs.toBlob((blob) => {
        resolve(blob);
      });
    };
  });
}

function AddWorksList (){
  let storage: PublishStorage = JSON.parse(
    localStorage.getItem("publishTemp")!
  );
  const shouldLoadFromStorage = storage === null ? false : true;
  
  let formateDate = shouldLoadFromStorage
    ? storage!.date
      ? formate(dayjs(storage!.date))
      : formate(dayjs())
    : formate(dayjs());
  let formateName = shouldLoadFromStorage
    ? storage?.name
      ? storage.name
      : ""
    : "";
  let formateTask = shouldLoadFromStorage
    ? storage?.task
      ? storage.task
      : 0
    : 0;
  let formateType = shouldLoadFromStorage
    ? storage?.type
      ? storage.type
      : 0
    : 0;
  let formateText = shouldLoadFromStorage
    ? storage?.text
      ? storage.text
      : ""
    : "";
  let formatPrice = shouldLoadFromStorage
    ? storage?.price
      ? storage.price
      : 0
    : 0;
  let formatTopAd = shouldLoadFromStorage
    ? storage?.topAd
      ? storage.topAd
      : 0
    : 0;
  let formatBottomAd = shouldLoadFromStorage
    ? storage?.bottomAd
      ? storage.bottomAd
      : 0
    : 0;
  // let tempParams:OperateWorksParams = {
  //   previewUrl: "",
  //   realUrl: "",
  //   remark: "",
  //   subtype: "",
  //   subtypeId: "",
  //   type: "",
  //   typeId: "",
  //   worksCover: "",
  //   worksDeadline: "",
  //   worksDemand: "",
  //   worksName: "",
  //   worksPrice:0,
  //   worksProcess: "",
  //   worksStatus:0
  // }
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addParams, setAddParams] = useState();
  const [modalText, setModalText] = useState('Content of the modal');
  
  const timeRef = useRef<{ date: DDate }>(null);
  const nameRef = useRef<InputRef>(null);
  const taskRef = useRef(formateTask);
  const typeRef = useRef(formateType);
  const textRef = useRef<TextAreaRef>(null);
  const [price, setPrice] = useState(formatPrice);
  const [topAd, setTopAd] = useState(formatTopAd);
  const [bottomAd, setBottomAd] = useState(formatBottomAd);
  const [file, setFile] = useState<RcFile[]>([]);
  const [file2, setFile2] = useState<RcFile[]>([]);
  const [value, update] = useState<number|string>(formateTask);
  const [typeValue, updateType] = useState<number|string>(formateType);
  const data = useSelector((redux: ReduxStore) => redux.oss);
  const navigate = useNavigate();
  let allPrice = 1000 * topAd + 800 * bottomAd + price;

  const map = new Map();
  const typeMap: string[] = [];
  if (!data.format) {
    return <Spin />;
  }
  data.format.forEach((item) => {
    typeMap.push(item.id);
    item.children.forEach(({ id, format }) => {
      map.set(format, id);
    });
  });
  const accept = data.format[typeValue].children.map(
    (prev: any) => "." + prev.format
  );
    //激活模态框
  const showModal = () => {
    setVisible(true);
  };
  //暂存信息到浏览器
  const handleSave = () => {
    let date = timeRef.current?.date;
    localStorage.setItem(
      "publishTemp",
      JSON.stringify({
        task: taskRef.current,
        type: typeRef.current,
        name: nameRef.current!.input!.value,
        date:
          date?.year + "-" + date?.month + "-" + date?.date + " " + date?.time,
        text: textRef.current!.resizableTextArea!.props.value,
        topAd,
        bottomAd,
        price,
      })
    );
  };
  //提交信息到sql
  const handleSubmit = async () => {
    let date = timeRef.current?.date;

    if (taskRef.current == 0) {
      const pic = await upload(file[0]);
      const watermarkImg = await resolveImage(file[0]); // 添加水印的图片
      const res = await operateWorks({
        previewUrl:"",
        realUrl:"", 
        worksName: nameRef.current!.input!.value,
       
        worksDeadline:
          date?.year +
          "-" +
          date?.month +
          "-" +
          date?.date +
          " " +
          date?.time +
          ":00",
        worksPrice: allPrice,
        worksDemand: textRef.current!.resizableTextArea!.props
          .value as unknown as string,
        // publisherId: Number(location.search.split("=")[1]),
        worksCover: pic.data.imageUrl,
        worksStatus: 1,
        type: type[typeRef.current!],
        typeId: String(typeMap[typeRef.current]),
        subtype:"",
        subtypeId:"",
        worksProcess:"",
        remark:"121"
        });
      if (res.code == "0") {
        message.success("发布成功");
        localStorage.removeItem("publishTemp");
        navigate("/");
      }
    } else {
      const pic = await upload(file[0]);
      const product = await upload(file2[0]);
    }
  };

  const handleOk = async() => {
    setModalText('保存中');
    setConfirmLoading(true);
  //  let res =  await operateWorks(addParams)
  //   if(res.data.code === '0' ){
  //       setVisible(false)
  //       setConfirmLoading(false);
  //   }
    
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };  
  const [addForm] = Form.useForm();
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
const onFinish = (val:any) => {
  new Promise(  
  ()=>{}
  )
};
const onFinishFailed = (val:any) => {
  console.log("onFinishFailed", val);
};
  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增
      </Button>

      <Modal
        title="作品新增"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleOk}
      > 
      
    <Form {...formItemLayout} 
           form={addForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            
    <Form.Item
      label="作品名称"
      validateStatus={
        ((e:any)=>{e.value ===""})?"error":'success'
      }
      help="请填写作品名称"
    >
     {/* <Input ref={nameRef}
             placeholder="请填写作品名称"  
             id={
              (nameRef===null)?"error":"success"
             }/> */}
             <NameInput ref={nameRef} initalName={formateName!} />
    </Form.Item>

    <Form.Item
      label="作品分类"
      help="请填写作品名称"
    >
      {/* @ts-ignore */}
        <Select item={task} ref={taskRef} change={update} />
         {/* @ts-ignore */}
        <Select item={type} ref={typeRef} change={updateType} />
    </Form.Item>
    <Form.Item
      label="作品封面"
      hasFeedback
      validateStatus="validating"
      help="请上传作品封面"
    >   <GoodUpload
          type="card" fileList={file} setFileList={setFile} 
          />
    </Form.Item>

    <Form.Item
      label="作品原件"
      hasFeedback
      validateStatus="validating"
      help="请上传作品"
    >   
       <GoodUpload
                type="default"
                fileList={file2}
                setFileList={setFile2}
                accept={accept}
              />
    </Form.Item>
             
    <Form.Item
      label="截止日期"
      hasFeedback
      validateStatus="validating"
      help="请选择截止日期"
    >   
      <TimeSelect ref={timeRef} initalDate={formateDate!} />
    </Form.Item>

    <Form.Item
      label="作品描述"
      hasFeedback
      validateStatus="validating"
      help="请输入作品描述"
    >
       <Text ref={textRef} initalText={formateText} />
    </Form.Item>

    <Form.Item
      label="作品报价"
      hasFeedback
      validateStatus="validating"
    >
         <InputNumber
              min={0}
              addonBefore="￥"
              value={price}
              placeholder={"请输入"+(value == 0 ? "您理想的价格" : "悬赏金额")}
              onChange={(e) => {
                if (!isNaN(e)) setPrice(e);
              }}
            />
             <div className="text-gray-400 font-normal text-base ml-4 mb-12">
            <div>金额1--499，奖项限定1，最小参与数2，奖金比例100%</div>
            <div>金额500--1499，奖项限定2，最小参与数4，奖金比例6:4</div>
            <div>金额1500--2999，奖项限定3，最小参与数6，奖金比例5:3:2</div>
            <div>金额3000+，奖项限定4，最小参与数8，奖金比例4:3:2:1</div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>首页广告位展示（15天）</div>
            <div className="flex items-center">
              <div>￥ 1000</div>
              <AddNumber ad={topAd} change={setTopAd} />
            </div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>底部广告位展示（15天）</div>
            <div className="flex items-center">
              <div>￥ 800</div>
              <AddNumber ad={bottomAd} change={setBottomAd} />
            </div>
          </div>
          <div className="text-lg text-gray-400 font-normal">
            （提示：广告内容如需更换，请联系我们）
          </div>
    </Form.Item>


    {/* <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="I'm the content" id="success" />
    </Form.Item>

      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Input placeholder="Warning" id="warning2" />
      </Form.Item> */}
      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Button type="primary" size="large" htmlType="submit" >保存</Button>
        <Button type="default" size="large" onClick={()=>handleCancel} >取消</Button>
      </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default memo(AddWorksList)
