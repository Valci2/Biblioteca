# ==========================================
# Desenvolvimento
# ==========================================
FROM eclipse-temurin:21-jdk AS dev

WORKDIR /app

COPY .mvn .mvn
COPY mvnw pom.xml ./

RUN chmod +x mvnw

# Baixa as dependências e aproveita o cache
RUN ./mvnw dependency:go-offline

COPY src src

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]


# ==========================================
# Build
# ==========================================
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

COPY .mvn .mvn
COPY mvnw pom.xml ./

RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests


# ==========================================
# Produção
# ==========================================
FROM eclipse-temurin:21-jre AS prod

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]