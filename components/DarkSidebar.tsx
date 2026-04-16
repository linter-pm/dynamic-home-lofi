'use client';

import { cn } from '@goodparty/serve-ui';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface DarkSidebarProps {
  navItems: NavItem[];
  onNavClick?: (label: string) => void;
  className?: string;
}

/**
 * Dark navy sidebar matching the Lovable Dynamic Home prototype.
 * Uses midnight-900 (#0B1529) background with the GoodParty heart-outline logo.
 */
export function DarkSidebar({ navItems, onNavClick, className }: DarkSidebarProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full w-[72px] bg-midnight-900 items-center py-6',
        className,
      )}
    >
      {/* GoodParty logo */}
      <div className="mb-8">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavClick?.(item.label)}
            className={cn(
              'flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors',
              item.active
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5',
            )}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
