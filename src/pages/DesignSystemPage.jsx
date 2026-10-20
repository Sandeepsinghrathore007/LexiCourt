import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { Button, Card, Badge, Callout } from '../components/common'

function ColorSwatch({ name, shades }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-surface-700 capitalize">{name}</h4>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {shades.map((shade) => (
          <div key={shade} className="flex flex-col items-center gap-1 shrink-0">
            <div
              className={`w-10 h-10 rounded-lg bg-${name}-${shade} ring-1 ring-inset ring-black/5`}
              style={{ backgroundColor: `var(--color-${name}-${shade})` }}
            />
            <span className="text-[10px] text-surface-400 font-mono">{shade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-surface-900 mb-2 font-heading">{title}</h2>
      {description && <p className="text-surface-500">{description}</p>}
      <div className="mt-4 h-px bg-surface-200" />
    </div>
  )
}

export default function DesignSystemPage() {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Top Banner */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-surface-500 hover:text-surface-800 transition-colors mr-2">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-surface-200" />
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <BookOpen className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-base font-bold text-surface-900 font-heading leading-tight">
                Design System Preview
              </h1>
              <p className="text-[11px] text-surface-400">Tokens, Typography & Atomic Components</p>
            </div>
          </div>
          <Badge variant="primary" dot>
            Phase 01 Reference
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-14">
        {/* Color Palette */}
        <section>
          <SectionHeader
            title="Color Palette"
            description="Five semantic color families powering the entire desktop interface."
          />
          <div className="space-y-5">
            <ColorSwatch name="primary" shades={shades} />
            <ColorSwatch name="secondary" shades={shades} />
            <ColorSwatch name="success" shades={shades} />
            <ColorSwatch name="error" shades={shades} />
            <ColorSwatch name="surface" shades={shades} />
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionHeader
            title="Typography Scale"
            description="Plus Jakarta Sans for display headings, Inter for study texts, JetBrains Mono for grammar formulas."
          />
          <Card variant="default" padding="lg">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-surface-400 mb-1 font-mono">font-heading / 36px / bold</p>
                <h1>Tenses Architecture & Time Markers</h1>
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1 font-mono">font-heading / 30px / bold</p>
                <h2>Present Perfect Tense</h2>
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1 font-mono">font-heading / 24px / bold</p>
                <h3>Time Markers & Signal Words</h3>
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1 font-mono">font-sans / 16px / normal</p>
                <p className="text-surface-700 leading-relaxed">
                  The English tense system is organized along two independent axes: <strong>Time</strong> (when an event occurs — Past, Present, or Future) and <strong>Aspect</strong> (how the speaker views the event — Simple, Continuous, Perfect, or Perfect Continuous). This 3×4 matrix produces the 12 fundamental tenses that govern all English verb usage.
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1 font-mono">font-mono / 16px / medium — Grammar Formula</p>
                <p className="font-mono text-primary-700 bg-primary-50 px-4 py-3 rounded-lg border border-primary-200 font-medium">
                  Subject + has/have + V₃ + Object
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Components */}
        <section>
          <SectionHeader title="Atomic Components" description="Buttons, Badges, Progress Bars, Callouts, and Cards." />
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-surface-500 mb-3">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success" icon={CheckCircle}>Correct</Button>
                <Button variant="error" icon={XCircle}>Incorrect</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Style</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-surface-500 mb-3">Badges</p>
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="primary">Active Lesson</Badge>
                <Badge variant="secondary">In Progress</Badge>
                <Badge variant="success" dot>Mastered</Badge>
                <Badge variant="error" dot>Needs Review</Badge>
                <Badge variant="neutral">Locked</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-surface-500 mb-3">Callouts</p>
              <div className="space-y-3">
                <Callout type="info" title="Grammar Rule">
                  The Present Perfect tense is used when an action started in the past and continues to the present, or when the exact time of the action is not important.
                </Callout>
                <Callout type="warning" title="Common Mistake">
                  Do not use Present Perfect with definite past time markers like "yesterday" or "last week". Use Simple Past instead.
                </Callout>
                <Callout type="success" title="Correct">
                  ✓ She <em>completed</em> the report <strong>yesterday</strong>. — Simple Past with definite past marker.
                </Callout>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
