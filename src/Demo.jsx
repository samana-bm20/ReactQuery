import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, addTodo } from './components/Todo'

const Demo = () => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");

    const { data: todos, isLoading } = useQuery({
        queryFn: () => fetchTodos(),
        queryKey: ["todos"],
        staleTime: Infinity,
        cacheTime: 0,
    });

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div><b>React Query: TODOS</b></div>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <button onClick={async () => {
                try {
                    await addTodoMutation({ title });
                    setTitle("");
                } catch (error) {
                    console.error(error);
                }
            }}>
                Add Todo
            </button>
            <ul>
                {todos?.map((todo) => {
                    return <li key={todo.id}>
                        {todo.title} - {todo.completed ?
                            <span style={{ color: 'green' }}>Completed</span>
                            : <span style={{ color: 'red' }}>Pending</span>
                        }
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Demo