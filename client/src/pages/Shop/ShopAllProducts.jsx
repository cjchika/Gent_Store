import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopProducts from "../../components/Shop/ShopProducts";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full ">
        <div className="w-[65px] 800px:w-[220px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <ShopProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
