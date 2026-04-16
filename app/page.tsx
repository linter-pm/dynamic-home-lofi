'use client';

import { useState } from 'react';
import { Card, Badge, Button, ProgressBar, cn } from '@goodparty/serve-ui';
import { DarkSidebar } from '@/components/DarkSidebar';
import {
  Home,
  BarChart3,
  MessageCircle,
  User,
  Sparkles,
  ChevronRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Menu,
  X,
} from 'lucide-react';

const WEEK_OPTIONS = [1, 3, 12] as const;
type WeekOption = (typeof WEEK_OPTIONS)[number];

const navItems = [
  { label: 'Home', icon: <Home size={20} />, active: true },
  { label: 'Polls', icon: <BarChart3 size={20} /> },
  { label: 'Chat', icon: <MessageCircle size={20} /> },
  { label: 'Profile', icon: <User size={20} /> },
];

/* ── Week-sensitive data ─────────────────────────────────── */

const weekGlance: Record<WeekOption, { subtitle: string; body: string }> = {
  1: {
    subtitle: "Week 1 — welcome to your new role.",
    body: "You represent 12,400 constituents in District 5. Your first City Council meeting is this Thursday at 6 PM. Three agenda items need your attention, including the proposed FY2027 budget timeline. Your colleagues have been serving an average of 4.2 years, so don't hesitate to lean on their experience.",
  },
  3: {
    subtitle: "Week 3 — you're finding your footing.",
    body: "You represent 12,400 constituents in District 5. Based on recent constituent outreach, affordable housing and road infrastructure are the top concerns. Your next Council meeting is Monday, with 6 items on the agenda including a zoning variance for the Eastside Corridor. Council Member Rivera has signaled support for your amendment.",
  },
  12: {
    subtitle: "Week 12 — you're hitting your stride.",
    body: "You represent 12,400 constituents in District 5. Over the past quarter you've participated in 11 Council meetings and responded to 84 constituent inquiries. Your affordable housing poll received the highest response rate in the district's history. The budget committee meets next Tuesday to finalize capital improvement priorities.",
  },
};

const weekFocus: Record<
  WeekOption,
  Array<{
    badge: string;
    badgeVariant: 'orange' | 'green' | 'blue' | 'purple';
    title: string;
    description: string;
  }>
> = {
  1: [
    {
      badge: 'Meeting in 5 days',
      badgeVariant: 'orange',
      title: 'Prepare for your first Council meeting',
      description:
        'Review the agenda packet and learn the procedures. Robert\'s Rules of Order govern how motions are made and voted on.',
    },
    {
      badge: 'Getting started',
      badgeVariant: 'green',
      title: 'Meet your fellow Council members',
      description:
        'Six colleagues serve alongside you. Building relationships early will help you find allies on shared priorities.',
    },
    {
      badge: 'Setup required',
      badgeVariant: 'blue',
      title: 'Set up your constituent communication',
      description:
        'Connect your contact list so you can reach District 5 residents when it matters.',
    },
    {
      badge: 'Orientation',
      badgeVariant: 'purple',
      title: 'Complete your governance orientation',
      description:
        'A personalized walkthrough of Charlotte\'s government structure, budget process, and your role on Council.',
    },
  ],
  3: [
    {
      badge: 'Meeting in 3 days',
      badgeVariant: 'orange',
      title: 'Eastside Corridor zoning variance',
      description:
        'The Planning Commission recommended approval 4-1. Review the staff report and decide your position before Monday.',
    },
    {
      badge: 'Top concern',
      badgeVariant: 'green',
      title: 'Affordable housing feedback summary',
      description:
        '68% of respondents support increasing the housing trust fund. Draft talking points are ready for your review.',
    },
    {
      badge: 'Budget deadline',
      badgeVariant: 'blue',
      title: 'FY2027 capital improvement requests',
      description:
        'Submit your district priority list by Friday. Road resurfacing and park lighting are the top two from your constituents.',
    },
    {
      badge: 'Active legislation',
      badgeVariant: 'purple',
      title: 'Short-term rental ordinance update',
      description:
        'Second reading scheduled for next month. Three Council members have co-sponsored your proposed amendment.',
    },
  ],
  12: [
    {
      badge: 'Meeting Tuesday',
      badgeVariant: 'orange',
      title: 'Budget committee: capital priorities',
      description:
        'Final vote on the $42M capital improvement plan. Your district secured $3.2M for road infrastructure.',
    },
    {
      badge: 'Constituent win',
      badgeVariant: 'green',
      title: 'Affordable housing trust fund approved',
      description:
        'The $5M annual allocation passed 7-2. Share the results with your constituents and credit their input.',
    },
    {
      badge: 'Upcoming vote',
      badgeVariant: 'blue',
      title: 'Transit expansion study authorization',
      description:
        'Staff requests $200K for a feasibility study. Three districts would benefit, including yours.',
    },
    {
      badge: 'Q1 report',
      badgeVariant: 'purple',
      title: 'Quarterly constituent engagement report',
      description:
        'Your response rate is 22% above the district average. Review the full report and share highlights.',
    },
  ],
};

const districtPriorities: Record<
  WeekOption,
  Array<{ rank: number; name: string; score: number; trend: 'up' | 'down' | 'flat' }>
> = {
  1: [
    { rank: 1, name: 'Road infrastructure', score: 72.1, trend: 'flat' },
    { rank: 2, name: 'Affordable housing', score: 66.4, trend: 'up' },
    { rank: 3, name: 'Public safety', score: 54.8, trend: 'flat' },
    { rank: 4, name: 'Park improvements', score: 48.3, trend: 'down' },
    { rank: 5, name: 'Transit access', score: 41.7, trend: 'up' },
  ],
  3: [
    { rank: 1, name: 'Affordable housing', score: 66.4, trend: 'up' },
    { rank: 2, name: 'Road infrastructure', score: 58.2, trend: 'down' },
    { rank: 3, name: 'Public safety', score: 52.1, trend: 'flat' },
    { rank: 4, name: 'Park improvements', score: 47.8, trend: 'up' },
    { rank: 5, name: 'Transit access', score: 39.5, trend: 'down' },
  ],
  12: [
    { rank: 1, name: 'Affordable housing', score: 71.2, trend: 'up' },
    { rank: 2, name: 'Road infrastructure', score: 63.4, trend: 'up' },
    { rank: 3, name: 'Transit access', score: 55.9, trend: 'up' },
    { rank: 4, name: 'Public safety', score: 50.1, trend: 'down' },
    { rank: 5, name: 'Park improvements', score: 44.6, trend: 'flat' },
  ],
};

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
  if (trend === 'up')
    return <TrendingUp size={14} className="text-gp-success" />;
  if (trend === 'down')
    return <TrendingDown size={14} className="text-gp-error" />;
  return <Minus size={14} className="text-gp-text-muted" />;
}

/* ── Badge variant mapping ───────────────────────────────── */

function focusBadgeVariant(v: 'orange' | 'green' | 'blue' | 'purple') {
  const map: Record<string, 'orange' | 'green' | 'blue' | 'purple'> = {
    orange: 'orange',
    green: 'green',
    blue: 'blue',
    purple: 'purple',
  };
  return map[v] ?? 'blue';
}

/* ── Page ─────────────────────────────────────────────────── */

export default function HomePage() {
  const [activeWeek, setActiveWeek] = useState<WeekOption>(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const glance = weekGlance[activeWeek];
  const focus = weekFocus[activeWeek];
  const priorities = districtPriorities[activeWeek];
  const roleData = role101[activeWeek];

  // Poll data only shows in week 3+
  const showPoll = activeWeek >= 3;
  const pollResponses = activeWeek === 3 ? 127 : 412;
  const pollTotal = 500;
  const pollDaysLeft = activeWeek === 3 ? 4 : 1;
  const pollProgress = (pollResponses / pollTotal) * 100;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block flex-shrink-0 h-screen sticky top-0">
        <DarkSidebar navItems={navItems} />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full w-[72px]">
            <DarkSidebar navItems={navItems} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center h-14 px-4 border-b border-gp-border bg-white sticky top-0 z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gp-bg-subtle"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="ml-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="#DC1438"
                strokeWidth="1.8"
                fill="none"
              />
              <path
                d="M12 7l1.12 2.27 2.5.36-1.81 1.77.43 2.5L12 12.77 9.76 13.9l.43-2.5-1.81-1.77 2.5-.36L12 7z"
                fill="#2563EB"
              />
            </svg>
          </div>
        </header>

        <div className="max-w-[640px] mx-auto px-4 lg:px-6 py-6 lg:py-8">
          {/* ── Greeting ──────────────────────────────────── */}
          <section className="mb-6">
            <h1 className="font-outfit text-[28px] lg:text-[32px] font-bold text-gp-text leading-tight">
              Good morning, Dimple
            </h1>
            <p className="text-sm text-gp-text-secondary mt-1">
              Week {activeWeek} &middot; Charlotte City Council Member &middot; District 5
            </p>

            {/* Week selector pills */}
            <div className="flex gap-2 mt-4">
              {WEEK_OPTIONS.map((w) => (
                <button
                  key={w}
                  onClick={() => setActiveWeek(w)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    activeWeek === w
                      ? 'bg-midnight-900 text-white'
                      : 'bg-gp-bg-subtle text-gp-text-secondary hover:bg-gp-border-light',
                  )}
                >
                  Week {w}
                </button>
              ))}
            </div>
          </section>

          {/* ── Your Week at a Glance ────────────────────── */}
          <section className="mb-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#92400E]" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#92400E]">
                  Your Week at a Glance
                </span>
              </div>
              <h2 className="font-outfit text-lg font-semibold text-[#1E1F20] mb-2">
                {glance.subtitle}
              </h2>
              <p className="text-sm leading-relaxed text-[#44403C]">
                {glance.body}
              </p>
              <button className="mt-3 text-sm font-medium text-[#92400E] hover:text-[#78350F] inline-flex items-center gap-1 transition-colors">
                See what&apos;s on your plate this week
                <ChevronRight size={14} />
              </button>
            </div>
          </section>

          {/* ── This Week's Focus ────────────────────────── */}
          <section className="mb-6">
            <h2 className="font-outfit text-lg font-semibold text-gp-text mb-3">
              This Week&apos;s Focus
            </h2>
            <div className="flex flex-col gap-3">
              {focus.map((item, i) => (
                <Card key={i} padding="md" className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <Badge variant={focusBadgeVariant(item.badgeVariant)} className="mb-2">
                      {item.badge}
                    </Badge>
                    <h3 className="text-[15px] font-semibold text-gp-text leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gp-text-secondary mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gp-text-muted flex-shrink-0 mt-1"
                  />
                </Card>
              ))}
            </div>
          </section>

          {/* ── Active Poll (conditional) ────────────────── */}
          {showPoll && (
            <section className="mb-6">
              <div className="rounded-2xl bg-midnight-900 p-5 lg:p-6 text-white">
                <h3 className="text-[15px] font-semibold mb-3">
                  Your Affordable Housing Priorities poll is active
                </h3>

                {/* Segmented progress bar */}
                <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-[#FF9800] rounded-l-full"
                    style={{ width: '38%' }}
                  />
                  <div className="bg-gp-success" style={{ width: '32%' }} />
                  <div
                    className="bg-gp-blue rounded-r-full"
                    style={{ width: `${pollProgress - 70}%` }}
                  />
                  <div className="bg-white/20 flex-1" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">
                    {pollResponses} of {pollTotal} responses
                  </span>
                  <span className="flex items-center gap-1 text-white/60">
                    <Clock size={13} />
                    {pollDaysLeft} day{pollDaysLeft !== 1 ? 's' : ''} left
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* ── Your District at a Glance ────────────────── */}
          <section className="mb-6">
            <h2 className="font-outfit text-lg font-semibold text-gp-text mb-3">
              Your District at a Glance
            </h2>
            <Card padding="md">
              <div className="flex flex-col gap-3">
                {priorities.map((p) => (
                  <div
                    key={p.rank}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm font-semibold text-gp-text-muted w-6 text-right">
                      #{p.rank}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gp-text">
                      {p.name}
                    </span>
                    <span className="text-sm tabular-nums text-gp-text-secondary font-medium">
                      {p.score}
                    </span>
                    <TrendIcon trend={p.trend} />
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ── Quick Actions ────────────────────────────── */}
          <section className="mb-6">
            <h2 className="font-outfit text-lg font-semibold text-gp-text mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Poll your district',
                  color: 'bg-gp-blue-light',
                  iconColor: 'text-gp-blue',
                  icon: <BarChart3 size={20} />,
                },
                {
                  label: 'View results',
                  color: 'bg-gp-success-light',
                  iconColor: 'text-gp-success',
                  icon: <TrendingUp size={20} />,
                },
                {
                  label: 'Send update',
                  color: 'bg-gp-warning-light',
                  iconColor: 'text-gp-warning',
                  icon: <MessageCircle size={20} />,
                },
              ].map((action) => (
                <Card key={action.label} padding="sm" className="flex flex-col items-center text-center gap-2 py-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      action.color,
                    )}
                  >
                    <span className={action.iconColor}>{action.icon}</span>
                  </div>
                  <span className="text-xs font-medium text-gp-text leading-tight">
                    {action.label}
                  </span>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Your Role 101 ────────────────────────────── */}
          <section className="mb-10">
            <div className="rounded-2xl bg-midnight-900 p-5 lg:p-6 text-white">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-[15px] font-semibold">Your Role 101</h3>
                  <p className="text-sm text-white/60 mt-0.5">
                    Charlotte City Council Member
                  </p>
                </div>
                <span className="text-sm font-medium text-white/60">
                  {roleData.progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-white/15 overflow-hidden mt-3 mb-4">
                <div
                  className="h-full rounded-full bg-gp-blue transition-all duration-500"
                  style={{ width: `${roleData.progress}%` }}
                />
              </div>

              {/* Checklist */}
              <ul className="flex flex-col gap-2.5">
                {roleData.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border',
                        item.done
                          ? 'bg-gp-blue border-gp-blue'
                          : 'border-white/30 bg-transparent',
                      )}
                    >
                      {item.done && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={cn(
                        'text-sm',
                        item.done
                          ? 'line-through text-white/40'
                          : 'text-white/90',
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
