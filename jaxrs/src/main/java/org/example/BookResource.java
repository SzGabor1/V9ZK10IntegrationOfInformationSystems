package org.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.github.cdimascio.dotenv.Dotenv;
import org.bson.Document;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/books")
public class BookResource {
    private final MongoCollection<Document> books;

public BookResource() {
    String mongoUrl = System.getenv("MONGO_URL");
    if (mongoUrl == null) {
        throw new IllegalStateException("MONGO_URL environment variable is not set!");
    }
    
    MongoClient mongo = MongoClients.create(mongoUrl);
    MongoDatabase db = mongo.getDatabase("library");
    books = db.getCollection("books");
}


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> getBooks() {
        List<Book> result = new ArrayList<>();
        books.find().forEach(doc -> {
            Book b = new Book();
            b.title = doc.getString("title");
            b.authors = (List<String>) doc.get("authors");
            b.publisher = doc.getString("publisher");
            b.year = doc.getInteger("year");
            result.add(b);
        });
        return result;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(Book book) {
        Document doc = new Document()
                .append("title", book.title)
                .append("authors", book.authors)
                .append("publisher", book.publisher)
                .append("year", book.year);
        books.insertOne(doc);
        return Response.ok().build();
    }
}
