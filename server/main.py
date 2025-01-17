from fastapi import FastAPI, Depends, HTTPException, status, Request
from utils.response_model import HttpResponseModel
from pydantic import BaseModel
import json
from typing import Dict

app = FastAPI()   

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str
    email: str
    role: str
    permissions: list[str]

with open("database/users.json", "r") as file:
    fake_db = json.load(file)
    users = fake_db if fake_db else []

@app.get("/") 
async def main_route():     
  return {"message": "Hey, Server is running"}

@app.post("/new-user")
async def create_user(user: User):
    try:
      user = user.model_dump()
      new_user = user
      new_user["id"] = len(users) + 1
      users.append(new_user)
      with open("database/users.json", "w") as file:
          json.dump(users, file)
      return HttpResponseModel(is_successful=True, data={"user": new_user},status_code=status.HTTP_200_OK)
    except Exception as e:
       raise HttpResponseModel(is_successful=False, data="Something went wrong", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@app.get("/users")
async def get_users(request: Request):
    try:
        filters = dict(request.query_params)  # Extract query parameters as a dictionary
        print("filters", filters)
        desired_users = [
            user for user in users 
            if all(user.get(key) == value or (value.lower() in user["name"].lower()) for key, value in filters.items())
        ]

        if not desired_users:
            return {
                "is_successful": True,
                "data": {"users": []},
                "message": "No users matched the filters",
            }

        return HttpResponseModel(is_successful=True, data={"users": desired_users}, status_code=status.HTTP_200_OK)
    except Exception as e:
       raise HttpResponseModel(is_successful=False, data="Something went wrong", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@app.delete("/remove-user/{user_id}")
async def delete_user(user_id: int):
    try:
        user = [user for user in users if user["id"] == user_id]
        with open("database/users.json", "w") as file:
            json.dump(users, file)
        return HttpResponseModel(is_successful=True, data={"user": user}, status_code=status.HTTP_200_OK)
    except Exception as e:
       raise HttpResponseModel(is_successful=False, data="Something went wrong", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@app.patch("/patch-user/{user_id}")
async def patch_user(user_id: int, payload: Dict):
    try:
        user = [user for user in users if user["id"] == user_id]
        user[0]["role"] = payload["new_role"]
        with open("database/users.json", "w") as file:
            json.dump(users, file)
        return HttpResponseModel(is_successful=True, data={"user": user}, status_code=status.HTTP_200_OK)
    except Exception as e:
       raise HttpResponseModel(is_successful=False, data="Something went wrong", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)