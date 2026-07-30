FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY cloudforge ./cloudforge

WORKDIR /app/cloudforge

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/cloudforge/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
