import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-sm rounded-xl p-4 pt-8">
      <div
        onClick={() => setActive(1)}
        className="flex items-center cursor-pointer w-full mb-8"
      >
        <RxPerson
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 1 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 2 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 3 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 4 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 5 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 6 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Payment Methods
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 7 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={console.log("Clicked")}
      >
        <AiOutlineLogin
          size={20}
          className={active === 1 ? "text-priColor" : "text-secColor"}
        />
        <span
          className={`pl-3 ${
            active === 8 ? "text-priColor" : "text-secColor"
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;