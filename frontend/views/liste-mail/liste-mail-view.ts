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
import { ComboBox } from '@vaadin/combo-box';


class Personne { // Temporaire (uniquement la pour avoir des données statiques)
  prenom: string;
  nom:string;
  nickname?:string;
  email:string;
  appelation: string;

  constructor(p:string,n:string,e:string, ni?:string) {
    this.prenom = p;
    this.nom = n;
    this.nickname = ni;
    this.email = e;
    if (ni) {
      this.appelation = p+' ('+ni+') '+n;
    } else {
      this.appelation = p+' '+n
    }
  }
}



@customElement('liste-mail-view')
export class ListeMailView extends View {
  name = '';
  person1 = new Personne("Hugo","Roussillon","hugo@roussillon.com","hugo");
  person2 = new Personne("Matthieu","Manginot","matthieu@manginot.com","matthieu");
  person3 = new Personne("Personne","De test","Personne.Detest@mail.com");

  persons: Personne[] = [this.person1,this.person2,this.person3];
  
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
  recherche_copier = translate("recherche.copier");
  recherche_exporter = translate("recherche.exporter");

  //variable pour informations du coin de la grille
  prenom = translate("grille-resultat.prenom");
  nom = translate("grille-resultat.nom");
  nickname = translate("grille-resultat.nickname");
  email = translate("grille-resultat.email");

  
  @state()
  private items: readonly Personne[] = [];
  
  @state()
  private selectedPersons: Personne[] = [];
  
  
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
        <div class="toolbar flex gap-s w-full items-end">
          <vaadin-combo-box 
            label="${this.recherche_barre}" 
            .items="${this.persons}" 
            item-label-path="appelation" 
            item-value-path="email"
            class="w-full"
            @change="${this.selectPerson}"
            
            
          >
          <!-- clear-button-visible -->
          </vaadin-combo-box>
          <vaadin-button 
            theme="primary"
            @click="${() => this.copyToClipboard(this.selectedPersons)}"
          >
            ${this.recherche_copier}
          </vaadin-button>

          <vaadin-button 
            theme="primary"
            @click="${() => this.ExportToCSV(this.selectedPersons)}"
          >
            ${this.recherche_exporter}
          </vaadin-button>
        </div>
        
        <vaadin-horizontal-layout style="flex-wrap: wrap" theme="spacing">
          ${repeat(
          this.selectedPersons,
          (Person) => Person.email,
          (Person) => html`
            <span theme="badge pill contrast">
              <span>${Person.email}</span>
              <vaadin-button
                theme="contrast tertiary-inline"
                style="margin-inline-start: var(--lumo-space-xs)"
                @click="${() => this.deletePerson(Person)}"
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

  private selectPerson({target}:Event){
    var { selectedItem } = target as ComboBox;
    if (selectedItem == null) {
      return;
    }
    if (!this.selectedPersons.includes(selectedItem as Personne)) {
      this.selectedPersons = [...this.selectedPersons, selectedItem as Personne];
      //vider le champ de recherche
      (target as ComboBox).selectedItem = null;
    }
    
  }
  
  private deletePerson(person:Personne) {
    if (person) {
      this.selectedPersons = this.selectedPersons.filter((p) => p !== person);
    }
  }

  private copyToClipboard(tabToCopy: Personne[]){
    const aCopier = this.changePersonTabToMailTab(tabToCopy);
    const textarea = document.createElement("textarea");
    textarea.value = aCopier.toString();
    textarea.style.position = "absolute";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    this.notifyUser("Copié dans le pesse-papier", "success");

  }

  private changePersonTabToMailTab(tabPersons: Personne[]){
    var tabMail:string[] = [];
    tabPersons.forEach(person => {
      tabMail.push(person.email);
    });
    return tabMail;
  }

  private createCSVArray(tabPersons: Personne[]){
    var tabCSV:string[][] = [];
    var introLine = ['PRENOM','NICKNAME','NOM','EMAIL'];
    tabCSV.push(introLine);
    tabPersons.forEach(person => {
      var temp = [person.prenom + ',' +person.nickname + ',' +person.nom + ',' +person.email];
      tabCSV.push(temp);
    });
    return tabCSV;
  }

  private ExportToCSV(tabPersons:Personne[]){
    var finalTab = this.createCSVArray(tabPersons);
    var CsvString = "";
    finalTab.forEach(function(RowItem, RowIndex) {
      RowItem.forEach(function(ColItem, ColIndex) {
        CsvString += ColItem + ',';
      });
      CsvString += "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString );
    x.setAttribute("download","ListeMail.csv");
    document.body.appendChild(x);
    x.click();

    this.notifyUser("Exporté au format CSV", "success");
  };


  private notifyUser(message:string, type:string){
    const notification = Notification.show(message,{
      position:'middle',
    });
    notification.setAttribute('theme',type);
  }
  
}
