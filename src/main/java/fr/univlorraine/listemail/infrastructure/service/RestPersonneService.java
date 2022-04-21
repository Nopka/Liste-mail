package fr.univlorraine.listemail.infrastructure.service;

import org.springframework.stereotype.Component;
import fr.univlorraine.listemail.domain.repository.PersonneRepository;

@Component
public class RestPersonneService implements PersonneRepository{

    @Override
    public String getTest() {
        String test = "champ de test";
        return test;
    }

    
    
}
