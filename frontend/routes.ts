import { Route } from '@vaadin/router';
import { translate } from 'lit-translate';
import { LitElement, html } from "lit-element";
import './views/liste-mail/liste-mail-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  {
    path: '',
    component: 'liste-mail-view',
    icon: 'la la-envelope',
    title: "titre-app",
  },
  {
    path: 'aide',
    component: 'aide-view',
    icon: 'la la-life-saver',
    title: 'menu.aide',
    action: async (_context, _command) => {
      await import('./views/aide/aide-view');
      return;
    },
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-info',
    title: 'menu.a-propos',
    action: async (_context, _command) => {
      await import('./views/about/about-view');
      return;
    },
  },
  
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
