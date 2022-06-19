export type CreateUserInput = {
    name: string
    email: string
    password: string
    age: number
}

export type User = CreateUserInput & {id: string}