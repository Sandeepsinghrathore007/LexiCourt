import { useState } from 'react'
import { Card, Badge } from '../../common'

const DISTRACTOR_TYPES = [
  {
    id: 'prep',
    name: 'Prepositional Phrases ("Of / In / For")',
    color: 'border-primary-300 dark:border-primary-700 bg-primary-50/30 dark:bg-primary-950/20',
    description: 'Preposition ke baad aane wala noun preposition ka OBJECT hota hai. Ye verb se agree nahi kar sakta.',
    examples: [
      {
        text: 'The box of confidential FIR documents ___ missing.',
        head: 'The box (Singular)',
        distractor: 'of confidential FIR documents (Plural Object)',
        correctVerb: 'is / was',
        wrongVerb: 'are / were'
      },
      {
        text: 'The speed of these typing test candidates ___ impressive.',
        head: 'The speed (Singular)',
        distractor: 'of these typing test candidates (Plural Object)',
        correctVerb: 'is / was',
        wrongVerb: 'are / were'
      }
    ]
  },
  {
    id: 'parenthetical',
    name: 'Parenthetical Connectives ("Along with / As well as")',
    color: 'border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-amber-950/20',
    description: '"Along with", "as well as", "together with" coordinate "and" nahi hain. Verb FIRST SUBJECT se match karti hai.',
    examples: [
      {
        text: 'The Registrar, as well as several junior clerks, ___ in the hall.',
        head: 'The Registrar (Subject 1: Singular)',
        distractor: ', as well as several junior clerks,',
        correctVerb: 'is / was',
        wrongVerb: 'are / were'
      },
      {
        text: 'The computer technicians, along with the supervisor, ___ on duty.',
        head: 'The computer technicians (Subject 1: Plural)',
        distractor: ', along with the supervisor,',
        correctVerb: 'are / were',
        wrongVerb: 'is / was'
      }
    ]
  },
  {
    id: 'participial',
    name: 'Participial & Appositive Modifiers ("Containing / Appointed")',
    color: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/20',
    description: 'Participle phrases (V-ing / V3) subject ko describe karte hain lekin subject ka number alter nahi karte.',
    examples: [
      {
        text: 'The petition, containing voluminous handwritten annexures, ___ accepted.',
        head: 'The petition (Singular)',
        distractor: ', containing voluminous handwritten annexures,',
        correctVerb: 'was',
        wrongVerb: 'were'
      },
      {
        text: 'Mr. Joshi, the advocate representing fifteen accused persons, ___ arrived.',
        head: 'Mr. Joshi (Singular)',
        distractor: ', the advocate representing fifteen accused persons,',
        correctVerb: 'has',
        wrongVerb: 'have'
      }
    ]
  }
]

export default function DistractorPhrasesInspector() {
  const [activeType, setActiveType] = useState('prep')

  const currentDistractor = DISTRACTOR_TYPES.find((d) => d.id === activeType) || DISTRACTOR_TYPES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Visual Engine 4</Badge>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Syntactic Noise Filter
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
          Structure Map for Common Distractor Phrases
        </h3>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
          Subject aur verb ke beech aane wale 3 major distractor patterns ko identify aur mentally isolate karein.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {DISTRACTOR_TYPES.map((dt) => (
          <button
            key={dt.id}
            type="button"
            onClick={() => setActiveType(dt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeType === dt.id
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {dt.name.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Active Distractor Analysis View */}
      <div className={`p-6 rounded-2xl border ${currentDistractor.color} space-y-6`}>
        <div className="space-y-1">
          <h4 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            {currentDistractor.name}
          </h4>
          <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
            {currentDistractor.description}
          </p>
        </div>

        {/* Examples Cards */}
        <div className="space-y-3">
          {currentDistractor.examples.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3 shadow-xs"
            >
              <div className="text-sm font-heading font-bold text-surface-900 dark:text-surface-100">
                "{item.text}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800">
                  <span className="text-[0.625rem] font-bold text-primary-700 dark:text-primary-300 block uppercase">
                    True Subject
                  </span>
                  <span className="font-bold text-primary-950 dark:text-primary-100">
                    {item.head}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700/60 border border-surface-200 dark:border-surface-600">
                  <span className="text-[0.625rem] font-bold text-surface-500 dark:text-surface-400 block uppercase">
                    Distractor to Strip
                  </span>
                  <span className="line-through text-surface-600 dark:text-surface-300">
                    {item.distractor}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-success-50 dark:bg-success-950/60 border border-success-200 dark:border-success-800">
                  <span className="text-[0.625rem] font-bold text-success-700 dark:text-success-300 block uppercase">
                    Correct Verb
                  </span>
                  <span className="font-bold text-success-800 dark:text-success-200">
                    ✓ {item.correctVerb}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800">
                  <span className="text-[0.625rem] font-bold text-rose-700 dark:text-rose-300 block uppercase">
                    Exam Trap Verb
                  </span>
                  <span className="font-bold text-rose-800 dark:text-rose-300 line-through">
                    ✗ {item.wrongVerb}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
