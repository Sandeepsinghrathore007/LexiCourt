import { useState } from 'react'
import { Smile, Frown, Flame, ShieldAlert, Sparkles, AlertCircle, Heart } from 'lucide-react'
import { Card, Badge } from '../../common'

const EMOTIONAL_STATES = [
  {
    state: 'Peak Joy & Ecstasy',
    valence: 'Positive',
    badgeVariant: 'success',
    icon: Sparkles,
    color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20',
    idioms: [
      { idiom: 'On cloud nine', sense: 'Extremely happy and delighted after an extraordinary achievement.' },
      { idiom: 'Over the moon', sense: 'Ecstatic, thrilled, and full of joyful celebration.' },
      { idiom: 'Walk on air', sense: 'Feeling so lighthearted and happy that one seems to float.' }
    ],
    distractorAlert: "'Head in the clouds' se confuse na karein jo impractical daydreaming hota hai."
  },
  {
    state: 'Anticipatory Nervousness',
    valence: 'Neutral / Tension',
    badgeVariant: 'warning',
    icon: AlertCircle,
    color: 'border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20',
    idioms: [
      { idiom: 'Butterflies in one\'s stomach', sense: 'Temporary fluttery sensation before a test, speech, or viva.' },
      { idiom: 'On pins and needles', sense: 'Tense, anxious waiting for crucial news or examination results.' },
      { idiom: 'On edge', sense: 'Nervous, irritable, and unable to relax due to anticipation.' }
    ],
    distractorAlert: "Normal pre-exam nervousness ko cowardice ya plan chhodne ('cold feet') se alag karein."
  },
  {
    state: 'Fear, Panic & Backing Out',
    valence: 'Negative / Fear',
    badgeVariant: 'danger',
    icon: ShieldAlert,
    color: 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/20',
    idioms: [
      { idiom: 'Get cold feet', sense: 'Suddenly losing courage and refusing to proceed with a planned commitment.' },
      { idiom: 'In a cold sweat', sense: 'Extreme acute terror or panic caused by sudden shock.' }
    ],
    distractorAlert: "'Cold feet' (loss of courage) vs 'keep one's cool' (calm composure) exact antonyms hain."
  },
  {
    state: 'Explosive Anger & Rage',
    valence: 'Negative / Anger',
    badgeVariant: 'danger',
    icon: Flame,
    color: 'border-red-300 dark:border-red-800 bg-red-50/20 dark:bg-red-950/20',
    idioms: [
      { idiom: 'Lose one\'s temper', sense: 'Failing to control sudden explosive anger under provocation.' },
      { idiom: 'Fly off the handle', sense: 'Losing self-control over a minor incident in sudden fury.' },
      { idiom: 'Drive someone up the wall', sense: 'Annoying someone so intensely that they become furious.' }
    ],
    distractorAlert: "Sudden rage ('lose temper') vs chronic grudge ('chip on shoulder') ke duration ko check karein."
  },
  {
    state: 'Chronic Resentment & Grudge',
    valence: 'Negative / Grudge',
    badgeVariant: 'danger',
    icon: Frown,
    color: 'border-purple-300 dark:border-purple-800 bg-purple-50/20 dark:bg-purple-950/20',
    idioms: [
      { idiom: 'Chip on one\'s shoulder', sense: 'Carrying a permanent grudge and behaving with hostile defensiveness.' },
      { idiom: 'Bad blood', sense: 'Longstanding ill-feeling and mutual bitterness between parties.' }
    ],
    distractorAlert: "'Wear heart on sleeve' (vulnerable openness) ka opposite lingering hidden grudge hota hai."
  },
  {
    state: 'Stoic Composure & Acceptance',
    valence: 'Positive / Equanimity',
    badgeVariant: 'primary',
    icon: Heart,
    color: 'border-blue-300 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/20',
    idioms: [
      { idiom: 'Keep one\'s cool', sense: 'Maintaining poise, calmness, and dignity despite hostile provocation.' },
      { idiom: 'Keep one\'s chin up', sense: 'Staying cheerful and courageous in the face of misfortune.' },
      { idiom: 'A bitter pill to swallow', sense: 'Accepting an inevitable unpleasant reality with stoic maturity.' }
    ],
    distractorAlert: "'Keep one's cool' mein subject ke pronoun concord (his cool / her cool / their cool) ko zaroor check karein."
  }
]

export default function EmotionBehaviourReferenceMap() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = EMOTIONAL_STATES[activeIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 4</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Affective Valence Architecture</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <Smile size={20} className="text-primary-600 dark:text-primary-400" />
            Emotion, Behaviour & Psychological State Reference Map
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Emotional idioms mein sentence ka surrounding mood aur valence decide karta hai ki kaunsa expression aayega. 6 affective states ke precise nuances ko observe karein.
          </p>
        </div>
      </div>

      {/* State Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {EMOTIONAL_STATES.map((st, idx) => {
          const isActive = idx === activeIdx
          const Icon = st.icon
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                isActive
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/60 shadow-xs ring-1 ring-primary-500/30'
                  : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 hover:bg-surface-50'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-surface-500'} />
              <span className={`text-[0.6875rem] font-bold leading-tight ${isActive ? 'text-primary-900 dark:text-primary-100' : 'text-surface-700 dark:text-surface-300'}`}>
                {st.state}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detailed Emotion Box */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${current.color} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700/60">
          <div className="flex items-center gap-2">
            <current.icon size={20} />
            <h4 className="font-heading font-bold text-base sm:text-lg">
              {current.state}
            </h4>
          </div>
          <Badge variant={current.badgeVariant} size="sm">
            Valence: {current.valence}
          </Badge>
        </div>

        {/* Idiom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {current.idioms.map((idm, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 space-y-1.5"
            >
              <span className="font-bold text-xs text-primary-700 dark:text-primary-300 font-heading block">
                {idm.idiom}
              </span>
              <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
                {idm.sense}
              </p>
            </div>
          ))}
        </div>

        {/* Trap Alert */}
        <div className="p-3 rounded-xl bg-white/90 dark:bg-surface-900/90 border border-surface-200 dark:border-surface-700 text-xs">
          <strong className="text-rose-600 dark:text-rose-400 block mb-0.5">Distractor Alert:</strong>
          <span className="text-surface-700 dark:text-surface-300">{current.distractorAlert}</span>
        </div>
      </div>
    </Card>
  )
}
