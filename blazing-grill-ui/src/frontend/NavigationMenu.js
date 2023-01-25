function NavMenu({ sections, setState, state }) {
  return (
    <div className="NavMenu">
      <ul>
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
          className={"Login" === state ? "active" : ""}
        >
          <a onClick={() => setState("Login")}>Login</a>
        </li>
      </ul>
    </div>
  );
}

export default NavMenu;
