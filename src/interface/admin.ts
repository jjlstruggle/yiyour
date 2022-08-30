
interface SearchListParams {
      tagName:string,
      key:string,
      label:string
}
export interface SearchPanelInterface {
    searchList:SearchListParams[]|[]
    reset:Boolean
    onDateChange:Function /** 日期相关onchange[str,moment]事件，方便获取对应的str */,
    onSearch:Function /** 触发搜索 */,
    autoSearch:Function /** 自动触发搜索 */,
    noSearchButton:Boolean /** 不用搜索按钮 */,
    stopPagination:Function /** 是否返回true禁止其他如table的分页器关联操作 */,
    onButtonClick:Function /** 有其他额外button按钮时触发的操作 */,
    form:{
      getFieldDecorator:Function, validateFields:Function, setFieldsValue:Function, resetFields :Function
    }
  }

 export interface PickerPanel {
        showTip:{
        text:string,
        duration:number,
        end:Function},
    format:string /** formart格式，默认HH:mm，可以设为HH:mm:ss等时分秒格式 */,
    disabledNow:[] /** 是否禁用小于当前时间的其他时间--控件在选择小时之后仍然会默认选中分钟00 */,
    disabledHours:[] /** 禁用的小时数，格式为0-23的number数组，优先级比disabledNow高 */,
    disabledMinutes:[] /** 禁用的分钟数，格式为0-59的number数组，优先级比disabledNow高 */,
    disabledSeconds:[] /** 禁用的秒数，格式为0-59的number数组，优先级比disabledNow高 */,
    timeRange:{
      startTime:string
      endTime:string
    } /** 时间段--json，id/startTime/endTime都必传 */,
    permission:Function /** 返回当前组件的区间值是否合法--false是开始时间大于结束时间，可用于禁止页面其他关联的操作 */,
    getRangeTime:Function /** 获取当前时间段，以及开始/结束时间差的permission */,
  }

  export interface TimeRangeParams{
    id: number
    startTime: string
    endTime: string
  }

  export interface SearchFormProps {
    onChange:Function
  }