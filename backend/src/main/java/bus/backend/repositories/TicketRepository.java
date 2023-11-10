package bus.backend.repositories;

import bus.backend.models.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import bus.backend.models.Ticket;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {

}