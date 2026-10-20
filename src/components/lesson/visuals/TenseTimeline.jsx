import { useState } from 'react'
import { Badge, Card, Button } from '../../common'

const TIMELINE_MODES = [
  {
    id: 'simple',
    title: 'Simple Aspect (Points in Time)',
    description: 'Represents events as discrete, completed whole occurrences at a point on the timeline.',
    pastLabel: 'Point Event (V₂): e.g., "arrived yesterday"',
    presentLabel: 'Habitual/Timeless (V₁): e.g., "issues notices daily"',
    futureLabel: 'Future Point (will + V₁): e.g., "will decide tomorrow"',
  },
  {
    id: 'continuous',
    title: 'Continuous Aspect (Ongoing Wave)',
    description: 'Depicts an action actively in progress around a reference moment.',
    pastLabel: 'Past Ongoing (was/were + V-ing): "was typing when power failed"',
    presentLabel: 'Now Active (is/am/are + V-ing): "is configuring right now"',
    futureLabel: 'Future Ongoing (will be + V-ing): "will be testing at 10 AM"',
  },
  {
    id: 'perfect',
    title: 'Perfect Aspect (Prior Completion Anchor)',
    description: 'Connects a completed action to a later point of reference or consequence.',
    pastLabel: 'Past of Past (had + V₃): finished BEFORE another past event',
    presentLabel: 'Present Consequence (has/have + V₃): just completed, relevant NOW',
    futureLabel: 'Future Deadline (will have + V₃): finished BY a future boundary',
  },
  {
    id: 'perfect-continuous',
    title: 'Perfect Continuous (Accumulated Duration)',
    description: 'Highlights the continuous unbroken duration of an activity leading up to a reference point.',
    pastLabel: 'Past Duration (had been + V-ing): ongoing for hours before event',
    presentLabel: 'Present Span (has/have been + V-ing): started past, continues now',
    futureLabel: 'Future Span (will have been + V-ing): duration measured up to a future point',
  },
]

export default function TenseTimeline() {
  const [activeModeId, setActiveModeId] = useState('perfect')
  const currentMode = TIMELINE_MODES.find((m) => m.id === activeModeId)

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-base text-surface-900">
            Chronological Timeline Architecture
          </h3>
          <p className="text-xs text-surface-500">
            Observe how grammatical aspects reshape the temporal contour of events.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TIMELINE_MODES.map((mode) => (
            <Button
              key={mode.id}
              variant={activeModeId === mode.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveModeId(mode.id)}
            >
              {mode.id.replace('-', ' ').toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="bg-surface-900 rounded-2xl p-6 text-white overflow-x-auto shadow-inner">
        <svg viewBox="0 0 800 240" className="w-full min-w-[650px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Axis Line */}
          <line x1="60" y1="120" x2="740" y2="120" stroke="#475569" strokeWidth="3" strokeDasharray="6 6" />
          <line x1="60" y1="120" x2="740" y2="120" stroke="#94a3b8" strokeWidth="2" />

          {/* Time Zone Dividers */}
          <line x1="260" y1="40" x2="260" y2="200" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="520" y1="40" x2="520" y2="200" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Time Zone Labels */}
          <text x="160" y="30" fill="#94a3b8" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            PAST
          </text>
          <text x="390" y="30" fill="#60a5fa" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            PRESENT (NOW)
          </text>
          <text x="630" y="30" fill="#34d399" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            FUTURE
          </text>

          {/* "NOW" Landmark Marker */}
          <circle cx="390" cy="120" r="8" fill="#3b82f6" />
          <circle cx="390" cy="120" r="14" fill="#3b82f6" opacity="0.3" />
          <text x="390" y="150" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            [Point NOW]
          </text>

          {/* DYNAMIC ASPECT VISUALIZATIONS */}
          {activeModeId === 'simple' && (
            <g>
              {/* Past Point */}
              <circle cx="160" cy="120" r="7" fill="#fbbf24" />
              <text x="160" y="95" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Definite Past Point
              </text>
              <text x="160" y="150" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                V₂ ("yesterday")
              </text>

              {/* Present Point */}
              <rect x="360" y="112" width="60" height="16" rx="4" fill="#60a5fa" opacity="0.8" />
              <text x="390" y="100" fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Habitual / Timeless
              </text>

              {/* Future Point */}
              <circle cx="630" cy="120" r="7" fill="#34d399" />
              <text x="630" y="95" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Future Intent
              </text>
              <text x="630" y="150" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                will + V₁
              </text>
            </g>
          )}

          {activeModeId === 'continuous' && (
            <g>
              {/* Past Continuous Wave */}
              <rect x="110" y="110" width="100" height="20" rx="10" fill="#f59e0b" opacity="0.7" />
              <text x="160" y="95" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                Past Interval
              </text>
              <text x="160" y="150" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                was/were + V-ing
              </text>

              {/* Present Continuous Wave */}
              <rect x="340" y="110" width="100" height="20" rx="10" fill="#3b82f6" opacity="0.85" />
              <text x="390" y="95" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                Ongoing Right Now
              </text>
              <text x="390" y="150" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                is/am/are + V-ing
              </text>

              {/* Future Continuous Wave */}
              <rect x="580" y="110" width="100" height="20" rx="10" fill="#10b981" opacity="0.7" />
              <text x="630" y="95" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                Future Interval
              </text>
              <text x="630" y="150" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                will be + V-ing
              </text>
            </g>
          )}

          {activeModeId === 'perfect' && (
            <g>
              {/* Past Perfect: Action prior to past landmark */}
              <circle cx="100" cy="120" r="6" fill="#f59e0b" />
              <path d="M 106 120 Q 140 80 180 115" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
              <circle cx="180" cy="120" r="5" fill="#e2e8f0" />
              <text x="100" y="80" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                1st Past Action (had + V₃)
              </text>
              <text x="180" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
                2nd Action (V₂)
              </text>

              {/* Present Perfect: Past action with arrow pointing to NOW */}
              <circle cx="290" cy="120" r="6" fill="#60a5fa" />
              <path d="M 296 120 Q 340 70 385 115" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
              <text x="330" y="65" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                Completed past event impacting NOW
              </text>
              <text x="290" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                has/have + V₃
              </text>

              {/* Future Perfect: Completed by future deadline */}
              <circle cx="580" cy="120" r="6" fill="#34d399" />
              <path d="M 586 120 Q 620 75 660 115" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="660" y1="90" x2="660" y2="150" stroke="#f43f5e" strokeWidth="2" />
              <text x="660" y="80" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                Deadline ("By 5 PM")
              </text>
              <text x="580" y="145" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontFamily="monospace">
                will have + V₃
              </text>
            </g>
          )}

          {activeModeId === 'perfect-continuous' && (
            <g>
              {/* Duration line leading to NOW */}
              <rect x="230" y="114" width="160" height="12" rx="6" fill="url(#grad-pc)" />
              <circle cx="230" cy="120" r="5" fill="#f59e0b" />
              <text x="230" y="100" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                Origin ("Since 2018")
              </text>
              <text x="310" y="85" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                Unbroken Duration Span ("For 6 years...")
              </text>
              <text x="310" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                has/have been + V-ing
              </text>
            </g>
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="grad-pc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Description Panel */}
      <div className="bg-surface-50 rounded-xl p-4 border border-surface-200 text-xs space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">{currentMode?.title}</Badge>
          <span className="text-surface-600 font-medium">{currentMode?.description}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-surface-200">
          <div className="p-2 rounded bg-white border border-surface-200">
            <span className="font-bold text-amber-700 block mb-0.5">Past Dimension:</span>
            <span className="text-surface-700">{currentMode?.pastLabel}</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200">
            <span className="font-bold text-primary-700 block mb-0.5">Present Dimension:</span>
            <span className="text-surface-700">{currentMode?.presentLabel}</span>
          </div>
          <div className="p-2 rounded bg-white border border-surface-200">
            <span className="font-bold text-emerald-700 block mb-0.5">Future Dimension:</span>
            <span className="text-surface-700">{currentMode?.futureLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
