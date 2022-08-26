import { useState } from "react";
import ReviewModal from "components/Product/ReviewModal/ReviewModal";

export const Card = ({
    order,
    index,
    onCollapse,
    active,
    onCancelOrder,
    setCount,
}) => {
    const {
        createdDate,
        orderAddress,
        total,
        status,
        orderDetailsResponses,
        id,
    } = order;
    console.log(order);

    const [isOpen, setIsOpen] = useState();
    const [orderDetailsId, setOrderDetailsId] = useState();
    return (
        <>
            <div
                className={`profile-orders__item ${
                    active === index && "active"
                }`}
            >
                <div className="profile-orders__row">
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">Ngày</span>
                        <span className="profile-orders__item-date">
                            {new Date(createdDate).toLocaleDateString("en-GB")}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">Địa Chỉ</span>
                        <span className="profile-orders__item-addr">
                            {orderAddress}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">
                            Tổng Đơn Hàng
                        </span>
                        <span className="profile-orders__item-price">
                            {total.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">
                            Trạng Thái
                        </span>
                        <span
                            className={`profile-orders__col-${
                                status.delivered ? "delivered" : "onway"
                            }`}
                        >
                            {status}
                        </span>
                        <span
                            onClick={() => onCollapse(index)}
                            className="profile-orders__col-btn"
                        ></span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">
                            Hành Động
                        </span>
                        <span>
                            <button
                                className={`btn ${
                                    status !== "đang xử lý"
                                        ? "disabled_btn"
                                        : ""
                                }`}
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                                onClick={() => onCancelOrder(id)}
                            >
                                Hủy Đơn Hàng
                            </button>
                        </span>
                    </div>
                </div>
                <div className="profile-orders__content">
                    <ul>
                        {orderDetailsResponses.map((item, index) => (
                            <li
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                key={index}
                            >
                                <span>{`Tên Sản Phẩm: ${item.productName}`}</span>
                                <span>{`Số Lượng: ${item.quantity}`}</span>
                                <span>
                                    {`Tổng: ${item.amount.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}`}
                                </span>

                                <span
                                    className={`btn ${
                                        status === "đã hoàn thành" &&
                                        !item.isFeedback
                                            ? ""
                                            : "disabled_btn"
                                    }`}
                                    style={{
                                        paddingRight: 30,
                                        paddingLeft: 30,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setIsOpen(true);
                                        setOrderDetailsId(item.id);
                                    }}
                                >
                                    Đánh Giá
                                </span>
                            </li>
                        ))}
                        <li>
                            Phương Thức Thanh Toán
                            <span>Thanh Toán Khi Nhận Hàng</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ReviewModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                orderDetailsId={orderDetailsId}
                setCount={setCount}
            />
        </>
    );
};
