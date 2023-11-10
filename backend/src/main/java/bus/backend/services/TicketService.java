package bus.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import bus.backend.models.Bus;
import bus.backend.models.Route;
import bus.backend.models.Ticket;
import bus.backend.models.TicketDTO;
import bus.backend.repositories.BusRepository;
import bus.backend.repositories.RouteRepository;
import bus.backend.repositories.TicketRepository;

import javax.annotation.PostConstruct;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class TicketService {

    @Autowired
    private RouteRepository routeRepo;

    @Autowired
    private BusRepository busRepo;

    @Autowired
    private TicketRepository ticketRepo;

    @Value("${twilio.account_sid}")
    private String twilioAccountSid;

    @Value("${twilio.auth_token}")
    private String twilioAuthToken;

    @Value("${twilio.phone_number}")
    private String twilioPhoneNumber;

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    @PostConstruct
    public void init() {
        Twilio.init(twilioAccountSid, twilioAuthToken);
    }

    // Book a ticket
    public Ticket bookTicket(TicketDTO ticketDTO) {
        Bus bus = busRepo.findById(ticketDTO.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Route route = routeRepo.findById(ticketDTO.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route not found"));

        if (!bus.getRoute().equals(route)) {
            throw new RuntimeException("Bus is not associated with the route");
        }

        Ticket ticket = new Ticket();
        ticket.setId(generateTicketId());
        ticket.setBus(bus);
        ticket.setEmail(ticketDTO.getUserEmail());
        ticket.setUsername(ticketDTO.getUserName());
        ticket.setPhoneNumber(ticketDTO.getPhoneNumber());
        ticket.setBookingDate(LocalDate.now());

        Ticket savedTicket = ticketRepo.save(ticket);

        // After saving the ticket, send an SMS
        sendSmsTicketConfirmation(savedTicket.getPhoneNumber(), savedTicket.getId());

        return savedTicket;
    }

    // Generate an 8-digit alphanumeric ID
    private String generateTicketId() {
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            sb.append(ALPHANUMERIC_STRING.charAt(RANDOM.nextInt(ALPHANUMERIC_STRING.length())));
        }
        return sb.toString();
    }

    // Get available buses for a given route
    public List<Bus> getBusesForRoute(Long routeId) {
        return busRepo.findByRouteId(routeId);
    }

    public List<Route> getAllRoutes() {
        return routeRepo.findAll();
    }

    public TicketDTO getTicketDetails(String ticketId) {
        Optional<Ticket> ticketOptional = ticketRepo.findById(ticketId); // Use ticketRepo instance
        if (ticketOptional.isEmpty()) {
            throw new RuntimeException("Ticket not found with id: " + ticketId);
        }

        Ticket ticket = ticketOptional.get();
        Bus bus = ticket.getBus();
        Route route = bus.getRoute();

        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId()); // Assuming there's a setter for ID in TicketDTO
        dto.setBusId(bus.getId());
        dto.setRouteId(route.getId());
        dto.setUserEmail(ticket.getEmail());
        dto.setUserName(ticket.getUsername());
        dto.setPhoneNumber(ticket.getPhoneNumber());
        // Assuming you have setters for the following fields in TicketDTO
        dto.setSourceCity(route.getSourceCity());
        dto.setDestinationCity(route.getDestinationCity());
        dto.setDepartureTime(bus.getDepartureTime());
        dto.setBookingDate(ticket.getBookingDate());

        return dto;
    }



    // Cancel a ticket
    public boolean cancelTicket(String id) {
        try {
            if (ticketRepo.existsById(id)) {
                ticketRepo.deleteById(id);
                return true;
            } else {
                System.err.println("Ticket with ID: " + id + " does not exist.");
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error during the cancellation of ticket with ID: " + id);
            e.printStackTrace();
            return false;
        }
    }




    // Send SMS Ticket Confirmation
    private void sendSmsTicketConfirmation(String userPhoneNumber, String ticketId) {
        if (userPhoneNumber == null || ticketId == null) {
            System.err.println("Failed to send SMS: User phone number or ticket ID is null.");
            return; // Exit the method if there is nothing to send
        }

        try {
            String messageBody = "Thank you for booking with us. Your Ticket ID is: " + ticketId;
            Message message = Message.creator(
                    new PhoneNumber(userPhoneNumber),
                    new PhoneNumber(twilioPhoneNumber),
                    messageBody
            ).create();

            System.out.println("Sent message with ID: " + message.getSid());
        } catch (Exception e) {
            System.err.println("Error sending SMS: " + e.getMessage());
            e.printStackTrace();
        }
    }


    // Other methods as required...
}
