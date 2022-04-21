// import { crmStore } from 'Frontend/stores/app-store';
import { makeAutoObservable, observable } from 'mobx';


class Personne { // Temporaire (uniquement la pour avoir des données statiques)
    prenom: string;
    nom:string;
    nickname:string;
    email:string;
  
    constructor(p:string,n:string,ni:string,e:string) {
      this.prenom = p;
      this.nom = n;
      this.nickname = ni;
      this.email = e;
    }
}

class ListeMailStore {
    selectedContact: Personne | null = null;

    constructor() {
        makeAutoObservable(
            this,
            {selectedContact: observable.ref},
            { autoBind: true }
        );
    }

    setSelectedContact(contact: Personne) {
        this.selectedContact = contact;
    }

}

export const listeMailStore = new ListeMailStore();