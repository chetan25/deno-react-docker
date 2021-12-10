import React from "react";
import Link from "next/link";
import { useSerachContext } from "./SearchContext";

const NavBar = () => {
  const { searchTerm, setSearchTerm } = useSerachContext();

  return (
    <div data-uk-sticky="self-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <Link href="/">
            <a className="uk-navbar-item uk=logo">ToDo App</a>
          </Link>
        </div>
        <div className="uk-navbar-right">
          <span className="uk-navbar-toggle" data-uk-search-icon></span>
          <div
            className="uk-drop"
            data-uk-drop="mode: click; pos: left-center; offset: 0"
          >
            <form className="uk-search uk-search-navbar uk-width-1-1">
              <input
                autoFocus
                className="uk-search-input"
                placeholder="Search"
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              ></input>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
