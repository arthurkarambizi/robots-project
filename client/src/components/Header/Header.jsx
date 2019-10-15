import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default class Header extends Component {
  // ─── HIDE AND SHOW NAVPAGES ────────────────────
  showNavPages = () => {
    let navPages = document.getElementById('nav__pages-show');
    navPages.style.display =
      navPages.style.display === 'block' ? 'none' : 'block';
  };
  render() {
    return (
      <header>
        <nav className="nav">
          <HeaderPhone showNavPages={this.showNavPages} />
          <HeaderPagesDesktop showNavPages={this.showNavPages} />
        </nav>
      </header>
    );
  }
}

// components in Header component

const HeaderPhone = props => {
  return (
    <div className="nav__phone">
      <div className="nav__logo">
        <NavLink exact={true} activeClassName="logo" to="/">
          BOT-O-MAT
        </NavLink>
      </div>
      <button
        className="nav__hamburger"
        onClick={props.showNavPages}
        aria-label="hamburger menu"
      >
        <i className="material-icons">menu</i>
      </button>
    </div>
  );
};

const HeaderPagesDesktop = props => {
  const Links = [
    {
      id: 1,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      name: 'LeaderBoard',
      path: '/leaderboard'
    }
  ];
  return (
    <div className="nav__pages" id="nav__pages-show">
      <ul>
        {Links.map((link, key) => (
          <li className="nav__pages-link" key={link.id}>
            <NavLink
              exact={true}
              to={link.path}
              activeClassName="active"
              className="nav__pages-link-anchor"
              onClick={props.showNavPages}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
