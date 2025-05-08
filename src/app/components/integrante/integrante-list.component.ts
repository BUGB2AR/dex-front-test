import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { Integrante } from '../../models/integrante.model';


@Component({
  selector: 'app-integrante-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './integrante-list.component.html',
  styleUrls: ['./integrante-list.component.scss']
})
export class IntegranteListComponent {
  displayedColumns: string[] = ['id', 'nome', 'franquia', 'funcao', 'actions'];
  dataSource: Integrante[] = [];
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadIntegrantes();
  }

  loadIntegrantes() {
    this.loading = true;
    this.apiService.getIntegrantes().subscribe({
      next: (integrantes) => {
        this.dataSource = integrantes;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}