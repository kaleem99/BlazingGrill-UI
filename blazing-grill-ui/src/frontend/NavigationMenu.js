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
      </ul>
    </div>
  );
}

export default NavMenu;
