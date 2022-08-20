/***
 * 任务集市&作品商店
 */
 import "./index.css";
 import { Tabs, Menu } from "antd";
 import useLazy from "@/hooks/useLazy";
 import { useRef, useState } from "react";
 import { searchWorksByPage,searchWorksByUser,searchWorksOrder} from "@/api/work";
import { useLocation } from "react-router-dom";
 const { TabPane } = Tabs;
 const Bazaar = useLazy(import("@/components/home/bazaar"));
 const Shop = useLazy(import("@/components/home/shop"));
 
 const sorts = ["时间降序", "时间增序"];
 
 const onChange = (key: string) => {
   console.log(key);''
   
 };
 
 export default function Index() {
   const {state}= useLocation();
   const [searchKey,setSearchKey]=useState(state)
   const [select, setSelect] = useState(0);
   const menu = useRef(
     <Menu
       onClick={({ key }) => {
         setSelect(Number(key));
       }}
       items={sorts.map((item, index) => ({
         key: index,
         label: item,
       }))}
     />
   ).current;
 
   return (
     <div>
       <div className="mt-4">
         <div className="flex justify-center items-center">
         <Bazaar />
         </div>
       </div>
     </div>
   );
 }
