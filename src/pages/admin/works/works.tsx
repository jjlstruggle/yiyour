
import WorksTable  from "@/components/admin/worksAdmin/worksAdmin"

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
export default function WorksAdmin() {
    return (
      <div>
        <WorksTable></WorksTable>
      </div>
    )
  }
  