import axiosClient from "./axiosClient";
import { getItem } from "utils/local";
export const getTopProduct = async () => {
    const url = "/product/top-product";
    const response = await axiosClient.get(url);
    return response;
};

export const getAllProduct = async (params) => {
    const url = "/product/active";
    const response = await axiosClient.get(url, { params });
    return response;
};

export const getOneProduct = async (id) => {
    const url = `/product/${id}`;
    const response = await axiosClient.get(url);
    return response;
};

export const getAllType = async () => {
    const url = "/type/active";
    const response = await axiosClient.get(url);
    return response;
};

export const getAllBrand = async () => {
    const url = "/brand/active";
    const response = await axiosClient.get(url);
    return response;
};

export const getAllReviews = async (id) => {
    const url = `/feedback/${id}`;
    const response = await axiosClient.get(url);
    return response;
};

export const createFeedBack = async (data) => {
    const url = "/feedback";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};
