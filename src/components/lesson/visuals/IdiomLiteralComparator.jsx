import { useState } from 'react'
import { Sparkles, AlertTriangle, CheckCircle2, Split } from 'lucide-react'
import { Card, Badge } from '../../common'

const COMPARISONS = [
  {
    id: 'comp-1',
    idiom: 'Spill the beans',
    literalMeaning: 'Kitchen mein kisi container ya thaili se physical beans ko zameen par gira dena.',
    figurativeMeaning: 'Kisi secret, confidential file ya aashcharya-janak jankari ko samay se pehle anjaane mein ujagar kar dena.',
    sentence: 'The junior assistant accidentally spilled the beans about the confidential promotion list.',
    contextClue: "'Confidential promotion list' aur 'accidentally' clear context clues hain jo information disclosure ko prove karte hain.",
    examTrap: "MCQs mein aksar 'Dropping cooked grains on floor' jaise kitchen options dekar candidates ko distract kiya jata hai."
  },
  {
    id: "comp-2",
    idiom: 'Break the ice',
    literalMeaning: 'Jami hui barf ki physical satah ko hathode ya kisi auzar se todna.',
    figurativeMeaning: 'Naye logon ke beech shuruati jhijhak, formal khamoshi ya social awkwardness ko door karna.',
    sentence: 'The director organized a quick legal quiz to break the ice among the newly recruited assistants.',
    contextClue: "'Newly recruited assistants' (strangers) aur 'quiz' prove karte hain ki social barrier todne ki baat ho rahi hai.",
    examTrap: "'Siberian frozen river ship' jaisa physical ice breaking ka option examiner ka favorite distractor hota hai."
  },
  {
    id: 'comp-3',
    idiom: 'Burn the midnight oil',
    literalMeaning: 'Raat ko roshni ke liye kerosene ya oil lamp jalana aur fuel kharch karna.',
    figurativeMeaning: 'Kisi pariksha, project ya case file ke liye der raat tak jaagkar kadi mehnat ya padhai karna.',
    sentence: 'To master all modules before the examination, candidates must burn the midnight oil.',
    contextClue: "'Master modules before examination' rigorous study hours demand karta hai.",
    examTrap: "'Combustion of fossil fuels in late hours' jaise scientific/physical options turant eliminate karein."
  },
  {
    id: 'comp-4',
    idiom: 'Hit the nail on the head',
    literalMeaning: 'Hathode se keel ke sateek kendra par chot marna.',
    figurativeMeaning: 'Kisi mudde, samasya ya vishleshan ka bilkul theek, satik aur accurate varnan karna.',
    sentence: 'His legal submission hit the nail on the head regarding the high court territorial jurisdiction.',
    contextClue: "'Legal submission' aur 'territorial jurisdiction' analytical precision ko prove karte hain.",
    examTrap: "'Carpentry or metalworking precision' wale options literal distractors hote hain."
  },
  {
    id: 'comp-5',
    idiom: 'Cost an arm and a leg',
    literalMeaning: 'Kisi cheez ke badle mein sharir ke haath aur pair ka balidaan dena.',
    figurativeMeaning: 'Bohot zyada mehanga hona; exorbitant ya prohibitive price hona.',
    sentence: 'Upgrading the entire district court server cluster will cost an arm and a leg.',
    contextClue: "'Upgrading entire server cluster' huge financial budget requirement ki baat karta hai.",
    examTrap: "'Physical medical surgery or amputation' jaise absurd options ko bilkul reject karein."
  },
  {
    id: 'comp-6',
    idiom: 'Bury the hatchet',
    literalMeaning: 'Kisi kulhadi (axe) ya physical weapon ko mitti mein gadda khodkar dafnana.',
    figurativeMeaning: 'Purani ranjish, dushmani ya lambe mukadme ko bhulakar aapas mein shanti aur sulah kar lena.',
    sentence: 'After twenty years of property litigation, the two business partners decided to bury the hatchet.',
    contextClue: "'Twenty years of litigation' aur 'business partners' prove karte hain ki feud ko end karke peace banai gayi.",
    examTrap: "'Concealing criminal weapons underground' option criminal law trap hai; actual meaning peacemaking hai."
  }
]

export default function IdiomLiteralComparator() {
  const [selectedId, setSelectedId] = useState(COMPARISONS[0].id)
  const activeComp = COMPARISONS.find((c) => c.id === selectedId) || COMPARISONS[0]

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 shadow-xs space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Visual Model 1</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Core Figurative Architecture</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900 dark:text-surface-50 flex items-center gap-2">
            <Split size={20} className="text-primary-600 dark:text-primary-400" />
            Literal Meaning vs Figurative Idiomatic Meaning
          </h3>
          <p className="text-xs text-surface-600 dark:text-surface-300 mt-1 max-w-3xl leading-relaxed">
            Exam MCQs mein sabse recurring trap literal word-for-word translation hota hai. Neeche diye interactive comparator se pehchanein ki context kaise literal physical meaning ko eliminate karke established figurative sense ko activate karta hai.
          </p>
        </div>
      </div>

      {/* Idiom Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {COMPARISONS.map((comp) => {
          const isActive = comp.id === selectedId
          return (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedId(comp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {comp.idiom}
            </button>
          )
        })}
      </div>

      {/* Main Dual-Column Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Literal Meaning (Trap) */}
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-heading text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={15} />
              Literal Physical Interpretation (Exam Trap)
            </span>
            <Badge variant="danger" size="sm">Reject in Exam</Badge>
          </div>
          <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">
            {activeComp.literalMeaning}
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-rose-100 dark:border-rose-900/30 text-[0.6875rem] text-rose-800 dark:text-rose-300 leading-normal">
            <strong>Trap Warning:</strong> {activeComp.examTrap}
          </div>
        </div>

        {/* Right: Figurative Idiom Meaning (Target) */}
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-heading text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Established Figurative Meaning (Correct Answer)
            </span>
            <Badge variant="success" size="sm">Correct Target</Badge>
          </div>
          <p className="text-xs font-semibold text-surface-900 dark:text-surface-100 leading-relaxed">
            {activeComp.figurativeMeaning}
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-emerald-100 dark:border-emerald-900/30 text-[0.6875rem] text-emerald-800 dark:text-emerald-300 leading-normal">
            <strong>Decisive Clue:</strong> {activeComp.contextClue}
          </div>
        </div>
      </div>

      {/* Sentence Demonstration Banner */}
      <div className="p-3.5 rounded-xl bg-primary-50/30 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary-700 dark:text-primary-300">
            Natural Context Demonstration:
          </span>
          <p className="text-xs sm:text-sm font-medium text-surface-900 dark:text-surface-100 italic">
            "{activeComp.sentence}"
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-primary-700 dark:text-primary-300">
          <Sparkles size={14} />
          <span>Context Overrules Literal Words</span>
        </div>
      </div>
    </Card>
  )
}
