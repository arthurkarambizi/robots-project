import React, { Component } from 'react';
import './ErrorPage.scss';
export default class ErrorPage extends Component {
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
