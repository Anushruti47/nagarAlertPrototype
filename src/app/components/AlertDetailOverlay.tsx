import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Clock, Users, Eye, Camera, CheckCircle2, Car, Zap, Droplet, ThumbsUp, TrendingUp } from "lucide-react";

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
  reportedBy?: string;
  trustScore?: number;
}

interface AlertDetailOverlayProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onSupport?: (id: string) => void;
}

const typeConfig = {
  traffic: {
    icon: Car,
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
  power: {
    icon: Zap,
    gradient: "from-[#FBBF24] to-[#F59E0B]",
  },
  water: {
    icon: Droplet,
    gradient: "from-[#3B82F6] to-[#06B6D4]",
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

export function AlertDetailOverlay({
  alert,
  isOpen,
  onClose,
  onSupport,
}: AlertDetailOverlayProps) {
  if (!alert) return null;

  const config = typeConfig[alert.type];
  const Icon = config.icon;
  const confidence = confidenceConfig[alert.confidence];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            <div className="relative flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#334155] bg-gradient-to-r from-[#1E293B] to-[#0F172A]">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{alert.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#334155] transition-colors"
                >
                  <X className="w-6 h-6 text-[#94A3B8]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Confidence Timeline - Prominent */}
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl p-6 border border-[#334155]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-[#F8FAFC]">Confidence Timeline</h4>
                    <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: `${confidence.color}20`, color: confidence.color }}>
                      {confidence.label}
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="relative h-3 bg-[#0F172A] rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${confidence.color}, ${confidence.color}dd)`,
                      }}
                    >
                      <motion.div
                        animate={{ x: [0, 100, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>

                    {/* Milestones */}
                    <div className="absolute inset-0 flex justify-between px-0.5">
                      <div className="w-1 h-full bg-[#334155]" />
                      <div className="w-1 h-full bg-[#334155]" />
                      <div className="w-1 h-full bg-[#334155]" />
                    </div>
                  </div>

                  {/* Timeline Labels */}
                  <div className="flex justify-between text-xs">
                    <div className={`flex items-center gap-2 ${alert.confidence === 'low' || alert.confidence === 'medium' || alert.confidence === 'high' ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Reported</span>
                    </div>
                    <div className={`flex items-center gap-2 ${alert.confidence === 'medium' || alert.confidence === 'high' ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Community Supported</span>
                    </div>
                    <div className={`flex items-center gap-2 ${alert.confidence === 'high' ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-[#6366F1]" />
                      <span className="text-xs text-[#94A3B8]">Views</span>
                    </div>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{alert.views}</p>
                  </div>

                  <div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="w-4 h-4 text-[#6366F1]" />
                      <span className="text-xs text-[#94A3B8]">Supporters</span>
                    </div>
                    <p className="text-2xl font-bold text-[#F8FAFC]">{alert.supporters}</p>
                  </div>

                  <div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#6366F1]" />
                      <span className="text-xs text-[#94A3B8]">Reported</span>
                    </div>
                    <p className="text-sm font-semibold text-[#F8FAFC]">{alert.timestamp}</p>
                  </div>

                  {alert.trustScore && (
                    <div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#10B981]" />
                        <span className="text-xs text-[#94A3B8]">Trust Score</span>
                      </div>
                      <p className="text-2xl font-bold text-[#10B981]">{alert.trustScore}%</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">Description</h4>
                  <p className="text-[#94A3B8] leading-relaxed">{alert.description}</p>
                </div>

                {/* Evidence Photo */}
                {alert.imageUrl && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#6366F1]" />
                      Evidence Photo
                    </h4>
                    <div className="relative rounded-xl overflow-hidden border border-[#334155]">
                      <img
                        src={alert.imageUrl}
                        alt="Evidence"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                    </div>
                  </div>
                )}

                {/* Reporter Info */}
                {alert.reportedBy && (
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl p-4 border border-[#334155]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold">
                        {alert.reportedBy[0]}
                      </div>
                      <div>
                        <p className="text-sm text-[#94A3B8]">Reported by</p>
                        <p className="font-semibold text-[#F8FAFC]">{alert.reportedBy}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-[#334155] bg-gradient-to-r from-[#1E293B] to-[#0F172A]">
                <div className="flex items-center gap-3">
                  {onSupport && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSupport(alert.id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-[#6366F1]/30 hover:shadow-xl hover:shadow-[#6366F1]/40 transition-all flex items-center justify-center gap-2"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      Support This Report
                    </motion.button>
                  )}
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-[#334155] text-[#F8FAFC] font-semibold rounded-xl hover:bg-[#475569] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
