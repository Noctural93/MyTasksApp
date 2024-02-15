import './index.css'

const MyTasksList = props => {
  const {tasksDetails} = props
  const {taskName, taskType} = tasksDetails

  return (
    <li className="myTask-list-item">
      <p className="task-name">{taskName}</p>
      <p className="task-type">{taskType}</p>
    </li>
  )
}

export default MyTasksList
