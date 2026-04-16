'use client';

import React from 'react';
import { LayoutDashboard, Users, Megaphone, ChevronDown } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Constituents', icon: Users, active: false },
  { label: 'Outreach', icon: Megaphone, active: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#FAFAFA] border-r border-[#E5E5E5]
          flex flex-col
          transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo + role header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            {/* GoodParty heart logo */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
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
            <span className="text-sm font-semibold text-gp-text">GoodParty.org</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 ml-[34px]">
            <span className="text-xs text-gp-text-secondary">City Council Member</span>
            <ChevronDown className="w-3 h-3 text-gp-text-muted" />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors mb-0.5 relative
                  ${
                    item.active
                      ? 'bg-gp-blue-light text-gp-blue'
                      : 'text-gp-text-secondary hover:bg-gp-bg-subtle hover:text-gp-text'
                  }
                `}
              >
                {/* Blue left-edge indicator for active item */}
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gp-blue rounded-r-full" />
                )}
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User profile at bottom */}
        <div className="px-5 pb-5 pt-3 border-t border-gp-border-light">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">DA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gp-text truncate">Dimple Ajmera</p>
              <button className="text-xs text-gp-text-muted hover:text-gp-blue transition-colors">
                Manage account
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
