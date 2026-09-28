function StatsCard({ label, value, icon, accent }) {
  return (
    <div className={`stats-card stats-card--${accent}`}>
      <div className="stats-card__icon">{icon}</div>
      <div>
        <p className="stats-card__label">{label}</p>
        <h3 className="stats-card__value">{value}</h3>
      </div>
    </div>
  );
}

export default StatsCard;
