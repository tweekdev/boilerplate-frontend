import React from 'react';
import UpdateUser from './UpdateUser';

function Profile() {
  return (
    <div className="profile-container">
      <h1>
        Mon <strong>profil</strong>
      </h1>
      <UpdateUser></UpdateUser>
    </div>
  );
}

export default Profile;
