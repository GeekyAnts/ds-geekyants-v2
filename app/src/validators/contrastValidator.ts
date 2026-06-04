import type { ValidatorResult } from './types'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('')
  }
  if (cleanHex.length !== 6) {
    return null
  }
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16),
  }
}

function parseColor(color: string): { r: number; g: number; b: number } | null {
  if (color.startsWith('#')) {
    return hexToRgb(color)
  }
  if (color.startsWith('rgba(')) {
    const match = color.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      }
    }
  }
  if (color.startsWith('rgb(')) {
    const match = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      }
    }
  }
  if (color.startsWith('hsl(')) {
    return hslToRgb(color)
  }
  return null
}

function hslToRgb(hsl: string): { r: number; g: number; b: number } | null {
  const match = hsl.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/)
  if (!match) return null
  const h = parseInt(match[1], 10) / 360
  const s = parseInt(match[2], 10) / 100
  const l = parseInt(match[3], 10) / 100
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = parseColor(color1)
  const rgb2 = parseColor(color2)
  if (!rgb1 || !rgb2) {
    return 0
  }
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

function extractColorFromValue(value: string, allTokens: Map<string, string>): string | null {
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
    return value
  }
  if (value.startsWith('var(')) {
    const match = value.match(/var\(--([\w-]+)/)
    if (match) {
      const tokenName = `--${match[1]}`
      const actualValue = allTokens.get(tokenName)
      if (actualValue) {
        return extractColorFromValue(actualValue, allTokens)
      }
    }
  }
  return null
}

export function checkContrast(
  tokenName: string,
  value: string,
  allTokens: Map<string, string>
): ValidatorResult[] {
  const results: ValidatorResult[] = []

  if (!value.includes('var(')) {
    return results
  }

  const nodeDependsOn = nodeForToken(tokenName)
  if (!nodeDependsOn) return results

  const textColor = extractColorFromValue(tokenName, allTokens)
  const bgColor = nodeDependsOn &&
    extractColorFromValue(nodeDependsOn[0], allTokens)

  if (textColor && bgColor) {
    const ratio = getContrastRatio(textColor, bgColor)
    const passesAAA = ratio >= 7
    const passesAA = ratio >= 4.5

    if (!passesAA) {
      results.push({
        tokenName,
        severity: 'warn',
        category: 'contrast',
        message: `Contrast ratio ${ratio.toFixed(1)}:1 fails WCAG AA (requires 4.5:1)`,
        details: `Text color ${textColor} on background ${bgColor}`,
      })
    } else if (!passesAAA) {
      results.push({
        tokenName,
        severity: 'notice',
        category: 'contrast',
        message: `Contrast ratio ${ratio.toFixed(1)}:1 fails WCAG AAA (requires 7:1)`,
        details: `Text color ${textColor} on background ${bgColor}`,
      })
    }
  }

  return results
}

function nodeForToken(_name: string): string[] | null {
  return null
}
