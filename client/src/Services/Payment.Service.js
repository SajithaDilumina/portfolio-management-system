import { axiosPrivateInstance } from "."


const  UpdateDiscount = (id,payload) => {
    return axiosPrivateInstance.patch(`post/update-discount/${id}`,payload);
}

const getReservation = (id) => {
    return axiosPrivateInstance.get(`api/reservation/ServiceProviderReservations/${id}`);
}

const getReservationByOrderID = (id) => {
    return axiosPrivateInstance.get(`api/reservation/getOne/${id}`);

}

const AddPayment = (payload) => {
    return axiosPrivateInstance.post(`api/payments/payment/add`,payload);
}

const getAllPayments = () => {
    return axiosPrivateInstance.get(`api/payments/payment/getall`);
}

const getPaymentDetailsById = (id) => {
    return axiosPrivateInstance.get(`api/payments/payment/get/${id}`);
}

const updatePayment = (id,payload) => {
    return axiosPrivateInstance.patch(`api/payments/payment/update/${id}`,payload);
}
const deletePayment = (id) => {
    return axiosPrivateInstance.delete(`api/payments/payment/delete/${id}`);
}
const  generatePaymentReport=(userID)=>{
    return axiosPrivateInstance.get(`api/payments/report/${userID}`);

}

const getPaymentsByUserId = (id) => {
    return axiosPrivateInstance.get(`api/payments/user/${id}`);
}

const getAdminReportData = () => {
    return axiosPrivateInstance.get(`api/payments/admin/report`);

}
export const PaymentService = {
    UpdateDiscount,
    getReservation,
    getReservationByOrderID,
    AddPayment,
    getAllPayments,
    getPaymentDetailsById,
    updatePayment,
    deletePayment,
    generatePaymentReport,
    getPaymentsByUserId,
    getAdminReportData
}