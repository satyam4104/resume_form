from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uvicorn
import httpx

timeout = 50.0

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
    prompt = f"Define professional summary in few line of provide information. The given information are: Name: {data.name}, Education: {data.education}, work experience: {data.experience}, Skills:{data.skill}."
    payload = {
        "model" :"llama3.2:1b",
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

