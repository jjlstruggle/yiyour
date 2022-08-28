import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useLazy from "@/hooks/useLazy";
import React, { useEffect,useState } from 'react';
import { searchList } from '@/api/task'
import  useRequest from '@/hooks/useRequest'
import { TaskListInfo } from '@/interface/api';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'

const SearchUser = useLazy(import("@/components/admin/search/searchUser"));

const columns: ColumnsType<TaskListInfo> = [
    {
      title: '编号',
        dataIndex: 'id',
        key: 'key-id',
        width: 50,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'task-name',
      width: 100,
    },
    { 
      title: '截止时间',
      dataIndex: 'taskDeadline',
      key: 'task-ddl',
      width: 100,
    },
  
    // {
    //   title: '任务图片',
    //   dataIndex: 'taskPicture',
    //   key: 'task-pic',
    //   width: 100,
    // },
    {
      title: '任务赏金',
      dataIndex: 'taskPrice',
      key: 'task-price',
      width: 100,
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      key: 'task-type',
      width: 50,
    }
]
 
export default function UserTable(){
  const [page, setPage] = useState(1);
  const { data, loading, error } = useRequest(async () => {
  const curRes = await searchList(page);
  const curTask = curRes.data.list;
  const pre = data || ([] as TaskListInfo[]);
  // @ts-ignore
  return pre.concat(curTask);
}, [page]);

let taskList = data as unknown as TaskListInfo[];
    return(
      <>
       <SearchUser></SearchUser>
       <Table
        columns={columns}
        dataSource={taskList}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
        rowKey={(record,index)=>{return 'user-list'+index as string}}
      />
      </>
    );
}


