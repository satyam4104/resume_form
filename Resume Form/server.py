from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import httpx
from pymongo import MongoClient

timeout =50.0

app = FastAPI()

class ResumeFormData(BaseModel) :
    name :str
    email: str
    phone_no: str
    address:str
    education: str
    skill: str
    experience: str
    project: str

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods =["*"],
    allow_headers = ["*"]
)

client = MongoClient("mongodb://localhost:27017")
db = client["Resume_data"]
collection = db["users"]

@app.post("/save_data_to_MongDB")

async def save_data(data: ResumeFormData):

    try:
        print(data)
        print("test123")
        result = collection.insert_one(data.model_dump())
        return {"message": f"User {data.name} created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving user: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app,host="10.224.1.107",port=8001)