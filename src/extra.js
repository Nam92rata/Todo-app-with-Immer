import produce from "immer";

const initialState = {
    todo: [],
    filter: 'All'

}
const todoReducer = produce((draft, action) => {
    console.log(draft)
    switch (action.type) {
        case "ADD_TODO":
            // return Object.assign({}, state, {
            //     todo: [...state.todo,
            //     { text: action.text, check: false, id: action.id }
            //     ]
            // }
            // )
            // return produce(state, draft => {
            //     draft.todo.push({ text: action.text, check: false, id: action.id })
            // })
            draft.todo.push({ text: action.text, check: false, id: action.id })
            return
        case 'SET_FILTER':
            // return Object.assign({}, state, {
            //     filter: action.filter
            // }
            // )
            // return produce(state, draft => {
            //     draft.filter = action.filter
            // })
            draft.filter = action.filter
            return

        case 'TOGGLE_TODO':
            // state.todo.map(el => {
            //     if (el.id == action.id) {
            //         return (el.check = !el.check)
            //     }
            // })

            // return produce(state, draft => {
            //     draft.todo.map(el => {
            //         if (el.id == action.id) {
            //             return (el.check = !el.check)
            //         }
            //     })
            // })
            draft.todo.map(el => {
                if (el.id == action.id) {
                    return (el.check = !el.check)
                }
            })
            return

        // default:
        //     return draft;
    }
}, initialState)

export default todoReducer;