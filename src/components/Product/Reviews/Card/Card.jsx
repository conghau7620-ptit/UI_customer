export const Card = ({ review }) => {
    const { customerName, customerImage, createdDate, vote, detail } = review;
    return (
        <>
            {/* Being Product Review */}
            <div className="review-item">
                <div className="review-item__head">
                    <div className="review-item__author">
                        <img src={customerImage} className="js-img" alt="" />
                        <span className="review-item__name">
                            {customerName}
                        </span>
                        <span className="review-item__date">
                            {new Date(createdDate).toLocaleDateString("en-GB")}
                        </span>
                    </div>
                    <div className="review-item__rating">
                        <ul className="star-rating">
                            {[...Array(vote)].map((star, index) => {
                                return (
                                    <li key={index}>
                                        <i className="icon-star"></i>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="review-item__content">{detail}</div>
            </div>
        </>
    );
};
