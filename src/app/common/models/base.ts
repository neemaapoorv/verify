export class Base {
    
    constructor(props?: any) {
        
        if (!props) {
            return;
        }
        Object.keys(props).forEach(key => {
            this[key as keyof this]=props[key];
        });
    }
}
