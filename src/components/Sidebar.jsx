const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'tasks', label: 'My Tasks', icon: '📝' },
  { key: 'completed', label: 'Completed', icon: '✅' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

function Sidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark">T</span>
        <span className="brand__text">TaskFlow</span>
      </div>

      <nav className="sidebar__nav" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar__item ${activePage === item.key ? 'sidebar__item--active' : ''}`}
            onClick={() => setActivePage(item.key)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="sidebar__logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
