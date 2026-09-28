import { useEffect, useState } from 'react';

function Profile({ profile, setProfile, onLogout, showToast }) {
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setProfile((previousProfile) => ({
      ...previousProfile,
      ...formData,
    }));
    showToast('Profile updated successfully.');
    setIsEditing(false);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage('Please fill in all password fields.');
      return;
    }

    if (passwordForm.currentPassword !== profile.password) {
      setPasswordMessage('Current password is incorrect.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }

    setProfile((previousProfile) => ({
      ...previousProfile,
      password: passwordForm.newPassword,
    }));
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordMessage('Password changed successfully.');
    showToast('Password changed successfully.');
  };

  return (
    <div className="page-stack">
      <div className="page-header page-header--with-action">
        <div>
          <p className="eyebrow">Account</p>
          <h2>Profile</h2>
        </div>
        <button type="button" className="btn btn--secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      <section className="panel profile-panel">
        <div className="profile-header">
          <div className="user-avatar">{profile.name.charAt(0)}</div>
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
          </div>
        </div>

        {!isEditing ? (
          <div className="profile-details">
            <div>
              <span>Name</span>
              <strong>{profile.name}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>
            <button type="button" className="btn btn--primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSaveProfile}>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
              />
            </label>
            <label>
              <span>Role</span>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleProfileChange}
              />
            </label>
            <div className="profile-form__actions">
              <button type="button" className="btn btn--secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="panel">
        <div className="panel__header">
          <h3>Change Password</h3>
        </div>

        <form className="password-form" onSubmit={handlePasswordSubmit}>
          <label>
            <span>Current Password</span>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(event) =>
                setPasswordForm((previousForm) => ({
                  ...previousForm,
                  currentPassword: event.target.value,
                }))
              }
            />
          </label>

          <label>
            <span>New Password</span>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) =>
                setPasswordForm((previousForm) => ({
                  ...previousForm,
                  newPassword: event.target.value,
                }))
              }
            />
          </label>

          <label>
            <span>Confirm Password</span>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(event) =>
                setPasswordForm((previousForm) => ({
                  ...previousForm,
                  confirmPassword: event.target.value,
                }))
              }
            />
          </label>

          {passwordMessage && <p className="info-text">{passwordMessage}</p>}

          <button type="submit" className="btn btn--primary">
            Update Password
          </button>
        </form>
      </section>
    </div>
  );
}

export default Profile;
