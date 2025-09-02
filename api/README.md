# API

## Prerequisites

Before running the application, ensure you have [python](https://www.python.org/downloads/) installed

## Installation

1. From project root -> Navigate to the `api` folder

```bash
   cd api
```

2. Install the required Python packages by running the following command:

```bash
   pip install fastapi uvicorn[standard] pandas
```

## Running the api

To start the api locally, execute the following command in your terminal:

```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 80
```

## Testing


1. To run pytests, make sure you are in the `api` 
2. Install pytest: 
```bash
   pip install pytest
```
3. Run tests: 
```bash
pytest
```
OPS might remove the dot (.) from all local imports.