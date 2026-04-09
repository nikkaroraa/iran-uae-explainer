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
import {
  OilPriceChart,
  StockMarketImpact,
  CountriesAffected,
  EconomicIndicators,
  ConflictIntensityChart,
  UAEInterceptsChart,
  HormuzShippingChart,
  EnergyInfrastructureGrid,
  RegionalCasualtyChart,
  GlobalMarketsTimeline,
  HistoricalCrisisComparison,
} from "./components/Charts";

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
            <StatusBadge status="red" label="Day 42 — Active War" />
            <StatusBadge status="yellow" label="Oil ~$89/barrel" />
            <StatusBadge status="yellow" label="Hormuz Corridor 20-22 vessels" />
            <StatusBadge status="yellow" label="4 Days Zero UAE Fire" />
            <StatusBadge status="yellow" label="Framework Principles Drafted" />
            <StatusBadge status="red" label="8,800+ Killed Regionally" />
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            Day 42 of the US-Israel war on Iran. Pakistan-brokered talks in Islamabad produced a draft
            &ldquo;framework principles&rdquo; document — 6 points including phased <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> reopening,
            partial sanctions relief, and nuclear inspection timeline. Corridor now at 20-22 vessels/day.
            Four consecutive days with zero UAE fire (Days 39-42). Oil dropped below $90 for the first
            time since the war began (~$89). Hezbollah announced a conditional pause on rocket fire
            pending ceasefire progress. Israel reduced strikes to 1-2 daily against IRGC logistics targets.
            Iran banking system ~70% restored. China&apos;s third PLA Navy tanker convoy scheduled for
            tomorrow. UAE malls back to normal operations, schools expanding reopening. Trump:
            &ldquo;Beautiful progress, deal almost done.&rdquo; Iran deputy FM: &ldquo;Framework is
            preliminary, not final — sanctions relief must come first.&rdquo; 7,200+ killed in Iran.
            1,290+ killed in Lebanon. UAE: 12 killed, 185 injured total. April 13 deadline 3 days away.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Conflict Started</p>
              <p className="text-sm font-semibold">Feb 28, 2026</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-sm font-semibold text-yellow-400">Day 42 — Framework drafted, 4 days zero UAE fire</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="ceasefire">Ceasefire</TopicLink></p>
              <p className="text-sm font-semibold text-yellow-400">
                Partial — Framework principles drafted, corridor at 20-22 vessels/day
              </p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">US Involvement</p>
              <p className="text-sm font-semibold">Active — 14 killed, 340+ wounded, 55,000+ troops deployed</p>
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
            date: "Apr 10",
            event: (
              <>
                Day 42: Fourth consecutive day with zero incoming fire toward UAE. Pakistan talks produce draft &ldquo;framework principles&rdquo; — 6 points including phased Hormuz reopening, partial sanctions relief, and nuclear inspection timeline. Corridor hits 20-22 vessels/day — highest since war began. Hezbollah announces conditional pause on rocket fire pending ceasefire progress. Oil drops below $90 for first time (~$89). Israel reduces strikes to 1-2 daily against IRGC logistics targets. Iran banking system ~70% restored. Trump: &ldquo;Beautiful progress, deal almost done.&rdquo; Iran deputy FM: &ldquo;Framework is preliminary, not final.&rdquo; UAE malls back to normal, schools expanding reopening. China&apos;s 3rd tanker convoy scheduled for tomorrow. Markets rally — DFM +3.4%, S&amp;P +1.2%.
              </>
            ),
            severity: "yellow" as const,
          },
          {
            date: "Apr 9",
            event: (
              <>
                Day 41: Third consecutive day with zero incoming fire toward UAE. Corridor steady at 18-20 vessels/day — highest since war began. Trump tweets &ldquo;deal very close, could be tremendous&rdquo; ahead of April 13 deadline. Iran FM Araghchi: &ldquo;Actions, not words — we need sanctions relief, not tweets.&rdquo; Israel strikes IRGC logistics depot in Kermanshah — 4th strike on Iranian military targets this week. Hezbollah rocket fire drops to lowest since war began (~30/day, down from 200+ peak). Oil drops to ~$92. UAE begins limited school reopening in Abu Dhabi and Dubai. Iran banking system ~60% restored. Markets continue cautious rally — DFM +2.1%, S&P +0.8%.
              </>
            ),
            severity: "yellow" as const,
          },
          {
            date: "Apr 8",
            event: (
              <>
                Day 40: Second day with no UAE fire. Corridor expands to 18 vessels — 3 more than opening day. IAEA releases preliminary Fordow assessment: radiation elevated but &ldquo;not catastrophic&rdquo; — contamination limited to 2km radius around facility, no civilian exposure detected. Pakistan talks resume in Islamabad — Iran deputy FM and US envoy meet for 4 hours. China&apos;s second PLA Navy tanker convoy (5 vessels) transits <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> safely. Israel strikes 2 IRGC command posts in western Iran. Iran banking system ~40% restored — ATMs working in Tehran, Isfahan. Oil drops to ~$94. India announces 2nd evacuation wave — 3,100 more nationals to leave UAE this week.
              </>
            ),
            severity: "yellow" as const,
          },
          {
            date: "Apr 7",
            event: (
              <>
                Day 39: First day with zero incoming fire toward UAE — air defense crews stand down for first time since war began. Humanitarian corridor holding: 15 vessels transited Hormuz yesterday under Iranian inspection. Iran fires 4 missile salvos at Israeli military targets, avoids Gulf states. IRGC deputy commander warns corridor &ldquo;can close in 60 seconds.&rdquo; Oil ~$97 — lowest since war began. Markets rally globally. UAE lifts 3-day bank closure. Cyber front: Iran restores partial banking after Israeli/NSA takedown. US: 14 killed, 340+ wounded, 55,000+ deployed.
              </>
            ),
            severity: "yellow" as const,
          },
          {
            date: "Apr 6",
            event: (
              <>
                Day 38: Deadline day — Pakistan brokers &ldquo;humanitarian shipping corridor&rdquo; through <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink>. Iran agrees to allow 15-20 inspected vessels/day — no military cargo, no US/Israeli-flagged ships. Trump extends deadline to April 13, claims credit for &ldquo;tremendous diplomatic breakthrough.&rdquo; Iran FM: &ldquo;This is not peace, this is a pause.&rdquo; Israel continues strikes on Iranian military targets. Oil crashes 11% to ~$98 on corridor news. Stock markets surge — DFM +8%, S&P +3.2%.
              </>
            ),
            severity: "yellow" as const,
          },
          {
            date: "Apr 5",
            event: (
              <>
                Day 37: Intense back-channel diplomacy ahead of April 6 deadline. Pakistan PM shuttles between Tehran and Islamabad with revised 8-point framework. China announces it will &ldquo;not stand idle&rdquo; if power grid is struck. Iran fires 6 drone swarms at Israeli bases in Negev — 4 intercepted, 2 hit perimeter fences. UAE intercepts 2 missiles, 8 drones. UAE banks closed for 3rd day from cyber attack on SWIFT gateway. Oil $109.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Apr 4",
            event: (
              <>
                Day 36: Massive cyber offensive — Israel/NSA shut down Iran&apos;s entire banking system. Iran retaliates with cyberattack on UAE Central Bank, disrupting SWIFT payments. 3 UAE banks suspend operations. Iran fires cruise missiles at Israeli airbase in Negev. Hezbollah fires 200+ rockets at northern Israel. UAE intercepts 3 missiles, 12 drones. Saudi intercepts 8 drones over Jubail industrial city. Oil $111. 8,000+ killed regionally.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Apr 3",
            event: (
              <>
                Day 35: Iran fires largest <TopicLink slug="ballistic-missiles">missile</TopicLink> barrage at Israel since war began — 47 ballistic missiles in single salvo. 3 break through Iron Dome/Arrow, killing 12 in Tel Aviv suburbs — deadliest single attack on Israel. Netanyahu vows &ldquo;historic response.&rdquo; US deploys THAAD battery to northern Israel. UAE intercepts 4 missiles, 15 drones. Oil $113. 7,500+ killed in Iran.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Apr 2",
            event: (
              <>
                Day 34: China begins escorting its own tankers through <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> with PLA Navy destroyers — first direct Chinese military intervention. Iran permits passage. 3 Chinese tankers transit safely. Russia deploys Admiral Gorshkov frigate to Gulf of Oman. US warns China against &ldquo;unilateral action.&rdquo; Israel strikes IRGC command bunker in Kermanshah, killing 2 senior commanders. Oil drops to $106 on Chinese convoy news.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Apr 1",
            event: (
              <>
                Day 33: Israel strikes Fordow underground enrichment facility with US-provided GBU-57 bunker busters — deepest strike of the war. IAEA reports &ldquo;concerning&rdquo; radiation readings near Natanz. Iran vows &ldquo;unimaginable retaliation.&rdquo; Trump: &ldquo;Iran&apos;s nuclear program is finished.&rdquo; UAE: intercepted debris damages school in Sharjah — 5 children injured. Oil $108. Pakistan PM offers to host peace talks.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 31",
            event: (
              <>
                Day 32: Israel strikes Iranian state TV headquarters in Tehran — 22 journalists killed, drawing global condemnation including from Reporters Without Borders and EU. Iran launches 200+ drones at Gulf targets in retaliation. UAE intercepts 5 missiles, 22 drones. Saudi air defenses shoot down 14 drones. Kuwait port of Shuaiba hit again. 1 US soldier killed by roadside IED in Iraq (total: 14). Oil $107.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 30",
            event: (
              <>
                Day 31: Iran deploys new &ldquo;Kheibar Shekan-2&rdquo; <TopicLink slug="ballistic-missiles">missiles</TopicLink> with improved guidance — 2 hit within 50m of <TopicLink slug="al-dhafra">Al Dhafra</TopicLink> runway. UAE airspace closed 4 hours. Abu Dhabi mall evacuated after drone debris crashes through glass roof — 8 injured. Hezbollah fires 150+ rockets at northern Israel. Iran: 6,100+ killed. India evacuates 4,200 nationals from UAE via special Air India flights.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 29",
            event: (
              <>
                Day 30: Secret Pakistan-brokered talks begin in Islamabad — Iran sends deputy FM, US sends envoy via Oman. Israel not at table. Trump says &ldquo;there will be a deal or there will be consequences.&rdquo; Iran fires 8 drone swarms at Bahrain and Saudi — 6 intercepted, 2 hit empty industrial zone. UAE intercepts 3 missiles, 17 drones. 1 Filipino worker killed by shrapnel in Ajman — UAE death toll rises to 12. Oil $106.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 28",
            event: (
              <>
                Day 29: Israel escalates strikes after hitting nuclear facilities. Iran&apos;s Arak heavy water reactor and Yazd yellowcake plant confirmed targeted — no radiation leaks reported. Iran rejects US offer as &ldquo;one-sided and unfair.&rdquo; Pakistan mediating possible in-person talks this weekend. UN Security Council holds closed-door consultations at Russia&apos;s request. VP Vance reportedly chides Netanyahu for &ldquo;overselling regime change.&rdquo; Oil ~$108. ~350 children killed across region.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 27",
            event: (
              <>
                Day 28: Israel strikes Iran&apos;s nuclear facilities — Yazd yellowcake uranium plant (&ldquo;only one of its kind&rdquo;) and Khondab/Arak heavy water reactor hit. US-Israeli strikes damage two major Iranian steel plants. US confirms ~two-thirds of Iran&apos;s missile/drone production destroyed. US airstrike on Habbaniyah base kills 5-7 Iraqi soldiers, wounds 23. 120+ Iranian historical sites damaged. Oil $107.81. 1,900+ killed in Iran (1,500 civilians, 217+ children).
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 26",
            event: (
              <>
                Day 27: Israel kills IRGC Navy chief Admiral Tangsiri in airstrike at Bandar Abbas near <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink>. Trump extends energy strike pause 10 days to April 6 — says talks &ldquo;going very well.&rdquo; Iran rejects direct talks. 6 Gulf states (UAE, Saudi, Kuwait, Bahrain, Qatar, Jordan) issue joint condemnation. Abu Dhabi: intercepted debris kills 2 (Indian, Pakistani nationals), injures 3. Kuwait&apos;s Shuwaikh port hit by dawn drone attack. Oil $105.85.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 25",
            event: (
              <>
                Day 26: Saudi Arabia intercepts 32+ drones and 1 <TopicLink slug="ballistic-missiles">ballistic missile</TopicLink> in Eastern Province — major oil facilities targeted. Iran receives US 15-point peace proposal via Pakistan — rejects it as &ldquo;extremely maximalist.&rdquo; Iran&apos;s 5-point counterproposal demands war reparations and Hormuz sovereignty. Iran says &ldquo;non-hostile&rdquo; ships from China, Russia, India, Iraq, Pakistan can transit Hormuz. DXB Terminal 3 debris from intercept injures 2. UAE: 11 killed, 169 injured total. Oil drops below $100 briefly.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 24",
            event: (
              <>
                Day 25: IDF conducts &ldquo;extensive&rdquo; strikes on Isfahan Province — 600+ strikes on Iranian <TopicLink slug="ballistic-missiles">missile</TopicLink> sites since war began. Iran fires 9 attack waves with cluster munitions at Israel. 1,000 troops from 82nd Airborne deploying to Middle East. Japan releases 30 days of oil reserves. Kuwait airport drone strike causes fire. Oil $102.47 (+43% from one month ago).
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 23",
            event: (
              <>
                Day 24: Trump postpones planned strikes on Iran&apos;s power plants for 5 days, citing &ldquo;productive conversations.&rdquo; Iran denies any direct talks — says Trump trying to lower oil prices. US airstrike on Habbaniyah base (Iraq) kills 15 fighters including PMF commander. Iran threatens to mine &ldquo;entire Persian Gulf.&rdquo; Missile warning issued across UAE. Oil drops to ~$101 on deal hopes. 2,000 vessels and 20,000 seafarers stranded at <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink>.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 22",
            event: (
              <>
                Day 23: Trump issues 48-hour ultimatum — reopen <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> or US will &ldquo;hit and obliterate&rdquo; Iran&apos;s power plants. Iran warns it will target all US/Israeli energy infrastructure if attacked. Iran military says Hormuz will be &ldquo;completely closed&rdquo; if US follows through. Oil ~$112/barrel. 4,500+ killed across the region.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 21",
            event: (
              <>
                Day 22: Iranian <TopicLink slug="ballistic-missiles">missiles</TopicLink> break through Israeli defenses — direct hits on Dimona and Arad, wounding ~100. Missile debris lands near Temple Mount/Al-Aqsa in Jerusalem. Israel kills IRGC spokesman Ali Mohammad Naini. HRANA: 3,100+ killed in Iran, 50%+ of strikes hitting Tehran. Gold crashes 10% weekly — worst since 1983.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 20",
            event: (
              <>
                Day 21: Iran hits Kuwait&apos;s Mina Al-Ahmadi refinery for second straight day — fires across multiple units. Trump says considering &ldquo;winding down&rdquo; war, even as more Marines deploy to region. UAE intercepts 4 missiles, 26 drones. UAE arrests 100+ people for filming attacks. Israel kills IRGC spokesman. UAE dismantles Hezbollah/Iran-linked network.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 19",
            event: (
              <>
                Day 20: Oil hits $115/barrel after South Pars strike. Iran fires 5 missile salvos at Jerusalem and northern Israel — exceptional scale. 54 Hezbollah attack waves against Israel in one day. Israel strikes 200+ targets including Tehran, Parchin, Kerman, Arak. Iran hits Kuwait&apos;s largest oil refinery. QatarEnergy reports &ldquo;extensive damage&rdquo; at Ras Laffan.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 18",
            event: (
              <>
                Day 19: Major escalation — Israel strikes South Pars gas field (world&apos;s largest) and Asaluyeh refinery with US coordination. Strike disables most of Iran&apos;s gas production. Oil jumps to $108. Iran retaliates against Gulf energy infrastructure. Israel bombs central Beirut, killing 6+. UAE intercepts 13 missiles, 27 drones. Lebanon: 1,000+ killed, 1M displaced.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 17",
            event: (
              <>
                Day 18: UAE briefly closes airspace after intercepting new missile and drone wave — flights resume within hours. Israel launches &ldquo;wide-scale wave of strikes&rdquo; across Tehran. Israel kills Iran security chief Ali Larijani. 1,444 killed in Iran, 18,551 injured. Israel stepping up strikes on Hezbollah in Lebanon — 850+ killed, 1M+ displaced.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 16",
            event: (
              <>
                Day 17: Iranian drone ignites fuel tank near Dubai airport — flights disrupted for hours. <TopicLink slug="ballistic-missiles">Missile</TopicLink> hits car in Abu Dhabi, killing Palestinian resident. Drone strikes near Fairmont The Palm again — 4 injured. UAE intercepts 6 missiles and 21 drones. Trump demands NATO/China patrol <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> — Australia and Japan refuse. Iran FM: &ldquo;We never asked for a ceasefire.&rdquo;
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 14–15",
            event: (
              <>
                Day 15-16: US bombs Iran&apos;s Kharg Island — its biggest oil terminal. Trump: &ldquo;We may hit it again just for fun.&rdquo; Iran vows retaliation. UAE intercepts 9 missiles, 33 drones. 1,000+ tankers stranded at Hormuz. Trump urges allies to send warships — muted response. IDF hits 200+ targets in western/central Iran. Israel launches &ldquo;limited&rdquo; ground operations in Lebanon. Iran FM says war &ldquo;must end&rdquo; but rejects ceasefire.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 12–13",
            event: (
              <>
                Day 13-14: Six US airmen killed when KC-135 refueling plane crashes in western Iraq. Mojtaba Khamenei gives first address — vows to keep <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> closed. Hegseth claims Khamenei is &ldquo;likely disfigured.&rdquo; Iran fires 5-hour barrage at Israel — missiles near Jerusalem Old City. US lifts restrictions on Russian oil sales to offset crisis. Bahrain: 114 missiles, 190 drones intercepted since war began.
              </>
            ),
            severity: "red" as const,
          },
          {
            date: "Mar 10–11",
            event: (
              <>
                Day 11-12: US declares &ldquo;most intense day of strikes&rdquo; inside Iran. 11 B-1, 3 B-52 bombers deployed to RAF Fairford. Iran fires lowest missiles since war began. US destroys 16 Iranian minelayers near <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> — Iran had laid &ldquo;less than 10&rdquo; naval mines. 3 ships hit by projectiles near Hormuz (Japanese, Thai, Marshall Islands flagged). IEA releases strategic oil reserves. US investigating Tomahawk strike on Iranian girls school (175 killed).
              </>
            ),
            severity: "red" as const,
          },
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
                Day 9: Three shelter alerts in Abu Dhabi between 8:30-10:55am. Israel strikes Tehran oil depots — blackened rain reported. Bahrain desalination plant hit, Kuwait fuel depot struck. Iran&apos;s new supreme leader chosen but unnamed. US State Dept operating evacuation flights from UAE.
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
            Humanitarian corridor through <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> expanding —
            18-20 vessels/day now transiting under Iranian inspection, up from 15 on Day 38.
            FM Araghchi at Islamabad talks (Day 40): &ldquo;Actions, not words — we need sanctions
            relief, not tweets.&rdquo; IAEA preliminary Fordow assessment (Day 40): radiation elevated
            but &ldquo;not catastrophic&rdquo; — contamination limited to 2km radius. Iran fired
            largest missile barrage at Israel (Day 35) — 3 broke through, 12 killed in Tel Aviv.
            Banking system ~60% restored after Israeli/NSA cyber attack. China&apos;s second tanker
            convoy transited safely (Day 40). Israel continues limited strikes on IRGC military
            targets. 7,200+ killed in Iran. ~75% of missile/drone production destroyed. 150+
            historical sites damaged. Hezbollah announces conditional pause on rocket fire.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>Corridor expanding — 18-20 vessels/day through Hormuz, up from 15 on opening day</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>IAEA Fordow assessment: radiation &ldquo;not catastrophic&rdquo; — 2km contamination radius</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>7,200+ killed (~4,900 civilians, 390+ children). 150+ historical sites damaged.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>Banking system ~60% restored — ATMs working in Tehran, Isfahan. SWIFT partially back.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>
                China&apos;s 2nd tanker convoy transits safely (Day 40) — PLA Navy now a permanent Hormuz presence
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>Hezbollah rocket fire drops to ~30/day (down from 200+ peak) — lowest since war began</span>
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
            UAE air defenses intercepted 395 ballistic missiles, 18 cruise missiles,
            and 2,050 drones over 38 days of fighting — ~46% of all Iranian projectiles targeted
            the UAE. Four consecutive days with zero incoming fire (Days 39-42) since corridor
            deal. 12 killed (3 military incl. 2 Emirati, 1 Moroccan; 9 civilians from Indian,
            Pakistani, Nepalese, Bangladeshi, Filipino, and Palestinian nationalities), 185 injured
            (from 31 nationalities). Limited school reopening began April 9 in Abu Dhabi and Dubai.
            Banking system fully restored after 3-day cyber disruption. India announced 2nd evacuation
            wave — 7,300 nationals total. UAE arrested 150+ for filming attacks.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span><TopicLink slug="thaad">THAAD</TopicLink> and <TopicLink slug="patriot">Patriot</TopicLink> intercepted 395 missiles, 2,050 drones over 38 days of fire</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>4 consecutive days zero incoming fire (Days 39-42) — corridor holding</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">•</span>
              <span>Schools and malls reopening, normal operations expanding (Apr 10) — cautious normalization</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              <span>12 killed, 185 injured — banking system now fully restored after cyber attack</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>India 2nd evacuation wave — 7,300 nationals total. Other embassies running group flights.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">•</span>
              <span>150+ arrested for filming attacks — up to 2yr prison, AED 200K fines</span>
            </li>
          </ul>
        </div>
      </InfoCard>

      <InfoCard>
        <UAEInterceptsChart />
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
            <p className="text-2xl font-bold text-red-400">12</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Killed in UAE
            </p>
            <p className="text-[10px] text-[var(--muted)]">3 military (2 Emirati, 1 Moroccan), 9 civilians</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">185+</p>
            <p className="text-xs text-[var(--muted)] mt-1">Injured in UAE</p>
            <p className="text-[10px] text-[var(--muted)]">From 31 nationalities. Debris, blast, cyber.</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">7,200+</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Killed in Iran
            </p>
            <p className="text-[10px] text-[var(--muted)]">~4,800 civilians, 380+ children (WaPo/HRANA)</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">14</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              US Service Members Killed
            </p>
            <p className="text-[10px] text-[var(--muted)]">340+ wounded (75% TBI). 55,000+ deployed.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-red-500/10 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-red-400">1,290+</p>
            <p className="text-[10px] text-[var(--muted)]">Killed in Lebanon</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-red-400">34+</p>
            <p className="text-[10px] text-[var(--muted)]">Killed in Israel</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-red-400">8,800+</p>
            <p className="text-[10px] text-[var(--muted)]">Total killed regionally</p>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-4">
          ⚠️ Figures from multiple sources as of Apr 10. Iran: ~4,900 civilians killed (WaPo), Hengaw reports
          8,800+ total. Lebanon: 1,290+ killed, 3,950+ injured (160 children, 56 health workers).
          UAE: 12 killed, 185 injured (Defence Ministry). US: 14 killed, 340+ wounded. Kuwait: 11 killed.
          Saudi: 4 killed. Bahrain: 3 killed. Israel: 34 killed (12 in Day 35 barrage). ~530 children killed across region. 55,000+ US troops deployed.
        </p>
      </InfoCard>

      <InfoCard>
        <RegionalCasualtyChart />
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
            On April 6, Pakistan brokered a &ldquo;humanitarian shipping corridor&rdquo; through
            the <TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> — now expanded to
            18-20 vessels/day under Iranian inspection. China began escorting its own tankers with PLA Navy
            destroyers (Day 34) — second convoy transited safely on Day 40. Israel struck Fordow enrichment
            facility with bunker busters (Day 33); IAEA assessment (Day 40) found radiation &ldquo;elevated
            but not catastrophic&rdquo; — 2km contamination radius. Iran fired its largest barrage at Israel
            on Day 35 — 3 missiles broke through, killing 12 in Tel Aviv. Cyber war erupted but banking
            systems now recovering (Iran ~60%, UAE fully restored). UAE has seen 3 days of zero incoming
            fire (Days 39-42). Pakistan talks produced draft &ldquo;framework principles&rdquo; (Day 42).
            <TopicLink slug="oil-markets">Oil</TopicLink> peaked at $119.50 (Mar 9), now ~$89 — below $90 for first time.
            Hezbollah rocket fire at lowest since war began. UAE begins limited school reopening.
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

function OutlookSection() {
  const scenarios = [
    {
      title: "Slow De-escalation",
      probability: "~50%",
      color: "green" as const,
      description:
        "Corridor continues expanding past 20 vessels/day. Pakistan/China mediation produces phased framework by April 13: Hormuz reopens further, strikes wind down, some sanctions relief. Oil returns to $80-85 range within weeks.",
      reasoning:
        "Three days zero UAE fire. Corridor expanding (18-20 vessels). IAEA Fordow report less alarming than feared. Oil falling fast ($92). Hezbollah de-escalating. Trump wants a deal before midterms. China's escort creates face-saving pathway.",
      keySignals: [
        "Corridor expands past 25 vessels/day",
        "April 13 deadline produces framework agreement",
        "Hezbollah formally de-escalates",
        "China brokers separate energy agreement",
      ],
    },
    {
      title: "Frozen Conflict",
      probability: "~35%",
      color: "yellow" as const,
      description:
        "Corridor stabilizes at 18-25 vessels/day instead of 138. Neither side formally ends hostilities. Israel continues limited strikes on Iranian military. Oil settles $85-95 for months.",
      reasoning:
        "Israel wants to keep degrading Iran's military capacity. Iran can't accept a deal that looks like capitulation. Corridor gives everyone just enough to avoid catastrophe. April 13 passes without full resolution.",
      keySignals: [
        "April 13 deadline extended again without framework",
        "Israel continues weekly strikes on IRGC targets",
        "No formal ceasefire framework emerges",
        "Gulf states normalize around reduced shipping",
      ],
    },
    {
      title: "Re-escalation",
      probability: "~15%",
      color: "red" as const,
      description:
        "Corridor collapses — IRGC hardliner orders it shut, or miscalculation triggers spiral. Iran re-mines Hormuz. Oil spikes past $130. China-US confrontation risk.",
      reasoning:
        "IRGC deputy already warned corridor 'can close in 60 seconds.' A stray missile hitting a Chinese vessel, or domestic pressure on Mojtaba Khamenei, could trigger collapse.",
      keySignals: [
        "IRGC rhetoric intensifies against corridor",
        "Incident involving Chinese or Russian vessel",
        "Israel strikes Iranian leadership again",
        "Iran resumes attacks on Gulf energy infrastructure",
      ],
    },
  ];

  const colorMap = {
    green: {
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      badge: "bg-green-500/20 text-green-400",
      dot: "bg-green-500",
    },
    yellow: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/5",
      badge: "bg-yellow-500/20 text-yellow-400",
      dot: "bg-yellow-500",
    },
    red: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      badge: "bg-red-500/20 text-red-400",
      dot: "bg-red-500",
    },
  };

  return (
    <section id="outlook" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        🔮 Where Is This Heading?
      </h2>

      <InfoCard>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            The humanitarian corridor is expanding and holding — 3 days of zero UAE fire, 18-20 vessels
            transiting daily. The April 13 deadline is 4 days away. De-escalation momentum is real but
            fragile. Three plausible directions:
          </p>
        </div>
      </InfoCard>

      {scenarios.map((s, i) => (
        <InfoCard key={i}>
          <div className={`border rounded-xl p-4 ${colorMap[s.color].border} ${colorMap[s.color].bg}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${colorMap[s.color].dot}`} />
                <h3 className="text-sm font-bold">{s.title}</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${colorMap[s.color].badge}`}>
                {s.probability}
              </span>
            </div>
            <p className="text-sm text-[var(--foreground)] mb-3">{s.description}</p>
            <div className="bg-black/10 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                Why this scenario
              </p>
              <p className="text-[11px] text-[var(--muted)]">{s.reasoning}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                Key signals to watch
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {s.keySignals.map((signal, j) => (
                  <div key={j} className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorMap[s.color].dot}`} />
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      ))}

      <InfoCard>
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            The China Wildcard
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            China&apos;s military escort through <TopicLink slug="strait-of-hormuz">Hormuz</TopicLink> (Day 34) is
            the most significant geopolitical development since the war began. It changes the
            calculus for everyone: Iran gets a face-saving partner, the US faces a peer competitor
            in its traditional sphere, and Gulf states gain leverage with both sides.
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            If China brokers a separate energy deal with Iran — bypassing US sanctions entirely —
            it could fracture the US-led pressure campaign and create a parallel trading system
            that outlasts this war. Russia&apos;s deployment of the Admiral Gorshkov frigate to
            the Gulf of Oman suggests Moscow is positioning to benefit from any such arrangement.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
            <p className="text-[11px]">
              <strong>Bottom line:</strong> This war is no longer just about Iran&apos;s nuclear
              program or Gulf security. It&apos;s becoming a proxy for a new global energy order.
              The corridor&apos;s survival — and who controls it — may matter more than any ceasefire.
            </p>
          </div>
        </div>
      </InfoCard>

      <InfoCard>
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Key Dates Ahead
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-xs text-red-400 font-semibold">April 13</p>
              <p className="text-[11px] text-[var(--muted)]">
                Trump&apos;s extended deadline. Corridor must prove viable or power grid strikes resume.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-xs text-green-400 font-semibold">IAEA Report ✓</p>
              <p className="text-[11px] text-[var(--muted)]">
                Preliminary Fordow assessment released Apr 8: radiation &ldquo;not catastrophic&rdquo; — 2km radius. Full report pending.
              </p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <p className="text-xs text-yellow-400 font-semibold">Pakistan Talks — Ongoing</p>
              <p className="text-[11px] text-[var(--muted)]">
                Islamabad talks resumed Apr 8. Iran deputy FM and US envoy met for 4 hours. Framework being drafted.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-xs text-green-400 font-semibold">China Convoy ✓</p>
              <p className="text-[11px] text-[var(--muted)]">
                2nd PLA Navy convoy (5 tankers) transited safely Apr 8. China now a permanent Hormuz presence.
              </p>
            </div>
          </div>
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
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-xs text-green-400 font-semibold uppercase">
                Latest (Apr 10)
              </p>
              <p className="text-sm font-bold mt-1">3 days zero incoming fire</p>
              <p className="text-xs text-[var(--muted)]">Corridor holding — cautious normalization underway</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-xs text-green-400 font-semibold uppercase">
                DXB Airport
              </p>
              <p className="text-sm font-bold mt-1">Expanding operations</p>
              <p className="text-xs text-[var(--muted)]">More flights resuming daily — still below pre-war levels</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-xs text-green-400 font-semibold uppercase">
                Emirates / Etihad
              </p>
              <p className="text-sm font-bold mt-1">Increasing capacity</p>
              <p className="text-xs text-[var(--muted)]">Adding routes daily — some long-haul resuming</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-xs text-green-400 font-semibold uppercase">
                UAE <TopicLink slug="airspace-closure">Airspace</TopicLink>
              </p>
              <p className="text-sm font-bold mt-1">Open — 3rd day clear</p>
              <p className="text-xs text-[var(--muted)]">
                Continuously open since Day 39 — subject to change if corridor fails
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

      {/* Oil Price Chart */}
      <InfoCard>
        <OilPriceChart />
      </InfoCard>

      {/* Key indicators before/after */}
      <InfoCard>
        <EconomicIndicators />
      </InfoCard>

      {/* Global Stock Market Impact */}
      <InfoCard>
        <StockMarketImpact />
      </InfoCard>

      {/* Global Markets Timeline */}
      <InfoCard>
        <GlobalMarketsTimeline />
      </InfoCard>

      {/* Historical Crisis Comparison */}
      <InfoCard>
        <HistoricalCrisisComparison />
      </InfoCard>

      {/* Hormuz Shipping */}
      <InfoCard>
        <HormuzShippingChart />
      </InfoCard>

      {/* Energy Infrastructure */}
      <InfoCard>
        <EnergyInfrastructureGrid />
      </InfoCard>

      {/* Conflict Intensity Chart */}
      <InfoCard>
        <ConflictIntensityChart />
      </InfoCard>

      {/* Countries Affected */}
      <InfoCard>
        <CountriesAffected />
      </InfoCard>

      <InfoCard>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="oil-markets">Oil</TopicLink> (Brent)</p>
              <p className="text-sm font-bold text-yellow-400">~$89 (peaked $119.50)</p>
              <p className="text-xs text-[var(--muted)]">+27% since war began. Below $90 for first time.</p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]"><TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink></p>
              <p className="text-sm font-bold text-yellow-400">Corridor Expanding</p>
              <p className="text-xs text-[var(--muted)]">
                18-20 vessels/day under Iranian inspection • Expanding
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Cyber War</p>
              <p className="text-sm font-bold text-yellow-400">Cooling</p>
              <p className="text-xs text-[var(--muted)]">
                Iran banking ~60% restored. UAE banks fully back. No new attacks since Apr 6.
              </p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3">
              <p className="text-xs text-[var(--muted)]">Banks</p>
              <p className="text-sm font-bold text-green-400">Operational</p>
              <p className="text-xs text-[var(--muted)]">UAE fully restored. ATMs normal. Some Iran SWIFT delays.</p>
            </div>
          </div>
          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm">
              💡 <strong>Tip:</strong> ATMs are working but expect queues.
              Withdraw cash for essential purchases. Keep AED 500-1000 on hand.
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
              Apr 10, 2026 • 14:00 GMT+4
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
              <OutlookSection />
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
            Last updated: April 10, 2026, 14:00 GMT+4
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
