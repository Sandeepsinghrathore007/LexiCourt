import { useState } from 'react'
import { Eye, AlertTriangle } from 'lucide-react'
import { Card, Badge } from '../../common'

const POLYSEMOUS_WORDS = [
  {
    word: 'SOUND',
    pos: 'Adjective / Noun',
    contexts: [
      {
        sense: 'Valid / Legally Robust / Flawless',
        sentence: 'The senior counsel delivered a sound constitutional argument.',
        synonyms: ['Valid', 'Logical', 'Robust', 'Flawless'],
        antonym: 'Unsound / Flawed / Fallacious',
        trap: 'Legal argument ke context mein "sound" ka opposite "silent" lagana classic rookie mistake hai!'
      },
      {
        sense: 'Deep / Undisturbed (Sleep / Health)',
        sentence: 'After working late on the writ petition, he fell into a sound sleep.',
        synonyms: ['Deep', 'Undisturbed', 'Peaceful'],
        antonym: 'Light / Fitful / Disturbed',
        trap: 'Sleep context mein "sound" ka opposite "noisy" nahi hoga; "fitful / light" hoga.'
      },
      {
        sense: 'Acoustic Noise (Noun)',
        sentence: 'A strange sound was heard from the courtroom archives.',
        synonyms: ['Noise', 'Audio', 'Din'],
        antonym: 'Silence / Quietness',
        trap: 'Noun sense mein hi opposite "Silence" hoga.'
      }
    ]
  },
  {
    word: 'GRAVE',
    pos: 'Adjective / Noun',
    contexts: [
      {
        sense: 'Serious / Critical / Solemn',
        sentence: 'Perjury before the High Court is a matter of grave concern.',
        synonyms: ['Serious', 'Critical', 'Momentous', 'Severe'],
        antonym: 'Trivial / Frivolous / Slight',
        trap: 'Perjury / crime context mein "grave" ka antonym "cheerful" nahi, "trivial / frivolous" hoga.'
      },
      {
        sense: 'Solemn / Somber Demeanor',
        sentence: 'The magistrate had a grave expression during the verdict delivery.',
        synonyms: ['Somber', 'Solemn', 'Unhappy', 'Stern'],
        antonym: 'Cheerful / Jovial / Lighthearted',
        trap: 'Facial expression sense mein opposite "cheerful" valid hai.'
      },
      {
        sense: 'Burial Place (Noun)',
        sentence: 'The historical monument houses an ancient grave.',
        synonyms: ['Tomb', 'Sepulchre', 'Crypt'],
        antonym: '— (Physical object has no direct antonym)',
        trap: 'Word class verify karein: Noun vs Adjective!'
      }
    ]
  },
  {
    word: 'PLAIN',
    pos: 'Adjective / Noun',
    contexts: [
      {
        sense: 'Clear / Obvious / Easily Understood',
        sentence: 'The language of the statutory section is plain and unambiguous.',
        synonyms: ['Clear', 'Evident', 'Manifest', 'Lucid'],
        antonym: 'Ambiguous / Obscure / Complex',
        trap: 'Legal statute context mein "plain" ka opposite "pretty / decorative" nahi, "ambiguous" hoga.'
      },
      {
        sense: 'Simple / Unadorned / Without Decoration',
        sentence: 'The court documents were filed in plain white envelopes.',
        synonyms: ['Simple', 'Unadorned', 'Austere'],
        antonym: 'Ornate / Elaborate / Fancy',
        trap: 'Visual appearance sense mein opposite "ornate" hota hai.'
      },
      {
        sense: 'Geographic Flat Land (Noun)',
        sentence: 'The northern plain of India is agriculturally fertile.',
        synonyms: ['Plateau / Lowland', 'Prairie'],
        antonym: 'Mountain / Highland',
        trap: 'Geographical noun sense!'
      }
    ]
  },
  {
    word: 'FINE',
    pos: 'Adjective / Noun',
    contexts: [
      {
        sense: 'Delicate / Thin / Minute Particles',
        sentence: 'The forensic lab analyzed fine fibers recovered from the crime scene.',
        synonyms: ['Delicate', 'Slender', 'Minute', 'Subtle'],
        antonym: 'Coarse / Rough / Thick',
        trap: 'Fiber / texture context mein "fine" ka opposite "bad" nahi, "coarse" hoga!'
      },
      {
        sense: 'High Quality / Excellent',
        sentence: 'He was a fine jurist with an unblemished record.',
        synonyms: ['Excellent', 'Superior', 'Admirable'],
        antonym: 'Inferior / Poor / Mediocre',
        trap: 'Quality sense mein opposite "poor / inferior" hoga.'
      },
      {
        sense: 'Financial Penalty (Noun)',
        sentence: 'The magistrate imposed a fine of ten thousand rupees.',
        synonyms: ['Penalty', 'Forfeit', 'Damages'],
        antonym: 'Reward / Compensation / Bounty',
        trap: 'Penalty sense mein opposite "Reward" hoga.'
      }
    ]
  }
]

export default function PolysemyContextInspector() {
  const [selectedWordIdx, setSelectedWordIdx] = useState(0)
  const [selectedSenseIdx, setSelectedSenseIdx] = useState(0)

  const currentWord = POLYSEMOUS_WORDS[selectedWordIdx] || POLYSEMOUS_WORDS[0]
  const currentSense = currentWord.contexts[selectedSenseIdx] || currentWord.contexts[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6 border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Visual 7 • Semantic Disambiguation</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Polysemous Words Multi-Sense Inspector</span>
          </div>
          <h3 className="text-lg font-bold font-heading text-surface-900 dark:text-surface-50 mt-1">
            Polysemy Context Inspector: Context-Dependent Synonyms & Antonyms
          </h3>
        </div>
      </div>

      {/* Word Selector */}
      <div className="flex flex-wrap items-center gap-2">
        {POLYSEMOUS_WORDS.map((w, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setSelectedWordIdx(idx); setSelectedSenseIdx(0) }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedWordIdx === idx
                ? 'border-primary-500 bg-primary-600 text-white shadow-sm'
                : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:border-surface-300'
            }`}
          >
            {w.word}
          </button>
        ))}
      </div>

      {/* Senses Pills for Selected Word */}
      <div className="space-y-2">
        <span className="text-[0.6875rem] font-bold text-surface-500 uppercase tracking-wider block">
          Select Sentence Context / Sense:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {currentWord.contexts.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedSenseIdx(idx)}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                selectedSenseIdx === idx
                  ? 'border-primary-500 bg-primary-50/70 dark:bg-primary-950/40 text-primary-950 dark:text-primary-100 font-bold shadow-xs'
                  : 'border-surface-200 dark:border-surface-750 bg-white dark:bg-surface-850 text-surface-600 dark:text-surface-400'
              }`}
            >
              <span className="block truncate font-mono">Sense {idx + 1}: {c.sense.split('/')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Sense Detailed Inspection Card */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-700 space-y-3.5">
        <div>
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 font-mono">
            Active Context Analysis
          </span>
          <div className="text-sm font-semibold text-surface-900 dark:text-surface-100 mt-1 italic">
            &ldquo;{currentSense.sentence}&rdquo;
          </div>
        </div>

        {/* Synonyms & Antonyms for This Specific Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider text-[0.6875rem]">
              Context-Accurate Synonyms:
            </span>
            <div className="flex flex-wrap gap-1 pt-1">
              {currentSense.synonyms.map((syn, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded bg-white dark:bg-surface-800 text-[0.6875rem] font-mono border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold"
                >
                  {syn}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 block uppercase tracking-wider text-[0.6875rem]">
              Context-Accurate Antonym:
            </span>
            <span className="font-mono font-bold text-sm text-rose-900 dark:text-rose-100 block pt-1">
              {currentSense.antonym}
            </span>
          </div>
        </div>

        {/* Trap Warning */}
        <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Exam Trap: </strong>{currentSense.trap}
          </p>
        </div>
      </div>
    </Card>
  )
}
