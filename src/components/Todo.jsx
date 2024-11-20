const todos = [
    {
        id: 1,
        title: 'Learn React',
        completed: true
    },
    {
        id: 2,
        title: 'Learn Typescript',
        completed: false
    },
    {
        id: 3,
        title: 'Learn Angular',
        completed: false
    },
    {
        id: 4,
        title: 'Learn Tailwind',
        completed: true
    },
    {
        id: 5,
        title: 'Learn React-Query',
        completed: false
    },
];


//mock fetch todos function
export const fetchTodos = async (query = "") => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("fetched todos");

    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
    );

    return filteredTodos;
}

export const addTodo = async (todo) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newTodo = {
        id: todos.length + 1,
        title: todo.title,
        completed: false,
    };

    todos.push(newTodo);

    return newTodo;
}
