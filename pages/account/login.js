import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import AuthenticationContext from '../../context/AuthenticationContext'
import Link from 'next/link'

const Login = ({  }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {login} = useContext(AuthenticationContext)

  const submitHandler = e => {
  	e.preventDefault();
  	login({username, password})
  }

  return (
    <Layout>
    <div>
      <div>
        <Typography variant='h3'>Login</Typography>
        <Card>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div>
                <TextField label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username} />
              </div>

              <div>
                <TextField label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password} />
              </div>

              <div>
                <Button variant='contained' color='primary' type='submit'>Login</Button>
              </div>

              <div>
                <Link href='account/register'>
                  <a>Don&apos;t have an account? Sign Up</a>
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

export default Login
