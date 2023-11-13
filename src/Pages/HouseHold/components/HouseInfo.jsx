import axios from "axios";
import React, { useEffect, useState } from "react";
import Houseback from "../../../assets/Houseback.png"
import { useQuery } from 'react-query';
import loader from "../../../assets/loader1.svg"

function TransInfo({ lang }) {
    
  const { data, isLoading, isError, error } = useQuery(["houseinfo"], () => {
    return axios
      .get("https://back.alfabestservis.uz/api/services_category", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log("fetch error", err));
  });
  if (isError) return console.log("error:", error.message);
  if (isLoading) return <div className="loader1"><img src={loader} alt="rasm" /></div>;

    const slicedData = data?.datas?.slice(1, 2);
    return (
      <div className="trans-all">
        <div className="transportBack">
          <img src={Houseback} alt="rasm" />
        </div>
        <div>
          {slicedData.map((itm) => {
            let title = lang === "ru" ? itm.title_ru : itm.title_uz;
            let text = lang === "ru" ? itm.text_ru : itm.text_uz;
            return (
              <div key={itm.id}>
                <div className="trans-text">
                  <p className="trans-title">{title}</p>
                  <p className="trans-text1" dangerouslySetInnerHTML={{ __html: text }}></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default TransInfo;
