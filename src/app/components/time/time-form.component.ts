import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { Integrante } from '../../models/integrante.model';
import { Team } from '../../models/time.model';
import { ComposicaoTime } from '../../models/composicao-time.model';  // Adicionando o novo modelo

import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'composicao', 'data'];
  
  team: Team = {
    data: new Date().toISOString().split('T')[0],
    composicao: []
  };

  isEdit = false;
  loading = false;

  integrantesDisponiveis: Integrante[] = [];
  integrantesSelecionados: Integrante[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.loadTeam(+id);
    }

    this.loadIntegrantes();
  }

  loadTeam(id: number) {
    this.loading = true;
    this.apiService.getTeam(id).subscribe({
      next: (team) => {
        this.team = team;
        this.integrantesSelecionados = team.composicao.map(composicao => composicao.integrante);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  loadIntegrantes() {
    this.apiService.getIntegrantes().subscribe(integrantes => {
      this.integrantesDisponiveis = integrantes;
    });
  }

  saveTeam() {
    this.team.composicao = this.integrantesSelecionados.map(integrante => ({
      time: { id: this.team.id! },  
      integrante: integrante  
    }));
  
    this.loading = true;
  
    const action = this.apiService.createTeam(this.team); 
  
    action.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/teams']); 
      },
      error: (error) =>{
        this.loading = false
        this.showError(error);
      },
    });
  }
  
  
  toggleIntegrante(integrante: Integrante) {
    const index = this.integrantesSelecionados.findIndex(i => i.id === integrante.id);
    if (index === -1) {
      this.integrantesSelecionados.push(integrante);
    } else {
      this.integrantesSelecionados.splice(index, 1);
    }
  }

  isSelected(integrante: Integrante): boolean {
    return this.integrantesSelecionados.some(i => i.id === integrante.id);
  }

  private showError(error: Error) {
    this.snackBar.open(error.message, 'Fechar', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
