import React, { useState } from "react";
import "../styles/lightBox.scss";
export default function LightBox({ setLightBoxBtn, selMonth, selDay }) {
  const [btnActive, setBtnActive] = useState(false);
  return (
    <div
      className="box_wrap"
      onClick={(e) => {
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

        <div className="ups_btn">
          <p>UPS開關</p>
          <div
            id="container"
            className={btnActive ? "is-active container" : "container"}
          >
            <div
              className={btnActive ? "is-active circle" : "circle"}
              onClick={() => {
                setBtnActive(!btnActive);
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
