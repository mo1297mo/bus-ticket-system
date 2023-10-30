package bus.backend.repositories;

public interface BusRepository extends JpaRepository<Bus, Long> {
    List<Bus> findByRoute(Route route);
}
