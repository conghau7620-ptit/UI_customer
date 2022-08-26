import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import router from "next/router";

import { registerUser } from "api/authApi";

export const Registration = () => {
    const [authError, setAuthError] = useState({
        username: null,
    });

    const usernameRegExp =
        /^[a-zA-Z]([_-](?![_-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup
        .object({
            username: yup
                .string()
                .matches(usernameRegExp, "*Tên đăng nhập không hợp lệ")
                .required("*Vui lòng điền tên đăng nhập"),
            password: yup.string().required("*Vui lòng điền mật khẩu"),
            name: yup.string().required("*Vui lòng điền họ tên"),
            address: yup.string().required("*Vui lòng điền địa chỉ"),
            phone: yup
                .string()
                .matches(phoneRegExp, "*Số điện thoại không hợp lệ")
                .required("*Vui lòng điền số điện thoại"),
            email: yup
                .string()
                .email("*Địa chỉ Email không hợp lệ")
                .required("*Vui lòng điền địa chỉ Email"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async (data) => {
        try {
            await registerUser(data);
            return router.push("/login");
        } catch (err) {
            console.log(err);
            if (err.response?.status === 400) {
                setAuthError((prevState) => ({
                    ...prevState,
                    username: "*Tên đăng nhập đã tồn tại",
                }));
            }
        }
    };
    return (
        <>
            {/* <!-- BEGIN REGISTRATION --> */}
            <div className="login registration">
                <div className="wrapper">
                    <div
                        className="login-form js-img"
                        // style={{
                        //   backgroundImage: `url('/assets/img/registration-form__bg.png')`,
                        // }}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmitHandler)}
                            encType="multipart/form-data"
                        >
                            {/* <h3>register now</h3>
              <SocialLogin /> */}

                            <div className="box-field__row">
                                <div className="box-field">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên đăng nhập"
                                        {...register("username")}
                                        onFocus={() =>
                                            setAuthError((prevState) => ({
                                                ...prevState,
                                                username: "",
                                            }))
                                        }
                                    />
                                    {errors.username && (
                                        <p style={{ color: "red" }}>
                                            {errors.username.message}
                                        </p>
                                    )}
                                    {authError.username && (
                                        <p style={{ color: "red" }}>
                                            {authError.username}
                                        </p>
                                    )}
                                </div>
                                <div className="box-field">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Mật Khẩu"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p style={{ color: "red" }}>
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="box-field__row">
                                <div className="box-field">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Họ Tên"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p style={{ color: "red" }}>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="box-field">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Địa Chỉ"
                                        {...register("address")}
                                    />
                                    {errors.address && (
                                        <p style={{ color: "red" }}>
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="box-field__row">
                                <div className="box-field">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Số Điện Thoại"
                                        {...register("phone")}
                                    />
                                    {errors.phone && (
                                        <p style={{ color: "red" }}>
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                                <div className="box-field">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p style={{ color: "red" }}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* <div className="box-field__row">
                                <span>password</span>
                                <div className="box-field">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="box-field">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div> */}
                            {/* <label className="checkbox-box checkbox-box__sm">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label> */}
                            <button className="btn" type="submit">
                                Đăng Kí
                            </button>
                            <div className="login-form__bottom">
                                <span>
                                    Bạn Đã Có Tài Khoản?{" "}
                                    <a onClick={() => router.push("/login")}>
                                        Đăng Nhập
                                    </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        /> */}
            </div>
            {/* <!-- REGISTRATION EOF   -->  */}
        </>
    );
};
