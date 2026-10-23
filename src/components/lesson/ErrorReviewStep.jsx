import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  Check,
  ArrowRight,
  TrendingUp,
  GraduationCap,
} from 'lucide-react'
import { Card, Badge, Button } from '../common'
import { useProgress } from '../../hooks/useProgress'
import { useLesson } from '../../hooks/useLesson'

export default function ErrorReviewStep({ lessonId = 'L01' }) {
  const isL18 = lessonId === 'L18'
  const isL19 = lessonId === 'L19'
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
  const { getLessonErrors, resolveError, progress } = useProgress()
  const { goToStep } = useLesson()

  const lessonErrors = useMemo(() => getLessonErrors(lessonId) || [], [getLessonErrors, lessonId])
  const [activeFilter, setActiveFilter] = useState('unresolved') // 'all' | 'unresolved' | 'resolved'
  const [retryAnswers, setRetryAnswers] = useState({}) // { [questionId]: { selected: 'A', isCorrect: bool } }

  // Step 10 is completed via Finish Lesson / Mark Step Complete buttons in footer

  const totalErrors = lessonErrors.length
  const resolvedCount = lessonErrors.filter((e) => e.reviewed || e.lastRetrySuccess).length
  const unresolvedCount = totalErrors - resolvedCount

  // Filtered errors
  const filteredErrors = useMemo(() => {
    return lessonErrors.filter((e) => {
      const isResolved = e.reviewed || e.lastRetrySuccess
      if (activeFilter === 'unresolved') return !isResolved
      if (activeFilter === 'resolved') return isResolved
      return true
    })
  }, [lessonErrors, activeFilter])

  // Aggregate errors by rule/subtopic for weak area diagnostics
  const weakAreas = useMemo(() => {
    const groups = {}
    lessonErrors.forEach((e) => {
      const key = e.ruleReference || e.subtopic || 'General Tense Rules'
      if (!groups[key]) {
        groups[key] = {
          label: key,
          count: 0,
          unresolvedCount: 0,
        }
      }
      groups[key].count++
      if (!e.reviewed && !e.lastRetrySuccess) {
        groups[key].unresolvedCount++
      }
    })
    return Object.values(groups).sort((a, b) => b.unresolvedCount - a.unresolvedCount)
  }, [lessonErrors])

  // Handle immediate in-place retry of a missed question
  const handleRetrySelect = (questionId, optionId, correctAnswer) => {
    const isCorrect = optionId === correctAnswer
    setRetryAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selected: optionId,
        isCorrect,
      },
    }))

    if (isCorrect) {
      resolveError(questionId)
    }
  }

  // Get pedagogical remediation advice for a specific rule
  const getRemediationTip = (ruleText = '') => {
    if (isL18) {
      if (ruleText.includes('RC-01') || ruleText.includes('RC-02') || ruleText.toLowerCase().includes('invariance') || ruleText.toLowerCase().includes('preservation')) {
        return "Prefix Invariance & Spelling Preservation: Prefix attach karte waqt base word ka spelling alter nahi hota ('un-' + 'necessary' = unnecessary; 'dis-' + 'satisfied' = dissatisfied). Double letters strictly retain honge."
      }
      if (ruleText.includes('RC-03') || ruleText.includes('RC-04') || ruleText.toLowerCase().includes('assimilation') || ruleText.toLowerCase().includes('negative')) {
        return "Phonetic Assimilation & Negative Prefix Concord: Latin prefix 'in-' lips sounds (p, b, m) se pehle 'im-' banta hai (impossible, immature), 'l' se pehle 'il-' (illegal), aur 'r' se pehle 'ir-' (irregular). Root origin ke according prefix match karein."
      }
      if (ruleText.includes('RC-05') || ruleText.includes('RC-06') || ruleText.includes('RC-07') || ruleText.toLowerCase().includes('noun') || ruleText.toLowerCase().includes('verb') || ruleText.toLowerCase().includes('adjective')) {
        return "Category Shifting Suffixes: Suffixes base words ki grammatical class change karte hain: -ment, -tion, -ness, -ity form Nouns; -ify, -ize, -en form Verbs; -able, -ful, -ous form Adjectives; -ly forms Adverbs. Sentence ki syntactic requirement check karein."
      }
      if (ruleText.includes('RC-08') || ruleText.includes('RC-09') || ruleText.toLowerCase().includes('-able') || ruleText.toLowerCase().includes('-ible')) {
        return "Suffix Concord (-able vs -ible): Complete independent English base words aksar '-able' lete hain (dependable, enjoyable). Latin bound roots (jo akele word nahi ban sakte) strictly '-ible' lete hain (audible, visible, incredible, edible)."
      }
      if (ruleText.includes('RC-10') || ruleText.includes('RC-11') || ruleText.includes('RC-12') || ruleText.toLowerCase().includes('spelling') || ruleText.toLowerCase().includes('silent e') || ruleText.toLowerCase().includes('doubling')) {
        return "Spelling Adjustment Rules: Vowel suffix aane par silent final 'e' drop hota hai (hope + -ing = hoping; create + -ive = creative). CVC monosyllabic words mein suffix aane par final consonant double hota hai (run + -er = runner)."
      }
      if (ruleText.includes('RC-13') || ruleText.includes('RC-14') || ruleText.toLowerCase().includes('latin') || ruleText.toLowerCase().includes('greek') || ruleText.toLowerCase().includes('-ceed') || ruleText.toLowerCase().includes('-cede')) {
        return "Classical Affixes & Confusing Endings: Sirf 3 words '-ceed' par end hote hain: exceed, proceed, succeed. Sirf 1 word '-sede' par end hota hai: supersede. Baaki sabhi '-cede' follow karte hain (precede, recede, concede, intercede)."
      }
      return 'Prefix invariance, assimilation rules, grammatical class shifts, aur spelling adjustment laws ko review karein.'
    }
    if (isL19) {
      if (ruleText.includes('RC-01') || ruleText.includes('RC-02') || ruleText.includes('PIT-01') || ruleText.toLowerCase().includes('literal') || ruleText.toLowerCase().includes('figurative')) {
        return "Literal vs Figurative Semantics: Idioms figurative expressions hote hain jinka meaning physical dictionary words se bilkul alag hota hai. Agar kisi option mein physical words (jaise 'spill beans' mein beans girna, 'bite bullet' mein goli chabana) ka direct zikr ho, toh use foran eliminate karein."
      }
      if (ruleText.includes('RC-03') || ruleText.includes('RC-04') || ruleText.includes('PIT-02') || ruleText.toLowerCase().includes('structural') || ruleText.toLowerCase().includes('invariance') || ruleText.toLowerCase().includes('preposition')) {
        return "Structural & Lexical Invariance: Idioms structurally frozen expressions hote hain. Inka preposition, noun ya article replace nahi kiya ja sakta ('at the eleventh hour' valid hai, *at the eleventh moment galat hai; 'beat about the bush' valid hai, *beat round the forest galat hai)."
      }
      if (ruleText.includes('RC-05') || ruleText.includes('RC-06') || ruleText.includes('PIT-04') || ruleText.toLowerCase().includes('context') || ruleText.toLowerCase().includes('tone') || ruleText.toLowerCase().includes('valence')) {
        return "Context Clue & Tone Alignment: Sentence ke context clues aur tone (positive, negative, formal, informal) ko match karein. Crisis scenario mein 'burn the midnight oil' nahi, balki 'weather the storm' ya 'bite the bullet' fit hoga."
      }
      if (ruleText.includes('RC-07') || ruleText.includes('RC-08') || ruleText.includes('RC-09') || ruleText.includes('PIT-03') || ruleText.toLowerCase().includes('lookalike') || ruleText.toLowerCase().includes('confusing') || ruleText.toLowerCase().includes('pair')) {
        return "Lookalike Idiom Disambiguation: Similar sounding idioms ke core nuances check karein. 'Burn midnight oil' = late night work/study; 'Burn candle at both ends' = early morning till late night overwork; 'In the nick of time' = just before too late; 'At the eleventh hour' = at the final moment."
      }
      if (ruleText.includes('RC-10') || ruleText.includes('RC-11') || ruleText.includes('RC-12') || ruleText.includes('RC-13') || ruleText.includes('RC-14') || ruleText.toLowerCase().includes('binomial') || ruleText.toLowerCase().includes('body') || ruleText.toLowerCase().includes('animal')) {
        return "Binomial Pairs & Category Patterns: 'Pros and cons', 'ins and outs', 'by leaps and bounds' fixed irreversible order mein aate hain. Animal aur body-part idioms mein figurative association (cold feet = nervousness, crocodile tears = insincere grief) ko pinpoint karein."
      }
      return 'Idioms ke figurative meaning, structural invariance, context tone alignment, aur lookalike disambiguation ko review karein.'
    }
    if (isL17) {
      if (ruleText.includes('RC-01') || ruleText.includes('RC-02') || ruleText.includes('RC-03') || ruleText.toLowerCase().includes('morpheme') || ruleText.toLowerCase().includes('root')) {
        return "Morpheme Vector & Root Derivation: Greek aur Latin roots ko isolate karein (-cide = killing, -cracy = governance, -logy = study). Suffix stem batata hai ki target word action hai, institution hai ya concept."
      }
      if (ruleText.includes('RC-04') || ruleText.includes('RC-05') || ruleText.toLowerCase().includes('part of speech') || ruleText.toLowerCase().includes('grammatical')) {
        return "Grammatical Part-of-Speech Filter: Question stem ki syntactic requirement check karein. 'A person who...' Noun demand karta hai (optimist, NOT optimistic); 'Capable of being...' Adjective demand karta hai (edible, NOT eatable)."
      }
      if (ruleText.includes('RC-06') || ruleText.includes('RC-07') || ruleText.toLowerCase().includes('defining clue') || ruleText.toLowerCase().includes('single word shift')) {
        return "Single Defining Clue Isolation: Question stem ke defining modifier par focus karein. 'All-knowing' = omniscient, 'all-powerful' = omnipotent, 'present everywhere' = omnipresent. Har defining feature exact root se match karta hai."
      }
      if (ruleText.includes('RC-08') || ruleText.includes('RC-09') || ruleText.includes('RC-10') || ruleText.toLowerCase().includes('lookalike') || ruleText.toLowerCase().includes('confusing')) {
        return "Confusing Pair Disambiguation: Closely related words mein operational boundary check karein. Arbitrator ka faisla legally binding award hota hai, jabki Mediator sirf negotiation facilitate karta hai; Autobiography khud likhi jaati hai, Biography doosre dwara."
      }
      if (ruleText.includes('RC-11') || ruleText.includes('RC-12') || ruleText.includes('RC-13') || ruleText.includes('RC-14') || ruleText.toLowerCase().includes('phobia') || ruleText.toLowerCase().includes('mania')) {
        return "Specialized Domains (Phobia/Mania/Government): -phobia irrational aversion/fear hai (Claustrophobia = closed spaces), -mania obsessive compulsion hai (Kleptomania = stealing). Plutocracy ameer logon ka shasan hai, Aristocracy noble class ka."
      }
      return 'One-word substitution ke semantic root, grammatical category, defining clue, aur distractor contrast ko review karein.'
    }
    if (isL15) {
      if (ruleText.includes('RC-01') || ruleText.includes('RC-02') || ruleText.includes('RC-03') || ruleText.includes('PIT-04') || ruleText.toLowerCase().includes('coordinating') || ruleText.toLowerCase().includes('fanboys')) {
        return "Coordinating Conjunctions (FANBOYS): For, And, Nor, But, Or, Yet, So hamesha grammatically equal units ko jodte hain. Do independent clauses ke beech coordinating conjunction se pehle comma lagana mandatory hai, comma splice ya run-on sentences se bachein."
      }
      if (ruleText.includes('RC-04') || ruleText.includes('RC-05') || ruleText.includes('PIT-01') || ruleText.toLowerCase().includes('subordinating') || ruleText.toLowerCase().includes('double conjunction')) {
        return "Zero Double Conjunction Law: Although/Though ya Because/Since ke sath subordinate clause shuru hone par main clause mein 'yet/but' ya 'therefore/so' lagana strictly prohibited hai. Dono me se sirf ek connective use karein."
      }
      if (ruleText.includes('RC-06') || ruleText.includes('RC-07') || ruleText.includes('PIT-02') || ruleText.includes('PIT-03') || ruleText.toLowerCase().includes('correlative') || ruleText.toLowerCase().includes('inversion')) {
        return "Correlative Conjunctions & Parallelism: Neither...nor, Either...or, Not only...but also ke sath dono elements identical grammatical form mein hone chahiye. 'Hardly/Scarcely' ke sath 'when' aur 'No sooner' ke sath 'than' ka pair yaad rakhein, inversion (had/did + subject) mandatory hai."
      }
      if (ruleText.includes('RC-08') || ruleText.includes('RC-09') || ruleText.includes('PIT-07') || ruleText.toLowerCase().includes('relative') || ruleText.toLowerCase().includes('restrictive')) {
        return "Relative Pronouns Rule: Restrictive essential clauses ke liye 'that' (no comma) aur non-restrictive additional information clauses ke liye comma ke sath 'which' use hota hai. Persons ke subject ke liye 'who' aur object ke liye 'whom' use karein."
      }
      if (ruleText.includes('RC-10') || ruleText.includes('RC-11') || ruleText.includes('RC-12') || ruleText.includes('RC-13') || ruleText.includes('RC-14') || ruleText.toLowerCase().includes('confused') || ruleText.toLowerCase().includes('homophone')) {
        return "Confused Words Precision: 'Affect' verb (influence karna) hai aur 'effect' noun (result) hai. 'Principal' school head ya main sum hota hai, jabki 'principle' moral rule ya siddhant hai. 'Complement' purak (complete karna) hai aur 'compliment' tareef (praise) hai."
      }
      return 'Connective syntax, punctuation rules, correlative pair harmony, aur commonly confused words ke exact meaning ko review karein.'
    }
    if (isL09) {
      if (ruleText.includes('RC-06') || ruleText.includes('PIT-02') || ruleText.includes('PIT-03') || ruleText.toLowerCase().includes('any other') || ruleText.toLowerCase().includes('self-exclusion')) {
        return "Self-Exclusion Rule (Any other): Comparative degree mein jab subject ko usi ke group se compare kiya jaye, toh 'any other + singular noun' lagana zaroori hai taaki subject khud se compare na ho. Superlative mein 'other' use nahi hota."
      }
      if (ruleText.includes('RC-07') || ruleText.includes('PIT-04') || ruleText.includes('PIT-05') || ruleText.toLowerCase().includes('one of the')) {
        return "One of the Subset Rule: 'One of the + superlative + plural noun' ka positive form hamesha 'Very few + plural noun + plural verb + as + adjective + as' aur comparative 'than most other + plural noun' banta hai."
      }
      if (ruleText.includes('RC-08') || ruleText.toLowerCase().includes('two entities')) {
        return "Two Entities Boundary: Jab sirf do entities ka comparison ho, toh Superlative degree strictly prohibited hai. Sirf Comparative degree use karein (A is better than B / B is not as good as A)."
      }
      if (ruleText.includes('RC-10') || ruleText.includes('PIT-06') || ruleText.toLowerCase().includes('latin')) {
        return "Latin Comparatives Rule: Senior, junior, superior, inferior, prior, prefer ke sath preposition 'to' lagta hai, 'than' lagana strictly prohibited hai aur inke pehle 'more/most' nahi lagta."
      }
      if (ruleText.includes('PIT-01') || ruleText.toLowerCase().includes('double comparative')) {
        return "Double Degree Trap: Ek hi adjective ke sath '-er' aur 'more' ya '-est' aur 'most' dono ek sath lagana strictly prohibited hai ('*more taller', '*most fastest' incorrect hain)."
      }
      if (ruleText.includes('RC-01') || ruleText.includes('equality') || ruleText.includes('as...as')) {
        return "Equality Comparison Rule: Positive degree mein 'as + adjective + as' lagta hai. Negative sentences mein 'not so/as + adjective + as' valid hota hai. Adjective base form mein hona chahiye."
      }
      return 'Adjective ki correct degree, formation rule, aur self-exclusion formula ko review karein.'
    }
    if (ruleText.includes('RC-01') || ruleText.includes('PIT-01') || ruleText.toLowerCase().includes('inversion')) {
      return "Question Inversion Removal: Reported question statement ban jata hai (Subject + Verb), interrogative inversion (Verb + Subject) khatam ho jata hai. Question mark hata kar full stop lagayein."
    }
    if (ruleText.includes('RC-02') || ruleText.includes('PIT-06') || ruleText.toLowerCase().includes('whether')) {
      return "Whether vs If Rule: Jab sentence mein direct alternative 'or not' ho ya preposition ke baad clause ho, tab 'whether' mandatory hota hai, 'if' strictly prohibited hai."
    }
    if (ruleText.includes('RC-03') || ruleText.includes('PIT-02') || ruleText.toLowerCase().includes('double conjunction')) {
      return "Zero 'That' Rule: Wh-questions (what, why, where) aur if/whether ke pehle conjunction 'that' lagana strictly prohibited hai ('*that why', '*that if' incorrect hain)."
    }
    if (ruleText.includes('RC-04') || ruleText.includes('RC-06') || ruleText.toLowerCase().includes('imperative')) {
      return "Imperative Infinitive Rule: Imperative mood reported speech mein direct infinitive ('to + V₁') banta hai. Tense backshift nahi hota aur reporting verb context ke hisab se ordered/requested/advised banti hai."
    }
    if (ruleText.includes('RC-05') || ruleText.includes('PIT-03') || ruleText.toLowerCase().includes('forbade')) {
      return "Double Negative Trap: 'Forbade' khud negative reporting verb hai. Iske sath 'not' lagana prohibited hai (forbade + object + to + V₁). Agar 'told/ordered' use ho toh 'not to + V₁' lagayein."
    }
    if (ruleText.includes('RC-07') || ruleText.includes('PIT-04') || ruleText.toLowerCase().includes('please')) {
      return "Polite Markers Drop: Indirect speech mein 'please', 'kindly', 'sir' jaise polite markers drop ho jate hain kyunki reporting verb 'requested' unka sense pehle hi convey kar deti hai."
    }
    if (ruleText.includes('RC-09') || ruleText.toLowerCase().includes('exclamatory')) {
      return "Exclamatory Conversion: Interjections (Hurrah, Alas, Wow) drop karein aur 'exclaimed with joy/sorrow/wonder that + assertive clause' ka structure use karein."
    }
    if (ruleText.includes('RC-10') || ruleText.includes('PIT-05') || ruleText.toLowerCase().includes('optative')) {
      return "Optative Prayer Rule: Wishes aur blessings mein 'prayed/wished that + subject + might + V₁' use karein. Inversion 'May God' se hat kar 'God might' ban jata hai."
    }
    if (ruleText.toLowerCase().includes('article') || ruleText.toLowerCase().includes('phonetic')) {
      return "Phonetic Sound Law: 'A' vs 'An' select karte waqt pehla spoken sound suno. Vowel sound = AN ('an FIR', 'an hour'); Consonant sound = A ('a university', 'a European')."
    }
    if (ruleText.toLowerCase().includes('few') || ruleText.toLowerCase().includes('little')) {
      return "Countability & Polarity: Plural countable ke sath Few (negative) / A few (positive); Uncountable ke sath Little (negative) / A little (positive). Defining clause hone par 'The few' / 'The little' use karein."
    }
    if (ruleText.toLowerCase().includes('distributive') || ruleText.toLowerCase().includes('each') || ruleText.toLowerCase().includes('neither')) {
      return "Distributive Concord: Each / Every / Either / Neither strictly singular noun aur singular verb lete hain. 2 entities ke liye Either/Neither; 3+ entities ke liye Any/None use karein."
    }
    if (ruleText.includes('TH-05') || ruleText.toLowerCase().includes('universal truth')) {
      return "Golden Exception: Universal truths, astronomical facts, aur scientific laws kabhi bhi past mein backshift nahi hote. Ye hamesha Simple Present (V₁/V_s/es) mein rehte hain."
    }
    if (ruleText.includes('TH-04') || ruleText.toLowerCase().includes('future-in-the-past')) {
      return "Future-in-the-Past Rule: Past frame mein future event report karte waqt 'will' ka backshift hokar 'would', aur 'shall' ka 'should' ban jata hai."
    }
    if (ruleText.includes('TH-03') || ruleText.toLowerCase().includes('anterior') || ruleText.toLowerCase().includes('past perfect')) {
      return "Anterior Priority: Past ke do sequential actions mein se pehle complete huye action ke liye Past Perfect ('had + V₃') lagta hai; baad wale action ke liye Simple Past ('V₂') aana chahiye."
    }
    if (ruleText.includes('TH-08') || ruleText.toLowerCase().includes('purpose') || ruleText.toLowerCase().includes('so that')) {
      return "Purpose Concord: Present Main Verb + 'so that' ➔ 'may + V₁'. Past Main Verb + 'so that' ➔ 'might + V₁'. Conjunction 'lest' ke sath hamesha 'should' lagta hai."
    }
    if (ruleText.includes('T-05') || ruleText.toLowerCase().includes('simple past')) {
      return "Definite Past Anchor: Past time markers (yesterday, ago, last year) ke sath completed actions strictly Simple Past (V₂) lete hain. Present Perfect kabhi use na karein."
    }
    if (ruleText.includes('T-06') || ruleText.toLowerCase().includes('present perfect continuous')) {
      return "Yaad rakhein: 'Since' specific starting point of time batata hai (since 2018, since Monday); 'for' time duration batata hai (for three hours, for five days)."
    }
    return 'Sahi tense formula lock karne ke liye exact auxiliary concord aur contextual time markers ko review karein.'
  }

  // Lesson status metrics from progress context
  const currentLessonProgress = progress?.lessons?.[lessonId] || {}
  const scores = currentLessonProgress.scores || {}
  const isMastered = currentLessonProgress.status === 'mastered' || scores.mastery?.passed

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Step 10 • Error Bank & Remediation</Badge>
            <span className="text-xs text-surface-500 dark:text-surface-400">Targeted Mistake Remediation</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-surface-900 dark:text-white">
            Mistake Review & Final Mastery Checklist
          </h2>
        </div>

        {/* Metrics Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-surface-100 dark:bg-surface-800 text-xs font-semibold text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700">
            Total Missed: <strong className="text-surface-900 dark:text-white">{totalErrors}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-success-50 dark:bg-success-950/40 text-xs font-semibold text-success-700 dark:text-success-400 border border-success-200 dark:border-success-800">
            Resolved: <strong>{resolvedCount}</strong>
          </span>
        </div>
      </div>

      {/* Zero Errors State */}
      {totalErrors === 0 ? (
        <Card
          variant="default"
          padding="xl"
          className="text-center py-12 border-success-200 dark:border-success-900/40 bg-gradient-to-b from-success-50/30 to-transparent dark:from-success-950/20 space-y-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-success-100 dark:bg-success-900/60 text-success-700 dark:text-success-300 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck size={36} />
          </div>
          <div className="space-y-1">
            <Badge variant="success" size="sm">Flawless Execution</Badge>
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white font-heading">
              Error Bank Khali Hai!
            </h3>
            <p className="text-xs md:text-sm text-surface-600 dark:text-surface-300 max-w-md mx-auto leading-relaxed">
              Aapne Lesson {lessonId.replace('L', '')} ki practice mein ek bhi galat answer nahi diya. Har question 100% accuracy ke sath solve hua!
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Weak-Area Diagnostic Summary */}
          {weakAreas.length > 0 && (
            <Card variant="default" padding="lg" className="border-amber-200 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-amber-600 dark:text-amber-400" />
                <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
                  Targeted Revision Recommendations
                </h4>
              </div>

              <div className="space-y-2">
                {weakAreas.slice(0, 3).map((area, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[0.625rem] flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-xs text-surface-900 dark:text-white truncate">
                          {area.label}
                        </span>
                      </div>
                      <p className="text-[0.6875rem] text-surface-600 dark:text-surface-400 pl-7">
                        {getRemediationTip(area.label)}
                      </p>
                    </div>

                    <Badge variant={area.unresolvedCount > 0 ? 'warning' : 'success'} size="sm" className="shrink-0 self-start sm:self-auto">
                      {area.unresolvedCount > 0 ? `${area.unresolvedCount} Pending` : 'All Resolved'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
            <span className="text-xs font-bold text-surface-700 dark:text-surface-300">
              Filter Mistakes:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'unresolved', label: `Pending (${unresolvedCount})` },
                { id: 'resolved', label: `Resolved (${resolvedCount})` },
                { id: 'all', label: `All Missed (${totalErrors})` },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeFilter === tab.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter(tab.id)}
                  className="text-xs"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mistake Items Card List */}
          <div className="space-y-4">
            {filteredErrors.length === 0 ? (
              <div className="text-center py-8 text-surface-500 text-xs">
                Is filter ke liye koi questions nahi hain.
              </div>
            ) : (
              filteredErrors.map((err) => {
                const retryState = retryAnswers[err.questionId]
                const isItemResolved = err.reviewed || err.lastRetrySuccess || retryState?.isCorrect

                return (
                  <Card
                    key={err.questionId}
                    variant="default"
                    padding="lg"
                    className={`border transition-all space-y-4 ${
                      isItemResolved
                        ? 'border-success-300 dark:border-success-800/80 bg-success-50/10'
                        : 'border-surface-200 dark:border-surface-700 hover:border-danger-200'
                    }`}
                  >
                    {/* Top Item Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-100 dark:border-surface-700/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-surface-500">
                          {err.questionId}
                        </span>
                        <Badge variant="neutral" size="sm">{err.stage || 'practice'}</Badge>
                        <Badge variant="warning" size="sm">{err.difficulty || 'medium'}</Badge>
                      </div>

                      {isItemResolved ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success-600 dark:text-success-400">
                          <CheckCircle2 size={16} /> Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-danger-600 dark:text-danger-400">
                          <XCircle size={16} /> Unresolved
                        </span>
                      )}
                    </div>

                    {/* Question Prompt */}
                    <div className="space-y-1">
                      <span className="text-[0.625rem] uppercase font-bold text-surface-400">Question Stem:</span>
                      <p className="font-heading font-semibold text-sm text-surface-900 dark:text-white leading-relaxed">
                        {err.prompt}
                      </p>
                    </div>

                    {/* Interactive Immediate Retake Options */}
                    <div className="space-y-2">
                      <span className="text-[0.625rem] uppercase font-bold text-surface-400">
                        Interactive Retake (Click to Retry):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {err.options?.map((opt) => {
                          const isOptionCorrect = opt.id === err.correctAnswer
                          const isSelectedInRetry = retryState?.selected === opt.id
                          const isPreviousMistake = err.selectedAnswer === opt.id

                          let btnStyle = 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700'

                          if (retryState) {
                            if (isOptionCorrect) {
                              btnStyle = 'border-success-500 bg-success-50 dark:bg-success-950/50 text-success-800 dark:text-success-200 font-bold'
                            } else if (isSelectedInRetry) {
                              btnStyle = 'border-danger-500 bg-danger-50 dark:bg-danger-950/50 text-danger-800 dark:text-danger-200'
                            }
                          } else if (isPreviousMistake) {
                            btnStyle = 'border-danger-300 dark:border-danger-900 bg-danger-50/40 dark:bg-danger-950/20 text-danger-700 dark:text-danger-300'
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleRetrySelect(err.questionId, opt.id, err.correctAnswer)}
                              className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold w-5 h-5 rounded-md bg-surface-100 dark:bg-surface-700 flex items-center justify-center shrink-0">
                                  {opt.id}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                              {retryState && isOptionCorrect && (
                                <Check size={14} className="text-success-600 dark:text-success-400 shrink-0" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Verified Remediation Solution */}
                    <div className="pt-2 text-xs space-y-1 border-t border-surface-100 dark:border-surface-700/60">
                      <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                        <strong className="text-surface-900 dark:text-white">Explanation: </strong>
                        {err.explanation}
                      </p>
                      <div className="flex items-start gap-1.5 text-primary-700 dark:text-primary-400 pt-0.5">
                        <BookOpen size={13} className="shrink-0 mt-0.5" />
                        <span className="font-medium">{err.ruleReference}</span>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* FINAL LESSON COMPLETION BANNER */}
      <Card
        variant="default"
        padding="xl"
        className="mt-8 border-primary-300 dark:border-primary-800 bg-gradient-to-r from-primary-50/60 via-white to-primary-50/60 dark:from-primary-950/30 dark:via-surface-900 dark:to-primary-950/30 shadow-md"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-800 dark:text-primary-300 text-xs font-bold">
              <GraduationCap size={15} />
              <span>
                {isL18
                  ? 'Lesson 18 Milestone Accomplished'
                  : isL19
                  ? 'Lesson 19 Milestone Accomplished'
                  : isL17
                  ? 'Lesson 17 Milestone Accomplished'
                  : isL16
                  ? 'Lesson 16 Milestone Accomplished'
                  : isL15
                  ? 'Lesson 15 Milestone Accomplished'
                  : isL14
                  ? 'Lesson 14 Milestone Accomplished'
                  : isL13
                  ? 'Lesson 13 Milestone Accomplished'
                  : isL12
                  ? 'Lesson 12 Milestone Accomplished'
                  : isL11
                  ? 'Lesson 11 Milestone Accomplished'
                  : isL10
                  ? 'Lesson 10 Milestone Accomplished'
                  : isL09
                  ? 'Lesson 09 Milestone Accomplished'
                  : isL08
                  ? 'Lesson 08 Milestone Accomplished'
                  : isL07
                  ? 'Lesson 07 Milestone Accomplished'
                  : isL06
                  ? 'Lesson 06 Milestone Accomplished'
                  : isL05
                  ? 'Lesson 05 Milestone Accomplished'
                  : isL04
                  ? 'Lesson 04 Milestone Accomplished'
                  : isL03
                  ? 'Lesson 03 Milestone Accomplished'
                  : isL02
                  ? 'Lesson 02 Milestone Accomplished'
                  : 'Lesson 01 Milestone Accomplished'}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-surface-900 dark:text-white">
              {isL18
                ? 'Prefixes & Suffixes: Word Formation, Meaning, Spelling and Exam Practice Complete'
                : isL19
                ? 'Idioms & Phrases: Meaning, Usage, Context and Exam Practice Complete'
                : isL17
                ? 'One-Word Substitutions: Categories, Meaning, Usage and Exam Practice Complete'
                : isL16
                ? 'Synonyms & Antonyms: Vocabulary, Context and Exam Practice Complete'
                : isL15
                ? 'Connectives & Commonly Confused Words: Meaning, Usage and Error Detection Complete'
                : isL14
                ? 'Degrees of Comparison: Rules, Transformations & Error Detection Complete'
                : isL13
                ? 'Subject–Verb Agreement: Core Rules, Exceptions & Sentence Correction Complete'
                : isL12
                ? 'Fixed Prepositions: Verb, Adjective & Noun Combinations Complete'
                : isL11
                ? 'Prepositions: Time, Place, Movement & Common Usage Complete'
                : isL10
                ? 'Articles & Determiners: A, An, The, Zero Article and Quantifiers Complete'
                : isL09
                ? 'Degrees of Comparison: Positive, Comparative, Superlative & Transformations Complete'
                : isL08
                ? 'Transformation of Sentences: Assertive, Negative, Interrogative & Exclamatory Complete'
                : isL07
                ? 'Advanced Narration: Interrogatives, Imperatives, Exclamatory & Optatives Complete'
                : isL06
                ? 'Direct & Indirect Speech Fundamentals Complete'
                : isL05
                ? 'Imperatives, Modals & Prepositional Voice Complete'
                : isL04
                ? 'Active & Passive Voice Fundamentals Complete'
                : isL03
                ? 'Conditional Sentences & Inversions Complete'
                : isL02
                ? 'Sequence of Tenses & Tense Harmony Complete'
                : 'Tenses Architecture & Time Markers Complete'}
            </h3>
            <p className="text-xs text-surface-600 dark:text-surface-300 max-w-xl leading-relaxed">
              Aapne sabhi 10 stages successfully complete kar li hain: Concept Orientation, In-Depth Theory, SVG Visual Architecture, Rule Cards, Worked Derivations, Common Pitfalls, Guided Practice, Independent Test Simulation, Timed Certification, aur Error Bank Remediation.
            </p>

            {/* Performance Summary Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300">
                Guided Score: <strong>{scores.guided?.score ?? 12}/12</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300">
                Independent Score: <strong>{scores.independent?.score ?? (isL18 ? 50 : isL19 ? 30 : isL15 || isL17 ? 25 : 20)}/{scores.independent?.total ?? (isL18 ? 50 : isL19 ? 30 : isL15 || isL17 ? 25 : 20)}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300">
                Mastery Score: <strong>{scores.mastery?.score ?? 15}/15</strong>
              </span>
              <span className={`px-2.5 py-1 rounded-lg font-bold ${
                isMastered
                  ? 'bg-success-100 dark:bg-success-950/60 text-success-800 dark:text-success-300 border border-success-300'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300'
              }`}>
                {isMastered ? '✓ Mastered' : 'In Progress'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
            <Link to="/">
              <Button variant="primary" iconRight={ArrowRight} className="w-full">
                Dashboard par Wapas Jayein
              </Button>
            </Link>
            <Button
              variant="outline"
              icon={RotateCcw}
              onClick={() => goToStep(0)}
              className="w-full"
            >
              {isL18
                ? 'Lesson 18 Phir Se Start Karein'
                : isL19
                ? 'Lesson 19 Phir Se Start Karein'
                : isL17
                ? 'Lesson 17 Phir Se Start Karein'
                : isL16
                ? 'Lesson 16 Phir Se Start Karein'
                : isL15
                ? 'Lesson 15 Phir Se Start Karein'
                : isL14
                ? 'Lesson 14 Phir Se Start Karein'
                : isL13
                ? 'Lesson 13 Phir Se Start Karein'
                : isL12
                ? 'Lesson 12 Phir Se Start Karein'
                : isL11
                ? 'Lesson 11 Phir Se Start Karein'
                : isL10
                ? 'Lesson 10 Phir Se Start Karein'
                : isL09
                ? 'Lesson 09 Phir Se Start Karein'
                : isL08
                ? 'Lesson 08 Phir Se Start Karein'
                : isL07
                ? 'Lesson 07 Phir Se Start Karein'
                : isL06
                ? 'Lesson 06 Phir Se Start Karein'
                : isL05
                ? 'Lesson 05 Phir Se Start Karein'
                : isL04
                ? 'Lesson 04 Phir Se Start Karein'
                : isL03
                ? 'Lesson 03 Phir Se Start Karein'
                : isL02
                ? 'Lesson 02 Phir Se Start Karein'
                : 'Lesson 01 Phir Se Start Karein'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
