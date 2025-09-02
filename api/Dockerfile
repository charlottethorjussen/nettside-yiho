FROM python:3.12

RUN pip install --upgrade pip

WORKDIR /code

# COPY ./requirements.txt /code/requirements.txt
# RUN pip install -r requirements.txt

RUN pip install fastapi
RUN pip install "uvicorn[standard]"
RUN pip install pandas

COPY . /code/

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]