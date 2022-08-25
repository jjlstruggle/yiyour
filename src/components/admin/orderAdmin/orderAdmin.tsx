import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useLazy from "@/hooks/useLazy";
import React, { useEffect,useState } from 'react';
import { searchList } from '@/api/task'
import  useRequest from '@/hooks/useRequest'
import { TaskListInfo } from '@/interface/api';


const SearchOrder = useLazy(import("@/components/admin/search/searchOrder"));
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

const columns: ColumnsType<DataType> = [
    {
      // title:''
    },
    {

    },
]
  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   width: 100,
  //   fixed: 'left',
  //   filters: [
  //     {
  //       text: 'Joe',
  //       value: 'Joe',
  //     },
  //     {
  //       text: 'John',
  //       value: 'John',
  //     },
  //   ],
  //   onFilter: (value: any, record) => record.name.indexOf(value) === 0,
  // },
  // {
  //   title: 'Other',
  //   children: [
  //     {
  //       title: 'Age',
  //       dataIndex: 'age',
  //       key: 'age',
  //       width: 150,
  //       sorter: (a, b) => a.age - b.age,
  //     },
  //     {
  //       title: 'Address',
  //       children: [
  //         {
  //           title: 'Street',
  //           dataIndex: 'street',
  //           key: 'street',
  //           width: 150,
  //         },
  //         {
  //           title: 'Block',
  //           children: [
  //             {
  //               title: 'Building',
  //               dataIndex: 'building',
  //               key: 'building',
  //               width: 100,
  //             },
  //             {
  //               title: 'Door No.',
  //               dataIndex: 'number',
  //               key: 'number',
  //               width: 100,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
//   {
//     title: 'Company',
//     children: [
//       {
//         title: 'Company Address',
//         dataIndex: 'companyAddress',
//         key: 'companyAddress',
//         width: 200,
//       },
//       {
//         title: 'Company Name',
//         dataIndex: 'companyName',
//         key: 'companyName',
//       },
//     ],
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     key: 'gender',
//     width: 80,
//     fixed: 'right',
//   },
// ];

// const data: DataType[] = []
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: 'John Brown',
//     age: i + 1,
//     street: 'Lake Park',
//     building: 'C',
//     number: 2035,
//     companyAddress: 'Lake Street 42',
//     companyName: 'SoftLake Co',
//     gender: 'M',
//   });
// }
// const getList = async()=>{
//   await searchList(1).then(
//     (res)=>{ 
//       console.log(res)
//     }
    
//   )
//     return 0;
//   }
//   useEffect(()=>{
//    getList
//   },[])
const [page, setPage] = useState(1);
const { data, loading, error } = useRequest(async () => {
  const curRes = await searchList(page);
  const curTask = curRes.data.list;
  const pre = data || ([] as TaskListInfo[]);
  // @ts-ignore
  return pre.concat(curTask);
}, [page]);

export default function OrderTable(){
    return(
      <>
       <SearchOrder></SearchOrder>
       <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
      />
      </>
    );
}


