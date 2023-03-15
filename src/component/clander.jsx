import React, { useState, useCallback, useEffect } from "react";
import "../styles/calendar.scss";
import dayjs from "dayjs/esm";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);
import LightBox from "./lightBox";
import data1 from "../Data/data1.json";
// import data2 from "../Data/data2.json";
// import data3 from "../Data/data3.json";
// import data4 from "../Data/data4.json";

// dayjs.extend(weekday);
function Calendar() {
  const today = new Date();
  const nowMonth = today.getMonth() + 1; // 預設值是從0開始，故+1
  const nowYear = today.getFullYear(); // 預設值是從0開始，故+1
  const [startYear, setStartYear] = useState(2023);
  const [endYear, setEndYear] = useState(2030);

  const [travelData, setTravelData] = useState(data1);

  //選擇項目
  const [selYear, setSelYear] = useState(2017);
  const [selMonth, setSelMonth] = useState(nowMonth);
  const [selDay, setSelDay] = useState("");
  const [lightBoxBtn, setLightBoxBtn] = useState(true);

  // 定義當月份日期，並給予dayJS api判別
  const thisMonthDate = `${selYear} / ${selMonth} / 01`;
  //定義當月開頭為星期幾
  const startWeekDay = dayjs(thisMonthDate).weekday();
  //定義當月有幾天
  const monthAllDate = dayjs(thisMonthDate).daysInMonth();
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

  // 看更多

  const goToTravel = (day) => {
    let filterResult = [];
    let newData = [];

    filterResult = travelData
      .sort((a, b) => {
        return (
          new Date(a.price).getFullYear() - new Date(b.price).getFullYear()
        );
      })
      .filter((v) => {
        return (
          new Date(v.date).getFullYear() === selYear &&
          new Date(v.date).getMonth() + 1 === selMonth &&
          new Date(v.date).getDate() === day
        );
      });

    newData = filterResult.map((v, i, arr) => {
      const month = new Date(v.date).getMonth() + 1;
      if (!month) return;
      if (i === 0)
        return (
          <div className="travel_wrap" key={i}>
            <div>
              {filterResult.length > 1 ? (
                <>
                  <p className="more">
                    看更多團位<i className="fa-solid fa-play"></i>
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={
                      v.status === "額滿" ? "status_full" : "status_vacancies"
                    }
                  >
                    {v.status}
                  </p>
                  <p>可賣：{v.availableVancancy}</p>
                  <p>團位：{v.totalVacnacy}</p>
                  <p className="money">
                    ${v.price}
                    {filterResult.length > 1 ? "起" : ""}
                  </p>
                </>
              )}
            </div>
          </div>
        );
    });
    return newData;
  };

  //行事曆日期
  const renderDay = (
    <div className="day_wrap">
      {/* 開頭空白日 */}
      {Array(startWeekDay)
        .fill(1)
        .map((v, i) => {
          return <div className="empty" key={`empty${i}`}></div>;
        })}
      {/* 有天數的 */}

      {Array(monthAllDate)
        .fill(1)
        .map((v, i) => {
          return (
            <div
              className="haveday"
              key={`day${i + 1}`}
              onClick={(e) => {
                setSelDay(i + 1);
                setLightBoxBtn(true);
              }}
            >
              {/* 寫一個function 再次判斷  參數就帶入年月份 */}

              {i + 1}
              {goToTravel(i + 1)}
            </div>
          );
        })}
      {/* 尾段空白日 */}
      {Array(
        startWeekDay + monthAllDate <= 35
          ? 35 - (startWeekDay + monthAllDate)
          : 42 - (startWeekDay + monthAllDate)
      )
        .fill(1)
        .map((v, i) => {
          return <div className="empty" key={`empty2_${i}`}></div>;
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
      <div className="year">{selYear}年</div>
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
