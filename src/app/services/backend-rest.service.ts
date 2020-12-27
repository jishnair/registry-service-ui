import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { SnackService } from './snack.service';
import { MicroserviceDTO } from '../model/microservice.model';
import { DeploymentStatus } from '../model/deployment--status.model';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendRestService {

  readonly DEPLOYMENT_API_URL = "/api/deployment"
  readonly CHECK_HEALTH_API_URL = "/api/healthcheck"

  constructor(private httpClient: HttpClient) {
  }

  createDeployment(deployment: String): Observable<DeploymentStatus> {

    return this.httpClient.post<DeploymentStatus>(this.DEPLOYMENT_API_URL, deployment, this.getHeaderOptions())
  }
  //
  getDeployments(): Observable<MicroserviceDTO[]> {
    return this.httpClient.get<MicroserviceDTO[]>(this.DEPLOYMENT_API_URL)

  }

  checkHealth() {
     this.httpClient.post<any>(this.CHECK_HEALTH_API_URL, null, this.getHeaderOptions()).subscribe()
  }

  getHealthReport() {
    return this.httpClient.get(this.CHECK_HEALTH_API_URL);
  }

  private getHeaderOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
}
