import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class BackendRestService {

  readonly DEPLOYMENT_API_URL =  "/api/deployment"
  readonly MICROSERVICE_API_URL = "/api/microservices"

  constructor(private httpClient: HttpClient) {
  }

  createDeployment(deployment: String) {

    this.httpClient.post(this.DEPLOYMENT_API_URL, deployment, this.getHeaderOptions()).subscribe(d =>
      console.log(d)
    )

  }

  getListOfMicroservices(){
    this.httpClient.get(this.MICROSERVICE_API_URL).subscribe(res =>
      console.log(res)
    )

  }

  private getHeaderOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
}
