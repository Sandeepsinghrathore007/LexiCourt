// Generator for L18 rule-cards.json
const fs = require('fs');
const path = require('path');

const ruleCards = [
  {
    id: "RC-01",
    time: "Prefix Mechanics",
    aspect: "Prefix Invariance",
    tense: "Rule 1: Prefix Invariance Law",
    auxiliary: "Base Spelling Preservation",
    formula: "Prefix + Base Word = Unmodified Base Spelling (Double letters occur naturally if prefix ends in same letter as base start)",
    usage: "Jab bhi kisi base word ke aage prefix lagaya jata hai, base word ki apni mool spelling mein koi change nahi hota. Na hi prefix ka aakhri letter drop hota hai aur na hi base word ka pehla letter. Agar prefix 'un-' hai aur base word 'necessary' ('n' se shuru) hai, toh dono 'n' milkar double 'n' banate hain: un- + necessary = unnecessary. Isi tarah mis- + spell = misspell; dis- + satisfied = dissatisfied.",
    patterns: {
      affirmative: "un- + necessary = unnecessary; mis- + statement = misstatement; dis- + similar = dissimilar.",
      negative: "Common Distractor: *unecessary (single n), *mispell (single s), *disatisfied (single s) — Yeh sabhi invalid hain!",
      interrogative: "Verification Test: Base word ko alag karke dekhein. Agar prefix hatane par base word intact rehta hai, toh spelling correct hai."
    },
    timeMarkers: ["un-", "mis-", "dis-", "re-", "over-", "inter-"],
    keyTip: "Examiner ka favorite spelling trap yehi hota hai ki wo prefix ke double consonant mein se ek letter gayab kar deta hai. Hamesha morpheme boundary par cut lagakar check karein!"
  },
  {
    id: "RC-02",
    time: "Prefix Mechanics",
    aspect: "Negative Selection",
    tense: "Rule 2: Negative Prefix Selection Paradigm",
    auxiliary: "Etymology & Polarity Match",
    formula: "Germanic Root -> un- | Latin Root -> in-/im-/il-/ir- | Objective/Neutral State -> non- | Action Reversal/Opposition -> dis- | Complete Lack -> a-/an-",
    usage: "Negative prefixes interchange nahi kiye ja sakte; har prefix ka apna etymological domain aur semantic nuance hota hai. 'Un-' samanyatah native Germanic words aur general adjectives ke sath lagta hai (unhappy, unfair). 'In-' Latin roots ke sath judta hai (inaccurate, incorrect). 'Non-' neutral, objective non-belonging darshata hai bina kisi moral judgment ke (non-violence, non-bailable). 'Dis-' reversal ya active separation darshata hai (disapprove, disqualify). 'A-/an-' complete absence/privation darshata hai (amoral, atheist).",
    patterns: {
      affirmative: "unprofessional (unethical conduct) vs non-professional (amateur / not a career practitioner).",
      negative: "Trap Polarity: 'Invaluable' does NOT mean worthless! Invaluable = priceless / beyond value. Worthless = without value.",
      interrogative: "Semantic Audit: Kya word neutral category dikha raha hai (non-), moral reversal dikha raha hai (un-/dis-), ya Latin root hai (in-)?"
    },
    timeMarkers: ["un-", "in-", "non-", "dis-", "a-", "an-"],
    keyTip: "'Disinterested' (impartial, unbiased judge) aur 'Uninterested' (bored, not caring) ka distinction High Court exam ka classic question hai. Judge must be disinterested, but never uninterested!"
  },
  {
    id: "RC-03",
    time: "Prefix Mechanics",
    aspect: "Assimilation Rules",
    tense: "Rule 3: Phonetic Assimilation of Prefixes",
    auxiliary: "Euphonic Consonant Mutation",
    formula: "in- + [b, m, p] -> im- | in- + [l] -> il- | in- + [r] -> ir- | ad- + [c, f, g, l, n, p, r, s, t] -> ac-, af-, ag-, al-, an-, ap-, ar-, as-, at-",
    usage: "Latin prefixes jab kisi aise consonant se takrate hain jise bolna mushkil hota hai, toh unka final consonant agle sound ke roop mein dhal jata hai (assimilation). 'In-' bilabial consonants (b, m, p) se pehle 'im-' ban jata hai (imbalance, immature, impossible). 'L' se pehle 'il-' ban jata hai (illegal, illiterate). 'R' se pehle 'ir-' ban jata hai (irregular, irresponsible). Isi tarah 'ad-' prefix 'ac-', 'ap-', 'at-' mein mutate hota hai (ad- + cord = accord; ad- + pear = appear; ad- + tend = attend).",
    patterns: {
      affirmative: "in- + legal = illegal; in- + mature = immature; in- + rational = irrational; ad- + tribute = attribute.",
      negative: "Error Traps: *inlegal, *inmature, *inrational, *irelevant — In sabhi mein assimilation failure ya missing double letter ka error hota hai.",
      interrogative: "Phonetic Check: Base word ka starting consonant dekhein. Agar root 'm' ya 'p' hai toh 'im-', 'l' hai toh 'il-', 'r' hai toh 'ir-' aayega."
    },
    timeMarkers: ["im- (b/m/p)", "il- (l)", "ir- (r)", "ac-", "ap-", "at-"],
    keyTip: "Assimilation ke baad banne wale words mein hamesha DOUBLE consonant aata hai: illegal (double l), immature (double m), irresponsible (double r), arrive (double r), attend (double t)."
  },
  {
    id: "RC-04",
    time: "Prefix Mechanics",
    aspect: "Degree & Number",
    tense: "Rule 4: Degree, Scale & Quantitative Prefixes",
    auxiliary: "Scalar Magnitude Vectors",
    formula: "hyper- (excessive) vs hypo- (deficient) | super- (above) vs sub- (under) | micro- (tiny) vs macro- (large-scale) | omni- (all) vs mono- (single) vs poly- (many)",
    usage: "Degree prefixes quantitative scale par kisi entity ya state ka magnitude define karte hain. 'Hyper-' Greek origin ka hai jiska matlab over/excessive hota hai (hypertension, hypercritical), jabki 'Hypo-' below/deficient hota hai (hypotension, hypothesis). 'Super-' Latin above/transcending hota hai (supervise, supersede), jabki 'Sub-' under/subordinate hota hai (subpoena, sub-inspector). 'Omni-' Latin all-inclusive hota hai (omnipotent, omniscient), jabki 'Multi-' kai aur 'Poly-' Greek kai darshata hai.",
    patterns: {
      affirmative: "Hypotension (low blood pressure) < Normotension (normal) < Hypertension (high blood pressure).",
      negative: "Spelling Criticality: 'Supersede' ends in -SEDE (Latin sedere = to sit), NEVER *-cede! (*supercede is flatly wrong).",
      interrogative: "Magnitude Check: Kya context excessive (hyper-/over-), deficient (hypo-/under-), ya all-encompassing (omni-) demand kar raha hai?"
    },
    timeMarkers: ["hyper-", "hypo-", "super-", "sub-", "omni-", "poly-", "multi-"],
    keyTip: "'Supersede' ki spelling (s-u-p-e-r-s-e-d-e) aur 'Subpoena' ki spelling (s-u-b-p-o-e-n-a) quantitative prefix category ke do sabse bade rank-deciding spelling questions hain!"
  },
  {
    id: "RC-05",
    time: "Prefix Mechanics",
    aspect: "Temporal Sequence",
    tense: "Rule 5: Temporal Sequence & Chronology Prefixes",
    auxiliary: "Time Anchor Coordinate",
    formula: "ante- / pre- / fore- (Before / Prior) <-> post- (After / Subsequent) <-> re- (Again / Backward)",
    usage: "Temporal prefixes kisi ghatna ya action ki chronological placement batate hain. 'Pre-' (Latin) kisi action ya condition se pehle aane ko darshata hai (precedent, prerequisite, preliminary). 'Post-' (Latin) baad mein aane ko darshata hai (post-mortem, posthumous, postpone). 'Ante-' (Latin) poorva sthiti darshata hai (antedate, antecedent). 'Fore-' (Germanic) pehle se ya saamne darshata hai (foresee, forewarn). 'Re-' punah ya wapas darshata hai (re-examine, revoke).",
    patterns: {
      affirmative: "Pre-merger (before merger) -> Post-merger (after merger); Antedate (put earlier date) vs Postdate (put later date).",
      negative: "Spelling-Meaning Trap: 'Forego' (go before in time) vs 'Forgo' (relinquish / give up a claim voluntarily).",
      interrogative: "Chronology Test: Kya action execution se pehle ho raha hai (pre-), baad mein (post-), ya dubara (re-)?"
    },
    timeMarkers: ["pre-", "post-", "ante-", "fore-", "re-"],
    keyTip: "'Posthumous' (born or awarded after father's/recipient's death) aur 'Antecedent' (previous history/record of an accused) High Court examinations ke recurring vocabulary anchors hain."
  },
  {
    id: "RC-06",
    time: "Prefix Mechanics",
    aspect: "Spatial Scope",
    tense: "Rule 6: Spatial Direction & Boundary Scope Prefixes",
    auxiliary: "Jurisdictional Vector Map",
    formula: "intra- (Within single entity) vs inter- (Between distinct entities) | trans- (Across boundary) | circum- (Around perimeter) | extra- (Outside territorial limits)",
    usage: "Spatial prefixes geographical, organizational ya jurisdictional boundaries define karte hain. 'Intra-' ek hi boundary ke bheetar ko darshata hai (intradepartmental inquiry, intramural, intravenous). 'Inter-' do ya do se zyada alag alag entities ke parasparik sambandh ko darshata hai (interstate dispute, international law, inter-departmental). 'Trans-' ek chhor se doosre chhor tak paar karne ko darshata hai (transfer, transgress, translucent). 'Circum-' charon taraf ghoomne ko darshata hai (circumlocution, circumvent). 'Extra-' seema ke bahar darshata hai (extraterritorial, extrajudicial).",
    patterns: {
      affirmative: "Intradepartmental (within the same court registry) vs Interdepartmental (between judiciary and police department).",
      negative: "Jurisdictional Trap: 'Extrajudicial confession' (court ke bahar kiya gaya iqbal-e-jurm) requires independent corroboration.",
      interrogative: "Boundary Check: Kya operation boundary ke andar simit hai (intra-) ya boundary cross kar raha hai (inter-/trans-/extra-)?"
    },
    timeMarkers: ["inter-", "intra-", "trans-", "circum-", "extra-"],
    keyTip: "'Interstate' (between states, e.g. Punjab and Haryana water dispute) vs 'Intrastate' (within one single state). In dono ka difference sentence correction mein test hota hai."
  },
  {
    id: "RC-07",
    time: "Suffix Morphology",
    aspect: "Noun Morphology",
    tense: "Rule 7: Suffix Part-of-Speech Shifters: Nouns",
    auxiliary: "Nominalization Matrix",
    formula: "Verb / Adjective + [-tion, -sion, -ment, -ness, -ity, -ance, -ence, -ism, -ist, -er, -or, -ee] = Noun",
    usage: "Suffixes base word ki grammatical category (Part of Speech) ko fundamentally badal dete hain. Noun-forming suffixes kisi action, state, quality, doctrine ya person ka naam banate hain. Verb se action/state noun: adjudicate -> adjudication; appoint -> appointment; maintain -> maintenance. Adjective se quality noun: fair -> fairness; valid -> validity; scarce -> scarcity. Person/Agent noun: prosecute -> prosecutor; petition -> petitioner; employ -> employee (passive recipient). Doctrine/Belief: altruism (belief) vs altruist (person).",
    patterns: {
      affirmative: "The judge observed the fairness (noun from adj 'fair') of the appointment (noun from verb 'appoint').",
      negative: "Spelling Exceptions: maintain -> maintenance (NOT *maintainance); pronounce -> pronunciation (NOT *pronounciation).",
      interrogative: "Grammar Slot Check: Sentence mein subject, object ya preposition ke baad noun slot required hai ya nahi?"
    },
    timeMarkers: ["-tion/-sion", "-ment", "-ness", "-ity", "-ance/-ence", "-er/-or", "-ee"],
    keyTip: "'Maintenance' (spelling: m-a-i-n-t-e-n-a-n-c-e, 'ai' becomes 'e') aur 'Pronunciation' (p-r-o-n-u-n-c-i-a-t-i-o-n) nominalization ke do sabse deadly exam traps hain."
  },
  {
    id: "RC-08",
    time: "Suffix Morphology",
    aspect: "Adjective Morphology",
    tense: "Rule 8: Suffix Part-of-Speech Shifters: Adjectives",
    auxiliary: "Descriptive Inflection Engine",
    formula: "Noun / Verb + [-able, -ible, -al, -ful, -less, -ous, -ic, -ical, -ive, -ish] = Adjective",
    usage: "Adjective-forming suffixes kisi noun ya verb ko descriptive modifier mein convert karte hain. '-able / -ible' kshamata darshate hain (dependable, eligible, sensible). '-al / -ial' sambandh darshate hain (constitutional, official). '-ful' gun se bhara hona darshata hai (careful, respectful). '-less' abhav darshata hai (meritless, helpless). '-ous' swabhav darshata hai (courageous, malicious). '-ic / -ical' nuance spectrum create karte hain (historic vs historical; economic vs economical).",
    patterns: {
      affirmative: "A historic verdict (famous/monumental) vs a historical document (pertaining to past history).",
      negative: "Single L Rule: Suffix '-ful' mein hamesha SINGLE 'l' hota hai: careful, grateful, skillful. Never double 'l'!",
      interrogative: "Noun Modification Check: Kya word kisi noun ki quality, capability ya origin describe kar raha hai?"
    },
    timeMarkers: ["-able/-ible", "-al", "-ful", "-less", "-ous", "-ic/-ical", "-ive"],
    keyTip: "'-able' vs '-ible' Rule: Agar base word complete independent English word hai toh '-able' lagta hai (adapt-able, depend-able); agar base standalone word nahi hai ya soft c/s par end hota hai toh '-ible' lagta hai (edible, audible, legible, sensible, eligible)."
  },
  {
    id: "RC-09",
    time: "Suffix Morphology",
    aspect: "Verb Morphology",
    tense: "Rule 9: Suffix Part-of-Speech Shifters: Verbs",
    auxiliary: "Causative & Dynamic Inflection",
    formula: "Noun / Adjective + [-ize / -ise, -ify, -en, -ate] = Verb",
    usage: "Verb-forming suffixes kisi noun ya adjective ko action ya process mein convert karte hain. '-ize / -ise' causative verb banata hai (kisi sthiti mein badalna: legal -> legalize; standard -> standardize). '-ify' make/produce darshata hai (pure -> purify; simple -> simplify; just -> justify). '-en' gun ko badhana darshata hai (strength -> strengthen; sharp -> sharpen; wide -> widen). '-ate' formal causative action darshata hai (valid -> validate; origin -> originate).",
    patterns: {
      affirmative: "The bench ordered the registry to expedite (verb) and standardize (verb) all writ filings.",
      negative: "Invariable -ise Words: Kuch words mein 's' root ka part hota hai, unhe kabhi '-ize' nahi likha ja sakta: advise, revise, supervise, exercise, compromise.",
      interrogative: "Predicate Slot Check: Kya sentence mein subject ke baad finite action verb ki zaroorat hai?"
    },
    timeMarkers: ["-ize/-ise", "-ify", "-en", "-ate"],
    keyTip: "Examiner '*supervize' ya '*exercize' dekar spelling trap set karta hai. 'Supervise' aur 'Exercise' mein hamesha 's' hota hai, 'z' kabhi nahi!"
  },
  {
    id: "RC-10",
    time: "Suffix Morphology",
    aspect: "Adverb Morphology",
    tense: "Rule 10: Suffix Part-of-Speech Shifters: Adverbs",
    auxiliary: "Manner & Orientation Vectors",
    formula: "Adjective + -ly = Adverb of Manner | Noun + -ward / -wise = Directional / Contextual Adverb",
    usage: "Adverbs verbs, adjectives ya anya adverbs ko modify karte hain. Adjective ke aage '-ly' lagane se adverb of manner banta hai (meticulous -> meticulously; strict -> strictly). Noun ke aage '-ward' lagane se direction banta hai (homeward, backward). Noun ke aage '-wise' lagane se manner ya reference banta hai (clockwise, clockwise, otherwise).",
    patterns: {
      affirmative: "The registrar meticulously (adverb) scrutinized the newly (adverb) filed affidavit.",
      negative: "Adjective -ly Traps: 'Friendly', 'cowardly', 'lovely', 'lonely', 'brotherly' are ADJECTIVES, NOT adverbs! He behaved in a cowardly manner (NOT *He behaved cowardly).",
      interrogative: "Modifier Check: Kya word action ke tareeqe (how), direction (where), ya perspective (wise) ko answer kar raha hai?"
    },
    timeMarkers: ["-ly", "-ward/-wards", "-wise"],
    keyTip: "'Truly' (true + ly) aur 'Duly' (due + ly) mein silent 'e' drop hota hai! Inhe kabhi *truely ya *duely mat likhein. Yeh exam ka perennial trap hai."
  },
  {
    id: "RC-11",
    time: "Orthographic Spelling",
    aspect: "Silent e Rule",
    tense: "Rule 11: Final Silent 'e' Deletion vs Retention Law",
    auxiliary: "Orthographic Elision Boundary",
    formula: "Base ending in silent 'e' + VOWEL Suffix -> DROP 'e' | Base ending in silent 'e' + CONSONANT Suffix -> RETAIN 'e'",
    usage: "English orthography ka sabse fundamental spelling law: Jab base word ke aakhir mein silent 'e' ho, aur judne wala suffix VOWEL se shuru ho (-ing, -ed, -able, -ous, -al), toh silent 'e' ko DROP kar diya jata hai: write -> writing; hope -> hoping; value -> valuable. Lekin agar suffix CONSONANT se shuru ho (-ful, -ment, -less, -ly), toh silent 'e' ko RETAIN kiya jata hai: hope -> hopeful; state -> statement; love -> lovely.",
    patterns: {
      affirmative: "Drop: hope + ing = hoping; care + able = carable. Retain: hope + ful = hopeful; safe + ty = safety.",
      negative: "Crucial Exceptions: 1) argue + ment = argument ('e' dropped!); 2) true + ly = truly ('e' dropped!); 3) judge + ment = judgment ('e' dropped in formal legal drafting).",
      interrogative: "Soft c/g Exception: Base ending in 'ce' ya 'ge' retains 'e' before -able/-ous to preserve soft sound: courage -> courageous; notice -> noticeable; peace -> peaceable."
    },
    timeMarkers: ["-able", "-ous", "-ment", "-ful", "-ly", "soft c/g"],
    keyTip: "'Noticeable' (retains 'e'), 'Courageous' (retains 'e'), 'Argument' (drops 'e'), aur 'Truly' (drops 'e') — ye chaar words spelling section ke 80% silent-e questions cover karte hain!"
  },
  {
    id: "RC-12",
    time: "Orthographic Spelling",
    aspect: "Y-to-I Transformation",
    tense: "Rule 12: Final 'y' to 'i' Transformation Paradigm",
    auxiliary: "Consonant-Glide Mutation",
    formula: "Consonant + 'y' + Suffix -> 'y' changes to 'i' | Vowel + 'y' + Suffix -> 'y' REMAINS 'y' | Exception: Suffix starting with 'i' (-ing, -ish) -> 'y' REMAINS 'y'",
    usage: "Jab kisi base word ke ant mein 'y' ho: 1) Agar 'y' se pehle CONSONANT hai, toh koi bhi suffix (alawa -ing) judne par 'y' ban jata hai 'i': happy -> happiness, happily; rely -> reliable, reliance; beauty -> beautiful; carry -> carried. 2) Agar 'y' se pehle VOWEL (a, e, i, o, u) hai, toh 'y' bilkul change nahi hota: play -> playful, played; convey -> conveyance; enjoy -> enjoyable. 3) Double 'i' se bachne ke liye '-ing' ke samne 'y' hamesha retain rehta hai: carry -> carrying; study -> studying; satisfy -> satisfying.",
    patterns: {
      affirmative: "Consonant + y: rely + able = reliable; beauty + ful = beautiful; heavy + ly = heavily.",
      negative: "Vowel + y (No Change): stay + ed = stayed; employ + ment = employment; pay + ment = payment.",
      interrogative: "Suffix '-ing' Protection: dry + ing = drying (NOT *driing); cry + ing = crying (NOT *criing)."
    },
    timeMarkers: ["Consonant+y", "Vowel+y", "-ing", "-ness", "-ful", "-ly"],
    keyTip: "Exceptions to memorize: pay -> paid (NOT *payed, except in nautical rope context); say -> said; lay -> laid; dry -> dryness (retains y); shy -> shyness (retains y)."
  },
  {
    id: "RC-13",
    time: "Orthographic Spelling",
    aspect: "1-1-1 Consonant Doubling",
    tense: "Rule 13: Consonant Doubling 1-1-1 Law",
    auxiliary: "Syllabic Stress & Terminal Gemination",
    formula: "1 Syllable + 1 Single Vowel + 1 Single Final Consonant + VOWEL Suffix -> DOUBLE final consonant | Multi-syllable word: Final syllable MUST carry STRESS",
    usage: "Consonant doubling short vowel sound ko preserve karne ke liye hoti hai: 1) Monosyllabic words mein: 1 syllable, 1 vowel, 1 consonant ho (run, stop, sit), aur suffix vowel se shuru ho (-ing, -ed, -er), toh final consonant double ho jata hai: run -> running; stop -> stopped; plan -> planned. Agar 2 vowels hon (read, beat), toh doubling nahi hoti (reading, beating). 2) Polysyllabic words mein: Doubling tabhi hoti hai jab STRESS aakhri syllable par ho: oc-CUR -> occurring, occurrence; pre-FER -> preferred, referring. Agar stress pehle syllable par ho, toh doubling NAHI hoti: BEN-e-fit -> benefited, benefiting; HAP-pen -> happened; VIS-it -> visited.",
    patterns: {
      affirmative: "Occur (stress on 'cur') -> occurrence, occurred; Begin (stress on 'gin') -> beginner, beginning.",
      negative: "Benefit (stress on 'ben') -> benefited, benefiting (Single 't' in modern standard English!).",
      interrogative: "Pronunciation / Stress Test: Shabda ko bolkar dekhein. Stress aakhri syllable par hai ya shuru mein?"
    },
    timeMarkers: ["1-1-1 rule", "final stress", "-ing", "-ed", "-ence", "-er"],
    keyTip: "'Occurrence' (double 'c' aur double 'r'), 'Commitment' (double 'm' single 't' kyunki -ment consonant suffix hai!), aur 'Benefited' (single 't') exam-setters ke top questions hain."
  },
  {
    id: "RC-14",
    time: "Orthographic Spelling",
    aspect: "Hyphenation Protocol",
    tense: "Rule 14: Hyphenation Protocols with Affixes",
    auxiliary: "Morphemic Boundary Clarification",
    formula: "Prefix + Proper Noun -> HYPHEN | self-, ex-, all- -> HYPHEN | Vowel Clash (re-enter, co-op) -> HYPHEN | Semantic Disambiguation (re-sign vs resign) -> HYPHEN",
    usage: "Prefixes ke sath hyphen lagane ke 4 non-negotiable rules hain: 1) Proper Nouns: Jab prefix kisi Capitalized proper noun se pehle lage: anti-British, pro-India, post-Marxist, trans-Atlantic. 2) Fixed Prefixes: 'Self-', 'ex-' (meaning former), aur 'all-' ke aage hamesha hyphen lagta hai: self-esteem, self-defense, ex-president, all-powerful. 3) Vowel Repetition/Clash: Jab prefix ka aakhri vowel aur root ka pehla vowel same hon aur confusion create kar sakte hon: re-enter, re-examine, co-operate, semi-independent. 4) Semantic Ambiguity (Meaning Distinction): Jab hyphen na lagane se shabda ka matlab bilkul badal jaye: re-sign (sign again) vs resign (quit job); re-cover (cover again) vs recover (get back); re-creation (creating again) vs recreation (leisure/sports).",
    patterns: {
      affirmative: "The minister decided to re-sign the treaty (sign again) after he refused to resign from office (step down).",
      negative: "Over-hyphenation Error: Unnecessary hyphens in established words like *sub-section (subsection), *post-graduate (postgraduate), *inter-state (interstate).",
      interrogative: "Meaning Test: Kya hyphen hatane se dusra existing English word ban jata hai jo context mein fit nahi baithta?"
    },
    timeMarkers: ["Proper Nouns", "self-", "ex-", "all-", "re-", "co-"],
    keyTip: "Sentence correction mein: 'The advocate advised his client to re-cover the lost files' galat hai, yahan 'recover' aayega. Hyphen tabhi lagta hai jab physical naya cover dalna ho!"
  }
];

const targetPath = path.resolve(__dirname, '../src/content/lessons/L18/rule-cards.json');
fs.writeFileSync(targetPath, JSON.stringify(ruleCards, null, 2), 'utf-8');
console.log(`Successfully generated ${targetPath}`);
console.log(`Rule Cards count: ${ruleCards.length}`);
