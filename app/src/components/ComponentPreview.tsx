import { useState, useEffect } from 'react'
import { ComponentPreviewFrame } from './ComponentPreviewFrame'
import { StoryPicker } from './StoryPicker'
import { getAvailableStories } from '../utils/storybook'
import { subscribeToPendingChanges, getAllStaged } from '../state/staging'

interface ComponentPreviewProps {
  tokens: Map<string, string>
  originalTokens: Map<string, string>
  componentName: string
  level: string
}

function ComponentPreview({ componentName, level }: ComponentPreviewProps) {
  const [activeStory, setActiveStory] = useState('Default')
  const [stagedTokens, setStagedTokens] = useState<Map<string, string>>(getAllStaged)

  useEffect(() => {
    setActiveStory('Default')
  }, [componentName])

  useEffect(() => {
    return subscribeToPendingChanges(() => {
      setStagedTokens(new Map(getAllStaged()))
    })
  }, [])

  const availableStories = getAvailableStories(componentName)

  return (
    <div className="ed-component-preview-container">
      <StoryPicker
        stories={availableStories}
        activeStory={activeStory}
        onStoryChange={setActiveStory}
      />
      <ComponentPreviewFrame
        componentName={componentName}
        level={level}
        storyName={activeStory}
        theme="light"
        density="comfortable"
        direction="ltr"
        stagedTokens={stagedTokens}
      />
    </div>
  )
}

export { ComponentPreview }
