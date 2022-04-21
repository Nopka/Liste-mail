import '@vaadin/button';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import { translate } from 'lit-translate';

//pour la vue avec grid
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';

//pour la vue avec combo box et badges
import '@vaadin/combo-box';
import '@vaadin/vertical-layout';
import '@vaadin/horizontal-layout';
import { repeat } from 'lit/directives/repeat.js';
import { Button } from '@vaadin/button';


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

type Person = string;

@customElement('liste-mail-view')
export class ListeMailView extends View {
  name = '';
  person1 = new Personne("Hugo","Roussillon","hugo","hugo@roussillon.com"); //creation des données statiques
  person2 = new Personne("Matthieu","Manginot","matthieu","matthieu@manginot.com");

  persons: Personne[] = [this.person1,this.person2];
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(
      'box-border',
      'flex',
      'flex-col',
      'p-m',
      'gap-s',
      'w-full',
      'h-full'
    );
  }

  //variables pour informations du coin de recherche
  recherche_barre = translate("recherche.barre");
  recherche_boutton = translate("recherche.boutton");

  //variable pour informations du coin de la grille
  prenom = translate("grille-resultat.prenom");
  nom = translate("grille-resultat.nom");
  nickname = translate("grille-resultat.nickname");
  email = translate("grille-resultat.email");

  
  @state()
  private items: readonly Personne[] = [];
  
  @state()
  private selectedPersons: readonly Personne[] = [];
  
  
  render() {
    // return html`
    //   <div class="toolbar flex gap-s">
    //   <vaadin-text-field aria-label="search" placeholder=${this.recherche_barre} clear-button-visible>
    //     <vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
    //   </vaadin-text-field>
    //     <vaadin-button>${this.recherche_boutton}</vaadin-button>
    //   </div>
    //   <div class="content flex gap-m h-full">
    //     <vaadin-grid class="grid h-full" .items=${this.persons} @active-item-changed=${this.handleGridSelection}>
    //       <vaadin-grid-column path="prenom" header=${this.prenom} auto-width> </vaadin-grid-column>
    //       <vaadin-grid-column path="nom" header=${this.nom} auto-width> </vaadin-grid-column>
    //       <vaadin-grid-column path="nickname" header=${this.nickname} auto-width> </vaadin-grid-column>
    //       <vaadin-grid-column path="email" header=${this.email} auto-width></vaadin-grid-column>
    //     </vaadin-grid>
    //   </div>
    // `;
    return html `
      <vaadin-vertical-layout theme="spacing">
        <vaadin-combo-box label="${this.recherche_barre}" .items="${this.persons}">
        </vaadin-combo-box>
        <vaadin-horizontal-layout style="flex-wrap: wrap" theme="spacing">
          ${repeat(
            this.selectedPersons,
            (email) => email,
            (email) => html`
              <span theme="badge pill contrast">
                <span>${email}</span>
                <vaadin-button
                  aria-label="Clear filter: ${email}"
                  data-email="${email}"
                  theme="contrast tertiary-inline"
                  title="Clear filter: ${email}"
                  style="margin-inline-start: var(--lumo-space-xs)"
                  @click="${this.onClick}"
                >
                  <vaadin-icon icon="vaadin:close-small"></vaadin-icon>
                </vaadin-button>
              </span>
            `
          )}
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
  }

  private onClick({ target }: Event) {
    
  }


  firstSelectionEvent = true;
  handleGridSelection(e: CustomEvent) {
    if (this.firstSelectionEvent) {
      this.firstSelectionEvent = false;
      return;
    }
    // listeMailStore.setSelectedContact(e.detail.value);
  }
  copyToClipboard(aCopier: string){
    const textarea = document.createElement("textarea");
    textarea.value = aCopier;
    textarea.style.position = "absolute";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  
}
