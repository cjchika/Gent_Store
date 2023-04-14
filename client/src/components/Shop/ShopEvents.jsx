import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopEvents } from "../../redux/actions/event";
import { deleteShopEvent } from "../../redux/actions/event";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const ShopEvents = () => {
  const dispatch = useDispatch();
  const { events, isLoadingEvent } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllShopEvents(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteShopEvent(id));
    window.location.reload();
    toast.success("Event successfully deleted.", {
      toastId: "successA2",
    });
  };

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 200, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 280,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const productName = d.replace(/\s+/g, "-");
        return (
          <>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      {isLoadingEvent ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white ">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="text-secColor"
          />
        </div>
      )}
    </>
  );
};

export default ShopEvents;
