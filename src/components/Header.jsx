import React from 'react';
import { USER_PROFILE_ICON } from '../lib/config';

function Header() {
  return (
    <header className="App-header">
      <h2>USER'S INVENTORY</h2>
      <img src={USER_PROFILE_ICON} alt="USER PROFILE ICON" />
    </header>
  )
}

export default Header;