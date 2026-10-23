import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import l01Examples from '../../content/lessons/L01/worked-examples.json'
import l02Examples from '../../content/lessons/L02/worked-examples.json'
import l03Examples from '../../content/lessons/L03/worked-examples.json'
import l04Examples from '../../content/lessons/L04/worked-examples.json'
import l05Examples from '../../content/lessons/L05/worked-examples.json'
import l06Examples from '../../content/lessons/L06/worked-examples.json'
import l07Examples from '../../content/lessons/L07/worked-examples.json'
import l08Examples from '../../content/lessons/L08/worked-examples.json'
import l09Examples from '../../content/lessons/L09/worked-examples.json'
import l10Examples from '../../content/lessons/L10/worked-examples.json'
import l11Examples from '../../content/lessons/L11/worked-examples.json'
import l12Examples from '../../content/lessons/L12/worked-examples.json'
import l13Examples from '../../content/lessons/L13/worked-examples.json'
import l14Examples from '../../content/lessons/L14/worked-examples.json'
import l15Examples from '../../content/lessons/L15/worked-examples.json'
import l16Examples from '../../content/lessons/L16/worked-examples.json'
import l17Examples from '../../content/lessons/L17/worked-examples.json'
import l18Examples from '../../content/lessons/L18/worked-examples.json'
import l19Examples from '../../content/lessons/L19/worked-examples.json'
import { Card, Badge, Button } from '../common'

export default function WorkedExamplesStep({ lessonId = 'L01' }) {
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
  const examplesData = isL18
    ? l18Examples
    : isL19
    ? l19Examples
    : isL17
    ? l17Examples
    : isL16
    ? l16Examples
    : isL15
    ? l15Examples
    : isL14
    ? l14Examples
    : isL13
    ? l13Examples
    : isL12
    ? l12Examples
    : isL11
    ? l11Examples
    : isL10
    ? l10Examples
    : isL09
    ? l09Examples
    : isL08
    ? l08Examples
    : isL07
    ? l07Examples
    : isL06
    ? l06Examples
    : isL05
    ? l05Examples
    : isL04
    ? l04Examples
    : isL03
    ? l03Examples
    : isL02
    ? l02Examples
    : l01Examples

  const [revealedIds, setRevealedIds] = useState({ 'WE-01': true, 'WE-02': true })

  const toggleReveal = (id) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const revealAll = () => {
    const all = {}
    examplesData.forEach((e) => {
      all[e.id] = true
    })
    setRevealedIds(all)
  }

  const hideAll = () => {
    setRevealedIds({})
  }

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 5 • Derivation Logic</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">15 Annotated Competitive Exam Questions</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-surface-50">
            {isL18
              ? 'Prefixes & Suffixes Derivation Logic: Base Isolation, Morpheme Boundary & Orthographic Verification'
              : isL19
              ? 'Idioms & Phrases Derivation Logic: Context Clues, Non-Literal Decoding & Distractor Elimination'
              : isL17
              ? 'One-Word Substitutions Derivation Logic: Category Isolation, Morphemes & Distractor Elimination'
              : isL16
              ? 'Synonyms & Antonyms Derivation Logic: Semantic Concord, Nuance Gradients & Distractor Elimination'
              : isL15
              ? 'Connectives & Commonly Confused Words Derivation Logic: Clause Syntax, Parallelism & Semantic Precision'
              : isL14
              ? 'Degrees of Comparison Derivation Logic: Inflections, Scopes, Traps & Transformations'
              : isL13
              ? 'Subject–Verb Agreement Derivation Logic: Head Noun Isolation, Proximity & Inversion'
              : isL12
              ? 'Fixed Prepositions Derivation Logic: Collocations, Confusing Pairs & Omission'
              : isL11
              ? 'Prepositions Derivation Logic: Spatial Dimensions, Vectors & Omission Rules'
              : isL10
              ? 'Articles & Determiners Derivation Logic: Phonetics, Omission & Quantifiers'
              : isL09
              ? 'Degrees of Comparison Derivation Logic: Equivalence, Scopes & Traps'
              : isL08
              ? 'Sentence Transformation Derivation Logic: Polarity, Mood & Inversion'
              : isL07
              ? 'Advanced Narration Derivation Logic: Questions, Imperatives, Exclamations & Prayers'
              : isL06
              ? 'Direct & Indirect Speech Derivation Logic'
              : isL05
              ? 'Imperatives, Modals & Prepositional Voice Derivation Logic'
              : isL04
              ? 'Active-to-Passive Conversion & Derivation Logic'
              : isL03
              ? 'Conditional Sentences & Inversion Derivation Logic'
              : isL02
              ? 'Clause Derivation & Concord Logic'
              : 'Step-by-Step Derivation Logic'}
          </h2>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
            {isL18
              ? 'Syntactic sentence slot pehchanna, context valence aur negative polarity match karna, base root origin isolate karna, silent e aur consonant doubling rules verify karna, aur false cognates eliminate karne ka exact 5-step cognitive derivation protocol seekhein.'
              : isL19
              ? 'Sentence context clues pehchanna, literal physical traps eliminate karna, lookalike idioms (burn midnight oil vs candle at both ends) ko disambiguate karna, aur 4-step cognitive elimination protocol se correct idiom derive karna seekhein.'
              : isL17
              ? 'Category isolate karna, defining clues pinpoint karna, morpheme vectors (-cide, -cracy, -phobia) decode karna, aur 4-step cognitive elimination protocol se correct one-word substitution derive karna seekhein.'
              : isL16
              ? 'Part of speech match karna, context valence aur tone freeze karna, intensity scale coordinate karna, polysemous word senses distinguish karna, aur false friends eliminate karne ka exact 5-step cognitive exam derivation protocol seekhein.'
              : isL15
              ? 'Clause type pehchanna, coordinating vs subordinating connectives apply karna, double conjunction traps eliminate karna, correlative inversion verify karna, aur confused words (affect/effect, principal/principle) ko disambiguate karne ka 8-step exam derivation protocol seekhein.'
              : isL14
              ? 'Entity count evaluate karna, self-exclusion any other verify karna, that of/those of match karna, aur Latin to-comparatives ko solve karne ka exact 5-step cognitive algorithm seekhein.'
              : isL13
              ? 'Prepositional distractors ko isolate karna, correlatives mein nearest noun check karna, indefinite pronouns identify karna, measure units evaluate karna, aur relative clauses ko solve karne ka exact 5-step cognitive algorithm seekhein.'
              : isL12
              ? 'Direct-object zero prepositions pehchanna, Latin -or adjectives ke sath to lagana, gerund bridges construct karna, aur legal collocations ko derive karne ka exact 5-step cognitive algorithm seekhein.'
              : isL11
              ? 'Time pyramid, place dimensions, dynamic boundary traversal, deadline vs duration, multi-party between, aur zero-preposition transitive verbs ko solve karne ka exact 5-step cognitive algorithm seekhein.'
              : isL10
              ? 'A/An vocalic phonetics, unique entities the, zero article environments, aur little/few quantifiers ko solve karne ka exact 5-step cognitive algorithm seekhein.'
              : isL09
              ? 'Equality parity, binary disparity, universal apex triads, any other self-exclusion, one of the subset brackets, aur Latin to-comparatives ko derive karne ka exact 5-step cognitive algorithm seekhein.'
              : isL08
              ? 'Meaning preserve karke negative banana, auxiliary inversion execute karna, rhetorical question se statement derive karna, aur exclamatory intensifiers select karne ka exact 5-step cognitive algorithm seekhein.'
              : isL07
              ? 'Interrogative inversion remove karne, polite words drop karne, forbade double negative se bachne, exclamations ko assertive banane aur optative might construct karne ka exact 5-step cognitive algorithm seekhein.'
              : isL06
              ? 'Speaker/listener pehchane, reporting verb coordinate karein, pronouns adjust karein, tenses backshift karein aur time expressions shift karne ka exact 5-step cognitive algorithm seekhein.'
              : isL05
              ? 'Bina guessing kiye imperative tones identify karne, modal forms preserve karne, prepositions retain karne aur two-object passives derive karne ka exact 5-step cognitive algorithm seekhein.'
              : isL04
              ? 'Bina guessing kiye S-V-O identify karne, auxiliary be form select karne, V3 convert karne aur agent evaluate karne ka exact 5-step cognitive algorithm seekhein.'
              : isL03
              ? 'Bina guessing kiye condition types identify karne, modal forms select karne, aur formal inversions derive karne ka exact 5-step cognitive algorithm seekhein.'
              : isL02
              ? 'Bina guessing kiye clause hierarchy identify karne aur cross-clause tenses coordinate karne ka exact 5-step cognitive algorithm seekhein.'
              : 'Har exam question ke piche 5-step cognitive derivation process ko samjhein.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" icon={Eye} onClick={revealAll}>
            Reveal All
          </Button>
          <Button variant="ghost" size="sm" icon={EyeOff} onClick={hideAll}>
            Hide All
          </Button>
        </div>
      </div>

      {/* 5-Step Derivation Method Banner */}
      <Card variant="filled" padding="md" className="border-surface-200 dark:border-surface-800 bg-surface-100/70 dark:bg-surface-800/60">
        <h3 className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-300 mb-2">
          {isL18
            ? 'Prefix & Suffix Questions ke liye 5-Step Derivation Algorithm:'
            : isL06
            ? 'Direct to Indirect Narration ke liye 5-Step Derivation Algorithm:'
            : isL02
            ? 'Sequence of Tenses ke liye 5-Step Solving Algorithm:'
            : 'Tense Questions ke liye 5-Step Solving Algorithm:'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center">
            <span className="font-bold text-primary-700 dark:text-primary-300 block">
              {isL18 ? '1. Slot & POS' : isL06 ? '1. Speaker / Listener' : isL02 ? '1. Clause ID' : '1. Marker'}
            </span>
            <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">
              {isL18 ? 'Target Part of Speech' : isL06 ? 'Referent Anchor' : isL02 ? 'Main vs. Subordinate' : 'Contextual Clue'}
            </span>
          </div>
          <div className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center">
            <span className="font-bold text-primary-700 dark:text-primary-300 block">
              {isL18 ? '2. Polarity / Root' : isL06 ? '2. Verb & That' : isL02 ? '2. Relative Time' : '2. Time'}
            </span>
            <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">
              {isL18 ? 'Origin & Tone Match' : isL06 ? 'Said / Told Link' : isL02 ? 'Earlier / Sim / Later' : 'Past / Pres / Fut'}
            </span>
          </div>
          <div className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center">
            <span className="font-bold text-primary-700 dark:text-primary-300 block">
              {isL18 ? '3. Affix Rules' : isL06 ? '3. Pronoun Shift' : isL02 ? '3. Exceptions' : '3. Aspect'}
            </span>
            <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">
              {isL18 ? 'Prefix / Suffix Select' : isL06 ? '1st / 2nd / 3rd Person' : isL02 ? 'Truth / Comparison' : 'Simp / Cont / Perf'}
            </span>
          </div>
          <div className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center">
            <span className="font-bold text-primary-700 dark:text-primary-300 block">
              {isL18 ? '4. Orthography' : isL06 ? '4. Tense & Adverb' : isL02 ? '4. Formula' : '4. Inflection'}
            </span>
            <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">
              {isL18 ? 'Spelling Verification' : isL06 ? 'Backshift & Deictics' : isL02 ? 'Backshift / Modal' : 'Aux & Lexical V'}
            </span>
          </div>
          <div className="p-2 rounded bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-center">
            <span className="font-bold text-success-700 dark:text-success-400 block">
              5. Synthesis
            </span>
            <span className="text-[0.625rem] text-surface-500 dark:text-surface-400">Final Answer</span>
          </div>
        </div>
      </Card>

      {/* Examples List */}
      <div className="space-y-4">
        {examplesData.map((item) => {
          const isRevealed = revealedIds[item.id]

          return (
            <Card
              key={item.id}
              variant="default"
              padding="md"
              className="border-surface-200 dark:border-surface-800 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-950/80 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <Badge variant="secondary" size="sm">
                    {item.tense}
                  </Badge>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  icon={isRevealed ? ChevronDown : ChevronRight}
                  onClick={() => toggleReveal(item.id)}
                  className="text-xs self-start sm:self-auto"
                >
                  {isRevealed ? 'Collapse Derivation' : 'Reveal Step-by-Step Logic'}
                </Button>
              </div>

              {/* Question Sentence */}
              <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 font-mono text-xs sm:text-sm text-surface-900 dark:text-surface-100 font-semibold mb-3">
                {item.sentence}
              </div>

              {/* Collapsible Step-by-Step Reasoning */}
              {isRevealed && (
                <div className="space-y-3 pt-2 border-t border-surface-100 dark:border-surface-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                      <strong className="text-primary-700 dark:text-primary-300 block mb-0.5">
                        {isL18 ? 'Step 1: Syntactic Slot & Target Part of Speech' : isL06 ? 'Step 1: Speaker & Listener Identification' : 'Step 1: Clause Identification'}
                      </strong>
                      <span className="text-surface-600 dark:text-surface-400">
                        {item.steps.step1_marker}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                      <strong className="text-primary-700 dark:text-primary-300 block mb-0.5">
                        {isL18 ? 'Step 2: Root Origin & Context Polarity Analysis' : isL06 ? 'Step 2: Reporting Verb & Conjunction Link' : 'Step 2: Relative Chronology'}
                      </strong>
                      <span className="text-surface-600 dark:text-surface-400">
                        {item.steps.step2_time}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                      <strong className="text-primary-700 dark:text-primary-300 block mb-0.5">
                        {isL18 ? 'Step 3: Affix Selection & Morphological Shift' : isL06 ? 'Step 3: Pronoun Reference Realignment' : 'Step 3: Aspect & Modal Concord'}
                      </strong>
                      <span className="text-surface-600 dark:text-surface-400">
                        {item.steps.step3_aspect}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                      <strong className="text-primary-700 dark:text-primary-300 block mb-0.5">
                        {isL18 ? 'Step 4: Orthographic Boundary & Spelling Verification' : isL06 ? 'Step 4: Tense Backshift & Adverbial Adjustments' : 'Step 4: Inflection & Formula'}
                      </strong>
                      <span className="text-surface-600 dark:text-surface-400">
                        {item.steps.step4_inflection}
                      </span>
                    </div>
                  </div>

                  {/* Final Output Result */}
                  <div className="p-3 rounded-xl bg-success-50 dark:bg-success-950/40 border border-success-200 dark:border-success-900/60 flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[0.625rem] uppercase font-bold text-success-800 dark:text-success-300 block">
                        Correct Synthesis (Answer: <code className="font-mono">{item.correctAnswer}</code>):
                      </span>
                      <p className="text-xs font-mono font-bold text-success-950 dark:text-success-100 mt-0.5">
                        {item.steps.step5_synthesis}
                      </p>
                    </div>
                  </div>

                  {/* Trap Warning Alert */}
                  {item.trapWarning && (
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                      <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold">Exam Distractor Alert: </strong>
                        {item.trapWarning}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
