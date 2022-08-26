import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

import { createFeedBack } from "api/productApi";
const ReviewModal = ({ isOpen, setIsOpen, orderDetailsId, setCount }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    const [rating, setRating] = useState(0);
    const [detail, setDetail] = useState("");

    const handleSendFeedBack = async (e) => {
        e.preventDefault();
        try {
            await createFeedBack({ orderDetailsId, detail, vote: rating });
            setIsOpen(false);
            setRating(0);
            setDetail("");
            setCount((prevState) => prevState + 1);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* <!-- Product Review Form --> */}
                <div className="product-detail__form post-comment__form">
                    <form encType="multipart/form-data">
                        <h4>Để Lại Đánh Giá Và Nhận Xét</h4>
                        <div className="rating" data-id="rating_1">
                            <span>Đánh Giá: </span>
                            <Rating
                                onClick={(rate) => setRating(rate / 20)}
                                ratingValue={rating}
                                fillColor="#f5f242"
                                size="20px"
                                emptyColor="#ccc"
                            />
                        </div>
                        <div className="box-field box-field__textarea">
                            <textarea
                                className="form-control"
                                placeholder="Nhận Xét Của Bạn"
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => handleSendFeedBack(e)}
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};
export default ReviewModal;
