import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
import { baseUrl } from "../../config/api";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
  //    setData(res.data.shop);
  //    setIsLoading(false);
  //   }).catch((error) => {
  //     console.log(error);
  //     setIsLoading(false);
  //   })
  // }, [])

  const handleLogout = () => {
    localStorage.setItem("shoptok", null);
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
                src={`${baseUrl}${data.avatar}`}
                alt="shop-logo"
                className="w-[100px] h-[100px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-secColor p-[10px] flex items-center">
              {data.description}
            </p>
          </div>
          <div className="p-3 flex gap-10">
            <h5 className="font-semibold text-secColor text-sm">Address</h5>
            <h4 className="text-secColor">{data.address}</h4>
          </div>
          <div className="p-3 flex gap-10">
            <h5 className="font-semibold text-secColor text-sm">
              Phone Number
            </h5>
            <h4 className="text-secColor">{data.phoneNumber}</h4>
          </div>
          <div className="p-3 flex gap-10">
            <h5 className="font-semibold text-secColor text-sm">
              Total Products
            </h5>
            <h4 className="text-secColor">10</h4>
          </div>
          <div className="p-3 flex gap-10">
            <h5 className="font-semibold text-secColor text-sm">
              Shop Ratings
            </h5>
            <h4 className="text-secColor">4/5</h4>
          </div>
          <div className="p-3 flex gap-10">
            <h5 className="font-semibold text-secColor text-sm">Joined On</h5>
            <h4 className="text-secColor">{data?.createdAt?.slice(0, 10)}</h4>
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
