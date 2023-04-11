import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../config/api";
import Logo from "../../Layout/Logo";
import { dashboardHeaderContent } from "../../../static/data";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <Logo align={null} path={"/dashboard"} />
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {dashboardHeaderContent.map((item, index) => (
            <Link key={index} to={item.link} className="800px:block hidden">
              <item.icon
                size={27}
                className="mx-5 cursor-pointer text-secColor"
                title={item.title}
              />
            </Link>
          ))}
          <Link to={`/shop/${seller?._id}`}>
            <img
              src={`${baseUrl}${seller?.avatar}`}
              alt=""
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
