package bus.backend.controller;

import java.util.List;

import bus.backend.models.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService service;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody TicketDTO ticket) {
        return service.bookTicket(ticket);
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