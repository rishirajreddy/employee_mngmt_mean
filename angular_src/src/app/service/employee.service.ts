import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { EmpModel } from "../model/emp.model";

@Injectable({
    providedIn: 'root'
})

export class EmpService{
    // readonly url = 'http://localhost:5000/employees';
    // readonly url = '';

    constructor(private http: HttpClient){}

    addEmployee(emp: EmpModel){
        return this.http.post('/post', emp);
    }

    //get employess list
    getEmployees(){
        return this.http.get(`/`);
    }

    //get employee by id
    getEmployee(_id:string){
        return this.http.get(`/get/${_id}`);
    }

    //delete employee by id
    deleteEmployee(_id:string){
        return this.http.delete(`/get/${_id}`);
    }

    //update employee by id
    updateEmployee(emp:EmpModel){
        return this.http.put(`/update/${emp._id}`,emp);
    }
}