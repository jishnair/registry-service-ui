import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { SnackService } from './snack.service';
import { MicroserviceDTO } from '../model/microservice.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendRestService {

  readonly DEPLOYMENT_API_URL = "/api/deployment"
  readonly MICROSERVICE_API_URL = "/api/deployment"
  readonly CHECK_HEALTH_API_URL = "/api/checkhealth"
  readonly HEALTH_REPORT_API_URL = "/api/healthreport"

  constructor(private httpClient: HttpClient, private snack: SnackService) {
  }

  createDeployment(deployment: String) {

    this.httpClient.post(this.DEPLOYMENT_API_URL, deployment, this.getHeaderOptions()).subscribe(
      data => {
        this.snack.showMessage("Success:" + data["message"])
      },
      error => {
        console.log(error)
        this.snack.showMessage("Error:" + error["error"])
      },
    )
  }
//
  getDeployments() : Observable<MicroserviceDTO[]>{
     return this.httpClient.get<MicroserviceDTO[]>(this.MICROSERVICE_API_URL)

  }

  checkHealth(){
    this.httpClient.get(this.CHECK_HEALTH_API_URL);
  }

  getHealthReport(){
    return this.httpClient.get(this.HEALTH_REPORT_API_URL);
  }

  private getHeaderOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
}
