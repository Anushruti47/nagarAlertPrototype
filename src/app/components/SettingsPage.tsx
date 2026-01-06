import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  CreditCard,
  Save,
  Check,
} from "lucide-react";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Settings
        </h2>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-purple-100 shadow-lg space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-purple-100 shadow-lg"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Profile Information</h3>
                  <p className="text-gray-600">Update your personal details</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    JD
                  </div>
                  <div>
                    <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all mb-2">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF, max 2MB</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Product designer and frontend developer passionate about creating beautiful user experiences."
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Security Settings</h3>
                  <p className="text-gray-600">Manage your password and security preferences</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Notification Preferences</h3>
                  <p className="text-gray-600">Choose what updates you want to receive</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Email Notifications",
                      description: "Receive email updates about your account activity",
                    },
                    {
                      title: "Push Notifications",
                      description: "Get instant notifications on your device",
                    },
                    {
                      title: "SMS Notifications",
                      description: "Receive text messages for important updates",
                    },
                    {
                      title: "Marketing Emails",
                      description: "Get news about new features and updates",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-teal-50/50 border border-purple-100"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-block w-14 h-8">
                        <input type="checkbox" className="peer sr-only" defaultChecked={index < 2} />
                        <span className="absolute inset-0 bg-gray-300 rounded-full cursor-pointer transition-colors peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-teal-500"></span>
                        <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-lg"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Appearance Settings</h3>
                  <p className="text-gray-600">Customize how the app looks</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {["Light", "Dark", "Auto"].map((theme) => (
                      <button
                        key={theme}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          theme === "Light"
                            ? "border-purple-500 bg-gradient-to-br from-purple-50 to-teal-50"
                            : "border-purple-100 bg-white/50 hover:border-purple-300"
                        }`}
                      >
                        <div className="w-full h-20 rounded-lg bg-gradient-to-br from-purple-100 to-teal-100 mb-3"></div>
                        <p className="font-medium text-gray-800">{theme}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Accent Color</h4>
                  <div className="flex gap-3">
                    {[
                      "from-purple-500 to-pink-500",
                      "from-blue-500 to-teal-500",
                      "from-green-500 to-emerald-500",
                      "from-orange-500 to-red-500",
                    ].map((gradient, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} shadow-lg hover:scale-110 transition-transform ${
                          index === 0 ? "ring-4 ring-purple-300" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Billing & Subscription</h3>
                  <p className="text-gray-600">Manage your billing information</p>
                </div>

                {/* Current Plan */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 border border-purple-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">Pro Plan</h4>
                      <p className="text-gray-600">Billed monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                        $29
                      </p>
                      <p className="text-sm text-gray-600">/month</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all">
                    Upgrade Plan
                  </button>
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Payment Method</h4>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50/50 to-teal-50/50 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-purple-100">
              <button className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-teal-500 text-white"
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
