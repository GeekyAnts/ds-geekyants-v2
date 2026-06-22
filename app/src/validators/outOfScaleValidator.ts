import type { GeeklegoTokensV2 } from '../types'
import type { ValidatorResult } from './types'

const BASIC_SCALE = [0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96]
const SPACING_SCALE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144, 160, 192, 224, 256]

function normalizeSpacing(px: number): number {
  return Math.round(px * 10) / 10
}

function findNearestScaleValue(value: number, scale: number[]): { nearest: number; diff: number } {
  if (scale.includes(value)) {
    return { nearest: value, diff: 0 }
  }
  let nearest = scale[0]
  let minDiff = Math.abs(value - nearest)
  for (const scaleValue of scale) {
    const diff = Math.abs(value - scaleValue)
    if (diff < minDiff) {
      nearest = scaleValue
      minDiff = diff
    }
  }
  return { nearest, diff: minDiff }
}

function extractSpacingPx(value: string): number | null {
  const pxMatch = value.match(/^(-?\d+(?:\.\d+)?)px$/)
  if (pxMatch) {
    return parseFloat(pxMatch[1])
  }
  const remMatch = value.match(/^(-?\d+(?:\.\d+)?)rem$/)
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16
  }
  const emMatch = value.match(/^(-?\d+(?:\.\d+)?)em$/)
  if (emMatch) {
    return parseFloat(emMatch[1]) * 16
  }
  return null
}

export function checkOutOfScale(
  tokenName: string,
  value: string,
  tokens: GeeklegoTokensV2,
  thresholdPx = 2
): ValidatorResult[] {
  const results: ValidatorResult[] = []

  if (!tokenName.startsWith('--spacing-') &&
    !tokenName.startsWith('--radius-') &&
    !tokenName.startsWith('--border-width-')) {
    return results
  }

  if (value.startsWith('var(')) {
    return results
  }

  const pxValue = extractSpacingPx(value)
  if (pxValue === null) {
    return results
  }

  const normalizedValue = Math.abs(normalizeSpacing(pxValue))
  const scale = SPACING_SCALE

  const { nearest, diff } = findNearestScaleValue(normalizedValue, scale)

  if (diff > thresholdPx) {
    const diffUnit = diff >= 16 ? 'rem' : 'px'
    const diffValue = diff >= 16 ? (diff / 16).toFixed(1) : Math.round(diff)
    const nearestUnit = nearest >= 16 ? 'rem' : 'px'
    const nearestValue = nearest >= 16 ? (nearest / 16).toFixed(1) : Math.round(nearest)

    results.push({
      tokenName,
      severity: 'notice',
      category: 'out-of-scale',
      message: `Spacing ${value} not in scale (use ${nearestValue}${nearestUnit})`,
      details: `${diffValue}${diffUnit} away from nearest scale value`,
    })
  }

  return results
}
