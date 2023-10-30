package bus.backend.data;

import bus.backend.models.Bus;
import bus.backend.models.Route;
import bus.backend.repositories.BusRepository;
import bus.backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private BusRepository busRepository;

    @Override
    public void run(String... args) {
        // Check if data already exists, if not then populate
        if (routeRepository.count() == 0 && busRepository.count() == 0) {
            initializeRoutesAndBuses();
        }
    }

    private void initializeRoutesAndBuses() {
        Route route1 = new Route();
        route1.setSourceCity("Berlin");
        route1.setDestinationCity("Hamburg");
        routeRepository.save(route1);

        Route route2 = new Route();
        route2.setSourceCity("Hamburg");
        route2.setDestinationCity("Berlin");
        routeRepository.save(route2);

        for (int i = 0; i < 10; i++) {
            Bus bus1 = new Bus();
            bus1.setRoute(route1);
            bus1.setDepartureTime(LocalTime.of(8 + i, 0)); // Setting the departure times starting from 8:00, 9:00, and
                                                           // so on.
            busRepository.save(bus1);

            Bus bus2 = new Bus();
            bus2.setRoute(route2);
            bus2.setDepartureTime(LocalTime.of(8 + i, 0));
            busRepository.save(bus2);
        }
    }
}
