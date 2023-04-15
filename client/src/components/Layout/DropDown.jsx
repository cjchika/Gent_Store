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
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-lg shadow-sm p-3 mt-3">
      {categoriesData?.map((item, index) => (
        <div
          key={index}
          className={`${styles.normalFlex} px-2 text-secColor cursor-pointer hover:bg-secColor hover:bg-opacity-5`}
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
