import { useState, useMemo } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const COLLOCATIONS_DATA = [
  // Verb + Preposition
  {
    type: 'Verb',
    phrase: 'depend on',
    prep: 'on',
    meaning: 'Kisi vyakti ya condition par aashrit hona',
    example: 'You can always depend on authenticated forensic records.',
    pattern: 'Verb + on + Object',
    category: 'Reliance & Trust'
  },
  {
    type: 'Verb',
    phrase: 'rely on',
    prep: 'on',
    meaning: 'Bharosa ya vishwas karna',
    example: 'The division bench relies on credible eyewitness testimony.',
    pattern: 'Verb + on + Object',
    category: 'Reliance & Trust'
  },
  {
    type: 'Verb',
    phrase: 'insist on',
    prep: 'on',
    meaning: 'Kisi baat par aadhikarik zidd ya zor dena',
    example: 'The counsel insisted on filing a supplementary affidavit.',
    pattern: 'Verb + on + V-ing/Noun',
    category: 'Assertion'
  },
  {
    type: 'Verb',
    phrase: 'approve of',
    prep: 'of',
    meaning: 'Anumodan ya sahmati dena',
    example: 'The Registrar General did not approve of his unexplained absence.',
    pattern: 'Verb + of + Object',
    category: 'Evaluation'
  },
  {
    type: 'Verb',
    phrase: 'accuse of',
    prep: 'of',
    meaning: 'Apradh ya dosh ka arop lagana',
    example: 'The prosecution accused the clerk of fabricating judicial stamps.',
    pattern: 'Verb + Person + of + Crime',
    category: 'Legal Offence'
  },
  {
    type: 'Verb',
    phrase: 'blame for',
    prep: 'for',
    meaning: 'Galti ke liye doshi thehrana',
    example: 'Do not blame the assistant for the sudden technical breakdown.',
    pattern: 'Verb + Person + for + Fault',
    category: 'Accountability'
  },
  {
    type: 'Verb',
    phrase: 'comply with',
    prep: 'with',
    meaning: 'Niyamon ya court orders ka palan karna',
    example: 'All district courts must strictly comply with the roster circular.',
    pattern: 'Verb + with + Guidelines',
    category: 'Administrative'
  },
  {
    type: 'Verb',
    phrase: 'deal with',
    prep: 'with',
    meaning: 'Mamle ya person ko handle karna',
    example: 'This special bench will deal with high-priority constitutional matters.',
    pattern: 'Verb + with + Subject/Person',
    category: 'Administrative'
  },
  {
    type: 'Verb',
    phrase: 'belong to',
    prep: 'to',
    meaning: 'Kisi ka aadhikarik hissa ya swami hona',
    example: 'These archival documents belong to the High Court library.',
    pattern: 'Verb + to + Entity',
    category: 'Possession'
  },
  {
    type: 'Verb',
    phrase: 'suffer from',
    prep: 'from',
    meaning: 'Kisi bimari ya peeda se grasit hona',
    example: 'The accused claimed to suffer from temporary mental impairment.',
    pattern: 'Verb + from + Ailment',
    category: 'Condition'
  },
  {
    type: 'Verb',
    phrase: 'prevent from',
    prep: 'from',
    meaning: 'Kisi ko kuch karne se rokna',
    example: 'The security prevented unauthorized persons from entering the chamber.',
    pattern: 'Verb + Object + from + V-ing',
    category: 'Prohibition'
  },
  {
    type: 'Verb',
    phrase: 'object to',
    prep: 'to',
    meaning: 'Aapatti jatana ya virodh karna',
    example: 'The public prosecutor strongly objected to the interim bail plea.',
    pattern: 'Verb + to + V-ing/Noun',
    category: 'Judicial Objection'
  },
  {
    type: 'Verb',
    phrase: 'confide in',
    prep: 'in',
    meaning: 'Vishwas karke raaz batana',
    example: 'She confided in her senior colleague regarding the workplace issue.',
    pattern: 'Verb + in + Person',
    category: 'Trust'
  },
  {
    type: 'Verb',
    phrase: 'believe in',
    prep: 'in',
    meaning: 'Siddhant ya kisi ke samarthya par vishwas rakhna',
    example: 'The judicial system firmly believes in fair trial procedures.',
    pattern: 'Verb + in + Concept',
    category: 'Belief'
  },
  {
    type: 'Verb',
    phrase: 'consist of',
    prep: 'of',
    meaning: 'Banna ya samahit hona',
    example: 'The inquiry committee consists of three retired High Court judges.',
    pattern: 'Verb + of + Elements',
    category: 'Composition'
  },

  // Adjective + Preposition
  {
    type: 'Adjective',
    phrase: 'interested in',
    prep: 'in',
    meaning: 'Kisi vishay ya kshetra mein ruchi hona',
    example: 'He is deeply interested in cyber law and system architecture.',
    pattern: 'Adj + in + Noun/V-ing',
    category: 'Interest'
  },
  {
    type: 'Adjective',
    phrase: 'afraid of',
    prep: 'of',
    meaning: 'Bhaybheet ya dar mehsoos karna',
    example: 'The witness was afraid of potential intimidation by the accused.',
    pattern: 'Adj + of + Noun/V-ing',
    category: 'Emotion'
  },
  {
    type: 'Adjective',
    phrase: 'aware of',
    prep: 'of',
    meaning: 'Jankari ya sajagta hona',
    example: 'The presiding officer was fully aware of the previous judgments.',
    pattern: 'Adj + of + Situation',
    category: 'Cognition'
  },
  {
    type: 'Adjective',
    phrase: 'responsible for',
    prep: 'for',
    meaning: 'Karya ya parinaam ke liye utardayi hona',
    example: 'The IT manager is responsible for server uptime and cybersecurity.',
    pattern: 'Adj + for + Task/Result',
    category: 'Duty'
  },
  {
    type: 'Adjective',
    phrase: 'capable of',
    prep: 'of',
    meaning: 'Karya karne ki kshamata rakhna',
    example: 'The digital workstation is capable of processing thousands of filings.',
    pattern: 'Adj + of + V-ing',
    category: 'Capacity'
  },
  {
    type: 'Adjective',
    phrase: 'similar to',
    prep: 'to',
    meaning: 'Ke saman ya milta-julta hona',
    example: 'The current petition is substantially similar to the one dismissed earlier.',
    pattern: 'Adj + to + Entity',
    category: 'Comparison'
  },
  {
    type: 'Adjective',
    phrase: 'different from',
    prep: 'from',
    meaning: 'Se alag ya bhinn hona',
    example: 'Civil procedure rules are quite different from criminal trial norms.',
    pattern: 'Adj + from + Entity',
    category: 'Comparison'
  },
  {
    type: 'Adjective',
    phrase: 'famous for',
    prep: 'for',
    meaning: 'Kisi visheshata ke liye prasiddh hona',
    example: 'The former Chief Justice was famous for his concise yet profound rulings.',
    pattern: 'Adj + for + Trait',
    category: 'Reputation'
  },
  {
    type: 'Adjective',
    phrase: 'good at',
    prep: 'at',
    meaning: 'Kisi skill ya vishay mein kushal hona',
    example: 'The newly appointed assistant is exceptionally good at spreadsheet macros.',
    pattern: 'Adj + at + Skill',
    category: 'Ability'
  },
  {
    type: 'Adjective',
    phrase: 'satisfied with',
    prep: 'with',
    meaning: 'Santusht hona',
    example: 'The Chief Justice was fully satisfied with the courtroom digitisation progress.',
    pattern: 'Adj + with + Outcome',
    category: 'State'
  },
  {
    type: 'Adjective',
    phrase: 'eligible for',
    prep: 'for',
    meaning: 'Patra hona',
    example: 'Candidates with computer science degrees are eligible for this recruitment.',
    pattern: 'Adj + for + Position/Exam',
    category: 'Eligibility'
  },
  {
    type: 'Adjective',
    phrase: 'accustomed to',
    prep: 'to',
    meaning: 'Aadi ya abhyast hona (Followed by -ing)',
    example: 'He is accustomed to drafting official orders in strict time constraints.',
    pattern: 'Adj + to + V-ing',
    category: 'Habit'
  },
  {
    type: 'Adjective',
    phrase: 'prone to',
    prep: 'to',
    meaning: 'Galti ya samasya ki aashanka hona',
    example: 'Manual data entry systems are notoriously prone to clerical errors.',
    pattern: 'Adj + to + Risk/V-ing',
    category: 'Tendency'
  },
  {
    type: 'Adjective',
    phrase: 'devoid of',
    prep: 'of',
    meaning: 'Se poori tarah vanchit ya khali hona',
    example: 'The frivolous petition was found to be completely devoid of merit.',
    pattern: 'Adj + of + Merit/Truth',
    category: 'Absence'
  },
  {
    type: 'Adjective',
    phrase: 'senior to',
    prep: 'to',
    meaning: 'Varishtha hona (Latin comparative ending in -or)',
    example: 'Mr. Verma is four years senior to me in the administrative cadre.',
    pattern: 'Latin Comparative + to + Person',
    category: 'Rank'
  },

  // Noun + Preposition
  {
    type: 'Noun',
    phrase: 'reason for',
    prep: 'for',
    meaning: 'Kisi action ya decision ke peeche ka justification',
    example: 'The advocate explained the plausible reason for the delay in filing.',
    pattern: 'Noun + for + Action',
    category: 'Explanation'
  },
  {
    type: 'Noun',
    phrase: 'cause of',
    prep: 'of',
    meaning: 'Kisi ghatna ya bimari ka direct physical source',
    example: 'A faulty electrical circuit was identified as the primary cause of the fire.',
    pattern: 'Noun + of + Phenomenon',
    category: 'Origin'
  },
  {
    type: 'Noun',
    phrase: 'solution to',
    prep: 'to',
    meaning: 'Samasya ka kanooni ya technical hal',
    example: 'Artificial intelligence categorization offers a viable solution to case pendency.',
    pattern: 'Noun + to + Problem',
    category: 'Resolution'
  },
  {
    type: 'Noun',
    phrase: 'access to',
    prep: 'to',
    meaning: 'Sthan, data ya records tak pahunch',
    example: 'Only verified administrative staff have access to sealed trial records.',
    pattern: 'Noun + to + Facility/Data',
    category: 'Permission'
  },
  {
    type: 'Noun',
    phrase: 'demand for',
    prep: 'for',
    meaning: 'Bazaar ya prashasan mein maang',
    example: 'There is a growing demand for skilled system assistants across judicial complexes.',
    pattern: 'Noun + for + Resource',
    category: 'Requirement'
  },
  {
    type: 'Noun',
    phrase: 'effect on',
    prep: 'on',
    meaning: 'Prabhav ya asar',
    example: 'The Supreme Court constitutional ruling will have a far-reaching effect on pending cases.',
    pattern: 'Noun + on + Entity',
    category: 'Impact'
  },
  {
    type: 'Noun',
    phrase: 'increase in',
    prep: 'in',
    meaning: 'Sankhya ya matra mein badhotari',
    example: 'The high court reported a 30% increase in electronic filing submissions.',
    pattern: 'Noun + in + Metric',
    category: 'Metric'
  },
  {
    type: 'Noun',
    phrase: 'exception to',
    prep: 'to',
    meaning: 'General niyam ka apvad',
    example: 'There is virtually no exception to the principle of natural justice.',
    pattern: 'Noun + to + Rule',
    category: 'Exception'
  }
]

export default function FixedPrepositionMatrix() {
  const [activeType, setActiveType] = useState('All') // 'All' | 'Verb' | 'Adjective' | 'Noun'
  const [activePrep, setActivePrep] = useState('All')

  const availablePreps = useMemo(() => {
    const preps = new Set(COLLOCATIONS_DATA.map((d) => d.prep))
    return ['All', ...Array.from(preps).sort()]
  }, [])

  const filteredItems = useMemo(() => {
    return COLLOCATIONS_DATA.filter((item) => {
      const matchType = activeType === 'All' || item.type === activeType
      const matchPrep = activePrep === 'All' || item.prep === activePrep
      return matchType && matchPrep
    })
  }, [activeType, activePrep])

  return (
    <Card variant="default" padding="lg" className="border-primary-200 dark:border-surface-700 select-none shadow-sm space-y-5">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-600 animate-pulse" />
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Fixed Prepositions Master Matrix & Collocation Explorer
            </h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Verb, Adjective, aur Noun ke sath pair hone wale high-frequency prepositions ko interactive filters se explore karein.
          </p>
        </div>
        <Badge variant="primary" size="md">
          {filteredItems.length} Patterns Active
        </Badge>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800/60 rounded-xl border border-surface-200 dark:border-surface-700">
        {/* Part of Speech Type Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 mr-1">
            Category:
          </span>
          {['All', 'Verb', 'Adjective', 'Noun'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeType === type
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Preposition Filter Pills */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 mr-1">
            Preposition:
          </span>
          {availablePreps.map((prep) => (
            <button
              key={prep}
              type="button"
              onClick={() => setActivePrep(prep)}
              className={`px-2 py-0.5 rounded-md text-[0.6875rem] font-mono font-semibold cursor-pointer transition-colors ${
                activePrep === prep
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-surface-200/80 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
            >
              {prep}
            </button>
          ))}
        </div>
      </div>

      {/* Collocation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xs hover:border-primary-300 dark:hover:border-primary-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-heading font-bold text-sm text-primary-700 dark:text-primary-300 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-primary-600 dark:text-primary-400 shrink-0" />
                  {item.phrase}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[0.6875rem] font-bold tracking-wide uppercase ${
                  item.type === 'Verb'
                    ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : item.type === 'Adjective'
                    ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  {item.type}
                </span>
              </div>

              <p className="text-xs font-medium text-surface-800 dark:text-surface-200 mb-1.5">
                {item.meaning}
              </p>

              <p className="text-xs text-surface-600 dark:text-surface-400 italic bg-surface-50 dark:bg-surface-800/80 p-2 rounded-lg border border-surface-100 dark:border-surface-700/60 leading-relaxed">
                "{item.example}"
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between text-[0.6875rem] font-mono text-surface-500 dark:text-surface-400">
              <span>{item.pattern}</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-primary-50/50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800 text-xs text-primary-900 dark:text-primary-200 flex items-center justify-between">
        <span>💡 <strong>Collocation Strategy:</strong> Preposition ko isolated mat yaad karein. Hamesha complete 3-word phrase bolkar revise karein: 'accuse OF theft', 'solution TO problem', 'eligible FOR post'.</span>
      </div>
    </Card>
  )
}
