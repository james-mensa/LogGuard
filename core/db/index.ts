import userModel from './user/model'
import connection from './connection'
const User=userModel(connection)


export const Models={
    User
}