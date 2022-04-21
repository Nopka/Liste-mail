package fr.univlorraine.listemail.domain.service;

import fr.univlorraine.listemail.domain.repository.PersonneRepository;

//va implementer la classe PersonneService
public class DomainPersonneService implements PersonneService {
    private final PersonneRepository personneRepository;

    public DomainPersonneService(final PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    @Override
    public String getTest() {
        
        return personneRepository.getTest();
    }
}
