import request from "@/util/fetch";
interface getHisMesParams {
    begin?: string;
    current: number;
    end?: string;
    size: number;
    toUserId: string;
}
export const getHisMes = ({ begin = "2022-01-01 00:00:00", current, size, toUserId }: getHisMesParams) => {
    const data = {
        begin,
        current,
        size,
        toUserId
    };
    return request.post('/api-user/history', JSON.stringify(data))
}