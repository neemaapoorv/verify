import { Base } from "./base";
export class UserCharter extends Base {
    id:number;
    user_id:number;
    charter_id:number;
    status:string;
    updated_at:string;
   
    constructor(props: Partial<UserCharter>) {
        super();
        for (const i of Object.keys(props)) {
            this[i] = props[i];
        }
    }
}
