import React, { useRef, useState } from 'react';

import PhotoIcon from '@material-ui/icons/Photo';
import DeleteIcon from '@material-ui/icons/Delete';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './styles';

import Loading from '../../../../partials/Loading';
import { AuthService } from '../../../../../services/auth.service';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export default function SignUp({ callBack, onClose, onSignIn }) {
  const classes = useStyles();

  const formRef = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  const [signError, setSignError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleUsernameChange = (e) => {
    setSignError('');
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setSignError('');
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlesDeleteAvatar = (e) => setAvatar(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Максимальный размер: 2МБ');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setAvatar(reader.result);
      setAvatarError(null);
    };
  };

  const handleSubmit = async () => {
    if (formRef.current.reportValidity()) {
      setIsPending(true);
      const response = await AuthService.signUp({ username, password, avatar });
      if (response instanceof Error) {
        setIsPending(false);
        if (response.response.status === 409) {
          setSignError('Такой пользователь уже существует');
        } else {
          setSignError('Что-то пошло не так, попробуйте позже');
        }
      } else {
        onSignIn(response.data);
        onClose();
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isPending && <Loading />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {'Регистрация'}
        </Typography>
        <form className={classes.form} ref={formRef}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Имя пользователя"
                value={username}
                autoComplete="username"
                onChange={handleUsernameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                value={email}
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Пароль"
                type="password"
                autoComplete="current-password"
                value={password}
                inputProps={{ minLength: 8 }}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item className={classes.avatarWrapper} xs={12}>
              {!avatar ? (
                <label className={classes.avatarInputLabel}>
                  <PhotoIcon fontSize="large" color="primary" />
                  <Typography>Добавить фото</Typography>
                  <TextField
                    required
                    className={classes.avatarInput}
                    type="file"
                    inputProps={{ accept: '.jpg, .jpeg, .png' }}
                    onChange={handleAvatarChange}
                  />
                </label>
              ) : (
                <>
                  <img src={avatar} className={classes.avatarImg} alt="" />
                  <IconButton className={classes.deleteAvatar} onClick={handlesDeleteAvatar}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              {avatarError && <Typography className={classes.avatarError}>{avatarError}</Typography>}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
          {signError && <Typography className={classes.signError}>{signError}</Typography>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" className={classes.interactive} onClick={callBack('signIn')}>
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
