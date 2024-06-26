FROM gradle:jdk18-alpine AS build
COPY ./gamebackend /buildFiles
WORKDIR /buildFiles
RUN gradle build --no-daemon -x test

FROM openjdk:18
EXPOSE 80
COPY --from=build /buildFiles/build/libs/VeloLiker-0.0.1-SNAPSHOT.jar ./spring-boot-application.jar
ENTRYPOINT ["java", "-Duser.timezone=UTC+1", "-jar","./spring-boot-application.jar"]
