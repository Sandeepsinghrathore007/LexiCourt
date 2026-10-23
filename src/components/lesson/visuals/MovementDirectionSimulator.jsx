import { useState } from 'react'
import { Compass, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../../common'

const VECTOR_PAIRS = [
  {
    id: 'to-towards',
    title: 'To vs Towards (Destination vs Heading)',
    badgeText: 'Directional Target',
    vector1: {
      name: 'TO',
      label: 'Terminal Destination Reached',
      desc: 'Subject target point par pahunchta hai aur destination reach hoti hai.',
      example: 'She walked to the High Court. (Reached the courthouse)',
      status: 'Target Reached (100% Finality)'
    },
    vector2: {
      name: 'TOWARDS',
      label: 'Directional Heading Only',
      desc: 'Subject us disha mein head karta hai; destination pahunchna guaranteed nahi hai.',
      example: 'She walked towards the High Court, but took a detour. (Direction only)',
      status: 'Heading Direction (No arrival claim)'
    },
    takeaway: 'Agar sentence mein subject raste mein ruk gaya ya detour le liya, toh "TO" impossible hai; strictly "TOWARDS" lagta hai.'
  },
  {
    id: 'into-onto',
    title: 'Into vs Onto (Interior vs Surface Landing)',
    badgeText: 'Boundary Traversal',
    vector1: {
      name: 'INTO',
      label: '3D Interior Enclosure Entry',
      desc: 'Movement outside boundary cross karke 3D interior volume ke andar jaati hai.',
      example: 'The advocate stepped into the courtroom. / He jumped into the pool.',
      status: 'Volume Penetration (Outside ➔ Inside)'
    },
    vector2: {
      name: 'ONTO',
      label: '2D Open Surface Landing',
      desc: 'Movement kisi entity ko open elevated surface ke upar laakar land karti hai.',
      example: 'The witness stepped onto the witness box. / Placed the file onto the table.',
      status: 'Surface Landing (Lower ➔ Surface)'
    },
    takeaway: 'Room, well, box, pool ke andar jaane ke liye "INTO". Dais, table, roof, platform ke upar land hone ke liye "ONTO".'
  },
  {
    id: 'through-across',
    title: 'Through vs Across (Conduit vs Plane)',
    badgeText: 'Passage Traversal',
    vector1: {
      name: 'THROUGH',
      label: '3D Enclosed Conduit Traversal',
      desc: 'Movement chaaron taraf se ghire huye passage, tunnel, crowd, ya aperture ke andar se gujarti hai.',
      example: 'The train passed through the tunnel. / Walked through the security corridor.',
      status: 'Surrounded Conduit (Inside passage)'
    },
    vector2: {
      name: 'ACROSS',
      label: '2D Plane Crossing (One Side to Other)',
      desc: 'Movement flat road, river, ya surface ke ek border se doosre border tak traverse karti hai.',
      example: 'He swam across the river. / The clerk walked across the highway.',
      status: 'Surface Crossing (Side A ➔ Side B)'
    },
    takeaway: 'Tunnel, pipe, forest, corridor, crowd ke liye "THROUGH". Road, street, river, field ke liye "ACROSS".'
  },
  {
    id: 'along-past',
    title: 'Along vs Past (Parallel Line vs Passing Landmark)',
    badgeText: 'Linear Alignment',
    vector1: {
      name: 'ALONG',
      label: 'Parallel Linear Tracking',
      desc: 'Movement kisi road, riverbank, ya wall ke parallel ek hi line mein chalti hai.',
      example: 'The police patrolled along the boundary wall. / Walked along the river.',
      status: 'Parallel Motion (Following line)'
    },
    vector2: {
      name: 'PAST',
      label: 'Passing a Stationary Landmark',
      desc: 'Movement kisi fixed point ya landmark se aage nikal jaati hai (beyond point).',
      example: 'She drove past the High Court without stopping. / He ran past the guard.',
      status: 'Beyond Landmark (Point bypassed)'
    },
    takeaway: 'Kinare-kinare chalne ke liye "ALONG". Kisi landmark ke aage se nikal jaane ke liye "PAST".'
  },
]

export default function MovementDirectionSimulator() {
  const [activePairId, setActivePairId] = useState('to-towards')
  const activePair = VECTOR_PAIRS.find((p) => p.id === activePairId) || VECTOR_PAIRS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Movement & Direction Vector Simulator
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Directional vectors, boundary penetration, aur spatial trajectories ka interactive visual explorer
            </p>
          </div>
        </div>
        <Badge variant="success" size="sm">Vector Dynamics</Badge>
      </div>

      {/* Vector Pair Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
        {VECTOR_PAIRS.map((pair) => {
          const isActive = pair.id === activePairId
          return (
            <button
              key={pair.id}
              type="button"
              onClick={() => setActivePairId(pair.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-surface-900 text-primary-700 dark:text-primary-300 shadow-xs border border-surface-200 dark:border-surface-700'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {pair.title.split('(')[0]}
            </button>
          )
        })}
      </div>

      {/* Comparative Simulation Deck */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-surface-900 dark:text-white">
            {activePair.title}
          </span>
          <Badge variant="primary" size="sm">{activePair.badgeText}</Badge>
        </div>

        {/* Dual Vector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vector 1 */}
          <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-primary-600 text-white font-mono font-bold text-sm">
                {activePair.vector1.name}
              </span>
              <Badge variant="primary" size="sm">{activePair.vector1.status}</Badge>
            </div>
            <h5 className="font-heading font-bold text-xs text-surface-900 dark:text-white">
              {activePair.vector1.label}
            </h5>
            <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
              {activePair.vector1.desc}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-primary-200 dark:border-primary-800/80 text-xs font-mono text-primary-900 dark:text-primary-200">
              {activePair.vector1.example}
            </div>
          </div>

          {/* Vector 2 */}
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-amber-600 text-white font-mono font-bold text-sm">
                {activePair.vector2.name}
              </span>
              <Badge variant="secondary" size="sm">{activePair.vector2.status}</Badge>
            </div>
            <h5 className="font-heading font-bold text-xs text-surface-900 dark:text-white">
              {activePair.vector2.label}
            </h5>
            <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
              {activePair.vector2.desc}
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-amber-200 dark:border-amber-800/80 text-xs font-mono text-amber-900 dark:text-amber-200">
              {activePair.vector2.example}
            </div>
          </div>
        </div>

        {/* Takeaway */}
        <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs flex items-start gap-2">
          <CheckCircle2 size={16} className="text-success-600 dark:text-success-400 shrink-0 mt-0.5" />
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            <strong className="text-surface-900 dark:text-white">Exam Solving Key: </strong>
            {activePair.takeaway}
          </p>
        </div>
      </div>
    </Card>
  )
}
