import { motion } from "motion/react";
import { Car, Zap, Droplet, ThumbsUp, Eye, Clock, TrendingUp } from "lucide-react";

interface Alert {
  id: string;
  type: "traffic" | "power" | "water";
  title: string;
  location: string;
  description: string;
  confidence: "low" | "medium" | "high";
  timestamp: string;
  supporters: number;
  views: number;
  priority?: "high" | "normal";
  imageUrl?: string;
  trustScore?: number;
}

interface AlertCardProps {
  alert: Alert;
  onSupport: (id: string) => void;
  onClick: (alert: Alert) => void;
}

const typeConfig = {
  traffic: {
    icon: Car,
    gradient: "from-[#F59E0B] to-[#EF4444]",
    bgGlow: "shadow-[#F59E0B]/10",
  },
  power: {
    icon: Zap,
    gradient: "from-[#FBBF24] to-[#F59E0B]",
    bgGlow: "shadow-[#FBBF24]/10",
  },
  water: {
    icon: Droplet,
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    bgGlow: "shadow-[#3B82F6]/10",
  },
};

const confidenceConfig = {
  low: {
    label: "Reported",
    color: "#EF4444",
    progress: 33,
  },
  medium: {
    label: "Community Supported",
    color: "#F59E0B",
    progress: 66,
  },
  high: {
    label: "Verified",
    color: "#10B981",
    progress: 100,
  },
};

export function AlertCard({ alert, onSupport, onClick }: AlertCardProps) {
  const config = typeConfig[alert.type];
  const Icon = config.icon;
  const confidence = confidenceConfig[alert.confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(alert)}
      className={`relative bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden cursor-pointer group ${config.bgGlow} hover:shadow-xl hover:border-[#6366F1]/50 transition-all`}
    >
      {/* Priority Pulse */}
      {alert.priority === "high" && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-3 right-3 w-3 h-3 bg-[#EF4444] rounded-full"
        />
      )}

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-1 truncate group-hover:text-[#6366F1] transition-colors">
              {alert.title}
            </h4>
            <p className="text-xs text-[#94A3B8] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {alert.timestamp}
            </p>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs text-[#64748B] mb-3 flex items-center gap-1">
          <span className="w-1 h-1 bg-[#6366F1] rounded-full" />
          {alert.location}
        </p>

        {/* Description */}
        <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">{alert.description}</p>

        {/* Confidence Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: confidence.color }}>
              {confidence.label}
            </span>
            <span className="text-xs text-[#64748B]">{confidence.progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="relative h-2 bg-[#0F172A] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${confidence.color}, ${confidence.color}dd)`,
              }}
            >
              <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>

            {/* Milestones */}
            <div className="absolute inset-0 flex justify-between px-0.5">
              <div className="w-0.5 h-full bg-[#334155]" />
              <div className="w-0.5 h-full bg-[#334155]" />
              <div className="w-0.5 h-full bg-[#334155]" />
            </div>
          </div>

          {/* Timeline Labels */}
          <div className="flex justify-between mt-1 text-[10px] text-[#475569]">
            <span>Reported</span>
            <span>Community</span>
            <span>Verified</span>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#334155]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#64748B]" />
              <span className="text-xs text-[#94A3B8]">{alert.views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-[#64748B]" />
              <span className="text-xs text-[#94A3B8]">{alert.supporters}</span>
            </div>
            {alert.trustScore && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-[#10B981] font-medium">{alert.trustScore}%</span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onSupport(alert.id);
            }}
            className="px-4 py-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-medium rounded-lg shadow-lg shadow-[#6366F1]/30 hover:shadow-xl hover:shadow-[#6366F1]/40 transition-all"
          >
            Support
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
