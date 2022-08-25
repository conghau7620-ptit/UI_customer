import axiosClient from "./axiosClient";

export const login = async ({ username, password }) => {
    const url = "/login";
    const response = await axiosClient.post(url, { username, password });
    return response;
};

export const register = async () => {
    const url = "/user/register";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};
