import { useState, useMemo } from 'react'
import { Filter } from 'lucide-react'
import ruleCardsData from '../../content/lessons/L01/rule-cards.json'
import { Card, Badge, Button } from '../common'

export default function RuleCardsStep() {
  const [timeFilter, setTimeFilter] = useState('All')
  const [aspectFilter, setAspectFilter] = useState('All')
  const [activePatternTab, setActivePatternTab] = useState({}) // { [cardId]: 'affirmative' | 'negative' | 'interrogative' }

  const filteredCards = useMemo(() => {
    return ruleCardsData.filter((card) => {
      const matchTime = timeFilter === 'All' || card.time === timeFilter
      const matchAspect = aspectFilter === 'All' || card.aspect === aspectFilter
      return matchTime && matchAspect
    })
  }, [timeFilter, aspectFilter])

  const setTab = (cardId, tab) => {
    setActivePatternTab((prev) => ({
      ...prev,
      [cardId]: tab,
    }))
  }

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-surface-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">Step 4 • Formula References</Badge>
          <span className="text-xs text-surface-500">12 Precision Grammar Rule Cards</span>
        </div>
        <h2 className="text-2xl font-bold font-heading text-surface-900">
          The 12 Tense Formulas & Structural Concord
        </h2>
        <p className="text-xs text-surface-600 mt-1">
          Instant quick-lookup cards with affirmative, negative, and interrogative syntax patterns.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-50 border border-surface-200">
        <div className="flex items-center gap-2 text-xs font-bold text-surface-700">
          <Filter size={15} className="text-primary-600" />
          <span>Filter Cards:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            {['All', 'Present', 'Past', 'Future'].map((t) => (
              <Button
                key={t}
                variant={timeFilter === t ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter(t)}
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-surface-300 mx-1" />

          <div className="flex items-center gap-1">
            {['All', 'Simple', 'Continuous', 'Perfect', 'Perfect Continuous'].map((a) => (
              <Button
                key={a}
                variant={aspectFilter === a ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setAspectFilter(a)}
              >
                {a}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const activeTab = activePatternTab[card.id] || 'affirmative'

          return (
            <Card
              key={card.id}
              variant="default"
              padding="md"
              className="border-surface-200 hover:border-primary-300 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Card Top Banner */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[10px] font-bold text-primary-700 bg-primary-100 px-1.5 py-0.5 rounded">
                        {card.id}
                      </span>
                      <span className="text-[11px] text-surface-500 font-medium">
                        {card.time} • {card.aspect}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-surface-900">
                      {card.tense}
                    </h3>
                  </div>

                  <Badge variant="neutral" size="sm">
                    {card.auxiliary}
                  </Badge>
                </div>

                {/* Formula Box */}
                <div className="p-2.5 rounded-lg bg-surface-50 border border-surface-200">
                  <span className="text-[10px] uppercase font-bold text-surface-500 block mb-0.5">
                    Structural Formula:
                  </span>
                  <p className="font-mono text-xs font-bold text-primary-900">
                    {card.formula}
                  </p>
                </div>

                {/* Usage Description */}
                <p className="text-xs text-surface-600 leading-relaxed">
                  {card.usage}
                </p>

                {/* Interactive Syntax Tabs */}
                <div className="space-y-2 pt-1 border-t border-surface-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-surface-700">Sentence Patterns:</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setTab(card.id, 'affirmative')}
                        className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                          activeTab === 'affirmative'
                            ? 'bg-success-100 text-success-800'
                            : 'text-surface-500 hover:text-surface-800'
                        }`}
                      >
                        (+) Pos
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab(card.id, 'negative')}
                        className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                          activeTab === 'negative'
                            ? 'bg-error-100 text-error-800'
                            : 'text-surface-500 hover:text-surface-800'
                        }`}
                      >
                        (-) Neg
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab(card.id, 'interrogative')}
                        className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                          activeTab === 'interrogative'
                            ? 'bg-primary-100 text-primary-800'
                            : 'text-surface-500 hover:text-surface-800'
                        }`}
                      >
                        (?) Int
                      </button>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-surface-50 border border-surface-200 text-xs italic text-surface-800">
                    "{card.patterns[activeTab]}"
                  </div>
                </div>

                {/* Signal Markers Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {card.timeMarkers.slice(0, 5).map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-surface-600 bg-surface-100 px-1.5 py-0.5 rounded border border-surface-200"
                    >
                      {m}
                    </span>
                  ))}
                  {card.timeMarkers.length > 5 && (
                    <span className="text-[10px] text-surface-400 font-mono">
                      +{card.timeMarkers.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Key Exam Trap Footer */}
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-snug">
                <strong>Exam Note:</strong> {card.keyTip}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
