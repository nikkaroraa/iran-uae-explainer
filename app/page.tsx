"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SECTIONS_META, EMERGENCY_CONTACTS } from "./data/sections";
import { InfoCard, StatusBadge } from "./components/InfoCard";
import FlightBoard from "./components/FlightBoard";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import EmergencyFAB from "./components/EmergencyFAB";
import TopicLink from "./components/TopicLink";
import NewsFeed from "./components/NewsFeed";

// ─── Section Card ───────────────────────────────────────
function SectionCard({
  emoji,
  title,
  onClick,
  highlight,
}: {
  emoji: string;
  title: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] ${
        highlight
          ? "bg-red-500/10 border-red-500/30 hover:border-red-500/50"
          : "bg-[var(--card)] border-[var(--card-border)] hover:border-[var(--muted)]"
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-medium text-[var(--foreground)]">
        {title}
      </span>
    </button>
  );
}

// ─── Emergency Modal (inline for page-level state) ─────
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

// ─── Section Content Components ─────────────────────────

function OverviewSection() {
  return (
    <section id="overview" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        📋 Overview
      </h2>
      <InfoCard>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="red" label="Active Conflict" />
            <StatusBadge status="red" label="Airspace Closed" />
            <StatusBadge status="yellow" label="Markets Disrupted" />
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            Iran launched missile and drone strikes against UAE targets starting
            February 28, 2026. The UAE, backed by US <TopicLink slug="centcom">CENTCOM</TopicLink>, has responded with
            defensive intercepts and retaliatory strikes. This is the most
            significant military <TopicLink slug="escalation">escalation</TopicLink> in the Gulf since the 1980s Iran-Iraq
            War.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Conflict Started</p>
              <p className="text-sm font-semibold">Feb 28, 2026</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-sm font-semibold text-red-400">Active</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="ceasefire">Ceasefire</TopicLink></p>
              <p className="text-sm font-semibold text-yellow-400">
                None declared
              </p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">US Involvement</p>
              <p className="text-sm font-semibold">Active (<TopicLink slug="centcom">CENTCOM</TopicLink>)</p>
            </div>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

function AttacksSection() {
  return (
    <section id="attacks" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        💥 Recent Attacks
      </h2>
      <div className="space-y-3">
        {[
          {
            date: "Mar 3",
            event: (
              <>
                Second wave of Iranian <TopicLink slug="ballistic-missiles">ballistic missiles</TopicLink> targets Abu Dhabi and Dubai. <TopicLink slug="thaad">THAAD</TopicLink> and <TopicLink slug="patriot">Patriot</TopicLink> intercept majority. Some impacts reported near <TopicLink slug="jebel-ali">Jebel Ali</TopicLink>.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 1",
            event: (
              <>
                Iran launches <TopicLink slug="shahed-drones">Shahed drones</TopicLink> toward UAE oil infrastructure. Most intercepted by UAE/US <TopicLink slug="air-defense">air defense</TopicLink>. Minor damage to <TopicLink slug="fujairah">Fujairah</TopicLink> oil terminal.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Feb 28",
            event: (
              <>
                Initial Iranian missile barrage hits <TopicLink slug="al-dhafra">Al Dhafra</TopicLink> Air Base and civilian areas near Abu Dhabi. Multiple casualties confirmed. UAE declares state of emergency.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Feb 28",
            event: (
              <>
                UAE activates <TopicLink slug="ncema">NCEMA</TopicLink> emergency protocols. All schools closed, work-from-home ordered for non-essential sectors.
              </>
            ),
            severity: "yellow" as const,
          },
        ].map((item, i) => (
          <InfoCard key={i}>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <span
                  className={`inline-block w-2 h-2 rounded-full mt-2 ${
                    item.severity === "red" ? "bg-red-500" : "bg-yellow-500"
                  }`}
                />
              </div>
              <div>
                <p className="text-xs font-mono text-[var(--muted)] mb-1">
                  {item.date}, 2026
                </p>
                <p className="text-sm leading-relaxed">{item.event}</p>
              </div>
            </div>
          </InfoCard>
        ))}
      </div>
    </section>
  );
}

function IranSection() {
  return (
    <section id="iran-position" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🇮🇷 Iran&apos;s Position
      </h2>
      <InfoCard>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Iran claims the strikes are in response to UAE hosting US military
            bases used for operations against Iranian interests. Tehran describes
            the attacks as &ldquo;defensive measures&rdquo; and warns of further
            <TopicLink slug="escalation"> escalation</TopicLink> if the UAE continues to allow US forces to operate from
            its territory.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>Demands UAE expel US military presence</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>Claims right to self-defense under UN Charter</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span><TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> closed to &ldquo;hostile shipping&rdquo;</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>
                Houthi allies launching concurrent attacks on Saudi Arabia
              </span>
            </li>
          </ul>
        </div>
      </InfoCard>
    </section>
  );
}

function UAESection() {
  return (
    <section id="uae-response" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🇦🇪 UAE Response
      </h2>
      <InfoCard>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            The UAE has activated full civil defense protocols and is
            coordinating closely with US <TopicLink slug="centcom">CENTCOM</TopicLink> for <TopicLink slug="air-defense">air defense</TopicLink>. President
            Sheikh Mohamed has addressed the nation, calling for calm and
            resilience.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span><TopicLink slug="thaad">THAAD</TopicLink> and <TopicLink slug="patriot">Patriot</TopicLink> missile defense systems active</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>State of emergency declared nationwide</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>Schools and non-essential businesses closed</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>
                Free emergency supplies distributed at civil defense centers
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>UN Security Council emergency session requested</span>
            </li>
          </ul>
        </div>
      </InfoCard>
    </section>
  );
}

function CasualtiesSection() {
  return (
    <section id="casualties" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🏥 Casualties & Damage
      </h2>
      <InfoCard>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">47+</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Confirmed killed
            </p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">200+</p>
            <p className="text-xs text-[var(--muted)] mt-1">Injured</p>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">3</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Infrastructure sites hit
            </p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">80%+</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Missiles intercepted
            </p>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-4">
          ⚠️ Figures based on official UAE/<TopicLink slug="ncema">NCEMA</TopicLink> statements. Actual numbers may
          differ. Updated Mar 4, 2026.
        </p>
      </InfoCard>
    </section>
  );
}

function HistorySection() {
  return (
    <section id="history" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        📜 Background & History
      </h2>
      <InfoCard>
        <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
          <p>
            Tensions between Iran and the UAE have been building for years, driven
            by the UAE&apos;s strategic alliance with the US and its hosting of <TopicLink slug="al-dhafra">Al
            Dhafra Air Base</TopicLink> — the largest US military installation in the region.
          </p>
          <p>
            The immediate trigger appears connected to escalating US-Iran tensions
            over Iran&apos;s nuclear program and the collapse of diplomatic talks in
            January 2026. Iran views Gulf states hosting US forces as complicit in
            what it calls &ldquo;American aggression.&rdquo;
          </p>
          <p>
            This follows the 2022 Houthi attacks on Abu Dhabi and the broader
            regional proxy conflicts. The closure of the <TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> marks a
            significant <TopicLink slug="escalation">escalation</TopicLink> affecting global <TopicLink slug="oil-markets">energy markets</TopicLink>.
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/context"
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
          >
            🌍 Read Full Background →
          </Link>
        </div>
      </InfoCard>
    </section>
  );
}

function FlightsSection() {
  return (
    <section id="flights" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        ✈️ Flights & Airspace
      </h2>
      <InfoCard>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-xs text-red-400 font-semibold uppercase">
                Dubai (DXB)
              </p>
              <p className="text-sm font-bold mt-1">Suspended</p>
              <p className="text-xs text-[var(--muted)]">Since Feb 28</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-xs text-red-400 font-semibold uppercase">
                Abu Dhabi (AUH)
              </p>
              <p className="text-sm font-bold mt-1">Suspended</p>
              <p className="text-xs text-[var(--muted)]">Since Feb 28</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-xs text-red-400 font-semibold uppercase">
                Sharjah (SHJ)
              </p>
              <p className="text-sm font-bold mt-1">Suspended</p>
              <p className="text-xs text-[var(--muted)]">Since Feb 28</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-xs text-yellow-400 font-semibold uppercase">
                UAE <TopicLink slug="airspace-closure">Airspace</TopicLink>
              </p>
              <p className="text-sm font-bold mt-1">Closed (Civilian)</p>
              <p className="text-xs text-[var(--muted)]">
                Military ops only
              </p>
            </div>
          </div>

          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-xs font-semibold text-green-400 uppercase mb-2">
              Alternative Routes
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>
                  <strong>Muscat, Oman</strong> — Land border open, flights
                  operating (~2hr drive from Dubai)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">⚠</span>
                <span>
                  <strong>Jeddah/Riyadh, Saudi</strong> — Limited flights, book
                  early
                </span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-[var(--muted)]">
            Qatar, Bahrain, Kuwait airspace also closed to civilian traffic.
            Check your airline for latest updates.
          </p>
        </div>
      </InfoCard>

      <FlightBoard />
    </section>
  );
}

function MarketsSection() {
  return (
    <section id="markets" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        📈 Markets & Economy
      </h2>
      <InfoCard>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Stock Exchanges</p>
              <p className="text-sm font-bold text-red-400">Closed</p>
              <p className="text-xs text-[var(--muted)]">
                Prevent panic selling
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="oil-markets">Oil</TopicLink> (Brent)</p>
              <p className="text-sm font-bold text-yellow-400">$74+</p>
              <p className="text-xs text-[var(--muted)]">Rising sharply</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink></p>
              <p className="text-sm font-bold text-red-400">Closed</p>
              <p className="text-xs text-[var(--muted)]">
                Shipping disrupted
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Banks</p>
              <p className="text-sm font-bold text-yellow-400">Limited</p>
              <p className="text-xs text-[var(--muted)]">Reduced hours</p>
            </div>
          </div>
          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm">
              💡 <strong>Tip:</strong> ATMs are working but expect queues.
              Withdraw cash for essential purchases. Keep AED 500–1000 on hand.
            </p>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

function EmergencySection() {
  return (
    <section id="emergency" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🚨 Emergency Contacts
      </h2>
      <InfoCard>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
            UAE Emergency Numbers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EMERGENCY_CONTACTS.uae.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="flex justify-between items-center bg-[var(--muted-bg)] rounded-xl px-4 py-3 hover:bg-red-500/10 transition-colors"
              >
                <span className="text-sm">{c.label}</span>
                <span className="text-lg font-bold text-red-400 font-mono">
                  {c.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </InfoCard>

      <InfoCard>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            Embassies (Abu Dhabi)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EMERGENCY_CONTACTS.embassies.map((e) => (
              <a
                key={e.phone}
                href={`tel:${e.phone}`}
                className="flex justify-between items-center bg-[var(--muted-bg)] rounded-xl px-4 py-3 hover:bg-blue-500/10 transition-colors gap-3"
              >
                <span className="text-sm whitespace-nowrap">{e.country}</span>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {e.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

function ShelterSection() {
  return (
    <section id="shelter" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🏠 During an Alert
      </h2>

      <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-5">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
          ⚡ Immediate Steps
        </h3>
        <ol className="space-y-3">
          {[
            "Move to an interior room (no windows)",
            "Stay away from glass, mirrors, and exterior walls",
            "If in a high-rise: go to lower floors or interior stairwell",
            "If outside: enter the nearest solid building immediately",
            "If driving: pull over safely, stay low in the car",
            "Do NOT touch debris or shrapnel — may be hazardous",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center text-xs font-bold text-red-300">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <InfoCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-green-400 uppercase mb-2">
              ✅ Best Locations
            </p>
            <ul className="space-y-1 text-sm text-[var(--muted)]">
              <li>• Bathroom (interior, small windows)</li>
              <li>• Interior hallway</li>
              <li>• Stairwell (interior)</li>
              <li>• Underground parking</li>
              <li>• Ground floor interior room</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase mb-2">
              ❌ Avoid
            </p>
            <ul className="space-y-1 text-sm text-[var(--muted)]">
              <li>• Windows and glass doors</li>
              <li>• Balconies</li>
              <li>• Exterior walls</li>
              <li>• Top floors of buildings</li>
              <li>• Open areas / outdoors</li>
            </ul>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

function SuppliesSection() {
  return (
    <section id="supplies" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🧳 Supplies Checklist
      </h2>

      <InfoCard>
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">
              Essential Supplies
            </h3>
            <div className="space-y-2">
              {[
                "Water — 4L per person per day, 3+ day supply",
                "Non-perishable food (canned, dried, energy bars)",
                "Flashlight + extra batteries",
                "Phone chargers + power bank (fully charged)",
                "Cash — AED 500–1000 (ATMs may go down)",
                "First aid kit",
                "Medications — 1 week minimum supply",
                "Whistle (to signal for help if trapped)",
                "Dust masks or cloth face coverings",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-lg px-3 py-2 transition-colors"
                >
                  <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
              Important Documents
            </h3>
            <div className="space-y-2">
              {[
                "Passport (keep accessible, not in luggage)",
                "Emirates ID",
                "Insurance papers / policy numbers",
                "Emergency contacts list (PRINTED — phones die)",
                "Copies of visa / residence permit",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-lg px-3 py-2 transition-colors"
                >
                  <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm">
              🎒 <strong>Keep a grab bag near the door</strong> with passport,
              phone charger, water, cash, and medications. If you need to leave
              fast, grab it and go.
            </p>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

function ExitSection() {
  return (
    <section id="exit" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🚪 If You Need to Leave
      </h2>

      <InfoCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">
              🚗 Land Routes
            </h3>
            <div className="space-y-2">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-sm font-semibold">
                  Oman via Hatta Border
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  ~2hr from Dubai • Border OPEN • Most reliable option
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm font-semibold">
                  Saudi Arabia via Abu Samra
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Check current status • May require visa • Longer route
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
              ✈️ Flights From Neighboring Countries
            </h3>
            <div className="space-y-2">
              <div className="bg-[var(--muted-bg)] rounded-lg p-4">
                <p className="text-sm font-semibold">Muscat, Oman (MCT)</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Emirates/Oman Air operating some routes • Book ASAP • Prices
                  elevated
                </p>
              </div>
              <div className="bg-[var(--muted-bg)] rounded-lg p-4">
                <p className="text-sm font-semibold">
                  Jeddah / Riyadh, Saudi
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Limited availability • Saudia operating reduced schedule
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm">
              🏛️ <strong>Embassy evacuation:</strong> Contact your embassy for
              assisted evacuation if you cannot arrange travel independently.
              Many embassies are organizing group evacuations.
            </p>
          </div>

          <p className="text-xs text-[var(--muted)]">
            ⚠️ Book early — prices are high and availability is limited. Land
            routes to Oman are the most reliable current option.
          </p>
        </div>
      </InfoCard>
    </section>
  );
}

function InformedSection() {
  return (
    <section id="informed" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        📡 Stay Informed
      </h2>

      <InfoCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">
              ✅ Official Sources
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  <strong><TopicLink slug="ncema">NCEMA</TopicLink></strong> — @NCABORHAP_NCEMA (Twitter/X)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  <strong>Dubai Media Office</strong> — @DXBMediaOffice
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  <strong>WAM</strong> — Emirates News Agency (wam.ae)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  <strong>Your embassy</strong> — Check for country-specific
                  advisories
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
              ❌ Avoid
            </h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>• Unverified social media accounts</li>
              <li>• Forwarded WhatsApp messages</li>
              <li>• Sensationalist / clickbait accounts</li>
              <li>• &ldquo;Breaking news&rdquo; from unknown sources</li>
            </ul>
          </div>

          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm">
              📱 <strong>Mobile & internet are working normally.</strong> Enable
              <TopicLink slug="ncema"> NCEMA</TopicLink> push notifications on your phone. Keep your phone charged at
              all times.
            </p>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showEmergency, setShowEmergency] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    SECTIONS_META.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const practicalSections = SECTIONS_META.filter(
    (s) => s.category === "practical"
  );

  return (
    <>
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--card)]/95 backdrop-blur-lg border-b border-[var(--card-border)] z-50 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg">🚨</span>
          <h1 className="text-sm font-bold">Iran-UAE Explainer</h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[var(--muted)] p-2"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] pt-14">
          <div className="bg-[var(--card)] h-full overflow-y-auto p-4">
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2">
              Situation
            </p>
            {SECTIONS_META.filter((s) => s.category === "situation").map(
              (s) => (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className="w-full text-left px-3 py-3 rounded-lg text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)] flex items-center gap-3"
                >
                  <span>{s.emoji}</span>
                  {s.title}
                </button>
              )
            )}
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mt-4 mb-2">
              Practical
            </p>
            {SECTIONS_META.filter((s) => s.category === "practical").map(
              (s) => (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className="w-full text-left px-3 py-3 rounded-lg text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)] flex items-center gap-3"
                >
                  <span>{s.emoji}</span>
                  {s.title}
                </button>
              )
            )}
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mt-4 mb-2">
              Resources
            </p>
            <Link
              href="/topics"
              className="w-full text-left px-3 py-3 rounded-lg text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)] flex items-center gap-3"
            >
              <span>📖</span>
              Topics & Glossary
            </Link>
            <Link
              href="/context"
              className="w-full text-left px-3 py-3 rounded-lg text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)] flex items-center gap-3"
            >
              <span>🌍</span>
              War Background
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-56 pt-16 lg:pt-0 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-12 max-w-4xl">
        {/* Hero */}
        <div className="py-8 lg:py-12">
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge status="red" label="Live Updates" />
            <span className="text-xs text-[var(--muted)]">
              Mar 4, 2026 • 02:00 GMT+4
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Iran-UAE Conflict
            <br />
            <span className="text-[var(--muted)]">What You Need to Know</span>
          </h1>
          <p className="text-[var(--muted)] mt-4 text-sm sm:text-base max-w-2xl leading-relaxed">
            Practical information for UAE residents during the current crisis.
            Emergency contacts, shelter guidance, flight status, and exit
            options — all in one place.
          </p>
        </div>

        {/* Quick Jump Cards */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {practicalSections.map((s) => (
              <SectionCard
                key={s.id}
                emoji={s.emoji}
                title={s.shortTitle}
                onClick={() => navigateTo(s.id)}
                highlight={s.id === "emergency" || s.id === "shelter"}
              />
            ))}
          </div>
        </div>

        {/* All Sections */}
        <div className="space-y-12">
          {/* Situation */}
          <div>
            <h2 className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--card-border)]" />
              The Situation
              <span className="flex-1 h-px bg-[var(--card-border)]" />
            </h2>
            <div className="space-y-10">
              <OverviewSection />
              <NewsFeed />
              <AttacksSection />
              <IranSection />
              <UAESection />
              <CasualtiesSection />
              <HistorySection />
            </div>
          </div>

          {/* Practical */}
          <div>
            <h2 className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--card-border)]" />
              Practical Guide
              <span className="flex-1 h-px bg-[var(--card-border)]" />
            </h2>
            <div className="space-y-10">
              <FlightsSection />
              <MarketsSection />
              <EmergencySection />
              <ShelterSection />
              <SuppliesSection />
              <ExitSection />
              <InformedSection />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--card-border)] text-center text-xs text-[var(--muted)] space-y-2">
          <p>
            This page is for informational purposes only. Always follow official
            UAE government guidance.
          </p>
          <p>
            Last updated: March 4, 2026, 02:00 GMT+4
          </p>
          <p>
            Built with care for UAE residents. Stay safe. 🤍
          </p>
        </footer>
      </main>

      {/* Floating Emergency Button */}
      <EmergencyFAB />

      {/* Bottom Nav (mobile) */}
      <BottomNav
        onNavigate={navigateTo}
        onEmergency={() => setShowEmergency(true)}
      />

      {/* Emergency Modal */}
      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}
    </>
  );
}
