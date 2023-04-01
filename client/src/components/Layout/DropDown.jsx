import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandler = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm p-2 px-4 mt-3">
      {categoriesData &&
        categoriesData.map((item, index) => (
          <div
            key={index}
            className={`${styles.normalFlex} text-secColor cursor-pointer `}
            onClick={() => submitHandler(item)}
          >
            <item.icon size={20} className="" />
            <p className="m-3 select-none text-sm">{item.title}</p>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
