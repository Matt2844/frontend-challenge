import React, { useEffect, useState } from "react";

// icons
import { WiNightClear } from "weather-icons-react";
import { WiCloud } from "weather-icons-react";
import { WiDaySunny } from "weather-icons-react";
import { WiSnow } from "weather-icons-react";
import { WiRain } from "weather-icons-react";
import { WiThunderstorm } from "weather-icons-react";
import { WiShowers } from "weather-icons-react";

export default function Icon ({ type, nightTime, size }) {

  return (
    <>
      {nightTime && type === "Clear" ? (
        <WiNightClear size={size} color="#000" />
      ) : (
          <>
            {(() => {
              switch (type) {
                case "Clear":
                  return <WiDaySunny size={size} color="#000" />
                case "Clouds":
                  return <WiCloud size={size} color="#000" />
                case "Snow":
                  return <WiSnow size={size} color="#000" />
                case "Rain":
                  return <WiRain size={size} color="#000" />
                case "Thunderstorm":
                  return <WiThunderstorm size={size} color="#000" />
                case "Drizzle":
                  return <WiShowers size={size} color="#000" />
                default:
                  return <WiDaySunny size={size} color="#000" />
              }
            })()}
          </>
        )}
    </>
  )

}