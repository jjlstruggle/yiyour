
import OrderTable  from "@/components/admin/orderAdmin/orderAdmin"
// import SearchForm from "@/components/admin/search/searchForm/searchForm"

// s
// const validateFields = ()=>{
  
// }
// const setFieldsValue = ()=>{
  
// }
// const resetFields = ()=>{
  
// }
const searchListData = [
  {
    tagName:"input",
    key:"search-key-1",
    label:"搜索",
  },{
    tagName:"inputnumber",
    key:"search-key-2",
    label:"用户信息",   
  }
]
const FunctionParams = {
  getFieldDecorator:"", 
  validateFields:"", 
  setFieldsValue:"", 
  resetFields :""
}
export default function OrderAdmin() {
    return (
      <div>
        {/* <SearchForm
            searchList = {searchListData}
            reset = {true}
            onDateChange= {()=>{}}
            onSearch= {()=>{}}
            autoSearch= {()=>{}}
            noSearchButton= {false}
            stopPagination= {()=>{}}
            onButtonClick= {()=>{}}
            // form={FunctionParams}
          /> */}
        <OrderTable></OrderTable>
      </div>
    )
  }
  