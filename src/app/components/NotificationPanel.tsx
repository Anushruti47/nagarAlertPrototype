import { motion, AnimatePresence } from "motion/react";
import { X, Check, Info, AlertTriangle, Trash2 } from "lucide-react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Payment Successful",
    message: "Your subscription has been renewed for another month.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "info",
    title: "New Feature Available",
    message: "Check out our new analytics dashboard with enhanced insights.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "warning",
    title: "Storage Almost Full",
    message: "You've used 85% of your storage. Consider upgrading your plan.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: "4",
    type: "info",
    title: "Team Member Added",
    message: "Sarah Johnson has been added to your team.",
    time: "1 day ago",
    unread: false,
  },
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "from-green-50 to-emerald-50";
      case "warning":
        return "from-orange-50 to-yellow-50";
      default:
        return "from-blue-50 to-cyan-50";
    }
  };

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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[400px] bg-white/90 backdrop-blur-xl border-l border-purple-100 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50/50 to-teal-50/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-600">
                    {notifications.filter((n) => n.unread).length} unread
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                Mark all as read
              </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100vh-140px)] p-4 space-y-3">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border transition-all hover:shadow-md ${
                    notification.unread
                      ? "bg-gradient-to-r from-purple-50 to-teal-50 border-purple-200"
                      : "bg-white/50 border-gray-200"
                  }`}
                >
                  {notification.unread && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                  )}
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${getBgColor(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <button className="p-1 rounded hover:bg-red-100 transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
