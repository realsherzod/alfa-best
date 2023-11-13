import axios from "axios";
import React, { useEffect, useState } from "react";
import smallLogo from "../../../assets/smallLogo.png"
import { useQuery } from 'react-query';

function HouseMain({ lang }) {
 
  const { data, isLoading, isError, error } = useQuery(["housemain"], () => {
    return axios
      .get("https://back.alfabestservis.uz/api/advantage", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log("fetch error", err));
  });
  if (isError) return console.log("error:", error.message);
  if (isLoading) return;
  const slicedData = data?.datas?.slice(15, 20);
  let title =
    lang === "ru"
      ? "Наши преимущества"
      : "Bizning talablarimiz";
  return (
    <div className="transmain">
        <div>
          <p className="transp-title">{title}</p>
        </div>
      <div className="trans-div">
      {slicedData.map((itm) => {
          let text = lang === "ru" ? itm.text_ru : itm.text_uz;
          return (
            <div>
              <div key={itm.id}>
                <div className="trans-small">
                  <img src={smallLogo} alt="" />
                  <p>{text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HouseMain;
