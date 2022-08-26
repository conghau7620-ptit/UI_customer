import { useState, useEffect, useContext } from "react";
import { Card } from "./Card/Card";
import { AuthContext } from "context/authProvider";
import { getOrder, cancelOrder } from "api/userApi";

export const ProfileOrders = () => {
    const { auth } = useContext(AuthContext);
    const [active, setActive] = useState(-1);
    const [orders, setOrders] = useState();
    const [count, setCount] = useState(0);

    const handleCollapse = (indx) => {
        if (active === indx) {
            setActive(-1);
        } else {
            setActive(indx);
        }
    };
    const getOrderList = async () => {
        try {
            const response = await getOrder(auth.id);
            setOrders(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOrderList();
    }, [count]);

    const handleCancelOrder = async (id) => {
        try {
            await cancelOrder(id);
            await getOrderList();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="profile-orders">
                <div className="profile-orders__row profile-orders__row-head">
                    <div className="profile-orders__col">Ngày</div>
                    <div className="profile-orders__col">Địa Chỉ</div>
                    <div className="profile-orders__col">Tổng Đơn Hàng</div>
                    <div className="profile-orders__col">Trạng Thái</div>
                    <div className="profile-orders__col">Hành Động</div>
                </div>
                {orders?.map((order, index) => (
                    <Card
                        key={index}
                        index={index}
                        onCollapse={handleCollapse}
                        order={order}
                        active={active}
                        onCancelOrder={handleCancelOrder}
                        setCount={setCount}
                    />
                ))}
            </div>
        </>
    );
};
