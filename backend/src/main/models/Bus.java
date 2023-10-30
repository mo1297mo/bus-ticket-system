package bus.backend.models;

@Entity
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Route route;
    private LocalTime departureTime;

    // getters and setters

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public Long getId() {
        return id;
    }

    public Route getRoute() {
        return route;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

}