import React, { Component } from 'react';
import './CreateRobot.scss';

export default class CreateRobot extends Component {
  showHideCreateRobotForm = () => {
    let createRobotForm = document.querySelector(
      '#create-robot__form-container'
    );
    createRobotForm.style.display =
      createRobotForm.style.display === 'grid' ? 'none' : 'grid';
  };
  render() {
    return (
      <section className="create-robot">
        <AddNewRobot showHideCreateRobotForm={this.showHideCreateRobotForm} />
        <div id="create-robot__form-container">
          <section className="create-robot__form">
            <CreateRobotFormTop
              showHideCreateRobotForm={this.showHideCreateRobotForm}
            />
            <CreateRobotForm
              appPostRobot={this.props.appPostRobot}
              showHideCreateRobotForm={this.showHideCreateRobotForm}
            />
          </section>
        </div>
      </section>
    );
  }
}

// components in CreateRobot component

const AddNewRobot = props => {
  return (
    <div className="create-robot__add-new">
      <i className="material-icons" onClick={props.showHideCreateRobotForm}>
        add
      </i>
      <p>Add New Robot</p>
    </div>
  );
};

const CreateRobotFormTop = props => {
  return (
    <div className="create-robot__form-top">
      <h2>Add a Robot </h2>
      <i className="material-icons" onClick={props.showHideCreateRobotForm}>
        cancel
      </i>
    </div>
  );
};

const CreateRobotForm = props => {
  const formInputs = {
    inputs: [
      {
        name: 'robotName',
        label: 'Robot Name :',
        id: 'robotName',
        type: 'text',
        placeholder: 'Robot Name',
        required: true
      },
      {
        name: 'robotImage',
        label: 'Robot Image :',
        id: 'robotImage',
        type: 'text',
        placeholder: 'Add Image Url (optional)',
        required: false
      }
    ],
    selectRobotType: [
      {
        name: 'robotType',
        label: 'Robot Type',
        id: 'robotTypesSelect',
        options: [
          {
            name: 'Unipedal',
            value: 'Unipedal'
          },
          {
            name: 'Bipedal',
            value: 'Bipedal'
          },
          {
            name: 'Quadrupedal',
            value: 'Quadrupedal'
          },
          {
            name: 'Arachnid',
            value: 'Arachnid'
          },
          {
            name: 'Radial',
            value: 'Radial'
          },
          {
            name: 'Aeronautical',
            value: 'Aeronautical'
          }
        ]
      }
    ]
  };
  return (
    <form
      className="create-robot__form-inputs"
      onSubmit={props.appPostRobot}
      method="post"
    >
      {formInputs.inputs.map((input, key) => (
        <div className="create-robot__form-input" key={input.id}>
          <label htmlFor={input.id}>{input.label}</label>
          <input
            id={input.id}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            required={input.required}
          />
        </div>
      ))}
      {formInputs.selectRobotType.map((select, key) => (
        <div className="create-robot__form-select" key={select.id}>
          <label htmlFor={select.id}>{select.label}</label>
          <select id={select.id} name={select.name}>
            {select.options.map((option, key) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="create-robot__form-button">
        <button type="submit" id="robotTypesButton">
          save
        </button>
      </div>
    </form>
  );
};
