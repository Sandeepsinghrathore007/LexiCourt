import { useState } from 'react'
import { Clock, Calendar, Globe, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const PYRAMID_LEVELS = [
  {
    id: 'in',
    name: 'IN — Broad / Enclosed Time',
    specificity: 'Broadest / Largest Units',
    icon: Globe,
    color: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    badgeVariant: 'primary',
    badgeText: 'Broad Units (General)',
    examples: [
      { unit: 'Centuries / Decades', sample: 'in the 21st century, in the 1990s' },
      { unit: 'Years', sample: 'in 2026, in 1947, in 2020' },
      { unit: 'Months', sample: 'in January, in August, in October' },
      { unit: 'Seasons', sample: 'in summer, in winter, in the monsoon' },
      { unit: 'Parts of the Day', sample: 'in the morning, in the afternoon, in the evening' },
      { unit: 'Future Duration', sample: 'in two hours, in ten minutes, in three days' },
    ],
    ruleNote: 'Jab time frame lamba, general ya non-specific duration ho, toh "IN" use hota hai. Note: "in the morning" valid hai, lekin agar iske aage specific day jud jaye ("Monday morning"), toh "ON" lagta hai.',
    examTrap: 'Omission Rule: "last year, next month, every week, this morning" se pehle koi preposition nahi lagta (NOT: *in next year).'
  },
  {
    id: 'on',
    name: 'ON — Specific 24-Hour Days & Dates',
    specificity: 'Mid-Level / 24-Hour Specificity',
    icon: Calendar,
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    badgeVariant: 'secondary',
    badgeText: 'Calendar Days (24 Hours)',
    examples: [
      { unit: 'Days of the Week', sample: 'on Monday, on Friday, on Sundays' },
      { unit: 'Calendar Dates', sample: 'on 15th August, on 26th January 1950' },
      { unit: 'Holidays with "Day"', sample: 'on Republic Day, on Christmas Day, on Independence Day' },
      { unit: 'Day + Part of Day', sample: 'on Monday morning, on Sunday evening, on Friday afternoon' },
      { unit: 'Specific Calendar Night', sample: 'on the night of 14th August, on a cold winter night' },
      { unit: 'Special Personal Days', sample: 'on my birthday, on our anniversary' },
    ],
    ruleNote: 'Jab time exactly 24-ghante ka calendar day ya date ho, toh "ON" use hota hai. Specific day add hote hi part of day par "on" dominant ho jata hai ("on Monday morning").',
    examTrap: 'Festival Trap: "on Christmas Day" (24-hour day) par "ON" lagta hai, lekin festival season "at Christmas" ya "at Diwali" par "AT" lagta hai.'
  },
  {
    id: 'at',
    name: 'AT — Precise Clock Times & Pinpoint Moments',
    specificity: 'Narrowest / Pinpoint Moments',
    icon: Clock,
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    badgeVariant: 'success',
    badgeText: 'Pinpoint Coordinates',
    examples: [
      { unit: 'Exact Clock Times', sample: 'at 10:30 AM, at 5:00 PM, at 7 o\'clock' },
      { unit: 'Exact Natural Points', sample: 'at noon, at midday, at midnight, at dawn, at dusk' },
      { unit: 'Night Habitual Period', sample: 'at night (habitual: "bats fly at night")' },
      { unit: 'Fixed Time Idioms', sample: 'at the moment, at present, at the same time' },
      { unit: 'Festival Season (no "Day")', sample: 'at Diwali, at Christmas, at Eid, at Easter' },
      { unit: 'Meal Times', sample: 'at lunchtime, at breakfast, at dinner' },
    ],
    ruleNote: 'Jab time ek exact point, clock coordinate ya fixed instant ho, toh "AT" lagta hai. British English mein "at the weekend" standard mana jata hai.',
    examTrap: 'Night Distinction: General habit = "at night". Particular occurrence in the night = "in the night". Specific calendar night = "on that night".'
  },
]

export default function TimePrepositionPyramid() {
  const [activeLevelId, setActiveLevelId] = useState('in')
  const activeLevel = PYRAMID_LEVELS.find((l) => l.id === activeLevelId) || PYRAMID_LEVELS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
            <Clock size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Time Specificity Pyramid (In ➔ On ➔ At)
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Broad General Periods se lekar Pinpoint Clock Times tak ka complete temporal hierarchy explorer
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Temporal Matrix</Badge>
      </div>

      {/* Interactive Visual Pyramid */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">
          Pyramid ke kisi bhi level par click karke uske rules aur examples inspect karein:
        </p>

        <div className="flex flex-col gap-2 max-w-xl mx-auto py-2">
          {/* Level 1: IN (Broadest - Top Bar) */}
          <button
            type="button"
            onClick={() => setActiveLevelId('in')}
            className={`w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white transition-all cursor-pointer flex items-center justify-between shadow-sm ${
              activeLevelId === 'in'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 ring-2 ring-blue-400 scale-[1.02]'
                : 'bg-gradient-to-r from-blue-500/80 to-indigo-600/80 hover:opacity-95'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span>IN — Broad Periods (Centuries, Years, Months, Seasons)</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/20 font-mono">Broadest</span>
          </button>

          {/* Level 2: ON (Medium - Mid Bar) */}
          <button
            type="button"
            onClick={() => setActiveLevelId('on')}
            className={`w-[85%] mx-auto py-3 px-4 rounded-xl font-heading font-bold text-sm text-white transition-all cursor-pointer flex items-center justify-between shadow-sm ${
              activeLevelId === 'on'
                ? 'bg-gradient-to-r from-amber-600 to-orange-700 ring-2 ring-amber-400 scale-[1.02]'
                : 'bg-gradient-to-r from-amber-500/80 to-orange-600/80 hover:opacity-95'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>ON — Specific Days & Calendar Dates (24 Hours)</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/20 font-mono">Mid-Level</span>
          </button>

          {/* Level 3: AT (Narrowest - Base Tip) */}
          <button
            type="button"
            onClick={() => setActiveLevelId('at')}
            className={`w-[65%] mx-auto py-2.5 px-4 rounded-xl font-heading font-bold text-sm text-white transition-all cursor-pointer flex items-center justify-between shadow-sm ${
              activeLevelId === 'at'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 ring-2 ring-emerald-400 scale-[1.02]'
                : 'bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:opacity-95'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>AT — Exact Clock Times & Pinpoints</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/20 font-mono">Pinpoint</span>
          </button>
        </div>
      </div>

      {/* Active Level Detailed Inspector */}
      <div className={`p-4 rounded-xl border ${activeLevel.lightBg} space-y-4`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-base text-surface-900 dark:text-white">
              {activeLevel.name}
            </span>
            <Badge variant={activeLevel.badgeVariant} size="sm">
              {activeLevel.badgeText}
            </Badge>
          </div>
          <span className="text-xs font-mono font-medium text-surface-600 dark:text-surface-300">
            Specificity: {activeLevel.specificity}
          </span>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {activeLevel.examples.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 text-xs space-y-1"
            >
              <span className="font-bold text-primary-700 dark:text-primary-300 block">
                {item.unit}
              </span>
              <p className="font-mono text-surface-800 dark:text-surface-100">
                {item.sample}
              </p>
            </div>
          ))}
        </div>

        {/* Explanation & Exam Trap */}
        <div className="space-y-2 pt-2 border-t border-surface-200/80 dark:border-surface-700/80 text-xs">
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            <strong className="text-surface-900 dark:text-white">Conceptual Grammar Rule: </strong>
            {activeLevel.ruleNote}
          </p>
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong>High Court Exam Trap: </strong>{activeLevel.examTrap}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
