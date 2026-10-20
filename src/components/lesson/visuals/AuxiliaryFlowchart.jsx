import { useState } from 'react'
import { GitCommit, ArrowRight } from 'lucide-react'
import { Badge, Card, Button } from '../../common'

const DECISION_TREE = {
  Present: {
    Simple: {
      'I / You / Plural': {
        aux: 'None in affirmative; "do" in negative & interrogative',
        lexical: 'Base form V₁ in all clause types',
        formula: 'Aff: S + V₁ | Neg: S + do not + V₁ | Int: Do + S + V₁?',
        example: 'Affirmative: They work. | Interrogative: Do they work?',
      },
      'He / She / It / Singular': {
        aux: 'None in affirmative; "does" in negative & interrogative',
        lexical: 'V_s/es in affirmative; base V₁ after auxiliary "does"',
        formula: 'Aff: S + V_s/es | Neg: S + does not + V₁ | Int: Does + S + V₁?',
        example: 'Affirmative: He works. | Negative: He does not work.',
      },
    },
    Continuous: {
      'I': {
        aux: 'am',
        lexical: 'Present participle (V_ing)',
        formula: 'S + am + V_ing',
        example: 'I am auditing the file.',
      },
      'He / She / It / Singular': {
        aux: 'is',
        lexical: 'Present participle (V_ing)',
        formula: 'S + is + V_ing',
        example: 'The court is hearing the plea.',
      },
      'You / We / They / Plural': {
        aux: 'are',
        lexical: 'Present participle (V_ing)',
        formula: 'S + are + V_ing',
        example: 'They are preparing the order.',
      },
    },
    Perfect: {
      'He / She / It / Singular': {
        aux: 'has',
        lexical: 'Past participle (V₃)',
        formula: 'S + has + V₃',
        example: 'She has submitted the affidavit.',
      },
      'I / You / We / They / Plural': {
        aux: 'have',
        lexical: 'Past participle (V₃)',
        formula: 'S + have + V₃',
        example: 'We have checked the database.',
      },
    },
    'Perfect Continuous': {
      'He / She / It / Singular': {
        aux: 'has been (primary aux "has" + aspectual aux "been")',
        lexical: 'Present participle (V_ing)',
        formula: 'S + has been + V_ing',
        example: 'He has been studying since 8 AM.',
      },
      'I / You / We / They / Plural': {
        aux: 'have been (primary aux "have" + aspectual aux "been")',
        lexical: 'Present participle (V_ing)',
        formula: 'S + have been + V_ing',
        example: 'They have been typing for hours.',
      },
    },
  },
  Past: {
    Simple: {
      'All Subjects': {
        aux: 'None in affirmative; "did" in negative & interrogative',
        lexical: 'V₂ (past) in affirmative; base V₁ after auxiliary "did"',
        formula: 'Aff: S + V₂ | Neg: S + did not + V₁ | Int: Did + S + V₁?',
        example: 'Affirmative: He filed the petition. | Interrogative: Did he file the petition?',
      },
    },
    Continuous: {
      'I / He / She / It / Singular': {
        aux: 'was',
        lexical: 'Present participle (V_ing)',
        formula: 'S + was + V_ing',
        example: 'The registrar was signing the order.',
      },
      'You / We / They / Plural': {
        aux: 'were',
        lexical: 'Present participle (V_ing)',
        formula: 'S + were + V_ing',
        example: 'The clerks were drafting the notices.',
      },
    },
    Perfect: {
      'All Subjects': {
        aux: 'had (invariable)',
        lexical: 'Past participle (V₃)',
        formula: 'S + had + V₃',
        example: 'They had dispatched the notice before noon.',
      },
    },
    'Perfect Continuous': {
      'All Subjects': {
        aux: 'had been (past aux "had" + aspectual aux "been")',
        lexical: 'Present participle (V_ing)',
        formula: 'S + had been + V_ing',
        example: 'She had been waiting for two hours.',
      },
    },
  },
  Future: {
    Simple: {
      'All Subjects (Formal I/We)': {
        aux: 'will / shall (modal auxiliary)',
        lexical: 'Base form V₁',
        formula: 'S + will/shall + V₁',
        example: 'The bench will convene tomorrow.',
      },
    },
    Continuous: {
      'All Subjects': {
        aux: 'will be / shall be (modal "will/shall" + aspectual "be")',
        lexical: 'Present participle (V_ing)',
        formula: 'S + will/shall + be + V_ing',
        example: 'He will be drafting at that hour.',
      },
    },
    Perfect: {
      'All Subjects': {
        aux: 'will have / shall have (modal "will/shall" + aspectual "have")',
        lexical: 'Past participle (V₃)',
        formula: 'S + will/shall + have + V₃',
        example: 'They will have finished by 5 PM.',
      },
    },
    'Perfect Continuous': {
      'All Subjects': {
        aux: 'will have been / shall have been (modal + aspectual auxiliaries)',
        lexical: 'Present participle (V_ing)',
        formula: 'S + will/shall + have been + V_ing',
        example: 'By next year, he will have been serving for a decade.',
      },
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
    lexical: '',
    formula: '',
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
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-950 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between text-xs text-primary-200 border-b border-primary-700/60 pb-2">
          <span className="flex items-center gap-1.5 font-mono">
            {time} <ArrowRight size={12} /> {aspect} <ArrowRight size={12} /> {selectedSubject}
          </span>
          <Badge variant="success" size="sm">Decision Resolved</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-primary-300 block font-semibold">
                Auxiliary Verb:
              </span>
              <p className="font-mono text-sm font-bold text-amber-300">
                {activeResult.aux}
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-primary-300 block font-semibold">
                Lexical Verb Form:
              </span>
              <p className="font-mono text-sm font-bold text-white">
                {activeResult.lexical}
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-primary-300 block font-semibold">
                Structural Formula:
              </span>
              <p className="font-mono text-xs text-primary-100 bg-primary-950/50 p-1.5 rounded border border-primary-700/40">
                {activeResult.formula}
              </p>
            </div>
          </div>

          <div className="bg-primary-950/60 p-3.5 rounded-lg border border-primary-700/50 flex flex-col justify-center">
            <span className="text-[10px] text-primary-300 block font-semibold uppercase tracking-wider mb-1">
              Exam Pattern Example:
            </span>
            <p className="text-xs text-white font-medium italic leading-relaxed">
              "{activeResult.example}"
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
