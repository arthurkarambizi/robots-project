import React, { Component } from 'react';
import './Card.scss';

export default class Card extends Component {
  render() {
    const { cardDetails } = this.props;

    return (
      <figure className={`card card--${cardDetails.robotType}`}>
        {cardDetails.robotImage === '' ? (
          <img
            className="card__image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl3c5kQnTv5Sm3g8jz91lj6uPZ8Adobj_WI01eOI9ndXnhKBQczg"
            alt={cardDetails.robotName}
          />
        ) : (
          <img
            className="card__image"
            src={cardDetails.robotImage}
            alt={cardDetails.robotName}
          />
        )}
        <figcaption className="card__info">
          <h3>
            <span>Name:</span> {cardDetails.robotName}
          </h3>
          <p>
            <span> Type:</span> {cardDetails.robotType}{' '}
          </p>
          <p>
            <span>Completed Tasks:</span> {cardDetails.robotTasks.length * 5}
          </p>
        </figcaption>
        <button
          className="card__button"
          onClick={() => this.props.showAddTasks(cardDetails._id)}
        >
          Add Tasks
        </button>
        <div className="card__delete">
          <i
            className="material-icons"
            onClick={() => this.props.appDeleteRobot(cardDetails._id)}
          >
            cancel
          </i>
        </div>
      </figure>
    );
  }
}
