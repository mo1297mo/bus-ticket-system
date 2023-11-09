package bus.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ConfigController {

    @Value("${cors.allowed-origins}")
    private String[] allowedOrigins;

    // Endpoint to return CORS allowed origins
    @GetMapping("/config/cors")
    public Map<String, String[]> getCorsConfig() {
        Map<String, String[]> config = new HashMap<>();
        config.put("allowedOrigins", allowedOrigins);
        return config;
    }
}


