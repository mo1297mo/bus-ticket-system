package bus.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import bus.backend.models.Bus;

import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {

    // Method to find buses by their route's ID
    List<Bus> findByRouteId(Long routeId);
}
