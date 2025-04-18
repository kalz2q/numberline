"use client";

import React from "react";

interface NumberLineProps {
  min: number;
  max: number;
  step?: number;
  highlightedValues?: number[];
  width?: string;
  height?: string;
}

const NumberLine: React.FC<NumberLineProps> = ({
  min,
  max,
  step = 1,
  highlightedValues = [],
  width = "full",
  height = "40px",
}) => {
  const totalSteps = Math.floor((max - min) / step) + 1;
  const values = Array.from({ length: totalSteps }, (_, i) => min + i * step);

  // 小数点以下があるかチェック
  const hasDecimals = values.some((v) => !Number.isInteger(v));

  return (
    <div className={`flex flex-col items-center w-${width} my-6`}>
      {/* メインの線 */}
      <div className={`relative w-full h-${height}`}>
        {/* ベースライン */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>

        {/* 目盛りとラベル */}
        {values.map((value) => {
          const position = ((value - min) / (max - min)) * 100;
          const isHighlighted = highlightedValues.includes(value);

          return (
            <React.Fragment key={value}>
              {/* 目盛り線 */}
              <div
                className={`absolute top-1/2 w-[1px] h-3 bg-gray-400 transform -translate-y-1/2`}
                style={{ left: `${position}%` }}
              ></div>

              {/* ラベル */}
              <div
                className={`absolute top-full mt-2 transform -translate-x-1/2 text-xs ${
                  isHighlighted
                    ? "font-semibold text-blue-600"
                    : "text-gray-600"
                }`}
                style={{ left: `${position}%` }}
              >
                {hasDecimals ? value.toFixed(1) : value}
              </div>

              {/* ハイライトポイント */}
              {isHighlighted && (
                <div
                  className="absolute top-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                ></div>
              )}
            </React.Fragment>
          );
        })}

        {/* 矢印（右端） */}
        <div className="absolute top-1/2 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-400 transform translate-y-[-50%] rotate-45"></div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">美しい数直線</h1>

      <div className="space-y-10">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">基本の数直線</h2>
          <NumberLine min={-3} max={3} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">ハイライト付き</h2>
          <NumberLine min={0} max={10} step={2} highlightedValues={[2, 6, 8]} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">小数点対応</h2>
          <NumberLine
            min={-1}
            max={1}
            step={0.5}
            highlightedValues={[-0.5, 0.5]}
          />
        </div>
      </div>
    </div>
  );
}
