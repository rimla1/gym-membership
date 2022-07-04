export type EditUserInput = {
    name: string
    password: string
    age: number
    gender: string
}

export type CreateUserInput = EditUserInput & {email: string}

export type User = CreateUserInput & {id: string}