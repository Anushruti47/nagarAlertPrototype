import { motion } from "motion/react";
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface CityPulseProps {
  cityName: string;
  status: "calm" | "moderate" | "alert";
  message: string;
  stats: {
    activeAlerts: number;
    resolved: number;
    monitoring: number;
  };
}

const statusConfig = {
  calm: {
    icon: CheckCircle,
    gradient: "from-[#10B981] to-[#059669]",
    text: "All Clear",
    pulseColor: "#10B981",
  },
  moderate: {
    icon: Activity,
    gradient: "from-[#F59E0B] to-[#D97706]",
    text: "Moderate Activity",
    pulseColor: "#F59E0B",
  },
  alert: {
    icon: AlertTriangle,
    gradient: "from-[#EF4444] to-[#DC2626]",
    text: "Active Disruptions",
    pulseColor: "#EF4444",
  },
};

export function CityPulse({ cityName, status, message, stats }: CityPulseProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Hero Status Card */}
      <div className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-[#334155] overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#6366F1_1px,_transparent_1px)] bg-[length:24px_24px]" />
        </div>

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Status Indicator */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} blur-xl`}
              />
              <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-2xl`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* City Pulse Message */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-[#F8FAFC]">{cityName}</h2>
                <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${config.gradient} text-white text-sm font-semibold shadow-lg`}>
                  {config.text}
                </div>
              </div>
              <p className="text-lg text-[#94A3B8] leading-relaxed">{message}</p>

              {/* Live indicator */}
              <div className="flex items-center gap-2 mt-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.pulseColor }}
                />
                <span className="text-xs text-[#64748B] uppercase tracking-wider">Live Updates</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-[#0F172A] border border-[#334155] backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-[#EF4444] mb-1">{stats.activeAlerts}</div>
                <div className="text-xs text-[#64748B] uppercase tracking-wide">Active</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-[#0F172A] border border-[#334155] backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-[#10B981] mb-1">{stats.resolved}</div>
                <div className="text-xs text-[#64748B] uppercase tracking-wide">Resolved</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-[#0F172A] border border-[#334155] backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-[#6366F1] mb-1">{stats.monitoring}</div>
                <div className="text-xs text-[#64748B] uppercase tracking-wide">Tracking</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}>
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}
