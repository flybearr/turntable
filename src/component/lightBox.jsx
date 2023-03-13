import React from "react";
import "../styles/lightBox.scss";
export default function LightBox({ setLightBoxBtn, selMonth, selDay }) {
  return (
    <div
      className="box_wrap"
      onClick={() => {
        setLightBoxBtn(false);
      }}
    >
      <div
        className="box"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>
          {selMonth}月{selDay}日 &nbsp; UPS設定
        </p>
      </div>
    </div>
  );
}
