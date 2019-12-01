import { User } from './user'

export class RegisterUser extends User{

    confirmPassword: string

    constructor (firstname: string, lastName: string, email: string, password: string, confirmPassword: string){
        super(firstname, lastName, email, password);
        this.confirmPassword = confirmPassword;
    }

}
