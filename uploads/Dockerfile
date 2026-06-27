FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl

USER root

COPY . /app

WORKDIR /app

CMD ["bash"]