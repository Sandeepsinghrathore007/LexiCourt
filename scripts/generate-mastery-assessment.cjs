// Generator for L18 questions/mastery-assessment.json
const fs = require('fs');
const path = require('path');

const questions = [
  {
    id: "L18-MA-001",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Prefix Invariance & Double Consonant",
    conceptTags: ["prefix-invariance", "misspell", "spelling"],
    question: "Select the sentence that is free from any spelling error:",
    options: [
      { id: "A", text: "The candidate was cautioned not to *mispell* technical terms in the judgment paper." },
      { id: "B", text: "The candidate was cautioned not to misspell technical terms in the judgment paper." },
      { id: "C", text: "The candidate was cautioned not to mispel technical terms in the judgment paper." },
      { id: "D", text: "The candidate was cautioned not to miss-spell technical terms in the judgment paper." }
    ],
    correctAnswer: "B",
    explanation: "Rule RC-01 (Prefix Invariance Law) ke anusaar, prefix 'mis-' + base word 'spell' = 'misspell' (double 's'). Na prefix ka 's' drop hota hai aur na base word ka 's'.",
    ruleReference: "Rule RC-01: Prefix Invariance Law"
  },
  {
    id: "L18-MA-002",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Negative Prefix Polarity: Invaluable",
    conceptTags: ["negative-prefix", "invaluable", "priceless"],
    question: "Choose the word whose meaning is CLOSEST to 'invaluable':",
    options: [
      { id: "A", text: "Worthless" },
      { id: "B", text: "Priceless" },
      { id: "C", text: "Valueless" },
      { id: "D", text: "Insignificant" }
    ],
    correctAnswer: "B",
    explanation: "'Invaluable' ka matlab extremely valuable / beyond price (priceless) hota hai. Prefix 'in-' yahan incalculable value darshata hai. 'Worthless' aur 'Valueless' iske direct opposites hain.",
    ruleReference: "Rule RC-02: Negative Prefix Selection Paradigm"
  },
  {
    id: "L18-MA-003",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Phonetic Assimilation of In- before Rhotic Consonant",
    conceptTags: ["assimilation", "irrevocable", "rhotic"],
    question: "What is the correct negative form of the legal adjective 'revocable'?",
    options: [
      { id: "A", text: "unrevocable" },
      { id: "B", text: "inrevocable" },
      { id: "C", text: "irrevocable" },
      { id: "D", text: "disrevocable" }
    ],
    correctAnswer: "C",
    explanation: "Latin prefix 'in-' jab rhotic consonant 'r' se shuru hone wale Latin words se judta hai toh assimilate hokar 'ir-' ban jata hai: in- + revocable = irrevocable (double 'r').",
    ruleReference: "Rule RC-03: Phonetic Assimilation of Prefixes"
  },
  {
    id: "L18-MA-004",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Degree Prefix Spelling: Supersede",
    conceptTags: ["degree-prefix", "supersede", "spelling-trap"],
    question: "Select the option with the CORRECT spelling:",
    options: [
      { id: "A", text: "Supercede" },
      { id: "B", text: "Supersede" },
      { id: "C", text: "Superced" },
      { id: "D", text: "Superscede" }
    ],
    correctAnswer: "B",
    explanation: "Latin prefix 'super-' + 'sedere' (to sit) se 'supersede' banta hai. Iska ending '-sede' hota hai, na ki *-cede. Ye High Court exams ka perennial spelling test question hai.",
    ruleReference: "Rule RC-04: Degree, Scale & Quantitative Prefixes"
  },
  {
    id: "L18-MA-005",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Temporal Prefix: Posthumous",
    conceptTags: ["temporal-prefix", "posthumous", "post-"],
    question: "A child born after the death of its father, or a book published after the author's demise, is termed _______.",
    options: [
      { id: "A", text: "antediluvian" },
      { id: "B", text: "posthumous" },
      { id: "C", text: "postliminary" },
      { id: "D", text: "post-dated" }
    ],
    correctAnswer: "B",
    explanation: "Latin prefix 'post-' (after) + 'humus' (earth/burial) se 'posthumous' banta hai, jiska matlab maranoprant / after death hota hai.",
    ruleReference: "Rule RC-05: Temporal Sequence & Chronology Prefixes"
  },
  {
    id: "L18-MA-006",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Spatial Scope: Inter- vs Intra-",
    conceptTags: ["spatial-prefix", "interstate", "inter-vs-intra"],
    question: "A commercial dispute involving parties from both Punjab and Haryana is an _______ dispute.",
    options: [
      { id: "A", text: "intrastate" },
      { id: "B", text: "interstate" },
      { id: "C", text: "circumstate" },
      { id: "D", text: "instate" }
    ],
    correctAnswer: "B",
    explanation: "'Inter-' ka matlab 'between two or more different entities' hota hai: interstate (do rajyon ke beech). 'Intrastate' ka matlab 'within one single state' hota hai.",
    ruleReference: "Rule RC-06: Spatial Direction & Boundary Scope Prefixes"
  },
  {
    id: "L18-MA-007",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Nominalization Spelling: Maintenance",
    conceptTags: ["nominalization", "maintenance", "spelling"],
    question: "Select the sentence with the correct spelling of the derived noun:",
    options: [
      { id: "A", text: "The tribunal awarded monthly *maintainance* to the petitioner." },
      { id: "B", text: "The tribunal awarded monthly *maintenence* to the petitioner." },
      { id: "C", text: "The tribunal awarded monthly maintenance to the petitioner." },
      { id: "D", text: "The tribunal awarded monthly *maintainence* to the petitioner." }
    ],
    correctAnswer: "C",
    explanation: "Verb 'maintain' se noun banate samay 'ai' vowel shift hokar single 'e' ban jata hai aur ending '-ance' aati hai: m-a-i-n-t-e-n-a-n-c-e (maintenance).",
    ruleReference: "Rule RC-07: Suffix Part-of-Speech Shifters: Nouns"
  },
  {
    id: "L18-MA-008",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "-able vs -ible Discrimination: Indispensable",
    conceptTags: ["adjective-suffix", "indispensable", "-able-vs--ible"],
    question: "Fill in the blank with the accurately spelled derivative:\nIntegrity and legal knowledge are _______ requirements for appointment to the higher judiciary.",
    options: [
      { id: "A", text: "indispensible" },
      { id: "B", text: "indispensable" },
      { id: "C", text: "undispensible" },
      { id: "D", text: "indispenceable" }
    ],
    correctAnswer: "B",
    explanation: "'Indispensable' ke aakhir mein suffix '-able' lagta hai (never *-ible). 'Dispense' standalone verb hai jisse 'dispensation' banta hai, isliye '-able' aata hai.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-MA-009",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Invariable -ise Verb Selection",
    conceptTags: ["verb-suffix", "exercise", "invariable--ise"],
    question: "Choose the word with the correct spelling according to standard legal English:",
    options: [
      { id: "A", text: "Exercize" },
      { id: "B", text: "Exercise" },
      { id: "C", text: "Exersize" },
      { id: "D", text: "Exersise" }
    ],
    correctAnswer: "B",
    explanation: "Verb 'exercise' Latin 'exercitium' se aata hai jisme 's' root ka part hai. Yeh kabhi 'z' ke sath nahi likha jata: e-x-e-r-c-i-s-e.",
    ruleReference: "Rule RC-09: Suffix Part-of-Speech Shifters: Verbs"
  },
  {
    id: "L18-MA-010",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Adverb Derivation: Truly & Duly",
    conceptTags: ["adverb-derivation", "truly", "silent-e-drop"],
    question: "Which of the following derivatives correctly drops the silent 'e' upon taking the suffix '-ly'?",
    options: [
      { id: "A", text: "Safely" },
      { id: "B", text: "Politely" },
      { id: "C", text: "Truly" },
      { id: "D", text: "Extremely" }
    ],
    correctAnswer: "C",
    explanation: "'Safely', 'politely', aur 'extremely' mein silent 'e' retain rehta hai. Keval 'true' (+ ly = truly) aur 'due' (+ ly = duly) mein silent 'e' drop hota hai.",
    ruleReference: "Rule RC-10: Suffix Part-of-Speech Shifters: Adverbs"
  },
  {
    id: "L18-MA-011",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Silent 'e' Retention in Soft 'c': Noticeable",
    conceptTags: ["silent-e-retention", "noticeable", "soft-c"],
    question: "Why is the silent 'e' retained in the word 'noticeable'?",
    options: [
      { id: "A", text: "Because the base word has two syllables" },
      { id: "B", text: "To preserve the soft /s/ sound of the letter 'c'" },
      { id: "C", text: "Because '-able' begins with a consonant" },
      { id: "D", text: "To indicate past tense aspect" }
    ],
    correctAnswer: "B",
    explanation: "Rule RC-11 ke anusaar, agar 'e' drop kiya jaye toh 'c' vowel 'a' ke aage hard sound /k/ ban jayega (*notik-able). Isliye soft /s/ sound barkarar rakhne ke liye 'e' retain kiya jata hai.",
    ruleReference: "Rule RC-11: Final Silent 'e' Deletion vs Retention Law"
  },
  {
    id: "L18-MA-012",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Consonant Doubling: 1-1-1 Rule in Benefited",
    conceptTags: ["consonant-doubling", "benefited", "1-1-1-law"],
    question: "Why does the verb 'benefit' NOT double its final consonant in 'benefited'?",
    options: [
      { id: "A", text: "Because it ends in a vowel" },
      { id: "B", text: "Because the stress falls on the first syllable (BÉN-e-fit)" },
      { id: "C", text: "Because '-ed' is a consonant suffix" },
      { id: "D", text: "Because it is of Germanic origin" }
    ],
    correctAnswer: "B",
    explanation: "Rule RC-13 ke anusaar, multi-syllable word mein consonant tabhi double hota hai jab stress aakhri syllable par ho. 'Benefit' mein stress pehle syllable par hota hai (BÉN-e-fit), isliye terminal 't' double nahi hota.",
    ruleReference: "Rule RC-13: Consonant Doubling 1-1-1 Law"
  },
  {
    id: "L18-MA-013",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Hyphenation for Semantic Disambiguation: Re-sign vs Resign",
    conceptTags: ["hyphenation", "re-sign", "semantic-disambiguation"],
    question: "Which sentence correctly demonstrates the required hyphen to prevent semantic ambiguity?",
    options: [
      { id: "A", text: "The senior advocate decided to resign the lease deed for another five-year period." },
      { id: "B", text: "The senior advocate decided to re-sign the lease deed for another five-year period." },
      { id: "C", text: "The senior advocate decided to re-cover from illness." },
      { id: "D", text: "The senior advocate decided to re-create on Sunday." }
    ],
    correctAnswer: "B",
    explanation: "Rule RC-14 ke anusaar, 'to sign again' ke liye hyphen mandatory hota hai (re-sign) taaki 'resign' (pad chhodna / quit) se confusion na ho.",
    ruleReference: "Rule RC-14: Hyphenation Protocols with Affixes"
  },
  {
    id: "L18-MA-014",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "medium",
    topic: "Prefixes & Suffixes",
    subtopic: "Nuance Discrimination: Historic vs Historical",
    conceptTags: ["nuance-discrimination", "historic", "epoch-making"],
    question: "Fill in the blank with the precise derivative:\nThe Supreme Court's verdict decriminalizing section 377 was a _______ milestone in Indian civil rights history.",
    options: [
      { id: "A", text: "historical" },
      { id: "B", text: "historic" },
      { id: "C", text: "historian" },
      { id: "D", text: "historicity" }
    ],
    correctAnswer: "B",
    explanation: "'Historic' signifies famous, epoch-making, and monumentally memorable in history. A landmark judgment is historic. 'Historical' simply means relating to the past.",
    ruleReference: "Rule RC-08: Suffix Part-of-Speech Shifters: Adjectives"
  },
  {
    id: "L18-MA-015",
    lessonId: "L18",
    type: "single-answer-mcq",
    stage: "mastery-assessment",
    difficulty: "hard",
    topic: "Prefixes & Suffixes",
    subtopic: "Greek Classical Root Decoding: Anachronism",
    conceptTags: ["greek-root", "anachronism", "chron-"],
    question: "Using a manual quill pen in a modern electronic courtroom registry is an obvious _______.",
    options: [
      { id: "A", text: "antediluvian" },
      { id: "B", text: "anachronism" },
      { id: "C", text: "antidote" },
      { id: "D", text: "anarchy" }
    ],
    correctAnswer: "B",
    explanation: "Greek root 'chronos' (time) + prefix 'ana-' (against/back) se 'anachronism' banta hai, jiska matlab aisi cheez jo apne sahi samay/yug mein na ho (something placed out of its proper historical time).",
    ruleReference: "Rule RC-05: Temporal Sequence & Chronology Prefixes"
  }
];

const collection = {
  lessonId: "L18",
  stage: "mastery-assessment",
  questions
};

const targetPath = path.resolve(__dirname, '../src/content/lessons/L18/questions/mastery-assessment.json');
fs.writeFileSync(targetPath, JSON.stringify(collection, null, 2), 'utf-8');
console.log(`Successfully generated ${targetPath}`);
console.log(`Mastery Assessment questions count: ${questions.length}`);
