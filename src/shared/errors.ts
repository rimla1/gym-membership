import { ValidationErrorItem } from "joi";

export class AlreadyExistsError extends Error {
    statusCode: number;
    message: string;
    constructor(message: string){
        super();
        this.message = message;
        this.statusCode = 422;
    }
}

export class ValidationError extends Error {
    statusCode: number;
    errors: ValidationErrorItem[];
    constructor(errors: ValidationErrorItem[]){
        super();
        this.errors = errors;
        this.statusCode = 400;
    }
}