import React from 'react'
import { Grid } from '@mui/material'
import { StyledTextField, theme } from '../../assets/theme/theme' // Import theme here

const LoginFomComponent = (props) => {
  const email = props.LoginForm.email;
  const password = props.LoginForm.password;
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <StyledTextField
          theme={theme} // Pass the theme object here
          fullWidth
          label="User name"
          placeholder="Enter User Email"
          size="small"
          value={email.value}
          error={!!email.error}
          disabled={email.disable}
          required={email.isRequired}
          helperText={props.helperText && email.error}
          onFocus={() => props.handleInputFocus('email', 'GI')}
          onChange={(event) => props.onInputHandleChange('email', event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <StyledTextField
          theme={theme} // Pass the theme object here
          fullWidth
          label="password"
          placeholder="Enter password"
          size="small"
          value={password.value}
          error={!!password.error}
          disabled={password.disable}
          required={password.isRequired}
          helperText={props.helperText && password.error}
          onFocus={() => props.handleInputFocus('password', 'GI')}
          onChange={(event) => props.onInputHandleChange('password', event.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default LoginFomComponent
