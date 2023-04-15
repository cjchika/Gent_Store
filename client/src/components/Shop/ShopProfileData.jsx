import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productData } from "../../static/data";
import { getAllShopProducts } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../subComponents/ProductCard/ProductCard";

const ShopProfileData = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllShopProducts(id));
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row justify-around">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold text-sm md:text-base ${
                active === 1 ? "text-priColor" : "text-secColor"
              } cursor-pointer pr-[10px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-semibold text-sm md:text-base ${
                active === 2 ? "text-priColor" : "text-secColor"
              } cursor-pointer pr-[10px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-semibold text-sm md:text-base ${
                active === 3 ? "text-priColor" : "text-secColor"
              } cursor-pointer pr-[10px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <Link to="/dashboard">
              <button
                className={`whitespace-nowrap font-medium bg-secColor hover:bg-deepSecColor p-2 px-4 text-white !rounded-md`}
              >
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>

      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {products?.map((i, index) => (
          <ProductCard item={i} key={index} isShop={true} />
        ))}
      </div>
      {products?.length === 0 && (
        <h5 className="w-full text-center py-5 text-lg text-secColor">
          No available Products for this shop!
        </h5>
      )}
    </div>
  );
};

export default ShopProfileData;
