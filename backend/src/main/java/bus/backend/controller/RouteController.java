package bus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bus.backend.services.TicketService;
import bus.backend.models.Bus;
import bus.backend.models.Route;

@CrossOrigin(origins = { "http://localhost:3000", "http://138.197.185.210:3000" })
@RestController
@RequestMapping("/api/routes")
public class RouteController {
    @Autowired
    private TicketService service;

    @GetMapping
    public List<Route> getAllRoutes() {
        return service.getAllRoutes();
    }

    @GetMapping("/{routeId}/buses")
    public List<Bus> getBusesForRoute(@PathVariable Long routeId) {
        return service.getBusesForRoute(routeId);
    }
}