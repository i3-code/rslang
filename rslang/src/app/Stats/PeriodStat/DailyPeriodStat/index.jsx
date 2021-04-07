import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    дата: "20.03",
    "слов в день": 590,
  },
  {
    дата: "21.03",
    "слов в день": 868,
  },
  {
    дата: "22.03",
    "слов в день": 1397,
  },
  {
    дата: "1.04",
    "слов в день": 1480,
  },
  {
    дата: "2.04",
    "слов в день": 1520,
  },
  {
    дата: "4.04",
    "слов в день": 1400,
  }
];

export default function PeriodStat() {
  return (
    <div style={{ width: "99%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 0,
            bottom: 20,
            left: 0
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="дата" scale="band" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="слов в день" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
