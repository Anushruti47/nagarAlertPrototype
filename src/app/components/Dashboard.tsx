import { motion } from "motion/react";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-purple-500 to-blue-500",
    bgGradient: "from-purple-50 to-blue-50",
  },
  {
    title: "Active Users",
    value: "8,234",
    change: "+18.2%",
    trend: "up",
    icon: Users,
    gradient: "from-blue-500 to-teal-500",
    bgGradient: "from-blue-50 to-teal-50",
  },
  {
    title: "Total Orders",
    value: "1,429",
    change: "+7.3%",
    trend: "up",
    icon: ShoppingCart,
    gradient: "from-teal-500 to-green-500",
    bgGradient: "from-teal-50 to-green-50",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    gradient: "from-pink-500 to-purple-500",
    bgGradient: "from-pink-50 to-purple-50",
  },
];

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 240 },
  { month: "Feb", revenue: 3800, orders: 198 },
  { month: "Mar", revenue: 5100, orders: 290 },
  { month: "Apr", revenue: 4600, orders: 267 },
  { month: "May", revenue: 6200, orders: 345 },
  { month: "Jun", revenue: 5800, orders: 312 },
  { month: "Jul", revenue: 7100, orders: 398 },
];

const categoryData = [
  { name: "Electronics", value: 4200, color: "#8B5CF6" },
  { name: "Fashion", value: 3100, color: "#3B82F6" },
  { name: "Home", value: 2400, color: "#14B8A6" },
  { name: "Sports", value: 1800, color: "#EC4899" },
];

const recentActivity = [
  {
    user: "Sarah Johnson",
    action: "placed an order",
    item: "MacBook Pro 16\"",
    time: "2 min ago",
    avatar: "SJ",
  },
  {
    user: "Mike Chen",
    action: "left a review",
    item: "Wireless Headphones",
    time: "15 min ago",
    avatar: "MC",
  },
  {
    user: "Emily Davis",
    action: "registered",
    item: "New Account",
    time: "1 hour ago",
    avatar: "ED",
  },
  {
    user: "Tom Wilson",
    action: "updated profile",
    item: "Contact Information",
    time: "2 hours ago",
    avatar: "TW",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} p-6 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue and orders</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all">
                This Year
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Sales by Category</h3>
          <p className="text-sm text-gray-500 mb-4">Product distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{cat.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ${cat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h3 className="text-xl font-bold text-gray-800">Today's Overview</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "New Signups", value: "47", icon: Users, color: "purple" },
              { label: "Pending Orders", value: "23", icon: ShoppingCart, color: "blue" },
              { label: "Revenue Today", value: "$2,847", icon: DollarSign, color: "teal" },
              { label: "Active Sessions", value: "156", icon: Activity, color: "pink" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-${item.color}-50 to-${item.color}-50/30 border border-${item.color}-100`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{item.value}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
