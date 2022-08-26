import axiosClient from "./axiosClient";

export const login = async ({ username, password }) => {
    const url = "/login";
    const response = await axiosClient.post(url, { username, password });
    return response;
};

export const registerUser = async (data) => {
    const url = "/user/register";
    const response = await axiosClient.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};
