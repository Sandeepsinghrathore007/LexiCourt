import { CheckCircle, XCircle, ShieldAlert } from 'lucide-react'
import l01Pitfalls from '../../content/lessons/L01/pitfalls.json'
import l02Pitfalls from '../../content/lessons/L02/pitfalls.json'
import l03Pitfalls from '../../content/lessons/L03/pitfalls.json'
import l04Pitfalls from '../../content/lessons/L04/pitfalls.json'
import l05Pitfalls from '../../content/lessons/L05/pitfalls.json'
import l06Pitfalls from '../../content/lessons/L06/pitfalls.json'
import l07Pitfalls from '../../content/lessons/L07/pitfalls.json'
import l08Pitfalls from '../../content/lessons/L08/pitfalls.json'
import l09Pitfalls from '../../content/lessons/L09/pitfalls.json'
import l10Pitfalls from '../../content/lessons/L10/pitfalls.json'
import l11Pitfalls from '../../content/lessons/L11/pitfalls.json'
import l12Pitfalls from '../../content/lessons/L12/pitfalls.json'
import l13Pitfalls from '../../content/lessons/L13/pitfalls.json'
import l14Pitfalls from '../../content/lessons/L14/pitfalls.json'
import l15Pitfalls from '../../content/lessons/L15/pitfalls.json'
import l16Pitfalls from '../../content/lessons/L16/pitfalls.json'
import l17Pitfalls from '../../content/lessons/L17/pitfalls.json'
import l18Pitfalls from '../../content/lessons/L18/pitfalls.json'
import l19Pitfalls from '../../content/lessons/L19/pitfalls.json'
import { Card, Badge, Callout } from '../common'

export default function CommonPitfallsStep({ lessonId = 'L01' }) {
  const isL19 = lessonId === 'L19'
  const isL18 = lessonId === 'L18'
  const isL17 = lessonId === 'L17'
  const isL16 = lessonId === 'L16'
  const isL15 = lessonId === 'L15'
  const isL14 = lessonId === 'L14'
  const isL13 = lessonId === 'L13'
  const isL12 = lessonId === 'L12'
  const isL11 = lessonId === 'L11'
  const isL10 = lessonId === 'L10'
  const isL09 = lessonId === 'L09'
  const isL08 = lessonId === 'L08'
  const isL07 = lessonId === 'L07'
  const isL06 = lessonId === 'L06'
  const isL05 = lessonId === 'L05'
  const isL04 = lessonId === 'L04'
  const isL03 = lessonId === 'L03'
  const isL02 = lessonId === 'L02'
  const pitfallsData = isL18
    ? l18Pitfalls
    : isL19
    ? l19Pitfalls
    : isL17
    ? l17Pitfalls
    : isL16
    ? l16Pitfalls
    : isL15
    ? l15Pitfalls
    : isL14
    ? l14Pitfalls
    : isL13
    ? l13Pitfalls
    : isL12
    ? l12Pitfalls
    : isL11
    ? l11Pitfalls
    : isL10
    ? l10Pitfalls
    : isL09
    ? l09Pitfalls
    : isL08
    ? l08Pitfalls
    : isL07
    ? l07Pitfalls
    : isL06
    ? l06Pitfalls
    : isL05
    ? l05Pitfalls
    : isL04
    ? l04Pitfalls
    : isL03
    ? l03Pitfalls
    : isL02
    ? l02Pitfalls
    : l01Pitfalls

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="error" size="sm">Step 6 • Exam Traps & Pitfalls</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-300">
            {isL18
              ? '18 Critical Affix Traps, Negative Prefix Selection & Spelling Blunders'
              : isL19
              ? '18 Critical Idioms & Phrases Traps, Literal Blunders & Lookalike Distractors'
              : isL17
              ? '18 Critical One-Word Substitutions Traps, Form Blunders & Near-Synonym Distractors'
              : isL16
              ? '12 Critical Synonyms & Antonyms Traps, False Cognates & Near-Synonym Distractors'
              : isL15
              ? '10 Critical Connectives & Confused Words Exam Traps & Distractors'
              : isL14
              ? '8 Critical Degrees of Comparison & Sentence Correction Distractors'
              : isL13
              ? '8 Critical Subject–Verb Agreement & Distractor Traps'
              : isL12
              ? '6 Critical Fixed Preposition & Collocation Distractors'
              : isL11
              ? '6 Critical Preposition & Omission Distractors'
              : isL10
              ? '6 Critical Articles & Determiners Distractors'
              : isL09
              ? '6 Critical Degrees of Comparison Distractors'
              : isL08
              ? '6 Critical Sentence Transformation Distractors'
              : isL07
              ? '6 Critical Advanced Narration & Word-Order Distractors'
              : isL06
              ? '6 Critical Narration & Backshift Distractors'
              : isL05
              ? '6 Critical Advanced Voice Distractors'
              : isL04
              ? '6 Critical Voice Transformation Distractors'
              : isL03
              ? '6 Critical Conditional Sentences & Inversion Distractors'
              : isL02
              ? '6 Critical Sequence of Tenses Distractors'
              : '6 Recurring High Court Distractor Patterns'}
          </span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
          {isL18
            ? 'Prefixes & Suffixes Pitfalls, Spelling Traps & Lookalike Confusion Traps'
            : isL19
            ? 'Idioms & Phrases Pitfalls, Literal Traps & Lookalike Confusion Traps'
            : isL17
            ? 'One-Word Substitutions Pitfalls, Form Distractors & Lookalike Confusion Traps'
            : isL16
            ? 'Synonyms & Antonyms Pitfalls: False Friends, Degree Mismatches & Form Distractor Traps'
            : isL15
            ? 'Connectives & Commonly Confused Words Pitfalls & Distractor Traps'
            : isL14
            ? 'Degrees of Comparison Pitfalls & Exam Distractors'
            : isL13
            ? 'Subject–Verb Agreement Pitfalls & Exam Distractors'
            : isL12
            ? 'Fixed Prepositions Pitfalls & Collocation Traps'
            : isL11
            ? 'Prepositions Pitfalls & Exam Distractors'
            : isL10
            ? 'Articles & Determiners Pitfalls & Exam Distractors'
            : isL09
            ? 'Degrees of Comparison Pitfalls & Exam Distractors'
            : isL08
            ? 'Sentence Transformation Pitfalls & Exam Distractors'
            : isL07
            ? 'Advanced Narration Pitfalls & Exam Distractors'
            : isL06
            ? 'Narration Pitfalls & Competitive Exam Traps'
            : isL05
            ? 'Advanced Voice Pitfalls & Exam Distractors'
            : isL04
            ? 'Voice Transformation Pitfalls & Exam Distractors'
            : isL03
            ? 'Conditional Sentences Pitfalls & Exam Distractors'
            : isL02
            ? 'Sequence of Tenses Pitfalls & Exam Distractors'
            : 'Common Mistakes & Competitive Exam Traps'}
        </h2>
        <p className="text-xs text-surface-700 dark:text-surface-200 mt-1 max-w-[85ch]">
          {isL18
            ? "Exam-setters multiple-choice options mein deliberately negative prefix confusion ('un-' vs 'in-' vs 'dis-' vs 'mis-'), pseudo-prefix root amputation ('*unert', '*discrepant'), double-letter dropping ya redundancy ('*unecessary', '*dissimilar'), '-ible' vs '-able' Latin vowel discord, '-ceed' vs '-cede' vs '-sede' orthographic distortions, aur word-class shifting ('courageousness' vs 'courage') ke deceptive traps set karte hain."
            : isL19
            ? "Exam-setters multiple-choice options mein deliberately literal translations ('bite the bullet' = biting lead), prepositional distortions ('*spill over the beans'), lookalike pairs confusion ('burn midnight oil' vs 'candle at both ends'), tone/polarity mismatches, aur non-existent idioms ke deceptive traps set karte hain."
            : isL17
            ? "Exam-setters multiple-choice options mein deliberately grammatical form mismatches (Noun 'optimist' vs Adjective 'optimistic'), lookalike confusing pairs (Arbitrator vs Mediator, Autobiography vs Biography), root-word overlapping (-cide, -cracy, -phobia), aur single defining clue shifting ke traps set karte hain."
            : isL16
            ? "Exam-setters multiple-choice options mein deliberately double conjunctions ('Although...yet/but', 'Because...therefore'), comma splices with conjunctive adverbs, faulty correlative parallelism, inversion omission after negative adverbs ('Hardly', 'No sooner'), relative pronoun case errors ('who' vs 'whom'), homophone confusion ('affect' vs 'effect', 'principal' vs 'principle'), aur confusable verbs ('lie' vs 'lay', 'rise' vs 'raise') ke traps set karte hain."
            : isL14
            ? "Exam-setters multiple-choice options mein deliberately double comparative/superlative ('*more taller'), 'any other' se 'other' omission, 'any other' ke sath plural noun, 'one of the' ke sath singular noun, 'one of the' ko 'No other' se badalna, aur Latin comparatives ke sath 'than' ke traps set karte hain."
            : isL13
            ? "Exam-setters multiple-choice options mein deliberately intervening prepositional traps, correlative nearest-noun inversion traps, indefinite pronoun pluralization, 'a number of' vs 'the number of' inversion, relative clause head noun mismatch, aur inverted sentence locative confusion ke traps set karte hain."
            : isL12
            ? "Exam-setters multiple-choice options mein deliberately redundant prepositions ('*discuss about', '*resemble to'), Latin adjectives ke sath 'than' ('*senior than'), gerund omission ('*look forward to meet'), aur confusing pairs ('*dispose off') ke traps set karte hain."
            : isL11
            ? "Exam-setters multiple-choice options mein deliberately redundant prepositions ('*discuss about', '*order for', '*attack on'), physical room mein '*enter into', deadline 'by' aur duration 'until' ka interchange, 3+ distinct entities mein 'between' ko 'among' samajhna, aur 'beside' vs 'besides' ke orthographic traps set karte hain."
            : isL10
            ? "Exam-setters multiple-choice options mein deliberately initialism vocalic traps (an FIR, a European), unique institutional article omissions, aur little/few polarity inversions ke traps set karte hain."
            : isL09
            ? "Exam-setters multiple-choice options mein deliberately double comparative/superlative ('*more taller'), 'any other' se 'other' omission, 'any other' ke sath plural noun, 'one of the' ke sath singular noun, 'one of the' ko 'No other' se badalna, aur Latin comparatives ke sath 'than' ke traps set karte hain."
            : isL08
            ? "Exam-setters multiple-choice options mein deliberately mechanical 'not' insertion (falsifying truth), 'No sooner' ke sath 'when/then' mismatch, polarity reversal failure, nouns ke sath 'very' ka galat prayog ('*a very fool'), 'too...to' tense discord, aur rhetorical quantifier reversal ke traps set karte hain."
            : isL07
            ? "Exam-setters multiple-choice options mein deliberately question inversion retention, double conjunction ('that if' / 'that why'), 'forbade' ke sath double negative, 'enquired' se 'of' omission, polite words retention, aur optative modal inverted order ke traps set karte hain."
            : isL06
            ? "Exam-setters multiple-choice options mein deliberately 'told to me', universal truth over-backshifting, present reporting verb backshifts, pronoun swapping aur unadjusted time expressions ke traps set karte hain."
            : isL05
            ? 'Exam-setters multiple-choice options mein deliberately dropped prepositions, modal backshifting, missing been in modal-perfect, aur negative imperative word order ke traps set karte hain.'
            : isL04
            ? 'Exam-setters multiple-choice options mein deliberately tense shift, auxiliary number discord, being/been omission, aur intransitive pseudo-passive traps set karte hain.'
            : isL03
            ? 'Exam-setters multiple-choice options mein deliberately if-clause mein would/will ka use, unless double negative aur negative inversion word order traps set karte hain.'
            : isL02
            ? 'Exam-setters multiple-choice options mein deliberately false universal-truth backshifts, modal discord aur double-perfect errors ke traps banate hain.'
            : 'Exam-setters multiple-choice options mein deliberately in 6 common confusion points par traps set karte hain.'}
        </p>
      </div>

      {/* Intro Warning Callout */}
      <Callout type="warning" title="Negative Marking Neutralizer">
        High Court System Assistant exam mein negative marking penalty na hone ke bawajood, distractors mein phansne se merit cutoffs ke precious marks loose ho sakte hain. In traps ko dhyan se samajh kar instant immunity banayein.
      </Callout>

      {/* Pitfall Cards Grid */}
      <div className="space-y-6">
        {pitfallsData.map((pitfall, index) => (
          <Card
            key={pitfall.id}
            variant="default"
            padding="lg"
            className="border-surface-200 dark:border-surface-700 hover:border-error-200 dark:hover:border-error-500/50 transition-colors space-y-4 shadow-xs"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-100 dark:border-surface-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-error-100 dark:bg-error-900/80 border border-error-200 dark:border-error-500/40 text-error-700 dark:text-error-200 flex items-center justify-center font-bold text-xs font-mono">
                  {index + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
                  {pitfall.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="error" size="sm">{pitfall.category}</Badge>
                <Badge variant="neutral" size="sm">{pitfall.frequency}</Badge>
              </div>
            </div>

            {/* In-depth Explanation */}
            <p className="text-xs md:text-sm text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
              {pitfall.explanation}
            </p>

            {/* Side-by-Side Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Incorrect */}
              <div className="p-3.5 rounded-xl bg-error-50/70 dark:bg-error-950/80 border border-error-200 dark:border-error-500/50 space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-error-700 dark:text-error-300">
                  <XCircle size={15} />
                  <span>INCORRECT (Common Distractor):</span>
                </div>
                <p className="font-mono text-xs text-error-900 dark:text-error-100 line-through">
                  "{pitfall.incorrectExample}"
                </p>
              </div>

              {/* Correct */}
              <div className="p-3.5 rounded-xl bg-success-50/70 dark:bg-success-950/80 border border-success-200 dark:border-success-500/50 space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-success-700 dark:text-success-300">
                  <CheckCircle size={15} />
                  <span>CORRECT (Syllabus Standard):</span>
                </div>
                <p className="font-mono text-xs text-success-900 dark:text-success-100 font-semibold">
                  "{pitfall.correctExample}"
                </p>
              </div>
            </div>

            {/* Trap Rule Bottom Pill */}
            <div className="p-3 rounded-lg bg-surface-900 dark:bg-surface-850 text-white text-xs flex items-center gap-2 shadow-xs border border-surface-800 dark:border-surface-700">
              <ShieldAlert size={16} className="text-amber-400 shrink-0" />
              <span className="font-mono text-[0.6875rem] font-bold text-amber-200 dark:text-secondary-200">
                GOLDEN RULE: {pitfall.trapRule}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
