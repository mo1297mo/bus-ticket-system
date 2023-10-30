package bus.backend.controllers;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/buses")
public class BusController {
    @Autowired
    private TicketService service;

    @GetMapping("/{routeId}")
    public List<Bus> getBusesForRoute(@PathVariable Long routeId) {
        return service.getBusesForRoute(routeId);
    }
}