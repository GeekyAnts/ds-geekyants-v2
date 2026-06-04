import { forwardRef, useState, useCallback, useEffect, useRef, memo } from 'react'
import type { CSSProperties, PointerEvent, KeyboardEvent } from 'react'
import type { EdColorPickerProps } from './EdColorPicker.types'
import { hexToHsv, hsvToHex, hexToRgb, rgbToHex } from '../../utils/colorUtils'
import './EdColorPicker.css'

// ── Colour math helpers ────────────────────────────────────────────────────────

function clamp(n: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, n)) }

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '').trim()
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    }
  }
  if (clean.length === 6) return hexToRgb('#' + clean)
  return null
}

function normalise(hex: string): string {
  const rgb = parseHex(hex)
  if (!rgb) return '#000000'
  return rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase()
}

// ── Spectrum (2-D saturation / value picker) ──────────────────────────────────

interface SpectrumProps {
  h: number; s: number; v: number
  onSVChange: (s: number, v: number) => void
}

const Spectrum = memo(({ h, s, v, onSVChange }: SpectrumProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const read = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    onSVChange(
      clamp(Math.round(((e.clientX - r.left) / r.width)  * 100), 0, 100),
      clamp(Math.round((1 - (e.clientY - r.top) / r.height) * 100), 0, 100),
    )
  }, [onSVChange])

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    ref.current?.setPointerCapture(e.pointerId)
    read(e)
  }, [read])

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) read(e)
  }, [read])

  const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    ref.current?.releasePointerCapture(e.pointerId)
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1
    switch (e.key) {
      case 'ArrowRight': onSVChange(clamp(s + step, 0, 100), v); e.preventDefault(); break
      case 'ArrowLeft':  onSVChange(clamp(s - step, 0, 100), v); e.preventDefault(); break
      case 'ArrowUp':    onSVChange(s, clamp(v + step, 0, 100)); e.preventDefault(); break
      case 'ArrowDown':  onSVChange(s, clamp(v - step, 0, 100)); e.preventDefault(); break
    }
  }, [s, v, onSVChange])

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Colour spectrum — arrow keys adjust saturation and brightness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={s}
      className="ed-cp__spectrum"
      style={{
        '--cp-hue': `hsl(${h}, 100%, 50%)`,
        background: [
          'linear-gradient(to bottom, transparent, #000)',
          'linear-gradient(to right, #fff, var(--cp-hue))',
        ].join(', '),
      } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden="true"
        className="ed-cp__spectrum-thumb"
        style={{ left: `${s}%`, top: `${100 - v}%` }}
      />
    </div>
  )
})
Spectrum.displayName = 'Spectrum'

// ── Hue slider ────────────────────────────────────────────────────────────────

interface HueSliderProps {
  h: number
  onHueChange: (h: number) => void
}

const HueSlider = memo(({ h, onHueChange }: HueSliderProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const read = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    onHueChange(Math.round(clamp((e.clientX - r.left) / r.width, 0, 1) * 360))
  }, [onHueChange])

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    ref.current?.setPointerCapture(e.pointerId)
    read(e)
  }, [read])

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) read(e)
  }, [read])

  const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    ref.current?.releasePointerCapture(e.pointerId)
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp':   onHueChange(clamp(h + step, 0, 360)); e.preventDefault(); break
      case 'ArrowLeft':  case 'ArrowDown': onHueChange(clamp(h - step, 0, 360)); e.preventDefault(); break
    }
  }, [h, onHueChange])

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Hue"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={h}
      className="ed-cp__hue-track"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden="true"
        className="ed-cp__hue-thumb"
        style={{ left: `${(h / 360) * 100}%` }}
      />
    </div>
  )
})
HueSlider.displayName = 'HueSlider'

// ── Main EdColorPicker ────────────────────────────────────────────────────────

export const EdColorPicker = forwardRef<HTMLDivElement, EdColorPickerProps>(
  ({ value = '#000000', onChange, className = '' }, ref) => {
    const hex = normalise(value)
    const hsv = hexToHsv(hex)

    const [h, setH] = useState(hsv.h)
    const [s, setS] = useState(Math.round(hsv.s * 100))
    const [v, setV] = useState(Math.round(hsv.v * 100))
    const [hexInput, setHexInput] = useState(hex)
    const hexFocused = useRef(false)

    // Sync internal state when the controlled value changes from outside
    useEffect(() => {
      const n = normalise(value)
      const parsed = hexToHsv(n)
      setH(parsed.h)
      setS(Math.round(parsed.s * 100))
      setV(Math.round(parsed.v * 100))
      if (!hexFocused.current) setHexInput(n)
    }, [value])

    const currentHex = normalise(hsvToHex(h, s / 100, v / 100))

    // Keep hex input in sync when colour changes via spectrum/hue
    useEffect(() => {
      if (!hexFocused.current) setHexInput(currentHex)
    }, [currentHex])

    const commit = useCallback((nh: number, ns: number, nv: number) => {
      const next = normalise(hsvToHex(nh, ns / 100, nv / 100))
      onChange?.(next)
    }, [onChange])

    const handleSV = useCallback((ns: number, nv: number) => {
      setS(ns); setV(nv)
      commit(h, ns, nv)
    }, [h, commit])

    const handleHue = useCallback((nh: number) => {
      setH(nh)
      commit(nh, s, v)
    }, [s, v, commit])

    const handleHexInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      setHexInput(raw)
      const parsed = parseHex(raw.startsWith('#') ? raw : '#' + raw)
      if (parsed) {
        const newHsv = hexToHsv(rgbToHex(parsed.r, parsed.g, parsed.b))
        setH(newHsv.h)
        setS(Math.round(newHsv.s * 100))
        setV(Math.round(newHsv.v * 100))
        onChange?.(normalise(rgbToHex(parsed.r, parsed.g, parsed.b)))
      }
    }, [onChange])

    return (
      <div ref={ref} className={`ed-cp ${className}`}>
        <Spectrum h={h} s={s} v={v} onSVChange={handleSV} />

        <div className="ed-cp__controls-row">
          <div
            className="ed-cp__preview"
            style={{ backgroundColor: currentHex }}
            aria-hidden="true"
          />
          <HueSlider h={h} onHueChange={handleHue} />
        </div>

        <div className="ed-cp__bottom-row">
          <div className="ed-cp__hex-field">
            <span className="ed-cp__hex-label">HEX</span>
            <input
              type="text"
              className="ed-cp__hex-input"
              value={hexInput}
              spellCheck={false}
              maxLength={7}
              onFocus={() => { hexFocused.current = true }}
              onBlur={() => { hexFocused.current = false; setHexInput(currentHex) }}
              onChange={handleHexInput}
              aria-label="Hex colour value"
            />
          </div>
        </div>
      </div>
    )
  }
)
EdColorPicker.displayName = 'EdColorPicker'
