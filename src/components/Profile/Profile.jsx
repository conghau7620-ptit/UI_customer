import { useState, useContext } from "react";
import { ProfileAside } from "./ProfileAside/ProfileAside";
import { ProfileOrders } from "./ProfileOrders/ProfileOrders";
import router from "next/router";
import { AuthContext } from "context/authProvider";
import { removeItem } from "utils/local";
export const Profile = () => {
    const [activeTab, setActiveTab] = useState("orders");
    const { setAuth } = useContext(AuthContext);
    return (
        <>
            {/* <!-- BEGIN PROFILE --> */}
            <div className="profile">
                <div className="wrapper">
                    <div className="profile-content">
                        {/* <ProfileAside /> */}
                        <div className="profile-main">
                            <div className="tab-wrap">
                                <ul className="nav-tab-list tabs">
                                    <li
                                        onClick={() => setActiveTab("myInfo")}
                                        className={
                                            activeTab === "myInfo"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        Thông Tin
                                    </li>
                                    <li
                                        onClick={() => setActiveTab("orders")}
                                        className={
                                            activeTab === "orders"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        Quản Lý Đơn Hàng
                                    </li>
                                    <li
                                        onClick={() => {
                                            router.push("/");
                                            removeItem("TOKEN");
                                            setAuth(null);
                                        }}
                                    >
                                        Đăng Xuất
                                    </li>
                                    {/* <li
                    onClick={() => setActiveTab('wishList')}
                    className={activeTab === 'wishList' ? 'active' : ''}
                  >
                    Wishlist
                  </li> */}
                                </ul>

                                <div className="box-tab-cont">
                                    {activeTab === "myInfo" && (
                                        <div
                                            className="tab-cont"
                                            id="profile-tab_1"
                                        >
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Neque
                                            quasi, sit vel exercitationem ea
                                            veniam quo asperiores corporis
                                            dignissimos quod id. Adipisci libero
                                            similique a commodi fugiat quibusdam
                                            maiores ipsa!
                                        </div>
                                    )}

                                    {activeTab === "orders" && (
                                        <ProfileOrders />
                                    )}

                                    {activeTab === "wishList" && (
                                        <div
                                            className="tab-cont"
                                            id="profile-tab_3"
                                        >
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Cumque
                                            tempore saepe blanditiis omnis.
                                            Reprehenderit officia atque facere
                                            tempora, neque quaerat et aliquid
                                            tempore mollitia, nemo, minima iste
                                            placeat cupiditate odio?
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img
                    className="promo-video__decor js-img"
                    src="/assets/img/promo-video__decor.jpg"
                    alt=""
                /> */}
            </div>
            {/* <!-- PROFILE EOF   --> */}
        </>
    );
};
