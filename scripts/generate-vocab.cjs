// Generator for L18 vocabulary-collection.json
const fs = require('fs');
const path = require('path');

const affixes = [
  // --- NEGATIVE & REVERSAL PREFIXES ---
  {
    id: "AFF-001",
    affix: "un-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Old English (Germanic)",
    meaning: "Not; opposite of; reversal of an action",
    hinglishMeaning: "Kisi quality ya state ka ulta (not) ya action ko reverse karna (jaise undo).",
    examples: [
      { base: "happy", derived: "unhappy", context: "The aggrieved petitioner remained unhappy with the administrative explanation." },
      { base: "tie", derived: "untie", context: "The court bailiff had to untie the bundles of record sheets." },
      { base: "necessary", derived: "unnecessary", context: "Unnecessary procedural delays defeat the purpose of fast-track adjudication." }
    ],
    spellingNote: "Base word ki initial spelling change nahi hoti. Agar base 'n' se shuru ho toh double 'n' banta hai (un- + necessary = unnecessary).",
    examTrap: "Examiner aksar 'unnecessary' ko single 'n' (*unecessary) likhkar spelling error trap banata hai.",
    conceptTags: ["negation", "reversal", "germanic-prefix", "double-letter-trap"]
  },
  {
    id: "AFF-002",
    affix: "in-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin",
    meaning: "Not; without; lack of (used mainly with Latin-origin roots)",
    hinglishMeaning: "Abhav ya viparit roop darshata hai; Latin roots ke sath judta hai.",
    examples: [
      { base: "accurate", derived: "inaccurate", context: "The lower court found the initial revenue survey to be inaccurate." },
      { base: "capable", derived: "incapable", context: "An officer incapable of impartial assessment cannot preside over an enquiry." },
      { base: "finite", derived: "infinite", context: "The constitution bestows infinite faith in the democratic process." }
    ],
    spellingNote: "Phonetic assimilation hoti hai: b/m/p ke aage 'im-', l ke aage 'il-', r ke aage 'ir-' ban jata hai.",
    examTrap: "'Invaluable' ka matlab worthless nahi, balki 'beyond any price / highly priceless' hota hai! Examiner candidate ko trap karne ke liye 'invaluable' ka antonym 'valuable' banata hai jo bilkul galat hai.",
    conceptTags: ["negation", "latin-prefix", "assimilation", "invaluable-trap"]
  },
  {
    id: "AFF-003",
    affix: "im-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin (assimilated in-)",
    meaning: "Not; opposite of (used before bilabial consonants: b, m, p)",
    hinglishMeaning: "In- ka roop jo b, m, p se shuru hone wale Latin words ke aage lagta hai.",
    examples: [
      { base: "possible", derived: "impossible", context: "Without documentary testimony, proving the claim was nearly impossible." },
      { base: "partial", derived: "impartial", context: "The presiding judge remained rigorously impartial throughout the testimony." },
      { base: "mortal", derived: "immortal", context: "Great jurists achieve immortal stature through landmark judgments." }
    ],
    spellingNote: "Base word 'm' se shuru ho toh double 'm' banta hai (im- + mortal = immortal; im- + mature = immature).",
    examTrap: "'Immature' aur 'immobile' mein single 'm' (*imature, *imobile) dekar spelling test kiya jata hai.",
    conceptTags: ["negation", "latin-prefix", "bilabial-assimilation", "spelling-trap"]
  },
  {
    id: "AFF-004",
    affix: "il-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin (assimilated in-)",
    meaning: "Not; opposite of (used before 'l')",
    hinglishMeaning: "In- ka roop jo 'l' se shuru hone wale Latin words ke aage assimilate hota hai.",
    examples: [
      { base: "legal", derived: "illegal", context: "Arbitrary detention without production before a magistrate is illegal." },
      { base: "logical", derived: "illogical", context: "The defense argument was dismissed as completely illogical." },
      { base: "legible", derived: "illegible", context: "The handwritten notes of the medical officer were virtually illegible." }
    ],
    spellingNote: "Prefix il- judne par hamesha double 'l' banta hai (il- + legal = illegal; il- + legible = illegible).",
    examTrap: "'Illegible' (jo padha na ja sake) aur 'eligible' (jo kabil ho) ke beech examiner confusion create karta hai.",
    conceptTags: ["negation", "latin-prefix", "lateral-assimilation", "confusable-trap"]
  },
  {
    id: "AFF-005",
    affix: "ir-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin (assimilated in-)",
    meaning: "Not; opposite of (used before 'r')",
    hinglishMeaning: "In- ka roop jo 'r' se shuru hone wale Latin words ke aage judta hai.",
    examples: [
      { base: "regular", derived: "irregular", context: "The state auditor flagged irregular fiscal disbursements in the municipal wing." },
      { base: "responsible", derived: "irresponsible", context: "Dereliction of duty is deemed highly irresponsible conduct for judicial staff." },
      { base: "revocable", derived: "irrevocable", context: "Once executed, the statutory order becomes irrevocable without appellate review." }
    ],
    spellingNote: "Prefix ir- judne se hamesha double 'r' banta hai (ir- + responsible = irresponsible; ir- + rational = irrational).",
    examTrap: "'Irrelevant' aur 'irresponsible' mein single 'r' (*irelevant) standard High Court distractor trap hota hai.",
    conceptTags: ["negation", "latin-prefix", "rhotic-assimilation", "spelling-trap"]
  },
  {
    id: "AFF-006",
    affix: "dis-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin",
    meaning: "Apart; away; not; reversal of action",
    hinglishMeaning: "Alag karna, inkar karna ya kisi sthiti ka viparit roop.",
    examples: [
      { base: "approve", derived: "disapprove", context: "The bench expressed strong reasons to disapprove of the delayed chargesheet." },
      { base: "honest", derived: "dishonest", context: "A dishonest testimony damages the credibility of the entire prosecution." },
      { base: "satisfied", derived: "dissatisfied", context: "Dissatisfied litigants can file an appeal before the Division Bench." }
    ],
    spellingNote: "Jab base word 's' se shuru hota hai, toh double 's' banta hai (dis- + satisfied = dissatisfied; dis- + similar = dissimilar).",
    examTrap: "'Dissatisfied' (single 's' *disatisfied) exam ka classic distractor hai; 'disinterested' (impartial/tatastha) aur 'uninterested' (not interested/laaparwah) ka semantic difference baar baar poocha jata hai.",
    conceptTags: ["negation", "separation", "double-s-trap", "disinterested-vs-uninterested"]
  },
  {
    id: "AFF-007",
    affix: "non-",
    type: "prefix",
    category: "Negative & Reversal",
    origin: "Latin",
    meaning: "Not; absence of a quality; neutral non-belonging",
    hinglishMeaning: "Keval kisi category ya quality ka na hona (objective fact, bina kisi judgment ya emotion ke).",
    examples: [
      { base: "bailable", derived: "non-bailable", context: "The magistrate issued a non-bailable warrant against the absconding witness." },
      { base: "partisan", derived: "non-partisan", context: "The election commission maintained a strictly non-partisan stance." },
      { base: "entity", derived: "nonentity", context: "Without evidence, the alleged verbal contract remained a legal nonentity." }
    ],
    spellingNote: "Aksar hyphen ke sath likha jata hai, visheshkar official, legal ya formal words mein (non-cooperation, non-bailable).",
    examTrap: "'Un-' aur 'non-' mein antar: 'unprofessional' unethical behaviour darshata hai, jabki 'non-professional' simply amatuer status darshata hai.",
    conceptTags: ["negation", "objective-non-belonging", "legal-prefix", "hyphenation"]
  },
  {
    id: "AFF-008",
    affix: "mis-",
    type: "prefix",
    category: "Negative & Pejorative",
    origin: "Old English",
    meaning: "Badly; wrongly; incorrectly; erroneously",
    hinglishMeaning: "Galat tareeqe se ya anuchit dhang se koi kaam karna.",
    examples: [
      { base: "spell", derived: "misspell", context: "Candidates frequently misspell technical legal terms in the drafting paper." },
      { base: "interpret", derived: "misinterpret", context: "A novice clerk might misinterpret the administrative circular." },
      { base: "lead", derived: "mislead", context: "Counsel must never attempt to mislead the court on matters of settled precedent." }
    ],
    spellingNote: "Base word agar 's' se shuru ho toh double 's' banta hai (mis- + spell = misspell; mis- + state = misstate).",
    examTrap: "'Misspell' mein single 's' (*mispell) competitive exams ka top 5 spelling errors mein shamil hai.",
    conceptTags: ["pejorative", "wrongly", "double-letter-trap", "spelling-favorite"]
  },
  {
    id: "AFF-009",
    affix: "mal-",
    type: "prefix",
    category: "Negative & Pejorative",
    origin: "Latin (malus = bad)",
    meaning: "Bad; ill; improper; diseased; defective",
    hinglishMeaning: "Bura, dushit, kharab ya doshpurna roop.",
    examples: [
      { base: "practice", derived: "malpractice", context: "The advocate faced disciplinary proceedings for professional malpractice." },
      { base: "function", derived: "malfunction", context: "The electronic voting terminal experienced a transient malfunction." },
      { base: "nutrition", derived: "malnutrition", context: "Public health programmes aim to eradicate child malnutrition in tribal belts." }
    ],
    spellingNote: "Directly base root ke sath attach hota hai bina hyphen ke.",
    examTrap: "'Bene-' (good) ka direct opposite 'mal-' (bad) hota hai (benefactor vs malefactor; benevolent vs malevolent).",
    conceptTags: ["pejorative", "latin-root", "malpractice", "antonym-pairs"]
  },
  {
    id: "AFF-010",
    affix: "a- / an-",
    type: "prefix",
    category: "Negative & Privative",
    origin: "Greek",
    meaning: "Without; lacking; not (privative prefix)",
    hinglishMeaning: "Bina kisi quality ya tatva ke (complete absence). Consonants ke aage 'a-', vowels ke aage 'an-'.",
    examples: [
      { base: "theist", derived: "atheist", context: "An atheist denies the theological premise of divine creation." },
      { base: "archy", derived: "anarchy", context: "Without an enforcement apparatus, societal governance collapses into anarchy." },
      { base: "typical", derived: "atypical", context: "Such a severe procedural penalty was deemed completely atypical for a first offense." }
    ],
    spellingNote: "Consonant ke aage 'a-' (amoral, atypical, asymmetrical); vowel ya 'h' ke aage 'an-' (anarchy, anonymous, anesthesia).",
    examTrap: "'Amoral' (bina moral sense ke, jaise janwar) aur 'immoral' (galat kaam karne wala) ke distinction par question aata hai.",
    conceptTags: ["greek-prefix", "privative", "amoral-vs-immoral", "vocabulary-distinction"]
  },
  {
    id: "AFF-011",
    affix: "anti-",
    type: "prefix",
    category: "Opposition & Counteraction",
    origin: "Greek",
    meaning: "Against; opposite; preventing",
    hinglishMeaning: "Kisi cheez ke virodh mein ya usko rokne wala.",
    examples: [
      { base: "social", derived: "antisocial", context: "Vandalism of court property constitutes severe antisocial behaviour." },
      { base: "dote", derived: "antidote", context: "The physician administered the specific antidote to counteract the poison." },
      { base: "climax", derived: "anticlimax", context: "After sensational press coverage, the procedural dismissal was an anticlimax." }
    ],
    spellingNote: "Proper nouns ke aage hyphen lagta hai (anti-British, anti-dumping); i ke clash par aksar hyphen lagta hai.",
    examTrap: "'Anti-' (against) aur 'Ante-' (before in time) mein spelling confusion: 'anticipate' vs 'antedate'.",
    conceptTags: ["opposition", "greek-prefix", "anti-vs-ante-trap"]
  },
  {
    id: "AFF-012",
    affix: "counter-",
    type: "prefix",
    category: "Opposition & Counteraction",
    origin: "Latin / Anglo-French",
    meaning: "Against; in response to; corresponding; opposite direction",
    hinglishMeaning: "Javabi karvayi, ulte rukh ya samantar response darshata hai.",
    examples: [
      { base: "claim", derived: "counterclaim", context: "The respondent filed a substantial counterclaim for financial damages." },
      { base: "productive", derived: "counterproductive", context: "Adjourning hearings without just cause is counterproductive to speedy trial." },
      { base: "feit", derived: "counterfeit", context: "Possession of counterfeit currency notes is a punishable penal offense." }
    ],
    spellingNote: "Samanyatah bina hyphen ke base ke sath judta hai.",
    examTrap: "'Counterfeit' ki spelling (c-o-u-n-t-e-r-f-e-i-t, na ki *counterfiet) exam ka favorite spelling question hai.",
    conceptTags: ["opposition", "counteraction", "legal-prefix", "spelling-trap"]
  },
  {
    id: "AFF-013",
    affix: "de-",
    type: "prefix",
    category: "Reversal & Removal",
    origin: "Latin",
    meaning: "Down; away; off; reverse action; removal",
    hinglishMeaning: "Niche lana, hatana ya kisi process ko reverse karna.",
    examples: [
      { base: "escalate", derived: "de-escalate", context: "The mediation panel urged both disputing unions to de-escalate tensions." },
      { base: "regulate", derived: "deregulate", context: "Parliament debated whether to deregulate telecommunication tariffs." },
      { base: "fame", derived: "defame", context: "Publishing malicious allegations intended to defame a public servant attracts litigation." }
    ],
    spellingNote: "Vowel repetition hone par aksar hyphen lagta hai (de-escalate), anyatha jud jata hai (defraud, deregulate).",
    examTrap: "'Defame' ka noun 'defamation' banta hai, jisme spelling 'defamation' hoti hai (*defamte nahi).",
    conceptTags: ["reversal", "removal", "latin-prefix"]
  },

  // --- DEGREE, SIZE, NUMBER & QUANTITY PREFIXES ---
  {
    id: "AFF-014",
    affix: "hyper-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Greek",
    meaning: "Over; excessive; beyond normal limits",
    hinglishMeaning: "Bahut zyada, seema se pare ya atyadhik.",
    examples: [
      { base: "critical", derived: "hypercritical", context: "A judicial reviewer must not be hypercritical of minor drafting flaws." },
      { base: "tension", derived: "hypertension", context: "Prolonged occupational stress contributed to severe hypertension." },
      { base: "bole", derived: "hyperbole", context: "The petitioner's claim of total destitution proved to be mere hyperbole." }
    ],
    spellingNote: "Directly attach hota hai; 'hyperbole' ka pronunciation /haɪˈpɜːrbəli/ hota hai.",
    examTrap: "'Hyper-' (excessive) aur 'Hypo-' (deficient/below) ka antonym relation exams mein test hota hai.",
    conceptTags: ["degree", "excessive", "greek-prefix", "hyper-hypo-antonym"]
  },
  {
    id: "AFF-015",
    affix: "hypo-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Greek",
    meaning: "Under; beneath; below normal; deficient",
    hinglishMeaning: "Niche, kam ya samanya se kam star par.",
    examples: [
      { base: "critical", derived: "hypocritical", context: "Condemning perjury while falsifying evidence was hypocritical." },
      { base: "thesis", derived: "hypothesis", context: "The investigative agency tested the hypothesis of an internal leak." },
      { base: "dermic", derived: "hypodermic", context: "The forensic officer sealed the hypodermic syringe recovered from the site." }
    ],
    spellingNote: "Greek roots ke sath use hota hai.",
    examTrap: "'Hypocrisy' aur 'hypocritical' ki spelling mein 'y' aur 'o' ka sequence dhyaan rakhein.",
    conceptTags: ["degree", "deficient", "greek-prefix", "scientific-root"]
  },
  {
    id: "AFF-016",
    affix: "super-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Latin",
    meaning: "Above; over; beyond; superior in size or quality",
    hinglishMeaning: "Upar, uchh star ka ya sadharan se behtar.",
    examples: [
      { base: "vise", derived: "supervise", context: "The Registrar General was designated to supervise the recruitment examination." },
      { base: "sed", derived: "supersede", context: "A statutory enactment will supersede conflicting executive orders." },
      { base: "fluous", derived: "superfluous", context: "Citing ten identical citations for an elementary point is superfluous." }
    ],
    spellingNote: "'Supersede' mein 'sede' hota hai, 'cede' nahi! Ye English language ke sabse common spelling traps mein se ek hai.",
    examTrap: "'Supersede' ko *supercede likhna examiner ka classic trap hai.",
    conceptTags: ["degree", "superior", "latin-prefix", "supersede-spelling-trap"]
  },
  {
    id: "AFF-017",
    affix: "sub-",
    type: "prefix",
    category: "Degree & Location",
    origin: "Latin",
    meaning: "Under; below; secondary; subordinate; subdivision",
    hinglishMeaning: "Niche, adheen, chhota ya secondary darje ka.",
    examples: [
      { base: "ordinate", derived: "subordinate", context: "Subordinate judicial officers must maintain meticulous docket sheets." },
      { base: "merge", derived: "submerge", context: "Monsoon flooding threatened to submerge the warehouse containing court archives." },
      { base: "poena", derived: "subpoena", context: "The court issued a subpoena commanding the hospital director to produce records." }
    ],
    spellingNote: "Consonants ke anuroop assimilate hota hai: suc- (succumb), suf- (suffix), sug- (suggest), sup- (suppress), sur- (surrender).",
    examTrap: "'Subpoena' ki spelling (s-u-b-p-o-e-n-a) aur pronunciation /səˈpiːnə/ legal English ka primary exam question hai.",
    conceptTags: ["location", "degree", "latin-prefix", "subpoena-spelling"]
  },
  {
    id: "AFF-018",
    affix: "micro-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Greek",
    meaning: "Extremely small; on a microscopic scale",
    hinglishMeaning: "Atyadhik chhota ya sookshma.",
    examples: [
      { base: "scope", derived: "microscope", context: "Forensic ballistic analysts examined the bullet striations under a microscope." },
      { base: "film", derived: "microfilm", context: "Historical court gazettes from 1902 were preserved on microfilm." },
      { base: "cosm", derived: "microcosm", context: "The diverse courtroom gallery was a microcosm of society." }
    ],
    spellingNote: "Bina hyphen ke roots ke sath direct combine hota hai.",
    examTrap: "'Micro-' (small) aur 'Macro-' (large scale) ka direct semantic contrast.",
    conceptTags: ["size", "greek-prefix", "scientific"]
  },
  {
    id: "AFF-019",
    affix: "macro-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Greek",
    meaning: "Large; broad scale; comprehensive",
    hinglishMeaning: "Bade paimane par ya samagra roop se.",
    examples: [
      { base: "economics", derived: "macroeconomics", context: "Judicial salary revisions take into account macroeconomic inflation metrics." },
      { base: "cosm", derived: "macrocosm", context: "The national constitution reflects the macrocosm of civic aspirations." },
      { base: "structure", derived: "macrostructure", context: "The macrostructure of the judicial system ensures multi-tier appellate scrutiny." }
    ],
    spellingNote: "Directly attaches to bases.",
    examTrap: "Macroeconomics vs microeconomics antonym pair.",
    conceptTags: ["size", "greek-prefix", "large-scale"]
  },
  {
    id: "AFF-020",
    affix: "ultra-",
    type: "prefix",
    category: "Degree & Size",
    origin: "Latin",
    meaning: "Beyond; on the other side; extreme; exceeding limits",
    hinglishMeaning: "Seemaon ke pare, atyadhik ya param.",
    examples: [
      { base: "vires", derived: "ultra vires", context: "The bench declared the executive notification ultra vires the parent statute." },
      { base: "modern", derived: "ultramodern", context: "The new High Court complex features an ultramodern digital filing registry." },
      { base: "sound", derived: "ultrasound", context: "The forensic medical team submitted the ultrasound scan report." }
    ],
    spellingNote: "Legal terminology mein 'ultra vires' do shabdon ke roop mein likha jata hai (beyond powers).",
    examTrap: "'Ultra vires' (beyond legal authority) aur 'intra vires' (within legal authority) legal maxims ka key question hai.",
    conceptTags: ["degree", "beyond", "legal-maxim", "ultra-vires"]
  },
  {
    id: "AFF-021",
    affix: "over-",
    type: "prefix",
    category: "Degree & Quantity",
    origin: "Old English",
    meaning: "Too much; excessively; above; across",
    hinglishMeaning: "Zaroorat se zyada, hadd se paar ya upar.",
    examples: [
      { base: "rule", derived: "overrule", context: "The five-judge bench decided to overrule the earlier precedent on locus standi." },
      { base: "look", derived: "overlook", context: "The trial court cannot overlook substantial procedural irregularities." },
      { base: "whelming", derived: "overwhelming", context: "The prosecution presented overwhelming documentary evidence of corruption." }
    ],
    spellingNote: "Base word se pehle judta hai; double letters preserve hote hain (over- + rule = overrule).",
    examTrap: "'Overrule' (precedent radd karna) aur 'overlook' (ignoring/nazarandaz karna) ka accurate legal usage.",
    conceptTags: ["degree", "excessive", "germanic-prefix", "legal-usage"]
  },
  {
    id: "AFF-022",
    affix: "under-",
    type: "prefix",
    category: "Degree & Quantity",
    origin: "Old English",
    meaning: "Below; insufficiently; less than normal; subordinate",
    hinglishMeaning: "Kam, zaroorat se kam, niche ya adheen.",
    examples: [
      { base: "estimate", derived: "underestimate", context: "A seasoned advocate will never underestimate the acumen of the appellate bench." },
      { base: "go", derived: "undergo", context: "Every judicial recruit must undergo six months of intensive institutional training." },
      { base: "mine", derived: "undermine", context: "Unsubstantiated public accusations undermine public confidence in the judiciary." }
    ],
    spellingNote: "Directly attach hota hai bina hyphen ke.",
    examTrap: "'Undermine' ka matlab weaken/khokhla karna hota hai, examinees aksar isko physical sense mein samajh lete hain.",
    conceptTags: ["degree", "insufficient", "germanic-prefix"]
  },
  {
    id: "AFF-023",
    affix: "multi-",
    type: "prefix",
    category: "Number & Quantity",
    origin: "Latin",
    meaning: "Many; much; multiple; having several components",
    hinglishMeaning: "Anek, bahuvidha ya kai bhaagon wala.",
    examples: [
      { base: "faceted", derived: "multifaceted", context: "The land acquisition dispute presented a multifaceted constitutional challenge." },
      { base: "lateral", derived: "multilateral", context: "International extradition relies on multilateral judicial agreements." },
      { base: "lingual", derived: "multilingual", context: "Court notices in metropolitan districts are published in multilingual circulars." }
    ],
    spellingNote: "Latin bases ke sath use hota hai; hyphen tab lagta hai jab root capital ho ya readability chahiye ho.",
    examTrap: "Greek 'poly-' aur Latin 'multi-' ka semantic parallel: multilingual (Latin) = polyglot (Greek).",
    conceptTags: ["quantity", "many", "latin-prefix", "multi-vs-poly"]
  },
  {
    id: "AFF-024",
    affix: "poly-",
    type: "prefix",
    category: "Number & Quantity",
    origin: "Greek",
    meaning: "Many; several; much",
    hinglishMeaning: "Anek ya bahu (Greek roots ke sath).",
    examples: [
      { base: "glot", derived: "polyglot", context: "An interpreter serving the international arbitration court was a gifted polyglot." },
      { base: "gamy", derived: "polygamy", context: "The penal code prohibits polygamy unless protected by personal statutory codes." },
      { base: "gon", derived: "polygon", context: "The surveyed revenue map marked the disputed land parcel as a six-sided polygon." }
    ],
    spellingNote: "Greek roots ke sath judta hai.",
    examTrap: "'Polyglot' (ek vyakti jo kai bhashayein bolta hai) one-word substitutions ka repeat question hai.",
    conceptTags: ["quantity", "greek-prefix", "one-word-substitution"]
  },
  {
    id: "AFF-025",
    affix: "mono-",
    type: "prefix",
    category: "Number & Quantity",
    origin: "Greek",
    meaning: "One; single; alone",
    hinglishMeaning: "Ek, akela ya ekal.",
    examples: [
      { base: "logue", derived: "monologue", context: "The witness's extended monologue had to be gently redirected by the judge." },
      { base: "poly", derived: "monopoly", context: "The antitrust regulator intervened to prevent an unfair monopoly in port transport." },
      { base: "tonous", derived: "monotonous", context: "Reading thousands of procedural affidavits can be a monotonous clerical duty." }
    ],
    spellingNote: "Vowel se shuru hone wale root se pehle 'o' drop ho sakta hai (mon- + arch = monarch).",
    examTrap: "'Monotonous' (boring due to lack of variation) ki spelling mein teeno 'o' dhyaan rakhein.",
    conceptTags: ["quantity", "single", "greek-prefix", "spelling-check"]
  },
  {
    id: "AFF-026",
    affix: "omni-",
    type: "prefix",
    category: "Number & Quantity",
    origin: "Latin (omnis = all)",
    meaning: "All; everywhere; of all things",
    hinglishMeaning: "Sabhi, sarva, har jagah.",
    examples: [
      { base: "scient", derived: "omniscient", context: "Judges do not pretend to be omniscient; they rely strictly on proven evidence." },
      { base: "potent", derived: "omnipotent", context: "No organ of state is omnipotent under our supreme constitutional charter." },
      { base: "present", derived: "omnipresent", context: "Public interest awareness has become omnipresent in modern legal reporting." }
    ],
    spellingNote: "Latin roots ke sath judta hai.",
    examTrap: "Triad: Omniscient (all-knowing), Omnipotent (all-powerful), Omnipresent (present everywhere) one-word substitutions ke favorite hain.",
    conceptTags: ["quantity", "all", "latin-prefix", "omni-triad"]
  },

  // --- TIME & ORDER PREFIXES ---
  {
    id: "AFF-027",
    affix: "pre-",
    type: "prefix",
    category: "Time & Order",
    origin: "Latin (prae = before)",
    meaning: "Before in time, place, rank, or order; prior to",
    hinglishMeaning: "Pehle se, poorva mein ya aage se.",
    examples: [
      { base: "cedent", derived: "precedent", context: "The bench followed the binding precedent set by the larger constitutional bench." },
      { base: "requisite", derived: "prerequisite", context: "Clearing the screening examination is an essential prerequisite for interview." },
      { base: "mature", derived: "premature", context: "Filing a revision writ before final administrative adjudication was premature." }
    ],
    spellingNote: "Agar base word 'e' se shuru ho toh clarity ke liye hyphen lag sakta hai (pre-existing, pre-eminent).",
    examTrap: "'Precedent' (legal example) aur 'President' (rashtrapati/head) ke beech phonetic confusion trap.",
    conceptTags: ["time", "before", "latin-prefix", "precedent-trap"]
  },
  {
    id: "AFF-028",
    affix: "post-",
    type: "prefix",
    category: "Time & Order",
    origin: "Latin",
    meaning: "After; subsequent to; later than",
    hinglishMeaning: "Baad mein, pashchaat ya pichhe.",
    examples: [
      { base: "pone", derived: "postpone", context: "The registrar refused to postpone the date of cross-examination." },
      { base: "humous", derived: "posthumous", context: "The brave police inspector was conferred a posthumous medal for gallantry." },
      { base: "mortem", derived: "postmortem", context: "The postmortem autopsy report conclusively established the cause of demise." }
    ],
    spellingNote: "Directly attach hota hai; hyphen tab use hota hai jab capitalization ho (post-Independence).",
    examTrap: "'Posthumous' (child born or book published or award given after father's/author's death) exam ka repeated one-word substitution hai.",
    conceptTags: ["time", "after", "latin-prefix", "posthumous-trap"]
  },
  {
    id: "AFF-029",
    affix: "ante-",
    type: "prefix",
    category: "Time & Order",
    origin: "Latin",
    meaning: "Before in time, position, or order; prior",
    hinglishMeaning: "Pehle, aage ya samay mein poorva.",
    examples: [
      { base: "date", derived: "antedate", context: "The fraudulent vendor attempted to antedate the sales deed to escape taxation." },
      { base: "cedent", derived: "antecedent", context: "Police verified the antecedents of the applicant before clearing the appointment." },
      { base: "room", derived: "anteroom", context: "Counsel waited in the judge's private anteroom before chamber discussions." }
    ],
    spellingNote: "Spelling 'ante-' hoti hai (Latin: before), jabki 'anti-' Greek origin ka virodh darshata hai.",
    examTrap: "'Antedate' (put an earlier date) aur 'antidote' (cure for poison) ke confusion par question banaya jata hai.",
    conceptTags: ["time", "before", "latin-prefix", "ante-vs-anti"]
  },
  {
    id: "AFF-030",
    affix: "fore-",
    type: "prefix",
    category: "Time & Location",
    origin: "Old English",
    meaning: "Before in time, rank, or place; front part",
    hinglishMeaning: "Pehle se ya aage ka hissa (Germanic origin).",
    examples: [
      { base: "see", derived: "foresee", context: "The draftsman should have been able to foresee potential ambiguities in the clause." },
      { base: "cast", derived: "forecast", context: "The fiscal forecast suggested healthy revenue growth for the coming quarter." },
      { base: "runner", derived: "forerunner", context: "The 1935 Government of India Act was a key forerunner to our Constitution." }
    ],
    spellingNote: "'Fore-' mein 'e' rehta hai jab meaning 'before' ho (foresee, forewarn, forefront).",
    examTrap: "'Forego' (go before) aur 'Forgo' (relinquish/give up voluntarily) ka distinct spelling-meaning pair standard exam pitfall hai.",
    conceptTags: ["time", "front", "germanic-prefix", "forgo-vs-forego"]
  },
  {
    id: "AFF-031",
    affix: "re-",
    type: "prefix",
    category: "Time & Repetition",
    origin: "Latin",
    meaning: "Again; back; anew; backward motion",
    hinglishMeaning: "Dobara, punah ya wapas pehle jaisa.",
    examples: [
      { base: "examine", derived: "re-examine", context: "The prosecutor requested leave to re-examine the witness on new assertions." },
      { base: "voke", derived: "revoke", context: "The licensing authority decided to revoke the commercial mining permit." },
      { base: "cover", derived: "recover", context: "The decree holder initiated execution proceedings to recover the awarded sum." }
    ],
    spellingNote: "Jab meaning contrast ho (recover = get back vs re-cover = put a new cover on) toh hyphen lagana mandatory hota hai.",
    examTrap: "Hyphenation disambiguation: resign (leave job) vs re-sign (sign contract again); recreate (play) vs re-create (create again).",
    conceptTags: ["repetition", "again", "latin-prefix", "hyphen-semantic-shift"]
  },

  // --- LOCATIONAL & DIRECTIONAL PREFIXES ---
  {
    id: "AFF-032",
    affix: "inter-",
    type: "prefix",
    category: "Location & Relation",
    origin: "Latin",
    meaning: "Between; among; mutually; reciprocal",
    hinglishMeaning: "Do ya do se zyada entities ke beech, aapas mein ya paraspar.",
    examples: [
      { base: "state", derived: "interstate", context: "Interstate river water disputes fall under the specialized tribunal jurisdiction." },
      { base: "vene", derived: "intervene", context: "The Supreme Court may intervene to rectify manifest miscarriages of justice." },
      { base: "locutory", derived: "interlocutory", context: "An interlocutory order decides an interim point without terminating the suit." }
    ],
    spellingNote: "Directly attach hota hai; 'inter-' (between different entities) vs 'intra-' (within the same entity).",
    examTrap: "'Interstate' (between states, jaise Punjab and Haryana) vs 'Intrastate' (within one state) ka clear conceptual boundary.",
    conceptTags: ["location", "between", "latin-prefix", "inter-vs-intra"]
  },
  {
    id: "AFF-033",
    affix: "intra-",
    type: "prefix",
    category: "Location & Relation",
    origin: "Latin",
    meaning: "Within; inside; on the inside",
    hinglishMeaning: "Kisi ek hi entity ya boundary ke andar hi andar.",
    examples: [
      { base: "departmental", derived: "intradepartmental", context: "The complaint was referred to an intradepartmental inquiry committee." },
      { base: "mural", derived: "intramural", context: "The university organized intramural moot court competitions for freshmen." },
      { base: "venous", derived: "intravenous", context: "The casualty ward nurse administered intravenous saline to the victim." }
    ],
    spellingNote: "Vowel clash hone par hyphen use kiya ja sakta hai (intra-arterial).",
    examTrap: "Intradepartmental (within department) vs Interdepartmental (between two departments).",
    conceptTags: ["location", "inside", "latin-prefix", "boundary-distinction"]
  },
  {
    id: "AFF-034",
    affix: "trans-",
    type: "prefix",
    category: "Location & Direction",
    origin: "Latin",
    meaning: "Across; beyond; through; into another state",
    hinglishMeaning: "Ek taraf se doosri taraf, paar, ya ek roop se doosre roop mein badalna.",
    examples: [
      { base: "fer", derived: "transfer", context: "The High Court sanctioned the annual transfer of subordinate judicial officers." },
      { base: "gress", derived: "transgress", context: "Executive authorities cannot transgress statutory boundaries without liability." },
      { base: "parent", derived: "transparent", context: "Judicial appointments must adhere to open and transparent selection metrics." }
    ],
    spellingNote: "Directly attaches; 's' se shuru hone wale root ke aage 's' drop ho sakta hai (transcribe).",
    examTrap: "'Transgress' (cross moral/legal boundary) ka noun 'transgression' exam vocabulary ka standard word hai.",
    conceptTags: ["location", "across", "latin-prefix", "legal-concept"]
  },
  {
    id: "AFF-035",
    affix: "circum-",
    type: "prefix",
    category: "Location & Direction",
    origin: "Latin (circum = around)",
    meaning: "Around; about; on all sides; roundabout",
    hinglishMeaning: "Charon taraf, ghoomakar ya sidhe tareeqe se nahi.",
    examples: [
      { base: "stance", derived: "circumstance", context: "Every incriminating circumstance must form an unbroken chain in criminal trials." },
      { base: "vent", derived: "circumvent", context: "Clever draftsmen cannot circumvent mandatory statutory disclosures." },
      { base: "locution", derived: "circumlocution", context: "The judge cautioned counsel against indulging in tedious circumlocution." }
    ],
    spellingNote: "Latin roots ke sath directly combine hota hai.",
    examTrap: "'Circumlocution' (using too many words to say something / baat ghumana) one-word substitutions ka highly repeated item hai.",
    conceptTags: ["location", "around", "latin-prefix", "circumlocution"]
  },
  {
    id: "AFF-036",
    affix: "extra-",
    type: "prefix",
    category: "Location & Scope",
    origin: "Latin",
    meaning: "Outside; beyond the scope or boundary of",
    hinglishMeaning: "Kshetradhikar ya seema se bahar, atirikt.",
    examples: [
      { base: "judicial", derived: "extrajudicial", context: "An extrajudicial confession requires independent corroboration to sustain conviction." },
      { base: "ordinary", derived: "extraordinary", context: "The High Court exercised its extraordinary writ jurisdiction under Article 226." },
      { base: "territorial", derived: "extraterritorial", context: "Statutes rarely have extraterritorial operation unless explicitly provided." }
    ],
    spellingNote: "Directly attach hota hai; hyphen tab lagta hai jab confusion ka darr ho.",
    examTrap: "'Extrajudicial' (outside regular judicial proceedings) ka exact legal meaning aur spelling.",
    conceptTags: ["scope", "outside", "latin-prefix", "extrajudicial"]
  },

  // --- NOUN-FORMING SUFFIXES ---
  {
    id: "AFF-037",
    affix: "-tion / -sion",
    type: "suffix",
    category: "Noun-Forming (Action/State)",
    origin: "Latin (-tio / -sio)",
    meaning: "Action; process; state; result of a verb",
    hinglishMeaning: "Verb ko abstract noun banata hai (kisi kriya ka naam, prakriya ya parinaam).",
    examples: [
      { base: "adjudicate", derived: "adjudication", context: "The prompt adjudication of bail petitions preserves personal liberty." },
      { base: "conclude", derived: "conclusion", context: "The investigating officer reached the firm conclusion that arson occurred." },
      { base: "prescribe", derived: "prescription", context: "The doctrine of prescription confers ownership through prolonged adverse possession." }
    ],
    spellingNote: "Verbs ending in 'd/de' or 'se' generally take '-sion' (conclude -> conclusion; divide -> division); Verbs ending in 't/ate' take '-tion' (hesitate -> hesitation).",
    examTrap: "'Pronounce' se 'pronunciation' banta hai (na ki *pronounciation!). Yeh top-rated exam spelling trap hai.",
    conceptTags: ["noun-suffix", "nominalization", "latin-suffix", "pronunciation-trap"]
  },
  {
    id: "AFF-038",
    affix: "-ment",
    type: "suffix",
    category: "Noun-Forming (State/Result)",
    origin: "Latin via Old French",
    meaning: "Action; state; product; means of an action",
    hinglishMeaning: "Verb se noun banane wala suffix (action, state ya result darshata hai).",
    examples: [
      { base: "appoint", derived: "appointment", context: "The governor approved the formal appointment of judicial magistrates." },
      { base: "settle", derived: "settlement", context: "Both parties reached an amicable out-of-court settlement before the Lok Adalat." },
      { base: "judge", derived: "judgment / judgement", context: "The landmark judgment was delivered by a unanimous three-judge bench." }
    ],
    spellingNote: "Base word ka silent 'e' samanyatah retain rehta hai (-ment se pehle consonant hota hai: settle -> settlement, achieve -> achievement). Lekin 'judge' se 'judgment' (US & UK legal standard) aur 'argue' se 'argument' banta hai ('e' drop hota hai).",
    examTrap: "'Argument' (argue + ment, 'e' dropped) aur 'Judgment' (judge + ment, 'e' dropped in formal legal drafting) dono top spelling questions hain.",
    conceptTags: ["noun-suffix", "silent-e-exception", "argument-spelling", "judgment-spelling"]
  },
  {
    id: "AFF-039",
    affix: "-ness",
    type: "suffix",
    category: "Noun-Forming (Quality/State)",
    origin: "Old English",
    meaning: "State; quality; condition of being",
    hinglishMeaning: "Adjective ko abstract noun banata hai (kisi gun ya avastha ka naam).",
    examples: [
      { base: "fair", derived: "fairness", context: "Procedural fairness is the cornerstone of constitutional administrative law." },
      { base: "busy", derived: "business", context: "The court transacted its daily business with commendable dispatch." },
      { base: "forgive", derived: "forgiveness", context: "Seeking judicial pardon requires genuine remorse and willingness for restitution." }
    ],
    spellingNote: "Agar base 'consonant + y' par khatam ho, toh 'y' ban jata hai 'i' (happy -> happiness; heavy -> heaviness; busy -> business).",
    examTrap: "'Happiness' aur 'business' mein 'y' to 'i' conversion; 'dryness' aur 'shyness' exceptions hain jahan 'y' retain rehta hai.",
    conceptTags: ["noun-suffix", "germanic-suffix", "y-to-i-rule", "spelling-exception"]
  },
  {
    id: "AFF-040",
    affix: "-ity / -ty",
    type: "suffix",
    category: "Noun-Forming (Quality/State)",
    origin: "Latin (-itas)",
    meaning: "Quality; state; degree of being",
    hinglishMeaning: "Adjective se abstract noun banata hai (gun ya gunvatta ka naam).",
    examples: [
      { base: "valid", derived: "validity", context: "The petitioner challenged the statutory validity of the amendment." },
      { base: "pure", derived: "purity", context: "The purity of the judicial stream must remain unpolluted by external influence." },
      { base: "scarce", derived: "scarcity", context: "The scarcity of courtroom infrastructure in rural tehsils was flagged by the committee." }
    ],
    spellingNote: "Base word ke final silent 'e' ko drop kiya jata hai (pure -> purity; sane -> sanity). Stress aksar '-ity' se theek pehle wale syllable par shift ho jata hai.",
    examTrap: "'Curious' se 'curiosity' banta hai (jisme 'u' drop hota hai: c-u-r-i-o-s-i-t-y, na ki *curiousity!). Exam favorite spelling trap.",
    conceptTags: ["noun-suffix", "latin-suffix", "vowel-drop", "curiosity-spelling-trap"]
  },
  {
    id: "AFF-041",
    affix: "-ance / -ence",
    type: "suffix",
    category: "Noun-Forming (Action/State)",
    origin: "Latin (-antia / -entia)",
    meaning: "Action; state; quality; process",
    hinglishMeaning: "Kriya ya gun ko darshane wala noun suffix.",
    examples: [
      { base: "maintain", derived: "maintenance", context: "The family court ordered interim maintenance for the dependent spouse." },
      { base: "occur", derived: "occurrence", context: "The FIR documented the exact sequence of the unfortunate occurrence." },
      { base: "perform", derived: "performance", context: "Specific performance of a contract is granted when monetary damages are inadequate." }
    ],
    spellingNote: "Verbs ending in '-ate' usually yield '-ance' (tolerate -> tolerance); verbs related to Latin 2nd/3rd conjugation yield '-ence' (exist -> existence; refer -> reference). 'Occur' + '-ence' = 'occurrence' (consonant doubled!).",
    examTrap: "'Maintenance' (maintain + ance, 'ai' becomes 'e') aur 'Occurrence' (double 'c' and double 'r') sabse zyada galat kiye jane wale words hain.",
    conceptTags: ["noun-suffix", "consonant-doubling", "maintenance-trap", "occurrence-trap"]
  },
  {
    id: "AFF-042",
    affix: "-er / -or",
    type: "suffix",
    category: "Noun-Forming (Agent)",
    origin: "Old English (-er) / Latin (-or)",
    meaning: "One who performs an action; person or instrument that does something",
    hinglishMeaning: "Kaam karne wala vyakti ya upkaran (agent noun).",
    examples: [
      { base: "prosecute", derived: "prosecutor", context: "The public prosecutor argued for the maximum statutory punishment." },
      { base: "petition", derived: "petitioner", context: "The petitioner appeared in person to argue the fundamental rights writ." },
      { base: "counsel", derived: "counselor / counsellor", context: "The family welfare counselor submitted a confidential reconciliation report." }
    ],
    spellingNote: "Germanic words usually take '-er' (worker, singer); Latin legal words take '-or' (actor, vendor, governor, executor, donor).",
    examTrap: "Legal pairs: 'donor' (giver) vs 'donee' (receiver); 'mortgagor' vs 'mortgagee'; 'grantor' vs 'grantee'.",
    conceptTags: ["agent-noun", "latin-vs-germanic", "legal-terminology", "or-vs-er"]
  },
  {
    id: "AFF-043",
    affix: "-ee",
    type: "suffix",
    category: "Noun-Forming (Recipient/Passive)",
    origin: "Anglo-French",
    meaning: "One who receives the action; person affected by the action",
    hinglishMeaning: "Jis par kriya ka asar ho ya jo action ko receive kare (passive/recipient agent).",
    examples: [
      { base: "employ", derived: "employee", context: "Every judicial employee must adhere strictly to the civil service conduct code." },
      { base: "nominate", derived: "nominee", context: "The policyholder designated his legal heir as the sole nominee." },
      { base: "refuge", derived: "refugee", context: "The asylum tribunal granted protection to the displaced refugee." }
    ],
    spellingNote: "Stress hamesha '-ee' suffix par hi rehta hai (/ˌɛmplɔɪˈiː/).",
    examTrap: "Agent (-er/-or) vs Recipient (-ee): Employer (gives work) vs Employee (receives work); Payer vs Payee.",
    conceptTags: ["recipient-noun", "passive-agent", "legal-correlative"]
  },
  {
    id: "AFF-044",
    affix: "-ism",
    type: "suffix",
    category: "Noun-Forming (Doctrine/Practice)",
    origin: "Greek via Latin",
    meaning: "System; doctrine; philosophy; practice; distinctive condition",
    hinglishMeaning: "Siddhant, vichardhara, paddhati ya vishisht aadarsh.",
    examples: [
      { base: "capital", derived: "capitalism", context: "Constitutional socialism balances the excesses of unbridled capitalism." },
      { base: "plagiar", derived: "plagiarism", context: "The university expelled the scholar for flagrant academic plagiarism." },
      { base: "altru", derived: "altruism", context: "Pro bono legal representation reflects commendable professional altruism." }
    ],
    spellingNote: "Directly attach hota hai; related noun person takes '-ist' (altruism -> altruist; capitalism -> capitalist).",
    examTrap: "Belief (-ism) vs Practitioner (-ist): Altruism (principle) vs Altruist (person). Candidates often confuse the doctrine with the person in MCQs.",
    conceptTags: ["noun-suffix", "doctrine", "philosophy", "ism-vs-ist"]
  },

  // --- ADJECTIVE-FORMING SUFFIXES ---
  {
    id: "AFF-045",
    affix: "-able / -ible",
    type: "suffix",
    category: "Adjective-Forming (Capability)",
    origin: "Latin (-abilis / -ibilis)",
    meaning: "Capable of being; worthy of; fit to be",
    hinglishMeaning: "Kabil, yogya ya jise kiya ja sake (adjective banata hai).",
    examples: [
      { base: "avail", derived: "available", context: "The certified copies of the decree will be available within three working days." },
      { base: "access", derived: "accessible", context: "Courtrooms must be fully accessible to differently-abled citizens." },
      { base: "sense", derived: "sensible", context: "The mediator suggested a sensible compromise acceptable to both parties." }
    ],
    spellingNote: "Rule: If base is a complete English standalone word, it usually takes '-able' (depend -> dependable, adapt -> adaptable); if base cannot stand alone or ends in soft 'c/s', it takes '-ible' (edible, visible, legible, tangible, sensible).",
    examTrap: "'-able' vs '-ible' selection is among the top 3 competitive exam spelling traps: 'indispensable' (ends in -able, NOT *-ible!) vs 'ineligible' (-ible).",
    conceptTags: ["adjective-suffix", "capability", "able-vs-ible-rule", "indispensable-trap"]
  },
  {
    id: "AFF-046",
    affix: "-al / -ial",
    type: "suffix",
    category: "Adjective-Forming (Relationship)",
    origin: "Latin (-alis)",
    meaning: "Relating to; of the kind of; having the form of",
    hinglishMeaning: "Kisi se sambandhit ya uske swaroop wala.",
    examples: [
      { base: "nature", derived: "natural", context: "Natural justice mandates that no person should be condemned unheard." },
      { base: "office", derived: "official", context: "The gazette notification carries full official authority." },
      { base: "statute", derived: "statutory", context: "The tribunal is a statutory creature with defined legal parameters." }
    ],
    spellingNote: "Base word silent 'e' drops before '-al' (nature -> natural; culture -> cultural).",
    examTrap: "Confusing pairs: 'Beneficent' (doing good) vs 'Beneficial' (producing good results / faydemand).",
    conceptTags: ["adjective-suffix", "relating-to", "latin-suffix"]
  },
  {
    id: "AFF-047",
    affix: "-ful",
    type: "suffix",
    category: "Adjective-Forming (Abundance)",
    origin: "Old English",
    meaning: "Full of; having the quality of; characterized by",
    hinglishMeaning: "Kisi gun se bhara hua ya us quality wala.",
    examples: [
      { base: "care", derived: "careful", context: "The drafting assistant was careful to verify every statutory reference." },
      { base: "resource", derived: "resourceful", context: "A resourceful investigator found the missing financial ledger in an archive." },
      { base: "dread", derived: "dreadful", context: "The road accident presented a dreadful sight to early responders." }
    ],
    spellingNote: "Suffix '-ful' mein hamesha SINGLE 'l' hota hai (care + ful = careful, NOT *carefull!). Jab isme '-ly' judta hai toh double 'l' banta hai (carefully).",
    examTrap: "Writing '-ful' with double 'l' (*grateful, *skillful, *carefull) is an elementary school trap that examiners regularly exploit.",
    conceptTags: ["adjective-suffix", "single-l-rule", "spelling-trap", "germanic-suffix"]
  },
  {
    id: "AFF-048",
    affix: "-less",
    type: "suffix",
    category: "Adjective-Forming (Privation)",
    origin: "Old English",
    meaning: "Without; lacking; not having; unable to be",
    hinglishMeaning: "Bina kisi cheez ke, abhav darshane wala.",
    examples: [
      { base: "merit", derived: "meritless", context: "The appellate bench dismissed the petition as entirely frivolous and meritless." },
      { base: "help", derived: "helpless", context: "Without legal aid, indigent litigants remain helpless in complex trials." },
      { base: "tire", derived: "tireless", context: "The court staff worked with tireless devotion to complete the docket inventory." }
    ],
    spellingNote: "Always written with double 's' (-less). Does not alter base word spelling.",
    examTrap: "'Priceless' does NOT mean worthless! It means so valuable that money cannot buy it (priceless = invaluable).",
    conceptTags: ["adjective-suffix", "without", "priceless-trap", "germanic-suffix"]
  },
  {
    id: "AFF-049",
    affix: "-ous / -ious",
    type: "suffix",
    category: "Adjective-Forming (Quality)",
    origin: "Latin (-osus)",
    meaning: "Full of; possessing the qualities of; characterized by",
    hinglishMeaning: "Kisi gun ya swabhav se yukt.",
    examples: [
      { base: "peril", derived: "perilous", context: "Proceeding on high-seas voyages without radar navigation is perilous." },
      { base: "malice", derived: "malicious", context: "The complainant instituted a malicious prosecution to harass his competitor." },
      { base: "courage", derived: "courageous", context: "The whistle-blower demonstrated courageous resolve in testifying." }
    ],
    spellingNote: "Base ending in silent 'e' usually drops 'e' (fame -> famous). Exception: Base ending in 'ce' or 'ge' retains 'e' before '-ous' to keep soft sound (courage -> courageous, outrage -> outrageous, notice -> noticeable).",
    examTrap: "'Courageous' (retains 'e') vs 'Monstrous' (drops 'e'); 'Mischievous' (spelling: m-i-s-c-h-i-e-v-o-u-s, NOT *-ious!).",
    conceptTags: ["adjective-suffix", "soft-c-g-rule", "courageous-trap", "mischievous-trap"]
  },
  {
    id: "AFF-050",
    affix: "-ic / -ical",
    type: "suffix",
    category: "Adjective-Forming (Nuance Gradient)",
    origin: "Greek (-ikos) / Latin (-icus)",
    meaning: "Relating to; resembling; having the character of",
    hinglishMeaning: "Kisi visheshata ya kshetra se sambandhit.",
    examples: [
      { base: "history", derived: "historic / historical", context: "The 1950 judgment was a historic turning point; historians consult historical archives." },
      { base: "economy", derived: "economic / economical", context: "The country faced an economic downturn; she adopted an economical expenditure plan." },
      { base: "classic", derived: "classic / classical", context: "It was a classic example of negligence; he listened to classical symphony music." }
    ],
    spellingNote: "Adverbs from '-ic' adjectives end in '-ically' (economic -> economically; tragic -> tragically; exception: public -> publicly!).",
    examTrap: "High Court Exam Nuance Differentiators: 'Historic' (famous/monumental in history) vs 'Historical' (relating to the study of the past); 'Economic' (related to economy/finance) vs 'Economical' (thrifty/saving money).",
    conceptTags: ["adjective-suffix", "nuance-gradient", "historic-vs-historical", "economic-vs-economical"]
  },
  {
    id: "AFF-051",
    affix: "-ive",
    type: "suffix",
    category: "Adjective-Forming (Tendency)",
    origin: "Latin (-ivus)",
    meaning: "Tending to; having the nature of; performing an action",
    hinglishMeaning: "Kisi pravritti ya karya ko darshane wala adjective.",
    examples: [
      { base: "persuade", derived: "persuasive", context: "Counsel's persuasive oral submissions swayed the opinion of the bench." },
      { base: "prohibit", derived: "prohibitive", context: "The exorbitant litigation costs proved prohibitive for the rural tenant." },
      { base: "retroact", derived: "retroactive", context: "Criminal laws cannot impose retroactive penal liabilities under Article 20(1)." }
    ],
    spellingNote: "Final silent 'e' or 'd' drops/converts before '-ive' (decide -> decisive; conclude -> conclusive; persuade -> persuasive).",
    examTrap: "'Decisive' (resolute/final) vs 'Divisive' (causing disagreement) spelling and vocabulary check.",
    conceptTags: ["adjective-suffix", "tendency", "latin-suffix"]
  },

  // --- VERB-FORMING SUFFIXES ---
  {
    id: "AFF-052",
    affix: "-ize / -ise",
    type: "suffix",
    category: "Verb-Forming (Causative)",
    origin: "Greek (-izein) via Latin",
    meaning: "To make; to cause to become; to treat in a specified way",
    hinglishMeaning: "Kisi sthiti mein badalna ya vaisa banana (causative verb).",
    examples: [
      { base: "legal", derived: "legalize / legalise", context: "Parliament enacted legislation to legalize conditional surrogacy agreements." },
      { base: "standard", derived: "standardize / standardise", context: "The registry worked to standardize all affidavit formats across branches." },
      { base: "scrutiny", derived: "scrutinize / scrutinise", context: "A judicial magistrate must scrutinize the case diary before remanding an accused." }
    ],
    spellingNote: "US English prefers '-ize'; UK English accepts both '-ise' and '-ize' (Oxford prefers -ize). However, words where 's' is part of the root NEVER take '-ize' (advise, revise, supervise, exercise, compromise, surprise).",
    examTrap: "Examiner tests non-negotiable '-ise' words: '*exercize' and '*supervize' are flatly incorrect!",
    conceptTags: ["verb-suffix", "causative", "ize-vs-ise-rule", "spelling-trap"]
  },
  {
    id: "AFF-053",
    affix: "-ify",
    type: "suffix",
    category: "Verb-Forming (Causative)",
    origin: "Latin (-ificare from facere = to make)",
    meaning: "To make; to cause to resemble; to transform into",
    hinglishMeaning: "Karna, banana ya rupantarit karna.",
    examples: [
      { base: "simple", derived: "simplify", context: "The committee recommended procedural reforms to simplify trial paperwork." },
      { base: "pure", derived: "purify", context: "Strict disciplinary rules help purify the administration of justice." },
      { base: "test", derived: "testify", context: "The forensic ballistics expert appeared to testify regarding bullet trajectories." }
    ],
    spellingNote: "Base ending in 'e' or 'y' transforms: pure -> purify; beauty -> beautify; simple -> simplify.",
    examTrap: "Noun forms from '-ify' verbs end in '-ification' (clarify -> clarification; verify -> verification; justify -> justification).",
    conceptTags: ["verb-suffix", "causative", "ification-nominalization"]
  },
  {
    id: "AFF-054",
    affix: "-en",
    type: "suffix",
    category: "Verb-Forming (Process)",
    origin: "Old English",
    meaning: "To make; to become; to cause to have a quality",
    hinglishMeaning: "Adjective ya noun se verb banana (kisi gun ko badhana ya vaisa hona).",
    examples: [
      { base: "strength", derived: "strengthen", context: "New digital infrastructure will strengthen court management." },
      { base: "sharp", derived: "sharpen", context: "Rigorous cross-examination helps sharpen the legal acumen of advocates." },
      { base: "tight", derived: "tighten", context: "The bench ordered authorities to tighten courtroom security protocols." }
    ],
    spellingNote: "Consonant doubling occurs if base ends in 1 vowel + 1 consonant (fat -> fatten; flat -> flatten; red -> redden).",
    examTrap: "'Fasten' (pronounced /ˈfɑːsən/, silent 't') and 'glisten' (silent 't').",
    conceptTags: ["verb-suffix", "germanic-suffix", "consonant-doubling", "silent-letter"]
  },
  {
    id: "AFF-055",
    affix: "-ate",
    type: "suffix",
    category: "Verb-Forming (Action/State)",
    origin: "Latin (-atus)",
    meaning: "To make; to produce; to cause to become",
    hinglishMeaning: "Kriya banata hai; Latin origin ke shabdon ke sath.",
    examples: [
      { base: "valid", derived: "validate", context: "Proper attestation is necessary to validate a testamentary will." },
      { base: "origin", derived: "originate", context: "The land ownership dispute did not originate in the municipal registry." },
      { base: "alien", derived: "alienate", context: "A co-parcener cannot alienate ancestral property without family consent." }
    ],
    spellingNote: "Verbs ending in '-ate' produce nouns ending in '-ation' (validate -> validation; originate -> origination).",
    examTrap: "Pronunciation shift: Verb '-ate' is pronounced /eɪt/ (advocate = to support), while Noun/Adjective '-ate' is pronounced /ət/ (an advocate = lawyer).",
    conceptTags: ["verb-suffix", "latin-suffix", "pronunciation-heteronym"]
  },

  // --- ADVERB-FORMING SUFFIXES ---
  {
    id: "AFF-056",
    affix: "-ly",
    type: "suffix",
    category: "Adverb-Forming (Manner)",
    origin: "Old English (-lice)",
    meaning: "In a specified manner; at a specified interval; in a certain way",
    hinglishMeaning: "Adjective se adverb of manner banata hai (kis tareeqe se kaam hua).",
    examples: [
      { base: "meticulous", derived: "meticulously", context: "The clerk meticulously verified every annexure listed in the appeal." },
      { base: "true", derived: "truly", context: "The witness testified that his statement was truly voluntary." },
      { base: "due", derived: "duly", context: "The summons was duly served on the defendant by registered post." }
    ],
    spellingNote: "Major Spelling Rules: 1) Base ending in 'consonant + y' changes to 'i' before '-ly' (easy -> easily, happy -> happily). 2) Base ending in 'le' changes 'le' to 'ly' (gentle -> gently, noble -> nobly). 3) Exception drops 'e': true -> truly, due -> duly, whole -> wholly.",
    examTrap: "'Truly' (NOT *truely!) and 'Duly' (NOT *duely!) are classic top 5 exam spelling pitfalls. Also beware: 'friendly', 'lovely', 'lonely', 'cowardly' are ADJECTIVES, NOT adverbs!",
    conceptTags: ["adverb-suffix", "manner", "truly-spelling-trap", "adjective-vs-adverb-ly"]
  },
  {
    id: "AFF-057",
    affix: "-ward / -wards",
    type: "suffix",
    category: "Adverb/Adj-Forming (Direction)",
    origin: "Old English (-weard)",
    meaning: "In a specified direction; toward a physical point or orientation",
    hinglishMeaning: "Kisi disha ki taraf (direction).",
    examples: [
      { base: "back", derived: "backward / backwards", context: "The society cannot take a backward step in civil rights jurisprudence." },
      { base: "in", derived: "inward / inwards", context: "The investigator directed his attention inward toward the department." },
      { base: "out", derived: "outward / outwards", context: "The dispatched courier showed no outward signs of tampering." }
    ],
    spellingNote: "Adjective form is usually without 's' (a backward step); adverb form can take 's' (looking backwards).",
    examTrap: "'Toward' vs 'Towards' is a stylistic variation (US vs UK), both are grammatically correct.",
    conceptTags: ["direction", "adverb-suffix", "germanic-suffix"]
  },
  {
    id: "AFF-058",
    affix: "-wise",
    type: "suffix",
    category: "Adverb-Forming (Manner/Reference)",
    origin: "Old English",
    meaning: "In the manner of; in the direction of; with reference to",
    hinglishMeaning: "Kisi dhang se ya kisi vishay ke sandarbh mein.",
    examples: [
      { base: "clock", derived: "clockwise", context: "The survey map instructed the surveyor to traverse the perimeter clockwise." },
      { base: "other", derived: "otherwise", context: "Unless proven otherwise, official acts are presumed to be regularly performed." },
      { base: "length", derived: "lengthwise", context: "The ledger was folded lengthwise to fit the evidentiary envelope." }
    ],
    spellingNote: "Directly attach hota hai bina hyphen ke established words mein.",
    examTrap: "'Otherwise' is a formal connective adverb that requires semicolon/comma syntax in compound sentences.",
    conceptTags: ["adverb-suffix", "manner", "connective-adverb"]
  },

  // --- CLASSICAL ROOTS (LATIN & GREEK) ---
  {
    id: "AFF-059",
    affix: "bene- / bon-",
    type: "root",
    category: "Classical Root (Benefaction)",
    origin: "Latin (bene = well, bonus = good)",
    meaning: "Good; well; favourable; beneficial",
    hinglishMeaning: "Accha, hitkari, kalyankari ya faydemand.",
    examples: [
      { base: "factor", derived: "benefactor", context: "An anonymous benefactor donated a rare law library to the bar association." },
      { base: "volent", derived: "benevolent", context: "A benevolent monarch is nonetheless bound by constitutional limitations." },
      { base: "ficiary", derived: "beneficiary", context: "The trust deed clearly named the minor child as the sole beneficiary." }
    ],
    spellingNote: "Opposite root is 'mal-' (bad): benefactor vs malefactor; benevolent vs malevolent.",
    examTrap: "'Benefited' / 'Benefiting' vs 'Benefitted': In standard modern English, single 't' is preferred (benefited) because stress is on the first syllable (BÉN-e-fit).",
    conceptTags: ["latin-root", "benefaction", "bene-vs-mal", "benefited-spelling"]
  },
  {
    id: "AFF-060",
    affix: "dict-",
    type: "root",
    category: "Classical Root (Speech/Law)",
    origin: "Latin (dicere, dictus = to speak, declare)",
    meaning: "To speak; to say; to pronounce; authoritative statement",
    hinglishMeaning: "Bolna, aadesh dena ya adhikarit roop se kehna.",
    examples: [
      { base: "ver- (true)", derived: "verdict", context: "The jury delivered an unequivocal verdict of not guilty." },
      { base: "pre- (before)", derived: "predict", context: "No commentator could predict the final outcome of the constitutional appeal." },
      { base: "contra- (against)", derived: "contradict", context: "The defense witness cannot contradict his own prior sworn affidavit." }
    ],
    spellingNote: "Bases combine with prefixes: contra-dict, pre-dict, inter-dict, juris-diction.",
    examTrap: "'Jurisdiction' (law + speak = authority to hear and decide cases) is the foundation of High Court powers.",
    conceptTags: ["latin-root", "speech", "verdict", "jurisdiction"]
  },
  {
    id: "AFF-061",
    affix: "scrib- / script-",
    type: "root",
    category: "Classical Root (Writing)",
    origin: "Latin (scribere, scriptus = to write)",
    meaning: "To write; written document or text",
    hinglishMeaning: "Likhna ya likha hua dastaavez.",
    examples: [
      { base: "sub- (under)", derived: "subscribe", context: "Parties must subscribe their signatures at the foot of the verification clause." },
      { base: "trans- (across)", derived: "transcript", context: "The official court stenographer prepared a verbatim transcript of proceedings." },
      { base: "pre- (before)", derived: "prescribe", context: "The statutory service rules prescribe the mandatory qualifications for registry staff." }
    ],
    spellingNote: "Verb forms take 'b' (describe, prescribe); Noun forms take 'pt' (description, prescription).",
    examTrap: "'Proscribe' (to prohibit / outlaw officially) vs 'Prescribe' (to recommend / order a remedy) is an extremely frequent High Court exam question.",
    conceptTags: ["latin-root", "writing", "proscribe-vs-prescribe", "legal-vocabulary"]
  },
  {
    id: "AFF-062",
    affix: "struct-",
    type: "root",
    category: "Classical Root (Building)",
    origin: "Latin (struere, structus = to build, arrange)",
    meaning: "To build; to put together; to create a structure",
    hinglishMeaning: "Bananna, nirmaan karna ya rachna karna.",
    examples: [
      { base: "con- (together)", derived: "constructive", context: "The court found that the owner had constructive notice of the encumbrance." },
      { base: "in- (upon)", derived: "instruction", context: "Counsel appeared upon specific instruction from the state administration." },
      { base: "ob- (against)", derived: "obstruct", context: "No litigant has a right to obstruct public proceedings inside a courtroom." }
    ],
    spellingNote: "Combines easily with prefixes: con-struct, de-struct, in-struct, ob-struct.",
    examTrap: "'Constructive notice' (legal fiction where notice is presumed) vs actual notice in legal comprehension.",
    conceptTags: ["latin-root", "building", "constructive-notice"]
  },
  {
    id: "AFF-063",
    affix: "tract-",
    type: "root",
    category: "Classical Root (Pulling/Drawing)",
    origin: "Latin (trahere, tractus = to drag, pull, draw)",
    meaning: "To pull; to drag; to draw",
    hinglishMeaning: "Kheenchana, nikaalna ya aakarshit karna.",
    examples: [
      { base: "con- (together)", derived: "contract", context: "A legally enforceable contract requires mutual assent and lawful consideration." },
      { base: "re- (back)", derived: "retract", context: "The witness was not permitted to retract his judicial confession whimsically." },
      { base: "ex- (out)", derived: "extract", context: "The certified extract of the municipal birth register was admitted as evidence." }
    ],
    spellingNote: "Abstract nouns from 'tract' end in '-ion' (extraction, retraction, contraction).",
    examTrap: "'Intractable' (stubborn / hard to control or solve) one-word substitutions ka standard word hai.",
    conceptTags: ["latin-root", "pulling", "contract", "retract", "intractable"]
  },
  {
    id: "AFF-064",
    affix: "chron-",
    type: "root",
    category: "Classical Root (Time)",
    origin: "Greek (chronos = time)",
    meaning: "Time; relating to temporal sequence",
    hinglishMeaning: "Samay ya samay ke kram se sambandhit.",
    examples: [
      { base: "syn- (together)", derived: "synchronize", context: "The judicial software system will synchronize court diary records in real time." },
      { base: "ana- (against/back)", derived: "anachronism", context: "Retaining obsolete colonial terminology in modern statutes is an anachronism." },
      { base: "-ic (quality)", derived: "chronic", context: "Chronic docket backlog severely affects access to justice for ordinary citizens." }
    ],
    spellingNote: "Spelling always contains 'ch' (/k/ sound in Greek borrowings: chronology, chronic, synchronized).",
    examTrap: "'Anachronism' (something placed in the wrong historical time) repeated exam vocabulary question hai.",
    conceptTags: ["greek-root", "time", "anachronism", "chronological"]
  },
  {
    id: "AFF-065",
    affix: "path-",
    type: "root",
    category: "Classical Root (Feeling/Disease)",
    origin: "Greek (pathos = suffering, feeling, disease)",
    meaning: "Feeling; emotion; suffering; disease",
    hinglishMeaning: "Bhaavna, dukh, rog ya anubhuti.",
    examples: [
      { base: "sym- (together)", derived: "sympathy", context: "Judicial decisions cannot be founded on mere sympathy unsupported by law." },
      { base: "em- (in)", derived: "empathy", context: "Sentencing policies should balance legal deterrence with empathy for reform." },
      { base: "a- (without)", derived: "apathy", context: "Administrative apathy toward court directives attracts contempt of court citations." }
    ],
    spellingNote: "The quadrant: Sympathy (sorrow for another), Empathy (sharing another's feelings), Apathy (lack of feeling/caring), Antipathy (deep dislike/hostility).",
    examTrap: "'Antipathy' (strong dislike) vs 'Apathy' (total unconcern/indifference) direct antonym/synonym confusion.",
    conceptTags: ["greek-root", "feeling", "apathy-antipathy-trap", "four-path-quadrant"]
  },
  {
    id: "AFF-066",
    affix: "spect- / spic-",
    type: "root",
    category: "Classical Root (Looking/Seeing)",
    origin: "Latin (specere, spectus = to look, see)",
    meaning: "To look; to observe; to examine carefully",
    hinglishMeaning: "Dekhna, dhyan se jaanchana ya avalokan karna.",
    examples: [
      { base: "in- (into)", derived: "inspect", context: "The district judge visited the sub-jail to inspect hygiene standards." },
      { base: "retro- (backward)", derived: "retrospective", context: "Substantive penal statutes cannot be given retrospective criminal operation." },
      { base: "con- (together)", derived: "conspicuous", context: "The absence of statutory sanction was a conspicuous defect in the prosecution case." }
    ],
    spellingNote: "Noun of person: 'spectator'; adjective of caution: 'circumspect' (looking around carefully / cautious).",
    examTrap: "'Circumspect' (cautious, discreet) and 'Perspicacious' (having keen insight) are frequent competitive exam one-word substitutions.",
    conceptTags: ["latin-root", "vision", "circumspect", "perspicacious"]
  },
  {
    id: "AFF-067",
    affix: "voc- / vok-",
    type: "root",
    category: "Classical Root (Voice/Calling)",
    origin: "Latin (vox, vocis = voice; vocare = to call)",
    meaning: "To call; voice; summon",
    hinglishMeaning: "Aawaz, bulana ya pukaarna.",
    examples: [
      { base: "ad- (to/for)", derived: "advocate", context: "Every accused citizen has a right to be represented by a qualified advocate." },
      { base: "ir- + re-", derived: "irrevocable", context: "Once a consent decree is signed, it creates an irrevocable final estoppel." },
      { base: "equi- (equal)", derived: "equivocal", context: "The witness gave an equivocal response when asked if he saw the incident." }
    ],
    spellingNote: "Verbs take 'voke' (provoke, revoke, invoke); Latin nouns/adjectives take 'voc' (provocation, revocation, evocative).",
    examTrap: "'Equivocal' (ambiguous / having double meaning) vs 'Unequivocal' (clear / leaving no doubt).",
    conceptTags: ["latin-root", "voice", "advocate", "irrevocable", "equivocal"]
  },
  {
    id: "AFF-068",
    affix: "cred-",
    type: "root",
    category: "Classical Root (Belief/Trust)",
    origin: "Latin (credere = to believe, trust)",
    meaning: "To believe; to trust; confidence",
    hinglishMeaning: "Vishwas karna, bharosa ya vishwasniyata.",
    examples: [
      { base: "-ible", derived: "credible", context: "The trial judge found the injured eyewitness to be thoroughly credible." },
      { base: "in- + -ulous", derived: "incredulous", context: "The magistrate was incredulous when the defense claimed the cash was a gift." },
      { base: "-ence", derived: "credence", context: "No court can give credence to uncorroborated anonymous whistle-blower letters." }
    ],
    spellingNote: "'Incredible' (unbelievable, extraordinary) vs 'Incredulous' (unwilling to believe / skeptical).",
    examTrap: "'Credulous' (gullible / jo aasani se kisi ki bhi baat par vishwas kar le) vs 'Credible' (convincing / believable). Examiner sets this pair repeatedly!",
    conceptTags: ["latin-root", "belief", "credible-vs-credulous", "incredulous-trap"]
  }
];

const wordFamilies = [
  {
    id: "WF-01",
    root: "act",
    basePos: "verb / noun",
    rootMeaning: "To do, perform, or execute a deed",
    derivatives: {
      noun: ["action", "activity", "actor", "actress", "inaction", "inactivity", "enactment", "reaction", "interaction"],
      verb: ["act", "activate", "deactivate", "enact", "react", "transact", "overact"],
      adjective: ["active", "inactive", "actual", "actionable", "reactive", "interactive"],
      adverb: ["actively", "inactively", "actually"]
    },
    prefixesApplied: ["in- (inaction)", "en- (enact)", "re- (react)", "trans- (transact)", "de- (deactivate)", "inter- (interaction)"],
    suffixesApplied: ["-ion (action)", "-ive (active)", "-or (actor)", "-ly (actively)", "-ate (activate)", "-able (actionable)"],
    meaningShifts: "Physical movement (act) -> Law passed by parliament (Act/enactment) -> Legally actionable breach (actionable claim).",
    examTraps: "'Actionable' means giving legal grounds for a lawsuit (actionable wrong), NOT simply 'able to act'.",
    exampleSentence: "Publishing a defamatory statement is an actionable tort under civil law.",
    conceptTags: ["actionable", "enactment", "transact", "core-family"]
  },
  {
    id: "WF-02",
    root: "create",
    basePos: "verb",
    rootMeaning: "To bring something into existence",
    derivatives: {
      noun: ["creation", "creator", "creature", "creativity", "recreation"],
      verb: ["create", "recreate", "procreate"],
      adjective: ["creative", "uncreative", "recreational"],
      adverb: ["creatively", "uncreatively"]
    },
    prefixesApplied: ["re- (recreate)", "un- (uncreative)", "pro- (procreate)"],
    suffixesApplied: ["-ion (creation)", "-or (creator)", "-ure (creature)", "-ity (creativity)", "-ive (creative)", "-ly (creatively)"],
    meaningShifts: "Originating novel ideas (creative) vs leisurely diversion/refreshment (recreation).",
    examTraps: "'Recreate' (pronunciation /riːkriˈeɪt/ = to create anew) vs 'Recreation' (pronunciation /ˌrɛkriˈeɪʃən/ = leisure/sports).",
    exampleSentence: "The High Court sports club provides recreational facilities for judicial officers.",
    conceptTags: ["creativity", "recreation", "phonetic-shift"]
  },
  {
    id: "WF-03",
    root: "depend",
    basePos: "verb",
    rootMeaning: "To rely on; to hang from",
    derivatives: {
      noun: ["dependence", "dependency", "dependant (person)", "independence"],
      verb: ["depend"],
      adjective: ["dependent (condition)", "independent", "dependable", "undependable"],
      adverb: ["dependently", "independently", "dependably"]
    },
    prefixesApplied: ["in- (independence, independent)", "un- (undependable)"],
    suffixesApplied: ["-ence (dependence)", "-ency (dependency)", "-ant/-ent (dependant/dependent)", "-able (dependable)", "-ly (independently)"],
    meaningShifts: "Condition of relying on someone (dependence) -> Total autonomy (independence).",
    examTraps: "'Dependant' (noun = person who relies on another, e.g., 'He has three dependants') vs 'Dependent' (adjective = relying, e.g., 'She is dependent on legal aid').",
    exampleSentence: "The deceased judicial clerk left behind two minor dependants eligible for compassionate appointment.",
    conceptTags: ["dependant-vs-dependent", "spelling-trap", "legal-status"]
  },
  {
    id: "WF-04",
    root: "employ",
    basePos: "verb",
    rootMeaning: "To hire; to put into use",
    derivatives: {
      noun: ["employer", "employee", "employment", "unemployment", "underemployment", "employability"],
      verb: ["employ", "underemploy", "misemploy"],
      adjective: ["employed", "unemployed", "underemployed", "employable", "unemployable"],
      adverb: ["employably"]
    },
    prefixesApplied: ["un- (unemployment)", "under- (underemployed)", "mis- (misemploy)"],
    suffixesApplied: ["-er (employer - agent)", "-ee (employee - recipient)", "-ment (employment)", "-able (employable)", "-ability (employability)"],
    meaningShifts: "Providing work (employment) vs employing tactics/methods (employing a strategy).",
    examTraps: "Correlative agent pair: 'Employer' (the one who hires) vs 'Employee' (the one hired).",
    exampleSentence: "The statute mandates that every commercial employer must deposit statutory provident fund contributions.",
    conceptTags: ["agent-recipient", "employment", "labour-law"]
  },
  {
    id: "WF-05",
    root: "legal",
    basePos: "adjective",
    rootMeaning: "Conforming to or permitted by law",
    derivatives: {
      noun: ["legality", "illegality", "legalization", "paralegal"],
      verb: ["legalize", "outlaw"],
      adjective: ["legal", "illegal", "extralegal", "paralegal"],
      adverb: ["legally", "illegally"]
    },
    prefixesApplied: ["il- (illegal, illegality)", "extra- (extralegal)", "para- (paralegal)"],
    suffixesApplied: ["-ity (legality)", "-ize (legalize)", "-ation (legalization)", "-ly (legally)"],
    meaningShifts: "Lawful (legal) -> Prohibited (illegal) -> Beyond statutory scope (extralegal).",
    examTraps: "Spelling of 'illegal' requires double 'l' due to assimilation of 'in-' + 'legal'.",
    exampleSentence: "The High Court scrutinized the substantive legality of the municipal demolition order.",
    conceptTags: ["legality", "assimilation", "paralegal", "legal-core"]
  },
  {
    id: "WF-06",
    root: "origin",
    basePos: "noun",
    rootMeaning: "Beginning; source; derivation",
    derivatives: {
      noun: ["origin", "originator", "original", "originality"],
      verb: ["originate"],
      adjective: ["original", "unoriginal", "aboriginal"],
      adverb: ["originally", "aboriginally"]
    },
    prefixesApplied: ["un- (unoriginal)", "ab- (aboriginal)"],
    suffixesApplied: ["-ate (originate)", "-ator (originator)", "-al (original)", "-ity (originality)", "-ly (originally)"],
    meaningShifts: "Source point (origin) -> First version / creative (original) -> Indigenous native (aboriginal).",
    examTraps: "'Original jurisdiction' (power of court to hear case in first instance) vs 'appellate jurisdiction'.",
    exampleSentence: "The High Court exercised its original jurisdiction under the special commercial courts statute.",
    conceptTags: ["originality", "jurisdiction", "root-family"]
  },
  {
    id: "WF-07",
    root: "pure",
    basePos: "adjective",
    rootMeaning: "Free from extraneous matter; unmixed; morally clean",
    derivatives: {
      noun: ["purity", "impurity", "purification", "purifier", "purist"],
      verb: ["purify"],
      adjective: ["pure", "impure", "purified"],
      adverb: ["purely", "impurely"]
    },
    prefixesApplied: ["im- (impure, impurity)"],
    suffixesApplied: ["-ity (purity)", "-ify (purify)", "-ication (purification)", "-ist (purist)", "-ly (purely)"],
    meaningShifts: "Unmixed physical state (pure water) -> Solely / exclusively (purely technical question of law).",
    examTraps: "'Purely' preserves the final 'e' of base (pure + ly = purely), unlike 'truly' and 'duly' where 'e' is dropped.",
    exampleSentence: "The maintainability of the writ petition turned on a purely jurisdictional determination.",
    conceptTags: ["purity", "spelling-contrast", "purely-vs-truly"]
  },
  {
    id: "WF-08",
    root: "form",
    basePos: "noun / verb",
    rootMeaning: "Shape, structure; to shape or produce",
    derivatives: {
      noun: ["form", "formation", "formula", "formulation", "reformer", "reformation", "conformity", "nonconformity", "deformity", "transformation", "uniformity", "information"],
      verb: ["form", "formulate", "reform", "conform", "deform", "transform", "inform"],
      adjective: ["formal", "informal", "uniform", "deformed", "reformed", "conformist", "formative"],
      adverb: ["formally", "informally", "uniformly"]
    },
    prefixesApplied: ["re- (reform)", "con- (conform)", "de- (deform)", "trans- (transform)", "uni- (uniform)", "in- (inform, informal)"],
    suffixesApplied: ["-ation (formation)", "-ula (formula)", "-ity (uniformity)", "-al (formal)", "-ist (conformist)", "-ly (formally)"],
    meaningShifts: "Physical shape (form) -> Obeying rules (conform) -> Drastic complete change (transform).",
    examTraps: "'Conform' (follow rules/standards, takes prep 'to': conform to rules) vs 'Confirm' (validate/verify facts).",
    exampleSentence: "Every administrative tender notice must strictly conform to published public procurement guidelines.",
    conceptTags: ["conform-vs-confirm", "preposition-collocation", "super-family"]
  },
  {
    id: "WF-09",
    root: "press",
    basePos: "verb / noun",
    rootMeaning: "To squeeze, push, exert force; news media",
    derivatives: {
      noun: ["pressure", "expression", "impression", "oppression", "repression", "suppression", "depressant"],
      verb: ["press", "express", "impress", "oppress", "repress", "suppress", "depress"],
      adjective: ["expressive", "impressive", "oppressive", "repressive", "suppressive", "depressed"],
      adverb: ["expressly", "impressively", "oppressively", "depressingly"]
    },
    prefixesApplied: ["ex- (express)", "im- (impress)", "op- (oppress)", "re- (repress)", "sup- (suppress)", "de- (depress)"],
    suffixesApplied: ["-ure (pressure)", "-ion (expression)", "-ive (expressive)", "-ly (expressly)"],
    meaningShifts: "Exert force (press) -> Put thoughts into words (express) -> Forcefully stifle truth (suppress).",
    examTraps: "'Expressly' (specifically and clearly stated, e.g., 'expressly prohibited by statute') vs 'Expressively' (with emotional expression).",
    exampleSentence: "The parent act expressly bars filing civil suits where a statutory appellate tribunal exists.",
    conceptTags: ["expressly-vs-expressively", "legal-standard", "assimilated-prefixes"]
  },
  {
    id: "WF-10",
    root: "serve",
    basePos: "verb",
    rootMeaning: "To work for; to provide; to keep or protect",
    derivatives: {
      noun: ["servant", "service", "conservation", "reservation", "preservation", "observation", "observance"],
      verb: ["serve", "conserve", "reserve", "preserve", "observe"],
      adjective: ["serviceable", "conservative", "reserved", "preservative", "observant"],
      adverb: ["conservatively", "reservedly", "observantly"]
    },
    prefixesApplied: ["con- (conserve)", "re- (reserve)", "pre- (preserve)", "ob- (observe)"],
    suffixesApplied: ["-ant (servant)", "-ice (service)", "-ation (preservation)", "-ance (observance)", "-able (serviceable)"],
    meaningShifts: "Working for master (serve) -> Protecting natural resources (conserve) -> Following a rule/law (observance).",
    examTraps: "'Observance' (following a law/custom/holiday, e.g. strict observance of court rules) vs 'Observation' (watching or remarking on something).",
    exampleSentence: "Meticulous observance of civil procedure rules prevents avoidable procedural adjournments.",
    conceptTags: ["observance-vs-observation", "prefix-shifts", "exam-classic"]
  },
  {
    id: "WF-11",
    root: "tend",
    basePos: "verb",
    rootMeaning: "To stretch; to lean toward; to care for",
    derivatives: {
      noun: ["tendency", "attendance", "attendant", "attention", "inattention", "extension", "intent", "intention", "pretension", "contention"],
      verb: ["tend", "attend", "extend", "intend", "pretend", "contend"],
      adjective: ["attentive", "inattentive", "extensive", "intentional", "unintentional", "pretentious", "contentious"],
      adverb: ["attentively", "extensively", "intentionally", "unintentionally"]
    },
    prefixesApplied: ["at- (attend)", "ex- (extend)", "in- (intend, inattentive)", "pre- (pretend)", "con- (contend)"],
    suffixesApplied: ["-ency (tendency)", "-ance (attendance)", "-ion (attention, extension)", "-ive (attentive)", "-ious (contentious)"],
    meaningShifts: "Lean towards habit (tendency) -> Stretch outward (extend) -> Claim or argue in court (contend).",
    examTraps: "'Contention' (legal argument raised by counsel) and 'Contentious' (likely to cause intense dispute).",
    exampleSentence: "Counsel's primary contention was that the licensing authority failed to provide a personal hearing.",
    conceptTags: ["contention", "extend-intend-attend", "legal-argument"]
  },
  {
    id: "WF-12",
    root: "sign",
    basePos: "noun / verb",
    rootMeaning: "Mark, token, seal; to write one's name",
    derivatives: {
      noun: ["sign", "signal", "signature", "significance", "insignificance", "signification", "assignment", "resignation", "design", "designer"],
      verb: ["sign", "signal", "signify", "assign", "resign", "design"],
      adjective: ["significant", "insignificant", "assigned", "resigned"],
      adverb: ["significantly", "insignificantly", "resignedly"]
    },
    prefixesApplied: ["in- (insignificant)", "as- (assign)", "re- (resign)", "de- (design)"],
    suffixesApplied: ["-ature (signature)", "-ance (significance)", "-fy (signify)", "-ment (assignment)", "-ation (resignation)"],
    meaningShifts: "Visual mark (sign) -> Allocate official duties (assign) -> Step down from office (resign).",
    examTraps: "Pronunciation shift: In 'sign', 'assign', 'resign', the 'g' is silent (/saɪn/); in 'signature', 'signal', 'designate', the 'g' is sounded (/ɡ/)!",
    exampleSentence: "The High Court ordered the re-assignment of complex arbitration suits to commercial benches.",
    conceptTags: ["silent-g-shift", "assignment", "resignation"]
  },
  {
    id: "WF-13",
    root: "vary",
    basePos: "verb",
    rootMeaning: "To change, differ, or alternate",
    derivatives: {
      noun: ["variety", "variation", "variance", "variable", "invariable"],
      verb: ["vary"],
      adjective: ["variable", "invariable", "varied", "unvaried", "various"],
      adverb: ["variably", "invariably", "variously"]
    },
    prefixesApplied: ["in- (invariable, invariably)", "un- (unvaried)"],
    suffixesApplied: ["-ety (variety)", "-ation (variation)", "-ance (variance)", "-able (variable)", "-ous (various)", "-ly (invariably)"],
    meaningShifts: "Differing types (variety) -> Discrepancy / conflict (at variance with) -> Constant / without exception (invariably).",
    examTraps: "Idiomatic legal phrase: 'at variance with' (in direct conflict or contradiction with).",
    exampleSentence: "The witness's deposition in the sessions court was completely at variance with his initial statement.",
    conceptTags: ["at-variance-with", "invariably", "legal-idiom"]
  },
  {
    id: "WF-14",
    root: "real",
    basePos: "adjective",
    rootMeaning: "Actual; existing objectively; not simulated",
    derivatives: {
      noun: ["reality", "realization", "realism", "realist"],
      verb: ["realize"],
      adjective: ["real", "unreal", "realistic", "unrealistic"],
      adverb: ["really", "realistically", "unrealistically"]
    },
    prefixesApplied: ["un- (unreal, unrealistic)"],
    suffixesApplied: ["-ity (reality)", "-ize (realize)", "-ation (realization)", "-ism (realism)", "-ist (realist)", "-ly (really)"],
    meaningShifts: "Genuine fact (reality) -> Becoming aware / converting assets to cash (realization of debts).",
    examTraps: "Legal sense: 'Realization of assets' (converting seized property into cash through auction).",
    exampleSentence: "The official liquidator proceeded with the prompt realization of company assets for creditor payout.",
    conceptTags: ["realization", "legal-connotation", "reality"]
  },
  {
    id: "WF-15",
    root: "sense",
    basePos: "noun / verb",
    rootMeaning: "Perception, feeling, meaning, reason",
    derivatives: {
      noun: ["sensation", "sensibility", "sensitivity", "insensitivity", "nonsense", "consensus", "dissension"],
      verb: ["sense", "sensitize", "desensitize"],
      adjective: ["sensible", "sensitive", "insensitive", "senseless", "sensational", "sensory"],
      adverb: ["sensibly", "sensitively", "insensitively", "senselessly"]
    },
    prefixesApplied: ["in- (insensitive, insensitivity)", "non- (nonsense)", "con- (consensus)", "dis- (dissension)", "de- (desensitize)"],
    suffixesApplied: ["-ible (sensible)", "-itive (sensitive)", "-less (senseless)", "-ation (sensation)", "-ize (sensitize)"],
    meaningShifts: "Practical good judgment (sensible) -> Easily hurt or emotionally perceptive (sensitive) -> Shared agreement (consensus).",
    examTraps: "'Sensible' (wise, practical, prudent) vs 'Sensitive' (delicate, responsive to stimuli, easily offended). This is one of the highest frequency exam traps in all Indian competitive exams!",
    exampleSentence: "A sensible magistrate will handle sensitive child custody testimonies in camera.",
    conceptTags: ["sensible-vs-sensitive", "consensus", "top-exam-favorite"]
  },
  {
    id: "WF-16",
    root: "dict",
    basePos: "root",
    rootMeaning: "To speak, declare, proclaim",
    derivatives: {
      noun: ["dictation", "dictator", "dictum", "dicta", "diction", "dictionary", "prediction", "contradiction", "verdict", "jurisdiction", "edict", "indictment", "addiction"],
      verb: ["dictate", "predict", "contradict", "indict"],
      adjective: ["dictatorial", "predictable", "unpredictable", "contradictory", "addictive"],
      adverb: ["dictatorially", "predictably", "unpredictably", "contradictorily"]
    },
    prefixesApplied: ["pre- (predict)", "contra- (contradict)", "ver- (verdict)", "juris- (jurisdiction)", "in- (indict, indictment)"],
    suffixesApplied: ["-ation (dictation)", "-or (dictator)", "-ion (diction)", "-ment (indictment)", "-ory (contradictory)"],
    meaningShifts: "Command (dictate) -> Court decision (verdict) -> Authority to decide law (jurisdiction) -> Formal criminal charge (indictment).",
    examTraps: "'Indict' (pronounced /ɪnˈdaɪt/, silent 'c') and 'Indictment' (/ɪnˈdaɪtmənt/) are classic pronunciation and spelling traps.",
    exampleSentence: "The grand jury returned a comprehensive indictment charging five bank officials with conspiracy.",
    conceptTags: ["indictment-pronunciation", "verdict", "jurisdiction", "latin-root"]
  },
  {
    id: "WF-17",
    root: "scribe / script",
    basePos: "root",
    rootMeaning: "To write, engrave",
    derivatives: {
      noun: ["scribe", "script", "manuscript", "description", "prescription", "subscription", "transcription", "transcript", "inscription", "proscription", "postscript"],
      verb: ["scribe", "scribble", "describe", "prescribe", "subscribe", "transcribe", "inscribe", "proscribe"],
      adjective: ["descriptive", "prescriptive", "inscribed", "proscribed"],
      adverb: ["descriptively", "prescriptively"]
    },
    prefixesApplied: ["de- (describe)", "pre- (prescribe)", "sub- (subscribe)", "trans- (transcribe)", "in- (inscribe)", "pro- (proscribe)", "post- (postscript)"],
    suffixesApplied: ["-tion (description)", "-ive (descriptive)", "-pt (transcript)", "-ure (scripture)"],
    meaningShifts: "Write down detail (describe) -> Mandate/order formally (prescribe) -> Prohibit/outlaw (proscribe).",
    examTraps: "'Prescribe' (recommend/lay down authoritatively) vs 'Proscribe' (ban/forbid/outlaw officially by decree).",
    exampleSentence: "The state penal code proscribes the distribution of classified defense communication transcripts.",
    conceptTags: ["prescribe-vs-proscribe", "latin-root", "high-frequency-trap"]
  },
  {
    id: "WF-18",
    root: "struct",
    basePos: "root",
    rootMeaning: "To build, assemble, form",
    derivatives: {
      noun: ["structure", "construction", "destruction", "instruction", "instructor", "obstruction", "infrastructure", "substructure", "superstructure"],
      verb: ["construct", "destroy", "instruct", "obstruct", "restructure"],
      adjective: ["structural", "constructive", "destructive", "instructive", "obstructive"],
      adverb: ["structurally", "constructively", "destructively", "instructively"]
    },
    prefixesApplied: ["con- (construct)", "de- (destroy/destruction)", "in- (instruct)", "ob- (obstruct)", "infra- (infrastructure)"],
    suffixesApplied: ["-ure (structure)", "-ion (construction)", "-or (instructor)", "-ive (constructive)", "-al (structural)"],
    meaningShifts: "Physical erection (construct) -> Presumed by law (constructive notice/possession) -> Blocking justice (obstruct).",
    examTraps: "'Constructive' in law means legal inference/fiction (constructive liability), NOT just 'helpful/positive'.",
    exampleSentence: "Constructive possession of contraband is sufficient to attract statutory penal liability.",
    conceptTags: ["constructive-liability", "obstruction", "latin-building-root"]
  },
  {
    id: "WF-19",
    root: "tract",
    basePos: "root",
    rootMeaning: "To pull, drag, draw",
    derivatives: {
      noun: ["tractor", "traction", "attraction", "contract", "contractor", "distraction", "extraction", "retraction", "protraction", "detractor", "subtraction"],
      verb: ["attract", "contract", "distract", "extract", "retract", "protract", "detract", "subtract"],
      adjective: ["attractive", "contractual", "distracted", "retractable", "intractable"],
      adverb: ["attractively", "contractually", "intractably"]
    },
    prefixesApplied: ["at- (attract)", "con- (contract)", "dis- (distract)", "ex- (extract)", "re- (retract)", "pro- (protract)", "de- (detract)", "in- (intractable)"],
    suffixesApplied: ["-ion (traction)", "-or (contractor)", "-ual (contractual)", "-able (retractable)", "-ly (contractually)"],
    meaningShifts: "Pull together in binding agreement (contract) -> Withdraw earlier statement (retract) -> Difficult to resolve (intractable).",
    examTraps: "'Detract from' (diminish value/worth, e.g., 'Minor errors do not detract from the merits') vs 'Distract' (divert attention).",
    exampleSentence: "Procedural irregularities do not detract from the substantive cogency of the prosecution evidence.",
    conceptTags: ["detract-vs-distract", "intractable", "contractual"]
  },
  {
    id: "WF-20",
    root: "capit",
    basePos: "root",
    rootMeaning: "Head; chief; leading",
    derivatives: {
      noun: ["capital", "capitalism", "capitalist", "chapter", "captain", "decapitation", "recapitulation"],
      verb: ["capitalize", "capitulate", "decapitate", "recapitulate"],
      adjective: ["capital", "capitulatory", "per capita"],
      adverb: ["capitally"]
    },
    prefixesApplied: ["de- (decapitate)", "re- (recapitulate)"],
    suffixesApplied: ["-al (capital)", "-ize (capitalize)", "-ism (capitalism)", "-ate (capitulate)", "-ation (recapitulation)"],
    meaningShifts: "Head city / wealth (capital) -> Surrender under terms (capitulate) -> Summarize main points (recapitulate).",
    examTraps: "'Capitulate' (surrender/concede defeat) and 'Recapitulate' (summarize/repeat main points, from which we get 'recap').",
    exampleSentence: "Before concluding oral arguments, senior counsel sought five minutes to recapitulate the core points.",
    conceptTags: ["recapitulate", "capitulate", "head-root"]
  },
  {
    id: "WF-21",
    root: "chron",
    basePos: "root",
    rootMeaning: "Time",
    derivatives: {
      noun: ["chronicle", "chronicler", "chronology", "chronometer", "anachronism", "synchronization"],
      verb: ["chronicle", "synchronize"],
      adjective: ["chronic", "chronological", "synchronous", "asynchronous", "anachronistic"],
      adverb: ["chronically", "chronologically", "asynchronously"]
    },
    prefixesApplied: ["syn- (synchronize)", "a- (asynchronous)", "ana- (anachronism)"],
    suffixesApplied: ["-icle (chronicle)", "-ology (chronology)", "-ic (chronic)", "-ous (synchronous)", "-ize (synchronize)"],
    meaningShifts: "Temporal sequence (chronology) -> Lasting a long time (chronic disease/delay) -> Out of proper time period (anachronism).",
    examTraps: "'Anachronism' (chronological misplacement) is a fixture in High Court vocabulary and one-word substitution sections.",
    exampleSentence: "Appellate practice rules require petition paper-books to begin with a strict chronology of events.",
    conceptTags: ["chronology", "anachronism", "greek-time-root"]
  },
  {
    id: "WF-22",
    root: "gen",
    basePos: "root",
    rootMeaning: "Birth, origin, race, kind, produce",
    derivatives: {
      noun: ["generation", "generator", "genesis", "genius", "gender", "genre", "generalization", "generosity", "congeniality", "progeny"],
      verb: ["generate", "generalize", "regenerate"],
      adjective: ["general", "generic", "generous", "genuine", "congenial", "ingenious", "ingenuous", "heterogeneous", "homogeneous"],
      adverb: ["generally", "generously", "genuinely", "ingeniously", "ingenuously"]
    },
    prefixesApplied: ["re- (regenerate)", "pro- (progeny)", "hetero- (heterogeneous)", "homo- (homogeneous)", "con- (congenial)"],
    suffixesApplied: ["-ate (generate)", "-ation (generation)", "-ic (generic)", "-ous (generous)", "-ity (generosity)"],
    meaningShifts: "Origin/birth (genesis) -> Children/offspring (progeny) -> Clevery inventive (ingenious) vs Innocently naive (ingenuous).",
    examTraps: "'Ingenious' (clever, inventive, brilliant) vs 'Ingenuous' (innocent, naive, candid, frank). One of the top 3 confusable word pairs in exam history!",
    exampleSentence: "The young apprentice proposed an ingenious technological protocol to automate cause-list uploads.",
    conceptTags: ["ingenious-vs-ingenuous", "progeny", "genesis", "classic-pair"]
  },
  {
    id: "WF-23",
    root: "graph",
    basePos: "root",
    rootMeaning: "To write, draw, record",
    derivatives: {
      noun: ["graph", "paragraph", "biography", "autobiography", "calligraphy", "stenography", "orthography", "bibliography", "monograph", "photograph", "cryptography"],
      verb: ["graph", "photograph"],
      adjective: ["graphic", "biographical", "autobiographical", "calligraphic", "stenographic", "orthographic"],
      adverb: ["graphically", "photographically"]
    },
    prefixesApplied: ["auto- (autobiography)", "para- (paragraph)", "mono- (monograph)", "crypto- (cryptography)"],
    suffixesApplied: ["-ic (graphic)", "-y (calligraphy)", "-er (biographer)", "-ical (biographical)"],
    meaningShifts: "Drawing/chart (graph) -> Beautiful handwriting (calligraphy) -> Correct spelling system (orthography).",
    examTraps: "'Orthography' (the correct spelling rules of a language) and 'Calligraphy' (art of beautiful handwriting) one-word substitutions.",
    exampleSentence: "Judicial competitive exams rigorously test English orthography through prefix and suffix questions.",
    conceptTags: ["orthography", "calligraphy", "writing-roots"]
  },
  {
    id: "WF-24",
    root: "log / loq",
    basePos: "root",
    rootMeaning: "Speech, word, reason, study",
    derivatives: {
      noun: ["logic", "monologue", "dialogue", "prologue", "epilogue", "apology", "eulogy", "eloquence", "colloquialism", "soliloquy", "loquacity", "circumlocution"],
      verb: ["apologize", "eulogize"],
      adjective: ["logical", "illogical", "eloquent", "colloquial", "loquacious", "grandiloquent"],
      adverb: ["logically", "illogically", "eloquently"]
    },
    prefixesApplied: ["mono- (monologue)", "dia- (dialogue)", "pro- (prologue)", "epi- (epilogue)", "eu- (eulogy)", "circum- (circumlocution)", "il- (illogical)"],
    suffixesApplied: ["-ic (logic)", "-al (logical)", "-ent (eloquent)", "-acious (loquacious)", "-ence (eloquence)"],
    meaningShifts: "Reasoned thought (logic) -> Fluent, persuasive speech (eloquent) -> Talking excessively / chatterbox (loquacious).",
    examTraps: "'Loquacious' (talkative) vs 'Eloquent' (fluent, persuasive) vs 'Grandiloquent' (pompous, bombastic speech).",
    exampleSentence: "Senior counsel's eloquent address in the constitutional courtroom captured the attention of all judges.",
    conceptTags: ["eloquent", "loquacious", "speech-roots", "one-word-favorites"]
  },
  {
    id: "WF-25",
    root: "mort",
    basePos: "root",
    rootMeaning: "Death",
    derivatives: {
      noun: ["mortality", "immortality", "mortician", "mortification", "postmortem", "mortgage"],
      verb: ["immortalize", "mortify"],
      adjective: ["mortal", "immortal", "mortified"],
      adverb: ["mortally"]
    },
    prefixesApplied: ["im- (immortal, immortality)", "post- (postmortem)"],
    suffixesApplied: ["-al (mortal)", "-ity (mortality)", "-ify (mortify)", "-ification (mortification)", "-ize (immortalize)"],
    meaningShifts: "Subject to physical death (mortal) -> Deeply humiliated / embarrassed (mortified).",
    examTraps: "'Mortified' (extremely embarrassed or humiliated, e.g., 'He felt mortified by the procedural rebuke').",
    exampleSentence: "The junior advocate was mortified when he realized he had brought the case bundle of the wrong matter.",
    conceptTags: ["mortified", "postmortem", "death-root"]
  },
  {
    id: "WF-26",
    root: "path",
    basePos: "root",
    rootMeaning: "Feeling, disease, suffering",
    derivatives: {
      noun: ["pathos", "pathology", "pathologist", "sympathy", "empathy", "apathy", "antipathy", "telepathy", "sociopath", "psychopath"],
      verb: ["sympathize", "empathize"],
      adjective: ["pathological", "sympathetic", "empathetic", "apathetic", "antipithetic"],
      adverb: ["pathologically", "sympathetically", "apathetically"]
    },
    prefixesApplied: ["sym- (sympathy)", "em- (empathy)", "a- (apathy)", "anti- (antipathy)", "tele- (telepathy)"],
    suffixesApplied: ["-ology (pathology)", "-ic (pathetic)", "-etic (sympathetic)", "-ize (sympathize)"],
    meaningShifts: "Pity/sorrow for another (sympathy) -> Deeply feeling another's state (empathy) -> Uncaring indifference (apathy) -> Hostile hatred (antipathy).",
    examTraps: "The emotional polarity spectrum: Sympathy (+) -> Empathy (++) -> Apathy (0) -> Antipathy (-).",
    exampleSentence: "Public apathy toward civil jury service necessitated strict administrative summons enforcement.",
    conceptTags: ["apathy", "antipathy", "emotional-spectrum"]
  },
  {
    id: "WF-27",
    root: "phil",
    basePos: "root",
    rootMeaning: "Love, affinity, fondness",
    derivatives: {
      noun: ["philanthropy", "philanthropist", "philosophy", "philosopher", "bibliophile", "philology", "philologist", "anglophile"],
      verb: ["philosophize"],
      adjective: ["philanthropic", "philosophical", "bibliophilic"],
      adverb: ["philanthropically", "philosophically"]
    },
    prefixesApplied: ["biblio- (bibliophile = book lover)", "anglo- (anglophile)"],
    suffixesApplied: ["-anthrop-y (philanthropy = love of mankind)", "-soph-y (philosophy = love of wisdom)", "-ist (philanthropist)"],
    meaningShifts: "Love of humankind (philanthropy) vs Hatred of humankind (misanthropy).",
    examTraps: "Antonym pair: 'Philanthropist' (altruistic helper of mankind) vs 'Misanthrope' (hater of humankind).",
    exampleSentence: "The retired chief justice engaged in broad educational philanthropy across rural schools.",
    conceptTags: ["philanthropy-vs-misanthropy", "love-root", "one-word-classic"]
  },
  {
    id: "WF-28",
    root: "port",
    basePos: "root",
    rootMeaning: "To carry, bear; gate/harbour",
    derivatives: {
      noun: ["port", "porter", "portfolio", "export", "exporter", "import", "importer", "transport", "transportation", "report", "reporter", "support", "deportation"],
      verb: ["export", "import", "transport", "report", "support", "deport"],
      adjective: ["portable", "supportive", "unsupported", "reported"],
      adverb: ["supportively", "reportedly"]
    },
    prefixesApplied: ["ex- (export)", "im- (import)", "trans- (transport)", "re- (report)", "sup- (support)", "de- (deport)"],
    suffixesApplied: ["-able (portable)", "-ation (transportation, deportation)", "-er (porter, reporter)"],
    meaningShifts: "Carry goods out (export) -> Expel foreigner from country (deport) -> Light and easy to carry (portable).",
    examTraps: "'Deport' (expel an alien from a country) vs 'Extradite' (hand over accused person to foreign jurisdiction).",
    exampleSentence: "The magistrate issued an interim stay order preventing the summary deportation of the refugee claimant.",
    conceptTags: ["deportation-vs-extradition", "port-root", "carry-root"]
  },
  {
    id: "WF-29",
    root: "sect",
    basePos: "root",
    rootMeaning: "To cut, divide",
    derivatives: {
      noun: ["section", "sector", "intersection", "dissection", "bisection", "transection", "vivisection"],
      verb: ["sect", "dissect", "bisect", "intersect"],
      adjective: ["sectional", "intersecting"],
      adverb: ["sectionally"]
    },
    prefixesApplied: ["dis- (dissect)", "bi- (bisect = cut in two)", "inter- (intersect)", "vivi- (vivisection)"],
    suffixesApplied: ["-ion (section, dissection)", "-or (sector)", "-al (sectional)"],
    meaningShifts: "Statutory paragraph (section) -> Cut into two equal halves (bisect) -> Surgical experiment on living animals (vivisection).",
    examTraps: "'Vivisection' (dissection or operation on living animals for scientific research) is a frequent one-word question.",
    exampleSentence: "The appellate bench dissected every subsection of the anti-corruption statute before rendering its decision.",
    conceptTags: ["dissect", "bisect", "vivisection", "cut-root"]
  },
  {
    id: "WF-30",
    root: "spec / spect",
    basePos: "root",
    rootMeaning: "To look, examine, behold",
    derivatives: {
      noun: ["aspect", "respect", "prospect", "prospectus", "retrospect", "inspection", "inspector", "spectacle", "spectacles", "spectator", "speculation", "circumspection", "perspective"],
      verb: ["inspect", "respect", "speculate", "introspect"],
      adjective: ["prospective", "retrospective", "respectful", "respectable", "respective", "conspicuous", "circumspect", "perspicacious"],
      adverb: ["prospectively", "retrospectively", "respectfully", "respectably", "respectively", "conspicuously"]
    },
    prefixesApplied: ["pro- (prospect, prospective)", "retro- (retrospect, retrospective)", "in- (inspect)", "circum- (circumspect)", "intro- (introspect)"],
    suffixesApplied: ["-ive (prospective)", "-ion (inspection)", "-ator (spectator)", "-able (respectable)", "-ful (respectful)"],
    meaningShifts: "Looking forward (prospective) vs Looking backward (retrospective) -> Looking around carefully (circumspect).",
    examTraps: "Distinguish: 'Respectful' (showing respect) vs 'Respectable' (worthy of respect) vs 'Respective' (particular / individual).",
    exampleSentence: "After the lengthy session, the advocates gathered their respective case diaries and retired to the bar room.",
    conceptTags: ["respective-vs-respectful-vs-respectable", "circumspect", "super-family"]
  },
  {
    id: "WF-31",
    root: "vid / vis",
    basePos: "root",
    rootMeaning: "To see, perceive",
    derivatives: {
      noun: ["vision", "visionary", "visitor", "visitation", "visibility", "invisibility", "provision", "revision", "supervision", "supervisor", "advice", "advisor", "advisory", "evidence"],
      verb: ["visit", "visualize", "revise", "supervise", "advise", "provide"],
      adjective: ["visible", "invisible", "provisional", "revisional", "evident", "visual", "advisable"],
      adverb: ["visibly", "invisibly", "provisionally", "evidently"]
    },
    prefixesApplied: ["in- (invisible)", "pro- (provide, provision)", "re- (revise, revision)", "super- (supervise)"],
    suffixesApplied: ["-ion (vision)", "-ible (visible)", "-or (supervisor)", "-ory (advisory)", "-al (provisional)"],
    meaningShifts: "Physical sight (vision) -> Temporary interim arrangement (provisional) -> Supervisory power of High Court (supervisory jurisdiction).",
    examTraps: "'Advice' (noun with 'c') vs 'Advise' (verb with 's'); 'Device' (noun) vs 'Devise' (verb).",
    exampleSentence: "The High Court exercised its constitutional supervisory powers under Article 227 over all subordinate tribunals.",
    conceptTags: ["advice-vs-advise", "supervisory-powers", "vis-root"]
  },
  {
    id: "WF-32",
    root: "voc / vok",
    basePos: "root",
    rootMeaning: "To call, voice, summon",
    derivatives: {
      noun: ["vocalist", "vocabulary", "vocation", "avocation", "advocate", "advocacy", "invocation", "provocation", "revocation", "convocation", "evocation", "equivocation"],
      verb: ["vocalize", "advocate", "invoke", "provoke", "revoke", "evoke", "equivocate"],
      adjective: ["vocal", "vocational", "provocative", "irrevocable", "equivocal", "unequivocal"],
      adverb: ["vocally", "provocatively", "irrevocably", "unequivocally"]
    },
    prefixesApplied: ["ad- (advocate)", "in- (invoke)", "pro- (provoke)", "re- (revoke)", "ir- (irrevocable)", "equi- (equivocal)"],
    suffixesApplied: ["-ation (vocation)", "-acy (advocacy)", "-ative (provocative)", "-able (revocable)", "-ly (unequivocally)"],
    meaningShifts: "Career/profession (vocation) vs Hobby/pastime (avocation) -> Cancel/repeal an order (revoke).",
    examTraps: "'Vocation' (one's main occupation or profession) vs 'Avocation' (minor hobby or recreational pursuit).",
    exampleSentence: "Apart from his primary vocation as an advocate, the jurist pursued classical violin as an avocation.",
    conceptTags: ["vocation-vs-avocation", "irrevocable", "advocacy", "voc-root"]
  }
];

const collection = {
  lessonId: "L18",
  title: "Prefixes & Suffixes: Comprehensive Morphology, Word Families & Derivation Matrix",
  totalAffixes: affixes.length,
  totalWordFamilies: wordFamilies.length,
  affixes,
  wordFamilies
};

const targetPath = path.resolve(__dirname, '../src/content/lessons/L18/vocabulary-collection.json');
fs.writeFileSync(targetPath, JSON.stringify(collection, null, 2), 'utf-8');
console.log(`Successfully generated ${targetPath}`);
console.log(`Affixes count: ${affixes.length}`);
console.log(`Word Families count: ${wordFamilies.length}`);
