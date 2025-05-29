from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import httpx
from pymongo import MongoClient
from typing import Dict
from bson import ObjectId

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
        # items = list(collection.find_one({}, {"_id": result.inserted_id}))
        return {"message": f"User {data.name} created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving user: {str(e)}")


@app.get("/get_latest_data_from_MongDB/{id}", response_model=ResumeFormData)

async def retrive_Data(id:str):
    try:
        item = collection.find_one({"_id": ObjectId(id)},{"_id":0})
        if not item:
            raise HTTPException(status_code=404, detail="Document not found")
        return item
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error retrieving data: {str(e)}")
    

# @app.post("/summary{id}", response_model=ResumeFormData)

# async def summary(id:str):

#     try:
#         item = collection.find_one({"_id": ObjectId(id)},{"_id":0})
#         url = "http://127.0.0.1:11434/api/generate"
#         prompt = f"Define professional summary in few line of provide information. The given information are: Name: {item.name}, Education: {item.education}, work experience: {item.experience}, Skills:{item.skill}."
#         payload = {
#             "model" :"llama3.2:1b",
#             "prompt" : prompt,
#             "stream" : False
#         }
    
#         async with httpx.AsyncClient() as client:
#             response = await client.post(url, json=payload, timeout=timeout)
#             print(response)
#             print(response.text)

#         return {"status": "Response received", "ollama_response": response.json()}        
        
#     except Exception as e:
#         raise HTTPException(status_code=500,detail=f"Error retrieving data: {str(e)}")
    


      

if __name__ == "__main__":
    uvicorn.run(app,host="10.224.1.107",port=8001)