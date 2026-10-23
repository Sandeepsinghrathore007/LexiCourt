import { useState } from 'react'
import { GitBranch, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react'
import { Card, Badge, Button } from '../../common'

const DECISION_TREE = {
  id: 'root',
  question: 'Definition kiske baare mein pooch rahi hai?',
  options: [
    {
      label: 'A Person / Human Agent ("A person who...")',
      next: 'person_branch'
    },
    {
      label: 'A Place / Enclosure ("A place where...")',
      next: 'place_branch'
    },
    {
      label: 'A Written Work or Speech ("An account / speech / poem...")',
      next: 'text_branch'
    },
    {
      label: 'An Action or Judicial Process ("To formally declare / give up...")',
      next: 'action_branch'
    }
  ],
  person_branch: {
    question: 'Is vyakti ka primary domain kya hai?',
    options: [
      {
        label: 'Speech & Social Interaction (Bolna ya Shant rehna)',
        next: 'person_speech'
      },
      {
        label: 'Attitude to Humanity (Manav-jati ke prati drishtikon)',
        next: 'person_humanity'
      },
      {
        label: 'Theological Belief (Ishwar ke astitva par vishwas)',
        next: 'person_theology'
      },
      {
        label: 'Dispute Resolution (Vivad ka nivaaran)',
        next: 'person_dispute'
      }
    ]
  },
  person_speech: {
    question: 'Vyakti bolne mein kaisa hai?',
    options: [
      {
        label: 'Habitually quiet, says very little (Aadatan shant)',
        outcome: {
          word: 'Taciturn',
          definition: 'Habitually reserved, quiet, or saying little.',
          rationale: 'Taciturn kam bolne wale ko kehte hain. Loquacious iska opposite hai.'
        }
      },
      {
        label: 'Tends to talk a great deal (Bohot zyada baatuni)',
        outcome: {
          word: 'Loquacious',
          definition: 'Tending to talk a great deal; extremely talkative.',
          rationale: 'Loquacious baatuni ko kehte hain. Eloquent prabhavshali bolne wale ko kehte hain.'
        }
      },
      {
        label: 'Constantly talks about himself and his glory (Apni hi tareef)',
        outcome: {
          word: 'Egotist',
          definition: 'A person excessively conceited who constantly boasts about themselves.',
          rationale: 'Egotist mein "T" for Talk hai. Egoist selfish motives se act karta hai.'
        }
      }
    ]
  },
  person_humanity: {
    question: 'Manav-jati ke prati uska kaisa vyavhar hai?',
    options: [
      {
        label: 'Dislikes, distrusts, or avoids humankind (Nafrat karna)',
        outcome: {
          word: 'Misanthrope',
          definition: 'A person who dislikes or distrusts humankind.',
          rationale: 'Mis- (hate) + anthropos (human) = Misanthrope.'
        }
      },
      {
        label: 'Promotes welfare especially via generous donations (Kalyan karna)',
        outcome: {
          word: 'Philanthropist',
          definition: 'A person seeking to promote human welfare through charitable donations.',
          rationale: 'Phil- (love) + anthropos (human) = Philanthropist.'
        }
      },
      {
        label: 'Selfless concern for others without personal gain (Niswarth seva)',
        outcome: {
          word: 'Altruist',
          definition: 'A person showing selfless concern for others without seeking personal benefit.',
          rationale: 'Altruist bina kisi swarth ke doosron ki seva karta hai.'
        }
      }
    ]
  },
  person_theology: {
    question: 'Ishwar ke astitva par uska kya stand hai?',
    options: [
      {
        label: 'Rejects or does not believe in existence of God (Nastik)',
        outcome: {
          word: 'Atheist',
          definition: 'A person who does not believe in the existence of a god or gods.',
          rationale: 'Atheist belief ko deny karta hai (a-theist).'
        }
      },
      {
        label: 'Claims human intellect cannot know if God exists (A-gyeya)',
        outcome: {
          word: 'Agnostic',
          definition: 'A person holding that God is unknown or unknowable to human knowledge.',
          rationale: 'Agnostic knowledge limit claim karta hai (a-gnosis: knowledge unknowable).'
        }
      }
    ]
  },
  person_dispute: {
    question: 'Vivad nivaaran mein uska authority level kya hai?',
    options: [
      {
        label: 'Officially appointed with LEGALLY BINDING power (Faisla sunana)',
        outcome: {
          word: 'Arbitrator',
          definition: 'An independent person officially appointed to settle a dispute with a legally binding award.',
          rationale: 'Arbitrator binding award deta hai jo court order ki tarah enforceable hota hai.'
        }
      },
      {
        label: 'Facilitates mutual discussion without imposing a decision (Samjhauta)',
        outcome: {
          word: 'Mediator',
          definition: 'A neutral person who facilitates negotiation to help parties reach an amicable agreement.',
          rationale: 'Mediator koi faisla nahi thopta, sirf aapsi baatcheet karwata hai.'
        }
      }
    ]
  },
  place_branch: {
    question: 'Sthan par kya rakha ya paala jata hai?',
    options: [
      {
        label: 'Bees (Madhumakkhiyon ke chhate)',
        outcome: {
          word: 'Apiary',
          definition: 'A place where beehives are kept for honey and pollination.',
          rationale: 'Apis = bee -> Apiary. Avis = bird -> Aviary.'
        }
      },
      {
        label: 'Birds (Pakshiyon ka baada / pinjra)',
        outcome: {
          word: 'Aviary',
          definition: 'A large enclosure or building for keeping birds.',
          rationale: 'Avis = bird -> Aviary. Madhumakkhiyon ke liye Apiary.'
        }
      },
      {
        label: 'Weapons & Ammunition (Hathiyar aur sainik saaman)',
        outcome: {
          word: 'Arsenal',
          definition: 'A place where weapons and military equipment are manufactured or stored.',
          rationale: 'Arsenal shastragar hota hai; Mint mein sikke dhalte hain.'
        }
      },
      {
        label: 'Government legal tender coins (Sarkari sikke)',
        outcome: {
          word: 'Mint',
          definition: 'A facility where coins of a country are officially manufactured.',
          rationale: 'Taksal jahan sikke bante hain = Mint.'
        }
      }
    ]
  },
  text_branch: {
    question: 'Text ya speech ka medium aur context kya hai?',
    options: [
      {
        label: 'Words inscribed on a tombstone or monument (Samadhi lekh)',
        outcome: {
          word: 'Epitaph',
          definition: 'A phrase or statement inscribed on a tombstone in memory of the dead.',
          rationale: 'Epitaph patthar par khoda gaya lekh hota hai.'
        }
      },
      {
        label: 'A formal speech or text of high praise, especially post-death (Stuti bhashan)',
        outcome: {
          word: 'Eulogy',
          definition: 'A speech or text praising a person highly, typically after death.',
          rationale: 'Eulogy speech of praise hota hai (Eu = good, logos = speech).'
        }
      },
      {
        label: 'A poem expressing sorrow and mourning for the dead (Shok kavita)',
        outcome: {
          word: 'Elegy',
          definition: 'A poem of serious reflection, typically a lament for the dead.',
          rationale: 'Elegy shok-kavita hoti hai.'
        }
      },
      {
        label: 'Account of own life written by that person (Atmakatha)',
        outcome: {
          word: 'Autobiography',
          definition: 'An account of a person\'s life written by that person themselves.',
          rationale: 'Auto- = self. Doosra lekhak likhe toh Biography.'
        }
      }
    ]
  },
  action_branch: {
    question: 'Action kis category ka hai?',
    options: [
      {
        label: 'Formally declare not guilty in a court of law (Bari karna)',
        outcome: {
          word: 'Acquit',
          definition: 'Formally declare someone not guilty of a criminal charge in a court of law.',
          rationale: 'Court verdict of not guilty = Acquit. Moral freedom from guilt = Absolve.'
        }
      },
      {
        label: 'Formally renounce one\'s royal monarchical throne (Rajgaddi chhodna)',
        outcome: {
          word: 'Abdicate',
          definition: 'Formally give up one\'s monarchical throne or supreme royal position.',
          rationale: 'Throne ke liye Abdicate; general claims ke liye Renounce.'
        }
      },
      {
        label: 'Make a bad situation or pain less severe (Kam karna)',
        outcome: {
          word: 'Mitigate',
          definition: 'Make something bad, painful, or severe less intense or serious.',
          rationale: 'Tivrata kam karna = Mitigate. Sthiti ko aur badtar banana = Exacerbate.'
        }
      }
    ]
  }
}

export default function SubstitutionDecisionTree() {
  const [history, setHistory] = useState(['root'])
  const currentNodeKey = history[history.length - 1]
  const currentNode = DECISION_TREE[currentNodeKey]

  const handleSelectOption = (nextKey, outcome) => {
    if (outcome) {
      setHistory((prev) => [...prev, { outcome }])
    } else if (nextKey) {
      setHistory((prev) => [...prev, nextKey])
    }
  }

  const handleReset = () => {
    setHistory(['root'])
  }

  const currentStepOutcome = typeof currentNodeKey === 'object' ? currentNodeKey.outcome : null

  return (
    <Card variant="default" padding="lg" className="border-surface-200 dark:border-surface-700 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-200 dark:border-surface-700/80 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch size={18} className="text-primary-600 dark:text-primary-400" />
          <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
            One-Word Substitution Decision Tree: Step-by-Step Clue Isolation
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">Interactive Heuristic</Badge>
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
            Reset Tree
          </Button>
        </div>
      </div>

      <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
        Examiners ke traps se bachne ke liye step-by-step questions ka jawab dein aur dekhein ki limiting clues kaise exact technical word tak pahunchate hain:
      </p>

      {/* Breadcrumb Path */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs text-surface-500 font-mono">
        <span className="font-bold text-primary-600 dark:text-primary-400">Path:</span>
        {history.map((step, idx) => (
          <span key={idx} className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-[0.6875rem]">
              {typeof step === 'string' ? step.replace('_', ' ') : step.outcome.word}
            </span>
            {idx < history.length - 1 && <ChevronRight size={12} className="text-surface-400" />}
          </span>
        ))}
      </div>

      {/* Decision Node or Final Outcome */}
      {currentStepOutcome ? (
        <div className="p-5 rounded-2xl border border-success-300 dark:border-success-800 bg-success-50/30 dark:bg-success-950/20 space-y-4">
          <div className="flex items-center gap-2 text-success-700 dark:text-success-400">
            <CheckCircle2 size={24} />
            <h4 className="font-heading font-extrabold text-lg">
              Target Substitution Locked: <span className="underline">{currentStepOutcome.word}</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-success-200 dark:border-success-800 space-y-1">
              <span className="font-bold text-surface-400 uppercase text-[0.625rem]">Standard Definition:</span>
              <p className="text-surface-900 dark:text-white font-medium leading-relaxed">
                {currentStepOutcome.definition}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-surface-850 border border-success-200 dark:border-success-800 space-y-1">
              <span className="font-bold text-primary-600 dark:text-primary-400 uppercase text-[0.625rem]">Why this term:</span>
              <p className="text-surface-700 dark:text-surface-300 leading-relaxed font-medium">
                {currentStepOutcome.rationale}
              </p>
            </div>
          </div>

          <Button variant="primary" size="sm" icon={RotateCcw} onClick={handleReset}>
            Try Another Clue Branch
          </Button>
        </div>
      ) : (
        <div className="p-5 rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-850 space-y-4">
          <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
            {currentNode?.question}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentNode?.options?.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt.next, opt.outcome)}
                className="p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 hover:border-primary-500 hover:bg-primary-50/30 dark:hover:bg-primary-950/40 text-left transition-all cursor-pointer flex items-center justify-between gap-2 group shadow-2xs"
              >
                <span className="text-xs font-semibold text-surface-800 dark:text-surface-100 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                  {opt.label}
                </span>
                <ChevronRight size={15} className="text-surface-400 group-hover:text-primary-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
