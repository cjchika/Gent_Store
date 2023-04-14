import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error, isLoadingProduct } = useSelector(
    (state) => state.products
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

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1A",
      });
    }
    if (success) {
      toast.success("Product created successfully!", {
        toastId: "success1A",
      });
      navigate("/dashboard-products");
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
    dispatch(createProduct(newForm));
  };

  return (
    <div className="w-[90%] xl:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-6 overflow-y-scroll">
      <h5 className="text-2xl text-secColor font-semibold text-center">
        Create Product
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
            placeholder="Enter product name"
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
            placeholder="Enter product description"
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
            placeholder="Enter product tags"
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
            placeholder="Enter product price"
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
            placeholder="Enter product discount price"
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
            placeholder="Enter your product stock"
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
            disabled={isLoadingProduct}
            type="submit"
            className="mt-2 block w-full p-2 border bg-secColor hover:bg-deepSecColor rounded-md text-lg text-white"
          >
            {isLoadingProduct ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
