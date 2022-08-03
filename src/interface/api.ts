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
