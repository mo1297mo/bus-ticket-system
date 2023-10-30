package bus.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import bus.backend.models.Route;

public interface RouteRepository extends JpaRepository<Route, Long> {
}
