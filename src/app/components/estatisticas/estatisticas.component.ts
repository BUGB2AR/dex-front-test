import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { FranquiaMaisFamosa } from '../../models/franquia.mais.famosa';
import { ContagemPorFranquia } from '../../models/contagem.por.franquia.model';
import { FuncaoMaisComum } from '../../models/funcao.mais.comum.model';
import { TimeDaData } from '../../models/time.da.data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.scss']
})
export class EstatisticasComponent {
  data: Date = new Date();
  dataInicial: Date | null = null;
  dataFinal: Date | null = null;
  
  timeDaData: TimeDaData | null = null;
  funcaoMaisComum: FuncaoMaisComum | null = null;
  contagemPorFranquia: ContagemPorFranquia | null = null;
  franquiaMaisFamosa: FranquiaMaisFamosa | null = null;
  
  loading = false;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  private formatarDataParaAPI(date: Date | null): string | undefined {
    if (!date) return undefined;
    return date.toISOString().split('T')[0];
  }

  buscarTimeDaData() {
    this.loading = true;
    const dataFormatada = this.formatarDataParaAPI(this.data);
    
    if (!dataFormatada) {
      this.snackBar.open('Data inválida', 'Fechar', { duration: 3000 });
      this.loading = false;
      return;
    }

    this.apiService.getTeamDaData(dataFormatada).subscribe({
      next: (result) => {
        this.timeDaData = result;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  buscarFuncaoMaisComum() {
    this.loading = true;
    const dataInicial = this.formatarDataParaAPI(this.dataInicial);
    const dataFinal = this.formatarDataParaAPI(this.dataFinal);
    
    this.apiService.getFuncaoMaisComum(dataInicial, dataFinal).subscribe({
      next: (result) => {
        this.funcaoMaisComum = result;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  buscarContagemPorFranquia() {
    this.loading = true;
    const dataInicial = this.formatarDataParaAPI(this.dataInicial);
    const dataFinal = this.formatarDataParaAPI(this.dataFinal);
    
    this.apiService.getContagemPorFranquia(dataInicial, dataFinal).subscribe({
      next: (result) => {
        this.contagemPorFranquia = result;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      }
    });
  }

  buscarFranquiaMaisFamosa() {
    const dataInicial = this.formatarDataParaAPI(this.dataInicial);
    const dataFinal = this.formatarDataParaAPI(this.dataFinal);
    
    if (!dataInicial || !dataFinal) {
      this.snackBar.open('Por favor, informe ambas as datas para esta consulta', 'Fechar', { duration: 3000 });
      return;
    }
    
    this.loading = true;
    this.apiService.getFranquiaMaisFamosa(dataInicial, dataFinal).subscribe({
      next: (result) => {
        this.franquiaMaisFamosa = result;
        this.loading = false;
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