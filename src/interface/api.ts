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
  typeId: number;
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

export interface SearchWorksByPageParams {
  currentPage: number;
  pageSize: number;
  priceSort: number;
  subtypeId: string;
  timeSort: number;
  typeId: string;
}
