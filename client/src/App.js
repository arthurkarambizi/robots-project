import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Header from './components/Header/Header';

import Home from './components/Home/Home';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robotsList: [] // ••• Array of all Robots •••
    };
  }
  componentDidMount() {
    this.appGetRobots();
  }


  appGetRobots = () => {
    fetch('http://localhost:5000/api/robots/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(results => {
      results.json().then(robots => {
        this.setState({ robotsList: robots }); // ••• add all robots in this.state.robotslist Array •••
      });
    });
  };

  appPostRobot = event => {
    event.preventDefault();
    //if the image is url
    if (
      event.target.robotImage.value.includes('http') ||
      event.target.robotImage.value === ''
    ) {
      const url = 'http://localhost:5000/api/robots/'; //••• http://localhost:5000/api/robots/ •••
      const robotPostData = {
        robotName: event.target.robotName.value, //••• all data to create the new robot •••
        robotType: event.target.robotType.value,
        robotImage: event.target.robotImage.value
      };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(robotPostData), //••• change robotPostData in json file •••
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
          res.json().then(newRobot => {
            const robots = this.state.robotsList; //••• new array robots •••
            robots.push(newRobot); //••• add new robot in robots Array •••
            this.setState({ robotsList: robots }); //add the created robot to this.state.robotsList array
          })
        )
        .catch(error => console.error('Error:', error));
    } else {
      alert('Use a right image url '); // if the url is not correct
    }
  };

  appDeleteRobot = robotId => {
    const url = `http://localhost:5000/api/robots/${robotId}`; //robot url
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      const robotsArray = this.state.robotsList;
      const index = this.state.robotsList.findIndex(x => x._id === robotId);
      robotsArray.splice(index, 1);
      this.setState({ robotsList: robotsArray }); //remove the Robot from this.state.robotsList array
    });
  };


  appSelectTasks = () => {
    // get the form elements we need to use
    const formInputs = document
      .querySelector('#task__add-form')
      .querySelectorAll('input[type=checkbox');
    const buttonStartTasks = document.querySelector(
      '.task__add-form-button-start'
    );
    const formTopMessage = document.querySelector('.task__add-top-message');
    // message at the top before starting selecting tasks
    formTopMessage.innerHTML = 'Choose 5 tasks';
    formTopMessage.style.color = 'white';

    // get the form elements we need to use
    let selectedTasksArray = [];
    let totalTimeArray = [];
    let totalTasksTime = 0; // let totalTasksTime = 0; //•••  total time to complete the 5 tasks •••

    formInputs.forEach(input => {
      if (input.checked) {
        //••• get eta and description of the checked input from input Value and add each one in selectedTasksArray (in the input value  is eta&&description)
        let [eta, description] = input.value.split('&&');
        selectedTasksArray.push({ eta: Number(eta), description }); //••• task description & time
        totalTasksTime += Number(eta); // add all tasks time
        if (selectedTasksArray.length === 5) {
          //••• message if 5 tasks are selected and show buttonStartTasks button and progress bar

          formTopMessage.innerHTML = `Choose 5 tasks: 5 Tasks selected`;
          formTopMessage.style.color = 'yellow';
          buttonStartTasks.style.display = 'grid';
        } else if (selectedTasksArray.length >= 5) {
          // disable the unchecked inputs and show start tasks button
          input.checked = false;
          buttonStartTasks.style.display = 'grid';
        } else {
          // hide start tasks button  if there is no 5 tasks are selected
          buttonStartTasks.style.display = 'none';
        }
      }
    });
    totalTimeArray.push(totalTasksTime); //add total tasks time to totalTimeArraY
    const finalTasksArray = [selectedTasksArray, totalTimeArray]; // all 5 tasks and total tasks time
    return finalTasksArray; // return finalTasksArray for appAddTasksProgress() & appSendAddedTasks()
  };

  appAddTasksProgress = event => {
    event.preventDefault();
    let finalTasksArray = this.appSelectTasks(); //get all 5 tasks and total tasks time
    let totalTasksTime = finalTasksArray[1]; // total time of all tasks selected
    let progressBarCounter = 0;
    let timeFrame = setInterval(frame, totalTasksTime / 100); // ⬅️ running the the frame() and totalTasksTime
    // get the this.appSendAddedTasks to send files after progress gets 100%
    let appSendAddedTasks = this.appSendAddedTasks;

    // get the form elements we need to use
    const checkboxes = document.querySelector('.task__add-form-checkboxes'); // get the checkboxes
    const taskAddTop = document.querySelector('.task__add-top'); // get the top section
    const progressBar = document.querySelector('#task__add-progress-bar'); // get the progress bar  •••
    const progressBarIndicator = document.querySelector(
      '#task__add-progress-bar-indicator'
    ); // get progress bar indicator  •••
    const progressBarStatus = document.querySelector(
      '.task__add-progress-bar-status'
    ); // get progress bar message/status  •••
    const buttonStartTasks = document.querySelector(
      '.task__add-form-button-start'
    ); // get the button start start tasks

    // Onclick start tasks button hide all checkboxes, start tasks button and top-section of the form
    // and show `It will take ${totalTasksTime}ms to complete the tasks.`

    checkboxes.style.display = 'none';
    taskAddTop.style.display = 'none';
    buttonStartTasks.style.display = 'none';
    progressBarStatus.textContent = `It will take ${totalTasksTime}ms/${totalTasksTime /
      1000}s to complete the tasks.`;

    // ⬇️ frame function used in timeFrame set interval
    function frame() {
      if (progressBarCounter >= 100) {
        // clear time out when totalTasksTime is finished show message Tasks Completed
        clearInterval(timeFrame);

        progressBarIndicator.style.width = `100%`;
        progressBarIndicator.textContent = `100%`;
        progressBarStatus.textContent = 'Tasks Completed';

        appSendAddedTasks();
      } else {
        progressBarCounter++; // increase counter from 0 to 100
        // show the progress bar , Increase css Width and show % of the progress bar indicator

        progressBar.style.display = `block`;
        progressBarIndicator.style.width = `${progressBarCounter}%`;
        progressBarIndicator.textContent = `${progressBarCounter}%`;
      }
    }
  };

  appSendAddedTasks = () => {
    // event.preventDefault();
    // get all 5 tasks and total tasks time, Array of all robots ,robotId from Card showAddTasks()
    const finalTasksArray = this.appSelectTasks();
    const robotsArray = this.state.robotsList;
    const robotId = document
      .querySelector('#task__add-container')
      .getAttribute('robot-id');
    //robot url
    const url = ` http://localhost:5000/api/robots/${robotId}`;
    //compare the _id of clicked Card with the one we have in this.state.robotsList Array
    // match id true get the index of that robot in this.state.robotsList array
    const robotIndex = this.state.robotsList.findIndex(x => x._id === robotId);
    //mainRobotTasksArray= all old tasks the robot had before
    //newRobotTasksArray = new tasks added to the robot
    let mainRobotTasksArray = robotsArray[robotIndex].robotTasks;
    let newRobotTasksArray = finalTasksArray[0];

    // add newRobotTasksArray in mainRobotTasksArray of  all old tasks the robot had before
    mainRobotTasksArray.push(newRobotTasksArray); //push new robot tasks in the main robot tasks

    //if a robot has  its first tasks send the newRobotTasksArray only

    if (mainRobotTasksArray.length === 0) {
      const robotTasksData = {
        robotTasks: newRobotTasksArray //  send the newRobotTasksArray
      };
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(robotTasksData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
          res.json().then(robotEdited => {
            robotsArray[robotIndex] = robotEdited; //edit the the robot in this.state.robotsList
            this.setState({ robotsList: robotsArray });
          })
        )
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }

    //if a robot had tasks before send the old tasks and new tasks which is mainRobotTasksArray
    else {
      const robotTasksData = {
        robotTasks: mainRobotTasksArray // all data from inputs in edit admin page to send
      };
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(robotTasksData), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
          res.json().then(robotEdited => {
            robotsArray[robotIndex] = robotEdited; //edit the the robot in this.state.robotsList
            this.setState({ robotsList: robotsArray });
          })
        )
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }
  };

  render() {
    const routes = [
      {
        name: 'Home',
        path: '/',
        exact: true,
        component: () => (
          <Home
            robotsList={this.state.robotsList}
            appPostRobot={this.appPostRobot}
            appDeleteRobot={this.appDeleteRobot}
            appSelectTasks={this.appSelectTasks}
            appAddTasksProgress={this.appAddTasksProgress}
            appSendAddedTasks={this.appSendAddedTasks}
          />
        )
      },
      {
        name: 'LeaderBoard',
        path: '/leaderboard',
        exact: false,
        component: () => <LeaderBoard robotsList={this.state.robotsList} />
      },
      {
        name: 'NotFound',
        path: '',
        exact: false,
        component: NotFound
      }
    ];
    return (
      <BrowserRouter>
        <>
          <Header />
          <main>
            <Switch>
              {routes.map((route, key) => (
                <Route
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={route.name}
                />
              ))}
            </Switch>
          </main>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
