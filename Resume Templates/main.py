from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uvicorn
import httpx

timeout = 70.0

app = FastAPI()

class ResumeFormData(BaseModel):
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


model = 'llama3.2:1b'
# model = 'mistral:7b'

@app.post("/transfer")

async def SendData( data: ResumeFormData):
    try:
        print(data)  # Log received data
        print(data.name)
        return {"message": "Data received successfully", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.post("/summary")

async def summary(data: ResumeFormData):
    url = "http://127.0.0.1:11434/api/generate"
    prompt = f"Define professional summary in few line of provide information. The given information are: Name: {data.name}, Education: {data.education}, work experience: {data.experience}, Skills:{data.skill}. Provide summary only."
    payload = {
        "model" : model,
        "prompt" : prompt,
        
        "stream" : False
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, timeout=timeout)
        print(response)
        print(response.text)

        return {"status": "Response received", "ollama_response": response.json()}
        

@app.post("/work_experience")

async def summary(data: ResumeFormData):
    url = "http://127.0.0.1:11434/api/generate"
    prompt = f"Generate a work experience summary to fit in resume format from provided information. The given information are: work experience: {data.experience}, Skills:{data.skill}. Provide summary only."
    payload = {
        "model" : model,
        "prompt" : prompt,
        "stream" : False
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, timeout=timeout)
        print(response)
        print(response.text)

        return {"status": "Response received", "ollama_response": response.json()}



@app.post("/education")

async def summary(data: ResumeFormData):
    url = "http://127.0.0.1:11434/api/generate"
    prompt = f"Define summary in resume format for education details. The given education details are: Name: {data.name}, Education: {data.education}. Provide summary only."
    payload = {
        "model" : model,
        "prompt" : prompt,
        "stream" : False
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, timeout=timeout)
        print(response)
        print(response.text)

        return {"status": "Response received", "ollama_response": response.json()}


@app.post("/skill_project")

async def summary(data: ResumeFormData):
    url = "http://127.0.0.1:11434/api/generate"
    prompt = f"Give summary of projects and showcase the skill develop through these projects. The given information are:  work experience: {data.experience}, Skills:{data.skill}, Projects: {data.project}. Provide summary only."
    payload = {
        "model" : model,
        "prompt" : prompt,
        "stream" : False
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, timeout=timeout)
        print(response)
        print(response.text)

        return {"status": "Response received", "ollama_response": response.json()}














if __name__ == "__main__":
    uvicorn.run(app,host="10.224.1.107",port=8000)

