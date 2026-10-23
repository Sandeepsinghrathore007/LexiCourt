import { useState } from 'react'
import { Layers, Check, X } from 'lucide-react'
import { Card, Badge } from '../../common'

const DUAL_USAGE_WORDS = [
  {
    word: 'Paper',
    uncountable: {
      meaning: 'Raw writing/printing material (kagaz ki mass)',
      example: 'The legal brief is printed on bond paper.',
      allowed: 'some paper, much paper, a sheet of paper',
      prohibited: '*a paper, *many papers'
    },
    countable: {
      meaning: 'Newspaper, academic thesis, or official document',
      example: 'The senior counsel published a paper on constitutional review.',
      allowed: 'a paper, two papers, several papers',
      prohibited: 'bina article ke akele singular paper'
    }
  },
  {
    word: 'Glass',
    uncountable: {
      meaning: 'Brittle transparent substance (kaanch)',
      example: 'The courtroom window is made of reinforced glass.',
      allowed: 'much glass, shards of glass, broken glass',
      prohibited: '*a glass (for substance)'
    },
    countable: {
      meaning: 'Drinking container (pani peene ka glass)',
      example: 'The clerk offered the judge a glass of cold water.',
      allowed: 'a glass, three glasses, several glasses',
      prohibited: 'pluralizing raw substance'
    }
  },
  {
    word: 'Room',
    uncountable: {
      meaning: 'Unoccupied space or capacity (jagah / sthan)',
      example: 'Is there room for one more advocate at the counsel table?',
      allowed: 'much room, some room, enough room',
      prohibited: '*a room (when meaning space)'
    },
    countable: {
      meaning: 'Walled chamber or partitioned section (kamra)',
      example: 'The chamber contains four consultation rooms.',
      allowed: 'a room, two rooms, many rooms',
      prohibited: 'treating physical room as mass'
    }
  },
  {
    word: 'Hair',
    uncountable: {
      meaning: 'Entire collection of hair on human head (sar ke baal)',
      example: 'The senior advocate has thick grey hair.',
      allowed: 'much hair, black hair, his hair is',
      prohibited: '*hairs (for whole head), *a hair'
    },
    countable: {
      meaning: 'Individual single strands (ek ya do baal)',
      example: 'The forensic inspector discovered two white hairs on the coat.',
      allowed: 'a hair, two hairs, a few hairs',
      prohibited: 'using singular for multiple strands'
    }
  },
  {
    word: 'Work',
    uncountable: {
      meaning: 'General occupational labour or pending tasks (kaam)',
      example: 'The registry staff has much work to complete before 5 PM.',
      allowed: 'much work, a lot of work, hard work',
      prohibited: '*a work (for daily job), *many works'
    },
    countable: {
      meaning: 'Literary composition or artistic masterpiece (kriti)',
      example: 'Shakespeare produced many immortal works of dramatic literature.',
      allowed: 'a work of art, multiple works',
      prohibited: 'using "a work" for routine office tasks'
    }
  }
]

const EXAM_UNCOUNTABLES = [
  { noun: 'Advice', wrong: '*an advice, *advices', correct: 'some advice, a piece of advice', rule: 'Salah mass concept hai; "a piece of advice" use karein.' },
  { noun: 'Information', wrong: '*an information, *informations', correct: 'much information, pieces of info', rule: 'Jankari countable nahi hoti; "much information" use karein.' },
  { noun: 'Furniture', wrong: '*a furniture, *furnitures', correct: 'items of furniture, new furniture', rule: 'Chairs/tables countable hain, par "furniture" collection mass hai.' },
  { noun: 'Equipment', wrong: '*an equipment, *equipments', correct: 'pieces of equipment, modern equipment', rule: 'Saman/upkaran uncountable hai; plural "-s" prohibited hai.' },
  { noun: 'Luggage', wrong: '*a luggage, *luggages', correct: 'much luggage, bags/suitcases', rule: 'Bags countable hain, lekin aggregate "luggage" mass noun hai.' },
  { noun: 'Machinery', wrong: '*a machinery, *machineries', correct: 'heavy machinery, pieces of machinery', rule: 'Machines countable hain, par "machinery" abstract collection hai.' },
  { noun: 'Scenery', wrong: '*a scenery, *sceneries', correct: 'breathtaking scenery, scenic views', rule: 'Drishya aggregate hai; "*sceneries of Kashmir" strict error hai.' },
  { noun: 'Money', wrong: '*many moneys, *a money', correct: 'much money, rupees/dollars', rule: 'Currencies (rupees, dollars) countable hain; "money" mass hai.' }
]

export default function CountableUncountableGuide() {
  const [activeTab, setActiveTab] = useState('dual') // 'dual' | 'uncountables' | 'matrix'
  const [selectedWordIdx, setSelectedWordIdx] = useState(0)

  const activeWord = DUAL_USAGE_WORDS[selectedWordIdx]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Countable vs Uncountable Noun Guide & Dual-Usage Explorer
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-300">
              Master the countability boundary that governs A/An, Few/Little, and Much/Many quantifiers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('dual')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dual'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            Dual-Usage Words
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('uncountables')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'uncountables'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            High-Yield Uncountables
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            Determiner Compatibility
          </button>
        </div>
      </div>

      {/* Tab 1: Dual Usage Words */}
      {activeTab === 'dual' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-surface-500 dark:text-surface-400">Select Noun:</span>
            {DUAL_USAGE_WORDS.map((w, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedWordIdx(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  idx === selectedWordIdx
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200'
                }`}
              >
                {w.word}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Uncountable Sense */}
            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[0.6875rem] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                  UNCOUNTABLE MASS SENSE
                </span>
                <span className="text-xs font-mono font-bold text-surface-400">Much / Some / Ø</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                {activeWord.word}: {activeWord.uncountable.meaning}
              </h4>
              <p className="text-xs text-surface-700 dark:text-surface-300 italic bg-white dark:bg-surface-850 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                "{activeWord.uncountable.example}"
              </p>
              <div className="space-y-1 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-success-700 dark:text-success-400">
                  <Check size={14} className="shrink-0" />
                  <span>Valid: {activeWord.uncountable.allowed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-error-700 dark:text-error-400">
                  <X size={14} className="shrink-0" />
                  <span>Blunder: {activeWord.uncountable.prohibited}</span>
                </div>
              </div>
            </div>

            {/* Countable Sense */}
            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[0.6875rem] font-bold bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 border border-primary-300">
                  COUNTABLE DISCRETE SENSE
                </span>
                <span className="text-xs font-mono font-bold text-surface-400">A / An / Many / Plural -s</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                {activeWord.word}: {activeWord.countable.meaning}
              </h4>
              <p className="text-xs text-surface-700 dark:text-surface-300 italic bg-white dark:bg-surface-850 p-2.5 rounded-lg border border-surface-200 dark:border-surface-700">
                "{activeWord.countable.example}"
              </p>
              <div className="space-y-1 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-success-700 dark:text-success-400">
                  <Check size={14} className="shrink-0" />
                  <span>Valid: {activeWord.countable.allowed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-error-700 dark:text-error-400">
                  <X size={14} className="shrink-0" />
                  <span>Blunder: {activeWord.countable.prohibited}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: High Yield Uncountables */}
      {activeTab === 'uncountables' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {EXAM_UNCOUNTABLES.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-850 space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <h5 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-50">
                  {item.noun}
                </h5>
                <Badge variant="error" size="sm">No A/An</Badge>
              </div>
              <div className="text-[0.6875rem] text-error-600 dark:text-error-400 font-mono">
                {item.wrong}
              </div>
              <div className="text-[0.6875rem] text-success-700 dark:text-success-400 font-mono font-bold">
                ✓ {item.correct}
              </div>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400 leading-tight pt-1 border-t border-surface-100 dark:border-surface-750">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Determiner Compatibility Matrix */}
      {activeTab === 'matrix' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                <th className="p-2.5 font-bold text-surface-800 dark:text-surface-200">Determiner Category</th>
                <th className="p-2.5 font-bold text-surface-800 dark:text-surface-200">Singular Countable</th>
                <th className="p-2.5 font-bold text-surface-800 dark:text-surface-200">Plural Countable</th>
                <th className="p-2.5 font-bold text-surface-800 dark:text-surface-200">Uncountable Mass</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-750">
              <tr>
                <td className="p-2.5 font-medium">A / An</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ a judge / an hour</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *a books</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *an advice</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Much</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *much book</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *much books</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ much patience</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Many</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *many book</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ many advocates</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *many information</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Few / A few / The few</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *few witness</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ a few witnesses</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *a few milk</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Little / A little / The little</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *a little file</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *a little files</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ a little water</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Some / Any</td>
                <td className="p-2.5 text-surface-400">Rare ('some lawyer')</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ some books / any books</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ some milk / any milk</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium">Each / Every / Either / Neither</td>
                <td className="p-2.5 text-success-700 dark:text-success-400 font-bold">✓ each student</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *each students</td>
                <td className="p-2.5 text-error-600 font-bold">✗ *each patience</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
