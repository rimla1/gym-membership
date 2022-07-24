export type EditUserInput = {
    name?: string
    password?: string
    age?: number
    gender?: string
}


export type CreateUserInput =  {
    name: string
    password: string
    age: number
    gender: string
    email: string
}

export type User = CreateUserInput & {id: string}