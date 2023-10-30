package bus.backend.models;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sourceCity;
    private String destinationCity;

    // getters and setters

    public String getDestinationCity() {
        return destinationCity;
    }

    public Long getId() {
        return id;
    }

    public String getSourceCity() {
        return sourceCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSourceCity(String sourceCity) {
        this.sourceCity = sourceCity;
    }
}
