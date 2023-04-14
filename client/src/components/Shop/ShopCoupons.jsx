import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import couponApi from "../../config/services/coupon";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const ShopCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmout] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [value, setValue] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getCoupons() {
      setIsLoading(true);

      const { response, error } = await couponApi.getShopCoupons(seller._id);

      if (response) setCoupons(response.coupons);
      if (error) toast.error(error.message);

      setIsLoading(false);
    }
    getCoupons();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const { response, error } = await couponApi.deleteShopCoupon(id);

    if (response) toast.success("Coupon code deleted succesfully!");
    if (error) toast.error(error.message);

    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    _setIsLoading(true);

    const { response, error } = await couponApi.createCoupon({
      name,
      minAmount,
      maxAmount,
      selectedProduct,
      value,
      shopId: seller._id,
    });

    if (response) {
      toast.success("Coupon code created successfully!");
      setOpen(false);
      window.location.reload();
    }
    if (error) {
      toast.error(error.message);
    }
    _setIsLoading(false);
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 180, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "Delete",
      flex: 0.2,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete className="text-secColor" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "% " + item.value,
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-center md:justify-end">
            <button
              className={`bg-secColor hover:bg-deepSecColor text-white w-max p-2 px-3 rounded-md m-3`}
              onClick={() => setOpen(true)}
            >
              Create Coupon Code
            </button>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="overflow-scroll w-[90%] 800px:w-[50%] h-[85%] 400px:h-auto lg:h-[85%] bg-white rounded-md shadow p-6">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={20}
                    className="cursor-pointer text-secColor"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-2xl text-secColor text-center">
                  Create Coupon code
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2 text-secColor font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon code name"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2 text-secColor font-medium">
                      Discount Percentenge{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter coupon code value"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2 text-secColor font-medium">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Enter coupon code min amount"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2 text-secColor font-medium">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter coupon code max amount"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2 text-secColor font-medium">
                      Select Product
                    </label>
                    <select
                      className="text-secColor w-full mt-2 border p-3 bg-secColor bg-opacity-10 rounded-md"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Select product">Select Product</option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full text-white mt-2 p-3 bg-secColor hover:bg-deepSecColor rounded-md"
                  >
                    {_isLoading ? "Creating Coupon..." : "Create Coupon"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopCoupons;
