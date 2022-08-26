import axiosClient from "./axiosClient";
import { getItem } from "utils/local";

export const getOneUser = async (id) => {
    const url = `/user/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};

export const getOrder = async (id) => {
    const url = `/order/customer/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};

export const createOrder = async (data) => {
    const url = "/order";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};

export const cancelOrder = async (id) => {
    const url = `/order/customer/cancel/${id}`;
    const response = await axiosClient.put(
        url,
        {},
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
            },
        }
    );
    return response;
};

export const updateAvatar = async (img, params) => {
    const url = `/image/user`;
    const response = await axiosClient.put(url, img, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
        params,
    });
    return response;
};

export const updateProfile = async (data) => {
    const url = "/user";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};
