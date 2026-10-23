import { useState } from 'react'
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const RHETORICAL_ITEMS = [
  {
    id: 'item-1',
    category: 'Everyone ➔ Who does not',
    statement: 'Everyone respects an upright and honest judge.',
    statementPolarity: 'Positive (+)',
    question: 'Who does not respect an upright and honest judge?',
    questionPolarity: 'Negative Question (-)',
    unanimousAnswer: 'Nobody! That means EVERYONE respects an upright judge.',
    examNote: 'Positive statement negative rhetorical question banta hai. Agar "Who respects...?" likha toh meaning ulta ho jayega.',
  },
  {
    id: 'item-2',
    category: 'No one ➔ Who can',
    statement: 'No one can challenge the sovereign judgment of the Supreme Court.',
    statementPolarity: 'Negative (-)',
    question: 'Who can challenge the sovereign judgment of the Supreme Court?',
    questionPolarity: 'Positive Question (+)',
    unanimousAnswer: 'No one can! That means NOBODY has the power to challenge it.',
    examNote: 'Negative statement positive rhetorical question banta hai. Question mein extra "not" mat lagayein.',
  },
  {
    id: 'item-3',
    category: 'Never ➔ Can ever',
    statement: 'A true patriot will never betray his nation.',
    statementPolarity: 'Negative (-)',
    question: 'Will a true patriot ever betray his nation?',
    questionPolarity: 'Positive Question (+)',
    unanimousAnswer: 'Never! That means a true patriot will NEVER betray his nation.',
    examNote: '"Never" badal kar "ever" ban jata hai aur modal auxiliary "will" aage invert ho jati hai.',
  },
  {
    id: 'item-4',
    category: 'Nothing ➔ Can anything',
    statement: 'Nothing is more valuable than personal liberty.',
    statementPolarity: 'Negative (-)',
    question: 'Is anything more valuable than personal liberty?',
    questionPolarity: 'Positive Question (+)',
    unanimousAnswer: 'Nothing is! Liberty is supreme.',
    examNote: 'Negative determiner "Nothing" non-assertive pronoun "anything" mein invert hota hai.',
  },
]

export default function RhetoricalQuestionEquivalence() {
  const [activeItemId, setActiveItemId] = useState('item-1')
  const [revealedAnswer, setRevealedAnswer] = useState(false)

  const current = RHETORICAL_ITEMS.find((it) => it.id === activeItemId) || RHETORICAL_ITEMS[0]

  const handleSelect = (id) => {
    setActiveItemId(id)
    setRevealedAnswer(false)
  }

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 shadow-sm space-y-5 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Spatial Model 4</Badge>
            <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
              Rhetorical Equivalence Engine
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-surface-900 dark:text-surface-50">
            Statement to Rhetorical Question Equivalence
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5 max-w-[80ch]">
            The Golden Polarity Law: Positive assertion negative question banta hai aur negative assertion positive question banta hai.
          </p>
        </div>
      </div>

      {/* Item Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {RHETORICAL_ITEMS.map((item) => {
          const isActive = item.id === activeItemId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-500 shadow-xs ring-2 ring-primary-500/20'
                  : 'bg-white dark:bg-surface-800/80 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
            >
              <span className={`text-xs font-bold block mb-0.5 ${isActive ? 'text-primary-800 dark:text-primary-200' : 'text-surface-800 dark:text-surface-200'}`}>
                {item.category.split('➔')[0]}
              </span>
              <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 truncate block">
                ➔ {item.category.split('➔')[1]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Comparison Board */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-4">
        {/* Polarity Reversal Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Assertive Statement */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider">
                Assertive Statement
              </span>
              <Badge variant={current.statementPolarity.includes('+') ? 'primary' : 'neutral'} size="sm">
                {current.statementPolarity}
              </Badge>
            </div>
            <p className="font-mono text-xs font-bold text-surface-900 dark:text-surface-100">
              "{current.statement}"
            </p>
          </div>

          {/* Rhetorical Question */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Rhetorical Question
              </span>
              <Badge variant={current.questionPolarity.includes('+') ? 'primary' : 'neutral'} size="sm">
                {current.questionPolarity}
              </Badge>
            </div>
            <p className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300">
              "{current.question}"
            </p>
          </div>
        </div>

        {/* Conversational Answer Test Simulator */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-surface-800 dark:text-surface-100">
              <MessageSquare size={15} className="text-primary-600 dark:text-primary-400" />
              <span>The Conversational Verification Test:</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRevealedAnswer((prev) => !prev)}
            >
              {revealedAnswer ? 'Hide Implied Response' : 'Test Obvious Response'}
            </Button>
          </div>

          <p className="text-xs text-surface-600 dark:text-surface-300">
            Agar aap kisi public meeting ya court hall mein ye sawal poochein:
            <span className="font-mono font-bold text-primary-700 dark:text-primary-300 block mt-1">
              "{current.question}"
            </span>
          </p>

          {revealedAnswer && (
            <div className="p-3 rounded-lg bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-800 text-xs space-y-1 animate-fadeIn">
              <span className="font-bold text-success-800 dark:text-success-200 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-success-600 dark:text-success-400" />
                Unanimous Obvious Answer:
              </span>
              <p className="font-mono text-success-900 dark:text-success-100 pl-5">
                "{current.unanimousAnswer}"
              </p>
            </div>
          )}
        </div>

        {/* Exam Rationale Box */}
        <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800 text-xs text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 flex items-start gap-2">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-surface-900 dark:text-surface-100 mb-0.5">
              Polarity Law Exam Rule:
            </strong>
            <span>{current.examNote}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
