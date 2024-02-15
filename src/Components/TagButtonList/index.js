import './index.css'

const TagButtonList = props => {
  const {tagDetails, onClickTag, isActive, isActiveTag} = props
  const {displayText} = tagDetails

  const buttonClass =
    isActive && isActiveTag ? 'active-button' : 'non-active-button'

  const onActive = () => {
    onClickTag(displayText)
  }

  return (
    <li>
      <button type="button" onClick={onActive} className={buttonClass}>
        {displayText}
      </button>
    </li>
  )
}

export default TagButtonList
