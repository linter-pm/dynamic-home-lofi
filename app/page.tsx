'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Sparkles,
  ChevronRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Menu,
  BarChart3,
  Eye,
  Send,
  Calendar,
  DollarSign,
  FileText,
  Home,
  CheckCircle2,
} from 'lucide-react';

/* ── Week options and types ────────────────────────────────── */

const WEEK_OPTIONS = [1, 3, 12] as const;
type WeekOption = (typeof WEEK_OPTIONS)[number];

/* ── Week-sensitive data ─────────────────────────────────── */

const weekSubtitles: Record<WeekOption, string> = {
  1: 'Welcome to your new role. Your first meeting is Thursday.',
  3: 'Budget season is here. Your committee work starts now.',
  12: 'Quarter one complete. Your priorities are gaining traction.',
};

const weekGlance: Record<WeekOption, { heading: string; body: string }> = {
  1: {
    heading: 'Your first week on Council',
    body: 'You represent 12,400 constituents in District 5. Your first City Council meeting is this Thursday at 6 PM. Three agenda items need your attention, including the proposed FY2027 budget timeline. Your colleagues have been serving an average of 4.2 years, so lean on their experience as you get settled.',
  },
  3: {
    heading: 'Committee season is underway',
    body: 'Your Housing and Transportation committees have active decisions. Key votes coming in the next few weeks.',
  },
  12: {
    heading: 'Quarter one in the books',
    body: 'Over the past quarter you participated in 11 Council meetings and responded to 84 constituent inquiries. Your affordable housing poll received the highest response rate in the district\'s history. The budget committee meets next Tuesday to finalize capital improvement priorities.',
  },
};

const weekProgress: Record<WeekOption, { day: number; total: number }> = {
  1: { day: 3, total: 90 },
  3: { day: 15, total: 90 },
  12: { day: 84, total: 90 },
};

/* ── Focus card data ─────────────────────────────────────── */

interface FocusCardData {
  badge: string;
  badgeVariant: 'red' | 'green' | 'amber' | 'blue';
  badgeIcon: 'calendar' | 'trending' | 'dollar' | 'file';
  title: string;
  description: string;
}

const badgeStyles: Record<string, string> = {
  red: 'bg-[#FEF2F2] text-[#E00C30] border border-[#FECACA]',
  green: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  amber: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
  blue: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
};

function BadgeIcon({ type, className }: { type: string; className?: string }) {
  const cn = className || 'w-3 h-3';
  switch (type) {
    case 'calendar': return <Calendar className={cn} />;
    case 'trending': return <TrendingUp className={cn} />;
    case 'dollar': return <DollarSign className={cn} />;
    case 'file': return <FileText className={cn} />;
    default: return null;
  }
}

const weekFocus: Record<WeekOption, FocusCardData[]> = {
  1: [
    {
      badge: 'Meeting in 5 days',
      badgeVariant: 'red',
      badgeIcon: 'calendar',
      title: 'Prepare for your first Council meeting',
      description: 'Review the agenda packet and learn the procedures. Robert\'s Rules of Order govern how motions are made and voted on.',
    },
    {
      badge: 'Getting started',
      badgeVariant: 'green',
      badgeIcon: 'trending',
      title: 'Meet your fellow Council members',
      description: 'Six colleagues serve alongside you. Building relationships early will help you find allies on shared priorities.',
    },
    {
      badge: 'Setup required',
      badgeVariant: 'blue',
      badgeIcon: 'file',
      title: 'Set up your constituent communication',
      description: 'Connect your contact list so you can reach District 5 residents when it matters.',
    },
    {
      badge: 'Orientation',
      badgeVariant: 'amber',
      badgeIcon: 'file',
      title: 'Complete your governance orientation',
      description: 'A personalized walkthrough of Charlotte\'s government structure, budget process, and your role on Council.',
    },
  ],
  3: [
    {
      badge: 'Meeting in 3 days',
      badgeVariant: 'red',
      badgeIcon: 'calendar',
      title: 'Eastside Corridor zoning variance',
      description: 'The Planning Commission recommended approval 4-1. Review the staff report and decide your position before Monday.',
    },
    {
      badge: 'Top concern',
      badgeVariant: 'green',
      badgeIcon: 'trending',
      title: 'Affordable housing feedback summary',
      description: '68% of respondents support increasing the housing trust fund. Draft talking points are ready for your review.',
    },
    {
      badge: 'Budget deadline',
      badgeVariant: 'amber',
      badgeIcon: 'dollar',
      title: 'FY2027 capital improvement requests',
      description: 'Submit your district priority list by Friday. Road resurfacing and park lighting are the top two from your constituents.',
    },
    {
      badge: 'Active legislation',
      badgeVariant: 'blue',
      badgeIcon: 'file',
      title: 'Short-term rental ordinance update',
      description: 'Second reading scheduled for next month. Three Council members have co-sponsored your proposed amendment.',
    },
  ],
  12: [
    {
      badge: 'Meeting Tuesday',
      badgeVariant: 'red',
      badgeIcon: 'calendar',
      title: 'Budget committee: capital priorities',
      description: 'Final vote on the $42M capital improvement plan. Your district secured $3.2M for road infrastructure.',
    },
    {
      badge: 'Constituent win',
      badgeVariant: 'green',
      badgeIcon: 'trending',
      title: 'Affordable housing trust fund approved',
      description: 'The $5M annual allocation passed 7-2. Share the results with your constituents and credit their input.',
    },
    {
      badge: 'Upcoming vote',
      badgeVariant: 'amber',
      badgeIcon: 'dollar',
      title: 'Transit expansion study authorization',
      description: 'Staff requests $200K for a feasibility study. Three districts would benefit, including yours.',
    },
    {
      badge: 'Q1 report',
      badgeVariant: 'blue',
      badgeIcon: 'file',
      title: 'Quarterly constituent engagement report',
      description: 'Your response rate is 22% above the district average. Review the full report and share highlights.',
    },
  ],
};

/* ── District priorities ─────────────────────────────────── */

const districtPriorities: Record<
  WeekOption,
  Array<{ rank: number; name: string; score: number; trend: 'up' | 'down' | 'flat' }>
> = {
  1: [
    { rank: 1, name: 'Road Infrastructure', score: 72.1, trend: 'flat' },
    { rank: 2, name: 'Affordable Housing', score: 66.4, trend: 'up' },
    { rank: 3, name: 'Public Safety', score: 54.8, trend: 'flat' },
    { rank: 4, name: 'Park Improvements', score: 48.3, trend: 'down' },
    { rank: 5, name: 'Transit Access', score: 41.7, trend: 'up' },
  ],
  3: [
    { rank: 1, name: 'Affordable Housing', score: 66.4, trend: 'up' },
    { rank: 2, name: 'Road Infrastructure', score: 58.2, trend: 'down' },
    { rank: 3, name: 'Public Safety', score: 52.1, trend: 'flat' },
    { rank: 4, name: 'Park Improvements', score: 47.8, trend: 'up' },
    { rank: 5, name: 'Transit Access', score: 39.5, trend: 'down' },
  ],
  12: [
    { rank: 1, name: 'Affordable Housing', score: 71.2, trend: 'up' },
    { rank: 2, name: 'Road Infrastructure', score: 63.4, trend: 'up' },
    { rank: 3, name: 'Transit Access', score: 55.9, trend: 'up' },
    { rank: 4, name: 'Public Safety', score: 50.1, trend: 'down' },
    { rank: 5, name: 'Park Improvements', score: 44.6, trend: 'flat' },
  ],
};

/* ── Role 101 data ───────────────────────────────────────── */

const role101: Record<
  WeekOption,
  { progress: number; items: Array<{ label: string; done: boolean }> }
> = {
  1: {
    progress: 10,
    items: [
      { label: 'Review Council rules of procedure', done: false },
      { label: 'Learn Robert\'s Rules of Order basics', done: false },
      { label: 'Understand the budget calendar', done: false },
      { label: 'Set up constituent communication', done: false },
      { label: 'Meet your district liaison', done: true },
    ],
  },
  3: {
    progress: 40,
    items: [
      { label: 'Review Council rules of procedure', done: true },
      { label: 'Learn Robert\'s Rules of Order basics', done: true },
      { label: 'Understand the budget calendar', done: false },
      { label: 'Set up constituent communication', done: false },
      { label: 'Meet your district liaison', done: false },
    ],
  },
  12: {
    progress: 80,
    items: [
      { label: 'Review Council rules of procedure', done: true },
      { label: 'Learn Robert\'s Rules of Order basics', done: true },
      { label: 'Understand the budget calendar', done: true },
      { label: 'Set up constituent communication', done: true },
      { label: 'Meet your district liaison', done: false },
    ],
  },
};

/* ── Trend icon helper ───────────────────────────────────── */

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-[#059669]" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-[#E00C30]" />;
  return <Minus className="w-4 h-4 text-gp-text-muted" />;
}

/* ── Page ─────────────────────────────────────────────────── */

export default function HomePage() {
  const [activeWeek, setActiveWeek] = useState<WeekOption>(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const glance = weekGlance[activeWeek];
  const focus = weekFocus[activeWeek];
  const priorities = districtPriorities[activeWeek];
  const roleData = role101[activeWeek];
  const progress = weekProgress[activeWeek];
  const progressPct = Math.round((progress.day / progress.total) * 100);

  // Poll data only shows in week 3+
  const showPoll = activeWeek >= 3;
  const pollResponses = activeWeek === 3 ? 127 : 412;
  const pollTotal = 500;
  const pollDaysLeft = activeWeek === 3 ? 4 : 1;

  return (
    <div className="min-h-screen bg-gp-bg-subtle">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area, offset by sidebar width on desktop */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gp-border h-14">
          <div className="flex items-center gap-3 px-4 lg:px-6 h-full">
            {/* Hamburger, mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gp-bg-subtle transition-colors text-gp-text-secondary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm text-gp-text font-medium">Dashboard</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-[640px] mx-auto space-y-8">

            {/* ── Section 1: Greeting Header ──────────────── */}
            <div>
              <h1 className="font-outfit font-bold text-[28px] lg:text-[32px] text-gp-text leading-tight">
                Good morning, Dimple
              </h1>
              <p className="text-sm text-gp-text-secondary mt-1.5">
                Week {activeWeek} &mdash; {weekSubtitles[activeWeek]}
              </p>

              {/* Week selector pills */}
              <div className="flex items-center gap-2 mt-4">
                {WEEK_OPTIONS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setActiveWeek(w)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${
                        activeWeek === w
                          ? 'bg-midnight-900 text-white'
                          : 'text-gp-text-secondary hover:text-gp-text hover:bg-[#EEF3F6]'
                      }
                    `}
                  >
                    Week {w}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 1b: Day Progress ─────────────────── */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gp-text-secondary whitespace-nowrap">
                Day {progress.day} of {progress.total}
              </span>
              <div className="flex-1 h-2 bg-[#EEF3F6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gp-blue rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-sm text-gp-text-muted tabular-nums">
                {progressPct}%
              </span>
            </div>

            {/* ── Section 2: Week at a Glance (amber banner) ─ */}
            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]/40 border border-[#FDE68A] rounded-2xl p-5 lg:p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FDE68A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#92400E]" />
                </div>
                <div>
                  <h2 className="font-outfit font-semibold text-base text-gp-text mb-1">
                    {glance.heading}
                  </h2>
                  <p className="text-sm text-gp-text-secondary leading-relaxed">
                    {glance.body}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Section 3: This Week's Focus ────────────── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[12px] font-bold text-gp-text-secondary uppercase tracking-wider">
                  This Week&rsquo;s Focus
                </h2>
                {activeWeek >= 3 && (
                  <span className="text-sm font-medium text-gp-blue">
                    Vote coming
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {focus.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gp-border rounded-2xl p-5 hover:shadow-card-hover transition-shadow"
                  >
                    {/* Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-0.5 mb-3 ${badgeStyles[item.badgeVariant]}`}
                    >
                      <BadgeIcon type={item.badgeIcon} />
                      {item.badge}
                    </span>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gp-text leading-snug mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gp-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gp-text-muted flex-shrink-0 mt-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 4: Active Poll (conditional) ────── */}
            {showPoll && (
              <div className="bg-midnight-900 rounded-2xl p-5 lg:p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-[#DBEAFE]" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Your Affordable Housing Priorities poll is active
                  </h3>
                </div>

                {/* Segmented progress bar */}
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden flex mb-3">
                  <div
                    className="bg-[#FF9800] h-full rounded-l-full"
                    style={{ width: '11%' }}
                  />
                  <div
                    className="bg-[#30A541] h-full"
                    style={{ width: '9%' }}
                  />
                  <div
                    className="bg-gp-blue h-full rounded-r-full"
                    style={{ width: `${(pollResponses / pollTotal) * 100 - 20}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">
                    <span className="text-white font-semibold">{pollResponses}</span> of {pollTotal} responses
                  </span>
                  <span className="flex items-center gap-1.5 text-white/70">
                    <Clock className="w-3.5 h-3.5" />
                    {pollDaysLeft} day{pollDaysLeft !== 1 ? 's' : ''} left
                  </span>
                </div>
              </div>
            )}

            {/* ── Section 5: District at a Glance ─────────── */}
            <div>
              <h2 className="text-[12px] font-bold text-gp-text-secondary uppercase tracking-wider mb-4">
                Your District at a Glance
              </h2>
              <div className="bg-white border border-gp-border rounded-2xl divide-y divide-gp-border-light">
                {priorities.map((p) => (
                  <div
                    key={p.rank}
                    className="flex items-center gap-4 px-5 py-3.5"
                  >
                    <span className="text-sm font-bold text-gp-text-muted w-6 text-center">
                      #{p.rank}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gp-text">
                      {p.name}
                    </span>
                    <span className="text-sm font-semibold text-gp-text tabular-nums">
                      {p.score}
                    </span>
                    <TrendIcon trend={p.trend} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 6: Quick Actions ─────────────────── */}
            <div>
              <h2 className="text-[12px] font-bold text-gp-text-secondary uppercase tracking-wider mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: 'Poll your district',
                    iconBg: 'bg-gp-blue',
                    icon: <BarChart3 className="w-5 h-5 text-white" />,
                  },
                  {
                    label: 'View results',
                    iconBg: 'bg-[#059669]',
                    icon: <Eye className="w-5 h-5 text-white" />,
                  },
                  {
                    label: 'Send update',
                    iconBg: 'bg-[#FF9800]',
                    icon: <Send className="w-5 h-5 text-white" />,
                  },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="bg-white border border-gp-border rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-card-hover transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 ${action.iconBg} rounded-full flex items-center justify-center mb-3`}
                    >
                      {action.icon}
                    </div>
                    <p className="text-sm font-medium text-gp-text">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 7: Role 101 Checklist ────────────── */}
            <div className="bg-midnight-900 rounded-2xl p-5 lg:p-6 text-white">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-[18px] h-[18px] text-[#DBEAFE]" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-semibold text-base text-white leading-tight">
                      Your Role 101
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Charlotte City Council Member
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-white/70">
                  {roleData.progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden mt-4 mb-5">
                <div
                  className="bg-gp-blue h-full rounded-full transition-all duration-500"
                  style={{ width: `${roleData.progress}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                {roleData.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-[#30A541] flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        item.done
                          ? 'text-white/50 line-through'
                          : 'text-white/90'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
