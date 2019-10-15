import React, { Component } from 'react';
import './Home.scss';
import Card from '../Card/Card';
import CreateRobot from '../CreateRobot/CreateRobot';
import AddTasks from '../AddTasks/AddTasks';

export default class Home extends Component {
  //onClick AddTasksbutton from Card get the _id of the robot pass it to the attribute robot-id which will be used in appSendAddedTasks()
  showAddTasks = robotId => {
    let addTasksModal = document.getElementById('task__add-container');
    addTasksModal.setAttribute('robot-id', robotId); //set attribute  for addTasks
    addTasksModal.style.display =
      addTasksModal.style.display === 'grid' ? 'none' : 'grid';
  };

  render() {
    return (
      <section className="home">
        <HomeTop />
        <section className="home__cards home__cards--columns">
          <CreateRobot appPostRobot={this.props.appPostRobot} />
          {this.props.robotsList.map((robot, key) => (
            <Card
              cardDetails={robot}
              showAddTasks={this.showAddTasks}
              appDeleteRobot={this.props.appDeleteRobot}
              key={robot.date}
            />
          ))}
        </section>
        <AddTasks
          showAddTasks={this.showAddTasks}
          appAddTasksToRobot={this.passRobotId}
          appSelectTasks={this.props.appSelectTasks}
          appAddTasksProgress={this.props.appAddTasksProgress}
          appSendAddedTasks={this.props.appSendAddedTasks}
        />
      </section>
    );
  }
}

// components in Home component

const HomeTop = props => {
  return (
    <div className="home__top">
      <h1>My Robots:</h1>
      <div className="home__top-robot-types">
        <p className="robot-type robot-type--Unipedal">Unipedal</p>
        <p className="robot-type robot-type--Bipedal">Bipedal</p>
        <p className="robot-type robot-type--Quadrupedal">Quadrupedal</p>
        <p className="robot-type robot-type--Arachnid">Arachnid</p>
        <p className="robot-type robot-type--Radial">Radial</p>
        <p className="robot-type robot-type--Aeronautical">Aeronautical</p>
      </div>
    </div>
  );
};
