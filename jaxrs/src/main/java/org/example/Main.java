package org.example;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import jakarta.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;
import java.net.URI;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        ResourceConfig rc = new ResourceConfig()
    .register(BookResource.class)
    .register(org.glassfish.jersey.jackson.JacksonFeature.class)
    .register((ContainerResponseFilter) (requestContext, responseContext) -> {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
    });

        HttpServer server = GrizzlyHttpServerFactory.createHttpServer(
                URI.create("http://0.0.0.0:8080/")
, rc
        );

        System.out.println("B szerver megy: http://0.0.0.0:8080/");


    }
}


