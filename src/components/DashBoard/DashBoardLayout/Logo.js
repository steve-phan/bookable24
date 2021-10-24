import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../themes/components/sidebarStyle';
import logo from '../../data/images/bookable24.png';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(styles);

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.logo}>
      <Link className={classes.logoLink} to='/dashboard'>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        BookAble24
      </Link>
    </div>
  );
};

export default Logo;
