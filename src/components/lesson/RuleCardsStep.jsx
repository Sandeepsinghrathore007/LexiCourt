import { useState, useMemo } from 'react'
import { Filter } from 'lucide-react'
import l01RuleCards from '../../content/lessons/L01/rule-cards.json'
import l02RuleCards from '../../content/lessons/L02/rule-cards.json'
import l03RuleCards from '../../content/lessons/L03/rule-cards.json'
import l04RuleCards from '../../content/lessons/L04/rule-cards.json'
import l05RuleCards from '../../content/lessons/L05/rule-cards.json'
import l06RuleCards from '../../content/lessons/L06/rule-cards.json'
import l07RuleCards from '../../content/lessons/L07/rule-cards.json'
import l08RuleCards from '../../content/lessons/L08/rule-cards.json'
import l09RuleCards from '../../content/lessons/L09/rule-cards.json'
import l10RuleCards from '../../content/lessons/L10/rule-cards.json'
import l11RuleCards from '../../content/lessons/L11/rule-cards.json'
import l12RuleCards from '../../content/lessons/L12/rule-cards.json'
import l13RuleCards from '../../content/lessons/L13/rule-cards.json'
import l14RuleCards from '../../content/lessons/L14/rule-cards.json'
import l15RuleCards from '../../content/lessons/L15/rule-cards.json'
import l16RuleCards from '../../content/lessons/L16/rule-cards.json'
import l17RuleCards from '../../content/lessons/L17/rule-cards.json'
import l18RuleCards from '../../content/lessons/L18/rule-cards.json'
import l19RuleCards from '../../content/lessons/L19/rule-cards.json'
import { Card, Badge, Button } from '../common'

export default function RuleCardsStep({ lessonId = 'L01' }) {
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
  const rawCards = isL18
    ? l18RuleCards
    : isL19
    ? l19RuleCards
    : isL17
    ? l17RuleCards
    : isL16
    ? l16RuleCards
    : isL15
    ? l15RuleCards
    : isL14
    ? l14RuleCards
    : isL13
    ? l13RuleCards
    : isL12
    ? l12RuleCards
    : isL11
    ? l11RuleCards
    : isL10
    ? l10RuleCards
    : isL09
    ? l09RuleCards
    : isL08
    ? l08RuleCards
    : isL07
    ? l07RuleCards
    : isL06
    ? l06RuleCards
    : isL05
    ? l05RuleCards
    : isL04
    ? l04RuleCards
    : isL03
    ? l03RuleCards
    : isL02
    ? l02RuleCards
    : l01RuleCards

  const [timeFilter, setTimeFilter] = useState('All')
  const [aspectFilter, setAspectFilter] = useState('All')
  const [activePatternTab, setActivePatternTab] = useState({}) // { [cardId]: 'affirmative' | 'negative' | 'interrogative' }

  const availableTimes = useMemo(() => {
    return ['All', ...new Set(rawCards.map((c) => c.time))]
  }, [rawCards])

  const availableAspects = useMemo(() => {
    return ['All', ...new Set(rawCards.map((c) => c.aspect))]
  }, [rawCards])

  const filteredCards = useMemo(() => {
    return rawCards.filter((card) => {
      const matchTime = timeFilter === 'All' || card.time === timeFilter
      const matchAspect = aspectFilter === 'All' || card.aspect === aspectFilter
      return matchTime && matchAspect
    })
  }, [rawCards, timeFilter, aspectFilter])

  const setTab = (cardId, tab) => {
    setActivePatternTab((prev) => ({
      ...prev,
      [cardId]: tab,
    }))
  }

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <Badge variant="primary" size="sm">Step 4 • Formula References</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
            {isL18
              ? '14 Strategic Prefixes & Suffixes Derivation Rule Cards'
              : isL19
              ? '14 Strategic Idioms & Phrases Problem-Solving Rule Cards'
              : isL17
              ? '14 Strategic One-Word Substitutions Problem-Solving Rule Cards'
              : isL16
              ? '12 Strategic Synonyms & Antonyms Problem-Solving Rule Cards'
              : isL15
              ? '14 Precision Connectives & Commonly Confused Words Rule Cards'
              : isL14
              ? '12 Precision Degrees of Comparison Rule Cards'
              : isL13
              ? '12 Precision Subject–Verb Agreement Rule Cards'
              : isL12
              ? '12 Precision Fixed Preposition Rule Cards'
              : isL11
              ? '12 Precision Prepositions Rule Cards'
              : isL10
              ? '10 Precision Articles & Determiners Rule Cards'
              : isL09
              ? '10 Precision Degrees of Comparison Rule Cards'
              : isL08
              ? '10 Precision Sentence Transformation Rule Cards'
              : isL07
              ? '10 Precision Advanced Narration Transformation Rule Cards'
              : isL06
              ? '10 Precision Direct & Indirect Speech Rule Cards'
              : isL05
              ? '10 Precision Advanced Voice Transformation Rule Cards'
              : isL04
              ? '10 Precision Voice Transformation Rule Cards'
              : isL03
              ? '10 Precision Conditional & Inversion Rule Cards'
              : isL02
              ? '10 Precision Sequence of Tenses Rule Cards'
              : '12 Precision Grammar Rule Cards'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-surface-900 dark:text-surface-50 leading-snug">
          {isL18
            ? 'Prefixes & Suffixes Formulas: Prefix Invariance, Assimilation, POS Shifters & Golden Spelling Rules'
            : isL19
            ? 'Idioms & Phrases Formulas: Non-Literal Semantics, Structural Freezing, Context Alignment & Disambiguation Rules'
            : isL17
            ? 'One-Word Substitutions Formulas: Morpheme Vectors, Part of Speech, Defining Clues & Disambiguation Rules'
            : isL16
            ? 'Synonyms & Antonyms Formulas: Contextual Match, Degree/Intensity, Antonym Dynamics & Polysemy Disambiguation Rules'
            : isL15
            ? 'Connectives & Commonly Confused Words Formulas: Clause Linking, Correlative Harmony, Punctuation & Semantic Disambiguation'
            : isL14
            ? 'Degrees of Comparison Formulas: Entity Count, Irregular Roots, Self-Exclusion & Latin Rules'
            : isL13
            ? 'Subject–Verb Agreement Formulas: Head Nouns, Correlatives, Quantifiers & Special Structures'
            : isL12
            ? 'Fixed Prepositions Formulas: Verb, Adjective & Noun Collocations'
            : isL11
            ? 'Prepositions Formulas: Time, Place, Movement & Boundary Vectors'
            : isL10
            ? 'Articles & Determiners Formulas: Phonetics, Definite Contexts, Omission & Quantifiers'
            : isL09
            ? 'Degrees of Comparison Formulas: Equality, Superlative Triads, Any Other & Latin Rules'
            : isL08
            ? 'Sentence Transformation Formulas: Polarity, Inversion, Rhetorical & Exclamatory'
            : isL07
            ? 'Advanced Narration Formulas: Questions, Imperatives, Exclamations & Prayers'
            : isL06
            ? 'Narration Transformation Formulas: Pronouns, Tenses & Adverbs'
            : isL05
            ? 'Imperatives, Modals & Prepositional Voice Transformation Formulas'
            : isL04
            ? 'Active & Passive Voice Transformation Formulas & Concord'
            : isL03
            ? 'Conditional Sentences, Inversions & Connective Formulas'
            : isL02
            ? 'Tense Harmony & Cross-Clause Concord Rules'
            : 'The 12 Tense Formulas & Structural Concord'}
        </h2>
        <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-300 mt-1.5 max-w-[85ch] leading-relaxed">
          {isL18
            ? 'Prefix invariance law, negative prefix selection, phonetic assimilation, degree and temporal prefixes, noun/adjective/verb/adverb POS shifters, silent e retention/deletion, y-to-i transformation, 1-1-1 consonant doubling, aur hyphenation protocols ke 14 high-precision reference cards.'
            : isL19
            ? 'Figurative vs literal semantics, structural invariance, context tone matching, prepositional retention, lookalike pair disambiguation, binomial pairs, body-part idioms, animal idioms, aur exam elimination algorithms ke 14 high-precision reference cards.'
            : isL17
            ? 'Morpheme roots (-cide, -cracy, -phobia, -mania), grammatical part-of-speech precision, lookalike pair disambiguation, single defining clues, legal/administrative terminology, aur 4-filter elimination ke 14 high-precision reference cards.'
            : isL16
            ? 'Contextual equivalence, gradable vs complementary antonyms, intensity scale matching, word-family concordance, negative prefix traps, polysemic opposites, aur High Court distractor elimination ke 12 high-precision reference cards.'
            : isL15
            ? 'FANBOYS coordinating comma rule, subordinating adverbial clauses, zero double-conjunction law, correlative parallelism & inversion, relative pronouns (who/whom, that/which), conjunctive adverb semicolon rules, homophones (affect/effect, principal/principle, complement/compliment), confusable verbs (lie/lay, rise/raise), aur quantifiers (fewer/less) ke 14 high-precision reference cards.'
            : isL14
            ? 'Entity count boundaries, regular inflections, irregular roots, self-exclusion any other, logical that of/those of, one of the plural concord, aur Latin to-comparative cards.'
            : isL13
            ? 'Head noun extraction, compound subjects, correlative proximity, parenthetical isolation, indefinite pronouns, each/every distributive concord, collective noun dual usage, measure nouns, title nouns, special structures, aur inverted relative clauses ke exact reference cards.'
            : isL12
            ? 'Verb collocations, adjective collocations, noun collocations, direct-object zero prepositions, confusing pairs, gerund bridges, aur High Court administrative legal prepositions cards.'
            : isL11
            ? 'In/On/At temporal pyramid, 3D/2D/1D spatial dimensions, movement vectors, deadline vs duration boundaries, multi-party between, aur zero-preposition transitive verb cards.'
            : isL10
            ? 'A/An phonetics, singular countables, specific The, superlatives/ordinals, geographical conventions, zero article omission, institutional purpose, Few triad, Little triad, aur quantifiers & distributives cards.'
            : isL09
            ? 'Equality as...as, disparity than, regular inflections, irregular roots, unique apex triads, any other exclusion, one of the subset, binary boundary, dual qualities, aur Latin to-comparative cards.'
            : isL08
            ? 'Antonym negation, None but, No sooner...than, Universal negatives, Too...to, Polarity reversal, Dummy auxiliary, Rhetorical quantifiers, aur Exclamatory intensifier cards.'
            : isL07
            ? 'Yes/No if/whether, Wh-question inversion removal, imperative to-infinitive, negative command not to, forbade zero-negative, suggested should, exclaimed emotions, aur optative might cards.'
            : isL06
            ? 'Assertive sentence conversion, reporting verbs (say vs tell), 1st/2nd/3rd person pronoun shifts, tense backshift matrix, universal truth exceptions, aur adverbial adjustment cards.'
            : isL05
            ? 'Imperative commands, polite requests, negative instructions, simple modals, modal-perfects, preposition retention, aur two-object passives ke exact reference cards.'
            : isL04
            ? 'Sabhi 8 tenses ke active vs passive formulas, negative, interrogative inversion, agent omission, aur transitivity verification cards.'
            : isL03
            ? 'Types 0, 1, 2, 3 conditional formulas, subjunctive were, formal inversions aur unless conjunction ke precision cards.'
            : isL02
            ? 'General Rule of Past Harmony, open sequence, purpose clauses aur universal truth exceptions ke instant reference cards.'
            : 'Affirmative, negative aur interrogative syntax patterns ke instant quick-lookup cards.'}
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-surface-700 dark:text-surface-200 shrink-0">
          <Filter size={16} className="text-primary-600 dark:text-primary-300" />
          <span>Filter Cards:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {availableTimes.map((t) => (
              <Button
                key={t}
                variant={timeFilter === t ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter(t)}
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-surface-300 dark:bg-surface-700 mx-1 hidden sm:block" />

          <div className="flex flex-wrap items-center gap-1">
            {availableAspects.map((a) => (
              <Button
                key={a}
                variant={aspectFilter === a ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setAspectFilter(a)}
              >
                {a}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {filteredCards.map((card) => {
          const activeTab = activePatternTab[card.id] || 'affirmative'

          return (
            <Card
              key={card.id}
              variant="default"
              padding="none"
              className="p-4 sm:p-5 lg:p-6 border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all duration-200 flex flex-col justify-between shadow-xs h-full"
            >
              {/* Card Top Header */}
              <div className="pb-3 border-b border-surface-200/80 dark:border-surface-700/80 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/80 px-2 py-0.5 rounded-md border border-primary-200 dark:border-primary-500/40">
                      {card.id}
                    </span>
                    <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                      {card.time} • {card.aspect}
                    </span>
                  </div>

                  {card.auxiliary && (
                    <span className="text-[0.6875rem] sm:text-xs text-surface-600 dark:text-surface-300 bg-surface-100/90 dark:bg-surface-800/90 px-2.5 py-1 rounded-full border border-surface-200 dark:border-surface-700 font-medium max-w-full text-left leading-normal">
                      {card.auxiliary}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-surface-900 dark:text-surface-50 leading-snug">
                  {card.tense}
                </h3>
              </div>

              {/* Main Content Body - Vertically Centered */}
              <div className="flex-1 flex flex-col justify-center my-auto py-3.5 sm:py-4 space-y-3.5 sm:space-y-4">
                {/* Structural Formula Box */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-surface-50/90 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700/80 shadow-xs flex flex-col justify-center">
                  <span className="text-[0.6875rem] sm:text-xs uppercase tracking-wider font-bold text-surface-500 dark:text-surface-400 block mb-1">
                    Structural Formula:
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-bold text-primary-900 dark:text-primary-200 leading-relaxed break-words">
                    {card.formula}
                  </p>
                </div>

                {/* Usage Description */}
                <p className="text-xs sm:text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
                  {card.usage}
                </p>

                {/* Interactive Syntax Tabs & Sentence Display */}
                <div className="space-y-2 pt-2 border-t border-surface-100 dark:border-surface-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[0.6875rem] sm:text-xs uppercase tracking-wider font-bold text-surface-500 dark:text-surface-400">
                      Sentence Examples:
                    </span>
                    <div className="flex items-center gap-1">
                      {['affirmative', 'negative', 'interrogative'].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setTab(card.id, tab)}
                          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer capitalize ${
                            activeTab === tab
                              ? 'bg-surface-800 dark:bg-surface-200 text-white dark:text-surface-950 font-bold shadow-xs'
                              : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200/60 dark:hover:bg-surface-700/60'
                          }`}
                        >
                          {tab.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Pattern Display with Vertically Centered Text */}
                  <div className="p-3 sm:p-3.5 rounded-lg bg-surface-50/90 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700/80 font-mono text-xs sm:text-sm text-surface-800 dark:text-surface-100 shadow-xs leading-relaxed min-h-[48px] sm:min-h-[52px] flex items-center break-words">
                    {card.patterns[activeTab]}
                  </div>
                </div>

                {/* Signal Time Markers / Contextual Keys */}
                <div className="space-y-1.5">
                  <span className="text-[0.6875rem] sm:text-xs uppercase tracking-wider font-bold text-surface-500 dark:text-surface-400 block">
                    Key Markers & Contexts:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {card.timeMarkers.map((marker, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-secondary-200 border border-amber-200 dark:border-amber-500/40 font-mono font-medium leading-normal inline-flex items-center"
                      >
                        {marker}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Exam Alert */}
              <div className="mt-auto pt-2">
                <div className="p-3 sm:p-3.5 rounded-xl bg-primary-50/60 dark:bg-primary-950/60 border border-primary-200/70 dark:border-primary-500/40 text-xs sm:text-sm text-primary-900 dark:text-primary-100 leading-relaxed shadow-xs flex flex-col justify-center">
                  <div>
                    <strong className="font-bold text-primary-950 dark:text-primary-200 block sm:inline sm:mr-1.5 mb-0.5 sm:mb-0">
                      High Court Exam Tip:
                    </strong>
                    <span>{card.keyTip}</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
