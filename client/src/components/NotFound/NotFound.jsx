import React, { Component } from 'react';
import './NotFound.scss';
export default class NotFound extends Component {
  render() {
    return (
      <section className="error-page">
        <div className="error-page__message">
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      </section>
    );
  }
}
