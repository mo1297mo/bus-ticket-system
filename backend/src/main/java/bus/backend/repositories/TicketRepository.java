package bus.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import bus.backend.models.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, String> {
}