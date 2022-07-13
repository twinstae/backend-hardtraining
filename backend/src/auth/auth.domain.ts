
export const auth = {
    register({ id, password }){ 
        //패스워드의 길이가 10자 미만이면 던진다
        if (password.length < 10){
            throw new Error("invalid password min-length 10")
        }
        return {id, password}
    },


    login(){

    return 'token'
    }
}