import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import AuthenticationContext from '../../context/AuthenticationContext'
import Link from 'next/link'

const Register = ({  }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

  const {register} = useContext(AuthenticationContext)

  const submitHandler = e => {
    if (password !== password2) {
        console.error('passwords do not match')
    }
  	e.preventDefault();
  	register({username, email, password})
  }

  return (
    <Layout>
    <div>
      <div>
        <Typography variant='h3'>Register</Typography>
        <Card>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div>
                <TextField label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username} />
              </div>

              <div>
                <TextField label='Email' fullWidth onChange={e => setEmail(e.target.value)} value={email} />
              </div>

              <div>
                <TextField label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password} />
              </div>

              <div>
                <TextField label='Confirm Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword2(e.target.value)} value={password2} />
              </div>

              <div>
                <Button variant='contained' color='primary' type='submit'>Login</Button>
              </div>

              <div>
                <Link href='/account/login'>
                  <a>Already have an account? Sign In</a>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  )
}

export default Register
