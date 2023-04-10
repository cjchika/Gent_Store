import { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const ProductDetails = ({ item }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {products} = useSelector((state) => state.products)
  // useEffect(() => {
  //   dispatch(getAllProductsShop(item && item.shop._id))
  // }, [])

  console.log(item);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-white">
      {item && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${item?.image_Url[select].url}`}
                  alt=""
                  className="w-[100%]"
                />
                <div className="w-full flex">
                  {/* {item &&
                    item?.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={item?.image_Url[0].url}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(0)}
                        />
                      </div>
                    ))} */}
                  <div
                    className={`${
                      select === 0 ? "border border-secColor " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={item?.image_Url[0].url}
                      alt=""
                      className="h-[100px] overflow-hidden object-cover"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border border-secColor " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={item?.image_Url[1].url}
                      alt=""
                      className="h-[100px] overflow-hidden object-cover"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1
                  className={`${styles.productTitle} mb-3 capitalize text-secColor`}
                >
                  {item.name}
                </h1>
                <p className="text-justify text-sm leading-7 text-secColor text-opacity-80">
                  {item.description}
                </p>
                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-priColor text-xl`}
                  >
                    ${item.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {item.originalPrice ? "$" + item.originalPrice : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-deepSecColor text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className=" font-medium px-4 py-[11px]">{count}</span>
                    <button
                      className="bg-deepSecColor text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <button
                  className={`${styles.button} bg-secColor hover:bg-deepSecColor !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </button>
                {/* <div className="flex items-center pt-8">
                  <img
                    src={`${backend_url}${item?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {item.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">(4/5) Ratings</h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={console.log("Clicked")}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <ProductDetailsInfo item={item} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ item, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b border-[#6b6b6d] border-opacity-10  pt-10 pb-3">
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>
      {active === 1 && (
        <>
          <p className="py-5 text-base text-secColor text-opacity-80 leading-8 pb-10 text-justify whitespace-pre-line">
            {item.description}
          </p>
        </>
      )}

      {active === 2 && (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${item.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${item?.shop?.avatar}` || null}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>
                    {item?.shop.name || "Gent Store"}
                  </h3>
                  <h5 className="pb-2 text-[15px]">(4/5) Ratings</h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{item.shop.description || "The Description"}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {item.shop?.createdAt?.slice(0, 10) || null}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">324</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
