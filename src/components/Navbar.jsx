const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'tasks', label: 'My Tasks' },
  { key: 'completed', label: 'Completed' },
  { key: 'profile', label: 'Profile' },
];

function Navbar({ activePage, setActivePage, onLogout, profile }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="brand brand--small">
          <span className="brand__mark">T</span>
          <span className="brand__text">TaskFlow</span>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`nav-link ${activePage === item.key ? 'nav-link--active' : ''}`}
            onClick={() => setActivePage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="topbar__user">
        <div className="user-pill">
          <span className="user-pill__avatar">{profile.name.charAt(0)}</span>
          <span>{profile.name}</span>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
