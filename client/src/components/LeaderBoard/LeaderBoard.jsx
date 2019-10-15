import React, { Component } from 'react';
import './LeaderBoard.scss';
import Card from '../Card/Card';

export default class LeaderBoard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let leaderBoardArray = [...this.props.robotsList];
    leaderBoardArray.sort(function(robot1, robot2) {
      return robot1.robotTasks.length < robot2.robotTasks.length;
    });
    return (
      <div className="leaderboard">
        <LeaderBoardTab />
        <LeaderBoardCard leaderBoardArray={leaderBoardArray} />
      </div>
    );
  }
}

// components in LeaderBoard component

const LeaderBoardTab = () => {
  return (
    <div className="leaderboard__tab">
      <p>Rank</p>
      <p>Robot</p>
      <p>Name</p>
      <p>Type</p>
      <p>Tasks</p>
    </div>
  );
};

const LeaderBoardCard = props => {
  let robotRank = 1;
  return props.leaderBoardArray.map((robot, key) => (
    <div className="leaderboard__card" key={robot._id}>
      <p className="leaderboard__card-rank">{robotRank++} .</p>
      <Card cardDetails={robot} key={robot.date} />
    </div>
  ));
};
