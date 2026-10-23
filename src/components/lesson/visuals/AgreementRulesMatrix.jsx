import { useState } from 'react'
import { Card, Badge } from '../../common'

const MATRIX_CATEGORIES = [
  {
    category: 'Strictly Singular Concord',
    badgeVariant: 'primary',
    rules: [
      {
        pattern: 'Distributive Pronouns',
        formula: 'Each / Every / Either of / Neither of + Plural Noun',
        verb: 'Singular (is, was, has, V_s)',
        example: 'Each of the candidates has submitted their documents.',
        reason: 'Focus individual elements par hota hai, collective count par nahi.'
      },
      {
        pattern: 'Measurements & Distance as a Unit',
        formula: 'Ten miles / Five thousand rupees / Two hours',
        verb: 'Singular (is, was, has)',
        example: 'Ten kilometres is a long distance to walk.',
        reason: 'Quantity ko ek single whole lump sum ke roop mein treat kiya jata hai.'
      },
      {
        pattern: 'Plural-Form Titles & Disciplines',
        formula: 'Gulliver\'s Travels / Mathematics / Physics / Measles',
        verb: 'Singular (is, was, has)',
        example: 'Mathematics is an exact scientific discipline.',
        reason: 'Outer form mein "s" hai par entity single creative work ya academic subject hai.'
      },
      {
        pattern: 'The Number of',
        formula: 'The number of + Plural Noun',
        verb: 'Singular (is, was, has)',
        example: 'The number of cyber complaints is increasing.',
        reason: 'True grammatical subject word "The number" (singular count) hai.'
      },
      {
        pattern: 'Many a + Singular Noun',
        formula: 'Many a + Singular Noun',
        verb: 'Singular (is, was, has, V_s)',
        example: 'Many a candidate has failed due to speed deficit.',
        reason: 'Grammatical singular form semantic plural meaning ko override karti hai.'
      }
    ]
  },
  {
    category: 'Strictly Plural Concord',
    badgeVariant: 'secondary',
    rules: [
      {
        pattern: 'Compound Subjects with "AND"',
        formula: 'Entity 1 AND Entity 2',
        verb: 'Plural (are, were, have, V1)',
        example: 'The advocate and the client are waiting outside.',
        reason: 'Do alag-alag entities milkar plural subject banate hain.'
      },
      {
        pattern: 'Plural Indefinite Pronouns',
        formula: 'Both / Few / A few / Many / Several / Others',
        verb: 'Plural (are, were, have, V1)',
        example: 'Several of the files were misplaced during transit.',
        reason: 'Ye words inherently discrete countable group ko represent karte hain.'
      },
      {
        pattern: 'A Number of',
        formula: 'A number of + Plural Noun',
        verb: 'Plural (are, were, have, V1)',
        example: 'A number of judicial assistants are undergoing training.',
        reason: 'Idiomatic meaning "many/several" hota hai, focus plural items par hai.'
      },
      {
        pattern: 'Post-Posed Each',
        formula: 'Plural Noun + each',
        verb: 'Plural (have, are, were)',
        example: 'The students each have a computer workstation.',
        reason: 'True subject plural noun hai; "each" sirf appositive modifier hai.'
      }
    ]
  },
  {
    category: 'Proximity & First-Subject Concord',
    badgeVariant: 'neutral',
    rules: [
      {
        pattern: 'Correlatives: Proximity Rule',
        formula: 'Either/Neither [S1] or/nor [S2]',
        verb: 'Agrees with S2 (Nearer Subject)',
        example: 'Neither the clerk nor the judges were present.',
        reason: 'Verb apne physically closest subject se agree karti hai.'
      },
      {
        pattern: 'Parenthetical: First-Subject Rule',
        formula: '[S1] as well as / along with [S2]',
        verb: 'Agrees with S1 (First Subject)',
        example: 'The Judge, as well as the clerks, was commended.',
        reason: 'Parenthetical phrase coordinate addition nahi karta, S1 governs verb.'
      },
      {
        pattern: 'SANAM Variable Complement',
        formula: 'Some/All/None/Most of + [Noun]',
        verb: 'Uncountable ➔ Singular | Plural ➔ Plural',
        example: 'All of the evidence was verified / All of the clerks were present.',
        reason: 'Complement noun ka countability status verb ko dictate karta hai.'
      },
      {
        pattern: 'Relative Clause Antecedent',
        formula: 'One of the [Plural Noun] + who',
        verb: 'Plural (Matches Antecedent)',
        example: 'He is one of those advocates who have argued cases.',
        reason: 'Relative pronoun "who" theek pehle aane wale plural noun ko refer karta hai.'
      }
    ]
  }
]

export default function AgreementRulesMatrix() {
  const [activeTab, setActiveTab] = useState(0)

  const activeGroup = MATRIX_CATEGORIES[activeTab]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700 shadow-xs">
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Visual Engine 3</Badge>
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
            Tripartite Concord Framework
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
          Agreement Rules Matrix: Singular, Plural & Proximity
        </h3>
        <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
          Teeno core agreement patterns ke structural formulas aur standard exam examples ka comprehensive comparison.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {MATRIX_CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === idx
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Rules Table Viewport */}
      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-100 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-bold uppercase tracking-wider font-mono">
            <tr>
              <th className="p-3 w-1/4">Syntactic Pattern</th>
              <th className="p-3 w-1/4">Grammar Formula</th>
              <th className="p-3 w-1/6">Verb Number</th>
              <th className="p-3 w-1/3">Exam Context Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200 dark:divide-surface-700 bg-white dark:bg-surface-850">
            {activeGroup.rules.map((rule, idx) => (
              <tr key={idx} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                <td className="p-3 font-bold text-surface-900 dark:text-surface-100">
                  {rule.pattern}
                  <span className="block text-[0.6875rem] font-normal text-surface-500 dark:text-surface-400 mt-0.5">
                    {rule.reason}
                  </span>
                </td>
                <td className="p-3 font-mono text-[0.75rem] text-primary-800 dark:text-primary-200 bg-primary-50/30 dark:bg-primary-950/20">
                  {rule.formula}
                </td>
                <td className="p-3 font-bold text-surface-800 dark:text-surface-200">
                  <Badge variant={activeGroup.badgeVariant} size="sm">
                    {rule.verb}
                  </Badge>
                </td>
                <td className="p-3 text-surface-700 dark:text-surface-300 italic">
                  "{rule.example}"
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
