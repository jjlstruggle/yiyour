/**
 * 关于我们
 */
 import React,{ useRef, useState } from "react";
 import useLazy from "@/hooks/useLazy";
 import img1 from "../../assets/temp/shell.jpg"
 import { UploadOutlined } from '@ant-design/icons';
 import type { UploadProps } from 'antd';
 import { Button,Divider, message, Upload  } from 'antd';
export default function About() {
  return (
    <div style={{width:"100vw",padding:"5vh 6vw 0 6vw",boxSizing:"border-box",display:"flex",flexDirection:"column"}}>
    <div className="text-xl font-bold flex items-center ">
       <div className="bg-main w-3 h-6 mr-2" ></div>
       已经提交的作品数量
    </div>
   <Divider />
   <p className="text-xl">显示由发起者编辑的需求</p>
   <p className="text-xl">显示由发起者编辑的需求</p>
   <p className="text-xl">显示由发起者编辑的需求</p>
   <p className="text-xl">显示由发起者编辑的需求</p>
      <div  style={{padding:"2vh 6vw",backgroundColor:"#F7F7F7",width:"100vw",boxSizing:"border-box",position:"relative",left:"-6vw",marginTop:"10vh"} }>
       <div className="text-xl font-bold flex items-center ">
          <div className="bg-main w-3 h-6 mr-2" ></div>
          发布推荐
       </div>
      <Divider /> 
    <div className="flex w-full h-full box-border justify-between mb-20">
             <div className="w-60 h-80 " style={{backgroundColor:"#FFFFFF"}} >
             <img className="w-60 h-40 " src={img1} /> 
             <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
             </div>
             </div>
             <div className="w-60 h-80 " style={{backgroundColor:"#FFFFFF"}} >
             <img className="w-60 h-40 " src={img1} /> 
             <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
             </div>
             </div>
             <div className="w-60 h-80 " style={{backgroundColor:"#FFFFFF"}} >
             <img className="w-60 h-40 " src={img1} /> 
             <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
             </div>
             </div>
    </div>
 </div>
</div>
  );
}
