from fastapi.testclient import TestClient

from main import app
from models import Filter
import os

client = TestClient(app)

filters = [
    {"column": "age", "type": "num", "logic": "==", "value": 30},
    {"column": "firstName", "type": "text", "logic": "contains", "value": "charlott"}
]

sort = {
    "columns": ["lastName"],
    "directions": ["desc"]
}

headers = {
    "Content-Type": "application/json"
}


def test_search_filter():

    body = {
        "filters": filters,
        "page": 0,
        "limit": 10
    }

    response = client.put("/search/", json=body, headers=headers)

    assert response.status_code == 200
    assert response.json()['total'] == 3
    assert response.json()['rows'][0]['seq'] == 71074


def test_search_sort():

    body = {
        "filters": filters,
        "sort": sort,
        "page": 0,
        "limit": 10
    }

    response = client.put("/search/", json=body, headers=headers)

    assert response.status_code == 200
    assert response.json()['total'] == 3
    assert response.json()['rows'][0]['seq'] == 97582


def test_search_freetext():

    body = {
        "search": "arr",
        "filters": filters,
        "sort": sort,
        "page": 0,
        "limit": 10
    }

    response = client.put("/search/", json=body, headers=headers)

    assert response.status_code == 200
    assert response.json()['total'] == 1
    assert response.json()['rows'][0]['seq'] == 71074