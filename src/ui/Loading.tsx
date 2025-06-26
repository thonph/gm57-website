import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="container-loading">
      <div className="scene">
        <div className="shadow"></div>
        <div className="jumper">
          <div className="spinner">
            <div className="scaler">
              <div className="loader">
                <div className="cuboid">
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: "#1971c2", fontWeight: "bold" }}>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
