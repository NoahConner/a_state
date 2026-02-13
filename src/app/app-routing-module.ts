import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';

const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'contact', component: Contact },

  // Spanish
  {
    path: 'es',
    children: [{ path: 'contacto', component: Contact }],
  },

  // Wildcard must always be last
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routeTranslations: Record<string, Record<string, string>> = {
  contact: {
    en: 'contact',
    es: 'contacto',
  },
  about: {
    en: 'about',
    es: 'acerca',
  },
};
