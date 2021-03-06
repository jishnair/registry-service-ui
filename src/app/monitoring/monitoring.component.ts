import { Component, OnInit } from '@angular/core';
import { BackendRestService } from '../services/backend-rest.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  deployment;
  healthReport = [];
  loading: boolean = false;

  constructor(private backendService: BackendRestService) { }

  ngOnInit(): void {
    this.getDeployments()
    this.healthCheck()
  }

  getDeployments() {
    this.backendService.getDeployments().subscribe(
      result => {
        console.log(result)
        this.deployment = result
      }
    )
  }

  healthCheck() {
    this.healthReport = []
    this.loading = true

    this.backendService.checkHealth()
    setTimeout(() => {
      this.backendService.getHealthReport().subscribe(result => {

        for (let key in result) {
          console.log(key, result[key]);
          let obj = {}
          obj["name"] = key
          obj["status"] = result[key]
          this.healthReport.push(obj)

        }
        console.log(this.healthReport)
      }
      )
      this.loading = false
    }, 3000);

  }

}
