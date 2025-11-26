import React from 'react'
import stepsData from '@/content/steps.json'

const TenStepGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
      {stepsData.map((step, index) => (
        <div 
          key={step.id}
          className="group relative bg-white rounded-2xl p-5 text-center shadow-lg shadow-hn-blue/5 border border-hn-grey/20 card-hover cursor-default"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-hn-cyan/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-hn-cyan to-hn-cyan/70 rounded-xl flex items-center justify-center text-white font-poppins font-bold text-lg shadow-lg shadow-hn-cyan/25">
              {step.id}
            </div>
            <div className="text-sm font-medium text-hn-blue leading-tight">
              {step.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TenStepGrid
