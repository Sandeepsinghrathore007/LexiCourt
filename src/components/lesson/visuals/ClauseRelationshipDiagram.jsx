import { useState } from 'react'
import { ArrowRight, GitFork, Sparkles } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

export default function ClauseRelationshipDiagram() {
  const [governingTense, setGoverningTense] = useState('past') // 'present' | 'past' | 'future'
  const [selectedSubRelation, setSelectedSubRelation] = useState('simultaneous') // 'simultaneous' | 'earlier' | 'later' | 'truth'

  const examples = {
    present: {
      main: 'The Chief Justice states',
      connective: 'that',
      subordinate: {
        simultaneous: {
          tense: 'Present Continuous / Simple',
          text: 'the special bench is hearing urgent petitions currently.',
          note: 'Contemporaneous event: naturally present progressive retain karta hai.',
        },
        earlier: {
          tense: 'Simple Past / Present Perfect',
          text: 'the committee submitted the compliance report yesterday.',
          note: 'Completed past event: time marker "yesterday" hone ki wajah se Simple Past retain karta hai.',
        },
        later: {
          tense: 'Simple Future',
          text: 'the recruitment notification will be published tomorrow.',
          note: 'Future intention: standard future (will + V1) use karta hai.',
        },
        truth: {
          tense: 'Simple Present',
          text: 'honesty is always the best policy.',
          note: 'Universal truth: Simple Present mein hi rehta hai.',
        },
      },
      status: 'Open Sequence Allowed',
      statusColor: 'success',
      ruleSummary: 'Present governing verb subordinate clause ko poori azaadi deta hai ki wo meaning ke mutabiq koi bhi tense chun sake.',
    },
    past: {
      main: 'The Chief Justice stated',
      connective: 'that',
      subordinate: {
        simultaneous: {
          tense: 'Past Continuous / Simple Past',
          text: 'the special bench was hearing urgent petitions at that time.',
          note: 'Past Harmony Law: Present continuous shift hokar Past Continuous (was hearing) banta hai.',
        },
        earlier: {
          tense: 'Past Perfect (had + V3)',
          text: 'the committee had submitted the report before the session began.',
          note: 'Anterior Past Event: Pehle complete hua action Past Perfect (had submitted) demand karta hai.',
        },
        later: {
          tense: 'Future-in-the-Past (would + V1)',
          text: 'the recruitment notification would be published the following week.',
          note: 'Posterior Projection: Will shift hokar WOULD ban jata hai (Future-in-the-Past).',
        },
        truth: {
          tense: 'Simple Present (Timeless)',
          text: 'the earth revolves round the sun.',
          note: 'EXCEPTION: Immutable scientific truths kabhi bhi past mein shift nahi hote.',
        },
      },
      status: 'Past Harmony Governed',
      statusColor: 'primary',
      ruleSummary: 'Past governing verb hone par subordinate actions corresponding past tense mein shift hote hain, jab tak ki koi universal ya scientific truth na ho.',
    },
    future: {
      main: 'The Chief Justice will announce',
      connective: 'that',
      subordinate: {
        simultaneous: {
          tense: 'Simple Present',
          text: 'all newly recruited candidates receive appointment letters.',
          note: 'Scheduled condition: Simple Present leta hai.',
        },
        earlier: {
          tense: 'Present Perfect',
          text: 'the committee has cleared all pending seniority disputes.',
          note: 'Prior completion: Future reference se dekhein toh Present Perfect use hota hai.',
        },
        later: {
          tense: 'Simple Future',
          text: 'the new judicial registry will operate from next month.',
          note: 'Future projection: Standard will + V1 use karta hai.',
        },
        truth: {
          tense: 'Simple Present',
          text: 'truth and justice prevail in the legal system.',
          note: 'Universal axiom: Simple Present mein hi rehta hai.',
        },
      },
      status: 'Open Sequence Allowed',
      statusColor: 'success',
      ruleSummary: 'Future governing verb open sequence banata hai, yahan mechanical backshifting ki zaroorat nahi hoti.',
    },
  }

  const current = examples[governingTense]
  const currentSub = current.subordinate[selectedSubRelation]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.625rem] font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-950/80 px-2 py-0.5 rounded">
              VISUAL MODEL 01
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">Syntactic Hierarchy</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-surface-50">
            Clause Hierarchy & Governing Temporal Anchor
          </h3>
        </div>

        <Badge variant={current.statusColor} size="sm">
          {current.status}
        </Badge>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Main clause sentence ke liye primary temporal anchor ka kaam karta hai. Niche governing tense buttons par click karke dekhein ki subordinate clause dynamically kaise respond karta hai:
      </p>

      {/* Governing Tense Selector Controls */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-surface-100 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700">
        <span className="text-xs font-bold text-surface-600 dark:text-surface-400 px-2 flex items-center gap-1.5">
          <GitFork size={14} className="text-primary-600 dark:text-primary-400" />
          <span>Governing Verb Tense:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {[
            { id: 'past', label: 'Past Tense (stated / said)' },
            { id: 'present', label: 'Present Tense (states / says)' },
            { id: 'future', label: 'Future Tense (will announce)' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={governingTense === item.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setGoverningTense(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Subordinate Temporal Relation Selector */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-surface-500 dark:text-surface-400 font-semibold mr-1">Time Relationship:</span>
        {[
          { id: 'simultaneous', label: '1. Simultaneous' },
          { id: 'earlier', label: '2. Earlier (Anterior)' },
          { id: 'later', label: '3. Later (Posterior)' },
          { id: 'truth', label: '4. Universal Truth' },
        ].map((rel) => (
          <button
            key={rel.id}
            type="button"
            onClick={() => setSelectedSubRelation(rel.id)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedSubRelation === rel.id
                ? 'bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-xs'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {rel.label}
          </button>
        ))}
      </div>

      {/* Interactive Clause Structure Visual Container */}
      <div className="p-4 md:p-6 rounded-2xl bg-surface-50 dark:bg-surface-900/90 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Main Clause Block */}
          <div className="md:col-span-4 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-primary-400 dark:border-primary-600 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                Principal (Main) Clause
              </span>
              <Badge variant="primary" size="sm">Anchor</Badge>
            </div>
            <p className="font-heading font-bold text-sm text-surface-900 dark:text-white">
              "{current.main}"
            </p>
            <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 block font-mono">
              Role: Reference Point banata hai
            </span>
          </div>

          {/* Connective Node */}
          <div className="md:col-span-2 flex flex-col items-center justify-center p-2 text-center">
            <span className="text-[0.625rem] uppercase font-bold text-surface-400 dark:text-surface-500 mb-1">
              Connective
            </span>
            <div className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center font-mono font-bold text-xs text-surface-800 dark:text-surface-200 border border-surface-300 dark:border-surface-600">
              {current.connective}
            </div>
            <ArrowRight size={14} className="text-surface-400 mt-1 hidden md:block" />
          </div>

          {/* Subordinate Clause Block */}
          <div className="md:col-span-6 p-4 rounded-xl bg-white dark:bg-surface-800 border-2 border-emerald-400 dark:border-emerald-600 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Subordinate (Reported) Clause
              </span>
              <Badge variant="success" size="sm">
                {currentSub.tense}
              </Badge>
            </div>
            <p className="font-heading font-bold text-sm text-surface-900 dark:text-white">
              "...{currentSub.text}"
            </p>
            <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 block">
              {currentSub.note}
            </span>
          </div>
        </div>

        {/* Dynamic Syntactic Insight Box */}
        <div className="p-3 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/80 flex items-start gap-2.5">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
          <p className="text-xs text-primary-900 dark:text-primary-100 leading-relaxed">
            <strong className="font-semibold">Syntactic Harmony Rule:</strong> {current.ruleSummary}
          </p>
        </div>
      </div>
    </Card>
  )
}
