/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Wand2,
  ShieldCheck,
  Compass,
  Upload,
  Lock,
  BarChart3,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
}) => {
  // கோரப்பட்டபடி 3 விருப்பங்கள் முழுமையாக நீக்கப்பட்டுள்ளன:
  const menuItems = [
    { id: 'dashboard', label: 'முகப்புப் பலகை', icon: LayoutDashboard },
    { id: 'historicalMap', label: 'தமிழ்நாட்டு வரலாற்று வரைபடம்', icon: Compass },
    { id: 'upload', label: 'சுவடிப் பதிவேற்றம் & நவீன PDF', icon: Upload },
    { id: 'auditLog', label: 'தணிக்கைப் பதிவு', icon: Lock },
    { id: 'evaluations', label: 'மதிப்பீட்டுக் கூடம்', icon: BarChart3 },
    { id: 'export', label: 'காப்பக வெளியீடு & பதிவிறக்கம்', icon: Download },
  ];

  return (
    <aside
      className={`bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] border-r border-[#D9A441]/30 transition-all duration-300 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-3">
        {/* மடக்கு / விரிவாக்கு பொத்தான் */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9A441]/20 mb-3">
          {!isCollapsed && (
            <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441]">
              அதிகாரப் பலகை
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 hover:bg-[#D9A441]/20 rounded cursor-pointer mx-auto"
            title={isCollapsed ? 'விரிவாக்கு' : 'மடக்கு'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* வழிசெலுத்தல் மெனு உருப்படிகள் */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#7A1F2B] text-white shadow-sm'
                    : 'text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 hover:bg-[#D9A441]/20'
                }`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D9A441]' : ''}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-3 border-t border-[#D9A441]/20 text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 text-center">
          நூல் மீட்பு © 2026 • செம்மொழித் தரவுப் பாதுகாப்பு
        </div>
      )}
    </aside>
  );
};
