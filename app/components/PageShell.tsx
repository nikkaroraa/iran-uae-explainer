"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import EmergencyFAB from "./EmergencyFAB";
import { EMERGENCY_CONTACTS } from "../data/sections";

function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-red-600 rounded-t-2xl px-5 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">🚨 Emergency Contacts</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
              UAE Emergency Numbers
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {EMERGENCY_CONTACTS.uae.map((c) => (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-xl px-4 py-3 hover:bg-red-500/10 transition-colors"
                >
                  <span className="text-sm text-[var(--foreground)]">
                    {c.label}
                  </span>
                  <span className="text-lg font-bold text-red-400 font-mono">
                    {c.number}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">
              Embassies (Abu Dhabi)
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {EMERGENCY_CONTACTS.embassies.map((e) => (
                <a
                  key={e.phone}
                  href={`tel:${e.phone}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-xl px-4 py-3 hover:bg-blue-500/10 transition-colors"
                >
                  <span className="text-sm">{e.country}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {e.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [showEmergency, setShowEmergency] = useState(false);

  return (
    <>
      <Sidebar />
      <BottomNav onEmergency={() => setShowEmergency(true)} />
      <EmergencyFAB />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--card)]/95 backdrop-blur-lg border-b border-[var(--card-border)] z-50 px-4 h-14 flex items-center">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg">🚨</span>
          <h1 className="text-sm font-bold">Iran-UAE Explainer</h1>
        </div>
      </header>

      <main className="lg:ml-56 pt-16 lg:pt-0 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-12 max-w-4xl">
        {children}
      </main>

      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}
    </>
  );
}
