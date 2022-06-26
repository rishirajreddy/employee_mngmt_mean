import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgControlStatus, NgForm, Validators } from '@angular/forms';
import { faCoffee, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { EmpModel } from '../model/emp.model';
import { EmpService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css',
]
})
export class EmployeeComponent implements OnInit {

  @ViewChild('f') formInput!: NgForm;
  empForm!:FormGroup;

  name:string = '';
  position:string = '';
  dept:string = '';

  formValue:any =  {};
  departments:string[] = ['Design', 'Development'];

  blur = "";  //CSS change
  
  plus = faPlus;
  close = faClose;
  selectedDept = 'Design';
  showModal: boolean = false;
  editMode:boolean = false;
  selectedEmp!: EmpModel;
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private empService: EmpService) { }

  empArray: EmpModel[] =  []

  ngOnInit(){
    this.loading = true;
    this.empForm =  this.fb.group({
      _id: [''],
      name:['', Validators.required],
      position: ['', Validators.required],
      dept: ['', Validators.required]
    })
    this.onGetEmployess();
    this.loading = false;
  }

  //GEtting employees list
  onGetEmployess(){
    this.empService.getEmployees()
    .subscribe({
      next: (v:any) => {
        console.log(v);
        this.empArray = v;
      },
      error: (e) => console.log(e)
    })
  }
  
  //Adding employees
  onAddEmployee(){
    this.showModal = !this.showModal;
    this.blur = "blur";
    // const data= {
    //   _id:'',
    //   name: this.formInput.value.empData.name,
    //   position: this.formInput.value.empData.position,
    //   dept: this.formInput.value.empData.dept
    // }

    
if(this.empForm.valid){
    if(this.editMode){
      // this.selectedEmp = {
      //   _id: this.selectedEmp._id,
      //   name: this.empForm.setValue,
      //   position: this.empForm.value.position,
      //   dept: this.empForm.value.dept
      // }  
      this.empService.updateEmployee(this.empForm.value)
      .subscribe({
        next: (v) => {
          console.log("Successfully Updated!!");
          console.log(v);
          this.onGetEmployess();
          this.editMode = false;
        },
        error: (e) => console.log(e)
      })
    }
    else {
      this.empService.addEmployee(this.empForm.value).subscribe({
        next: (v) => {
          console.log(v);
          this.onGetEmployess();
        },
        error: (e) => console.log(e)
      });
    }
  } else {
      let key = Object.keys(this.formInput.controls);
      console.log(key);
      key.filter(data => {
        console.log(data);
        let control = this.formInput.controls[data];
        console.log(control);
        if(control.errors != null){
          control.markAsTouched;
        }
      })
  }
    this.empForm.reset();
    console.log(this.empForm.value.name);
    // console.log(data);
  }

  onAdd(){
    console.log(this.empForm);
  }
  //Delete Employee
  onDeleteEmployee(id:string){
    if(confirm('Do you want to delete this employee?')){
      this.empService.deleteEmployee(id)
      .subscribe({
        next: (v) => {
          console.log("Deleted Successfully!!");
          this.onGetEmployess();
        },
        error: (e) => console.log(e)
      })
    }
  }
  //Update employess
  onUpdateEmployee(emp: EmpModel){
    this.showModal = true;
    this.editMode = true;
    this.selectedEmp = emp;
    this.empForm.patchValue(emp);
    // this.formValue = {name: emp.name, position:emp.position,dept : emp.dept};
  }

    openForm(){
      this.showModal = !this.showModal;
    }

    closeForm(){
      this.showModal = !this.showModal;
      this.editMode = false;
      this.empForm.reset();
      // this.formValue = "";
    }


}
