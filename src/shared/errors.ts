import { ValidationErrorItem } from "joi";



export class AlreadyExistsError extends Error {
    statusCode: number;
    errors: string;
    constructor(errors: string){
        super();
        this.errors = errors;
        this.statusCode = 422;
    }
}

export class DoesNotExistsError extends Error {
    statusCode: number;
    errors: string;
    constructor(errors: string){
        super();
        this.errors = errors;
        this.statusCode = 404;
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

export class UnexpectedError extends Error {
    statusCode: number;
    errors: string;
    constructor(errors: string){
        super();
        this.errors = errors;
        this.statusCode = 500;
    }
}