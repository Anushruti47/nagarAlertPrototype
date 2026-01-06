import { motion } from "motion/react";
import { TrendingUp, Download, Filter, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const performanceData = [
  { month: "Jan", sales: 4200, users: 2400, revenue: 5100 },
  { month: "Feb", sales: 3800, users: 2210, revenue: 4800 },
  { month: "Mar", sales: 5100, users: 2900, revenue: 6200 },
  { month: "Apr", sales: 4600, users: 2780, revenue: 5700 },
  { month: "May", sales: 6200, users: 3400, revenue: 7100 },
  { month: "Jun", sales: 5800, users: 3100, revenue: 6800 },
  { month: "Jul", sales: 7100, users: 3890, revenue: 8200 },
];

const comparisonData = [
  { category: "Marketing", thisYear: 120, lastYear: 110 },
  { category: "Sales", thisYear: 98, lastYear: 130 },
  { category: "Support", thisYear: 86, lastYear: 80 },
  { category: "Development", thisYear: 99, lastYear: 95 },
  { category: "Design", thisYear: 85, lastYear: 75 },
];

const radarData = [
  { subject: "Quality", A: 120, fullMark: 150 },
  { subject: "Speed", A: 98, fullMark: 150 },
  { subject: "Support", A: 86, fullMark: 150 },
  { subject: "Price", A: 99, fullMark: 150 },
  { subject: "Features", A: 85, fullMark: 150 },
  { subject: "UX", A: 65, fullMark: 150 },
];

const metrics = [
  { title: "Avg Session Duration", value: "4m 32s", change: "+12%", trend: "up" },
  { title: "Bounce Rate", value: "32.4%", change: "-5%", trend: "down" },
  { title: "Pages per Session", value: "5.2", change: "+8%", trend: "up" },
  { title: "Conversion Rate", value: "3.8%", change: "+15%", trend: "up" },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">Deep insights into your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-xl border border-purple-100 hover:shadow-lg transition-all">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{metric.title}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  metric.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Performance Trends</h3>
              <p className="text-sm text-gray-500">Multi-metric analysis</p>
            </div>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#14B8A6"
                strokeWidth={3}
                dot={{ fill: "#14B8A6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Year Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Year Comparison</h3>
              <p className="text-sm text-gray-500">2025 vs 2024 performance</p>
            </div>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Bar dataKey="thisYear" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lastYear" fill="#14B8A6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Radar Chart & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-1 bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Product Metrics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
              <PolarRadiusAxis stroke="#9CA3AF" />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Detailed Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Visitors", value: "245,789", color: "purple" },
              { label: "New Customers", value: "12,458", color: "blue" },
              { label: "Returning Users", value: "89,234", color: "teal" },
              { label: "Avg Order Value", value: "$156.20", color: "pink" },
              { label: "Cart Abandonment", value: "28.5%", color: "orange" },
              { label: "Customer Satisfaction", value: "94.2%", color: "green" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-teal-50/50 border border-purple-100"
              >
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue & Growth Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#14B8A6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
