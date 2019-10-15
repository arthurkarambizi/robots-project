import React, { Component } from 'react';
import './AddTasks.scss';

export default class AddTasks extends Component {
  render() {
    return (
      <section id="task__add-container" className="task__add-container">
        <div id="task__add" className="task__add">
          <AddTasksFormTop showAddTasks={this.props.showAddTasks} />
          <AddTasksForm
            appSelectTasks={this.props.appSelectTasks}
            appAddTasksProgress={this.props.appAddTasksProgress}
            appSendAddedTasks={this.props.appSendAddedTasks}
          />
        </div>
      </section>
    );
  }
}

// components in AddTasks component

const AddTasksFormTop = props => {
  return (
    <div className="task__add-top">
      <h2>Add Tasks </h2>
      <i className="material-icons" onClick={props.showAddTasks}>
        cancel
      </i>
      <p className="task__add-top-message">Choose 5 tasks</p>
    </div>
  );
};

const AddTasksForm = props => {
  const tasksCheckboxes = [
    {
      id: 'dishes',
      description: 'Do the dishes',
      eta: 1000
    },
    {
      id: 'house',
      description: 'Sweep the house',
      eta: 3000
    },
    {
      id: 'laundry',
      description: 'Do the laundry',
      eta: 10000
    },
    {
      id: 'recycling',
      description: 'Take out the recycling',
      eta: 4000
    },
    {
      id: 'sammich',
      description: 'Make a sammich',
      eta: 7000
    },
    {
      id: 'lawn',
      description: 'Mow the lawn',
      eta: 20000
    },
    {
      id: 'leaves',
      description: 'Rake the leaves',
      eta: 18000
    },
    {
      id: 'bath',
      description: 'Give the dog a bath',
      eta: 14500
    },
    {
      id: 'cookies',
      description: 'Bake some cookies',
      eta: 8000
    },
    {
      id: 'car',
      description: 'Wash the car',
      eta: 20000
    }
  ];
  let numberingTasks = 1;
  return (
    <form
      id="task__add-form"
      className="task__add-form"
      method="post"
      action="/"
    >
      <div className="task__add-form-checkboxes">
        {tasksCheckboxes.map((checkbox, key) => (
          <div className="task__add-form-checkbox" key={checkbox.id}>
            <input
              type="checkbox"
              name={checkbox.id}
              id={checkbox.id}
              value={`${checkbox.eta}&&${checkbox.description}`}
              onChange={props.appSelectTasks}
            />
            <label htmlFor={checkbox.id}>
              {numberingTasks++}. {checkbox.description}
            </label>
          </div>
        ))}
      </div>
      <div className="task__add-form-buttons">
        <button
          className="task__add-form-button-start"
          onClick={props.appAddTasksProgress}
        >
          Start Tasks
        </button>
      </div>

      <div id="task__add-progress-bar">
        <div id="task__add-progress-bar-indicator">
          <span>0%</span>
        </div>
        <p className="task__add-progress-bar-status" />
      </div>
    </form>
  );
};
