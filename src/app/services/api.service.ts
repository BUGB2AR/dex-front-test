import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Integrante } from '../models/integrante.model';
import { Team } from '../models/time.model';
import { TimeDaData } from '../models/time.da.data.model';
import { FuncaoMaisComum } from '../models/funcao.mais.comum.model';
import { FranquiaMaisFamosa } from '../models/franquia.mais.famosa';
import { ContagemPorFranquia } from '../models/contagem.por.franquia.model';


@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getIntegrantes(): Observable<Integrante[]> {
    return this.http.get<Integrante[]>(`${this.API_URL}/integrantes`);
  }

  getIntegrante(id: number): Observable<Integrante> {
    return this.http.get<Integrante>(`${this.API_URL}/integrantes/${id}`);
  }

  createIntegrante(integrante: Integrante): Observable<Integrante> {
    return this.http.post<Integrante>(`${this.API_URL}/integrantes`, integrante);
  }

  updateIntegrante(id: number, integrante: Integrante): Observable<Integrante> {
    return this.http.put<Integrante>(`${this.API_URL}/integrantes/${id}`, integrante);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.API_URL}/times`);
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.API_URL}/times/${id}`);
  }

  createTeam(Team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.API_URL}/times`, Team);
  }

  getTeamDaData(data: string): Observable<TimeDaData> {
    return this.http.get<TimeDaData>(`${this.API_URL}/estatisticas/Team-da-data?data=${data}`);
  }

  getIntegranteMaisUsado(dataInicial?: string, dataFinal?: string): Observable<Integrante> {
    let url = `${this.API_URL}/estatisticas/integrante-mais-usado`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<Integrante>(url);
  }

  getTeamMaisComum(dataInicial?: string, dataFinal?: string): Observable<string[]> {
    let url = `${this.API_URL}/estatisticas/Team-mais-comum`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<string[]>(url);
  }

  getFuncaoMaisComum(dataInicial?: string, dataFinal?: string): Observable<FuncaoMaisComum> {
    let url = `${this.API_URL}/estatisticas/funcao-mais-comum`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<FuncaoMaisComum>(url);
  }

  getFranquiaMaisFamosa(dataInicial: string, dataFinal: string): Observable<FranquiaMaisFamosa> {
    return this.http.get<FranquiaMaisFamosa>(
      `${this.API_URL}/estatisticas/franquia-mais-famosa?dataInicial=${dataInicial}&dataFinal=${dataFinal}`
    );
  }

  getContagemPorFranquia(dataInicial?: string, dataFinal?: string): Observable<ContagemPorFranquia> {
    let url = `${this.API_URL}/estatisticas/contagem-por-franquia`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<ContagemPorFranquia>(url);
  }

  getContagemPorFuncao(dataInicial?: string, dataFinal?: string): Observable<{quantidade: number}> {
    let url = `${this.API_URL}/estatisticas/contagem-por-funcao`;
    if (dataInicial && dataFinal) {
      url += `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    }
    return this.http.get<{quantidade: number}>(url);
  }
}