import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/calendar.scss";
import dayjs from "dayjs/esm";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);
import LightBox from "./lightBox";
import data1 from "../Data/data1.json";
// import data2 from "../Data/data2.json";
// import data3 from "../Data/data3.json";
// import data4 from "../Data/data4.json";

import dayOffData from "../Data/2023.json";

// dayjs.extend(weekday);
function Calendar() {
  const today = new Date();
  const nowMonth = today.getMonth() + 1; // 預設值是從0開始，故+1
  const nowYear = today.getFullYear(); // 預設值是從0開始，故+1

  //將雄獅JSON當按放入
  const [travelData, setTravelData] = useState(data1);

  // 年月日選擇項目
  const [selYear, setSelYear] = useState(nowYear);
  const [selMonth, setSelMonth] = useState(nowMonth);
  const [selDay, setSelDay] = useState("");

  //燈箱開關按鈕  到時會依照後端資料來判別需要開關UPS
  const [lightBoxBtn, setLightBoxBtn] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const JsonForm = useRef("");

  // 定義當月份日期，並給予dayJS api判別
  const thisMonthDate = `${selYear} / ${selMonth} / 01`;
  //定義當月開頭為星期幾
  const startWeekDay = dayjs(thisMonthDate).weekday();
  //定義當月有幾天
  const monthAllDate = dayjs(thisMonthDate).daysInMonth();
  //星期
  const day = ["日", "一", "二", "三", "四", "五", "六"];

  // 將匹配的日期帶入資料
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

  // Unicode轉 UTF8
  const dayOffDate = (v) => {
    // 如果值是字符串类型并且包含 % 和十六进制数字，则使用 decodeURIComponent 函数进行解码
    if (typeof v === "string" && /^%/.test(v)) {
      return decodeURIComponent(v);
    }
    return v;
  };

  // 扣除空白日
  // if   取出放假日期 並塞入新陣列
  // else 取得補班日期 並塞入新陣列
  const DayOffArray = [];
  const makeUpWorkday = [];
  dayOffDate(dayOffData)
    .filter((v, i) => v["Start Date"] !== "")
    .map((v) => {
      if (v.Subject !== "補行上班") {
        DayOffArray.push(v["Start Date"]);
      } else {
        makeUpWorkday.push(v["Start Date"]);
      }
    });
  //方法判斷今天是"補班" or "放假" or "平常日"
  const daily = (day) => {
    if (DayOffArray.includes(`${selYear}/${selMonth}/${day}`)) return "day_off";
    else if (makeUpWorkday.includes(`${selYear}/${selMonth}/${day}`))
      return "make_up_work";
    else return "normal_day";
  };

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
  const post_Json_data = async () => {
    const formData = new FormData(JsonForm.current);

    const result = await axios.put(
      "http://localhost:3001/inputJson",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result.data);
  };
  return (
    <>
      {lightBoxBtn && (
        <LightBox
          setLightBoxBtn={setLightBoxBtn}
          selMonth={selMonth}
          selDay={selDay}
          btnActive={btnActive}
          setBtnActive={setBtnActive}
        />
      )}
      <form
        action=""
        onClick={(e) => {
          // e.preventDefault();
        }}
        encType="multipart/form-data"
        ref={JsonForm}
      >
        <label htmlFor="">匯入新版行事曆</label>
        <br />
        <input
          type="file"
          accept="application/json"
          name="calendar"
          id="calendar"
          onChange={() => {
            post_Json_data();
          }}
        />
      </form>
      <div className="year">{selYear}年</div>
      <div className="month">
        <div className="month_left"></div>
        <div className="month_mid">
          <span
            onClick={() => {
              month_prev();
            }}
          >
            <i className="fa-solid fa-caret-left"></i>
          </span>
          <span className="day_number">{selMonth}月</span>
          <span
            onClick={() => {
              month_next();
            }}
          >
            <i className="fa-solid fa-caret-right"></i>
          </span>
        </div>
        <div className="month_right"></div>
      </div>

      <div className="tag">
        <span>放假</span>
        <div className="tag_holiday"></div>
        <span>補班</span>
        <div className="tag_work"></div>
      </div>

      <div className="day_wrap">
        {day.map((v, i) => {
          return (
            <div className="weekday" key={v}>
              {v}
            </div>
          );
        })}
      </div>
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
                className={daily(i + 1)}
                key={`day${i + 1}`}
                onClick={(e) => {
                  setSelDay(i + 1);
                  setLightBoxBtn(true);
                }}
              >
                <span className="day_number">{i + 1}</span>
                {/* 寫一個function 再次判斷  參數就帶入年月份 */}
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
    </>
  );
}

export default Calendar;
