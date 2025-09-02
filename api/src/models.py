from pydantic import BaseModel
from typing import Optional, Union, List

class Filter(BaseModel):
    column: str
    type: str 
    logic: str
    value: Union[bool, int, str]

class Sort(BaseModel):
    columns: List[str] 
    directions: List[str]

class SearchBody(BaseModel):
    search: Optional[str] = None 
    filters: Optional[List[Filter]] = None
    sort: Optional[Sort] = None
    page: int
    limit: int


class User(BaseModel):
    seq: int
    firstName: str
    lastName: str
    age: int
    street: str
    city: str
    state: str
    latitude: int
    longitude: int
    ccnumber: int

class ResponseModel(BaseModel): 
    rows:  List[User]
    page: int
    limit: int
    total: int