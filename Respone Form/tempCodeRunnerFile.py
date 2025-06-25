from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Input model for the request
class QueryInput(BaseModel):
    query: str

# Output model for the response
class QueryResponse(BaseModel):
    message: str
    query: str

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers=  ["*"]

)

@app.post("/response_from_vb",response_model=QueryResponse)

async def retrive_Data(input_data: QueryInput):
    try:
        print(input_data.query)
        return {"message": "query received successfully", "query": query}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
    
    


if __name__ =="__main__":
    uvicorn.run(app, host= "10.224.1.107", port= 8005)