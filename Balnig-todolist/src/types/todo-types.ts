export type TodoItem = {
    id: number
    title: string
    done: boolean
}

export type TodoCategory = {
    id: number
    title: string
    items: TodoItem[]
}