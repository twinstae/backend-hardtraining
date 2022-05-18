import type { NextPage } from 'next'
import Link from 'next/link'

const SignUp: NextPage = () => {
  // username
  // email
  // password



  return (
    <div>
      <Link href="/">
        <a>
          Home
        </a>
      </Link>
      <main>
        <h1>Sign Up</h1>
        <form
          id="signup-form"
          onSubmit={(e) => {
          e.preventDefault()

          const data = new FormData(document.getElementById('signup-form') as HTMLFormElement)

          // 서버에 요청 보내기
          const API_ROOT = 'https://api.realworld.io/api';         
          
          fetch(API_ROOT+'/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: Object.fromEntries(data.entries())
            }),
          }).then(res => {
            console.log(res.status, res.statusText)
            return res.json()
          }).then(body => {
            console.log(body)
          })
        }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required minLength={8} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required minLength={8}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$" />

        <button type="submit">Submit</button>
      </form>
      </main>
    </div>
  )
}

export default SignUp
