

require('dotenv').config()
import jwt from 'jsonwebtoken';

export const generateTokens = (id: string, username: string, type: string) => {
    const acetoken = jwt.sign({ "id": id, "username": username, "type": type, "token": "acetoken" }, process.env.SECRET_JWT + "", { expiresIn: 43200 })
    const reftoken = jwt.sign({ "id": id, "username": username, "type": type, "token": "reftoken" }, process.env.SECRET_JWT + "", { expiresIn: "3d" })
    return [acetoken, reftoken]
}