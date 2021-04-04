import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    дата: "20.03",
    "слов за все время": 590,
  },
  {
    дата: "21.03",
    "слов за все время": 868,
  },
  {
    дата: "22.03",
    "слов за все время": 1397,
  },
  {
    дата: "1.04",
    "слов за все время": 1480,
  },
  {
    дата: "2.04",
    "слов за все время": 1520,
  },
  {
    дата: "4.04",
    "слов за все время": 1600,
  }
];

export default function CumulativePeriodStat() {
  return (
    <div style={{ width: "99%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="дата" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="слов за все время" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
