import { Base } from "./base";
import { UserCharter } from "./user-charter";
import { UserEmployeeInfo } from "./user-info";

export class User extends Base {

    constructor(props?: Partial<User>) {
        super(props);
        this.employee = new UserEmployeeInfo({});
        if (props?.employee) {
            Object.assign(this.employee, props.employee);
        }
    }

    id: number;
    username: string;
    employee: UserEmployeeInfo;
    charter: UserCharter;
    taskCount: number;
    compliant_status:string;
    compliance_percent: number;
}
