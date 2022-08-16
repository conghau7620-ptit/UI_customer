import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
    { value: "highToMin", label: "Giá Cao - Thấp" },
    { value: "minToHigh", label: "Giá Thấp - Cao" },
];
export const Shop = ({ productsProps, categories, brands }) => {
    const allProducts = [...productsProps];

    const [productOrder, setProductOrder] = useState(
        allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
    );

    const [products, setProducts] = useState([...productOrder]);
    const [filter, setFilter] = useState({ isNew: false, isSale: false });
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);

    const handleFilterByCategories = (e, name) => {
        e.preventDefault();
        setCategory(name);
    };

    const handleFilterByBrands = (e, name) => {
        e.preventDefault();
        setBrand(name);
    };

    useEffect(() => {
        if (category && brand) {
            const newProduct = productOrder.filter(
                (product) =>
                    product.type === category && product.brand === brand
            );
            setProducts(newProduct);
        } else if (category && !brand) {
            const newProduct = productOrder.filter(
                (product) => product.type === category
            );
            setProducts(newProduct);
        } else if (brand && !category) {
            const newProduct = productOrder.filter(
                (product) => product.brand === brand
            );
            setProducts(newProduct);
        } else {
            setProducts([...productOrder]);
        }
    }, [category, brand]);

    useEffect(() => {
        setProducts(productOrder);
    }, [productOrder]);

    useEffect(() => {
        if (filter.isNew && filter.isSale) {
            const newPro = productOrder.filter(
                (pd) => pd.isNew === true && pd.isSale === true
            );
            setProducts(newPro);
        } else if (filter.isNew && !filter.isSale) {
            const newPro = productOrder.filter((pd) => pd.isNew === true);
            setProducts(newPro);
        } else if (filter.isSale && !filter.isNew) {
            const newPro = productOrder.filter((pd) => pd.isSale === true);
            setProducts(newPro);
        } else {
            setProducts([...productOrder]);
        }
    }, [filter, productOrder]);
    const paginate = usePagination(products, 9);

    const handleSort = (value) => {
        if (value === "highToMin") {
            const newOrder = allProducts.sort((a, b) =>
                a.price < b.price ? 1 : -1
            );
            setProductOrder(newOrder);
        }
        if (value === "minToHigh") {
            const newOrder = allProducts.sort((a, b) =>
                a.price > b.price ? 1 : -1
            );
            setProductOrder(newOrder);
        }
    };

    return (
        <div>
            {/* <!-- BEGIN SHOP --> */}
            <div className="shop">
                <div className="wrapper">
                    <div className="shop-content">
                        {/* <!-- Shop Aside --> */}
                        <div className="shop-aside">
                            <div className="box-field box-field__search">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Tìm Kiếm"
                                />
                                <i className="icon-search"></i>
                            </div>
                            <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Danh Mục Sản Phẩm
                                </span>
                                <ul>
                                    {categories.map(({ name }) => (
                                        <li
                                            key={name}
                                            onClick={(e) =>
                                                handleFilterByCategories(
                                                    e,
                                                    name
                                                )
                                            }
                                        >
                                            <a href="#">{name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Thương Hiệu
                                </span>
                                <ul>
                                    {brands.map(({ name }) => (
                                        <li
                                            key={name}
                                            onClick={(e) =>
                                                handleFilterByBrands(e, name)
                                            }
                                        >
                                            <a href="#">{name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Price
                                </span>
                                <div className="range-slider">
                                    <Range
                                        min={0}
                                        max={20}
                                        defaultValue={[0, 20]}
                                        tipFormatter={(value) => `${value}$`}
                                        allowCross={false}
                                        tipProps={{
                                            placement: "bottom",
                                            prefixCls: "rc-slider-tooltip",
                                        }}
                                    />
                                </div>
                            </div> */}
                        </div>
                        {/* <!-- Shop Main --> */}
                        <div className="shop-main">
                            <div className="shop-main__filter">
                                {/* <div className="shop-main__checkboxes">
                                    <label className="checkbox-box">
                                        <input
                                            checked={filter.isSale}
                                            onChange={() =>
                                                setFilter({
                                                    ...filter,
                                                    isSale: !filter.isSale,
                                                })
                                            }
                                            type="checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        SALE
                                    </label>
                                    <label className="checkbox-box">
                                        <input
                                            checked={filter.isNew}
                                            onChange={() =>
                                                setFilter({
                                                    ...filter,
                                                    isNew: !filter.isNew,
                                                })
                                            }
                                            type="checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        NEW
                                    </label>
                                </div> */}
                                <div className="shop-main__select">
                                    <Dropdown
                                        options={options}
                                        className="react-dropdown"
                                        onChange={(option) =>
                                            handleSort(option.value)
                                        }
                                        value={options[0]}
                                    />
                                </div>
                            </div>
                            <div className="shop-main__items">
                                <Products products={paginate?.currentData()} />
                            </div>

                            {/* <!-- PAGINATE LIST --> */}
                            <PagingList paginate={paginate} />
                        </div>
                    </div>
                </div>
                <img
                    className="promo-video__decor js-img"
                    src="/assets/img/promo-video__decor.jpg"
                    alt=""
                />
                <img
                    className="shop-decor js-img"
                    src="/assets/img/shop-decor.jpg"
                    alt=""
                />
            </div>
            {/* <!-- SHOP EOF   --> */}
        </div>
    );
};
