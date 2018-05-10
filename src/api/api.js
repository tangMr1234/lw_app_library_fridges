import axios from 'axios';

let baseUrl = window.Api.ApiUrl; //api域名
//获取医用冰箱馆首页的侧边栏菜单
export const getFridgesIndexMenu = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_IndexMenu, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱馆首页的列表信息
export const getFridgesIndexList = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_IndexList + "?brand_id=" + params, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱馆详情信息
export const getFridgesContent = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_IndexContent + "?fridge_id=" + params, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱馆品牌的列表信息
export const getManufacturerData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_ManufacturerData, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱馆品牌的详情
export const getManuDetailData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_ManuDetailData + "?brand_id=" + params, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱馆最新动态列表
export const getNewData = params => {
  return axios.get(`${baseUrl}` + window.AxiosApi.Fridges_NewData + "?brand_id=" + params, {timeout: 60000}).then(res => res.data);
};
