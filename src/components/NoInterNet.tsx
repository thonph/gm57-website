"use client";

import React from "react";

const NoInterNet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-green-100 select-none">
            500
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-lg border border-green-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Không có kết nối mạng
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Xin lỗi, bạn không có kết nối mạng. Vui lòng kiểm tra lại kết nối
            của bạn.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default NoInterNet;
