import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart() {
  const data = [
    { month: "Jan", docs: 20 },
    { month: "Feb", docs: 35 },
    { month: "Mar", docs: 50 },
    { month: "Apr", docs: 42 },
    { month: "May", docs: 67 },
  ];

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-4
      sm:p-5
      w-full
      overflow-hidden
      "
    >
      <h2
        className="
        mb-4
        font-semibold
        text-base
        sm:text-lg
        text-white
        "
      >
        Documents Processed
      </h2>

      <div className="h-64 sm:h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />

            <Tooltip />

            <Bar
              dataKey="docs"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsChart;