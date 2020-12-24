import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  deploymentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.deploymentForm = this.fb.group({
      microservices: this.fb.array([])
    })
    this.addMicroservice()
  }

  get microserviceForms() {
    return this.deploymentForm.get('microservices') as FormArray
  }

  addMicroservice() {
    const microservice = this.fb.group({
      name: ['' ,[Validators.required]],
      entryPoint: [false, [Validators.required]],
      replicas: [1,[Validators.required]],
      dependencies: ['', [Validators.required]]

    })
    this.microserviceForms.push(microservice)
  }

  deleteMicroservice(i) {
    this.microserviceForms.removeAt(i)
  }

  onSubmit(){
    console.log(this.deploymentForm.value)

  }

}
