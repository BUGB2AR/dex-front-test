import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'estatisticas', pathMatch: 'full' },
  { 
    path: 'estatisticas', 
    loadComponent: () => import('./components/estatisticas/estatisticas.component').then(m => m.EstatisticasComponent) 
  },
  { 
    path: 'integrantes', 
    loadComponent: () => import('./components/integrante/integrante-list.component').then(m => m.IntegranteListComponent) 
  },
  { 
    path: 'integrantes/novo', 
    loadComponent: () => import('./components/integrante/integrante-form.component').then(m => m.IntegranteFormComponent) 
  },
  { 
    path: 'integrantes/:id', 
    loadComponent: () => import('./components/integrante/integrante-form.component').then(m => m.IntegranteFormComponent) 
  },
  { 
    path: 'times', 
    loadComponent: () => import('./components/time/time-list.component').then(m => m.TimeListComponent) 
  },
  { 
    path: 'times/novo', 
    loadComponent: () => import('./components/time/time-form.component').then(m => m.TeamFormComponent) 
  },
  { 
    path: 'times/:id', 
    loadComponent: () => import('./components/time/time-form.component').then(m => m.TeamFormComponent) 
  },
  { path: '**', redirectTo: 'estatisticas' }
];