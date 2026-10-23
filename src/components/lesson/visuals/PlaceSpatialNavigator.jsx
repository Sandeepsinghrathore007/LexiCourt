import { useState } from 'react'
import { MapPin, Box, Square, Dot, Sparkles } from 'lucide-react'
import { Card, Badge } from '../../common'

const SPATIAL_DIMENSIONS = [
  {
    id: 'in',
    name: 'IN — 3D Enclosed Volume / Boundary',
    dimension: '3D Space / Enclosure / Territory',
    icon: Box,
    badgeColor: 'primary',
    coreConcept: 'Entity kisi volume, boundary ya chaaron taraf se ghire huye space ke andar sthit hoti hai.',
    environments: [
      { category: 'Enclosed Rooms & Buildings', examples: 'in the courtroom, in the chamber, in the library, in the jail' },
      { category: 'Containers & Vehicles', examples: 'in a car, in a taxi, in a box, in a bag (personal vehicles)' },
      { category: 'Geographical Territories', examples: 'in Jaipur, in Rajasthan, in India, in Asia' },
      { category: 'Water Bodies & Liquids', examples: 'in the river, in the swimming pool, in the ocean' },
      { category: 'Print Media & Documents', examples: 'in the newspaper, in the gazette, in the official register' },
    ],
    examFormula: 'IN + Enclosed 3D Space / Large Geographical Territory',
    takeaway: 'Jab chaaron taraf boundary ya walls ho, ya large geographical territory ho, toh strictly "IN" use hota hai.'
  },
  {
    id: 'on',
    name: 'ON — 2D Physical Surface / Line / Public Platform',
    dimension: '2D Plane / Line / Contact Surface',
    icon: Square,
    badgeColor: 'secondary',
    coreConcept: 'Entity kisi flat horizontal ya vertical physical surface ke contact mein hoti hai, ya public transport par hoti hai.',
    environments: [
      { category: 'Physical Surfaces (Flat/Vertical)', examples: 'on the table, on the floor, on the wall, on the ceiling, on the roof' },
      { category: 'Streets / Roads (Without Number)', examples: 'on High Court Road, on M.I. Road, on 5th Avenue' },
      { category: 'Floors of a Building', examples: 'on the ground floor, on the first floor, on the top floor' },
      { category: 'Public Transit Conveyances', examples: 'on the bus, on the train, on the plane, on the ship (jahan chal sakte hain)' },
      { category: 'Screens & Broadcast Media', examples: 'on television, on the radio, on the website, on page 42' },
    ],
    examFormula: 'ON + 2D Surface / Named Street (no number) / Public Transit',
    takeaway: 'Surface contact aur streets bina building number ke "ON" leti hain. Bus/train par "ON" lagta hai (unlike personal car jisme "IN" lagta hai).'
  },
  {
    id: 'at',
    name: 'AT — 1D Specific Point / Address with Number / Event',
    dimension: '1D Coordinate / Target Point',
    icon: Dot,
    badgeColor: 'success',
    coreConcept: 'Entity ko ek single geometric coordinate point, specific landmark, ya functional event ke taur par dekha jata hai.',
    environments: [
      { category: 'Specific Target Points', examples: 'at the bus stop, at the traffic light, at the door, at the entrance' },
      { category: 'Complete Addresses (With Number)', examples: 'at 14, High Court Colony, Jodhpur (Address mein number aate hi AT compulsory)' },
      { category: 'Functional Places / Workplaces', examples: 'at court, at school, at university, at the library, at work, at home' },
      { category: 'Events & Assemblies', examples: 'at the conference, at the judicial seminar, at the hearing, at the meeting' },
      { category: 'Small Place in Hierarchy', examples: 'at Malviya Nagar (in Jaipur), at Gandhinagar (in Gujarat)' },
    ],
    examFormula: 'AT + 1D Specific Point / Complete Address (House #) / Event',
    takeaway: 'Point coordinates, house numbers ke sath addresses, aur social events strictly "AT" demand karte hain.'
  },
]

export default function PlaceSpatialNavigator() {
  const [activeDimId, setActiveDimId] = useState('in')
  const activeDim = SPATIAL_DIMENSIONS.find((d) => d.id === activeDimId) || SPATIAL_DIMENSIONS[0]

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <MapPin size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-surface-900 dark:text-surface-50">
              Spatial Navigator: Place Dimensions (3D In ➔ 2D On ➔ 1D At)
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Volume enclosures, flat physical surfaces, aur exact coordinate points ka structural comparator
            </p>
          </div>
        </div>
        <Badge variant="secondary" size="sm">Spatial Matrix</Badge>
      </div>

      {/* Dimension Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SPATIAL_DIMENSIONS.map((dim) => {
          const isActive = dim.id === activeDimId
          const IconComp = dim.icon
          return (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveDimId(dim.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/60 border-primary-400 dark:border-primary-600 shadow-xs'
                  : 'bg-white dark:bg-surface-850 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                }`}
              >
                <IconComp size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-xs text-surface-900 dark:text-white truncate">
                  {dim.name.split('—')[0]}
                </p>
                <span className="text-[0.6875rem] text-surface-500 dark:text-surface-400 block truncate">
                  {dim.dimension}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Dimension Deep Dive Panel */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-850/60 border border-surface-200 dark:border-surface-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-200 dark:border-surface-700">
          <div>
            <h4 className="font-heading font-bold text-sm text-surface-900 dark:text-white">
              {activeDim.name}
            </h4>
            <p className="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
              {activeDim.coreConcept}
            </p>
          </div>
          <Badge variant={activeDim.badgeColor} size="sm">
            {activeDim.dimension}
          </Badge>
        </div>

        {/* Environments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {activeDim.environments.map((env, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-xs space-y-1"
            >
              <span className="font-bold text-primary-700 dark:text-primary-300 block">
                {env.category}
              </span>
              <p className="font-mono text-surface-800 dark:text-surface-200 text-[0.75rem]">
                {env.examples}
              </p>
            </div>
          ))}
        </div>

        {/* Core Formula & Takeaway */}
        <div className="p-3 rounded-lg bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-bold text-primary-900 dark:text-primary-200">Rule Formula: </span>
            <code className="font-mono text-primary-800 dark:text-primary-300 font-semibold">{activeDim.examFormula}</code>
          </div>
          <span className="text-surface-600 dark:text-surface-400 italic text-[0.75rem]">
            {activeDim.takeaway}
          </span>
        </div>
      </div>

      {/* Address Breakdown Simulation Widget */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-surface-100 to-white dark:from-surface-800 dark:to-surface-850 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-surface-800 dark:text-surface-100">
          <Sparkles size={15} className="text-primary-600 dark:text-primary-400" />
          <span>The Address Precision Simulator (Exam Rule Case Study)</span>
        </div>
        <p className="text-xs text-surface-600 dark:text-surface-300">
          Dekhein kaise ek hi address ke alag-alag parts alag-alag prepositions demand karte hain:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-emerald-300 dark:border-emerald-800 space-y-1">
            <Badge variant="success" size="sm">Point Coordinate</Badge>
            <p className="font-mono font-bold text-surface-900 dark:text-white">
              at 42, High Court Colony
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              Building/house number maujood hai ➔ strictly "AT"
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-amber-300 dark:border-amber-800 space-y-1">
            <Badge variant="secondary" size="sm">Linear Surface</Badge>
            <p className="font-mono font-bold text-surface-900 dark:text-white">
              on High Court Road
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              Sirf named street/road hai bina number ke ➔ strictly "ON"
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-blue-300 dark:border-blue-800 space-y-1">
            <Badge variant="primary" size="sm">3D Territory</Badge>
            <p className="font-mono font-bold text-surface-900 dark:text-white">
              in Jodhpur
            </p>
            <p className="text-[0.6875rem] text-surface-500 dark:text-surface-400">
              Shahar, district ya state ki geographical boundary ➔ strictly "IN"
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold text-primary-800 dark:text-primary-300 pt-1">
          Full Synthesized Sentence: "The senior advocate resides <span className="underline">at</span> House 42 <span className="underline">on</span> High Court Road <span className="underline">in</span> Jodhpur."
        </p>
      </div>
    </Card>
  )
}
