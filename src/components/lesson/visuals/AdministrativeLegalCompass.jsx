import { useState } from 'react'
import { Compass, Briefcase, AlertOctagon } from 'lucide-react'
import { Card, Badge } from '../../common'

const LEGAL_SECTORS = [
  {
    sector: 'Compliance & Adherence',
    items: [
      {
        term: 'abide by',
        meaning: 'Court ke order ya contract ki sharton par kayam rehna',
        example: 'Every citizen and government authority must abide by the final judgment.',
        pattern: 'abide + BY + Rule/Decree',
        trap: 'Never say *abide with or *abide to.'
      },
      {
        term: 'adhere to',
        meaning: 'Niyam, timeline ya policy par dridh rehna',
        example: 'Court clerks must strictly adhere to the designated filing schedule.',
        pattern: 'adhere + TO + Norms/Schedule',
        trap: 'Do not confuse with abide by.'
      },
      {
        term: 'comply with',
        meaning: 'Guidelines ya statutory directions ka anupalan karna',
        example: 'The hardware configuration must comply with national e-court guidelines.',
        pattern: 'comply + WITH + Regulations',
        trap: 'Examiner tests *comply to or *comply by.'
      },
      {
        term: 'pursuant to',
        meaning: 'Ke anusaran mein / ke tahet (Formal legal phrase)',
        example: 'Pursuant to the directions issued by the Chief Justice, a report was filed.',
        pattern: 'pursuant + TO + Order/Notification',
        trap: 'Common in official High Court circulars.'
      }
    ]
  },
  {
    sector: 'Judicial Trial & Verdicts',
    items: [
      {
        term: 'acquit of',
        meaning: 'Aarop ya jurm se ba-izzat bari karna',
        example: 'The Division Bench acquitted the respondent of all charges of corruption.',
        pattern: 'acquit + Person + OF + Offence',
        trap: 'Hindi "aarop se bari" leads to *acquitted from. Always use OF!'
      },
      {
        term: 'convict of',
        meaning: 'Kisi apradh ka doshi thehrana',
        example: 'He was convicted of conspiracy and cyber espionage under the IT Act.',
        pattern: 'convict + Person + OF + Crime',
        trap: 'Never say *convicted for a crime in standard legal English.'
      },
      {
        term: 'charge with',
        meaning: 'Kisi apradh ka formal arop lagana',
        example: 'The magistrate charged the accused with criminal breach of trust.',
        pattern: 'charge + Person + WITH + Charge',
        trap: 'Contrast: accused OF vs charged WITH.'
      },
      {
        term: 'exonerate from',
        meaning: 'Kisi dosh ya liability se poori tarah mukt karna',
        example: 'The departmental inquiry fully exonerated the clerk from the allegations.',
        pattern: 'exonerate + FROM + Blame/Liability',
        trap: 'Takes "from", unlike acquit which takes "of".'
      }
    ]
  },
  {
    sector: 'Authority, Vesting & Powers',
    items: [
      {
        term: 'vested in',
        meaning: 'Shaktiyan kisi aadhikarik pad ya sanstha ke andar nihit hona',
        example: 'The power to grant superannuation benefits is vested in the Registrar General.',
        pattern: 'Power is vested + IN + Authority',
        trap: 'Vested IN the office (Institution/Seat).'
      },
      {
        term: 'vested with',
        meaning: 'Kisi officer ko vishesh shaktiyon se susajjit karna',
        example: 'The special inspection committee was vested with full discovery powers.',
        pattern: 'Official is vested + WITH + Powers',
        trap: 'Vested WITH powers (Endowed with authority).'
      },
      {
        term: 'incumbent on / upon',
        meaning: 'Kisi padadhikari ke liye kanoonan anivarya ya farz hona',
        example: 'It is incumbent upon the System Assistant to test server recovery protocols.',
        pattern: 'incumbent + ON/UPON + Official',
        trap: 'Means "morally or legally binding duty".'
      },
      {
        term: 'jurisdiction over',
        meaning: 'Kisi territory ya mamle par kanooni aadhikar kshetra',
        example: 'The High Court exercises territorial jurisdiction over all subordinate courts.',
        pattern: 'jurisdiction + OVER + Territory/Matter',
        trap: 'Do not use *jurisdiction at.'
      }
    ]
  },
  {
    sector: 'Procedural Conduct & Disposal',
    items: [
      {
        term: 'dispose of',
        meaning: 'Files, petitions ya sampatti ka formal nistaran karna',
        example: 'The learned judge disposed of twenty pending writ appeals in a single sitting.',
        pattern: 'dispose + OF (Single F!)',
        trap: 'FATAL EXAM ERROR: Writing *dispose off (double f is completely wrong!).'
      },
      {
        term: 'tamper with',
        meaning: 'Records, evidence ya code ke sath anadhikrit chhedchhad karna',
        example: 'Any attempt to tamper with the electronic voting or logging records is penalized.',
        pattern: 'tamper + WITH + Records/System',
        trap: 'Never say *tamper in or *tamper to.'
      },
      {
        term: 'connive at',
        meaning: 'Galat kaam ya bhrashtachar ki taraf aankh moondna ya maun sahmati dena',
        example: 'The senior superintendent was found to have connived at the irregularities.',
        pattern: 'connive + AT + Malpractice',
        trap: 'Takes "at", not *with.'
      },
      {
        term: 'refrain from',
        meaning: 'Kisi aacharan ya bolne se swayam ko roke rakhna',
        example: 'Judicial officers must refrain from public commentary on active sub-judice matters.',
        pattern: 'refrain + FROM + V-ing',
        trap: 'Always takes "from" + Gerund.'
      }
    ]
  }
]

export default function AdministrativeLegalCompass() {
  const [selectedSectorIdx, setSelectedSectorIdx] = useState(0)

  const activeSector = LEGAL_SECTORS[selectedSectorIdx]

  return (
    <Card variant="default" padding="lg" className="border-blue-200 dark:border-surface-700 select-none shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              High Court Administrative & Legal Collocation Compass
            </h3>
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            Rajasthan High Court aur judicial exam notifications mein recurring statutory fixed prepositions ka categorized reference.
          </p>
        </div>
        <Badge variant="secondary" size="md">
          Judicial Domain High-Yield
        </Badge>
      </div>

      {/* Sector Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {LEGAL_SECTORS.map((sec, idx) => (
          <button
            key={sec.sector}
            type="button"
            onClick={() => setSelectedSectorIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              selectedSectorIdx === idx
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 border border-surface-200 dark:border-surface-700'
            }`}
          >
            <Briefcase size={13} />
            <span>{sec.sector}</span>
          </button>
        ))}
      </div>

      {/* Items Grid for Active Sector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {activeSector.items.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-blue-700 dark:text-blue-300 font-mono">
                {item.term}
              </span>
              <span className="text-[0.6875rem] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                {item.pattern}
              </span>
            </div>

            <p className="text-xs text-surface-800 dark:text-surface-200 font-medium">
              {item.meaning}
            </p>

            <p className="text-xs text-surface-600 dark:text-surface-400 italic bg-surface-50 dark:bg-surface-800/80 p-2 rounded-lg border border-surface-100 dark:border-surface-700/60 leading-relaxed">
              "{item.example}"
            </p>

            <div className="text-[0.6875rem] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5 pt-1">
              <AlertOctagon size={13} className="shrink-0" />
              <span>{item.trap}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
        <span>⚖️ <strong>Golden Judicial Rule:</strong> Always remember: <em>dispose OF</em> (Single 'f'), <em>acquit OF</em>, <em>charge WITH</em>, <em>abide BY</em>, and <em>comply WITH</em>.</span>
      </div>
    </Card>
  )
}
