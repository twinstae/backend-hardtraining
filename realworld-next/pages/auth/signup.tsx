import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from "react-hook-form";

const SignUp: NextPage = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  // // 서버에 요청 보내기
  // const API_ROOT = 'https://api.realworld.io/api';         
  
  // fetch(API_ROOT+'/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user: Object.fromEntries(data.entries())
  //   }),
  // }).then(res => {
  //   console.log(res.status, res.statusText)
  //   return res.json()
  // }).then(body => {
  //   console.log(body)
  // })
  console.log('render!')
  console.log(errors)
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
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <label htmlFor="username">Username</label>
        <input {...register("username", {
          required: true,
          minLength: 8,
        })} type="text" id="username"/>
        {errors.username?.type === 'required' && "username is required"}

        <br />
        <label htmlFor="email">Email</label>
        <input {...register("email", {
          required: true,
        })}  type="email" id="email" />
        {errors.email?.type === 'required' && "email is required"}

        <br />
        <label htmlFor="password">Password</label>
        <input
         type="password" id="password"
          {...register("password", {
            required: true,
            minLength: 8,
            validate: {
              includesAlphabet: v => /[a-zA-Z]/.test(v) || '알파벳을 포함해야 합니다.',
              includesNumber: v => /[0-9]/.test(v) || '숫자를 포함해야 합니다',
              includesSpecialCharacters: v => /[!?@#$%^&*():;+\-=~{}<>]/.test(v) || '특수문자를 포함해야 합니다',
            }
          })}
         />
        {errors.password?.type === 'required' && "password is required"}
        {errors.password?.type !== 'required' && errors.password?.message}
        <button type="submit">Submit</button>
      </form>
      </main>
    </div>
  )
}

export default SignUp
