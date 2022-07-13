import {auth} from './auth.domain';
import { describe, beforeAll, it, afterAll, expect } from 'vitest';


//   유저? 유저 목록?


//   회원가입
//   입력
//   id 와 비밀번호를 입력 그러면 id와-비번이 만들어짐.
//   출력
//   user가 만들어진다. 그리고 비밀번호는 해싱되어야한다

//   로그인
//   입력
//   id와 비멸번호
//   출력
//   새로운 토큰!

//   회원탈퇴
//   유저 목록에서 없앤다!
// `

describe('auth domain', () => {
  describe('register', () => { 
    it('register, id와 10자 이상의 password가 주어지면, user를 생성할 수 있다', () => {
      const user = auth.register({
        id : 'antarticPenguin',
        password: '0123456789'
      })

      expect(user.id).toEqual('antarticPenguin')
    })

    it('register, id와 10자 미만의 password가 주어지면, user를 생성할 수 없다!', () => {
      const error = () => {
        auth.register({
          id : 'antarticPenguin',
          password: '123456789'
        })
      }
      
      expect(error).toThrow("invalid password min-length 10")
    })
  })

  describe('Login', () => { 
    it('Login, ID와 비밀번호를 입력하면, 새로운 토큰이 발급된다', () => {
      const user = auth.login()
      expect(user).toEqual('token')
    })

  
  })


})