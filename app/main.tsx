import './src/editor-ds/editor.css'
import '../design-system/geeklego.css'
import './src/components/KeyboardShortcuts.css'
import './src/components/OnboardingTour.css'
import './src/components/ExportModal.css'
import './src/components/HealthPanel.css'
import './src/components/DependencyTree.css'
import './src/components/DiffView.css'
import './src/components/AutoSaveBanner.css'
import './src/components/inline-preview.css'
import './src/components/component-preview.css'
import './src/editor-ds/_overrides.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EditorShell from './src/EditorShell.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorShell />
  </StrictMode>
)
