import React from "react";
import "../../styles/turntable.scss";
export default function EditLightBox({ tempKey, setTempKey, setPrize ,setEditLightBox}) {
  return (
    <div className="edit_lightbox_wrap" onClick={()=>{
      setEditLightBox(false)
    }}>
      <div className="box" onClick={(e)=>{
        e.stopPropagation()
      }}>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={tempKey}
          onChange={(e) => {
            setTempKey(e.target.value);
          }}
        ></textarea>
        <br />
        <button
          onClick={() => {
            const newList = tempKey.split(",");
            setPrize(newList);
            setEditLightBox(false)
          }}
        >
          添加很多好物
        </button>
      </div>
    </div>
  );
}
