import React from "react";
// import ReactTurnPlate from "react-turnplate";
import img1 from "/imgs/spin.jpg";
export default function Turntable() {
  const onTryRotate = () => {
    /* do some check stuff,if can not rotate return*/
    this.setState({ canStartRotate: true });
  };

  const reward_list = [
    { icon: "imageurl", name: "prize1", id: 1 },
    { icon: "imageurl", name: "prize1", id: 2 },
  ];

  return (
    <div>
      <div className="wheel"></div>
      {/* <img src={img1} alt="" /> */}
    </div>
  );
}
