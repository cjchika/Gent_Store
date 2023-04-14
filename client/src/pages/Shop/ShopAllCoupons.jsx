import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopCoupons from "../../components/Shop/ShopCoupons";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full ">
        <div className="w-[65px] 800px:w-[220px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <ShopCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
