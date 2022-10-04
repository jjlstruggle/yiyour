import request from "@/util/fetch";
export const getMes = (page: number, id: string) => {
    return request.get(`/api-user/${page}/5?Id=${id}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
}
export const postUser = (user: any) => {
    const { avatar, code, id, organization, password, phone, username } = user
    const data: any = {
        avatar, code, id, organization, password, phone, username
    }

    return request.post("/api-user/update", JSON.stringify(data))
}
export const getUser = () => {
    return request.get("/api-user/info")
}
