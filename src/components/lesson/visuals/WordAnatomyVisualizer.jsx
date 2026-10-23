import { useState } from 'react'
import { Layers, Sparkles, CheckCircle2, Info, ArrowRight } from 'lucide-react'
import { Card, Badge } from '../../common'

const ANATOMY_EXAMPLES = [
  {
    id: 'unreasonable',
    word: 'Unreasonable',
    prefix: { morpheme: 'un-', type: 'Bound Prefix', origin: 'Old English', meaning: 'Not / Contrary to', color: 'amber' },
    root: { morpheme: 'reason', type: 'Free Base / Root', origin: 'Latin (ratio) via Old French', meaning: 'Good sense / intellect', color: 'primary' },
    suffix: { morpheme: '-able', type: 'Bound Suffix', origin: 'Latin (-abilis)', meaning: 'Capable of being / fit for', color: 'emerald' },
    fullMeaning: 'Not guided by or based on good sense; exceeding reasonable limits.',
    grammaticalShift: 'Noun/Verb (Reason) -> Adjective (Reasonable) -> Negative Adjective (Unreasonable)',
    examSentence: 'The High Court held that imposing an arbitrary deadline was completely unreasonable.',
    morphologicalNote: 'Base word "reason" can stand alone as an independent English word (free morpheme). Prefix "un-" does not modify base spelling.'
  },
  {
    id: 'irrevocable',
    word: 'Irrevocable',
    prefix: { morpheme: 'ir- (in-)', type: 'Bound Assimilated Prefix', origin: 'Latin', meaning: 'Not / Unable to be', color: 'amber' },
    root: { morpheme: 'voc', type: 'Bound Root', origin: 'Latin (vocare = to call)', meaning: 'Voice / Call', color: 'primary' },
    suffix: { morpheme: '-able', type: 'Bound Suffix', origin: 'Latin (-abilis)', meaning: 'Capable of being', color: 'emerald' },
    infix: { morpheme: 're-', type: 'Secondary Prefix', origin: 'Latin', meaning: 'Back / Again', color: 'cyan' },
    fullMeaning: 'Unable to be called back, repealed, or undone; completely final.',
    grammaticalShift: 'Root (voc) -> Verb (revoke = call back) -> Adjective (revocable) -> Negative Adjective (irrevocable)',
    examSentence: 'Once the consent decree was signed by both parties, it became an irrevocable order.',
    morphologicalNote: 'Latin prefix "in-" assimilates to "ir-" before the rhotic consonant "r", creating the double "r" spelling.'
  },
  {
    id: 'indispensable',
    word: 'Indispensable',
    prefix: { morpheme: 'in-', type: 'Bound Prefix', origin: 'Latin', meaning: 'Not / Impossible to', color: 'amber' },
    root: { morpheme: 'dispense', type: 'Free Base Word', origin: 'Latin (dispensare = weigh out/distribute)', meaning: 'To manage or do without', color: 'primary' },
    suffix: { morpheme: '-able', type: 'Bound Suffix', origin: 'Latin (-abilis)', meaning: 'Capable of being done', color: 'emerald' },
    fullMeaning: 'Absolutely necessary; impossible to be dispensed with or done without.',
    grammaticalShift: 'Verb (Dispense) -> Adjective (Dispensable) -> Negative Adjective (Indispensable)',
    examSentence: 'Prompt recording of witness depositions is indispensable to criminal trial justice.',
    morphologicalNote: 'Final silent "e" of "dispense" drops before vowel suffix "-able". Ends in -ABLE (never *-ible!).'
  },
  {
    id: 'decentralization',
    word: 'Decentralization',
    prefix: { morpheme: 'de-', type: 'Bound Prefix', origin: 'Latin', meaning: 'Reversal / Removal from', color: 'amber' },
    root: { morpheme: 'center / centr', type: 'Free Base / Root', origin: 'Greek (kentron) via Latin', meaning: 'Focal middle point', color: 'primary' },
    suffix1: { morpheme: '-al', type: 'Bound Adjective Suffix', origin: 'Latin', meaning: 'Relating to', color: 'cyan' },
    suffix2: { morpheme: '-iz(e)', type: 'Bound Verb Suffix', origin: 'Greek (-izein)', meaning: 'To cause to become', color: 'emerald' },
    suffix3: { morpheme: '-ation', type: 'Bound Noun Suffix', origin: 'Latin', meaning: 'Process or result', color: 'purple' },
    fullMeaning: 'The transfer of administrative authority from a central body to regional local bodies.',
    grammaticalShift: 'Noun (Center) -> Adj (Central) -> Verb (Centralize) -> Negative Verb (Decentralize) -> Abstract Noun (Decentralization)',
    examSentence: 'Decentralization of registry powers expedited the listing of urgent bail appeals.',
    morphologicalNote: 'Demonstrates hierarchical layering: successive affixes shift grammatical class step by step.'
  },
  {
    id: 'anachronism',
    word: 'Anachronism',
    prefix: { morpheme: 'ana-', type: 'Bound Prefix', origin: 'Greek', meaning: 'Against / Backward / Inverted', color: 'amber' },
    root: { morpheme: 'chron', type: 'Bound Root', origin: 'Greek (chronos = time)', meaning: 'Time / Temporal order', color: 'primary' },
    suffix: { morpheme: '-ism', type: 'Bound Suffix', origin: 'Greek (-ismos)', meaning: 'State / Doctrine / Condition', color: 'emerald' },
    fullMeaning: 'Something placed or existing out of its proper historical time period.',
    grammaticalShift: 'Bound Root (chron) + Prefix (ana-) + Suffix (-ism) = Abstract Noun (Anachronism)',
    examSentence: 'Using handwritten carbon copies in an electronic courtroom registry is an obvious anachronism.',
    morphologicalNote: 'Contains Greek bound root "chron" pronounced /kr/ with "ch". Frequently tested one-word substitution.'
  }
]

export default function WordAnatomyVisualizer() {
  const [selectedWordId, setSelectedWordId] = useState(ANATOMY_EXAMPLES[0].id)
  const [showMorphemeDetail, setShowMorphemeDetail] = useState(true)

  const active = ANATOMY_EXAMPLES.find((e) => e.id === selectedWordId) || ANATOMY_EXAMPLES[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Architecture 1</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Morpheme Decomposition Engine</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50">
            Word Anatomy Visualizer: Prefix + Root + Suffix Dissection
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">
            Har complex English word ke components (Prefix, Base/Root, Suffix) ko isolate karke bound vs free morphemes aur meaning derivation ko samjhein.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowMorphemeDetail((prev) => !prev)}
          className="text-xs px-3 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors font-medium self-start sm:self-auto cursor-pointer"
        >
          {showMorphemeDetail ? 'Simple View' : 'Deep Anatomy View'}
        </button>
      </div>

      {/* Word Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {ANATOMY_EXAMPLES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedWordId(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedWordId === item.id
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {item.word}
          </button>
        ))}
      </div>

      {/* Interactive Anatomy Block Display */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-6">
        {/* Visual Blocks Header */}
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-wider font-bold text-surface-500 dark:text-surface-400">
            Morphological Architecture:
          </span>
          <div className="flex items-center justify-center flex-wrap gap-2 text-lg sm:text-2xl font-mono font-extrabold pt-2">
            {/* Prefix Block */}
            <div className="p-2 sm:p-3 rounded-xl bg-amber-50 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-600/70 text-amber-900 dark:text-amber-200 text-center shadow-xs">
              <span className="text-[0.625rem] sm:text-xs uppercase block font-sans font-bold text-amber-700 dark:text-amber-400">
                PREFIX
              </span>
              <span>{active.prefix.morpheme}</span>
            </div>

            <span className="text-surface-400 font-sans">+</span>

            {/* Optional Infix/Secondary Prefix */}
            {active.infix && (
              <>
                <div className="p-2 sm:p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 border-2 border-cyan-300 dark:border-cyan-600/70 text-cyan-900 dark:text-cyan-200 text-center shadow-xs">
                  <span className="text-[0.625rem] sm:text-xs uppercase block font-sans font-bold text-cyan-700 dark:text-cyan-400">
                    PREFIX 2
                  </span>
                  <span>{active.infix.morpheme}</span>
                </div>
                <span className="text-surface-400 font-sans">+</span>
              </>
            )}

            {/* Root/Base Block */}
            <div className="p-2 sm:p-3 rounded-xl bg-primary-50 dark:bg-primary-950/70 border-2 border-primary-300 dark:border-primary-500 text-primary-900 dark:text-primary-200 text-center shadow-xs">
              <span className="text-[0.625rem] sm:text-xs uppercase block font-sans font-bold text-primary-700 dark:text-primary-400">
                ROOT / BASE
              </span>
              <span>{active.root.morpheme}</span>
            </div>

            <span className="text-surface-400 font-sans">+</span>

            {/* Suffix Block */}
            {active.suffix ? (
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border-2 border-emerald-300 dark:border-emerald-600/70 text-emerald-900 dark:text-emerald-200 text-center shadow-xs">
                <span className="text-[0.625rem] sm:text-xs uppercase block font-sans font-bold text-emerald-700 dark:text-emerald-400">
                  SUFFIX
                </span>
                <span>{active.suffix.morpheme}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="p-2 sm:p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-600 text-cyan-900 dark:text-cyan-200 text-center text-xs">
                  {active.suffix1.morpheme}
                </div>
                <span>+</span>
                <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 text-center text-xs">
                  {active.suffix2.morpheme}
                </div>
                <span>+</span>
                <div className="p-2 sm:p-3 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-600 text-purple-900 dark:text-purple-200 text-center text-xs">
                  {active.suffix3.morpheme}
                </div>
              </div>
            )}

            <span className="text-surface-400 font-sans">=</span>

            {/* Result Word */}
            <div className="p-2 sm:p-3 rounded-xl bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-950 text-center shadow-xs font-mono">
              <span className="text-[0.625rem] sm:text-xs uppercase block font-sans font-bold text-surface-300 dark:text-surface-600">
                SYNTHESIS
              </span>
              <span>{active.word}</span>
            </div>
          </div>
        </div>

        {/* Detailed Morpheme Breakdown Cards */}
        {showMorphemeDetail && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {/* Prefix Card */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-amber-200 dark:border-amber-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                  {active.prefix.morpheme}
                </span>
                <Badge variant="warning" size="sm">{active.prefix.origin}</Badge>
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-300">
                <strong>Function:</strong> {active.prefix.meaning}
              </p>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                Type: {active.prefix.type}
              </p>
            </div>

            {/* Root Card */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary-700 dark:text-primary-300">
                  {active.root.morpheme}
                </span>
                <Badge variant="primary" size="sm">{active.root.origin}</Badge>
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-300">
                <strong>Core Sense:</strong> {active.root.meaning}
              </p>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                Type: {active.root.type}
              </p>
            </div>

            {/* Suffix Card */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-surface-900 border border-emerald-200 dark:border-emerald-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {active.suffix ? active.suffix.morpheme : `${active.suffix1.morpheme} + ${active.suffix2.morpheme} + ${active.suffix3.morpheme}`}
                </span>
                <Badge variant="success" size="sm">{active.suffix ? active.suffix.origin : 'Compound'}</Badge>
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-300">
                <strong>Grammar Role:</strong> {active.suffix ? active.suffix.meaning : 'Multi-tier nominalization'}
              </p>
              <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
                Type: {active.suffix ? active.suffix.type : 'Layered Suffixes'}
              </p>
            </div>
          </div>
        )}

        {/* Derivational Path & Exam Sentence */}
        <div className="space-y-3 pt-2 border-t border-surface-200 dark:border-surface-700">
          <div className="p-3 rounded-xl bg-surface-100/80 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
            <span className="text-[0.6875rem] uppercase font-bold text-primary-700 dark:text-primary-300 block mb-1">
              Derivational Transformation Path:
            </span>
            <p className="font-mono text-xs text-surface-800 dark:text-surface-100 font-semibold">
              {active.grammaticalShift}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs text-surface-700 dark:text-surface-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-surface-900 dark:text-surface-100">
              <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />
              <span>High Court Exam Context:</span>
            </div>
            <p className="italic font-serif text-xs sm:text-sm text-surface-800 dark:text-surface-200">
              "{active.examSentence}"
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs text-primary-950 dark:text-primary-200 flex items-start gap-2">
            <Info size={15} className="shrink-0 mt-0.5 text-primary-600 dark:text-primary-400" />
            <div>
              <strong>Morphological Note: </strong>
              <span>{active.morphologicalNote}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
