package bus.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bus.backend.models.Bus;
import bus.backend.models.Route;
import bus.backend.models.Ticket;
import bus.backend.models.TicketDTO;
import bus.backend.repositories.BusRepository;
import bus.backend.repositories.RouteRepository;
import bus.backend.repositories.TicketRepository;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private RouteRepository routeRepo;

    @Autowired
    private BusRepository busRepo;

    @Autowired
    private TicketRepository ticketRepo;

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    // Book a ticket

    public Ticket bookTicket(TicketDTO ticketDTO) {
        // Fetch the Bus entity using the busId from the TicketDTO
        Bus bus = busRepo.findById(ticketDTO.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        // Optional: Check if the bus is associated with the routeId from the TicketDTO
        Route route = routeRepo.findById(ticketDTO.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route not found"));
        if (!bus.getRoute().equals(route)) {
            throw new RuntimeException("Bus is not associated with the route");
        }

        // Create a new Ticket entity and set its properties
        Ticket ticket = new Ticket();
        ticket.setId(generateTicketId());
        ticket.setBus(bus);
        ticket.setEmail(ticketDTO.getUserEmail());
        ticket.setUsername(ticketDTO.getUserName());
        ticket.setBookingDate(LocalDate.now()); // Assuming the booking date is set to the current date

        // Save and return the new Ticket entity
        return ticketRepo.save(ticket);
    }

    // Get available buses for a given route
    public List<Bus> getBusesForRoute(Long routeId) {
        return busRepo.findByRouteId(routeId);
    }

    public List<Route> getAllRoutes() {
        return routeRepo.findAll();
    }

    // Generate an 8-digit alphanumeric ID
    private String generateTicketId() {
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            sb.append(ALPHANUMERIC_STRING.charAt(RANDOM.nextInt(ALPHANUMERIC_STRING.length())));
        }
        return sb.toString();
    }

    // Additional methods as required, e.g.:
    // - Cancel a ticket

}
