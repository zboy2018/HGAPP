import axios from 'axios';


//let base = 'http://localhost:2899';
let base = 'http://app.zaoyangfood.com:8002';
//let base = 'http://app.zaoyangfood.com:8006';
axios.defaults.withCredentials  =  true;

export const getUser = params => { return axios.post(`${base}/user/baseinfo`, params).then(res => res.data); };
export const getNotice = params => { return axios.post(`${base}/information/notice/list`, params).then(res => res.data); };
export const getProduct = params => { return axios.post(`${base}/product/list`, params).then(res => res.data); };
export const postProduct = (params) => {return axios.post(`${base}/order`,params).then(res => res.data);};
export const getOrder = params => { return axios.post(`${base}/order/list`, params).then(res => res.data); };
export const getOrderDetail = params => { return axios.post(`${base}/order/detail`, params).then(res => res.data); };
export const updateOrder = (params) => {return axios.post(`${base}/order/update`,params).then(res => res.data);};

export const userLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };
export const userRest = params => { return axios.post(`${base}/user/rest`, params).then(res => res.data); };
export const userResume = params => { return axios.post(`${base}/user/rest/resume`, params).then(res => res.data); };
export const getUserRest = params => { return axios.post(`${base}/user/rest/info`, params).then(res => res.data); };
export const userCanOrder = params => { return axios.post(`${base}/user/rest/canOrder`, params).then(res => res.data); };

export const getUserBill = params => { return axios.post(`${base}/user/bill/list`, params).then(res => res.data); };
export const getUserBillDetail = params => { return axios.post(`${base}/user/bill/detail`, params).then(res => res.data); };

export const userModifyPwd = params => { return axios.post(`${base}/user/setting/ModifyPwd`, params).then(res => res.data); };
export const getUserTodayOrderAmount = params => { return axios.post(`${base}/order/GetTodayAmount`, params).then(res => res.data); };
export const getOrderValidate = params => { return axios.post(`${base}/order/CreateOrderValidate`, params).then(res => res.data); };

export const applog = params => { return axios.post(`${base}/log`, params).then(res => res.data); };
