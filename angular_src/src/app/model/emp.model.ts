export class EmpModel{
    public _id: string;
    public name: string;
    public position: string;
    public dept: string;

    constructor(
        id: string,
        name:string,position: string, department:string
    ){
        this._id = id;
        this.name = name;
        this.position = position;
        this.dept = department;
    }
}