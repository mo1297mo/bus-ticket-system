package bus.backend.controllers;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService service;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody Ticket ticket) {
        return service.bookTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getTickets() {
        return service.getAllTickets();
    }

    @DeleteMapping("/{ticketId}")
    public void cancelTicket(@PathVariable Long ticketId) {
        service.cancelTicket(ticketId);
    }
}