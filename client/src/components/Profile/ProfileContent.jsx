import { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { baseUrl, apiUrl } from "../../config/api";
import {
  updateUserInfo,
  updateUserAddress,
  deleteUserAddress,
  updateUserPassword,
  getUser,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(name, email, phoneNumber, password));
    toast.success("Profile updated successfully!");
  };

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("tok")}`,
      },
      withCredentials: true,
    };

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${apiUrl}user/updateUserAvatar`, formData, config)
      .then((res) => {
        console.log(res);
        dispatch(getUser());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* User Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${baseUrl}${user?.avatar}`}
                alt="user"
                className="w-[100px] h-[100px] rounded-full object-cover border-2 border-priColor"
              />
              <div className="text-secColor w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageUpdate}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-full 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] py-3 border-secColor mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] py-3 border-secColor mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] py-3 border-secColor mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] py-3 border-secColor mb-4 800px:mb-0`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`p-3 px-20 w-[95%] 800px:w-auto border border-secColor text-center text-secColor hover:bg-secColor hover:bg-opacity-5 rounded-lg mt-8`}
              >
                Update
              </button>
            </form>
          </div>
        </>
      )}
      {/* Order */}
      {active === 2 && (
        <div>
          {" "}
          <AllOrders />{" "}
        </div>
      )}
      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Payment */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1 ">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1 ">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    dispatch(updateUserPassword(oldPassword, newPassword, confirmPassword));
    dispatch(getUser());
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-secColor pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] my-2">
            <label className="block pb-2 text-secColor">
              Enter your old password
            </label>
            <input
              type="password"
              className={`${styles.input} p-3 rounded-full !w-[95%] mb-4 800px:mb-0`}
              placeholder="Old Password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] my-1">
            <label className="block pb-2 text-secColor">
              Enter your new password
            </label>
            <input
              type="password"
              className={`${styles.input} p-3 rounded-full !w-[95%] mb-4 800px:mb-0`}
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] my-2">
            <label className="block pb-2 text-secColor">
              Enter your confirm password
            </label>
            <input
              type="password"
              className={`${styles.input} p-3 rounded-full !w-[95%] mb-4 800px:mb-0`}
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-priColor hover:bg-litePriColor p-3 w-[95%] rounded-full mt-8 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
    dispatch(getUser());
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed z-50 w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[90%] lg:w-[50%] h-[85vh] md:h-auto lg:h-[85vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={20}
                className="cursor-pointer text-secColor"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center font-Poppins text-secColor text-lg">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-5">
                    <label className="block pb-2 text-secColor">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border p-3 rounded-2xl"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-5">
                    <label className="block pb-3 text-secColor">
                      Choose your City
                    </label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border p-3 rounded-2xl"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-5">
                    <label className="block pb-2 text-secColor">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className={`w-full border p-3 rounded-2xl`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-5">
                    <label className="block pb-2 text-secColor">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className={`w-full border p-3 rounded-2xl`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-5">
                    <label className="block pb-2 text-secColor">Zip Code</label>
                    <input
                      type="number"
                      className={`w-full border p-3 rounded-2xl`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-5">
                    <label className="block pb-2 text-secColor">
                      Address Type
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border p-3 rounded-2xl"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white text-lg p-3 rounded-2xl bg-secColor hover:bg-deepSecColor"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-secColor pb-2">
          My Addresses
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="text-white rounded-lg p-3 px-8 bg-secColor hover:bg-deepSecColor"
        >
          Add New
        </button>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex flex-col md:flex-row items-center px-3 shadow justify-between gap-3 p-3 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="md:pl-5 font-[600] text-secColor">
                {item.addressType}
              </h5>
            </div>
            <div className="md:pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="md:pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between md:pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-secColor"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-lg text-secColor">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};
