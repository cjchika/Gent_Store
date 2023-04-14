import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopEvents from "../../components/Shop/ShopEvents";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full ">
        <div className="w-[65px] 800px:w-[220px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <ShopEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
