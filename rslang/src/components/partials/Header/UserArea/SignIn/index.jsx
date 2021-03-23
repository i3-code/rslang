import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Loading from '../../../../partials/Loading';
import { AuthService } from '../../../../../services/auth.service';

import useStyles from './styles';

export default function SignIn({ callBack, onClose, onSignIn }) {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    AuthService.setRememberMe(false);
  }, []);

  const handleChangeCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    setIsPending(true);
    setError(null);
    const result = await AuthService.signIn(credentials);
    if (result instanceof Error) {
      setIsPending(false);
      if (result.response.status === 401) {
        setError('Имя пользователя или пароль неверны');
      } else {
        setError('Что-то пошло не так, попробуте позже');
      }
    } else {
      onSignIn(result.data);
      setIsPending(false);
      onClose();
    }
  };

  const handleRememberMe = (e) => {
    AuthService.setRememberMe(e.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {isPending && <Loading />}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        {error && <Typography className={classes.error}>{error}</Typography>}
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            onChange={handleChangeCredentials}
            label="Имя пользователя"
            autoFocus
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            onChange={handleChangeCredentials}
            label="Пароль"
            type="password"
          />
          <FormControlLabel
            onClick={handleRememberMe}
            control={<Checkbox value="remember" color="primary" />}
            label={'Запомнить меня'}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} className={classes.submit}>
            {'Войти'}
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link variant="body2" className={classes.interactive} onClick={callBack('signUp')}>
                {'Нет аккаунта? Регистрируйтесь'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
