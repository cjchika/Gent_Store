import React from "react";
import { Link } from "react-router-dom";
import { dashboardSideBarContent } from "../../../static/data";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full pt-4 lg:pt-8 h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      {dashboardSideBarContent.map((item) => (
        <div key={item.id} className="w-full flex items-center p-4">
          <Link to={item.link} className="w-full flex items-center">
            <item.icon
              size={20}
              className={`font-medium ${
                active === item.id ? "text-priColor" : "text-secColor"
              }`}
            />
            <h5
              className={`hidden 800px:block pl-2 text-sm font-medium ${
                active === item.id ? "text-priColor" : "text-secColor"
              }`}
            >
              {item.title}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
