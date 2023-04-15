import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
import { baseUrl } from "../../config/api";
import shopApi from "../../config/services/shop.api";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const [shop, setShop] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchShopInfo = async () => {
      setIsLoading(true);
      const { response, error } = await shopApi.getShopInfo(id);
      if (response) setShop(response.shop);
      if (error) console.log(error.message);
      setIsLoading(false);
    };
    fetchShopInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shoptok");
    navigate("/");
    toast.success("Logout Success.");
    window.location.reload(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${baseUrl}${shop?.avatar}`}
                alt="shop-logo"
                className="w-[100px] h-[100px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center font-semibold text-secColor py-2 text-base">
              {shop?.name}
            </h3>
            <p className="text-[16px] text-secColor p-[10px] flex items-center">
              {shop?.description}
            </p>
          </div>
          <div className="p-3 flex flex-col 800px:flex-row justify-between">
            <h5 className="font-semibold text-secColor text-sm">Address</h5>
            <h4 className="text-secColor text-sm">{shop?.address}</h4>
          </div>
          <div className="p-3 flex flex-col 800px:flex-row justify-between">
            <h5 className="font-semibold text-secColor text-sm">
              Phone Number
            </h5>
            <h4 className="text-secColor text-sm">{shop?.phoneNumber}</h4>
          </div>
          <div className="p-3 flex flex-col 800px:flex-row justify-between">
            <h5 className="font-semibold text-secColor text-sm">
              Total Products
            </h5>
            <h4 className="text-secColor text-sm">{products?.length}</h4>
          </div>
          <div className="p-3 flex flex-col 800px:flex-row justify-between">
            <h5 className="font-semibold text-secColor text-sm">
              Shop Ratings
            </h5>
            <h4 className="text-secColor text-sm">4/5</h4>
          </div>
          <div className="p-3 flex flex-col 800px:flex-row justify-between">
            <h5 className="font-semibold text-secColor text-sm">
              Shop Created
            </h5>
            <h4 className="text-secColor text-sm">
              {shop?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <button
                className={`${styles.button} hover:bg-deepSecColor !w-full !h-[35px] !rounded-[5px]`}
              >
                Edit Shop
              </button>
              <button
                className={`${styles.button} hover:bg-deepSecColor !w-full !h-[35px] !rounded-[5px]`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
