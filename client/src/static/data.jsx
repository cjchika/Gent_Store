import { MdComputer, MdChildCare, MdLocalOffer } from "react-icons/md";
import { HiGift } from "react-icons/hi";
import { GiRunningShoe, GiClothes, GiSittingDog } from "react-icons/gi";
import { FaBaby, FaMobile } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import {
  BsFillCartCheckFill,
  BsFillAwardFill,
  BsShieldFillCheck,
} from "react-icons/bs";
import iPhoneImg from "./images/iPhone.png";
import iPhoneBG from "./images/BG1.png";
import iWatchImg from "./images/iWatch.png";
import iWatchBG from "./images/iWatchBG.png";
import macbookImg from "./images/macbook.png";
import macbookBG from "./images/BG2.png";
import GamePadImg from "./images/catimg1.png";
import GiftImg from "./images/catimg2.png";
import PetImg from "./images/catimg3.png";
import SuitImg from "./images/catimg4.png";
import ShoeImg from "./images/catimg5.png";
import LaptopImg from "./images/catimg6.png";
import WatchImg from "./images/catimg7.png";
import CosmeticImg from "./images/catimg8.png";
import iPhone from "./images/catimg9.png";

import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";

// Dashboard Nav Icons
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

// Dashboard Sidebar Icons
import { AiOutlineFolderAdd } from "react-icons/ai";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { MdOutlineLocalOffer } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { HiOutlineReceiptRefund } from "react-icons/hi";

export const dashboardSideBarContent = [
  { id: 1, title: "Dashboard", icon: RxDashboard, link: "/dashboard" },
  {
    id: 2,
    title: "All Orders",
    icon: FiShoppingBag,
    link: "/dashboard-orders",
  },
  {
    id: 3,
    title: "All Products",
    icon: FiPackage,
    link: "/dashboard-products",
  },
  {
    id: 4,
    title: "Create Product",
    icon: AiOutlineFolderAdd,
    link: "/dashboard-create-product",
  },
  {
    id: 5,
    title: "All Events",
    icon: BsCalendar2Event,
    link: "/dashboard-events",
  },
  {
    id: 6,
    title: "Create Event",
    icon: VscNewFile,
    link: "/dashboard-create-event",
  },
  {
    id: 7,
    title: "Withdraw Money",
    icon: CiMoneyBill,
    link: "/dashboard-withdraw-money",
  },
  {
    id: 8,
    title: "Shop Inbox",
    icon: BiMessageSquareDetail,
    link: "/dashboard-messages",
  },
  {
    id: 9,
    title: "Discount Codes",
    icon: AiOutlineGift,
    link: "/dashboard-coupons",
  },
  {
    id: 10,
    title: "Refunds",
    icon: HiOutlineReceiptRefund,
    link: "/dashboard-refunds",
  },
  { id: 11, title: "Settings", icon: CiSettings, link: "/dashboard-settings" },
];

export const dashboardHeaderContent = [
  { id: 1, title: "Gifts", icon: AiOutlineGift, link: "/dashboard/coupons" },
  {
    id: 2,
    title: "Offers",
    icon: MdOutlineLocalOffer,
    link: "/dashboard-events",
  },
  {
    id: 3,
    title: "Products",
    icon: FiShoppingBag,
    link: "/dashboard-products",
  },
  { id: 4, title: "Orders", icon: FiPackage, link: "/dashboard-orders" },
  {
    id: 5,
    title: "Messages",
    icon: BiMessageSquareDetail,
    link: "/dashboard-messages",
  },
];

export const profileSideBarContent = [
  { id: 1, title: "Profile", icon: RxPerson },
  { id: 2, title: "Orders", icon: HiOutlineShoppingBag },
  { id: 3, title: "Refunds", icon: HiOutlineReceiptRefund },
  { id: 4, title: "Inbox", icon: AiOutlineMessage },
  { id: 5, title: "Track Order", icon: MdOutlineTrackChanges },
  { id: 6, title: "Payment Methods", icon: AiOutlineCreditCard },
  { id: 7, title: "Address", icon: TbAddressBook },
  { id: 8, title: "Log Out", icon: AiOutlineLogin },
];

export const heroData = [
  {
    title: "Smart Wearable",
    description: "Best Deal Online on smart watches",
    image: iWatchImg,
    backgroundImg: iWatchBG,
  },
  {
    title: "Luxury Macbooks",
    description: "Best Deal Online on high-end devices",
    image: macbookImg,
    backgroundImg: macbookBG,
  },
  {
    title: "Trendy Gadgets",
    description: "Best Deal Online on trendy iPhones",
    image: iPhoneImg,
    backgroundImg: iPhoneBG,
  },
];

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: BsFillCartCheckFill,
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: MdLocalOffer,
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: BsFillAwardFill,
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: BsShieldFillCheck,
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    icon: MdComputer,
  },
  {
    id: 2,
    title: "Cosmetics and Body Care",
    subTitle: "",
    icon: MdChildCare,
  },
  {
    id: 3,
    title: "Accessories",
    subTitle: "",
    icon: FaBaby,
  },
  {
    id: 4,
    title: "Clothes",
    subTitle: "",
    icon: GiClothes,
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    icon: GiRunningShoe,
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    icon: HiGift,
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "",
    icon: GiSittingDog,
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "",
    icon: FaMobile,
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "",
    icon: IoGameController,
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    icon: CgMoreO,
  },
];

export const categories = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "Laptops",
    img: LaptopImg,
  },
  {
    id: 2,
    title: "Cosmetics and Body Care",
    subTitle: "Cosmetics",
    img: CosmeticImg,
  },
  {
    id: 3,
    title: "Accessories",
    subTitle: "Accessories",
    img: WatchImg,
  },
  {
    id: 4,
    title: "Clothes",
    subTitle: "Clothes",
    img: SuitImg,
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "Shoes",
    img: ShoeImg,
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "Gifts",
    img: GiftImg,
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "Pet Care",
    img: PetImg,
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "Mobile",
    img: iPhone,
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "Gaming",
    img: GamePadImg,
  },
];

// product Data
export const productData = [
  {
    id: 1,
    category: "Computers and Laptops",
    name: "MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1 year warranty",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 1099,
    discountPrice: 1049,
    rating: 4,
    total_sell: 35,
    stock: 10,
  },
  {
    id: 2,
    category: "Mobile and Tablets",
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discountPrice: 1099,
    rating: 5,
    total_sell: 80,
    stock: 10,
    category: "Mobile & Tablets",
  },
  {
    id: 3,
    category: "Computers and Laptop",
    name: "MacBook pro M2 chipset 256gb ssd 8gb ram space gray color with apple 1 year warranty",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
      {
        public_id: "test",
        url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 1099,
    discountPrice: 1049,
    rating: 4,
    total_sell: 75,
    stock: 10,
    category: "Computers & Laptop",
  },
  {
    id: 4,
    category: "Others",
    name: "New Fashionable Watch for men 2023 with multiple colors",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
    ],
    shop: {
      name: "Shahriar Watch House",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
      category: "Others",
    },
    originalPrice: 100,
    discountPrice: 79,
    rating: 4,
    total_sell: 12,
    stock: 10,
  },
  {
    id: 5,
    category: "Shoes",
    name: "New Trend shoes for gents with all sizes",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
      {
        public_id: "test",
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 120,
    discountPrice: 89,
    rating: 5,
    total_sell: 49,
    stock: 10,
    category: "Shoes",
  },
  {
    id: 6,
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 300,
    discountPrice: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
    category: "Music and Gaming",
  },
  {
    id: 7,
    name: "New Fashionable Watch for men 2023 with multiple colors",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
      {
        public_id: "test",
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
      },
    ],
    shop: {
      name: "Shahriar Watch House",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 100,
    discountPrice: 79,
    rating: 4,
    total_sell: 62,
    stock: 10,
  },
  {
    id: 8,
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 300,
    discountPrice: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
  },
  {
    id: 9,
    category: "Mobile and Tablets",
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
      {
        public_id: "test",
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discountPrice: 1099,
    rating: 5,
    total_sell: 20,
    stock: 10,
  },
  {
    id: 10,
    category: "Music and Gaming",
    name: "Gaming Headphone Asus with mutiple color and free delivery",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
      {
        public_id: "test",
        url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
      },
    ],
    shop: {
      name: "Asus Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    originalPrice: 300,
    discountPrice: 239,
    rating: 4.5,
    reviews: [
      {
        user: {
          // user object will be here
        },
        comment: "IT's so cool!",
        rating: 5,
      },
    ],
    total_sell: 20,
    stock: 10,
  },
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];
