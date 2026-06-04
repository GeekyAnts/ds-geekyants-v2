import '../design-system/geeklego.css';

// ─── Token Editor Integration ─────────────────────────────────────────────────
// Listens for postMessage from the token editor (localhost:5176) and applies
// token overrides + theme/density/direction attributes to this story page.
window.addEventListener('message', (event) => {
  // Accept from any localhost port — the token editor port varies (5176-5179+)
  if (!event.origin.startsWith('http://localhost:')) return

  if (event.data?.type === 'GEEKLEGO_TOKEN_OVERRIDES') {
    let el = document.getElementById('geeklego-token-overrides') as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = 'geeklego-token-overrides'
      document.head.appendChild(el)
    }
    el.textContent = event.data.css
  }

  if (event.data?.type === 'GEEKLEGO_ATTRIBUTES') {
    const root = document.documentElement
    root.setAttribute('data-theme', event.data.theme)
    root.setAttribute('dir', event.data.direction)
    root.setAttribute('data-density', event.data.density)
  }
})

export const parameters = {
  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: "todo"
  },
  viewport: {
    viewports: {
      mobile:  { name: 'Mobile',  styles: { width: '375px',  height: '812px' } },
      tablet:  { name: 'Tablet',  styles: { width: '768px',  height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      wide:    { name: 'Wide',    styles: { width: '1536px', height: '900px' } },
    },
  },
};