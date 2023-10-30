package bus.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bus.backend.models.Bus;
import bus.backend.models.Route;
import bus.backend.models.Ticket;
import bus.backend.repositories.BusRepository;
import bus.backend.repositories.RouteRepository;
import bus.backend.repositories.TicketRepository;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private RouteRepository routeRepo;

    @Autowired
    private BusRepository busRepo;

    @Autowired
    private TicketRepository ticketRepo;

    // Book a ticket
    public Ticket bookTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    // Get available buses for a given route
    public List<Bus> getBusesForRoute(Long routeId) {
        return busRepo.findByRouteId(routeId);
    }

    // Additional methods as required, e.g.:
    // - Cancel a ticket
    // - Get routes by some criteria
    // - Update a bus's information
    // - etc.
}
