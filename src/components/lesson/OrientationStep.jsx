import { useState } from 'react'
import { Target, CheckCircle2, ShieldCheck, Sparkles, Check, X } from 'lucide-react'
import { Card, Badge, Callout } from '../common'

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    sentence: 'Although the high court granted interim relief, but the petitioner was detained in another case.',
    prompt: 'Is sentence mein kya grammatical error hai?',
    options: [
      { id: 'A', text: "'granted' ki jagah 'granting' aana chahiye" },
      { id: 'B', text: "Zero Double-Conjunction Law: 'Although' ke sath 'but' redundant aur strictly prohibited hai" },
      { id: 'C', text: "'relief' ke pehle 'an' aana chahiye" },
      { id: 'D', text: 'Sentence grammatically error-free hai' },
    ],
    correctAnswer: 'B',
    explanation: "Zero Double-Conjunction Law! Jab sentence subordinating conjunction ('Although/Though') se shuru hota hai, toh main clause mein coordinating conjunction ('but/yet') lagana strictly prohibited hai. Sirf comma (,) aana chahiye.",
  },
  {
    id: 'diag-2',
    sentence: 'The new administrative amendments will significantly ___ the daily roster of the session court.',
    prompt: 'Blank fill karne ke liye correct confusable word chunein:',
    options: [
      { id: 'A', text: 'affect (Verb = prabhav daalna)' },
      { id: 'B', text: 'effect (Noun = parinaam / prabhav)' },
      { id: 'C', text: 'affects (Singular verb form with modal will)' },
      { id: 'D', text: 'effective (Adjective)' },
    ],
    correctAnswer: 'A',
    explanation: "Confused Words Disambiguation! Modal auxiliary 'will' + adverb 'significantly' ke baad base verb (V1) aati hai. 'Affect' verb hai (to influence), jabki 'effect' noun (result) hota hai. Isliye 'affect' sahi choice hai.",
  },
]

const L17_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-l17-1',
    sentence: 'A person who believes that all events are pre-determined by fate is called a/an:',
    prompt: 'Correct grammatical category aur meaning ke hisaab se substitution chunein:',
    options: [
      { id: 'A', text: 'fatalist (Noun = kismat par bharosa karne wala vyakti)' },
      { id: 'B', text: 'fatalistic (Adjective = bhagyawadi drishtikon wala)' },
      { id: 'C', text: 'atheist (Noun = bhagwan par vishwas na karne wala)' },
      { id: 'D', text: 'altruist (Noun = doosron ki bhalai karne wala)' },
    ],
    correctAnswer: 'A',
    explanation: "Part of Speech & Meaning Disambiguation! Question stem 'A person who...' ek Noun (Person) demand karta hai. 'Fatalist' wo vyakti hai jo believe karta hai ki sab kismat se tai hai. 'Fatalistic' adjective hai (form trap), 'atheist' god mein vishwas nahi karta, aur 'altruist' unselfish helper hota hai.",
  },
  {
    id: 'diag-l17-2',
    sentence: 'An official agreement reached between two disputing parties by an independent person chosen by them:',
    prompt: 'Faisla karane wale vyakti ya process ke liye correct term chunein:',
    options: [
      { id: 'A', text: 'Arbitrator (Nirnayak jiska faisla legally binding hota hai)' },
      { id: 'B', text: 'Mediator (Madhyastha jo sirf compromise facilitate karta hai)' },
      { id: 'C', text: 'Ombudsman (Public complaints investigate karne wala officer)' },
      { id: 'D', text: 'Attorney (Legal counsel ya vakil)' },
    ],
    correctAnswer: 'A',
    explanation: "Arbitrator vs Mediator Disambiguation! 'Arbitrator' dono disputing parties dwara chuna gaya wo independent person hota hai jiska faisla (award) legally binding hota hai. 'Mediator' sirf baat-cheet facilitate karta hai, koi binding decision enforce nahi karta.",
  },
]

const L16_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-l16-1',
    sentence: 'The defense counsel argued that the witness had made an inadvertent error in his deposition.',
    prompt: 'Sentence ke context mein underline word "inadvertent" ka sabse accurate SYNONYM chunein:',
    options: [
      { id: 'A', text: 'unintentional (Adjective = anjaane mein hui galti, deliberate nahi)' },
      { id: 'B', text: 'unimportant (Adjective = mahatvahinta, irrelevant)' },
      { id: 'C', text: 'deliberate (Adjective = jaan-boojhkar kiya gaya)' },
      { id: 'D', text: 'careless (Adjective = laparwah attitude)' },
    ],
    correctAnswer: 'A',
    explanation: "Contextual Synonym Precision! 'Inadvertent' ka literal meaning hota hai 'not resulting from or achieved through deliberate planning' (unintentional). 'Deliberate' iska antonym hai, aur 'unimportant' irrelevant meaning hai.",
  },
  {
    id: 'diag-l16-2',
    sentence: 'The High Court bench noted that the petitioner was completely candid during the cross-examination.',
    prompt: 'Sentence context ke hisaab se "candid" ka direct ANTONYM chunein:',
    options: [
      { id: 'A', text: 'evasive (Adjective = baat ghumane wala, aspasht, guarded)' },
      { id: 'B', text: 'truthful (Adjective = sach bolne wala, near-synonym)' },
      { id: 'C', text: 'cautious (Adjective = savdhan)' },
      { id: 'D', text: 'vocal (Adjective = bolne wala)' },
    ],
    correctAnswer: 'A',
    explanation: "Antonym Typology & Expression Polarity! 'Candid' ka matlab frank, outspoken aur direct communication hota hai. Iska true opposite 'evasive' (tala-matoli karne wala / secretive) hota hai. 'Truthful' iska synonym hai jo opposite test mein trap hai.",
  },
]

const L19_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-l19-1',
    sentence: 'After months of delaying the painful restructuring, the administrative committee finally decided to bite the bullet.',
    prompt: 'Sentence context ke anusar idiom "bite the bullet" ka exact figurative meaning chunein:',
    options: [
      { id: 'A', text: 'To physically bite a metal bullet to endure surgical pain' },
      { id: 'B', text: 'To face an unavoidable, difficult situation with courage and fortitude' },
      { id: 'C', text: 'To trigger an armed conflict in extreme anger' },
      { id: 'D', text: 'To concede defeat and surrender unconditionally' },
    ],
    correctAnswer: 'B',
    explanation: "Literal Trap vs Figurative Meaning! Idioms figurative expressions hote hain jinka meaning unke individual physical words se bilkul alag hota hai. 'Bite the bullet' ka exam context mein exact meaning 'to face a difficult, unpleasant situation with courage' hota hai. Physical metal biting wala option examiner ka classic literal trap hai.",
  },
  {
    id: 'diag-l19-2',
    sentence: 'The witness continued to beat about the bush instead of answering the bench directly.',
    prompt: 'Idiom "beat about the bush" ka accurate exam meaning aur context chunein:',
    options: [
      { id: 'A', text: 'To clear bushes and vegetation around the court premises' },
      { id: 'B', text: 'To confront an adversary with direct verbal aggression' },
      { id: 'C', text: 'To avoid the main topic by speaking evasively or discussing trivial matters' },
      { id: 'D', text: 'To conduct a meticulous search for lost physical documents' },
    ],
    correctAnswer: 'C',
    explanation: "Evasion & Relevance Distinction! 'Beat about / around the bush' ka meaning hota hai main point ko avoid karna aur idhar-udhar ki asambandhit baatein karna (to delay talking about what is important). Physical bushes aur direct confrontation examiners ke classic distractor traps hain.",
  },
]

const L18_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-l18-1',
    sentence: 'The administrative secretary realized that his previous decision was completely ___ (not reversible).',
    prompt: 'Base root "revers-" se negative adjective banane ke liye correct affixation chunein:',
    options: [
      { id: 'A', text: 'irreversible (Prefix "ir-" + root "revers" + suffix "-ible")' },
      { id: 'B', text: 'unreversible (Invalid negative prefix choice for Latin root)' },
      { id: 'C', text: 'disreversible (Invalid negative prefix)' },
      { id: 'D', text: 'irreverseable (Spelling error: Latin root takes "-ible", not "-able")' },
    ],
    correctAnswer: 'A',
    explanation: "Prefix Assimilation & Suffix Selection Law! Latin root 'revers-' ke sath negative prefix 'in-' assimilates into 'ir-' before initial 'r' (ir- + reversible = irreversible). Also, Latin verb 'revertere' forms adjective with '-ible' (irreversible), not '-able'.",
  },
  {
    id: 'diag-l18-2',
    sentence: 'Adding the prefix "un-" to the adjective "necessary" results in which correctly spelled word?',
    prompt: 'Prefix Invariance Law ke according correct spelling chunein:',
    options: [
      { id: 'A', text: 'unnecessary (Prefix "un-" + base "necessary" = double "n" preserved)' },
      { id: 'B', text: 'unecessary (Single "n" blunder: dropping base root initial consonant)' },
      { id: 'C', text: 'unneccessary (Double "c" blunder: unauthorized root alteration)' },
      { id: 'D', text: 'innecesary (Prefix mismatch aur single "s" blunder)' },
    ],
    correctAnswer: 'A',
    explanation: "Prefix Invariance Law! Jab prefix 'un-' kisi aise base word se judta hai jo 'n' se shuru hota hai (jaise 'necessary', 'natural', 'nerve'), toh dono 'n' strictly retain hote hain: un + necessary = unnecessary. Kisi bhi letter ko drop karna competitive exams ka sabse common distractor trap hai.",
  },
]

export default function OrientationStep({ metadata }) {
  const isL18 = metadata?.id === 'L18'
  const isL19 = metadata?.id === 'L19'
  const isL17 = metadata?.id === 'L17'
  const isL16 = metadata?.id === 'L16'
  const isL15 = metadata?.id === 'L15'
  const isL14 = metadata?.id === 'L14'
  const isL13 = metadata?.id === 'L13'
  const isL11 = metadata?.id === 'L11' || metadata?.id === 'L12'
  const isL10 = metadata?.id === 'L10'
  const isL09 = metadata?.id === 'L09'
  const isL08 = metadata?.id === 'L08'
  const isL07 = metadata?.id === 'L07'
  const isL06 = metadata?.id === 'L06'
  const isL05 = metadata?.id === 'L05'
  const isL04 = metadata?.id === 'L04'
  const isL03 = metadata?.id === 'L03'
  const isL02 = metadata?.id === 'L02'

  const [diagnosticAnswers, setDiagnosticAnswers] = useState({})
  const handleDiagnosticSelect = (qId, optId) => {
    setDiagnosticAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }))
  }

  return (
    <div className="space-y-6 select-none">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-surface-900 dark:via-surface-850 dark:to-surface-900 text-white shadow-sm border border-transparent dark:border-surface-700 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="bg-primary-700 text-primary-100 border-primary-500">
            Step 1 • Orientation
          </Badge>
          <span className="text-xs text-primary-200">
            {isL18
              ? 'Prefixes & Suffixes: Word Formation, Meaning, Spelling and Exam Practice'
              : isL19
              ? 'Idioms & Phrases: Meaning, Usage, Context and Exam Practice'
              : isL17
              ? 'One-Word Substitutions: Categories, Meaning, Usage and Exam Practice'
              : isL16
              ? 'Synonyms & Antonyms: Vocabulary, Context and Exam Practice'
              : isL15
              ? 'Connectives & Commonly Confused Words: Meaning, Usage and Error Detection'
              : isL14
              ? 'Degrees of Comparison: Rules, Transformations & Error Detection'
              : isL13
              ? 'Subject–Verb Agreement: Core Rules, Exceptions & Sentence Correction'
              : isL11
              ? 'Prepositions: Time, Place, Movement & Common Usage'
              : isL10
              ? 'Articles & Determiners: Indefinite, Definite, Zero Article & Quantifiers'
              : isL09
              ? 'Degrees of Comparison: Positive, Comparative, Superlative & Transformations'
              : isL08
              ? 'Assertive, Negative, Interrogative & Exclamatory Transformations'
              : isL07
              ? 'Interrogative, Imperative, Exclamatory & Optative Sentences Narration'
              : isL06
              ? 'Direct & Indirect Speech Fundamentals, Pronoun Shifts & Tense Backshift'
              : isL05
              ? 'Imperatives, Modals & Prepositional Voice Engine'
              : isL04
              ? 'Active vs Passive Syntax & Tense Transformation Matrix'
              : isL03
              ? 'Causal Logic & Conditional Architecture'
              : isL02
              ? 'Multi-Clause Concord & Tense Harmony'
              : 'English Grammar ka Strong Foundation'}
          </span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-white">
          {isL18
            ? 'Prefixes & Suffixes: Morphological Anatomy, Functional Classes, Spelling Rules aur Exam Elimination Architecture'
            : isL19
            ? 'Idioms & Phrases: Figurative Semantics, Context Clues, Lookalike Disambiguation aur Exam Selection Architecture'
            : isL17
            ? 'One-Word Substitutions: Semantic Categories, Defining Clues, Morphological Derivations aur Exam Disambiguation Architecture'
            : isL16
            ? 'Synonyms & Antonyms: Semantic Equivalence, Opposition Typologies, Nuance Gradients aur Contextual Exam Precision'
            : isL15
            ? 'Connectives, Conjunctions & Commonly Confused Words: Syntax, Punctuation, Clause Linking aur Precision Vocabulary Architecture'
            : isL14
            ? 'Degrees of Comparison: Rules, Scope Boundaries, Transformations aur Sentence Correction Architecture'
            : isL13
            ? 'Subject–Verb Agreement: Syntactic Concord, Distractor Filtering aur Error Architecture'
            : isL11
            ? 'Prepositions: Spatio-Temporal Dimensions, Directional Vectors aur Zero-Preposition Rules ki Architecture'
            : isL10
            ? 'Articles & Determiners: Vocalic Sounds, Reference Definiteness aur Quantifiers ki Architecture'
            : isL09
            ? 'Degrees of Comparison: Adjectival Grading, Scope Boundaries aur Transformations ki Architecture'
            : isL08
            ? 'Transformation of Sentences: Meaning Preservation aur Structural Syntax ki Architecture'
            : isL07
            ? 'Advanced Narration: Questions, Commands, Exclamations aur Prayers ki Architecture'
            : isL06
            ? 'Narration: Direct aur Indirect Speech ki Architecture aur Core Mechanics'
            : isL05
            ? 'Advanced Voice: Imperatives, Modals aur Prepositional Verbs ki Architecture'
            : isL04
            ? 'Active & Passive Voice: Focus Shift aur Tense Matrix ki Architecture'
            : isL03
            ? 'Conditional Sentences: Condition aur Result Clauses ki Architecture'
            : isL02
            ? 'Sequence of Tenses: Multi-Clause Concord ki Architecture'
            : 'High Court Exam mein Tenses Mathematical Core kyun hain?'}
        </h2>
        <p className="text-xs md:text-sm text-primary-100/90 leading-relaxed max-w-[85ch]">
          {isL18
            ? "Rajasthan High Court System Assistant examination ke Part-B English section mein Prefixes and Suffixes ek decisive vocabulary aur word-formation component hai. Exam questions mein negative prefix selection, grammatical category conversion (noun, verb, adjective, adverb), spelling modifications (final 'e' dropping, consonant doubling, 'y' to 'i'), Latin/Greek affix semantics, aur confusable affix pairs (-able vs -ible, -ceed vs -cede vs -sede) ke high-frequency patterns aate hain. Examiners ke favorite traps mein: Pseudo-Prefix Root Amputation (*unert, *discrepant), Negative Prefix Mismatch (un- vs in- vs dis- vs mis-), Double-Letter Dropping/Duplication (*unecessary, *dissimilar), aur Word-Class Distortion (courageousness vs courage) shamil hain. Is module mein aap 14 precision rule cards, 7 interactive visual architectures, 15 worked derivations, 68 validated affix patterns, aur 32 word families ko step-by-step master karenge."
            : isL19
            ? "Rajasthan High Court System Assistant examination ke Part-B English section mein Idioms & Phrases ek high-frequency aur decisive vocabulary component hai. Exam questions mein sentence completion, meaning identification, contextual substitution aur incorrect usage identification ke patterns aate hain. Examiners ke favorite traps mein: Literal Physical Interpretations (words ke dictionary meaning par based deceptive options), Prepositional/Lexical Distortions (*beat round the forest, *spill over the beans), Lookalike Idiom Confusion (a blessing in disguise vs a wolf in sheep's clothing, burning the midnight oil vs burning the candle at both ends), aur Register/Valence Mismatches shamil hain. Is complete module mein aap 10 situational domains, 116 curated high-yield idioms, 14 precision rule cards, 8 interactive visual architectures, 15 worked derivations, aur 57 exam-grade practice questions ko master karenge."
            : isL17
            ? 'Rajasthan High Court System Assistant examination ke Part-B English section mein One-Word Substitutions ek high-frequency aur scoring topic hai. Exam mein definitions, descriptions aur behavioral characteristics di jaati hain jinhe ek precise single English word se substitute karna hota hai. Examiners ke favorite traps mein: Grammatical Category Mismatch (Noun "optimist" vs Adjective "optimistic"), Closely Related Confusing Pairs (Autobiography vs Biography, Arbitrator vs Mediator, Epitaph vs Eulogy, Philanthropist vs Altruist), Morpheme Overlap (-cide, -cracy, -phobia, -mania, -logy), aur Single Defining Clue Shifts ("all-knowing" Omniscient vs "all-powerful" Omnipotent) shamil hain. Is module mein aap 10 semantic categories, 14 strategic rule cards, 7 interactive visual architectures, 15 worked derivations, aur 80+ validated high-frequency terms ko master karenge.'
            : isL16
            ? 'Rajasthan High Court System Assistant examination ke Part-B English section mein Synonyms and Antonyms direct aur decisive merit-scoring questions hote hain. Candidates aksar mechanical dictionary memorization par rely karte hain aur contextual nuance traps mein phans jate hain. Exact synonymy language mein bohot durlabh hoti hai; lagbhag sabhi pairs near-synonyms hote hain jinka selection intensity, tone/valence, grammatical class consistency, aur formal legal/administrative register par nirbhar karta hai. Is complete module mein aap 12 precision rule cards, 7 interactive visual architectures, 15 worked derivations, 60-word curated master bank, aur 52 original practice questions ko step-by-step master karenge.'
            : isL15
            ? 'Rajasthan High Court System Assistant examination ke Part-B English section mein Correction of Sentences ke antargat Connectives (Coordinating, Subordinating, Correlative) aur Commonly Confused Words (Homophones, Homographs, Confusable Verbs aur Quantifiers) se direct aur high-scoring error-detection MCQs aate hain. Examiners ke favorite traps mein: Zero Double-Conjunction Law (Although...yet/but, Because...therefore), Correlative parallelism aur Inversion (Hardly...when, No sooner...than, Neither...nor), Comma Splices with Conjunctive Adverbs (however, therefore), Relative Pronouns syntax (who vs whom, that vs which), aur Confused Word pairs (affect vs effect, principal vs principle, complement vs compliment, lie vs lay, rise vs raise, fewer vs less) shamil hain. Is module mein aap 14 precision rule cards, 7 interactive visual architectures, 15 worked derivations, aur 8-step error detection algorithm ko master karenge.'
            : isL14
            ? 'Rajasthan High Court System Assistant examination ke Part-B mein Correction of Sentences topic ke andar Degrees of Comparison se high-frequency questions aate hain. Sentence correction aur error spotting mein double comparatives (*more better), omitted "other" in comparative group comparisons ("than any other metal"), illogical comparisons of mismatched entities (missing "that of" / "those of"), Latin comparatives with "to" (senior/junior to), "prefer...to" syntax, "one of the" ke sath plural noun concord, aur meaning-preserving degree transformations par examiners ke recurring traps set hote hain. Is complete module mein aap in sabhi comparison rules aur 8-step error detection algorithm ko step-by-step master karenge.'
            : isL13
            ? 'Rajasthan High Court System Assistant examination ke Part-B English paper mein Correction of Sentences ke andar Subject-Verb Agreement se direct aur error-spotting questions har saal aate hain. Sentence mein actual grammatical subject ko pehchanna, intervening prepositional phrases ("of...", "with...") ko strip karna, compound subjects ("and"), correlative conjunctions (Either/Or proximity), parenthetical connectives (as well as, along with), distributive singulars ("each of", "neither of"), "a number of" vs "the number of", relative clause antecedents ("one of those who"), aur inverted sentences ("there is/are") par examiners ke high-frequency traps set hote hain. Is complete module mein aap in sabhi concepts aur 7-step error spotting algorithm ko step-by-step master karenge.'
            : isL11
            ? 'Rajasthan High Court System Assistant examination ke Part-B English paper mein Prepositions se direct aur error-spotting questions har saal aate hain. Time expressions (in, on, at), place coordinates (in, on, at, above, over, beside, besides), movement vectors (to, towards, into, onto, through, across), temporal boundaries (by vs until, since vs for), relational choices (between vs among), aur direct transitive verbs jahan preposition strictly omit hota hai (discuss, enter, order, attack, reach, resemble, marry) par examiner ke favorite traps set hote hain. Is complete module mein aap in sabhi concepts aur unke precise examination algorithms ko step-by-step master karenge.'
            : isL10
            ? 'Rajasthan High Court System Assistant examination ke Part-B English section mein Articles aur Determiners sabse high-scoring safe-zone topics hain. A/An ke vocalic sound rules (an FIR, an hour, a European, a university), Definite Article The ke specific, unique aur geographical conventions (the Himalayas vs Mount Everest), Zero Article omission rules, countable vs uncountable nouns, aur quantifiers (Few/A few/The few, Little/A little/The little, Some/Any, Much/Many, Each/Every/Either/Neither) par examiner ke high-frequency traps set hote hain. Is complete module mein aap in sabhi concepts aur unke precise examination algorithms ko step-by-step master karenge.'
            : isL09
            ? 'Rajasthan High Court System Assistant examination ke Part-B mein Degrees of Comparison se regular questions aate hain. Adjective formation, spelling changes (CVC doubling, -y to -ier), irregular forms (worse, further, elder), "any other" ke sath singular noun concord, "one of the" ke sath plural noun concord, aur meaning-preserving transformations (Positive, Comparative, Superlative) par examiner ke favorite traps set hote hain. Is module mein aap in sabhi concepts aur unke precise transformation algorithms ko step-by-step master karenge.'
            : isL08
            ? 'Transformation of Sentences ka cardinal rule hai: Grammatical syntax badalti hai lekin original proposition aur meaning 100% same rehta hai. Is module mein aap Affirmative to Negative, Assertive to Interrogative inversion, Rhetorical questions, aur Exclamatory to Assertive transformations ko master karenge.'
            : isL07
            ? 'Rajasthan High Court System Assistant exam ke Part-B English paper mein Assertive statements se zyada Interrogative, Imperative, Exclamatory, aur Optative sentences par tricky MCQs aate hain. In sentence types mein standard declarative conjunction "that" har jagah kaam nahi karta—Yes/No questions mein "if/whether" lagta hai, Wh-questions mein question word retain hota hai aur inversion drop hoti hai, Imperatives mein non-finite infinitive "to + V1" banta hai, negative commands mein "not to" ya "forbade" lagta hai, Exclamatory sentences emotion express karte hain, aur Optative sentences "prayed/wished that... might" formula follow karte hain. Is complete module mein aap in sabhi advanced rules aur unke exam traps ko master karenge.'
            : isL06
            ? 'Rajasthan High Court System Assistant examination ke Part-B English section mein Narration (Direct & Indirect Speech) ek high-scoring core topic hai. Exact words quote karne (Direct Speech) aur meaning ko narrator ke perspective se bayan karne (Indirect Speech) ke beech syntax, punctuation, aur perspectives ka farq hota hai. Is foundational module mein aap reporting clause anatomy, assertive conversions, reporting verbs (said vs told), speaker aur listener ke hisaab se pronoun shifting, past reporting verb par tense backshift matrix, universal truth exceptions, aur adverbial time/place adjustments ko step-by-step master karenge.'
            : isL05
            ? 'Competitive exams (khaaskar Rajasthan High Court System Assistant) mein basic tense matrix ke aage badhkar aise questions aate hain jahan standard rules challenge hote hain: hidden subjects wale imperatives (commands, requests, advice, prohibitions), modal auxiliaries (simple aur modal-perfect), fixed prepositions ka retention (looked into, laughed at), aur two-object bi-transitive sentences. Is lesson mein aap in sabhi high-yield advanced patterns ko contextual logic ke sath master karenge.'
            : isL04
            ? 'Voice English syntax ka wo dynamic feature hai jo batata hai ki sentence ka focus action ke karne wale (doer) par hai ya action ke receiver par. High Court judgments, administrative notifications aur official orders mein Passive Voice ka dominance hota hai. Is lesson mein aap subject-object transposition, auxiliary be expansion, 8 tenses ka complete matrix, negative aur interrogative forms, agent omission rules, aur transitive transpositions ko master karenge.'
            : isL03
            ? 'Conditional sentences English grammar ka wo pivotal junction hain jahan tense structures logical reasoning ke sath judte hain. Har conditional sentence mein ek condition clause (if-clause) aur ek result clause hota hai jo cause-and-effect relationship banate hain. Rajasthan High Court System Assistant exam mein Types 0, 1, 2, 3 ke verb patterns, hypothetical subjunctive "were", formal inversions (Had I..., Were he..., Should you...), aur connectives (unless, provided that) se high-accuracy questions aate hain.'
            : isL02
            ? 'Complex sentences mein jahan do ya do se zyada clauses hote hain, wahan verbs ko akele isolate karke decide nahi kiya ja sakta. Principal clause ek primary temporal reference anchor banata hai, jo sabhi subordinate aur reported clauses ke tense ko govern karta hai. Tense Harmony competitive exams ka ek high-yield topic hai, jisme check kiya jata hai ki candidate valid backshifting aur universal truth exceptions ke beech farq samajhta hai ya nahi.'
            : 'Rajasthan High Court System Assistant examination ke Part-B mein General Knowledge aur English ke combined 20 marks hain (jisme English ke lagbhag 10 questions aate hain). Tenses koi alag chapter nahi hain—ye English syntax ka wo basic foundation hain jo Active & Passive Voice, Direct & Indirect Narration, Conditionals, aur Subject-Verb Agreement ko directly govern karta hai.'}
        </p>
      </div>

      {/* Curricular Learning Objectives */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-surface-200 dark:border-surface-700 pb-3">
          <Target size={20} className="text-primary-600 dark:text-primary-300" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            {metadata?.id ? `${metadata.id} ke Authoritative Learning Objectives` : 'Lesson Learning Objectives'}
          </h3>
        </div>

        <p className="text-xs text-surface-700 dark:text-surface-200 leading-relaxed max-w-[85ch]">
          Is lesson ko poora karke aap in core competences par conceptual aur structural mastery hasil karenge:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metadata?.learningObjectives?.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xs hover:border-surface-300 dark:hover:border-surface-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/80 border border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-200 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-surface-800 dark:text-surface-100 font-medium leading-snug">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Scope Boundaries: Included vs Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="success" padding="md" className="space-y-3">
          <div className="flex items-center gap-2 text-success-800 dark:text-success-200 font-bold text-sm">
            <CheckCircle2 size={18} className="text-success-600 dark:text-success-300 shrink-0" />
            <h4 className="font-heading">{metadata?.id ? `${metadata.id} mein Kya Shamil Hai (Included)` : 'Strictly Included'}</h4>
          </div>
          <ul className="text-xs text-success-950 dark:text-surface-100 space-y-2 list-disc list-inside">
            {metadata?.scopeBoundaries?.included ? (
              metadata.scopeBoundaries.included.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
            ) : isL07 ? (
              <>
                <li>Yes/No questions: 'if' ya 'whether' connective aur auxiliary inversion removal</li>
                <li>Wh-questions: What, Why, Where, When, Who, Whom, Whose, Which, How retaining question word</li>
                <li>Question punctuation shift: question mark (?) replace hokar declarative full stop (.) banta hai</li>
                <li>Reporting verbs for questions: asked, enquired of + object, wanted to know, demanded of</li>
                <li>Imperative commands, requests, aur advice: 'Reporting verb + object + to + V1' pattern</li>
                <li>Negative imperatives: 'not to + V1' structure aur 'forbade + object + to + V1' (zero-negative rule)</li>
                <li>Polite words elimination: 'please' aur 'kindly' ka complete drop in reported requests</li>
                <li>Suggestions aur proposals: 'Let us / Let's' ➔ 'suggested to + object + that they should + V1'</li>
                <li>Exclamatory sentences: 'exclaimed with joy/sorrow/wonder/regret that...' aur 'very/great' intensifiers</li>
                <li>Optative sentences: wishes, prayers, aur blessings ➔ 'prayed/wished that + subject + might + V1'</li>
              </>
            ) : isL06 ? (
              <>
                <li>Direct Speech vs Indirect Speech: definitions, quotation marks, aur comma removal</li>
                <li>Reporting clause, reporting verb, reporting subject aur reported clause anatomy</li>
                <li>Assertive sentence conversion using declarative conjunction 'that'</li>
                <li>Reporting verb concord: 'said' vs 'said that' vs 'told + object' (no 'told to')</li>
                <li>1st Person (Speaker), 2nd Person (Listener), aur 3rd Person (Invariant) pronoun shifts</li>
                <li>Tense backshift matrix with past reporting verb (Present to Past, Simple Past to Past Perfect)</li>
                <li>Modal backshift: will ➔ would, can ➔ could, may ➔ might, must ➔ had to</li>
                <li>Universal truths, scientific laws, geographical facts, aur proverbs exceptions (zero backshift)</li>
                <li>Present ('says') aur Future ('will say') reporting verbs mein zero tense backshift</li>
                <li>Time and place deictic adjustments: today ➔ that day, yesterday ➔ the previous day, tomorrow ➔ the next day</li>
              </>
            ) : isL05 ? (
              <>
                <li>Imperative commands with objects: 'Let + object + be + V3' pattern</li>
                <li>Situational requests: 'You are requested to + V1' (drop please/kindly)</li>
                <li>Authoritative orders & instructions: 'You are ordered/instructed to + V1'</li>
                <li>Negative imperatives & prohibitions: 'Let + obj + not + be + V3' aur 'You are forbidden to'</li>
                <li>Advice and moral duties: 'Object + should be + V3' aur 'must be + V3'</li>
                <li>Simple modal auxiliaries: 'Modal + be + V3' across can, could, may, might, must, should, ought to</li>
                <li>Modal perfect passives: 'Modal + have been + V3' for past unfulfilled actions and deductions</li>
                <li>Preposition retention rule: retaining essential prepositions in verbs like look into, laugh at, deal with</li>
                <li>Phrasal verbs and multi-word verb particle inseparability</li>
                <li>Two-object bi-transitive passives: Indirect Object vs Direct Object promotion with 'to/for'</li>
              </>
            ) : isL04 ? (
              <>
                <li>Active Voice vs Passive Voice definitions, doer vs receiver focus</li>
                <li>Subject, verb, direct object isolation aur pronoun case transformations</li>
                <li>The Core Passive Formula: Object + be + V3 + (by + agent)</li>
                <li>The 8-Tense Matrix: Simple, Continuous aur Perfect across tenses</li>
                <li>4 conventionally omitted tenses (continuous perfects & future continuous)</li>
                <li>Negative passive: first auxiliary ke baad 'not' placement</li>
                <li>Interrogative passive: Yes/No inversion aur 'By whom' Wh-questions</li>
                <li>Agent retention vs omission: unknown, obvious, generic, aur mandatory</li>
                <li>Transitive vs Intransitive verification: pseudo-passive error elimination</li>
              </>
            ) : isL03 ? (
              <>
                <li>Condition clause (if-clause) vs result clause syntax aur comma placement rules</li>
                <li>Zero Conditional (Type 0): General facts aur scientific cause-and-effect</li>
                <li>First Conditional (Type 1): Realistic future conditions aur modal/imperative variations</li>
                <li>Second Conditional (Type 2): Hypothetical present states aur subjunctive 'were'</li>
                <li>Third Conditional (Type 3): Unreal counterfactual past conditions aur imagined past results</li>
                <li>Mixed Conditionals: Past condition with present consequence (cross-time bridges)</li>
                <li>Conditional Inversions: 'Had + S + V3', 'Were + S + to + V1', 'Should + S + V1'</li>
                <li>Conditional Connectives: Unless (double negative prohibition), provided that, as long as</li>
              </>
            ) : isL02 ? (
              <>
                <li>Main clause vs subordinate clause syntax aur temporal reference anchors</li>
                <li>Present aur Future governing verbs ke sath Open Sequence Principle</li>
                <li>General Rule of Past Harmony (Simultaneous, Earlier [had + V3], Later [would + V1])</li>
                <li>Universal truths, scientific laws, aur mathematical axioms ke exceptions</li>
                <li>Purpose clauses mein 'so that' ('may' vs 'might') aur 'lest' + 'should'</li>
                <li>Comparison clauses mein 'than' aur 'as...as' ke exemptions</li>
              </>
            ) : (
              <>
                <li>The 3×4 Tense Matrix (Past, Present, Future × 4 Aspects)</li>
                <li>Person aur number concord ke hisaab se auxiliary verb rules</li>
                <li>Affirmative, Negative, aur Interrogative syntax structures</li>
                <li>Contextual temporal time markers (signal adverbs)</li>
                <li>Simple Past vs Present Perfect ka clear disambiguation</li>
              </>
            )}
          </ul>
        </Card>

        <Card variant="filled" padding="md" className="space-y-3 border-surface-300 dark:border-surface-700">
          <div className="flex items-center gap-2 text-surface-800 dark:text-surface-100 font-bold text-sm">
            <ShieldCheck size={18} className="text-surface-600 dark:text-surface-400 shrink-0" />
            <h4 className="font-heading">Aage ke Lessons mein Covered Topics</h4>
          </div>
          <ul className="text-xs text-surface-700 dark:text-surface-200 space-y-2 list-disc list-inside">
            {metadata?.scopeBoundaries?.excluded ? (
              metadata.scopeBoundaries.excluded.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
            ) : isL07 ? (
              <>
                <li>Sentence Transformation (Assertive to Negative, Interrogative, Exclamatory) ➔ <em>Lessons 08 & 09</em></li>
                <li>Degrees of Comparison transformations (Positive, Comparative, Superlative) ➔ <em>Lesson 09</em></li>
                <li>Articles, Determiners aur Prepositions ke Elevated Rules ➔ <em>Lessons 10, 11 & 12</em></li>
                <li>Subject-Verb Concord non-voice rules ➔ <em>Lesson 13</em></li>
                <li>Connectives aur Words Wrongly Used ➔ <em>Lesson 14</em></li>
              </>
            ) : isL06 ? (
              <>
                <li>Interrogative sentences: Yes/No (if/whether) aur Wh- questions ➔ <em>Lesson 07</em></li>
                <li>Imperative sentences: orders, requests, advice with to/not to + V1 ➔ <em>Lesson 07</em></li>
                <li>Exclamatory aur Optative sentences: wishes, prayers, exclamations ➔ <em>Lesson 07</em></li>
                <li>Sentence Transformation (Assertive, Negative, Interrogative) ➔ <em>Lessons 08 & 09</em></li>
                <li>Degrees of Comparison transformations ➔ <em>Lesson 09</em></li>
                <li>Subject-Verb Concord non-voice rules ➔ <em>Lesson 13</em></li>
              </>
            ) : isL05 ? (
              <>
                <li>Direct & Indirect Narration reporting verbs, backshift tables, pronoun shifts ➔ <em>Lessons 06 & 07</em></li>
                <li>Sentence Transformation (Assertive to Negative, Interrogative, Exclamatory) ➔ <em>Lessons 08 & 09</em></li>
                <li>Degrees of Comparison transformations (Positive, Comparative, Superlative) ➔ <em>Lesson 09</em></li>
                <li>Subject-Verb Concord non-voice agreement rules ➔ <em>Lesson 13</em></li>
                <li>Connectives aur words wrongly used ➔ <em>Lesson 14</em></li>
              </>
            ) : isL04 ? (
              <>
                <li>Imperatives, requests, orders, advice passives ('Let + obj + be + V3') ➔ <em>Lesson 05</em></li>
                <li>Advanced modal-perfect passives ('must have been', 'should have been') ➔ <em>Lesson 05</em></li>
                <li>Phrasal verbs aur prepositional verbs mein retained prepositions ➔ <em>Lesson 05</em></li>
                <li>Direct & Indirect Narration reporting changes ➔ <em>Lessons 06 & 07</em></li>
                <li>Sentence Transformation (Assertive, Negative, Interrogative) ➔ <em>Lessons 08 & 09</em></li>
              </>
            ) : isL03 ? (
              <>
                <li>Voice: Active & Passive Voice transformations across tenses ➔ <em>Lessons 04 & 05</em></li>
                <li>Narration: Direct & Indirect speech reporting changes ➔ <em>Lessons 06 & 07</em></li>
                <li>Transformation of Sentences (Degrees of Comparison, polarity) ➔ <em>Lessons 08 & 09</em></li>
                <li>Non-conditional Subject-Verb Agreement rules ➔ <em>Lesson 13</em></li>
                <li>Connectives aur words wrongly used (non-conditional) ➔ <em>Lesson 14</em></li>
              </>
            ) : isL02 ? (
              <>
                <li>Conditional Sentences (Types 0, 1, 2, 3, inverted conditionals) ➔ <em>Lesson 03</em></li>
                <li>Full Direct/Indirect Narration rules & pronoun shift tables ➔ <em>Lessons 06 & 07</em></li>
                <li>Active & Passive Voice transformations across tenses ➔ <em>Lessons 04 & 05</em></li>
                <li>Tense harmony se unrelated Subject-Verb agreement rules ➔ <em>Lesson 13</em></li>
                <li>Connectives aur words wrongly used ➔ <em>Lesson 14</em></li>
              </>
            ) : (
              <>
                <li>Sequence of Tenses aur Cross-Clause Harmony ➔ <em>Lesson 02</em></li>
                <li>Subordinate Clauses mein Universal Truth Exceptions ➔ <em>Lesson 02</em></li>
                <li>Conditional Sentences (Types 0, 1, 2, 3) ➔ <em>Lesson 03</em></li>
                <li>Temporal Conjunctions ke sath Future Time Clauses ➔ <em>Lesson 03</em></li>
                <li>Inverted Conditionals (Had I..., Were he...) ➔ <em>Lesson 03</em></li>
              </>
            )}
          </ul>
        </Card>
      </div>

      {/* Interactive Diagnostic Self-Assessment for L15, L16, L17 & L19 */}
      {(isL15 || isL16 || isL17 || isL19) && (
        <Card variant="default" padding="lg" className="space-y-4 border-primary-200 dark:border-primary-900/50 bg-gradient-to-br from-primary-50/20 via-white to-primary-50/10 dark:from-surface-900 dark:via-surface-850 dark:to-surface-900">
          <div className="flex items-center justify-between pb-3 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-surface-900 dark:text-surface-100">
                  Quick Diagnostic Check (Self-Assessment)
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Instant non-blocking Roman Hinglish feedback se apna baseline check karein
                </p>
              </div>
            </div>
            <Badge variant="secondary" size="sm">2 Baseline Traps</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isL18 ? L18_DIAGNOSTIC_QUESTIONS : isL19 ? L19_DIAGNOSTIC_QUESTIONS : isL16 ? L16_DIAGNOSTIC_QUESTIONS : isL17 ? L17_DIAGNOSTIC_QUESTIONS : DIAGNOSTIC_QUESTIONS).map((dq, idx) => {
              const selectedOpt = diagnosticAnswers[dq.id]
              const isAnswered = Boolean(selectedOpt)
              const isCorrect = selectedOpt === dq.correctAnswer

              return (
                <div key={dq.id} className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-surface-600 dark:text-surface-400 italic">
                      "{dq.sentence}"
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-surface-900 dark:text-surface-100">
                    {dq.prompt}
                  </p>

                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    {dq.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id
                      const isOptionCorrect = opt.id === dq.correctAnswer
                      let style = 'bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'

                      if (isAnswered) {
                        if (isOptionCorrect) {
                          style = 'bg-success-50 dark:bg-success-950/40 text-success-800 dark:text-success-200 border-success-400 font-medium'
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-danger-50 dark:bg-danger-950/40 text-danger-800 dark:text-danger-200 border-danger-400 font-medium'
                        } else {
                          style = 'opacity-60 bg-white dark:bg-surface-900 text-surface-500 border-surface-200 dark:border-surface-700'
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleDiagnosticSelect(dq.id, opt.id)}
                          className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${style}`}
                        >
                          <span><strong>{opt.id}.</strong> {opt.text}</span>
                          {isAnswered && isOptionCorrect && <Check size={14} className="text-success-600 shrink-0" />}
                          {isAnswered && isSelected && !isCorrect && <X size={14} className="text-danger-600 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-2 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-success-50 dark:bg-success-950/40 text-success-800 dark:text-success-200 border border-success-200' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200'}`}>
                      <strong>{isCorrect ? '✓ Sahi Pehchana! ' : 'Notice: '}</strong>
                      {dq.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Strategic Exam Tip */}
      <Callout type="tip" title="High Court Exam ke liye Strategic Insight">
        {isL18
          ? "Prefixes & Suffixes MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Prefix Invariance Law: Base prefix attach karte waqt na toh prefix ka spelling badalta hai aur na base root ka—agar prefix 'un-' ya 'dis-' hai aur base root 'n' ya 's' se shuru ho raha hai, toh double letters ('unnecessary', 'dissatisfied') strictly retain honge; (2) Phonetic Assimilation Law: Latin prefix 'in-' lips/bilabial sounds (p, b, m) se pehle 'im-' banta hai ('impossible', 'imbalance'), 'l' se pehle 'il-' ('illegal'), aur 'r' se pehle 'ir-' ('irresponsible'); (3) Grammatical Category Vector: Suffixes hamesha base word ki syntactic category shift karte hain (-ment, -tion, -ness form Nouns; -ify, -ize, -en form Verbs; -able, -ful, -ous form Adjectives; -ly forms Adverbs); aur (4) Latin vs Anglo-Saxon Suffix Concord: Complete English base words aksar '-able' lete hain ('dependable', 'readable'), jabki Latin bound stems strictly '-ible' lete hain ('audible', 'visible', 'credible')."
          : isL19
          ? "Idioms & Phrases MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Zero Literal Translation Filter: Agar kisi option mein idiom ke physical words ka direct literal meaning diya ho (jaise 'spill the beans' mein beans girna, 'bite the bullet' mein lead bullet chabana), toh use 100% trap maan kar sabse pehle eliminate karein; (2) Context Clue Alignment Filter: Sentence ki emotional tone aur scenario ko pehchanein—crisis context mein crisis idiom aayega, celebration mein positive idiom; (3) Lexical Invariance Filter: Idioms structurally frozen hote hain, unka preposition, noun ya article replace nahi kiya ja sakta ('at the eleventh hour' valid hai, *at the eleventh moment galat hai; 'beat about the bush' valid hai, *beat round the forest galat hai); aur (4) Lookalike Disambiguation Filter: Closely related lookalike idioms ke core nuances check karein (jaise 'burn the midnight oil' = late night study/work, jabki 'burn the candle at both ends' = overwork from early morning till late night leading to exhaustion)."
          : isL17
          ? "One-Word Substitutions MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Grammatical Form Filter: Question stem check karein—'A person who...' Noun demand karta hai ('optimist', NOT 'optimistic'); 'Capable of being...' Adjective demand karta hai ('edible', NOT 'eating'); (2) Morpheme Vector Filter: Root words aur suffixes se category isolate karein: -cide (killing), -cracy (governance), -phobia (irrational fear), -mania (obsessive urge), -ist (person); (3) Defining Clue Isolation: Question stem ke defining clue ko pinpoint karein: 'all-powerful' = omnipotent, 'all-knowing' = omniscient, 'all-present' = omnipresent; aur (4) Distractor Elimination Filter: Lookalike words aur near-synonyms ke beech clear boundary draw karein (jaise Arbitrator ka faisla binding hota hai, jabki Mediator sirf compromise facilitate karta hai)."
          : isL16
          ? "Synonyms & Antonyms MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Part of Speech Concord Filter: Question stem ka part of speech strictly match karein—Noun ka synonym Noun hoga ('candor' ➔ 'frankness'), Adjective ka Adjective ('lucid' ➔ 'clear'), Verb ka Verb ('mitigate' ➔ 'alleviate'); (2) Sentence Context & Valence Filter: Blank ke aas-paas ke connectives aur adjectives se positive/negative tone determine karein—praiseworthy context mein derogatory word kabhi fit nahi hoga; (3) Intensity & Register Alignment Filter: 'Annoyed' (mild irritation) ki jagah 'furious' (extreme rage) select na karein, aur formal legal/administrative register mein informal slang options ko eliminate karein; aur (4) Antonym Typology Filter: Complementary binary opposites (alive/dead) mein intermediate degrees nahi hoti, jabki gradable opposites (hot/cold) mein continuum hota hai; aur negative prefixes ke deceptive false friends (flammable/inflammable = synonyms) se savdhan rahein."
          : isL15
          ? "Connectives & Commonly Confused Words MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Zero Double-Conjunction Filter: 'Although/Though' ke sath 'yet/but' ya 'Because/Since' ke sath 'therefore/so' dekhte hi eliminate karein (sirf ek connective allowed hai); (2) Correlative Parallelism & Inversion Filter: 'Neither...nor / Not only...but also' ke dono parts ke baad identical grammatical category honi chahiye, aur negative adverbs (Hardly/No sooner) se start hone par auxiliary inversion (had/did + subject) aur exact partners ('when' / 'than') check karein; (3) Punctuation & Comma Splice Filter: Conjunctive adverbs ('however, therefore') do independent clauses ko comma se nahi jod sakte, semicolon (;) aur comma (,) mandatory hai; aur (4) Word Class Disambiguation Filter: 'Affect' verb (influence karna) hai aur 'effect' noun (result) hai, 'principal' mukhiya/mool-dhan hai aur 'principle' siddhant hai."
          : isL14
          ? 'Degrees of Comparison & Error Detection MCQs solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Entity Count Filter: Exactly 2 entities hone par Superlative prohibited hai, strictly "the + comparative" lagega ("the taller of the two"); (2) Logical Parallelism Filter: Attribute comparison mein singular ke liye "that of" aur plural ke liye "those of" check karein ("that of Jaipur", NOT just "Jaipur"); (3) Marker Concord Filter: Latin adjectives (senior, junior, superior, prior) aur "prefer" ke sath strictly "TO" lagta hai (never "than", never "more"); aur (4) Self-Exclusion Filter: Category comparison mein "than any other + singular noun" se subject ko exclude karein aur double comparatives (*more better) ko eliminate karein.'
          : isL13
          ? 'Subject-Verb Agreement questions solve karte waqt ye 4 Golden Filters yaad rakhein: (1) Head Noun Filter: Verb ke theek pehle aane wale nearest noun ke bajaye preposition se pehle aane wale Head Noun ko dekhein ("The quality of mangoes IS..."); (2) Conjunction Filter: "And" do separate entities hone par plural banata hai, lekin "along with / as well as" mein strictly Subject 1 govern karta hai; (3) Proximity Filter: "Either...or / Neither...nor" mein verb paas wale subject se agree karti hai; aur (4) The Number Law: "A number of" plural verb leta hai, jabki "The number of" strictly singular verb leta hai.'
          : isL09
          ? 'Degrees of Comparison questions solve karte waqt ye 3 critical filters yaad rakhein: (1) Entity Count Boundary: 2 entities ke beech comparison mein Superlative degree KABHI nahi lag sakti, strictly Positive ya Comparative lagti hai; (2) Self-Exclusion Law: Jab subject usi category ke baaki members se compare ho, toh "any other + singular noun" lagana compulsory hai taaki subject khud se compare na ho; aur (3) Apex Scope: "One of the" subset bracket hota hai jo "Very few" aur "most other" demand karta hai, ise kabhi "No other" se match na karein.'
          : isL08
          ? 'Transformation of Sentences questions solve karte waqt ye 3 critical checks karein: (1) Cardinal Meaning Rule: Sentence ka truth value 100% same rehna chahiye, bina antonym ke sirf "not" mat lagayein; (2) Polarity Reversal Law: Assertive to Interrogative mein positive statement negative question banta hai, aur negative statement positive question banta hai; aur (3) Intensifier Collocation: "What a" conversions mein adjectives ke sath "very" lagta hai aur qualifying nouns ke sath strictly "great / terrible" lagta hai.'
          : isL07
          ? 'Advanced Narration MCQs solve karte waqt ye 4 golden checks karein: (1) Inversion check: Reported question mein subject verb se pehle aayega, auxiliary pehle nahi chhod sakte ("where I lived", NOT "*where did I live"); (2) Conjunction check: Wh-word ya if ke sath "that" kabhi nahi judega; (3) Negative check: "Forbade" ke sath dobara "not" lagana double negative blunder hai; aur (4) Punctuation check: Indirect sentence hamesha Full Stop (.) par end hoga, question mark (?) ya exclamation mark (!) par nahi.'
          : isL06
          ? 'Direct & Indirect Speech questions solve karte waqt teen basic checks karein: (1) Reporting verb ka tense pehle dekhein—agar "said" hai toh hi tense backshift hoga, agar "says" ya "will say" hai toh tense freeze rahega; (2) Pronoun shift mein speaker aur listener ke perspective ko track karein (SON rule); aur (3) Universal truths, scientific facts aur proverbs mein reporting verb past hone par bhi tense freeze rehta hai ("the earth moves", NOT "moved").'
          : isL05
          ? 'Advanced Voice questions mein negative marking penalty na hone par bhi teen traps se hamesha bachein: (1) Voice mein modals freeze rehte hain (can can rahega, could nahi banega); (2) Prepositional verbs (look into, laugh at) mein preposition drop mat karein—"looked into by" aur "laughed at by" do prepositions ek sath aana perfectly valid hai; aur (3) Negative imperative mein "not" hamesha "be" se pehle lagayein ("Let the door not be closed").'
          : isL04
          ? 'High Court exam mein Voice questions solve karte waqt teen golden rules hamesha yaad rakhein: (1) Voice mein tense freeze rehta hai—Narration ki tarah Simple Present ko Simple Past mein backshift mat karein; (2) Passive auxiliary naye subject ke number (singular/plural) ke according chunein; aur (3) Intransitive verbs (die, sleep, arrive, go) ka passive nahi banta, isliye "was died" jaise options ko dekhte hi eliminate karein.'
          : isL03
          ? 'Conditional sentences ke MCQs solve karte waqt do universal rules hamesha yaad rakhein: (1) Standard conditional if-clause ke andar "will" ya "would" kabhi nahi lagta, aur (2) "Unless" wale clause ke andar doosra negative word ("not") lagana double negative blunder hai. Sentence ke time references aur reality level ko identify karke aap distractor options ko foran eliminate kar sakte hain.'
          : isL02
          ? 'Sequence of tenses ke MCQs mein examiners do classic traps set karte hain: (1) universal scientific truths ka galat backshift (jaise "water boils" ki jagah "water boiled" de dena), aur (2) modal discord (jaise past reporting verb ke baad "would" ki jagah "will" laga dena). Subordinate options choose karne se pehle hamesha main verb ko identify karein.'
          : 'MCQ exams mein examiners time markers (jaise yesterday, already, since, by the time) ko clues ke roop mein dete hain. Unka interpretation sentence ke context, duration, aur completion par depend karta hai. Ek baar jab aap time markers ko context ke sath padhna seekh lenge, toh galat options ko foran eliminate kar sakenge.'}
      </Callout>
    </div>
  )
}
