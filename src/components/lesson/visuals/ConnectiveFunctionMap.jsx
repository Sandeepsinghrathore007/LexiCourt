import { useState } from 'react'
import { GitFork, AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const RELATIONSHIPS = [
  {
    id: 'contrast',
    label: 'Contrast & Virodh',
    color: 'amber',
    coreMeaning: 'Do statements ya ideas ke beech direct opposition ya unexpected difference dikhana.',
    connectives: [
      { name: 'but', type: 'Coordinating Conjunction (FANBOYS)', structure: '[Clause 1] , but [Clause 2]', example: 'The witness appeared confident, but his testimony had several discrepancies.' },
      { name: 'however', type: 'Conjunctive Adverb', structure: '[Clause 1] ; however, [Clause 2]', example: 'The applicant filed the appeal; however, the limitation period had already expired.' },
      { name: 'whereas / while', type: 'Subordinating Conjunction', structure: '[Clause 1] , whereas [Clause 2]', example: 'Civil suits decide property rights, whereas criminal trials determine penal liability.' },
      { name: 'on the other hand', type: 'Transition Expression', structure: '; on the other hand, [Clause 2]', example: 'The defense argued self-defense; on the other hand, the prosecution proved premeditation.' }
    ],
    examTip: "Examiner 'however' ko coordinating conjunction ki tarah sirf comma se jodh kar comma splice trap banata hai. Semicolon zaroor check karein (; however,)."
  },
  {
    "id": 'concession',
    label: 'Concession & Apeksha Viprit',
    color: 'primary',
    coreMeaning: 'Ek hurdle ya surprising fact ke bawajood hone wale outcome ko admit karna.',
    connectives: [
      { name: 'although / even though', type: 'Subordinating Conjunction (Takes Clause)', structure: 'Although + [Subject + Finite Verb] , [Main Clause]', example: 'Although the evidence was circumstantial, the judge convicted the accused.' },
      { name: 'despite / in spite of', type: 'Preposition (Takes Noun Phrase / -ing)', structure: 'Despite + [Noun Phrase / V-ing] , [Main Clause]', example: 'Despite the advocate\'s fierce opposition, bail was granted to the co-accused.' },
      { name: 'nevertheless / nonetheless', type: 'Conjunctive Adverb', structure: '[Clause 1] ; nevertheless, [Clause 2]', example: 'The statutory deadline had passed; nevertheless, the registrar condoned the delay.' }
    ],
    examTip: "Double Contrast Ban: 'Although' se shuru hone wale sentence mein 'but' lagana strictly prohibited hai. Sath hi, 'Despite' ke baad kabhi 'of' nahi lagta."
  },
  {
    id: 'cause',
    label: 'Cause & Reason (Karan)',
    color: 'success',
    coreMeaning: 'Action kyun hua uska underlying justification ya evidence batana.',
    connectives: [
      { name: 'because', type: 'Subordinating Conjunction (Takes Clause)', structure: '[Main Clause] because [Subject + Verb]', example: 'The court adjourned the hearing because the defense counsel was indisposed.' },
      { name: 'since / as', type: 'Subordinating Conjunction', structure: 'Since [Subject + Verb] , [Main Clause]', example: 'Since no prima facie case was established, the FIR was quashed.' },
      { name: 'because of / due to', type: 'Preposition (Takes Noun Phrase)', structure: '[Main Clause] because of [Noun Phrase]', example: 'The judgment was delayed because of procedural bottlenecks.' }
    ],
    examTip: "'The reason why... was because' pleonasm error hai. 'The reason why... was THAT' use karein."
  },
  {
    id: 'result',
    label: 'Result & Consequence (Nateeja)',
    color: 'danger',
    coreMeaning: 'Kisi ghatna ya action ka direct parinam express karna.',
    connectives: [
      { name: 'so', type: 'Coordinating Conjunction (FANBOYS)', structure: '[Clause 1] , so [Clause 2]', example: 'The appellant failed to cure filing defects, so the petition was dismissed.' },
      { name: 'therefore / consequently', type: 'Conjunctive Adverb', structure: '[Clause 1] ; therefore, [Clause 2]', example: 'The key witness turned hostile; therefore, the prosecution sought an adjournment.' },
      { name: 'thus / hence', type: 'Conjunctive Adverb', structure: '[Clause 1] ; thus, [Clause 2]', example: 'The contract lacked lawful consideration; thus, it was rendered void ab initio.' }
    ],
    examTip: "Cause aur Result ka direction invert mat karein: Pehla fact karan hai toh doosre ke pehle 'so/therefore' aayega, 'because' nahi."
  },
  {
    id: 'purpose',
    label: 'Purpose (Uddeshya)',
    color: 'secondary',
    coreMeaning: 'Action ke piche ka intention, aim ya goal batana.',
    connectives: [
      { name: 'so that / in order that', type: 'Subordinating Conjunction (Takes Clause + Modal)', structure: '[Main Clause] so that [Subject + can/could/would + Verb]', example: 'The registry digitized old records so that files would be instantly searchable.' },
      { name: 'in order to / so as to', type: 'Infinitive Structure (Takes V1)', structure: '[Main Clause] in order to [V1]', example: 'The advocate filed a caveat in order to prevent an ex-parte interim order.' },
      { name: 'lest', type: 'Subordinating Conjunction (Takes should / bare subjunctive)', structure: '[Clause 1] lest [Subject + should + V1]', example: 'The clerk verified the list lest any active matter should be omitted.' }
    ],
    examTip: "'Lest' ke clause mein 'not' lagana prohibited hai kyunki 'lest' mein negative sense inherent hota hai ('lest he should fail', NOT *lest he should not fail)."
  },
  {
    id: 'condition',
    label: 'Condition & Shart',
    color: 'neutral',
    coreMeaning: 'Action ke trigger hone ke liye zaroori condition ya boundary set karna.',
    connectives: [
      { name: 'if / provided that', type: 'Conditional Conjunction', structure: 'If [Present Clause] , [Future Main Clause]', example: 'If the petitioner deposits the court fee today, the matter will be listed tomorrow.' },
      { name: 'unless', type: 'Negative Conditional (if not)', structure: 'Unless [Positive Clause] , [Main Clause]', example: 'You cannot inspect court records unless you obtain prior permission from the bench.' },
      { name: 'in case', type: 'Precautionary Conjunction', structure: '[Main Action] in case [Event Occurs]', example: 'Keep a physical stamp paper in case the e-stamp gateway goes offline.' }
    ],
    examTip: "'Unless' ke sath kabhi 'not' nahi lagta (Double Negative Trap). 'In case' precautionary measure dikhata hai jo pehle se ready rakha jata hai."
  }
]

export default function ConnectiveFunctionMap() {
  const [activeTab, setActiveTab] = useState('contrast')

  const currentRel = RELATIONSHIPS.find((r) => r.id === activeTab) || RELATIONSHIPS[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              <GitFork size={16} />
            </span>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Visual Map 1: Connective Functions & Logical Relationships
            </h3>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Har category ke connectives, unke structural formulas aur natural exam sentences ko compare karein
          </p>
        </div>
        <Badge variant="primary" size="sm">
          {RELATIONSHIPS.length} Core Relationships
        </Badge>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {RELATIONSHIPS.map((rel) => {
          const isActive = rel.id === activeTab
          return (
            <button
              key={rel.id}
              type="button"
              onClick={() => setActiveTab(rel.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-200 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200/50 dark:hover:bg-surface-700/60'
              }`}
            >
              {rel.label}
            </button>
          )
        })}
      </div>

      {/* Active Relationship Card */}
      <div className="space-y-4">
        <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700">
          <p className="text-xs text-surface-700 dark:text-surface-300 font-medium leading-relaxed">
            <strong className="text-surface-900 dark:text-white">Core Meaning: </strong>
            {currentRel.coreMeaning}
          </p>
        </div>

        {/* Connectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentRel.connectives.map((conn, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-sm text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded border border-primary-200 dark:border-primary-800">
                  {conn.name}
                </span>
                <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 font-medium">
                  {conn.type}
                </span>
              </div>

              <div className="p-2 rounded bg-surface-50 dark:bg-surface-800/80 font-mono text-[0.6875rem] text-surface-800 dark:text-surface-200 border border-surface-100 dark:border-surface-700">
                {conn.structure}
              </div>

              <p className="text-xs text-surface-600 dark:text-surface-300 italic leading-relaxed">
                "{conn.example}"
              </p>
            </div>
          ))}
        </div>

        {/* High Court Exam Tip Banner */}
        <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle size={15} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Rajasthan High Court Exam Tip:</strong>
            <p className="leading-relaxed">{currentRel.examTip}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
