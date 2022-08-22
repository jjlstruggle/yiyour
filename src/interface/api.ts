export interface List {
  id: string;
  publisherId: string;
  subtype: string;
  type: string;
  publisherNickname: string | null;
  workBidNumber: number;
  worksCover: string;
  worksDeadline: string;
  worksName: string;
  worksPrice: number;
}
export interface GetList {
  list: List[];
  currentPage: number;
  totalPage: number;
}
export interface PublishParams {
  bottomAds: number;
  frontPageAds: number;
  publisherId: number;
  taskDeadline: string;
  taskDemands: string;
  taskName: string;
  taskPicture: string;
  taskPrice: number;
  taskStatus: number;
  type: string;
  typeId?: any;
}

export interface OperateWorksParams {
  previewUrl: string;
  realUrl: string;
  remark: string;
  subtype: string;
  subtypeId: string;
  type: string;
  typeId: string;
  worksCover: string;
  worksDeadline: string;
  worksDemand: string;
  worksName: string;
  worksPrice: number;
  worksProcess: string;
  worksStatus: number;
}

export interface UpdateWorksParams {
  id: string;
  previewUrl: string;
  realUrl: string;
  remark: string;
  subtype: string;
  subtypeId: string;
  type: string;
  typeId: string;
  worksCover: string;
  worksDeadline: string;
  worksDemand: string;
  worksName: string;
  worksPrice: number;
  worksProcess: string;
  worksStatus: number;
}
//按条件分页查询
export interface SearchWorksByPageParams {
  currentPage: number;
  pageSize: number;
  priceSort?: number;
  subtypeId?: string;
  timeSort?: number;
  typeId?: string;
}

export interface TaskListInfo {
  id: number;
  taskDeadline: string;
  taskName: string;
  taskPicture: string;
  taskPrice: number;
  type: string;
}

export interface TaskList {
  currPage: number;
  list: TaskListInfo[];
  pageSize: number;
  totalPage: number;
}

export interface AdList {
  coverUrl: string;
  id: string;
  linkUrl: string;
  position: number;
  sort: number;
  title: string;
}
