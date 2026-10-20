import { useState } from 'react'
import { GitCommit, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge, Card, Button } from '../../common'

const DECISION_TREE = {
  Present: {
    Simple: {
      'I / You / Plural': { aux: 'do (neg/int) | Base V₁ (aff)', example: 'They work • Do they work?' },
      'He / She / It / Singular': { aux: 'does (neg/int) | V_s/es (aff)', example: 'He works • Does he work?' },
    },
    Continuous: {
      'I': { aux: 'am', example: 'I am auditing the file.' },
      'He / She / It / Singular': { aux: 'is', example: 'The court is hearing the plea.' },
      'You / We / They / Plural': { aux: 'are', example: 'They are preparing the order.' },
    },
    Perfect: {
      'He / She / It / Singular': { aux: 'has + V₃', example: 'She has submitted the affidavit.' },
      'I / You / We / They / Plural': { aux: 'have + V₃', example: 'We have checked the database.' },
    },
    'Perfect Continuous': {
      'He / She / It / Singular': { aux: 'has been + V_ing', example: 'He has been studying since 8 AM.' },
      'I / You / We / They / Plural': { aux: 'have been + V_ing', example: 'They have been typing for hours.' },
    },
  },
  Past: {
    Simple: {
      'All Subjects': { aux: 'did (neg/int) | V₂ (aff)', example: 'He filed • Did he file?' },
    },
    Continuous: {
      'I / He / She / It / Singular': { aux: 'was + V_ing', example: 'The registrar was signing.' },
      'You / We / They / Plural': { aux: 'were + V_ing', example: 'The clerks were drafting.' },
    },
    Perfect: {
      'All Subjects': { aux: 'had + V₃', example: 'They had dispatched the notice.' },
    },
    'Perfect Continuous': {
      'All Subjects': { aux: 'had been + V_ing', example: 'She had been waiting for two hours.' },
    },
  },
  Future: {
    Simple: {
      'All Subjects (Formal I/We)': { aux: 'will / shall + V₁', example: 'The bench will convene tomorrow.' },
    },
    Continuous: {
      'All Subjects': { aux: 'will be / shall be + V_ing', example: 'He will be drafting at that hour.' },
    },
    Perfect: {
      'All Subjects': { aux: 'will have + V₃', example: 'They will have finished by 5 PM.' },
    },
    'Perfect Continuous': {
      'All Subjects': { aux: 'will have been + V_ing', example: 'By 2026, he will have been serving.' },
    },
  },
}

export default function AuxiliaryFlowchart() {
  const [time, setTime] = useState('Present')
  const [aspect, setAspect] = useState('Continuous')

  const subjectOptions = Object.keys(DECISION_TREE[time][aspect] || {})
  const [selectedSubject, setSelectedSubject] = useState(subjectOptions[0] || '')

  // Reset selected subject when time/aspect changes
  const handleTimeChange = (newTime) => {
    setTime(newTime)
    const newSubjects = Object.keys(DECISION_TREE[newTime][aspect] || {})
    setSelectedSubject(newSubjects[0] || '')
  }

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect)
    const newSubjects = Object.keys(DECISION_TREE[time][newAspect] || {})
    setSelectedSubject(newSubjects[0] || '')
  }

  const activeResult = DECISION_TREE[time]?.[aspect]?.[selectedSubject] || {
    aux: 'Select subject',
    example: '',
  }

  return (
    <Card variant="default" padding="lg" className="space-y-6 select-none border-surface-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base text-surface-900 flex items-center gap-2">
            <GitCommit size={18} className="text-primary-600" />
            <span>Auxiliary Verb Concord Decision Tree</span>
          </h3>
          <p className="text-xs text-surface-500">
            Interactive procedural algorithm to eliminate auxiliary concord errors in competitive exams.
          </p>
        </div>
        <Badge variant="primary" size="sm">Decision Matrix</Badge>
      </div>

      {/* 3 Step Wizard Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Time */}
        <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-surface-500 block">
            Step 1: Time Dimension
          </span>
          <div className="flex flex-col gap-1.5">
            {['Present', 'Past', 'Future'].map((t) => (
              <Button
                key={t}
                variant={time === t ? 'primary' : 'ghost'}
                size="sm"
                className="justify-start"
                onClick={() => handleTimeChange(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Step 2: Aspect */}
        <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-surface-500 block">
            Step 2: Grammatical Aspect
          </span>
          <div className="flex flex-col gap-1.5">
            {['Simple', 'Continuous', 'Perfect', 'Perfect Continuous'].map((a) => (
              <Button
                key={a}
                variant={aspect === a ? 'primary' : 'ghost'}
                size="sm"
                className="justify-start"
                onClick={() => handleAspectChange(a)}
              >
                {a}
              </Button>
            ))}
          </div>
        </div>

        {/* Step 3: Subject Person / Number */}
        <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-surface-500 block">
            Step 3: Subject Concord
          </span>
          <div className="flex flex-col gap-1.5">
            {subjectOptions.map((subj) => (
              <Button
                key={subj}
                variant={selectedSubject === subj ? 'primary' : 'ghost'}
                size="sm"
                className="justify-start text-xs truncate"
                onClick={() => setSelectedSubject(subj)}
              >
                {subj}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Output Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-950 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-primary-200 border-b border-primary-700/60 pb-2">
          <span className="flex items-center gap-1.5 font-mono">
            {time} <ArrowRight size={12} /> {aspect} <ArrowRight size={12} /> {selectedSubject}
          </span>
          <Badge variant="success" size="sm">Decision Resolved</Badge>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-primary-200 block mb-1">Mandatory Auxiliary & Form:</span>
            <p className="font-mono text-xl font-extrabold text-amber-300">
              {activeResult.aux}
            </p>
          </div>

          <div className="bg-primary-950/60 p-3 rounded-lg border border-primary-700/50 max-w-md">
            <span className="text-[10px] text-primary-300 block font-semibold mb-0.5">EXAM EXAMPLE:</span>
            <p className="text-xs text-white font-medium italic">
              "{activeResult.example}"
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
