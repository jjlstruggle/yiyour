import request from "@/util/fetch";
export const getMes = (page: number, id: string) => {
    return request.get(`/api-user/${page}/5?Id=${id}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
}
export const postUser = (user: any) => {
    const { avatar, city, cover, email, emailShow, gender, introduction, job, organization, password, phone, phoneShow, qq, username, wx } = user
    const users: any = localStorage.getItem("user")
    const userInfo: any = JSON.parse(users)
    console.log(userInfo.id);

    const data: any = {
        // @ts-ignore
        avatar, city, cover, email, emailShow, gender, introduction, job, organization, password, phone, phoneShow, qq, username, wx, id: userInfo.id
    }
    console.log(data);

    return request.post("/api-user/update", JSON.stringify(data), {
        // @ts-ignore
        headers: {
            token: localStorage.getItem("token")
        }
    })
}
export const getUser = () => {
    return request.get("/api-user/info", {
        // @ts-ignore
        headers: {
            token: localStorage.getItem("token")
        }
    })
}
