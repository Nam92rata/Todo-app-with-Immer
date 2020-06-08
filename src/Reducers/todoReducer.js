import produce from "immer";

const initialState = {
    todo: [],
    filter: 'All'

}
const todoReducer = produce((draft, action) => {
    console.log(draft)
    switch (action.type) {
        case "ADD_TODO":
            /* Using spread operator */
            // return Object.assign({}, state, {
            //     todo: [...state.todo,
            //     { text: action.text, check: false, id: action.id }
            //     ]
            // }
            // )

            /* Using Immer produce */
            // return produce(state, draft => {
            //     draft.todo.push({ text: action.text, check: false, id: action.id })
            // })

            /* Curried produce */
            draft.todo.push({ text: action.text, check: false, id: action.id })
            return
        case 'SET_FILTER':
            /* Using spread operator */
            // return Object.assign({}, state, {
            //     filter: action.filter
            // }
            // )

            /* Using Immer produce */
            // return produce(state, draft => {
            //     draft.filter = action.filter
            // })

            /* Curried produce */
            draft.filter = action.filter
            return

        case 'TOGGLE_TODO':
            /* Using spread operator */
            // state.todo.map(el => {
            //     if (el.id == action.id) {
            //         return (el.check = !el.check)
            //     }
            // })

            /* Using Immer produce */
            // return produce(state, draft => {
            //     draft.todo.map(el => {
            //         if (el.id == action.id) {
            //             return (el.check = !el.check)
            //         }
            //     })
            // })

            /* Curried produce */
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