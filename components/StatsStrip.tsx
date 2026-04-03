'use client'

import CountUp from 'react-countup'

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  isText?: boolean
  textValue?: string
}

const stats: Stat[] = [
  { value: 36, suffix: 'M+', label: 'Informal Workers' },
  { value: 0,  label: 'Verified Identity', isText: true, textValue: 'QR-Based' },
  { value: 3,  suffix: '+', label: 'Pilot Locations' },
  { value: 0,  label: 'Paper Attendance Rolls', isText: true, textValue: 'Zero' },
]

export function StatsStrip() {
  return (
    <div className="glass-dark border-t border-b border-border-subtle">
      <div className="max-w-content mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-border-subtle' : ''}`}
            >
              <div className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                {stat.isText ? (
                  <span className="text-brand">{stat.textValue}</span>
                ) : (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix ?? ''}
                    prefix={stat.prefix ?? ''}
                    duration={1.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                )}
              </div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
