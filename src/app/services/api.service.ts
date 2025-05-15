import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Integrante } from '../models/integrante.model';
import { Team } from '../models/time.model';
import { TimeDaData } from '../models/time.da.data.model';
import { FuncaoMaisComum } from '../models/funcao.mais.comum.model';
import { FranquiaMaisFamosa } from '../models/franquia.mais.famosa';
import { ContagemPorFranquia } from '../models/contagem.por.franquia.model';
import { TimeMaisComumDTO } from '../models/time-mais-comum';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getIntegrantes(): Observable<Integrante[]> {
    return this.http.get<Integrante[]>(`${this.API_URL}/integrantes`)
    .pipe(catchError(this.handleError));
  }

  getIntegrante(id: number): Observable<Integrante> {
    return this.http.get<Integrante>(`${this.API_URL}/integrantes/${id}`)
    .pipe(catchError(this.handleError));
  }

  createIntegrante(integrante: Integrante): Observable<Integrante> {
    return this.http.post<Integrante>(`${this.API_URL}/integrantes`, integrante)
    .pipe(catchError(this.handleError));
  }

  updateIntegrante(id: number, integrante: Integrante): Observable<Integrante> {
    return this.http.put<Integrante>(`${this.API_URL}/integrantes/${id}`, integrante)
    .pipe(catchError(this.handleError));
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.API_URL}/times`)
    .pipe(catchError(this.handleError));
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.API_URL}/times/${id}`)
    .pipe(catchError(this.handleError));
  }

  createTeam(Team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.API_URL}/times`, Team)
    .pipe(catchError(this.handleError));
  }

  getTeamDaData(data: string): Observable<TimeDaData> {
    return this.http.get<TimeDaData>(`${this.API_URL}/estatisticas/time-da-data?data=${data}`)
    .pipe(catchError(this.handleError));
  }

  getIntegranteMaisUsado(dataInicial?: string, dataFinal?: string): Observable<Integrante> {
    let url = `${this.API_URL}/estatisticas/integrante-mais-usado`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<Integrante>(url).pipe(catchError(this.handleError));
  }

  getTeamMaisComum(dataInicial?: string, dataFinal?: string): Observable<TimeMaisComumDTO[]> {
    let url = `${this.API_URL}/estatisticas/time-mais-comum-detalhado`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<TimeMaisComumDTO[]>(url).pipe(catchError(this.handleError));
  }
  
  getFuncaoMaisComum(dataInicial?: string, dataFinal?: string): Observable<FuncaoMaisComum> {
    let url = `${this.API_URL}/estatisticas/funcao-mais-comum`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<FuncaoMaisComum>(url).pipe(catchError(this.handleError));
  }

  getFranquiaMaisFamosa(dataInicial: string, dataFinal: string): Observable<FranquiaMaisFamosa> {
    return this.http.get<FranquiaMaisFamosa>(
      `${this.API_URL}/estatisticas/franquia-mais-famosa?dataInicial=${dataInicial}&dataFinal=${dataFinal}`
    ).pipe(catchError(this.handleError));
  }

  getContagemPorFranquia(dataInicial?: string, dataFinal?: string): Observable<ContagemPorFranquia> {
    let url = `${this.API_URL}/estatisticas/contagem-por-franquia`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<ContagemPorFranquia>(url).pipe(catchError(this.handleError));
  }

  getContagemPorFuncao(dataInicial?: string, dataFinal?: string): Observable<{quantidade: number}> {
    let url = `${this.API_URL}/estatisticas/contagem-por-funcao`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<{quantidade: number}>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 0) {
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  } 
}