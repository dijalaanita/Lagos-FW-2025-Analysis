from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Literal

router = APIRouter(prefix='/auth', tags=['auth'])

# Security
context = CryptContext(schemes=['bcrypt'], deprecated='auto')
KEY = 'LFW_KEY_2025'
ALGOR = 'HS256'
TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# In-memory demo database
users_db = {}

# --- Schemas ---

class UserSchema(BaseModel):
    username: str
    password: str
    role: Literal["designer", "student", "buyer"] = "student"

class LoginSchema(BaseModel):
    username: str
    password: str

# --- Helpers ---

def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, KEY, algorithm=ALGOR)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, KEY, algorithms=[ALGOR])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"username": username, "role": role}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")

# --- Routes ---

@router.post('/signup')
def signup(user: UserSchema):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail='Username already exists')

    hashed_pw = context.hash(user.password)
    users_db[user.username] = {
        'username': user.username,
        'password': hashed_pw,
        'role': user.role
    }
    return {'message': 'Account created! Please log in.'}


@router.post('/login')
def login(user: LoginSchema):
    userDB = users_db.get(user.username)
    if not userDB or not context.verify(user.password, userDB['password']):
        raise HTTPException(status_code=401, detail='Invalid username or password')

    token = create_token({
        "sub": user.username,
        "role": userDB["role"]
    })
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": userDB["role"],
        "username": user.username
    }


@router.get('/me')
def get_me(current_user: dict = Depends(get_current_user)):
    """Returns the currently logged-in user's info."""
    return current_user