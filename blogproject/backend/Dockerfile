FROM python:3.12-slim

RUN apt-get update && apt-get install -y tk

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

