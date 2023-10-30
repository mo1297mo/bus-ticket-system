package bus.backend.services;

@Service
public class TicketService {
    @Autowired
    private RouteRepository routeRepo;
    @Autowired
    private BusRepository busRepo;
    @Autowired
    private TicketRepository ticketRepo;

    // bookTicket,

    // getAvailableBuses, etc.
}
