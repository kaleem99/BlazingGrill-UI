import { useState } from "react";

function NavMenu({ sections, setState, state, isLoggedIn }) {
  const userStatus = () => {
    if (isLoggedIn) {
      return "Logout";
    } else {
      return "Login";
    }
  };
  const changeStatus = (type) => {
    setState(type);
  };
  return (
    <div className="NavMenu">
      {sections.map((section, i) => {
        if (i === 2) {
          return (
            <img
              alt=""
              className="BlazingImage"
              src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
            ></img>
          );
        } else {
          return (
            <div
              className="NavItemMenuSections"
              onClick={() => setState(section)}
            >
              {section}
            </div>
          );
        }
      })}

      {/* <div className="NavItemMenuSections">{sections[2]}</div>

      <div className="NavItemMenuSections">{sections[1]}</div> */}
      <div className="NavItemMenuSections">Login</div>

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
