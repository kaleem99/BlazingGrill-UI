import { useState } from "react";

function NavMenu({ sections, setState, state, isLoggedIn }) {
  const changeStatus = (type) => {
    setState(type);
  };
  return (
    <div className="NavMenu">
      {sections.slice(0, sections.length - 1).map((section, i) => {
        if (i === 2) {
          return (
            <img
              onClick={() =>
                (window.location.href = "/BlazingGrill-UI?Place-order")
              }
              alt=""
              className="BlazingImage"
              src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
            ></img>
          );
        } else {
          return (
            <div
              className={
                section === state
                  ? "NavItemMenuSectionsactive"
                  : "NavItemMenuSections"
              }
              onClick={() => setState(section)}
            >
              {section}
            </div>
          );
        }
      })}

      {/* <div className="NavItemMenuSections">{sections[2]}</div>

      <div className="NavItemMenuSections">{sections[1]}</div> */}
      {/* <div
        className={
          state === "Login"
            ? "NavItemMenuSectionsactive"
            : "NavItemMenuSections"
        }
        onClick={() => setState("Login")}
      >
        Login
      </div> */}

      {/* <ul>
        {sections.map((section, i) => {
          return (
            <li key={i}>
              <a
                className={section === state ? "active" : ""}
                onClick={() => setState(section)}
              >
                {section}
              </a>
            </li>
          );
        })}
        <li
          style={{ position: "absolute", right: 0 }}
          className={"Login" === state || state === "Logout" ? "active" : ""}
        >
          <a onClick={() => changeStatus(userStatus())}>{userStatus()}</a>
        </li>
      </ul> */}
    </div>
  );
}

export default NavMenu;
