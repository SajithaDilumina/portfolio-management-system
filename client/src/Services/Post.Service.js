import { axiosPrivateInstance } from "."


const getPostsDetailsByUserID = (id) => {
    return axiosPrivateInstance.get(`/posts/user/${id}`);
}
const getPostsDetails = () => {
    return axiosPrivateInstance.get(`/posts`);
}

export const PostService = {
    getPostsDetailsByUserID,
    getPostsDetails
}