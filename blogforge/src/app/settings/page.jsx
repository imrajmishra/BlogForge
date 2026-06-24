'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Palette, Shield, Upload, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('account'); // 'account' | 'appearance' | 'security'
  
  // Profile settings state
  const [displayName, setDisplayName] = useState('Alex Rivera');
  const [bio, setBio] = useState('Elite UI/UX Designer & Frontend Engineer. Passionate about glassmorphism, smooth animations, and high-performance React architectures.');
  const [avatarPreview, setAvatarPreview] = useState('https://api.dicebear.com/7.x/bottts/svg?seed=alex_rivera');
  
  // Appearance state
  const [accentColor, setAccentColor] = useState('violet'); // 'violet' | 'blue' | 'rose'
  const [glassmorphism, setGlassmorphism] = useState(true);
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Action notifications
  const [notif, setNotif] = useState(null);
  const fileInputRef = useRef(null);

  const triggerNotif = (message, type = 'success') => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      triggerNotif('Avatar preview updated! (Simulating upload to Nhost Storage)');
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    triggerNotif('Account profile saved successfully!');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      triggerNotif('Please fill in both password fields.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    triggerNotif('Password successfully updated!');
  };

  const categories = [
    { id: 'account', label: 'Account Profile', icon: User },
    { id: 'appearance', label: 'Visual Appearance', icon: Palette },
    { id: 'security', label: 'Security & Access', icon: Shield },
  ];

  return (
    <main className="flex-1 w-full bg-black border text-white">
      <div className="max-w-5xl tracking-tight justify-center py-25 flex flex-col md:flex-row gap-9 sm:pl-28">
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <h2 className="text-2xl font-black tracking-tight text-white mb-6 flex items-center gap-2">
            Settings{" "}
            <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
          </h2>

          <nav className="flex flex-row md:flex-col gap-1 md:overflow-visible pb-4 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-3 whitespace-nowrap md:w-full ${
                    isSelected
                      ? "text-white border border-zinc-800 bg-zinc-900/60"
                      : "text-gray-400 hover:text-white hover:bg-zinc-900/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? "text-violet-400" : "text-gray-400"}`}
                  />
                  {cat.label}

                  {isSelected && (
                    <motion.div
                      layoutId="activeSettingsIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-full hidden md:block"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Action Content (Framer Motion transitions) */}
        <div className="flex-1 min-h-10 p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          {/* Floating Notification */}
          <AnimatePresence>
            {notif && (
              <motion.div
                initial={{ opacity: 0, y: -20, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -20, x: "-50%" }}
                className={`absolute top-4 left-1/2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg z-50 flex items-center gap-2 border ${
                  notif.type === "error"
                    ? "bg-rose-500/20 border-rose-500/30 text-rose-400"
                    : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                }`}
              >
                {notif.type === "error" ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {notif.message}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeCategory === "account" && (
              <motion.form
                key="account"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSaveAccount}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Account Profile
                  </h3>
                  <p className="text-xs text-gray-400">
                    Configure your public identity details on BlogForge.
                  </p>
                </div>

                {/* Avatar Selector */}
                <div className="flex items-center gap-6 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold rounded-xl text-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Avatar
                    </button>
                    <p className="text-[10px] text-gray-500 mt-1">
                      PNG, JPG or SVG. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Display Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500 text-white transition-colors"
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Bio TextArea */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Creator Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500 text-white transition-colors leading-relaxed resize-none"
                    placeholder="Share details about your statistics, streetwear fits, or technical thoughts..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-linear-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-950/20"
                >
                  Save Profile
                </button>
              </motion.form>
            )}

            {activeCategory === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Visual Appearance
                  </h3>
                  <p className="text-xs text-gray-400">
                    Personalize styling, transparency toggles, and neon accents.
                  </p>
                </div>

                {/* Accent Color Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-300">
                    Accent Theme Highlight
                  </label>
                  <div className="flex gap-4">
                    {["violet", "blue", "rose"].map((color) => {
                      const colorClasses = {
                        violet: "bg-violet-600 border-violet-500",
                        blue: "bg-blue-600 border-blue-500",
                        rose: "bg-rose-600 border-rose-500",
                      };
                      const isSelected = accentColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setAccentColor(color)}
                          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-white scale-105 shadow-lg"
                              : "border-zinc-850 opacity-60 hover:opacity-90"
                          } ${colorClasses[color]}`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Glassmorphism Toggle Switch */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">
                      Subtle Glassmorphism
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Enables translucent overlays and blur filters on nav
                      elements.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGlassmorphism(!glassmorphism)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                      glassmorphism ? "bg-violet-600" : "bg-zinc-800"
                    }`}
                  >
                    <motion.div
                      layout
                      className="w-4 h-4 bg-white rounded-full mx-1"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800/40 bg-zinc-950/20 text-xs text-gray-400 leading-relaxed font-sans">
                  💡 Themes will apply client-side across the feed, profile tab
                  indicators, and reels sidebar animations instantly.
                </div>
              </motion.div>
            )}

            {activeCategory === "security" && (
              <motion.form
                key="security"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSaveSecurity}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Security & Access
                  </h3>
                  <p className="text-xs text-gray-400">
                    Change your password and manage account credentials.
                  </p>
                </div>

                {/* Current Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500 text-white transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* New Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500 text-white transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-linear-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-950/20"
                >
                  Update Password
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
