import { axiosPrivateInstance } from "."


export const jobService = {
    GetJobs

}
const GetJobs = () => {
    return axiosPrivateInstance.get(`/api/job`);
}