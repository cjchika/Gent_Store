import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../redux/actions/event";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error, isLoadingEvent } = useSelector(
    (state) => state.events
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1B",
      });
    }
    if (success) {
      toast.success("Event created successfully!", {
        toastId: "success1B",
      });
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("startDate", startDate.toISOString());
    newForm.append("finishDate", endDate.toISOString());
    dispatch(createEvent(newForm));
  };

  return (
    <div className="w-[90%] xl:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-6 overflow-y-scroll">
      <h5 className="text-2xl text-secColor font-semibold text-center">
        Create Event
      </h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Name <span className="text-secColor">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter event name"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Description <span className="text-secColor">*</span>
          </label>
          <textarea
            cols="20"
            required
            rows="4"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Category <span className="text-secColor">*</span>
          </label>
          <select
            className="text-secColor w-full mt-2 border p-3 bg-secColor bg-opacity-10 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose Category</option>
            {categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter event tags"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Original Price
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter event price"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Discount Price <span className="text-secColor">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter event discount price"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Product Stock <span className="text-secColor">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event stock"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter your event product stock"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="finishDate"
            id="start-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full p-3 border border-secColor rounded-md focus:outline-none focus:border-priColor sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your event product stock"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-secColor font-medium">
            Upload Images <span className="text-secColor">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full justify-center flex items-center flex-wrap ">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 text-deepSecColor cursor-pointer"
              />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[75px] w-[75px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <button
            disabled={isLoadingEvent}
            type="submit"
            className="mt-2 block w-full p-2 border bg-secColor hover:bg-deepSecColor rounded-md text-lg text-white"
          >
            {isLoadingEvent ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
