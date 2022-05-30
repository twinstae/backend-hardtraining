import type { NextPage } from 'next'
import { useForm } from "react-hook-form";

const createdUser = {
  "email": "twinstokki@gmail.com",
  "username": "tokkilumo",
  "bio": null,
  "image": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3aW5zdG9ra2lAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0b2traWx1bW8iLCJpYXQiOjE2NTM4NzE2MTUsImV4cCI6MTY1OTA1NTYxNX0.NgpwOJcZoglsCYFxpTvdcle7ygnqHI79Z9J6uAvymAU"
}

const SignUp: NextPage = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  // // 서버에 요청 보내기
  const API_ROOT = 'https://api.realworld.io/api';         
  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          // fetch(API_ROOT+'/users', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     user: data
          //   }),
          // }).then(res => {
          //   console.log(res.status, res.statusText)
          //   return res.json()
          // }).then(body => {
          //   console.log(body)
          // })
        })}>
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
          required: {
            value: true,
            message: '비밀번호는 필수입니다.'
          },
          minLength: {
            value: 8,
            message: '8자 이상이어야 합니다'
          },
          validate: {
            includesAlphabet: v => /[a-zA-Z]/.test(v) || '알파벳을 포함해야 합니다.',
            includesNumber: v => /[0-9]/.test(v) || '숫자를 포함해야 합니다',
            includesSpecialCharacters: v => /[!?@#$%^&*():;+\-=~{}<>]/.test(v) || '특수문자를 포함해야 합니다',
          }
        })}
        />
      {errors.password?.type && errors.password?.message}
      <button type="submit">Submit</button>
    </form>
  </>
  )
}

export default SignUp
