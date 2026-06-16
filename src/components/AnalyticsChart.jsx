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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h2 className="mb-4 font-semibold">
        Documents Processed
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="docs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsChart;