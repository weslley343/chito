require('dotenv').config()
import jwt from 'jsonwebtoken';

export const generateTokens = (username: string) => {
    const acetoken = jwt.sign({ "username": username, "token": "acetoken" }, process.env.SECRET_JWT + "", { expiresIn: 43200 })
    const reftoken = jwt.sign({ "username": username, "token": "reftoken" }, process.env.SECRET_JWT + "", { expiresIn: "3d" })
    return [acetoken, reftoken]
}
