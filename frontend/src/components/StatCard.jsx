const StatCard = ({ title, value, hint }) => (
  <article className="stat-card">
    <p className="stat-title">{title}</p>
    <h3>{value}</h3>
    {hint && <span>{hint}</span>}
  </article>
);

export default StatCard;
