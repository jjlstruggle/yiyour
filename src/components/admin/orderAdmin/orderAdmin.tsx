import type { InputRef } from 'antd';
import { Button,
         Form, 
         Input,
         Popconfirm,
         Table,
         message} from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import useLazy from "@/hooks/useLazy";
import { searchList } from '@/api/task'
import  useRequest from '@/hooks/useRequest'
import { TaskListInfo } from '@/interface/api';
// import { debounce } from "lodash"; // 防抖
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof TaskListInfo;
  record: TaskListInfo;
  // handleSave: (record: Item) => void;
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const SearchOrder = useLazy(import("@/components/admin/search/searchOrder"));
// const confirm = (worksId: number) => {
//   const hideLoading = message.loading("请求中");
//   deleteWork(worksId)  //此处因为缺少权限分级 使用 用户本人删除接口
//     .then((res) => {
//       const { code, message: msg } = res;
//       if (code === 200) {
//         message.success(msg);
//         dispatch(getManagersAC());
//       } else if (code === 501) {
//         message.warn(msg);
//       }
//     })
//     .finally(() => {
//       hideLoading();
//     });
// };
const columns: ColumnsType<TaskListInfo> = [
    {
      title: '编号',
        dataIndex: 'id',
        key: 'key-id-',
        width: 30,
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
      width: 50,
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
      key: 'task-Price',
      width: 50,
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      key: 'task-type',
      width: 50,
    },
    {
      title: "操作",
      key: "publisherId",
      dataIndex: "id",
      width: 50,
      render: ({id,publisherId}, record) => {
        const myId = Number(localStorage.getItem("id"));
        return publisherId !== myId ? (
          <Popconfirm
            title="确认删除吗？"
            onConfirm={confirm.bind(record, publisherId, Number(id)!)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        ) : (
          "无"
        );
      },
    },
]

// const columns = defaultColumns.map(col => {
//   if (!col.editable) {
//     return col;
//   }
//   return {
//     ...col,
//     onCell: (record: DataType) => ({
//       record,
//       editable: col.editable,
//       dataIndex: col.dataIndex,
//       title: col.title,
//       handleSave,
//     }),
//   };
// });
type EditableTableProps = Parameters<typeof Table>[0];
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  // handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      // handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        // name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};
const AddOrderHandBy = () =>{

}
export default function OrderTable(){
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
       <Button onClick={AddOrderHandBy} type="primary" style={{ marginBottom: 16 }}>
       新增一条
      </Button>
       <SearchOrder></SearchOrder>
       <Table
        columns={columns}
        dataSource={taskList}
        bordered
        scroll={{ x: 'calc(600px + 50%)', y: 600 }}
        rowKey={(record,index)=>{return 'order-list'+index as string}}
      />
      </>
    );
}


