import { motion } from "motion/react";
import { Car, Zap, Droplet, MapPin } from "lucide-react";

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
}

interface Marker {
  id: string;
  type: "traffic" | "power" | "water";
  lat: number;
  lng: number;
  alert: Alert;
}

interface MapViewProps {
  markers: Marker[];
  onMarkerClick: (alert: Alert) => void;
  cityMapUrl: string;
}

const markerConfig = {
  traffic: {
    icon: Car,
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
  power: {
    icon: Zap,
    color: "#FBBF24",
    gradient: "from-[#FBBF24] to-[#F59E0B]",
  },
  water: {
    icon: Droplet,
    color: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#06B6D4]",
  },
};

export function MapView({ markers, onMarkerClick, cityMapUrl }: MapViewProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#0F172A] rounded-xl border border-[#334155] overflow-hidden group">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-10" />

      {/* Map Background */}
      <div className="absolute inset-0">
        <img
          src={cityMapUrl}
          alt="City Map"
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/60" />

        {/* Grid overlay for cyber aesthetic */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(99,102,241,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      {/* Map Markers */}
      {markers.map((marker, index) => {
        const config = markerConfig[marker.type];
        const Icon = config.icon;

        return (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            style={{
              position: "absolute",
              left: `${marker.lng}%`,
              top: `${marker.lat}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="relative z-20"
          >
            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} blur-lg`}
            />

            {/* Marker */}
            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onMarkerClick(marker.alert)}
              className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-2xl border-2 border-[#1E293B] cursor-pointer`}
            >
              <Icon className="w-6 h-6 text-white" />

              {/* Priority indicator */}
              {marker.alert.priority === "high" && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full border-2 border-[#1E293B]"
                />
              )}
            </motion.button>

            {/* Hover tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-[#1E293B] border border-[#334155] rounded-lg shadow-2xl pointer-events-none"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#334155]" />
              <p className="text-xs font-semibold text-[#F8FAFC] mb-1">{marker.alert.title}</p>
              <p className="text-[10px] text-[#94A3B8]">{marker.alert.location}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-[#0F172A] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${config.gradient}`}
                    style={{
                      width: marker.alert.confidence === "high" ? "100%" : marker.alert.confidence === "medium" ? "66%" : "33%",
                    }}
                  />
                </div>
                <span className="text-[10px] text-[#64748B]">
                  {marker.alert.confidence === "high" ? "Verified" : marker.alert.confidence === "medium" ? "Community" : "Reported"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center text-[#F8FAFC] hover:bg-[#334155] transition-colors"
        >
          +
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center text-[#F8FAFC] hover:bg-[#334155] transition-colors"
        >
          -
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center text-[#F8FAFC] hover:bg-[#334155] transition-colors"
        >
          <MapPin className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-30 bg-[#1E293B]/90 backdrop-blur-xl border border-[#334155] rounded-lg p-3">
        <div className="text-xs text-[#94A3B8] mb-2 font-semibold">Legend</div>
        <div className="space-y-2">
          {Object.entries(markerConfig).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-[#94A3B8] capitalize">{type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active markers count */}
      <div className="absolute top-4 left-4 z-30 bg-[#1E293B]/90 backdrop-blur-xl border border-[#334155] rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-[#6366F1] rounded-full"
          />
          <span className="text-sm text-[#F8FAFC] font-semibold">{markers.length}</span>
          <span className="text-xs text-[#94A3B8]">active incidents</span>
        </div>
      </div>
    </div>
  );
}
