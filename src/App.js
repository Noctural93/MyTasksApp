import {Component} from 'react'

import {v4} from 'uuid'

import TagButtonList from './Components/TagButtonList'

import MyTasksList from './Components/MyTasksList'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeTab: '',
    searchInput: '',
    selectTag: tagsList[0].optionId,
    tasksList: [],
    isTabActive: false,
  }

  onChangingText = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangingTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onSubmittingTasks = event => {
    event.preventDefault()
    const {searchInput, selectTag} = this.state
    const selectTagOptionText = tagsList.filter(
      eachItem => eachItem.optionId === selectTag,
    )
    const newList = {
      id: v4(),
      taskName: searchInput,
      taskType: selectTagOptionText[0].displayText,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newList],
      searchInput: '',
      selectTag: tagsList[0].optionId,
    }))
  }

  onClickTag = id => {
    this.setState(prevState => ({
      isTabActive: !prevState.isTabActive,
      activeTab: id,
    }))
  }

  render() {
    const {
      searchInput,
      selectTag,
      activeTab,
      isTabActive,
      tasksList,
    } = this.state
    const updatedTask =
      isTabActive === false || activeTab === ''
        ? tasksList
        : tasksList.filter(eachItem => eachItem.taskType === activeTab)
    return (
      <div className="myTasks-main-container">
        <div className="form-main-container">
          <h1 className="form-heading">Create a task!</h1>
          <form onSubmit={this.onSubmittingTasks} className="tasks-form">
            <label htmlFor="task-input" className="label-text-input">
              Task
            </label>
            <input
              id="task-input"
              placeholder="Enter the task here"
              onChange={this.onChangingText}
              type="text"
              className="text-input"
              value={searchInput}
            />
            <label htmlFor="select-input" className="label-text-input">
              Tags
            </label>
            <select
              id="select-input"
              value={selectTag}
              onChange={this.onChangingTag}
              className="select-option-input"
            >
              {tagsList.map(eachItem => (
                <option
                  key={eachItem.optionId}
                  className="option-item"
                  value={eachItem.optionId}
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-tasksList-container">
          <h1 className="tag-heading">Tags</h1>
          <ul className="tag-container">
            {tagsList.map(eachItem => (
              <TagButtonList
                key={eachItem.optionId}
                tagDetails={eachItem}
                onClickTag={this.onClickTag}
                isActiveTag={isTabActive}
                isActive={eachItem.displayText === activeTab}
              />
            ))}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {tasksList.length === 0 ? (
            <p className="noTask-text">No Tasks Added Yet</p>
          ) : (
            <ul className="myTasks-list">
              {updatedTask.map(eachItem => (
                <MyTasksList key={eachItem.id} tasksDetails={eachItem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
