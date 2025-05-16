import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Integrante } from '../../models/integrante.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-integrante-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatAutocompleteModule
  ],
  templateUrl: './integrante-form.component.html',
  styleUrls: ['./integrante-form.component.scss']
})
export class IntegranteFormComponent implements OnInit {
  integrante: Integrante = {
    nome: '',
    franquia: '',
    funcao: ''
  };
  isEdit = false;
  loading = false;

  funcoes = ['Desenvolvedor', 'Designer', 'Gerente', 'QA', 'Scrum Master'];

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
      this.loadIntegrante(id);
    }
  }

  loadIntegrante(id: number) {
    this.loading = true;
    this.apiService.getIntegrante(id).subscribe({
      next: (integrante) => {
        this.integrante = integrante;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  saveIntegrante() {
    this.loading = true;
    this.apiService.createIntegrante(this.integrante).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/integrantes']);
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  private showError(error: Error) {
    this.snackBar.open(error.message, 'Fechar', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}