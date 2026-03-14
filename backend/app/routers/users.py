from fastapi import APIRouter, HTTPExeption, status
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt 
from datetime import datetime, timedelta

router = APIRouter(prefrix='/auth', tags=['auth'])

# security step
context = CryptContext(schemes=['bcrypt'], deprecated='auto')
KEY = 'LFW_KEY_2025' 
ALGO = 'HS256'

# demo database
users_db = {}

class UserSchema(BaseModel):
    username: str
    password: str

@router.post('/signup')
def signup(user: UserSchema):
    if user.username in users_db:
        raise HTTPExeption(status_code=400, detail='username already exists!')
    
    hashed_pw = context.hash(user.password)
    users_db[user.username] = {'username': user.username, 'password': hashed_pw}
    return {'message': 'account created!'}

@router.post('/login')
def login(user: UserSchema):
    userDB = users_db.get(user.username)
    if not userDB or not context.verify(user.password, userDB['password']):
        raise HTTPExeption(status_code=401, detail='Invalid username or password')
    
    # creating jwt token
    token = jwt.encode({"sub": user.username}, KEY, algorithm=ALGO)
    return {"access_token": token, "token_type": "bearer"}