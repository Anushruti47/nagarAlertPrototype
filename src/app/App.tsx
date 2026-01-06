import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Eye, MessageSquare, Layers } from "lucide-react";
import { CityPulse } from "./components/CityPulse";
import { MapView } from "./components/MapView";
import { AlertCard } from "./components/AlertCard";
import { WhatsAppInterface } from "./components/WhatsAppInterface";
import { OperatorConsole } from "./components/OperatorConsole";
import { AlertDetailOverlay } from "./components/AlertDetailOverlay";
import { ReportSidebar } from "./components/ReportSidebar";

type ViewMode = "public" | "whatsapp" | "operator";
type ConfidenceLevel = "low" | "medium" | "high";

interface Alert {
  id: string;
  type: "traffic" | "power" | "water";
  title: string;
  location: string;
  description: string;
  confidence: ConfidenceLevel;
  timestamp: string;
  supporters: number;
  views: number;
  priority?: "high" | "normal";
  imageUrl?: string;
  reportedBy?: string;
  trustScore?: number;
}

// Mock data
const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    type: "traffic",
    title: "Heavy Traffic Congestion",
    location: "Circular Road, Lalpur",
    description:
      "Major traffic jam near the bus stand. Multiple vehicles stuck for over 30 minutes. Alternative routes recommended.",
    confidence: "high",
    timestamp: "2 hours ago",
    supporters: 47,
    views: 234,
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1681026552203-d2ef6b401df4?w=800",
    reportedBy: "Rajesh Kumar",
    trustScore: 92,
  },
  {
    id: "alert-002",
    type: "power",
    title: "Power Outage",
    location: "Hindpiri, Sector 3",
    description:
      "Complete power outage affecting residential area. No electricity for the past 4 hours. Local transformer issue suspected.",
    confidence: "medium",
    timestamp: "4 hours ago",
    supporters: 23,
    views: 156,
    imageUrl: "https://images.unsplash.com/photo-1707590220311-ef90eb2408a7?w=800",
    reportedBy: "Priya Sharma",
    trustScore: 78,
  },
  {
    id: "alert-003",
    type: "water",
    title: "Water Supply Disruption",
    location: "Kanke Road",
    description:
      "No water supply since morning. Pipe burst reported near the main junction. Repair work underway.",
    confidence: "low",
    timestamp: "30 min ago",
    supporters: 8,
    views: 45,
    imageUrl: "https://images.unsplash.com/photo-1758826898770-c76ce24b4eff?w=800",
    reportedBy: "Anonymous",
    trustScore: 45,
  },
  {
    id: "alert-004",
    type: "power",
    title: "Streetlight Not Working",
    location: "Main Road, Doranda",
    description: "Multiple streetlights are not working, causing safety concerns at night.",
    confidence: "medium",
    timestamp: "1 day ago",
    supporters: 15,
    views: 89,
    reportedBy: "Amit Singh",
    trustScore: 65,
  },
  {
    id: "alert-005",
    type: "traffic",
    title: "Road Construction Delay",
    location: "Harmu Bypass",
    description: "Road construction causing major delays. No clear timeline for completion.",
    confidence: "high",
    timestamp: "3 hours ago",
    supporters: 34,
    views: 178,
    priority: "normal",
    reportedBy: "Sunita Devi",
    trustScore: 88,
  },
];

const mapMarkers = [
  {
    id: "marker-1",
    type: "traffic" as const,
    lat: 35,
    lng: 45,
    alert: mockAlerts[0],
  },
  {
    id: "marker-2",
    type: "power" as const,
    lat: 55,
    lng: 65,
    alert: mockAlerts[1],
  },
  {
    id: "marker-3",
    type: "water" as const,
    lat: 70,
    lng: 30,
    alert: mockAlerts[2],
  },
  {
    id: "marker-4",
    type: "power" as const,
    lat: 25,
    lng: 75,
    alert: mockAlerts[3],
  },
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("public");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isReportSidebarOpen, setIsReportSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleSupportAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === id) {
          const newSupporters = alert.supporters + 1;
          let newConfidence: ConfidenceLevel = alert.confidence;

          if (newSupporters >= 40) {
            newConfidence = "high";
          } else if (newSupporters >= 15) {
            newConfidence = "medium";
          }

          return {
            ...alert,
            supporters: newSupporters,
            confidence: newConfidence,
          };
        }
        return alert;
      })
    );
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsOverlayOpen(true);
  };

  const cityStats = {
    activeAlerts: alerts.filter((a) => a.confidence !== "high").length,
    resolved: 18,
    monitoring: alerts.length,
  };

  const getCityStatus = () => {
    const highPriorityCount = alerts.filter((a) => a.priority === "high").length;
    if (highPriorityCount > 2) return "alert";
    if (alerts.length > 5) return "moderate";
    return "calm";
  };

  const getCityMessage = () => {
    const status = getCityStatus();
    if (status === "alert") return "Ranchi has multiple active disruptions. Heavy traffic detected in Lalpur.";
    if (status === "moderate") return "Ranchi is experiencing moderate activity. Some areas affected.";
    return "Ranchi is mostly calm. Minor issues being monitored.";
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <header className="border-b border-[#1E293B] backdrop-blur-lg bg-[#1E293B]/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center shadow-lg shadow-[#6366F1]/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#F8FAFC]">Nagar Alert Hub</h1>
                <p className="text-xs text-[#94A3B8]">Community Intelligence Dashboard</p>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg p-1 border border-[#334155]">
              <button
                onClick={() => setViewMode("public")}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  viewMode === "public"
                    ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/30"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Public View</span>
              </button>
              <button
                onClick={() => setViewMode("whatsapp")}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  viewMode === "whatsapp"
                    ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/30"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={() => setViewMode("operator")}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  viewMode === "operator"
                    ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/30"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Console</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {viewMode === "public" && (
            <motion.div
              key="public"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CityPulse
                cityName="Ranchi"
                status={getCityStatus()}
                message={getCityMessage()}
                stats={cityStats}
              />

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Map */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#F8FAFC]">Live Incident Map</h3>
                    <span className="text-sm text-[#94A3B8]">
                      {alerts.length} active reports
                    </span>
                  </div>
                  <MapView
                    markers={mapMarkers}
                    onMarkerClick={handleAlertClick}
                    cityMapUrl="https://images.unsplash.com/photo-1545321945-7edd9bf1331a?w=1200"
                  />
                </div>

                {/* Graded Confidence Feed */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#F8FAFC]">Graded Confidence Feed</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
                        <span className="text-[#94A3B8]">Reported</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                        <span className="text-[#94A3B8]">Community</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full" />
                        <span className="text-[#94A3B8]">Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {alerts.map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        onSupport={handleSupportAlert}
                        onClick={handleAlertClick}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA Banner */}
              <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] border border-[#334155] rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-xl flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#F8FAFC] mb-2">Report via WhatsApp - No App Needed</h4>
                    <p className="text-sm text-[#94A3B8] mb-4">
                      Simply send a photo, voice note, or text to our WhatsApp number. Our AI will log your report and update the community.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setViewMode("whatsapp")}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-lg font-medium shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all"
                      >
                        See How It Works
                      </button>
                      <button
                        onClick={() => setIsReportSidebarOpen(true)}
                        className="px-6 py-2.5 bg-[#1E293B] border border-[#6366F1] text-[#6366F1] rounded-lg font-medium hover:bg-[#6366F1] hover:text-white transition-all"
                      >
                        Report Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "whatsapp" && (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WhatsAppInterface />
            </motion.div>
          )}

          {viewMode === "operator" && (
            <motion.div
              key="operator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OperatorConsole alerts={alerts} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Alert Detail Overlay */}
      <AlertDetailOverlay
        alert={selectedAlert}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSupport={handleSupportAlert}
      />

      {/* Report Sidebar */}
      <ReportSidebar
        isOpen={isReportSidebarOpen}
        onClose={() => setIsReportSidebarOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#1E293B] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3B8]">
              © 2026 Nagar Alert Hub. Empowering Tier-2/3 cities with community intelligence.
            </p>
            <div className="flex items-center gap-6 text-sm text-[#94A3B8]">
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
