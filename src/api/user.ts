import request from "@/util/fetch";
export const getMes = (page: number, id: string) => {
    return request.get(`/api-user/${page}/5?Id=${id}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
}
