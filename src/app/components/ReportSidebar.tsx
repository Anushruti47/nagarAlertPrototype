import { motion, AnimatePresence } from "motion/react";
import { X, Camera, Mic, MapPin, Send } from "lucide-react";
import { useState } from "react";

interface ReportSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportSidebar({ isOpen, onClose }: ReportSidebarProps) {
  const [issueType, setIssueType] = useState<"traffic" | "power" | "water" | null>(null);
  const [description, setDescription] = useState("");

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#0F172A] border-l border-[#334155] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#334155] p-6 backdrop-blur-xl z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">Report an Issue</h3>
                  <p className="text-sm text-[#94A3B8]">Help your community stay informed</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#334155] transition-colors"
                >
                  <X className="w-5 h-5 text-[#94A3B8]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Issue Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-[#F8FAFC] mb-3">
                  What type of issue are you reporting?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: "traffic" as const, label: "Traffic", gradient: "from-[#F59E0B] to-[#EF4444]" },
                    { type: "power" as const, label: "Power", gradient: "from-[#FBBF24] to-[#F59E0B]" },
                    { type: "water" as const, label: "Water", gradient: "from-[#3B82F6] to-[#06B6D4]" },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setIssueType(option.type)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        issueType === option.type
                          ? `border-[#6366F1] bg-gradient-to-br ${option.gradient} bg-opacity-10`
                          : "border-[#334155] bg-[#1E293B] hover:border-[#475569]"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center`}
                      >
                        <span className="text-white text-lg">⚡</span>
                      </div>
                      <span className="text-sm font-medium text-[#F8FAFC]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#F8FAFC] mb-3">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="e.g., Circular Road, Lalpur"
                    className="w-full pl-12 pr-4 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#F8FAFC] mb-3">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#F8FAFC] mb-3">
                  Add Evidence (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-6 border-2 border-dashed border-[#334155] rounded-xl hover:border-[#6366F1] hover:bg-[#1E293B] transition-all">
                    <Camera className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                    <span className="text-sm text-[#94A3B8]">Photo</span>
                  </button>
                  <button className="p-6 border-2 border-dashed border-[#334155] rounded-xl hover:border-[#6366F1] hover:bg-[#1E293B] transition-all">
                    <Mic className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                    <span className="text-sm text-[#94A3B8]">Voice Note</span>
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] border border-[#334155] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">ℹ️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] mb-1">How it works</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Your report will start with <span className="text-[#EF4444] font-semibold">Low Confidence</span>. As community members support it, confidence increases to{" "}
                      <span className="text-[#F59E0B] font-semibold">Medium</span>, and eventually{" "}
                      <span className="text-[#10B981] font-semibold">Verified</span> by our operators.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!issueType}
                className={`w-full py-4 rounded-xl font-semibold text-white shadow-2xl transition-all flex items-center justify-center gap-2 ${
                  issueType
                    ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:shadow-[#6366F1]/50"
                    : "bg-[#334155] cursor-not-allowed opacity-50"
                }`}
              >
                <Send className="w-5 h-5" />
                Submit Report
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
