import React, { useState } from "react";
import "../styles/calendar.scss";
function Calendar() {
  const today = new Date();
  const nowMonth = today.getMonth() + 1; // 預設值是從0開始，故+1
  const [startYear, setStartYear] = useState(2023);
  const [endYear, setEndYear] = useState(2030);

  //選擇項目
  const [selYear, setSelYear] = useState(2023);
  const [selMonth, setSelMonth] = useState(nowMonth);
  //星期幾
  const day = ["日", "一", "二", "三", "四", "五", "六"];
  const dayTxt = (
    <tr>
      {day.map((v, i) => {
        return <td key={v}>{v}</td>;
      })}
    </tr>
  );

  //行事曆空白框
  const emptyCalendar = Array(5)
    .fill(1)
    .map((v, i) => {
      return (
        <tr key={i + 10}>
          {Array(7)
            .fill(1)
            .map((v, i) => {
              return <td key={i} className="empty_day"></td>;
            })}
        </tr>
      );
    });

  const next = () => {
    setSelMonth(selMonth + 1);
    if (selMonth >= 12) {
      setSelYear(selYear + 1);
      setSelMonth(1);
    }
  };

  //計算當月開始日期為星期幾
  return (
    <>
      <div>{selYear}</div>
      <div className="month">
        <span>
          <i className="fa-solid fa-caret-left"></i>
        </span>
        {selMonth}月
        <span
          onClick={() => {
            next();
          }}
        >
          <i className="fa-solid fa-caret-right"></i>
        </span>
      </div>
      <table>
        <thead>{dayTxt}</thead>
        <tbody>{emptyCalendar}</tbody>
      </table>
    </>
  );
}

export default Calendar;
