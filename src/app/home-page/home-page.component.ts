import { Component, OnInit, Pipe } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendRestService } from '../services/backend-rest.service'
import { SnackService } from '../services/snack.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  deploymentForm: FormGroup;
  deploymentStatus={
    "status": false,
    "message": ""
  }

  constructor(private fb: FormBuilder, private backendService: BackendRestService,
    private snack: SnackService) { }

  ngOnInit(): void {
    this.deploymentForm = this.fb.group({
      microservices: this.fb.array([])
    })
    this.addRow()
  }

  get microserviceForms() {
    return this.deploymentForm.get('microservices') as FormArray
  }

  addRow() {
    const deploymentRow = this.fb.group({
      name: ['', [Validators.required]],
      entryPoint: [false, [Validators.required]],
      replicas: [1, [Validators.required]],
      dependencies: ['']

    })
    this.microserviceForms.push(deploymentRow)
  }

  deleteRow(i) {
    this.microserviceForms.removeAt(i)
  }

  onSubmit() {
    //The 'dependencies' returned by the Form is a string, we need to convert it to a string array
    let deploymentRawObject = JSON.stringify(this.deploymentForm.getRawValue()["microservices"])
    let jsonObject = eval('(' + deploymentRawObject + ')');
    jsonObject.filter(e => e.dependencies = e.dependencies.split(','));
    
    let deploymentJsonString = JSON.stringify(jsonObject)

    console.log(deploymentJsonString)

    this.backendService.createDeployment(deploymentJsonString).subscribe(
      data => {
        console.log(data)
        let successMessage= "Success:" + data["message"]
        this.snack.showMessage(successMessage)
        this.deploymentStatus["status"]=false
        this.deploymentStatus["message"]=successMessage

      },
      error => {
        console.log(error["error"])
        let errorMessage= "Error: " + error["error"]["message"]
        this.snack.showMessage(errorMessage)
        this.deploymentStatus["status"]=true
        this.deploymentStatus["message"]=errorMessage
      },
    )
  }

}
