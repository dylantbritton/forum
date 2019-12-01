export class User {

    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor (firstname: string, lastName: string, email: string, password: string){
        this.firstName = firstname;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    
}
