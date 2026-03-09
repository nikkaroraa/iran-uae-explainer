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
            <StatusBadge status="red" label="Day 10 — Active War" />
            <StatusBadge status="red" label="Oil Past $100" />
            <StatusBadge status="red" label="Hormuz Shutdown" />
            <StatusBadge status="red" label="Qatar Attacked" />
            <StatusBadge status="yellow" label="11,000+ Flights Canceled" />
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            Day 10 of the US-Israel war on Iran. Mojtaba Khamenei — son of the slain
            supreme leader — has been named Iran&apos;s new supreme leader. Trump called the
            choice &ldquo;a big mistake.&rdquo; Oil soared past $100/barrel for the first time,
            hitting $119.50 intraday before settling around $114 — CNN calls it the
            &ldquo;biggest oil disruption in history.&rdquo; Qatar was struck by 17 ballistic
            missiles and 6 drones. Seven US soldiers have been killed. UAE envoy to the UN
            says UAE &ldquo;will not partake in any attacks on Iran.&rdquo; Iran rules out
            immediate ceasefire. Over 11,000 flights canceled across the Middle East.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Conflict Started</p>
              <p className="text-sm font-semibold">Feb 28, 2026</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-sm font-semibold text-red-400">Day 10 — Escalating</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="ceasefire">Ceasefire</TopicLink></p>
              <p className="text-sm font-semibold text-red-400">
                None — Iran rules out immediate ceasefire
              </p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">US Involvement</p>
              <p className="text-sm font-semibold">Active — 7 US soldiers killed</p>
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
            date: "Mar 9",
            event: (
              <>
                Day 10: Mojtaba Khamenei named Iran&apos;s new supreme leader — Trump calls it &ldquo;a big mistake.&rdquo; Oil soars past $100, hits $119.50 intraday. Qatar struck by 17 <TopicLink slug="ballistic-missiles">ballistic missiles</TopicLink> and 6 drones. 7 US soldiers killed total. IDF launches &ldquo;extensive&rdquo; airstrikes in three areas of Iran. 2 UAE Armed Forces killed in helicopter crash (technical malfunction). UAE envoy tells UN: &ldquo;will not partake in any attacks on Iran.&rdquo; Iran rules out immediate ceasefire. 11,000+ flights canceled across Middle East.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 8",
            event: (
              <>
                Day 9: Three shelter alerts in Abu Dhabi between 8:30–10:55am. Israel strikes Tehran oil depots — blackened rain reported. Bahrain desalination plant hit, Kuwait fuel depot struck. Iran&apos;s new supreme leader chosen but unnamed. US State Dept operating evacuation flights from UAE.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 7",
            event: (
              <>
                Day 8: Iran strikes <TopicLink slug="al-dhafra">Al Dhafra</TopicLink> air base shortly after Iranian president briefly apologized for Gulf strikes. UAE president says &ldquo;prepared to confront threats.&rdquo; French naval base Camp de la Paix in Abu Dhabi hit by drones. US orders non-emergency staff to leave UAE.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 5–6",
            event: (
              <>
                UAE intercepts 6 of 7 <TopicLink slug="ballistic-missiles">ballistic missiles</TopicLink> and 125 of 131 drones. One missile lands in UAE. Trump demands &ldquo;unconditional surrender.&rdquo; Oil surges 35% for biggest weekly gain since 1983. Brent hits $92.69.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 1–4",
            event: (
              <>
                Drone strike near Fairmont The Palm, Palm Jumeirah. DXB Terminal 3 hit. <TopicLink slug="jebel-ali">Jebel Ali</TopicLink> Port fire. Burj Al Arab damaged by debris. UAE airspace closed then partially reopened. 4 killed, 112 injured in UAE (all from debris). <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> traffic drops to near-zero.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Feb 28",
            event: (
              <>
                US-Israel launch Operation Epic Fury — coordinated strikes on Iran kill Supreme Leader Khamenei. Iran retaliates across Gulf. UAE activates <TopicLink slug="ncema">NCEMA</TopicLink> emergency protocols. 233 ballistic missiles, 1,359 drones intercepted by UAE total.
              </>
            ),
            severity: "red" as const,
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
            Mojtaba Khamenei — son of the slain supreme leader — has been named
            Iran&apos;s new supreme leader. Iran rules out immediate ceasefire
            despite massive losses. Trump called the succession &ldquo;a big
            mistake.&rdquo; Iran has now attacked Qatar as well as UAE, Bahrain,
            and Kuwait — expanding its Gulf retaliation. IDF launched &ldquo;extensive&rdquo;
            airstrikes in three areas of Iran overnight.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>Mojtaba Khamenei named new supreme leader — Israel vows to target him</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>233 ballistic missiles, 1,359 drones fired at UAE (total intercepted)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>Qatar struck by 17 ballistic missiles and 6 drones — war spreading</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span><TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> effectively shut — IRGC threatening all ships</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>Iran rules out immediate ceasefire — 1,200+ killed in Iran from strikes</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>
                Internal divisions: Pezeshkian apologized then retracted under hardliner pressure
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
            UAE envoy to the UN declared UAE &ldquo;will not partake in any attacks
            on Iran&rdquo; — distancing from the US-Israeli offensive. Two UAE Armed
            Forces members killed in a helicopter crash due to technical malfunction.
            Air defenses have intercepted 233 ballistic missiles and 1,359 drones total.
            US ordered staff to leave Saudi Arabia as conflict spreads. Over 11,000
            flights canceled across the Middle East.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span><TopicLink slug="thaad">THAAD</TopicLink> and <TopicLink slug="patriot">Patriot</TopicLink> intercepting 95%+ — 233 missiles, 1,359 drones stopped</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>4 civilians killed, 112 injured (debris) + 2 military killed (helicopter crash)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>UAE envoy to UN: &ldquo;will not partake in any attacks on Iran&rdquo;</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>US ordered staff to leave Saudi Arabia — evacuations ongoing from UAE</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>11,000+ flights canceled across Middle East</span>
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
            <p className="text-2xl font-bold text-red-400">6</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Killed in UAE
            </p>
            <p className="text-[10px] text-[var(--muted)]">4 civilians (debris) + 2 military (helicopter)</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">112+</p>
            <p className="text-xs text-[var(--muted)] mt-1">Injured in UAE</p>
            <p className="text-[10px] text-[var(--muted)]">All from interception debris</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">1,200+</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Killed in Iran
            </p>
            <p className="text-[10px] text-[var(--muted)]">From US-Israeli strikes</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">7</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              US Soldiers Killed
            </p>
            <p className="text-[10px] text-[var(--muted)]">In Operation Epic Fury</p>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-4">
          ⚠️ UAE figures from UAE Defence Ministry (Mar 9). Iran figures from Al Jazeera tracker.
          233 ballistic missiles and 1,359 drones intercepted by UAE total.
          Lebanon: 400+ killed. Israel: 11 killed. Qatar also struck (17 missiles, 6 drones).
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
            The UAE is not a primary target — Iran is striking Gulf states that
            host US military bases used in Operation Epic Fury. The UAE hosts{" "}
            <TopicLink slug="al-dhafra">Al Dhafra Air Base</TopicLink> and{" "}
            <TopicLink slug="jebel-ali">Jebel Ali</TopicLink> port, both critical
            US <TopicLink slug="centcom">CENTCOM</TopicLink> logistics hubs.
            The French naval base Camp de la Paix near Abu Dhabi has also been struck.
          </p>
          <p>
            The conflict began on Feb 28 when the US and Israel launched
            Operation Epic Fury, killing Supreme Leader Khamenei. Iran retaliated
            across the entire Gulf region. Abu Dhabi and Tehran had previously maintained
            a &ldquo;gentlemen&apos;s agreement&rdquo; to avoid direct confrontation — that
            is now terminated. China has called for an end to the war, warning the
            &ldquo;flames of war&rdquo; risk spreading further.
          </p>
          <p>
            The <TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> has
            effectively shut down — traffic near zero. <TopicLink slug="oil-markets">Oil</TopicLink> soared
            past $100 to hit $119.50/barrel intraday — CNN calls it the &ldquo;biggest oil
            disruption in history.&rdquo; Maersk, CMA CGM, and Hapag-Lloyd have all
            suspended Gulf transits. 20% of global oil supply is disrupted.
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
                Middle East Total
              </p>
              <p className="text-sm font-bold mt-1">11,000+ flights canceled</p>
              <p className="text-xs text-[var(--muted)]">Across all Middle Eastern airports</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-xs text-yellow-400 font-semibold uppercase">
                Emirates (DXB)
              </p>
              <p className="text-sm font-bold mt-1">Limited schedule</p>
              <p className="text-xs text-[var(--muted)]">Select routes only • Subject to alerts</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-xs text-yellow-400 font-semibold uppercase">
                Etihad (AUH)
              </p>
              <p className="text-sm font-bold mt-1">Limited resumption</p>
              <p className="text-xs text-[var(--muted)]">Key routes operating • Subject to airspace</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-xs text-yellow-400 font-semibold uppercase">
                UAE <TopicLink slug="airspace-closure">Airspace</TopicLink>
              </p>
              <p className="text-sm font-bold mt-1">Restricted corridors</p>
              <p className="text-xs text-[var(--muted)]">
                Not fully open — may change with alerts
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
                  <strong>Virgin Atlantic</strong> — Resumed London-Dubai route
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm">
              ⚠️ <strong>Do NOT go to the airport</strong> unless you hold a
              confirmed ticket and your airline has explicitly told you to travel.
              Access is restricted to confirmed passengers only.
            </p>
          </div>
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
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="oil-markets">Oil</TopicLink> (Brent)</p>
              <p className="text-sm font-bold text-red-400">~$114 (hit $119.50)</p>
              <p className="text-xs text-[var(--muted)]">Past $100 — biggest disruption in history</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Stock Exchanges</p>
              <p className="text-sm font-bold text-red-400">Massive Sell-off</p>
              <p className="text-xs text-[var(--muted)]">
                Global markets in turmoil
              </p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink></p>
              <p className="text-sm font-bold text-red-400">Near-zero traffic</p>
              <p className="text-xs text-[var(--muted)]">
                138 → ~0 ships/day • Maersk, CMA CGM suspended
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
              Mar 9, 2026 • 14:00 GMT+4
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
            Last updated: March 9, 2026, 14:00 GMT+4
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
