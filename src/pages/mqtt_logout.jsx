import React, { useState, useEffect } from "react";
import Keyboard from "../component/keyboard";

// import * as mqtt from "mqtt/dist/mqtt";
var mqtt = require("mqtt");
var options = {
  protocol: "11883",
  // clientId uniquely identifies client
  // choose any string you wish
  connectTimeout: 4000,
  reconnectPeriod: 3000,
  clientId: Math.random().toString(16).substring(2, 8),
};
const client = mqtt.connect("ws://localhost:11883", options);
const allTopic = ["www", "parking"];
// preciouschicken.com is the MQTT topic
client.subscribe(allTopic);
client.publish("www");

function Mqtt_logout() {
  const [clients, setClient] = useState(client);
  const [connectState, setConnectState] = useState(false);
  const [payload, setPayload] = useState("目前沒有");
  const [topic, setTopic] = useState("");
  const [mqtt_message, setMqtt_message] = useState("");

  //publish'
  const [selTopic, setSelTopic] = useState(allTopic[0]);
  const [outputContext, setOutputContext] = useState("");

  const [inputText, setInputText] = useState("");

  const mqttPublish = (topic, payload, qos = 0) => {
    if (clients) {
      client.publish(topic, payload, qos, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  useEffect(() => {
    if (clients) {
      client.on("connect", () => {
        setConnectState(true);
        console.log("已完成連線");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        setConnectState(false);
        client.end();
        // client.reconnect();
      });
      client.on("reconnect", () => {
        setConnectState(true);
        console.log("嘗試連線");
      });
      client.on("message", (topic, message) => {
        console.log("收到" + topic + message.toString());
        const new_payload = { topic, message: message.toString() };
        const new_message = message.toString().replace(/\{|}|"|'/g, "");
        setPayload(new_payload);
        setTopic(topic);
        setMqtt_message(new_message);
      });
    }
  }, [clients]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>A taste of MQTT in React</h1>
        {/* 接收區 */}
        <div style={{ border: "1px solid red" }}>
          <p>連線狀態:{connectState ? "已連線" : "未連線"} </p>
          <p>回傳payload</p>
          <p>{JSON.stringify(payload)} </p>
          <p>回傳主題：{topic} </p>
          <p>回傳文字：{mqtt_message} </p>
        </div>
        <br />
        {/* 傳送區 */}
        <label htmlFor="">選擇頻道</label>
        <select
          name=""
          id=""
          onChange={(e) => {
            setSelTopic(e.target.value);
          }}
        >
          {allTopic.map((v) => {
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
        <label htmlFor="">輸入文字</label>
        <input
          type="text"
          value={outputContext}
          onChange={(e) => {
            setOutputContext(e.target.value);
          }}
        />
        <br />

        <button
          onClick={() => {
            mqttPublish(selTopic, JSON.stringify({ message: outputContext }));
          }}
        >
          送出
        </button>

        <br />
        <button
          onClick={() => {
            if (connectState) {
              console.log("斷線");
              client.end();
            } else {
              client.reconnect();
            }

            setConnectState(!connectState);
          }}
        >
          連線開關
        </button>
        <div style={{ background: "lightblue" }}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            readOnly
            value={inputText}
          ></textarea>
          <Keyboard inputText={inputText} setInputText={setInputText} />
        </div>
      </header>
    </div>
  );
}

export default Mqtt_logout;
