import React, { useState } from "react";
import "../styles/calendar.scss";
import dayjs from "dayjs/esm";
import weekday from "dayjs/plugin/weekday";

import LightBox from "./lightBox";

dayjs.extend(weekday);

// dayjs.extend(weekday);
function Calendar() {
  const today = new Date();
  const nowMonth = today.getMonth() + 1; // 預設值是從0開始，故+1
  const [startYear, setStartYear] = useState(2023);
  const [endYear, setEndYear] = useState(2030);

  //選擇項目
  const [selYear, setSelYear] = useState(2023);
  const [selMonth, setSelMonth] = useState(nowMonth);
  const [selDay, setSelDay] = useState("");
  const [lightBoxBtn, setLightBoxBtn] = useState(true);

  // 定義當月份日期，並給予dayJS api判別
  const thisMonthDate = `${selYear} / ${selMonth} / 01`;
  //星期
  const day = ["日", "一", "二", "三", "四", "五", "六"];

  //一周text
  const dayTxt = (
    <div className="day_wrap">
      {day.map((v, i) => {
        return (
          <div className="weekday" key={v}>
            {v}
          </div>
        );
      })}
    </div>
  );

  //行事曆日期
  const renderDay = (
    <div className="day_wrap">
      {/* 空白日 */}
      {Array(dayjs(thisMonthDate).weekday())
        .fill(1)
        .map((v, i) => {
          return <div className="empty"></div>;
        })}
      {/* 有天數的 */}
      {Array(35 - dayjs(thisMonthDate).weekday())
        .fill(1)
        .map((v, i) => {
          //判斷當月有幾天
          if (i + 1 > dayjs(thisMonthDate).daysInMonth()) return;
          return (
            <div
              className="haveday"
              onClick={(e) => {
                setSelDay(e.target.innerText);
                setLightBoxBtn(true);
              }}
            >
              {i + 1}
            </div>
          );
        })}
    </div>
  );

  //月份上下切換 function
  const month_next = () => {
    setSelMonth(selMonth + 1);
    if (selMonth >= 12) {
      setSelYear(selYear + 1);
      setSelMonth(1);
    }
  };
  const month_prev = () => {
    setSelMonth(selMonth - 1);
    if (selMonth <= 1) {
      setSelYear(selYear - 1);
      setSelMonth(12);
    }
  };

  return (
    <>
      {lightBoxBtn && (
        <LightBox
          setLightBoxBtn={setLightBoxBtn}
          selMonth={selMonth}
          selDay={selDay}
        />
      )}
      <div>{selYear}</div>
      <div className="month">
        <span
          onClick={() => {
            month_prev();
          }}
        >
          <i className="fa-solid fa-caret-left"></i>
        </span>
        {selMonth}月
        <span
          onClick={() => {
            month_next();
          }}
        >
          <i className="fa-solid fa-caret-right"></i>
        </span>
      </div>
      {dayTxt}
      {renderDay}
    </>
  );
}

export default Calendar;
