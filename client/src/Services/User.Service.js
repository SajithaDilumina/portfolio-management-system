import { axiosPrivateInstance } from "."

const Login = (payload) => {
    return axiosPrivateInstance.post(`/api/user/login`,payload);
}

const Register = (payload) => {

    return axiosPrivateInstance.post(`/api/user/register`,payload);
}
const getAllUsers = () => {
    return axiosPrivateInstance.get(`/api/user/users`);
}

const getUserById = (id) => {
    return axiosPrivateInstance.get(`/api/user/?id=${id}`);
}
const updateUser = (id,payload) => {
    return axiosPrivateInstance.put(`/api/user/?id=${id}`,payload);
}
const generateReport = () => {
    return axiosPrivateInstance.get(`/api/user/generate-report`);
}
const getChartData = () => {
    return axiosPrivateInstance.get(`/api/user/chart`);
}

const deleteUserByid = (id) => {
    return axiosPrivateInstance.delete(`/api/user/?id=${id}`);
}
export const UserService = {
    Login,
    Register,
    getAllUsers,
    getUserById,
    updateUser,
    generateReport,
    getChartData,
    deleteUserByid
}