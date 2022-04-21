import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import '@vaadin/select';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { router } from '../index';
import { views } from '../routes';
import { appStore } from '../stores/app-store';
import { Layout } from './view';
import { translate, use } from 'lit-translate';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  @state()
  private languages = [
    {
      label: "Français",
      value: "fr"
    },
    {
      label: "English",
      value: "en"
    }
  ];
  render() {
    return html`
      <vaadin-app-layout .drawerOpened="${false}">
        <header class="view-header" slot="navbar">
          <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
          <img src="images/favicon.ico" alt="favicon.png" class="univ-icon">
          <h1 class="view-title">${translate(appStore.currentViewTitle)}</h1>
        </header>
        <section class="drawer-section" slot="drawer">
          <nav aria-labelledby="views-title" class="menu-item-container">
            <ul class="navigation-list">
              ${this.getMenuRoutes().map(
                (viewRoute) => html`
                  <li>
                    <a
                      ?highlight=${viewRoute.path == appStore.location}
                      class="menu-item-link"
                      href=${router.urlForPath(viewRoute.path)}
                    >
                      <span class="${viewRoute.icon} menu-item-icon"></span>
                      <span class="menu-item-text">${translate(viewRoute.title)}</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </nav>
          <footer class="footer">
            <vaadin-select 
              label="Changer la langue" 
              .items="${this.languages}" 
              .value="${this.languages[0].value}"
              @change="${this.changeLanguage}">
            </vaadin-select>
          </footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  changeLanguage(e: Event){
    use((e.target as HTMLSelectElement).value);
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): RouteInfo[] {
    return views.filter((route) => route.title) as RouteInfo[];
  }
}
