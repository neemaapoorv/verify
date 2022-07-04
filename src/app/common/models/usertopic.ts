import { Base } from "./base";

export class UserTopic extends Base {

    id: number;
    user_id: number;
    topic_course_id: number;
    policy_doc_complete:string;
    formal_training_complete:string;
    master_percent:number;
       
    
}
