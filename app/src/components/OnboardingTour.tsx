import { useState, useEffect, useCallback } from 'react'
import './OnboardingTour.css'

interface TourStep {
  title: string
  description: string
  visualSlot: 'layers' | 'inspector' | 'export'
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Two Layers of Tokens',
    description:
      'Tokens are organized into two layers in the nav rail. Foundations (primitives) hold raw values. Semantics map purpose to those values using the standard ShadCN/Tailwind vocabulary that components consume directly.',
    visualSlot: 'layers',
  },
  {
    title: 'The Inspector Panel',
    description:
      'Click any token to open the Inspector on the right. View token details, edit values, trace its dependency chain, and stage changes — all without touching the CSS file directly.',
    visualSlot: 'inspector',
  },
  {
    title: 'Export Ceremony',
    description:
      'When done editing, open the Pending Drawer or click Export. A 4-step flow — Review, Validation, Diff, Export — ensures no broken references reach your design system.',
    visualSlot: 'export',
  },
]

function LayersArt() {
  return (
    <div className="ed-tour__art-diagram">
      <div className="ed-tour__tier-stack">
        <div className="ed-tour__tier ed-tour__tier--foundations">
          <span className="ed-tour__tier-dot" />
          <span className="ed-tour__tier-label">Foundations</span>
          <span className="ed-tour__tier-value">--color-brand-900</span>
        </div>
        <div className="ed-tour__tier-arrow">↓</div>
        <div className="ed-tour__tier ed-tour__tier--semantics">
          <span className="ed-tour__tier-dot" />
          <span className="ed-tour__tier-label">Semantics</span>
          <span className="ed-tour__tier-value">--primary</span>
        </div>
      </div>
    </div>
  )
}

function InspectorArt() {
  return (
    <div className="ed-tour__art-diagram">
      <div className="ed-tour__inspector-mock">
        <div className="ed-tour__inspector-header">Inspector</div>
        <div className="ed-tour__inspector-row">
          <div className="ed-tour__inspector-swatch" style={{ background: '#c96442' }} />
          <span className="ed-tour__inspector-key">--color-brand-900</span>
          <span className="ed-tour__inspector-val">#331936</span>
        </div>
        <div className="ed-tour__inspector-row ed-tour__inspector-row--selected">
          <div className="ed-tour__inspector-swatch" style={{ background: '#331936' }} />
          <span className="ed-tour__inspector-key">--primary</span>
          <span className="ed-tour__inspector-val">var(…)</span>
        </div>
        <div className="ed-tour__inspector-row">
          <div className="ed-tour__inspector-swatch" style={{ background: '#ffffff' }} />
          <span className="ed-tour__inspector-key">--background</span>
          <span className="ed-tour__inspector-val">var(…)</span>
        </div>
        <div className="ed-tour__inspector-row">
          <div className="ed-tour__inspector-swatch" style={{ background: '#331936' }} />
          <span className="ed-tour__inspector-key">--foreground</span>
          <span className="ed-tour__inspector-val">var(…)</span>
        </div>
      </div>
    </div>
  )
}

function ExportArt() {
  const steps = ['Review', 'Validation', 'Diff', 'Export']
  return (
    <div className="ed-tour__art-diagram">
      <div className="ed-tour__export-flow">
        {steps.map((name, i) => (
          <div
            key={name}
            className={`ed-tour__export-step${i === 3 ? ' ed-tour__export-step--active' : ''}`}
          >
            <span className="ed-tour__export-num">{i + 1}</span>
            <span className="ed-tour__export-name">{name}</span>
            {i < 3 && <span className="ed-tour__export-check">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const ARTS = {
  layers: LayersArt,
  inspector: InspectorArt,
  export: ExportArt,
}

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [exiting, setExiting] = useState(false)

  const dismiss = useCallback(
    (complete = false) => {
      setExiting(true)
      setTimeout(() => {
        setExiting(false)
        localStorage.setItem('geeklego.editor.onboarding.completed', 'true')
        if (complete) onComplete?.()
        onClose()
      }, 200)
    },
    [onClose, onComplete],
  )

  const handleNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      dismiss(true)
    }
  }, [currentStep, dismiss])

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }, [currentStep])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss(false)
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext()
      if (e.key === 'ArrowLeft') handleBack()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, dismiss, handleNext, handleBack])

  if (!isOpen && !exiting) return null

  const step = TOUR_STEPS[currentStep]
  const isLast = currentStep === TOUR_STEPS.length - 1
  const ArtComponent = ARTS[step.visualSlot]

  return (
    <div
      className={`ed-tour-backdrop${exiting ? ' is-exiting' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) dismiss(false) }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to the Token Editor"
    >
      <div className="ed-tour">
        {/* Visual panel */}
        <div className={`ed-tour__visual ed-tour__visual--${currentStep}`}>
          <div className="ed-tour__step-badge">
            <span className="ed-tour__step-badge-num">{currentStep + 1}</span>
            <span>of {TOUR_STEPS.length}</span>
          </div>

          <button
            className="ed-tour__close"
            onClick={() => dismiss(false)}
            aria-label="Close tour"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="ed-tour__art">
            <ArtComponent />
          </div>
        </div>

        {/* Body */}
        <div className="ed-tour__content-wrap" key={currentStep}>
          <div className="ed-tour__body">
            <h2 className="ed-tour__title">{step.title}</h2>
            <p className="ed-tour__desc">{step.description}</p>

            <div className="ed-tour__progress" role="tablist" aria-label="Tour progress">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`ed-tour__dot${i === currentStep ? ' ed-tour__dot--active' : i < currentStep ? ' ed-tour__dot--done' : ''}`}
                  role="tab"
                  aria-selected={i === currentStep}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="ed-tour__footer">
            <button className="ed-tour__skip" onClick={() => dismiss(false)}>
              Skip tour
            </button>

            <div className="ed-tour__actions">
              {currentStep > 0 && (
                <button className="ed-tour__btn ed-tour__btn--back" onClick={handleBack}>
                  ← Back
                </button>
              )}
              <button
                className={`ed-tour__btn ${isLast ? 'ed-tour__btn--done' : 'ed-tour__btn--next'}`}
                onClick={handleNext}
              >
                {isLast ? 'Get started' : 'Next'}
                <span className="ed-tour__btn-arrow">
                  {isLast ? ' ✓' : ' →'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
