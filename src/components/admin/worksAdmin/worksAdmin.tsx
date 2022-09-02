import { Button, 
         Popconfirm, 
         Table,
         message, 
         Space,
         TreeSelect} from 'antd';
import type { ColumnsType,TableProps} from 'antd/es/table';
import useLazy from "@/hooks/useLazy";
import React, { useEffect,useState } from 'react';
import { searchWorksByPage,searchWorksOrder,deleteWork } from '@/api/work'
import  useRequest from '@/hooks/useRequest'
import { List,SearchWorksByPageParams} from '@/interface/api';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'
import { FilterOutlined } from '@ant-design/icons';
import { SizeType} from 'antd/lib/config-provider/SizeContext';

const SearchUser = useLazy(import("@/components/admin/search/searchUser"));
const confirm = (worksId:any) => {
  const hideLoading = message.loading("请求中");
  console.log(worksId)
  deleteWork(String(worksId))  //此处因为缺少权限分级 使用 用户本人删除接口
    .then((res) => {
      const { code, message: msg } = res;
      if (code === 200) {
        message.success(msg);
        
      } else if (code === 501) {
        message.warn(msg);
      }
    })
    .finally(() => {
      hideLoading();
    });
};
const treeSelectData = (ThreeData:any)=>{
  let tempArr:any= [];
  if (ThreeData?.length) {
      tempArr = [ { title: '全选', value: 'all', children: [] } ];
      ThreeData.forEach(({ title, value }:any) => {
          tempArr[0].children.push({ title, value: title });
      });
  };
  return tempArr;
}

const  itemSelection = (treeData:any, dataIndex:any, selectedKeys:any, setSelectedKeys:any) => {
  // 这些配置去 https://ant.design/components/tree-select-cn/ 查看
  const tProps = {
      treeData,
      value: selectedKeys,
      defaultValue: [],
      placeholder: `Select ${dataIndex}`,
      autoClearSearchValue: false,
      treeCheckable: true,
      maxTagCount: 0,
      treeNodeFilterProp: 'title',
      treeDefaultExpandAll: true,
      showCheckedStrategy: "SHOW_PARENT" as any,
      getPopupContainer: (triggerNode:any) => triggerNode.parentNode,
      size:"small" as SizeType,
      className: 'tree-select',
      dropdownMatchSelectWidth: 217,
      dropdownClassName: 'common-treeSelect-dropdown'
  };
  // watch:{
  //   = (value:any) => {
  //     setSelectedKeys(value);
  // };
  // }
  return <TreeSelect {...tProps} />;
}

  // 自定义表头筛选函数
const getColumnSearchProps = (treeData:any, dataIndex:any) => ({
    filterDropdown: ( {setSelectedKeys, selectedKeys, confirm, clearFilters }:any) => (
        <div className="table-filter-dropdown" >
            {itemSelection(treeData, dataIndex, selectedKeys, setSelectedKeys)}
            <Space>
                <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 50 }}
                >
                    清空
                </Button>
                <Button
                    type="primary"
                    onClick={() => handleSearch(confirm)}
                    size="small"
                    style={{ width: 60 }}
                >
                    确认
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered:any) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value:any, record:any) => {
        // 前端筛选
        if (value === "all") return true;
        return record[dataIndex] ? record[dataIndex].includes(value) : '';
    }
});

// 点击确定按钮🔘关闭筛选清空搜索
const handleSearch = (confirm:any) => {
    confirm();
};

// 点击清空按钮🔘关闭筛选清空搜索
const handleReset = (clearFilters:any) => {
    clearFilters();
};
//列表项目
const columns: ColumnsType<List> = [
    {
      title: '编号',
        dataIndex: 'id',
        key: 'key-id',
        width: 30,
    },
    {
      title: '作品名称',
      dataIndex: 'worksName',
      key: 'works-name',
      width: 50,
    },
    {
      title: '作者UID',
      dataIndex: 'publisherId',
      key: 'works-puid',
      width: 20,
      ...getColumnSearchProps(treeSelectData([]), 'id')
    },
    { 
      title: '提交时间',
      dataIndex: 'worksDeadline',
      key: 'works-ddl',
      width: 50,
    },
    {
      title: '任务赏金',
      dataIndex: 'worksPrice',
      key: 'works-price',
      width: 20,
      sorter: (a, b) => a.worksPrice - b.worksPrice,
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      key: 'works-type',
      width: 50,
      filters: [
        {
          text: '文案',
          value: 'text',
        },
        {
          text: '图片',
          value: 'image',
        },
        // {
        //   text: 'Submenu',
        //   value: 'Submenu',
        //   children: [
        //     {
        //       text: 'Green',
        //       value: 'Green',
        //     },
        //     {
        //       text: 'Black',
        //       value: 'Black',
        //     },
        //   ],
        // },
      ],
      onFilter: (value:any, record) => record.type.indexOf(value) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ['descend'],
    },
    {
      title: "操作",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (id,record) => {
        const myId = Number(sessionStorage.getItem("id"));
        // return publisherId !== myId ? ( //需要身份验证
          return  (
          <Popconfirm
            title="确认删除吗？"
            onConfirm={confirm.bind(record, id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        ) 
      },
    },
]
const defaultParmas:SearchWorksByPageParams = {
  currentPage: 1,
  pageSize:12,
  priceSort:1,
  subtypeId:undefined,
  timeSort: 1,
  typeId:undefined,
}
export default function WorksTable(){
  const [searchWorksParmas, setSearchWorksParmas] = useState(defaultParmas);
  const { data, loading, error } = useRequest(async () => {
  const curRes = await searchWorksByPage(searchWorksParmas);
  const curTask = curRes.data.list;
  const pre = data || ([] as List[]);
  console.log(data)
  // @ts-ignore
  return pre.concat(curTask);
}, [defaultParmas]);
let worksList = data as unknown as List[];
    return(
      <>
       <SearchUser></SearchUser>
       <Table
        columns={columns}
        dataSource={worksList}
        bordered
        size="middle"
        scroll={{ x: 'calc(600px + 50%)', y: 500 }}
        rowKey={(record,index)=>{return 'user-list'+index as string}}
      />
      </>
    );
}


