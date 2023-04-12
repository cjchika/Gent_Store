import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/loading.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
};

export default Loader;
