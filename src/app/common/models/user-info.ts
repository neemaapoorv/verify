import { Base } from "./base";


export class UserEmployeeInfo extends Base {
    person_id:string;
    user_id:string;
    first_name:string = "";
    last_name:string = "";
    company:string;
    department_name:string;
    employee_status:string;
    fullName:string ="";
    business_unit_name:string;
   
    constructor(props: Partial<UserEmployeeInfo>) {
        super();
        for (const i of Object.keys(props)) {
            this[i] = props[i];
        }
        this.fullName = this.getFullName();
    }
    getFullName(){
       return this.first_name +" "+ this.last_name;
    }
}
