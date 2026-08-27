"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export function SalesChart({ data }: { data: { day: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EDE6DA" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#7A6C5C" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#7A6C5C" }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          cursor={{ fill: "#F7F3EC" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #EDE6DA", fontSize: 13 }}
          formatter={(value) => [`EGP ${Number(value ?? 0).toLocaleString()}`, "Sales"]}
        />
        <Bar dataKey="total" fill="#A5813F" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
