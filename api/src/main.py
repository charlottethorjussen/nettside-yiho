from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, HTTPException, status
import pandas as pd
from .models import SearchBody, ResponseModel
from .logic import page_data, sort_data, search_name, filter_data

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = (r"./data/cve_data.json")


@app.put("/search/")
async def search(req: SearchBody):
        print(f"\n\nRequest: \n{req}.")
        df = pd.read_json(data)

        if req.search: 
            searched_data = search_name(df, req.search)
            df = searched_data
        
        if req.filters:
            filtered_data = filter_data(df, req.filters)
            df = filtered_data

        if req.sort:
            sorted_data = sort_data(df, req.sort)
            df = sorted_data

        paged_data = page_data(df, page=req.page, limit=req.limit)

        return {
            "rows": paged_data.to_dict(orient='records'),
            "limit": req.limit, 
            "total": len(df),
            "page": req.page
        }

@app.put("/advanced-search")
async def advanced_search(body):
    
    return body