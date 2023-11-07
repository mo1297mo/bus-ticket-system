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