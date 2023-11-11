package bus.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import bus.backend.models.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bus.backend.models.Ticket;
import bus.backend.services.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService service;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody TicketDTO ticket) {
        return service.bookTicket(ticket);
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<?> getTicketDetails(@PathVariable String ticketId) {
        try {
            TicketDTO ticketDTO = service.getTicketDetails(ticketId);
            return ResponseEntity.ok(ticketDTO);
        } catch (RuntimeException ex) {
            // Create a response body that your front-end expects
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", HttpStatus.NOT_FOUND.value());
            errorResponse.put("error", "Ticket not found with id: " + ticketId);
            // Return a ResponseEntity with the custom error response and HTTP status code
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }


    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelTicket(@PathVariable String id) {
        boolean isCancelled = service.cancelTicket(id);
        if (isCancelled) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}