import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import DarkModeButton from './DarkModeButton/DarkModeButton.jsx';
import { useSupplier } from '../context/supplierContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const {darkMode} = useSupplier();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      user: null,
      token: null,
    });
    navigate('/');
  };

  return (
    <nav className={styles.navbar + (darkMode ? ' ' + styles.dark : ' ' + styles.light)}>
      <div className={styles.container}>
        <NavLink className={styles.brand} to="/">
          RealTimeEdify
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className={styles.links}>
            <ul className={styles.navList}>
              {auth.user ? (
                <>
                  <li>
                    <DarkModeButton />
                  </li>
                  <li>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <DarkModeButton />
                  </li>
                  <li>
                    <NavLink className={styles.link} to="/" activeclassname={styles.active}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={styles.link} to="/register" activeclassname={styles.active}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
