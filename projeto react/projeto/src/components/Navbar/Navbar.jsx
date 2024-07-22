import React from "react";

class Navbar extends React.Components {
  render() {
    return (
      <header>
        <nav id="navbar">
          <div className="nav-brand">
            <img src="" alt="" />
            <h1>Space News</h1>
          </div>

          <ul className="nav-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Trending</a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
