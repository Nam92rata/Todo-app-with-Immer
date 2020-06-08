
let nextTodoId = 1;

export const addTodo = (text)=>{
    return{
        type: 'ADD_TODO',
        id: nextTodoId++,
        check:false,
        text
    }    
}

export const setFilter = (filter)=>{
    return{
        type: 'SET_FILTER',
        filter
    }
}

export const toggleTodo = (id)=>{
   return{
    type: 'TOGGLE_TODO',
    id
}}