import React, { useRef, useEffect, useState } from "react";
import { Debugout } from "debugout.js";
import "../styles/keyboard.scss";
const bugout = new Debugout();
const keyboardRow1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "back"];
const AtoZ = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const atoz = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
export default function Keyboard({ inputText, setInputText }) {
  const [capSwitch, setCapSwitch] = useState(false);
  const display = capSwitch ? AtoZ : atoz;
  //按鍵輸入方法
  let newText = inputText;
  const clickFunction = function (e) {
    if (e.innerText === "back") {
      const delText = newText.slice(0, -1);
      setInputText(delText);
    } else {
      newText += `${e.innerText}`;
      setInputText(newText);
    }
    bugout.log(e.innerText);
  };
  //
  const taillog = function () {
    return bugout.tail(5);
  };
  useEffect(() => {}, [capSwitch]);
  return (
    <div>
      <div className="row1">
        {keyboardRow1.map((v, i) => {
          return (
            <div
              key={v}
              className="keyboard"
              onFocus={(e) => {
                e.preventDefault();
              }}
            >
              <button
                onClick={(e) => {
                  clickFunction(e.target);
                }}
              >
                {v}
              </button>
            </div>
          );
        })}
      </div>
      <div className="row2">
        {display.map((v, i) => {
          if (i <= 12)
            return (
              <div key={v} className="keyboard">
                <button
                  onClick={(e) => {
                    clickFunction(e.target);
                  }}
                >
                  {v}
                </button>
              </div>
            );
        })}
      </div>
      <div className="row3">
        {display.map((v, i) => {
          if (i > 12)
            return (
              <div key={v} className="keyboard">
                <button
                  onClick={(e) => {
                    clickFunction(e.target);
                  }}
                >
                  {v}
                </button>
              </div>
            );
        })}
      </div>
      <button
        onClick={() => {
          setCapSwitch(!capSwitch);
        }}
        className={capSwitch ? "cap" : ""}
      >
        Cap
      </button>
      <button
        onClick={() => {
          setInputText("");
        }}
      >
        清除
      </button>
      <button
        onClick={() => {
          bugout.downloadLog();
        }}
      >
        下載log檔案
      </button>
      <button>search</button>
    </div>
  );
}
