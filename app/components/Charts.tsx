"use client";

// ─── Oil Price Timeline Chart ───────────────────────────
export function OilPriceChart() {
  const data = [
    { date: "Feb 27", price: 70, label: "$70" },
    { date: "Feb 28", price: 80, label: "$80", event: "War begins" },
    { date: "Mar 1", price: 83, label: "$83" },
    { date: "Mar 2", price: 85, label: "$85" },
    { date: "Mar 3", price: 87, label: "$87" },
    { date: "Mar 5", price: 93, label: "$93" },
    { date: "Mar 7", price: 95, label: "$95" },
    { date: "Mar 9", price: 114, label: "$114", event: "Hit $119 intraday" },
    { date: "Mar 11", price: 91, label: "$91", event: "IEA reserves" },
    { date: "Mar 13", price: 100, label: "$100", event: "Kharg bombed" },
    { date: "Mar 14", price: 103, label: "$103" },
    { date: "Mar 16", price: 102, label: "$102" },
    { date: "Mar 17", price: 103, label: "$103" },
    { date: "Mar 18", price: 108, label: "$108", event: "South Pars struck" },
    { date: "Mar 19", price: 115, label: "$115", event: "Gulf energy attacks" },
    { date: "Mar 20", price: 107, label: "$107" },
    { date: "Mar 22", price: 112, label: "$112", event: "Hormuz ultimatum" },
    { date: "Mar 23", price: 101, label: "$101", event: "Trump delays strikes" },
    { date: "Mar 24", price: 102, label: "$102" },
    { date: "Mar 25", price: 100, label: "$100", event: "Brief dip on deal hopes" },
    { date: "Mar 26", price: 106, label: "$106", event: "Tangsiri killed" },
    { date: "Mar 27", price: 108, label: "$108", event: "Nuclear sites struck" },
    { date: "Mar 28", price: 108, label: "$108" },
    { date: "Mar 29", price: 106, label: "$106", event: "Secret talks begin" },
    { date: "Mar 30", price: 107, label: "$107", event: "New missiles hit UAE" },
    { date: "Mar 31", price: 107, label: "$107", event: "State TV struck" },
    { date: "Apr 1", price: 108, label: "$108", event: "Fordow bunker-busted" },
    { date: "Apr 2", price: 106, label: "$106", event: "China escorts tankers" },
    { date: "Apr 3", price: 113, label: "$113", event: "Tel Aviv hit, 12 killed" },
    { date: "Apr 4", price: 111, label: "$111", event: "Cyber war erupts" },
    { date: "Apr 5", price: 109, label: "$109", event: "Deadline eve diplomacy" },
    { date: "Apr 6", price: 98, label: "$98", event: "Corridor deal — oil crashes" },
    { date: "Apr 7", price: 97, label: "$97", event: "Corridor holding" },
  ];

  const maxPrice = 125;
  const minPrice = 60;
  const range = maxPrice - minPrice;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Brent Crude Oil ($/barrel)
        </h3>
        <span className="text-xs text-yellow-400 font-mono">+39% since war began</span>
      </div>

      {/* Chart area */}
      <div className="relative bg-[var(--muted-bg)] rounded-lg p-4 pt-6 pb-8 overflow-x-auto">
        {/* $100 reference line */}
        <div
          className="absolute left-4 right-4 border-t border-dashed border-red-500/40 pointer-events-none z-[1]"
          style={{ bottom: `${((100 - minPrice) / range) * 160 + 32}px` }}
        >
          <span className="absolute -top-3 right-0 text-[9px] text-red-400/60 font-mono">$100</span>
        </div>

        <div className="flex items-end gap-[6px] min-w-[500px]" style={{ height: 160 }}>
          {data.map((d, i) => {
            const barHeight = ((d.price - minPrice) / range) * 160;
            const isSpike = d.price >= 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {d.date}: {d.label}/bbl
                    {d.event && <span className="block text-yellow-300">{d.event}</span>}
                  </div>
                  <div className="w-1.5 h-1.5 bg-black/90 rotate-45 -mt-1" />
                </div>
                {/* Price label */}
                <span className="text-[9px] text-[var(--muted)] font-mono mb-1">{d.label}</span>
                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm ${
                    isSpike ? "bg-red-500" : d.price >= 85 ? "bg-orange-400" : "bg-green-500"
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              </div>
            );
          })}
        </div>
        {/* Date labels row */}
        <div className="flex gap-[6px] min-w-[500px] mt-1">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[8px] text-[var(--muted)] font-mono">
                {d.date.replace("Feb ", "2/").replace("Mar ", "3/").replace("Apr ", "4/")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Pre-war: ~$70/bbl. Peak: $119.50 intraday (Mar 9). Current: ~$97.
        Crashed on Apr 6 corridor deal. Goldman Sachs: &ldquo;corridor fragile — triple-digit oil returns if it fails.&rdquo; 20% of global supply disrupted.
      </p>
    </div>
  );
}

// ─── Global Stock Market Impact ─────────────────────────
export function StockMarketImpact() {
  const markets = [
    { name: "Nifty 50", country: "India", flag: "🇮🇳", change: -6.5, detail: "Recovering from -8% low. Corridor hopes lift sentiment.", color: "red" },
    { name: "DFM", country: "UAE/Dubai", flag: "🇦🇪", change: -15, detail: "Recovering from -21% low. +8% on corridor day. Cyber attack hit banks.", color: "red" },
    { name: "ADX", country: "UAE/Abu Dhabi", flag: "🇦🇪", change: -6, detail: "Energy weight limits losses. Recovering.", color: "red" },
    { name: "Nikkei 225", country: "Japan", flag: "🇯🇵", change: -9, detail: "Oil import shock deepening. Yen weakening.", color: "red" },
    { name: "KOSPI", country: "South Korea", flag: "🇰🇷", change: -7, detail: "Energy & supply chain fears persist", color: "red" },
    { name: "S&P 500", country: "USA", flag: "🇺🇸", change: -4.5, detail: "Recovering from -7% low. +3.2% on corridor news.", color: "red" },
    { name: "STOXX 600", country: "Europe", flag: "🇪🇺", change: -7, detail: "Energy crisis deepening despite corridor", color: "red" },
    { name: "FTSE 100", country: "UK", flag: "🇬🇧", change: -4.8, detail: "Oil majors rallying on corridor uncertainty", color: "orange" },
    { name: "ASX 200", country: "Australia", flag: "🇦🇺", change: -5.5, detail: "Commodity volatility. LNG prices surge.", color: "red" },
  ];

  const maxDrop = 21;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Global Stock Market Impact
        </h3>
        <span className="text-xs text-red-400 font-mono">Since Feb 28</span>
      </div>

      <div className="space-y-2">
        {markets.map((m, i) => (
          <div key={i} className="bg-[var(--muted-bg)] rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{m.flag}</span>
              <span className="text-xs font-semibold flex-1">{m.name}</span>
              <span className="text-xs font-bold font-mono text-red-400">
                {m.change}%
              </span>
            </div>
            {/* Bar visualization */}
            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  Math.abs(m.change) >= 10 ? "bg-red-500" : Math.abs(m.change) >= 6 ? "bg-red-400" : "bg-orange-400"
                }`}
                style={{ width: `${(Math.abs(m.change) / maxDrop) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[var(--muted)] mt-1">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Countries Affected Map/Grid ────────────────────────
export function CountriesAffected() {
  const countries = [
    {
      name: "Iran",
      flag: "🇮🇷",
      status: "red" as const,
      casualties: "6,800+ killed (HRANA/WaPo)",
      detail: "Fordow bunker-busted. Banking system collapsed by cyber attack. Corridor agreed but strikes continue.",
    },
    {
      name: "UAE",
      flag: "🇦🇪",
      status: "yellow" as const,
      casualties: "12 killed, 185 injured",
      detail: "395 missiles, 2,050 drones intercepted. First day zero fire (Apr 7). Banks hit by cyber attack.",
    },
    {
      name: "Israel",
      flag: "🇮🇱",
      status: "red" as const,
      casualties: "34+ killed, 5,100+ injured",
      detail: "12 killed in Tel Aviv (Day 35 barrage). Fordow bunker-busted. State TV HQ struck (22 journalists).",
    },
    {
      name: "Lebanon",
      flag: "🇱🇧",
      status: "red" as const,
      casualties: "1,250+ killed, 3,800+ injured",
      detail: "Israeli strikes on Hezbollah continue. 1.2M+ displaced. 145+ children killed.",
    },
    {
      name: "Qatar",
      flag: "🇶🇦",
      status: "red" as const,
      casualties: "Ras Laffan damaged",
      detail: "QatarEnergy: repairs could take 10-20 years. 17% global LNG disrupted.",
    },
    {
      name: "Bahrain",
      flag: "🇧🇭",
      status: "red" as const,
      casualties: "3 killed",
      detail: "140+ missiles and 220+ drones intercepted. US 5th Fleet base targeted.",
    },
    {
      name: "Kuwait",
      flag: "🇰🇼",
      status: "red" as const,
      casualties: "11 killed",
      detail: "Shuaiba port hit again (Day 32). Mina Al-Ahmadi refinery still offline.",
    },
    {
      name: "Saudi Arabia",
      flag: "🇸🇦",
      status: "orange" as const,
      casualties: "4 killed",
      detail: "14 drones intercepted over Jubail industrial city (Day 36). Eastern Province on high alert.",
    },
    {
      name: "Iraq",
      flag: "🇮🇶",
      status: "orange" as const,
      casualties: "65+ killed (incl. 6 US airmen)",
      detail: "KC-135 crash. PMF members killed. 1 US soldier killed by IED (Day 32).",
    },
    {
      name: "India",
      flag: "🇮🇳",
      status: "yellow" as const,
      casualties: "4,200 evacuated from UAE",
      detail: "Nifty recovering (-6.5%). Special Air India evacuation flights. 85% oil imports at risk.",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      status: "yellow" as const,
      casualties: "Economic impact",
      detail: "Nikkei -9%. Ship hit near Hormuz (Japanese-flagged). 30 days oil reserves released.",
    },
    {
      name: "China",
      flag: "🇨🇳",
      status: "orange" as const,
      casualties: "Military intervention",
      detail: "PLA Navy escorting tankers through Hormuz (Day 34). First direct military involvement.",
    },
    {
      name: "Global",
      flag: "🌍",
      status: "yellow" as const,
      casualties: "8,500+ killed total",
      detail: "Oil ~$97 (down from $119 peak). Corridor open but fragile. Cyber war escalation.",
    },
  ];

  const statusColors = {
    red: "border-red-500/30 bg-red-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
  };

  const dotColors = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Countries Affected
      </h3>
      <div className="flex gap-3 text-[10px] text-[var(--muted)]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Direct combat</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Under attack</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Economic impact</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {countries.map((c, i) => (
          <div
            key={i}
            className={`border rounded-lg p-3 ${statusColors[c.status]}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${dotColors[c.status]}`} />
              <span className="text-sm">{c.flag}</span>
              <span className="text-xs font-bold">{c.name}</span>
            </div>
            <p className="text-[11px] font-semibold text-[var(--foreground)]">{c.casualties}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">{c.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Key Economic Indicators ────────────────────────────
export function EconomicIndicators() {
  const indicators = [
    {
      label: "Brent Crude",
      before: "$70/bbl",
      now: "~$97/bbl",
      change: "+39%",
      direction: "up" as const,
      icon: "🛢️",
    },
    {
      label: "Gold",
      before: "$5,296/oz",
      now: "~$4,650/oz",
      change: "-12%",
      direction: "down" as const,
      icon: "🥇",
    },
    {
      label: "USD/INR",
      before: "₹87.5",
      now: "₹91.8",
      change: "+4.9%",
      direction: "up" as const,
      icon: "💱",
    },
    {
      label: "S&P 500",
      before: "~5,950",
      now: "~5,680",
      change: "-4.5%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "Nifty 50",
      before: "~23,100",
      now: "~21,600",
      change: "-6.5%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "DFM (Dubai)",
      before: "~5,200",
      now: "~4,420",
      change: "-15%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "Hormuz Shipping",
      before: "138 ships/day",
      now: "~15 ships/day",
      change: "-89%",
      direction: "down" as const,
      icon: "🚢",
    },
    {
      label: "ME Oil Exports",
      before: "25.1M bbl/day",
      now: "11.2M bbl/day",
      change: "-55%",
      direction: "down" as const,
      icon: "⛽",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Economic Indicators: Before vs Now
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {indicators.map((ind, i) => (
          <div key={i} className="bg-[var(--muted-bg)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{ind.icon}</span>
              <span className="text-xs font-bold">{ind.label}</span>
              <span
                className={`ml-auto text-xs font-bold font-mono ${
                  ind.direction === "up"
                    ? ind.label.includes("Crude") || ind.label.includes("USD")
                      ? "text-red-400"
                      : "text-green-400"
                    : ind.label.includes("Gold")
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {ind.change}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <div className="flex-1">
                <p className="text-[10px] text-[var(--muted)]">Pre-war</p>
                <p className="font-mono">{ind.before}</p>
              </div>
              <span className="text-[var(--muted)]">→</span>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--muted)]">Now</p>
                <p className="font-mono font-semibold">{ind.now}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[var(--muted)]">
        Data approximate as of Apr 7, 2026. Oil peaked at $119.50 (Mar 9), crashed to ~$97 on corridor deal (Apr 6).
        Corridor fragile — Goldman Sachs: &ldquo;triple-digit oil returns within days if corridor fails.&rdquo; Cyber war now a major front.
      </p>
    </div>
  );
}

// ─── Conflict Intensity Timeline ────────────────────────
export function ConflictIntensityChart() {
  const days = [
    { day: "D1", date: "Feb 28", missiles: 100, drones: 80, label: "War starts" },
    { day: "D2", date: "Mar 1", missiles: 90, drones: 85, label: "" },
    { day: "D3", date: "Mar 2", missiles: 85, drones: 80, label: "" },
    { day: "D4", date: "Mar 3", missiles: 80, drones: 75, label: "" },
    { day: "D5", date: "Mar 4", missiles: 70, drones: 70, label: "" },
    { day: "D7", date: "Mar 6", missiles: 65, drones: 60, label: "" },
    { day: "D9", date: "Mar 8", missiles: 55, drones: 50, label: "New leader" },
    { day: "D10", date: "Mar 9", missiles: 50, drones: 45, label: "Oil $119" },
    { day: "D11", date: "Mar 10", missiles: 30, drones: 35, label: "Lowest fire" },
    { day: "D13", date: "Mar 12", missiles: 25, drones: 20, label: "KC-135 crash" },
    { day: "D14", date: "Mar 13", missiles: 20, drones: 18, label: "Kharg hit" },
    { day: "D16", date: "Mar 15", missiles: 15, drones: 14, label: "-90% / -86%" },
    { day: "D17", date: "Mar 16", missiles: 18, drones: 25, label: "DXB drone" },
    { day: "D18", date: "Mar 17", missiles: 15, drones: 20, label: "" },
    { day: "D19", date: "Mar 18", missiles: 20, drones: 30, label: "South Pars" },
    { day: "D20", date: "Mar 19", missiles: 40, drones: 55, label: "54 waves" },
    { day: "D21", date: "Mar 20", missiles: 25, drones: 35, label: "Kuwait hit" },
    { day: "D22", date: "Mar 21", missiles: 30, drones: 40, label: "Dimona hit" },
    { day: "D23", date: "Mar 22", missiles: 25, drones: 35, label: "Ultimatum" },
    { day: "D24", date: "Mar 23", missiles: 20, drones: 30, label: "Strikes paused" },
    { day: "D25", date: "Mar 24", missiles: 22, drones: 32, label: "Isfahan hit" },
    { day: "D26", date: "Mar 25", missiles: 18, drones: 35, label: "Saudi hit" },
    { day: "D27", date: "Mar 26", missiles: 20, drones: 28, label: "Tangsiri killed" },
    { day: "D28", date: "Mar 27", missiles: 18, drones: 25, label: "Nuclear sites" },
    { day: "D29", date: "Mar 28", missiles: 15, drones: 22, label: "" },
    { day: "D30", date: "Mar 29", missiles: 12, drones: 20, label: "Secret talks" },
    { day: "D31", date: "Mar 30", missiles: 15, drones: 25, label: "New missiles" },
    { day: "D32", date: "Mar 31", missiles: 18, drones: 30, label: "State TV hit" },
    { day: "D33", date: "Apr 1", missiles: 14, drones: 22, label: "Fordow" },
    { day: "D34", date: "Apr 2", missiles: 10, drones: 18, label: "China escorts" },
    { day: "D35", date: "Apr 3", missiles: 50, drones: 40, label: "47 at Israel" },
    { day: "D36", date: "Apr 4", missiles: 20, drones: 35, label: "Cyber war" },
    { day: "D37", date: "Apr 5", missiles: 12, drones: 18, label: "Diplomacy" },
    { day: "D38", date: "Apr 6", missiles: 8, drones: 10, label: "Corridor deal" },
    { day: "D39", date: "Apr 7", missiles: 0, drones: 0, label: "Zero fire (UAE)" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Iranian Attack Intensity
        </h3>
        <div className="flex gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Missiles
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Drones
          </span>
        </div>
      </div>

      <div className="bg-[var(--muted-bg)] rounded-lg p-4 pb-8 overflow-x-auto">
        <div className="flex items-end gap-1 min-w-[550px]" style={{ height: 180 }}>
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-end group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                  {d.date} ({d.day})
                  {d.label && <span className="block text-yellow-300">{d.label}</span>}
                </div>
              </div>
              {/* Stacked bars */}
              <div className="w-full flex flex-col gap-[1px]">
                <div
                  className="w-full bg-red-500 rounded-t-sm"
                  style={{ height: `${d.missiles * 1.2}px` }}
                />
                <div
                  className="w-full bg-orange-400"
                  style={{ height: `${d.drones * 1}px` }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Day labels */}
        <div className="flex gap-1 min-w-[550px] mt-1">
          {days.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[7px] text-[var(--muted)] font-mono">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Relative intensity (not absolute counts). Iran surged to 50+ on Day 35 (largest barrage at Israel).
        Day 38 corridor deal led to sharp drop. Day 39: first zero-fire day for UAE. Strikes continue on Israel.
      </p>
    </div>
  );
}

// ─── UAE Daily Intercepts Chart ─────────────────────────
export function UAEInterceptsChart() {
  const data = [
    { date: "Feb 28", day: "D1", missiles: 50, drones: 200, label: "War begins" },
    { date: "Mar 1", day: "D2", missiles: 35, drones: 160, label: "" },
    { date: "Mar 2", day: "D3", missiles: 28, drones: 140, label: "" },
    { date: "Mar 3", day: "D4", missiles: 20, drones: 130, label: "" },
    { date: "Mar 4", day: "D5", missiles: 3, drones: 129, label: "121 of 129" },
    { date: "Mar 5", day: "D6", missiles: 7, drones: 125, label: "" },
    { date: "Mar 6", day: "D7", missiles: 9, drones: 112, label: "All 9 destroyed" },
    { date: "Mar 7", day: "D8", missiles: 10, drones: 80, label: "Al Dhafra hit" },
    { date: "Mar 8", day: "D9", missiles: 15, drones: 70, label: "3 shelter alerts" },
    { date: "Mar 9", day: "D10", missiles: 12, drones: 50, label: "" },
    { date: "Mar 10", day: "D11", missiles: 9, drones: 35, label: "8 of 9 missiles" },
    { date: "Mar 12", day: "D13", missiles: 8, drones: 28, label: "" },
    { date: "Mar 13", day: "D14", missiles: 7, drones: 27, label: "" },
    { date: "Mar 15", day: "D16", missiles: 9, drones: 33, label: "" },
    { date: "Mar 16", day: "D17", missiles: 6, drones: 21, label: "DXB fuel tank" },
    { date: "Mar 17", day: "D18", missiles: 5, drones: 20, label: "Airspace closed" },
    { date: "Mar 18", day: "D19", missiles: 13, drones: 27, label: "Retaliation surge" },
    { date: "Mar 20", day: "D21", missiles: 4, drones: 26, label: "" },
    { date: "Mar 22", day: "D23", missiles: 4, drones: 25, label: "" },
    { date: "Mar 25", day: "D26", missiles: 3, drones: 18, label: "DXB debris" },
    { date: "Mar 26", day: "D27", missiles: 5, drones: 20, label: "2 killed Abu Dhabi" },
    { date: "Mar 28", day: "D29", missiles: 3, drones: 15, label: "" },
    { date: "Mar 29", day: "D30", missiles: 3, drones: 17, label: "1 killed Ajman" },
    { date: "Mar 30", day: "D31", missiles: 4, drones: 18, label: "Al Dhafra near-miss" },
    { date: "Mar 31", day: "D32", missiles: 5, drones: 22, label: "200+ drones Gulf" },
    { date: "Apr 1", day: "D33", missiles: 3, drones: 14, label: "Sharjah school" },
    { date: "Apr 2", day: "D34", missiles: 2, drones: 10, label: "China escorts" },
    { date: "Apr 3", day: "D35", missiles: 4, drones: 15, label: "Tel Aviv hit" },
    { date: "Apr 4", day: "D36", missiles: 3, drones: 12, label: "Cyber attack" },
    { date: "Apr 5", day: "D37", missiles: 2, drones: 8, label: "Diplomacy" },
    { date: "Apr 6", day: "D38", missiles: 1, drones: 3, label: "Corridor deal" },
    { date: "Apr 7", day: "D39", missiles: 0, drones: 0, label: "Zero fire!" },
  ];

  const maxTotal = 250;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          UAE Daily Intercepts
        </h3>
        <div className="flex gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Missiles
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Drones
          </span>
        </div>
      </div>

      <div className="bg-[var(--muted-bg)] rounded-lg p-4 pb-8 overflow-x-auto">
        <div className="flex items-end gap-[4px] min-w-[600px]" style={{ height: 180 }}>
          {data.map((d, i) => {
            const missileH = (d.missiles / maxTotal) * 180;
            const droneH = (d.drones / maxTotal) * 180;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {d.date}: {d.missiles}m + {d.drones}d
                    {d.label && <span className="block text-yellow-300">{d.label}</span>}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-[1px]">
                  <div
                    className="w-full bg-red-500 rounded-t-sm"
                    style={{ height: `${missileH}px` }}
                  />
                  <div
                    className="w-full bg-orange-400"
                    style={{ height: `${droneH}px` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-[4px] min-w-[600px] mt-1">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[7px] text-[var(--muted)] font-mono">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-red-500/10 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-red-400 font-mono">395</p>
          <p className="text-[10px] text-[var(--muted)]">Ballistic missiles</p>
        </div>
        <div className="bg-orange-500/10 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-orange-400 font-mono">18</p>
          <p className="text-[10px] text-[var(--muted)]">Cruise missiles</p>
        </div>
        <div className="bg-yellow-500/10 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-yellow-400 font-mono">2,050</p>
          <p className="text-[10px] text-[var(--muted)]">Drones (UAVs)</p>
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Source: UAE Ministry of Defence. Totals as of Apr 7. 12 killed, 185 injured (31 nationalities).
        Day 39: first day with zero incoming fire. Corridor deal (Apr 6) appears to be holding.
        Intercept debris was a significant civilian hazard — Sharjah school hit Apr 1, 5 children injured.
      </p>
    </div>
  );
}

// ─── Hormuz Shipping Traffic Chart ──────────────────────
export function HormuzShippingChart() {
  const data = [
    { date: "Pre-war", vessels: 138, label: "Normal traffic" },
    { date: "Feb 28", vessels: 45, label: "War begins" },
    { date: "Mar 1", vessels: 8, label: "Near collapse" },
    { date: "Mar 2", vessels: 3, label: "" },
    { date: "Mar 3", vessels: 2, label: "Mines laid" },
    { date: "Mar 5", vessels: 2, label: "" },
    { date: "Mar 7", vessels: 1, label: "1 vessel" },
    { date: "Mar 9", vessels: 3, label: "" },
    { date: "Mar 11", vessels: 5, label: "US clears mines" },
    { date: "Mar 13", vessels: 7, label: "" },
    { date: "Mar 15", vessels: 8, label: "Permission transits" },
    { date: "Mar 17", vessels: 10, label: "" },
    { date: "Mar 19", vessels: 12, label: "Trickle resumes" },
    { date: "Mar 22", vessels: 15, label: "Ultimatum issued" },
    { date: "Mar 25", vessels: 18, label: "5 nations allowed" },
    { date: "Mar 27", vessels: 14, label: "Navy chief killed" },
    { date: "Mar 28", vessels: 12, label: "" },
    { date: "Mar 30", vessels: 10, label: "" },
    { date: "Apr 1", vessels: 8, label: "Fordow struck" },
    { date: "Apr 2", vessels: 12, label: "China convoy" },
    { date: "Apr 4", vessels: 10, label: "Cyber war" },
    { date: "Apr 6", vessels: 15, label: "Corridor deal!" },
    { date: "Apr 7", vessels: 15, label: "Holding" },
  ];

  const maxVessels = 150;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Strait of Hormuz — Daily Vessel Transits
        </h3>
        <span className="text-xs text-red-400 font-mono">-89%</span>
      </div>

      <div className="relative bg-[var(--muted-bg)] rounded-lg p-4 pt-6 pb-8 overflow-x-auto">
        <div className="flex items-end gap-[6px] min-w-[500px]" style={{ height: 160 }}>
          {data.map((d, i) => {
            const barHeight = (d.vessels / maxVessels) * 160;
            const isNormal = d.vessels > 50;
            const isDanger = d.vessels < 10;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {d.date}: {d.vessels} vessels/day
                    {d.label && <span className="block text-yellow-300">{d.label}</span>}
                  </div>
                  <div className="w-1.5 h-1.5 bg-black/90 rotate-45 -mt-1" />
                </div>
                <span className="text-[9px] text-[var(--muted)] font-mono mb-1">{d.vessels}</span>
                <div
                  className={`w-full rounded-t-sm ${
                    isNormal ? "bg-green-500" : isDanger ? "bg-red-500" : "bg-orange-400"
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-[6px] min-w-[500px] mt-1">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[8px] text-[var(--muted)] font-mono">
                {d.date.replace("Pre-war", "Pre").replace("Feb ", "2/").replace("Mar ", "3/").replace("Apr ", "4/")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-yellow-500/10 rounded-lg p-3">
          <p className="text-xs text-[var(--muted)]">Current status</p>
          <p className="text-sm font-bold text-yellow-400">Humanitarian corridor</p>
          <p className="text-[10px] text-[var(--muted)]">15-20 vessels/day under Iranian inspection</p>
        </div>
        <div className="bg-yellow-500/10 rounded-lg p-3">
          <p className="text-xs text-[var(--muted)]">China PLA Navy</p>
          <p className="text-sm font-bold text-yellow-400">Escorting tankers</p>
          <p className="text-[10px] text-[var(--muted)]">First direct Chinese military intervention</p>
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Pre-war: ~138 vessels/day. Corridor deal (Apr 6) allows 15-20 inspected vessels/day — no military
        cargo, no US/Israeli-flagged ships. China began escorting its own tankers (Apr 2). IRGC deputy
        warns corridor &ldquo;can close in 60 seconds.&rdquo; Still -89% from normal traffic.
      </p>
    </div>
  );
}

// ─── Energy Infrastructure Attacks Grid ─────────────────
export function EnergyInfrastructureGrid() {
  const facilities = [
    {
      name: "South Pars Gas Field",
      country: "🇮🇷 Iran",
      attacker: "Israel",
      date: "Mar 18",
      status: "red" as const,
      detail: "World's largest gas field. 70% of Iran's gas production disabled.",
      capacity: "~280 bcm/yr gas",
    },
    {
      name: "Kharg Island Terminal",
      country: "🇮🇷 Iran",
      attacker: "US",
      date: "Mar 14",
      status: "red" as const,
      detail: "Iran's main oil export terminal. 15+ explosions. Major disruption.",
      capacity: "~5M bbl/day capacity",
    },
    {
      name: "Asaluyeh Refinery",
      country: "🇮🇷 Iran",
      attacker: "Israel",
      date: "Mar 18",
      status: "red" as const,
      detail: "4 gas treatment plants damaged. Gas flow to Iraq halted.",
      capacity: "Adjacent to South Pars",
    },
    {
      name: "Ras Laffan LNG Terminal",
      country: "🇶🇦 Qatar",
      attacker: "Iran",
      date: "Mar 18",
      status: "red" as const,
      detail: "World's largest LNG terminal. 'Extensive damage'. 3-5yr repairs. 17% global LNG wiped.",
      capacity: "77M tonnes LNG/yr",
    },
    {
      name: "Mina Al-Ahmadi Refinery",
      country: "🇰🇼 Kuwait",
      attacker: "Iran",
      date: "Mar 19–20",
      status: "red" as const,
      detail: "Kuwait's largest refinery hit 2 days in a row. Fires across units. Shut down.",
      capacity: "730K bbl/day",
    },
    {
      name: "Jebel Ali Port",
      country: "🇦🇪 UAE",
      attacker: "Iran",
      date: "Mar 1–4",
      status: "orange" as const,
      detail: "Fire from drone strike. World's largest man-made harbour.",
      capacity: "Major logistics hub",
    },
    {
      name: "DXB Airport Fuel Tank",
      country: "🇦🇪 UAE",
      attacker: "Iran",
      date: "Mar 16",
      status: "orange" as const,
      detail: "Drone ignited fuel storage. Flights disrupted for hours.",
      capacity: "World's busiest intl. airport",
    },
    {
      name: "Bahrain Desalination",
      country: "🇧🇭 Bahrain",
      attacker: "Iran",
      date: "Mar 8",
      status: "orange" as const,
      detail: "Critical water infrastructure hit. Supply disruptions.",
      capacity: "Water supply",
    },
    {
      name: "Fordow Enrichment Facility",
      country: "🇮🇷 Iran",
      attacker: "US/Israel",
      date: "Apr 1",
      status: "red" as const,
      detail: "Underground facility hit with GBU-57 bunker busters. IAEA: 'concerning' radiation near Natanz.",
      capacity: "Underground nuclear",
    },
    {
      name: "Iran State TV (IRIB)",
      country: "🇮🇷 Iran",
      attacker: "Israel",
      date: "Mar 31",
      status: "red" as const,
      detail: "Tehran headquarters struck. 22 journalists killed. Global condemnation.",
      capacity: "State media HQ",
    },
    {
      name: "Iran Banking System",
      country: "🇮🇷 Iran",
      attacker: "Israel/NSA",
      date: "Apr 4",
      status: "red" as const,
      detail: "Entire banking system taken offline by cyber attack. Partial restoration underway.",
      capacity: "Financial infrastructure",
    },
  ];

  const statusColors = {
    red: "border-red-500/30 bg-red-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Energy & Critical Infrastructure Hit
      </h3>
      <p className="text-[10px] text-[var(--muted)]">
        Energy war expanded to nuclear facilities (Fordow, Day 33) and cyber attacks on banking
        systems (Day 36). QatarEnergy: Ras Laffan repairs could take 10-20 years. Iran state TV HQ struck.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {facilities.map((f, i) => (
          <div
            key={i}
            className={`border rounded-lg p-3 ${statusColors[f.status]}`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    f.status === "red" ? "bg-red-500" : "bg-orange-500"
                  }`}
                />
                <span className="text-xs font-bold">{f.name}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--muted)]">{f.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[var(--muted)]">{f.country} — struck by {f.attacker}</span>
              <span className="text-[10px] text-[var(--muted)]">{f.capacity}</span>
            </div>
            <p className="text-[11px] mt-1">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Regional Casualty Timeline ─────────────────────────
export function RegionalCasualtyChart() {
  const data = [
    { date: "Feb 28", day: "D1", iran: 120, lebanon: 0, israel: 2, uae: 0, us: 0, other: 0 },
    { date: "Mar 2", day: "D3", iran: 350, lebanon: 50, israel: 5, uae: 4, us: 6, other: 10 },
    { date: "Mar 5", day: "D6", iran: 600, lebanon: 150, israel: 8, uae: 6, us: 7, other: 20 },
    { date: "Mar 8", day: "D9", iran: 900, lebanon: 350, israel: 10, uae: 7, us: 7, other: 30 },
    { date: "Mar 10", day: "D11", iran: 1200, lebanon: 500, israel: 12, uae: 8, us: 13, other: 40 },
    { date: "Mar 13", day: "D14", iran: 1800, lebanon: 700, israel: 14, uae: 8, us: 13, other: 50 },
    { date: "Mar 17", day: "D18", iran: 3100, lebanon: 850, israel: 16, uae: 8, us: 13, other: 60 },
    { date: "Mar 20", day: "D21", iran: 4200, lebanon: 1000, israel: 18, uae: 8, us: 13, other: 70 },
    { date: "Mar 22", day: "D23", iran: 4800, lebanon: 1050, israel: 18, uae: 8, us: 13, other: 75 },
    { date: "Mar 25", day: "D26", iran: 5100, lebanon: 1072, israel: 18, uae: 11, us: 13, other: 85 },
    { date: "Mar 28", day: "D29", iran: 5500, lebanon: 1116, israel: 22, uae: 11, us: 13, other: 95 },
    { date: "Mar 31", day: "D32", iran: 6100, lebanon: 1180, israel: 24, uae: 12, us: 14, other: 110 },
    { date: "Apr 3", day: "D35", iran: 6500, lebanon: 1220, israel: 34, uae: 12, us: 14, other: 120 },
    { date: "Apr 7", day: "D39", iran: 6800, lebanon: 1250, israel: 34, uae: 12, us: 14, other: 130 },
  ];

  const maxTotal = 9000;

  const colors = [
    { key: "iran", label: "Iran", color: "bg-red-500" },
    { key: "lebanon", label: "Lebanon", color: "bg-orange-500" },
    { key: "israel", label: "Israel", color: "bg-blue-400" },
    { key: "uae", label: "UAE", color: "bg-yellow-400" },
    { key: "us", label: "US troops", color: "bg-purple-400" },
    { key: "other", label: "Other", color: "bg-gray-400" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Regional Death Toll Over Time
        </h3>
        <span className="text-xs text-red-400 font-mono">8,500+ total</span>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px]">
        {colors.map((c) => (
          <span key={c.key} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${c.color}`} />
            {c.label}
          </span>
        ))}
      </div>

      <div className="bg-[var(--muted-bg)] rounded-lg p-4 pb-8 overflow-x-auto">
        <div className="flex items-end gap-[6px] min-w-[500px]" style={{ height: 200 }}>
          {data.map((d, i) => {
            const total =
              d.iran + d.lebanon + d.israel + d.uae + d.us + d.other;
            const iranH = (d.iran / maxTotal) * 200;
            const lebH = (d.lebanon / maxTotal) * 200;
            const restH = ((d.israel + d.uae + d.us + d.other) / maxTotal) * 200;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    <span className="font-semibold">{d.date} ({d.day})</span>
                    <span className="block">Iran: {d.iran.toLocaleString()}</span>
                    <span className="block">Lebanon: {d.lebanon.toLocaleString()}</span>
                    <span className="block">Total: {total.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-[9px] text-[var(--muted)] font-mono mb-1">
                  {total >= 1000
                    ? `${(total / 1000).toFixed(1)}k`
                    : total}
                </span>
                <div className="w-full flex flex-col gap-[1px]">
                  <div className="w-full bg-red-500 rounded-t-sm" style={{ height: `${iranH}px` }} />
                  <div className="w-full bg-orange-500" style={{ height: `${lebH}px` }} />
                  <div className="w-full bg-blue-400/60 rounded-b-sm" style={{ height: `${restH}px` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-[6px] min-w-[500px] mt-1">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[8px] text-[var(--muted)] font-mono">
                {d.date.replace("Feb ", "2/").replace("Mar ", "3/").replace("Apr ", "4/")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Iran accounts for ~80% of deaths. WaPo: ~4,500 civilians killed as of Apr 7. Lebanon: 1,250+ killed,
        3,800+ injured (145 children, 52 health workers). Israel: 34 killed (12 in Day 35 Tel Aviv barrage).
        ~500 children killed across region. Kuwait: 11 killed. Saudi: 4 killed. Bahrain: 3 killed.
      </p>
    </div>
  );
}

// ─── Global Markets Timeline ────────────────────────────
export function GlobalMarketsTimeline() {
  const weeks = [
    { label: "Pre-war", date: "Feb 27" },
    { label: "Week 1", date: "Mar 7" },
    { label: "Week 2", date: "Mar 14" },
    { label: "Week 3", date: "Mar 22" },
    { label: "Week 4", date: "Mar 28" },
    { label: "Week 5", date: "Apr 4" },
    { label: "Week 6", date: "Apr 7" },
  ];

  const markets = [
    {
      name: "S&P 500",
      flag: "🇺🇸",
      values: [5950, 5740, 5690, 5590, 5520, 5480, 5680],
      color: "bg-blue-400",
      lineColor: "text-blue-400",
    },
    {
      name: "DFM (Dubai)",
      flag: "🇦🇪",
      values: [5200, 4700, 4300, 4100, 3950, 3800, 4420],
      color: "bg-red-500",
      lineColor: "text-red-400",
    },
    {
      name: "Nifty 50",
      flag: "🇮🇳",
      values: [23100, 22400, 21600, 21250, 20800, 20500, 21600],
      color: "bg-orange-400",
      lineColor: "text-orange-400",
    },
    {
      name: "Nikkei 225",
      flag: "🇯🇵",
      values: [38800, 37500, 36200, 34500, 33800, 33200, 35300],
      color: "bg-purple-400",
      lineColor: "text-purple-400",
    },
    {
      name: "STOXX 600",
      flag: "🇪🇺",
      values: [560, 540, 530, 526, 518, 510, 521],
      color: "bg-green-400",
      lineColor: "text-green-400",
    },
    {
      name: "KOSPI",
      flag: "🇰🇷",
      values: [2650, 2550, 2480, 2490, 2430, 2380, 2465],
      color: "bg-cyan-400",
      lineColor: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Global Markets Since War Began
        </h3>
        <span className="text-xs text-red-400 font-mono">Feb 28 → Apr 7</span>
      </div>

      <div className="space-y-2">
        {markets.map((m, i) => {
          const start = m.values[0];
          const current = m.values[m.values.length - 1];
          const change = ((current - start) / start) * 100;
          const maxVal = Math.max(...m.values);
          const minVal = Math.min(...m.values);
          const range = maxVal - minVal || 1;

          return (
            <div key={i} className="bg-[var(--muted-bg)] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{m.flag}</span>
                <span className="text-xs font-semibold flex-1">{m.name}</span>
                <span className={`text-xs font-bold font-mono ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                </span>
              </div>
              {/* Sparkline */}
              <div className="flex items-end gap-1 h-8">
                {m.values.map((v, j) => {
                  const h = ((v - minVal) / range) * 28 + 4;
                  return (
                    <div key={j} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full rounded-sm ${m.color} ${j === m.values.length - 1 ? "opacity-100" : "opacity-50"}`}
                        style={{ height: `${h}px` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-1 mt-1">
                {weeks.map((w, j) => (
                  <div key={j} className="flex-1 text-center">
                    <span className="text-[7px] text-[var(--muted)] font-mono">{w.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
        <p className="text-[11px]">
          <strong>Key pattern:</strong> Corridor deal (Apr 6) triggered sharp rally across all markets.
          DFM surged +8% on corridor day, recovering from -21% low. US markets (-4.5%) outperforming.
          Asia still hardest hit (Nikkei -9%). Corridor fragility keeping gains capped.
          Cyber war on banking systems adding new uncertainty layer.
        </p>
      </div>
    </div>
  );
}

// ─── Historical Oil Crisis Comparison ───────────────────
export function HistoricalCrisisComparison() {
  const crises = [
    {
      name: "1973 Arab Oil Embargo",
      year: "1973–74",
      trigger: "OAPEC embargo after Yom Kippur War",
      oilBefore: "$3",
      oilPeak: "$12",
      oilChange: "+300%",
      spDrop: "-48%",
      recoveryTime: "6 years (nominal), 20 years (real)",
      duration: "6 months",
      hormuz: "Open",
      supplyLost: "~7%",
      color: "red" as const,
    },
    {
      name: "1979 Iranian Revolution",
      year: "1979–80",
      trigger: "Shah overthrown, Iran-Iraq tensions",
      oilBefore: "$14",
      oilPeak: "$39",
      oilChange: "+179%",
      spDrop: "-17%",
      recoveryTime: "~2 years",
      duration: "12 months",
      hormuz: "Threatened",
      supplyLost: "~7%",
      color: "red" as const,
    },
    {
      name: "1990 Gulf War",
      year: "1990–91",
      trigger: "Iraq invades Kuwait",
      oilBefore: "$17",
      oilPeak: "$42",
      oilChange: "+135%",
      spDrop: "-16%",
      recoveryTime: "~6 months",
      duration: "3 months",
      hormuz: "Open",
      supplyLost: "~9%",
      color: "orange" as const,
    },
    {
      name: "2022 Russia-Ukraine",
      year: "2022",
      trigger: "Russian invasion, sanctions",
      oilBefore: "$76",
      oilPeak: "$128",
      oilChange: "+68%",
      spDrop: "-7%",
      recoveryTime: "~9 months",
      duration: "6 months (oil spike)",
      hormuz: "Open",
      supplyLost: "~3%",
      color: "yellow" as const,
    },
    {
      name: "2026 Iran War",
      year: "2026",
      trigger: "US-Israel strike Iran, Hormuz corridor",
      oilBefore: "$70",
      oilPeak: "$119",
      oilChange: "+39% (corridor open)",
      spDrop: "-4.5% (recovering)",
      recoveryTime: "TBD",
      duration: "39 days (ongoing)",
      hormuz: "CORRIDOR",
      supplyLost: "~15% (was 20%)",
      color: "red" as const,
    },
  ];

  const colorMap = {
    red: "border-red-500/30 bg-red-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Lessons From History: Oil Crises Compared
      </h3>
      <p className="text-[10px] text-[var(--muted)]">
        The 2026 Iran war is the first major oil crisis with the Strait of Hormuz closed (now partially
        reopened via humanitarian corridor). IEA calls it the &ldquo;greatest global energy and food security challenge in history.&rdquo;
      </p>

      {/* Comparison cards */}
      <div className="space-y-2">
        {crises.map((c, i) => (
          <div
            key={i}
            className={`border rounded-lg p-3 ${colorMap[c.color]} ${
              c.year === "2026" ? "ring-1 ring-red-500/50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold">{c.name}</span>
                <span className="text-[10px] text-[var(--muted)] ml-2">{c.year}</span>
              </div>
              {c.year === "2026" && (
                <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase">
                  Current
                </span>
              )}
            </div>
            <p className="text-[10px] text-[var(--muted)] mb-2">{c.trigger}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <div>
                <p className="text-[9px] text-[var(--muted)]">Oil</p>
                <p className="text-[11px] font-mono font-semibold">{c.oilChange}</p>
                <p className="text-[9px] text-[var(--muted)]">{c.oilBefore}→{c.oilPeak}</p>
              </div>
              <div>
                <p className="text-[9px] text-[var(--muted)]">S&P 500</p>
                <p className="text-[11px] font-mono font-semibold text-red-400">{c.spDrop}</p>
              </div>
              <div>
                <p className="text-[9px] text-[var(--muted)]">Recovery</p>
                <p className="text-[11px] font-mono font-semibold">{c.recoveryTime}</p>
              </div>
              <div>
                <p className="text-[9px] text-[var(--muted)]">Duration</p>
                <p className="text-[11px] font-mono font-semibold">{c.duration}</p>
              </div>
              <div>
                <p className="text-[9px] text-[var(--muted)]">Hormuz</p>
                <p className={`text-[11px] font-mono font-semibold ${c.hormuz === "CLOSED" ? "text-red-400" : c.hormuz === "CORRIDOR" ? "text-yellow-400" : "text-green-400"}`}>
                  {c.hormuz}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-[var(--muted)]">Supply lost</p>
                <p className="text-[11px] font-mono font-semibold">{c.supplyLost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key takeaways */}
      <div className="bg-[var(--muted-bg)] rounded-lg p-4 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider">What History Tells Us</h4>
        <ul className="space-y-2 text-[11px] text-[var(--muted)]">
          <li className="flex gap-2">
            <span className="text-yellow-400 flex-shrink-0">1.</span>
            <span>
              <strong>Short wars = fast recovery.</strong> The 1990 Gulf War ended in 3 months —
              S&P rebounded 26-29% the following year. The 2022 oil spike faded in ~6 months.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 flex-shrink-0">2.</span>
            <span>
              <strong>Prolonged shocks = stagflation risk.</strong> 1973 lasted 6 months and led
              to a 20-year bear market in real terms. Duration matters more than peak price.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 flex-shrink-0">3.</span>
            <span>
              <strong>2026 is unprecedented.</strong> First time Hormuz was fully closed (20% of
              global supply). Humanitarian corridor now open but fragile — only 15 vessels/day
              vs 138 pre-war. China&apos;s military escort adds new geopolitical dimension.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 flex-shrink-0">4.</span>
            <span>
              <strong>US more insulated than before.</strong> US is now a net oil exporter (unlike
              1973). Households spend 3% of income on energy vs 8-9% in the 1970s. But Asia and
              Europe face much higher exposure.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 flex-shrink-0">5.</span>
            <span>
              <strong>Average 12-month return after crises: +8%.</strong> Historically, markets
              recover to long-run trends within a year — but only after the shock ends.
              The corridor&apos;s survival is the key variable this time — and cyber war adds a new front.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
