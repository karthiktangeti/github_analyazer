import { ExternalLink, MapPin, Building2, Globe, Twitter } from 'lucide-react';

function ProfileCard({ profile }) {
  const fields = [
    { key: 'location', label: 'Location', icon: <MapPin size={14} /> },
    { key: 'company', label: 'Company', icon: <Building2 size={14} /> },
    { key: 'blog', label: 'Website', icon: <Globe size={14} /> },
    { key: 'twitter_username', label: 'Twitter', icon: <Twitter size={14} /> }
  ];

  const renderField = (field) => {
    const value = profile[field.key];
    if (!value) return null;

    const displayValue = field.key === 'blog' ? value.replace(/^https?:\/\//, '') : value;

    return (
      <li key={field.key}>
        {field.icon}
        {field.key === 'blog' ? <a href={profile.blog} target="_blank" rel="noreferrer">{displayValue}</a> : displayValue}
      </li>
    );
  };

  return (
    <section className="card profile-card">
      <img src={profile.avatar_url} alt={profile.login} className="avatar" />
      <div className="profile-content">
        <h2>{profile.name || profile.login}</h2>
        <p className="username">@{profile.login}</p>
        {profile.bio && <p className="bio">{profile.bio}</p>}
        <ul className="profile-meta">
          {fields.map(renderField)}
        </ul>
        <a href={profile.html_url} target="_blank" rel="noreferrer" className="primary-link">
          <ExternalLink size={16} /> View GitHub Profile
        </a>
      </div>
    </section>
  );
}

export default ProfileCard;
