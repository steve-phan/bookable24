import React, { useState } from 'react';
import { ShopContext } from '../../context/contextShop';
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../../utils';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  wrapComponent: {
    // background: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 26,
    paddingBottom: 32,
    borderRadius: 4,
    maxWidth: 600,
  },
  userInput: {
    width: '100%',
    maxWidth: '560px',
    marginBottom: '22px',
    marginTop: 26,
    height: 40,
    fontSize: 14,
  },
  require: {
    fontSize: 14.5,
    paddingLeft: 10,
    color: '#333',
    borderLeft: `2px solid ${theme.palette.highlight}`,
  },
  helperInput: {
    marginTop: -10,
    color: '#f44336',
  },
  normalText: {
    padding: '10px 0',
  },
  btnSignup: {
    // marginTop: 20,
    // marginBottom: 20,
    maxWidth: 600,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 20,
    },
  },
}));

const Settings = () => {
  const [{ allTermins, shopInfo }, dispatch] = React.useContext(ShopContext);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [changePass, setChangePass] = useState(false);
  const [recoverPass, setRecoverPass] = useState(false);
  const initialState = {
    newPass: '',
    repeatNewPass: '',
  };
  const [inputState, setInputState] = useState(initialState);
  const history = useHistory();
  const handleChangePass = () => {
    if (!inputState.newPass || !inputState.repeatNewPass) {
      return alert('Vui lòng  nhập  mật  khẩu  mới');
    }
    if (inputState.newPass !== inputState.repeatNewPass) {
      return alert('Mật khẩu mới không trùng khớp');
    }
    // auth
    //   .signInWithEmailAndPassword(shopInfo.email, initialState.oldPass)
    //   .then((user) => {
    //     auth.updateCurrentUser();
    //   });
    const user = auth.currentUser;
    user
      .updatePassword(inputState.newPass)
      .then(() => {
        alert('Thay đổi mật khẩu thành công');
        history.push('/dashboard');
      })
      .catch((error) => {
        // An error ocurred
        // ...
        alert('Mật khẩu thay đổi không thành công');
      });
  };
  const handleInput = (e) => {
    setInputState((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(shopInfo);
  React.useEffect(() => {
    setChangePass(false);
  }, []);

  if (changePass)
    return (
      <Container className={classes.wrapComponent}>
        <h5>Bạn muốn thay đổi mật khẩu?</h5>
        <TextField
          size='small'
          className={classes.userInput}
          value={inputState.newPass}
          // variant='outlined'
          name='newPass'
          placeholder='Mật khẩu mới'
          label='Mật khẩu mới*'
          onChange={(e) => handleInput(e)}
        />
        <TextField
          size='small'
          className={classes.userInput}
          value={inputState.repeatNewPass}
          // variant='outlined'
          name='repeatNewPass'
          placeholder='Nhập lại mật khẩu mới'
          label='Nhập lại mật khẩu mới*'
          onChange={(e) => handleInput(e)}
        />
        <Typography className={classes.helperInput}>
          {' '}
          Mật khẩu vui lòng lớn hơn 8 ký tự{' '}
        </Typography>
        <Button
          size='large'
          className={classes.btnSignup}
          variant='contained'
          color='secondary'
          onClick={handleChangePass}
        >
          Thay đổi mậu khẩu
        </Button>{' '}
        <Link
          className='siteLink'
          onClick={() => setChangePass(false)}
          to='/dashboard/Settings'
        >
          {' '}
          Quay trở lại cài đặt
        </Link>
      </Container>
    );
  // if (changePass) return <h1>Changepass </h1>;

  return (
    <Container className={classes.wrapComponent}>
      <h5>Thông tin chung tài khoản</h5>
      <Typography className={classes.normalText}>
        Tên quán : {shopInfo?.company}
      </Typography>
      <Typography className={classes.normalText}>
        Địa chỉ :{' '}
        {`${shopInfo?.street} ${shopInfo?.city} ${shopInfo?.cityCode}`}
      </Typography>
      <Typography className={classes.normalText}>
        Link website đặt hẹn cho quán :
        <span className={classes.info}>
          {' '}
          {`https://bookable24.de/${shopInfo?.shopname}`}{' '}
        </span>
      </Typography>

      <Typography className={classes.normalText}>
        Bạn muốn đặt lại mật khẩu:
        <span className={classes.info}>
          <Button
            onClick={() => setChangePass(true)}
            variant='contained'
            // color='secondary'
            className={classes.btnSignup}
          >
            {' '}
            Thay đổi mật khẩu{' '}
          </Button>
        </span>
      </Typography>
    </Container>
  );
};

export default Settings;
