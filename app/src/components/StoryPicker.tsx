interface StoryPickerProps {
  stories: readonly string[]
  activeStory: string
  onStoryChange: (story: string) => void
}

function StoryPicker({ stories, activeStory, onStoryChange }: StoryPickerProps) {
  if (stories.length === 0) return null

  return (
    <div className="ed-story-picker" role="group" aria-label="Story selection">
      {stories.map((story) => (
        <button
          key={story}
          type="button"
          className={`ed-story-picker-btn${activeStory === story ? ' active' : ''}`}
          aria-pressed={activeStory === story}
          onClick={() => onStoryChange(story)}
        >
          {story}
        </button>
      ))}
    </div>
  )
}

export { StoryPicker }
