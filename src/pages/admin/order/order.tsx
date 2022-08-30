
import OrderTable  from "@/components/admin/orderAdmin/orderAdmin"
import SearchForm from "@/components/admin/search/searchForm/searchForm"

const getFieldDecorator = ()=>{

}
const validateFields = ()=>{
  
}
const setFieldsValue = ()=>{
  
}
const resetFields = ()=>{
  
}
const searchListData = [
  {
    tagName:"订单信息",
    key:"search-key-1",
    label:"order",
  },{
    tagName:"用户信息",
    key:"search-key-2",
    label:"user",   
  }
]
const FunctionParams = {
  getFieldDecorator,
  validateFields,
  setFieldsValue,
  resetFields
}
export default function OrderAdmin() {
    return (
      <div>
        <SearchForm
            searchList = {searchListData}
            reset = {true}
            onDateChange= {()=>{}}
            onSearch= {()=>{}}
            autoSearch= {()=>{}}
            noSearchButton= {false}
            stopPagination= {()=>{}}
            onButtonClick= {()=>{}}
            form={FunctionParams}
          />
        <OrderTable></OrderTable>
      </div>
    )
  }
  