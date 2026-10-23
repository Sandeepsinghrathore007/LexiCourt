// Generator for L18 questions/independent-practice.json
const fs = require('fs');
const path = require('path');

const questions = [
  // --- PATTERN 1: BASE-WORD DERIVATION IN CONTEXT (Q01 - Q15) ---
  {
    id: "L18-IP-001",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Noun Nominalization from Adjective",
    conceptTags: ["nominalization", "patience", "patient"],
    question: "The presiding judge exhibited exemplary _______ while listening to the lengthy arguments of the young advocate. [PATIENT]",
    options: [
      { id: "A", text: "patiently" },
      { id: "B", text: "patience" },
      { id: "C", text: "patientness" },
      { id: "D", text: "patienthood" }
    ],
    correctAnswer: "B",
    explanation: "Sentence structure mein 'exemplary' (adjective) ke baad ek abstract noun ki zaroorat hai jo direct object ka kaam kare. 'Patient' (adjective) se Latin suffix '-ence' ke sath 'patience' banta hai. 'Patientness' non-standard coinage hai.",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },
  {
    id: "L18-IP-002",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Verb Causative from Adjective",
    conceptTags: ["verb-causative", "simplify", "simple"],
    question: "The law commission recommended new procedural guidelines to _______ the filing of consumer disputes. [SIMPLE]",
    options: [
      { id: "A", text: "simplificate" },
      { id: "B", text: "simplize" },
      { id: "C", text: "simplify" },
      { id: "D", text: "simplen" }
    ],
    correctAnswer: "C",
    explanation: "Infinitive marker 'to' ke baad base verb chahiye. Adjective 'simple' se causative verb banane ke liye suffix '-ify' lagta hai: simplify (saral banana). 'Simplificate' non-standard archaic blunder hai.",
    ruleReference: "Rule RC-09: Suffix Part-of-Speech Shifters: Verbs"
  },
  {
    id: "L18-IP-003",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adjective Formation with -able",
    conceptTags: ["adjective-suffix", "dependable", "depend"],
    question: "The senior clerk was known throughout the high court as a highly _______ officer who never missed a filing deadline. [DEPEND]",
    options: [
      { id: "A", text: "dependent" },
      { id: "B", text: "dependable" },
      { id: "C", text: "dependably" },
      { id: "D", text: "dependence" }
    ],
    correctAnswer: "B",
    explanation: "'Officer' (noun) ko modify karne ke liye ek descriptive adjective chahiye jiska matlab 'bharosemand / reliable' ho. Standalone verb 'depend' ke aage '-able' lagakar 'dependable' banta hai. 'Dependent' ka matlab kisi par aashrit hona hota hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-004",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adverb of Manner from Adjective ending in -le",
    conceptTags: ["adverb-manner", "subtly", "subtle"],
    question: "The defense counsel _______ shifted the focus of cross-examination toward the discrepancy in the police timing report. [SUBTLE]",
    options: [
      { id: "A", text: "subtly" },
      { id: "B", text: "subtlely" },
      { id: "C", text: "subtely" },
      { id: "D", text: "subtility" }
    ],
    correctAnswer: "A",
    explanation: "Verb 'shifted' ko modify karne ke liye adverb of manner chahiye. Adjectives ending in 'le' (subtle, gentle, noble) ka 'le' badal kar '-ly' ho jata hai: subtle -> subtly. '*Subtlely' likhna common spelling error hai.",
    ruleReference: "Rule RC-10: Suffix Part-of-Speech Shifters: Adverbs"
  },
  {
    id: "L18-IP-005",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Nominalization with Vowel Shift",
    conceptTags: ["nominalization", "defamation", "defame"],
    question: "Publishing unverified accusations against a public judicial functionary constitutes civil _______. [DEFAME]",
    options: [
      { id: "A", text: "defamement" },
      { id: "B", text: "defamation" },
      { id: "C", text: "defamingness" },
      { id: "D", text: "defamity" }
    ],
    correctAnswer: "B",
    explanation: "Verb 'defame' (badnaam karna) se abstract noun banane ke liye suffix '-ation' judta hai: defame -> defamation (silent 'e' drops). 'Defamement' English mein exist nahi karta.",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },
  {
    id: "L18-IP-006",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Verb Derivation with -en",
    conceptTags: ["verb-derivation", "strengthen", "strength"],
    question: "The recruitment of specialized technical research associates will _______ the research capabilities of the appellate bench. [STRENGTH]",
    options: [
      { id: "A", text: "strengthify" },
      { id: "B", text: "strengthen" },
      { id: "C", text: "strongen" },
      { id: "D", text: "strengthize" }
    ],
    correctAnswer: "B",
    explanation: "Modal 'will' ke baad base verb chahiye. Noun 'strength' mein Germanic verbal suffix '-en' lagakar 'strengthen' (majboot banana) banta hai. 'Strengthify' aur 'strengthize' invalid coinages hain.",
    ruleReference: "Rule RC-09: Suffix Part-of-Speech Shifters: Verbs"
  },
  {
    id: "L18-IP-007",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adjective Formation with -ous",
    conceptTags: ["adjective-suffix", "monstrous", "monster"],
    question: "The intentional falsification of court case diaries was described by the bench as a _______ abuse of official position. [MONSTER]",
    options: [
      { id: "A", text: "monsterous" },
      { id: "B", text: "monstrous" },
      { id: "C", text: "monsterish" },
      { id: "D", text: "monstrosity" }
    ],
    correctAnswer: "B",
    explanation: "Noun 'monster' se adjective banane ke liye '-ous' suffix judte samay 'er' ka 'e' drop ho jata hai: monster -> monstrous (NOT *monsterous). 'Monstrosity' noun hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-008",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Nominalization with Consonant Change: Pronounce",
    conceptTags: ["nominalization", "pronunciation", "pronounce"],
    question: "A slight slip in the oral _______ of the witness's name did not invalidate the recorded testimony. [PRONOUNCE]",
    options: [
      { id: "A", text: "pronouncement" },
      { id: "B", text: "pronounciation" },
      { id: "C", text: "pronunciation" },
      { id: "D", text: "pronouncing" }
    ],
    correctAnswer: "C",
    explanation: "'Oral articulation / bolne ka dhang' ke sense mein noun 'pronunciation' hota hai, jisme root ka 'oun' badal kar 'un' ho jata hai: p-r-o-n-u-n-c-i-a-t-i-o-n. 'Pronouncement' ka matlab formal declaration (jaise judgment pronouncement) hota hai.",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },
  {
    id: "L18-IP-009",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adjective with -ive from Verb",
    conceptTags: ["adjective-suffix", "persuasive", "persuade"],
    question: "Although the evidence was entirely circumstantial, counsel's oral submissions were remarkably _______. [PERSUADE]",
    options: [
      { id: "A", text: "persuasive" },
      { id: "B", text: "persuadingly" },
      { id: "C", text: "persuadable" },
      { id: "D", text: "persuasion" }
    ],
    correctAnswer: "A",
    explanation: "Linking verb 'were' aur adverb 'remarkably' ke baad predicate adjective chahiye. Verb 'persuade' (manana) se terminal 'de' drop hokar '-sive' judta hai: persuasive (prabhavshali / convincing).",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-010",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Noun Nominalization with -ity: Curious",
    conceptTags: ["vowel-drop", "curiosity", "curious"],
    question: "Out of sheer _______, the law apprentice attended the proceedings of the full constitutional bench. [CURIOUS]",
    options: [
      { id: "A", text: "curiousity" },
      { id: "B", text: "curiosity" },
      { id: "C", text: "curiousness" },
      { id: "D", text: "curiousment" }
    ],
    correctAnswer: "B",
    explanation: "Adjective 'curious' se jab abstract noun banta hai, toh letter 'u' drop ho jata hai: c-u-r-i-o-s-i-t-y (curiosity). Option A (*curiousity) examiner ka favorite spelling trap hai.",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },
  {
    id: "L18-IP-011",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Verbal Noun with Consonant Doubling: Ocurrence",
    conceptTags: ["consonant-doubling", "occurrence", "occur"],
    question: "The station house officer certified that no untoward _______ had taken place near the polling center. [OCCUR]",
    options: [
      { id: "A", text: "occurence" },
      { id: "B", text: "occurance" },
      { id: "C", text: "occurrence" },
      { id: "D", text: "ocurrence" }
    ],
    correctAnswer: "C",
    explanation: "Rule RC-13 ke anusaar, 'occur' mein stress final syllable par hone ke karan 'r' double hota hai, aur suffix '-ence' judta hai: o-c-c-u-r-r-e-n-c-e (double 'c' and double 'r').",
    ruleReference: "Rule RC-13: Consonant Doubling 1-1-1 Law"
  },
  {
    id: "L18-IP-012",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adverb Derivation with Silent 'e' Drop: Duly",
    conceptTags: ["adverb-derivation", "duly", "due"],
    question: "The certified copy of the decree was _______ dispatched to the executing court yesterday. [DUE]",
    options: [
      { id: "A", text: "duely" },
      { id: "B", text: "duly" },
      { id: "C", text: "duefully" },
      { id: "D", text: "dueli" }
    ],
    correctAnswer: "B",
    explanation: "Adjective 'due' se adverb of manner banate samay silent 'e' drop hota hai: due + ly = duly (properly / in due time). '*Duely' is incorrect.",
    ruleReference: "Rule RC-10: Suffix Part-of-Speech Shifters: Adverbs"
  },
  {
    id: "L18-IP-013",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Nominalization with Silent 'e' Retention: State",
    conceptTags: ["nominalization", "statement", "state"],
    question: "The witness signed his written _______ under the supervision of the judicial magistrate. [STATE]",
    options: [
      { id: "A", text: "statment" },
      { id: "B", text: "statement" },
      { id: "C", text: "station" },
      { id: "D", text: "statance" }
    ],
    correctAnswer: "B",
    explanation: "Consonant suffix '-ment' se pehle base word 'state' ka silent 'e' retain rehta hai: state + ment = statement. 'Statment' mein 'e' drop karna spelling error hai.",
    ruleReference: "Rule RC-11: Final Silent 'e' Deletion vs Retention Law"
  },
  {
    id: "L18-IP-014",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Adjective Formation with -ible from Latin Root",
    conceptTags: ["adjective-suffix", "eligible", "eligibility"],
    question: "Only candidates who have completed seven years of active practice are _______ for direct appointment as District Judge. [ELIGIBILITY]",
    options: [
      { id: "A", text: "elegible" },
      { id: "B", text: "eligable" },
      { id: "C", text: "eligible" },
      { id: "D", text: "eligive" }
    ],
    correctAnswer: "C",
    explanation: "Noun 'eligibility' se adjective 'eligible' banta hai (Latin eligere = to choose). Iska suffix '-ible' hota hai, '-able' nahi. Do not confuse with 'illegible' (hard to read).",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-015",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Nominalization: Settle to Settlement",
    conceptTags: ["nominalization", "settlement", "settle"],
    question: "The mediation cell succeeded in facilitating an amicable _______ between the estranged business partners. [SETTLE]",
    options: [
      { id: "A", text: "settlation" },
      { id: "B", text: "settlement" },
      { id: "C", text: "settlingness" },
      { id: "D", text: "settlence" }
    ],
    correctAnswer: "B",
    explanation: "Verb 'settle' se result noun banane ke liye '-ment' suffix judta hai: settle + ment = settlement (retaining silent 'e').",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },

  // --- PATTERN 2: NEGATIVE & REVERSAL PREFIX SELECTION (Q16 - Q28) ---
  {
    id: "L18-IP-016",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "easy",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix for Latin Bilabial Root: Mortal",
    conceptTags: ["negative-prefix", "immortal", "assimilation"],
    question: "Select the correct negative prefix for the adjective 'mortal' (meaning subject to death):",
    options: [
      { id: "A", text: "un-" },
      { id: "B", text: "in-" },
      { id: "C", text: "im-" },
      { id: "D", text: "dis-" }
    ],
    correctAnswer: "C",
    explanation: "Bilabial consonant 'm' se shuru hone wale Latin words ke aage 'in-' assimilate hokar 'im-' ban jata hai: im- + mortal = immortal (amar / living forever).",
    ruleReference: "Rule RC-03: Phonetic Assimilation of Prefixes"
  },
  {
    id: "L18-IP-017",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Objective Neutral Prefix: Non-Bailable",
    conceptTags: ["negative-prefix", "non-bailable", "neutral-classification"],
    question: "In criminal procedural law, offenses where bail cannot be claimed as a matter of right are termed _______ offenses.",
    options: [
      { id: "A", text: "unbailable" },
      { id: "B", text: "inbailable" },
      { id: "C", text: "non-bailable" },
      { id: "D", text: "disbailable" }
    ],
    correctAnswer: "C",
    explanation: "Legal categories jo objective classification darshati hain unme prefix 'non-' lagaya jata hai: non-bailable offense (CrPC classification). 'Unbailable' is non-standard.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-018",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Reversal of Action: Qualify to Disqualify",
    conceptTags: ["negative-prefix", "disqualify", "action-reversal"],
    question: "The election tribunal found the candidate guilty of corrupt practices and proceeded to _______ him from contesting. [QUALIFY]",
    options: [
      { id: "A", text: "unqualify" },
      { id: "B", text: "disqualify" },
      { id: "C", text: "inqualify" },
      { id: "D", text: "misqualify" }
    ],
    correctAnswer: "B",
    explanation: "Kriya (action) ko reverse karne ya adhikaron se vanchit karne ke liye prefix 'dis-' ka use hota hai: disqualify (ayogya thehrana). 'Unqualified' adjective hai jo lack of qualification darshata hai, lekin verb hamesha 'disqualify' hota hai.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-019",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix for Latin Rhotic Root: Rational",
    conceptTags: ["assimilation", "irrational", "rhotic"],
    question: "Choose the correct negative derivative of the adjective 'rational':",
    options: [
      { id: "A", text: "unrational" },
      { id: "B", text: "inrational" },
      { id: "C", text: "irrational" },
      { id: "D", text: "disrational" }
    ],
    correctAnswer: "C",
    explanation: "Latin root 'rational' consonant 'r' se shuru hota hai, isliye prefix 'in-' assimilate hokar 'ir-' ban jata hai: in- + rational = irrational (double 'r').",
    ruleReference: "Rule RC-03: Phonetic Assimilation of Prefixes"
  },
  {
    id: "L18-IP-020",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Privative Greek Prefix: Symmetrical",
    conceptTags: ["greek-prefix", "asymmetrical", "privative"],
    question: "The architecture of the old courtroom wing was completely _______, having unequal wings on either side of the entrance corridor.",
    options: [
      { id: "A", text: "unsymmetrical" },
      { id: "B", text: "insymmetrical" },
      { id: "C", text: "asymmetrical" },
      { id: "D", text: "dissymmetrical" }
    ],
    correctAnswer: "C",
    explanation: "Greek root 'symmetry' ke sath Greek privative prefix 'a-' lagta hai: asymmetrical (bina symmetry ke / asamaan).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-021",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Pejorative Prefix: Miscalculate",
    conceptTags: ["pejorative-prefix", "miscalculate", "wrongly"],
    question: "The revenue surveyor made an erroneous assessment because he happened to _______ the total acreage of the parcel.",
    options: [
      { id: "A", text: "uncalculate" },
      { id: "B", text: "incalculate" },
      { id: "C", text: "miscalculate" },
      { id: "D", text: "discalculate" }
    ],
    correctAnswer: "C",
    explanation: "Jab kisi action ko 'wrongly / incorrectly' kiya jaye, toh pejorative prefix 'mis-' lagta hai: miscalculate (galat ganna karna).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-022",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix for Latin Root: Auditory/Audible",
    conceptTags: ["negative-prefix", "inaudible", "audible"],
    question: "Due to a microphone failure, the witness's responses were virtually _______ to the stenographer sitting five meters away.",
    options: [
      { id: "A", text: "unaudible" },
      { id: "B", text: "inaudible" },
      { id: "C", text: "disaudible" },
      { id: "D", text: "nonaudible" }
    ],
    correctAnswer: "B",
    explanation: "Latin root 'audire' (to hear) se bane adjective 'audible' ke sath Latin negative prefix 'in-' lagta hai: inaudible (jo sunai na de).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-023",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Semantic Difference: Disrepair vs Unrepairable",
    conceptTags: ["negative-prefix", "disrepair", "noun-condition"],
    question: "The historical courthouse annex had fallen into a severe state of _______ due to chronic neglect by municipal engineers.",
    options: [
      { id: "A", text: "unrepair" },
      { id: "B", text: "disrepair" },
      { id: "C", text: "misrepair" },
      { id: "D", text: "inrepair" }
    ],
    correctAnswer: "B",
    explanation: "Idiomatic noun 'state of disrepair' ka matlab khasta-haal avastha / deteriorated condition hota hai. Prefix 'dis-' yahan state of degradation darshata hai.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-024",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix for Latin Vowel Root: Articulate",
    conceptTags: ["negative-prefix", "inarticulate", "articulate"],
    question: "Overwhelmed by emotion, the traumatized victim became completely _______ and could barely utter a coherent word.",
    options: [
      { id: "A", text: "unarticulate" },
      { id: "B", text: "inarticulate" },
      { id: "C", text: "disarticulate" },
      { id: "D", text: "non-articulate" }
    ],
    correctAnswer: "B",
    explanation: "Latin adjective 'articulate' ke sath Latin negative prefix 'in-' judta hai: inarticulate (jo spashth na bol sake). 'Disarticulate' surgical term hai (joints alag karna).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-025",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Pejorative Prefix: Maladministration",
    conceptTags: ["pejorative-prefix", "maladministration", "mal-"],
    question: "The ombudsman submitted a report pointing to grave _______ in the distribution of subsidized agricultural seeds.",
    options: [
      { id: "A", text: "misadministration" },
      { id: "B", text: "maladministration" },
      { id: "C", text: "disadministration" },
      { id: "D", text: "unadministration" }
    ],
    correctAnswer: "B",
    explanation: "Corrupt, incompetent ya defective public administration ke liye standard administrative term 'maladministration' (mal- = bad/corrupt) hota hai.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-026",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix for Latin Root: Legible",
    conceptTags: ["assimilation", "illegible", "legible"],
    question: "Because the attending doctor's handwriting was completely _______, the pharmacist dispensed the wrong medication.",
    options: [
      { id: "A", text: "unlegible" },
      { id: "B", text: "inlegible" },
      { id: "C", text: "illegible" },
      { id: "D", text: "dislegible" }
    ],
    correctAnswer: "C",
    explanation: "Base word 'legible' (readable) consonant 'l' se shuru hota hai. Latin prefix 'in-' assimilate hokar 'il-' ban jata hai: illegible (jo padha na ja sake).",
    ruleReference: "Rule RC-03: Phonetic Assimilation of Prefixes"
  },
  {
    id: "L18-IP-027",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Prefix for Reversal of State: Decentralize",
    conceptTags: ["reversal-prefix", "decentralize", "de-"],
    question: "To prevent power from being concentrated in the capital, the parliament enacted legislation to _______ fiscal authority to panchayats.",
    options: [
      { id: "A", text: "uncentralize" },
      { id: "B", text: "discentralize" },
      { id: "C", text: "decentralize" },
      { id: "D", text: "miscentralize" }
    ],
    correctAnswer: "C",
    explanation: "Process ko reverse karne aur remove karne ke liye Latin prefix 'de-' lagaya jata hai: decentralize (vikendrikaran karna).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-028",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Privative Greek Prefix: Anonymous",
    conceptTags: ["greek-prefix", "anonymous", "an-"],
    question: "The registry refused to take cognizance of an _______ letter alleging misconduct without any supporting affidavit.",
    options: [
      { id: "A", text: "unonymous" },
      { id: "B", text: "anonymous" },
      { id: "C", text: "inonymous" },
      { id: "D", text: "disonymous" }
    ],
    correctAnswer: "B",
    explanation: "Greek root 'onoma' (name) se pehle vowel-privative prefix 'an-' lagta hai: an- + onym + ous = anonymous (gumnam / bina naam ka).",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },

  // --- PATTERN 3: ERROR IDENTIFICATION & INCORRECT DERIVATION (Q29 - Q40) ---
  {
    id: "L18-IP-029",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Spelling Error Detection: Argument",
    conceptTags: ["error-detection", "argument", "silent-e"],
    question: "Identify the part of the sentence that contains a spelling error:\nThe learned senior advocate (A) / concluded his oral *arguement* (B) / before the division bench (C) / without seeking an adjournment. (D)",
    options: [
      { id: "A", text: "Part (A)" },
      { id: "B", text: "Part (B)" },
      { id: "C", text: "Part (C)" },
      { id: "D", text: "Part (D)" }
    ],
    correctAnswer: "B",
    explanation: "Part (B) mein '*arguement' galat hai. Rule RC-11 ke anusaar, 'argue' + '-ment' = 'argument' hota hai (silent 'e' drop hota hai).",
    ruleReference: "Rule RC-11: Final Silent 'e' Deletion vs Retention Law"
  },
  {
    id: "L18-IP-030",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Spelling Error Detection: Truly",
    conceptTags: ["error-detection", "truly", "spelling-error"],
    question: "Identify the part of the sentence containing a spelling error:\nThe affidavit affirmed (A) / that the statements made (B) / were *truely* verified (C) / on personal knowledge. (D)",
    options: [
      { id: "A", text: "Part (A)" },
      { id: "B", text: "Part (B)" },
      { id: "C", text: "Part (C)" },
      { id: "D", text: "Part (D)" }
    ],
    correctAnswer: "C",
    explanation: "Part (C) mein '*truely' spelling error hai. Adverb of manner 'truly' (true + ly) mein silent 'e' drop hota hai: t-r-u-l-y.",
    ruleReference: "Rule RC-10: Suffix Part-of-Speech Shifters: Adverbs"
  },
  {
    id: "L18-IP-031",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Prefix Invariance Error: Unnecessary",
    conceptTags: ["error-detection", "unnecessary", "prefix-invariance"],
    question: "Identify the misspelled word in the given sentence:\nThe district magistrate remarked that spending public funds on *unecessary* courtroom decorations was improper.",
    options: [
      { id: "A", text: "remarked" },
      { id: "B", text: "unecessary" },
      { id: "C", text: "decorations" },
      { id: "D", text: "improper" }
    ],
    correctAnswer: "B",
    explanation: "'*unecessary' galat hai; correct spelling 'unnecessary' hoti hai (double 'n'). Prefix 'un-' base word 'necessary' ke 'n' ke sath milkar double 'n' banata hai.",
    ruleReference: "Rule RC-01: Prefix Invariance Law"
  },
  {
    id: "L18-IP-032",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Suffix Suffix Collision: Indispensable",
    conceptTags: ["error-detection", "indispensable", "-able-vs--ible"],
    question: "Which of the highlighted words is misspelled in the administrative circular?\n\"Impartiality and prompt disposal are *indispensible* attributes of our judicial charter.\"",
    options: [
      { id: "A", text: "Impartiality" },
      { id: "B", text: "disposal" },
      { id: "C", text: "indispensible" },
      { id: "D", text: "attributes" }
    ],
    correctAnswer: "C",
    explanation: "'*indispensible' galat hai; correct spelling 'indispensable' hoti hai (ends in -able, NOT -ible).",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-033",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Invariable -ise Verb Error: Supervise",
    conceptTags: ["error-detection", "supervise", "invariable--ise"],
    question: "Select the option containing the spelling mistake:\nThe principal registrar instructed officers to *supervize* the digital registry and maintain security.",
    options: [
      { id: "A", text: "instructed" },
      { id: "B", text: "supervize" },
      { id: "C", text: "digital" },
      { id: "D", text: "maintain" }
    ],
    correctAnswer: "B",
    explanation: "'*supervize' galat hai; correct spelling 'supervise' hoti hai (Latin videre -> visus root always uses 's').",
    ruleReference: "Rule RC-09: Suffix Part-of-Speech Shifters: Verbs"
  },
  {
    id: "L18-IP-034",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Soft 'c' Retention Error: Noticeable",
    conceptTags: ["error-detection", "noticeable", "soft-c"],
    question: "Identify the incorrectly spelled word:\nThe audit report highlighted several *noticable* discrepancies in the deposit register.",
    options: [
      { id: "A", text: "audit" },
      { id: "B", text: "noticable" },
      { id: "C", text: "discrepancies" },
      { id: "D", text: "register" }
    ],
    correctAnswer: "B",
    explanation: "'*noticable' galat hai; correct spelling 'noticeable' hoti hai. Soft 'c' ka sound preserve karne ke liye silent 'e' retain rehta hai.",
    ruleReference: "Rule RC-11: Final Silent 'e' Deletion vs Retention Law"
  },
  {
    id: "L18-IP-035",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Single 'l' in -ful Suffix: Grateful",
    conceptTags: ["error-detection", "grateful", "-ful-suffix"],
    question: "Find the erroneous word in the sentence:\nThe destitute widow was *gratefull* to the legal aid clinic for obtaining maintenance arrears.",
    options: [
      { id: "A", text: "destitute" },
      { id: "B", text: "gratefull" },
      { id: "C", text: "obtaining" },
      { id: "D", text: "arrears" }
    ],
    correctAnswer: "B",
    explanation: "'*gratefull' galat hai; suffix '-ful' mein hamesha SINGLE 'l' hota hai: grateful. Double 'l' tabhi lagta hai jab '-ly' judta hai (gratefully).",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-036",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Degree Prefix Spelling: Supersede",
    conceptTags: ["error-detection", "supersede", "spelling-error"],
    question: "Identify the part of the sentence with a spelling error:\nThe new High Court rules (A) / will completely *supercede* (B) / all previous circulars (C) / issued in the year 2012. (D)",
    options: [
      { id: "A", text: "Part (A)" },
      { id: "B", text: "Part (B)" },
      { id: "C", text: "Part (C)" },
      { id: "D", text: "Part (D)" }
    ],
    correctAnswer: "B",
    explanation: "Part (B) mein '*supercede' galat hai. Correct spelling 'supersede' (s-u-p-e-r-s-e-d-e) hoti hai.",
    ruleReference: "Rule RC-04: Degree, Scale & Quantitative Prefixes"
  },
  {
    id: "L18-IP-037",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Double 's' in Misspell",
    conceptTags: ["error-detection", "misspell", "double-letters"],
    question: "Choose the sentence containing an orthographic error:",
    options: [
      { id: "A", text: "The typist was careful not to misspell statutory citations." },
      { id: "B", text: "The typist was careful not to *mispell* statutory citations." },
      { id: "C", text: "The typist was careful not to omit statutory citations." },
      { id: "D", text: "The typist was careful to verify statutory citations." }
    ],
    correctAnswer: "B",
    explanation: "Sentence B mein '*mispell' galat hai. Prefix 'mis-' + 'spell' = 'misspell' (double 's').",
    ruleReference: "Rule RC-01: Prefix Invariance Law"
  },
  {
    id: "L18-IP-038",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Consonant Doubling Error: Benefited",
    conceptTags: ["error-detection", "benefited", "stress-rule"],
    question: "Select the sentence with the spelling error according to modern standard English:",
    options: [
      { id: "A", text: "The staff benefited from the revised pension scheme." },
      { id: "B", text: "The staff *benefitted* from the revised pension scheme." },
      { id: "C", text: "The staff welcomed the revised pension scheme." },
      { id: "D", text: "The staff appreciated the revised pension scheme." }
    ],
    correctAnswer: "B",
    explanation: "Sentence B mein '*benefitted' double 't' ke sath modern standard English tests mein error mana jata hai kyunki stress first syllable par hota hai (BÉN-e-fit -> benefited).",
    ruleReference: "Rule RC-13: Consonant Doubling 1-1-1 Law"
  },
  {
    id: "L18-IP-039",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Double 's' in Dissatisfied",
    conceptTags: ["error-detection", "dissatisfied", "double-s"],
    question: "Identify the misspelled word in the given options:",
    options: [
      { id: "A", text: "Dissatisfied" },
      { id: "B", text: "Disobey" },
      { id: "C", text: "Disimilar" },
      { id: "D", text: "Discontinue" }
    ],
    correctAnswer: "C",
    explanation: "'*Disimilar' galat hai; correct spelling 'dissimilar' hoti hai (dis- + similar = double 's').",
    ruleReference: "Rule RC-01: Prefix Invariance Law"
  },
  {
    id: "L18-IP-040",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Double 'c' and Double 'r' in Occurrence",
    conceptTags: ["error-detection", "occurrence", "spelling-check"],
    question: "Which of the following spellings is CORRECT for the noun derived from 'occur'?",
    options: [
      { id: "A", text: "Occurence" },
      { id: "B", text: "Occurance" },
      { id: "C", text: "Occurrence" },
      { id: "D", text: "Ocurrence" }
    ],
    correctAnswer: "C",
    explanation: "Correct spelling 'Occurrence' hoti hai: double 'c' internally aur double 'r' before '-ence'.",
    ruleReference: "Rule RC-13: Consonant Doubling 1-1-1 Law"
  },

  // --- PATTERN 4: MEANING SHIFTS & CONFUSABLE DERIVATIVES (Q41 - Q50) ---
  {
    id: "L18-IP-041",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Disinterested vs Uninterested",
    conceptTags: ["confusable-derivatives", "disinterested", "impartial"],
    question: "A high court judge must be _______ in the outcome of any case brought before him for adjudication.",
    options: [
      { id: "A", text: "uninterested" },
      { id: "B", text: "disinterested" },
      { id: "C", text: "misinterested" },
      { id: "D", text: "non-interested" }
    ],
    correctAnswer: "B",
    explanation: "'Disinterested' ka matlab tatastha / impartial (having no personal financial or selfish stake) hota hai. Judge ko disinterested hona chahiye. 'Uninterested' ka matlab bored / careless hota hai.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-IP-042",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Continuous vs Continual",
    conceptTags: ["confusable-derivatives", "continual", "intervals"],
    question: "The trial was disrupted throughout the day by _______ telephone rings and door knocks.",
    options: [
      { id: "A", text: "continuous" },
      { id: "B", text: "continual" },
      { id: "C", text: "continuing" },
      { id: "D", text: "continuity" }
    ],
    correctAnswer: "B",
    explanation: "'Continual' ka matlab bar-bar hone wala lekin intervals (ruk-ruk kar) ke sath hota hai (recurring frequently with breaks). 'Continuous' ka matlab bina kisi rukawat ke lagatar hota hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-043",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Sensible vs Sensitive",
    conceptTags: ["confusable-derivatives", "sensible", "wise"],
    question: "In the interest of cutting litigation expenses, the counsel suggested a _______ compromise acceptable to both parties.",
    options: [
      { id: "A", text: "sensitive" },
      { id: "B", text: "sensational" },
      { id: "C", text: "sensible" },
      { id: "D", text: "senseless" }
    ],
    correctAnswer: "C",
    explanation: "'Sensible' ka matlab practical, wise aur samajhdari bhara hota hai (a sensible compromise). 'Sensitive' ka matlab delicate ya easily hurt hota hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-044",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Prescribe vs Proscribe",
    conceptTags: ["confusable-derivatives", "proscribe", "ban"],
    question: "The state penal statute explicitly _______ the unauthorized possession of firearms in public assemblies.",
    options: [
      { id: "A", text: "prescribes" },
      { id: "B", text: "proscribes" },
      { id: "C", text: "subscribes" },
      { id: "D", text: "transcribes" }
    ],
    correctAnswer: "B",
    explanation: "'Proscribe' (pro- + scribe) ka matlab authoritatively forbid / ban / outlaw (kanoonan ban lagana) hota hai. 'Prescribe' (pre- + scribe) ka matlab recommend / mandate karna hota hai.",
    ruleReference: "Rule RC-05: Temporal Sequence & Chronology Prefixes"
  },
  {
    id: "L18-IP-045",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Historic vs Historical",
    conceptTags: ["confusable-derivatives", "historic", "momentous"],
    question: "The adoption of the Indian Constitution on 26th November 1949 was a _______ event in modern jurisprudence.",
    options: [
      { id: "A", text: "historical" },
      { id: "B", text: "historic" },
      { id: "C", text: "historian" },
      { id: "D", text: "historicism" }
    ],
    correctAnswer: "B",
    explanation: "'Historic' ka matlab momentous, memorable, and epoch-making in history hota hai. Constitution ka adopt hona monumental event tha, isliye 'historic' correct hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-046",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Economic vs Economical",
    conceptTags: ["confusable-derivatives", "economic", "finance"],
    question: "The finance secretary briefed the cabinet on the current _______ growth projections for the fiscal year.",
    options: [
      { id: "A", text: "economical" },
      { id: "B", text: "economic" },
      { id: "C", text: "economist" },
      { id: "D", text: "economize" }
    ],
    correctAnswer: "B",
    explanation: "'Economic' relate karta hai desh ki arthvyavastha, trade aur finance se (economic growth). 'Economical' kifayati / frugal ko kehte hain.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-047",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Ingenious vs Ingenuous",
    conceptTags: ["confusable-derivatives", "ingenious", "clever"],
    question: "The forensic software engineer devised an _______ algorithm to detect forged digital signatures.",
    options: [
      { id: "A", text: "ingenuous" },
      { id: "B", text: "ingenious" },
      { id: "C", text: "indigenous" },
      { id: "D", text: "ingenuity" }
    ],
    correctAnswer: "B",
    explanation: "'Ingenious' ka matlab clever, brilliant, inventive (chatur / nipun) hota hai. 'Ingenuous' ka matlab innocent, naive, candid (bholabhala / sidha) hota hai. 'Indigenous' native / sthaniya ko kehte hain.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-048",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Hyphen Disambiguation: Recover vs Re-cover",
    conceptTags: ["hyphen-disambiguation", "re-cover", "meaning-shift"],
    question: "The librarian asked the binder to _______ the worn-out law report with genuine leather binding.",
    options: [
      { id: "A", text: "recover" },
      { id: "B", text: "re-cover" },
      { id: "C", text: "recovering" },
      { id: "D", text: "re-covering" }
    ],
    correctAnswer: "B",
    explanation: "'Re-cover' (with hyphen) ka matlab 'put a new cover on' (naya cover lagana) hota hai. 'Recover' (without hyphen) ka matlab 'get back / regain / swasth hona' hota hai.",
    ruleReference: "Rule RC-14: Hyphenation Protocols with Affixes"
  },
  {
    id: "L18-IP-049",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Beneficent vs Beneficial",
    conceptTags: ["confusable-derivatives", "beneficial", "advantageous"],
    question: "Regular physical exercise and adequate sleep are highly _______ to the cognitive stamina of judicial officers.",
    options: [
      { id: "A", text: "beneficent" },
      { id: "B", text: "beneficial" },
      { id: "C", text: "beneficiary" },
      { id: "D", text: "benefit" }
    ],
    correctAnswer: "B",
    explanation: "'Beneficial' ka matlab advantageous / producing good results (faydemand) hota hai. 'Beneficent' ka matlab actively doing good / charitable person (dayalu vyakti) hota hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-IP-050",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "independent-practice",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Apathy vs Antipathy",
    conceptTags: ["confusable-derivatives", "apathy", "indifference"],
    question: "Administrative _______ toward judicial infrastructure upgrades was sharply criticized in the public interest litigation.",
    options: [
      { id: "A", text: "sympathy" },
      { id: "B", text: "empathy" },
      { id: "C", text: "apathy" },
      { id: "D", text: "antipathy" }
    ],
    correctAnswer: "C",
    explanation: "'Apathy' (a- + pathos) ka matlab total lack of interest, unconcern, or indifference (udasinata) hota hai. 'Antipathy' ka matlab strong active hostility / hatred hota hai.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  }
];

const collection = {
  lessonId: "L18",
  stage: "independent-practice",
  questions
};

const targetPath = path.resolve(__dirname, '../src/content/lessons/L18/questions/independent-practice.json');
fs.writeFileSync(targetPath, JSON.stringify(collection, null, 2), 'utf-8');
console.log(`Successfully generated ${targetPath}`);
console.log(`Independent Practice questions count: ${questions.length}`);
