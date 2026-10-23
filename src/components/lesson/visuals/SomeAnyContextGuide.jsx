import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { Card, Badge } from '../../common'

const CONTEXT_SITUATIONS = [
  {
    id: 'affirmative',
    title: '1. Standard Affirmative Statement',
    speechAct: 'Assertive Declaration',
    determiner: 'SOME',
    tone: 'Positive / Indefinite Quantity',
    example: 'The registry has received some confidential representations from advocates.',
    explanation: 'Positive factual statements mein indefinite number ya amount denote karne ke liye "SOME" standardly use hota hai.',
    trapNote: 'Affirmative sentence mein bina choice-giving context ke "any" lagana unnatural hota hai.'
  },
  {
    id: 'negative',
    title: '2. Explicit Negative Statement (not, without, hardly)',
    speechAct: 'Negative Proposition',
    determiner: 'ANY',
    tone: 'Non-assertive / Zero Expectation',
    example: 'The investigation team did not find any incriminating documents on the premises.',
    explanation: 'Negative particle "not" ya negative adverbs ("hardly", "barely", "scarcely", "without") ke sath "ANY" lagana mandatory hota hai.',
    trapNote: 'Negative statement mein "*did not find some documents" likhna strict blunder hai.'
  },
  {
    id: 'neutral-question',
    title: '3. Neutral Information-Seeking Question',
    speechAct: 'Pure Inquiry (Yes/No Open)',
    determiner: 'ANY',
    tone: 'Neutral / No Prior Expectation',
    example: 'Are there any procedural objections from the respondents regarding this date?',
    explanation: 'Jab speaker ko answer ka koi andaza na ho aur wo sirf factual inquiry kar raha ho, toh interrogative sentence mein "ANY" lagta hai.',
    trapNote: 'Agar inquiry purely neutral hai, toh "any" aayega.'
  },
  {
    id: 'polite-offer',
    title: '4. Polite Offer or Hospitality (High Court Exam Hotspot)',
    speechAct: 'Offer of Food / Drink / Hospitality',
    determiner: 'SOME',
    tone: 'Hospitable / Expected Answer is "Yes"',
    example: 'Would you like some tea or coffee while the bench prepares the decree?',
    explanation: 'Interrogative sentence hone ke bawajood, jab speaker samne wale ko hospitable offer deta hai jisme "Yes" expected ho, toh HAMESHA "SOME" aayega!',
    trapNote: 'Candidates question mark dekh kar "*Would you like any tea?" mark kar dete hain, jo examination trap hai.'
  },
  {
    id: 'polite-request',
    title: '5. Polite Request for Assistance or Goods',
    speechAct: 'Courteous Solicitation',
    determiner: 'SOME',
    tone: 'Appealing / Expecting Agreement',
    example: 'Could you please grant me some time to file the amended rejoinder?',
    explanation: 'Jab speaker samne wale se kisi cheez ki maang politely karta hai ("Could you...", "May I have..."), toh affirmative response expect karke "SOME" use hota hai.',
    trapNote: '"*Could you lend me any money?" bolna unnatural aur inappropriate hota hai.'
  },
  {
    id: 'any-choice',
    title: '6. Affirmative Meaning "It Does Not Matter Which"',
    speechAct: 'Open Eligibility / Universal Access',
    determiner: 'ANY',
    tone: 'Unrestricted / Freedom of Selection',
    example: 'Any eligible candidate with a law degree may apply for the post of judicial assistant.',
    explanation: 'Jab affirmative sentence mein speaker ye assert kare ki "koi sa bhi / koi bhi person chalega" (no restrictions), toh affirmative mein bhi "ANY" use hota hai!',
    trapNote: 'School rule "any sirf negative mein lagta hai" yahan fail ho jata hai. "Any" choice express karne ke liye positive sentence mein perfect hai.'
  },
  {
    id: 'conditional',
    title: '7. Conditional Clauses (If / In case of)',
    speechAct: 'Hypothetical Condition',
    determiner: 'ANY',
    tone: 'Contingent Possibility',
    example: 'If there are any errors in the cause-list, notify the bench reader immediately.',
    explanation: '"If" clause ke andar possible discrepancy ya error ko refer karte waqt standard determiner "ANY" lagta hai.',
    trapNote: 'Conditional clauses naturally take "ANY".'
  }
]

export default function SomeAnyContextGuide() {
  const [activeSituationId, setActiveSituationId] = useState('polite-offer')
  const activeSituation = CONTEXT_SITUATIONS.find((s) => s.id === activeSituationId) || CONTEXT_SITUATIONS[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
            <HelpCircle size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Interactive Some vs Any Context & Speech-Act Engine
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Moving beyond simplistic textbook rules: How speaker intention and communicative context decide between Some and Any.
            </p>
          </div>
        </div>
        <Badge variant="primary" size="sm">Pragmatics Engine</Badge>
      </div>

      {/* Situation Selector Carousel */}
      <div className="flex flex-wrap gap-1.5">
        {CONTEXT_SITUATIONS.map((sit) => {
          const isSelected = sit.id === activeSituationId
          return (
            <button
              key={sit.id}
              type="button"
              onClick={() => setActiveSituationId(sit.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200'
              }`}
            >
              {sit.title.split('. ')[1] || sit.title}
            </button>
          )
        })}
      </div>

      {/* Main Analysis Stage */}
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
          <div>
            <span className="text-[0.6875rem] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              {activeSituation.speechAct}
            </span>
            <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              {activeSituation.title}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500 dark:text-surface-400">Mandatory Determiner:</span>
            <span className={`px-3 py-1 rounded-lg text-sm font-extrabold text-white shadow-xs ${
              activeSituation.determiner === 'SOME' ? 'bg-primary-600' : 'bg-amber-600'
            }`}>
              {activeSituation.determiner}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Contextual Sentence:</span>
            <p className="text-xs font-medium text-surface-900 dark:text-surface-50 italic">
              "{activeSituation.example}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1.5">
            <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">High Court Exam Trap Warning:</span>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
              ⚠️ {activeSituation.trapNote}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-1">
          <span className="text-[0.6875rem] font-bold text-surface-400 uppercase">Grammatical Rationale:</span>
          <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
            {activeSituation.explanation}
          </p>
        </div>
      </div>
    </Card>
  )
}
