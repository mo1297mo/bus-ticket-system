package bus.backend.controllers;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/routes")
public class RouteController {
    @Autowired
    private TicketService service;

    @GetMapping("/{routeId}")
    public List<Bus> getBusesForRoute(@PathVariable Long routeId) {
        return service.getBusesForRoute(routeId);
    }
}