export interface DDate {
  year: string;
  month: string;
  date: string;
  time: string;
}

export interface User {
  hasLogin: boolean;
  userInfo:
    | {
        avatar: null | string;
        email: string;
        id: number;
        organization: null;
        phone: string;
        username: null;
      }
    | {};
}

export type Formate = {
  id: string;
  children: Formate[];
  format: string;
};
