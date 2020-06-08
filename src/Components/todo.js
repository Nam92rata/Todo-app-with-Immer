import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addTodo, setFilter,toggleTodo } from './../Actions/index';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class ToDoList extends React.Component{
    
    handleCheck = (e) =>{   
        console.log(e.target)
        this.props.toggleTodo(e.target.id)
    }
    render(){
        let array = this.props.user.todo;    
        if(this.props.user.filter == "Active"){
            array = array.filter(el => {
                if(el.check === false){
                    return el;
                }
            })
        }
        else if (this.props.user.filter == "Completed"){
            array = array.filter(el => {
                if(el.check === true){
                    return el;
                }
            })
        }
        console.log(array);         
    
        return (
            <div><b>My action items:</b>
            <ul className="list-unstyled">
                {array.map((el)=>{        
                                            
                    return <li key={el.id} style={{textDecorationLine:el.check?'line-through':'none'}}>
                    <input type ="checkbox" className="mr-3" value={el.check} id={el.id} 
                    onChange={this.handleCheck.bind(this)} ></input>{el.text}</li>
                    
                })}
            </ul>  
            </div>
        )
        }
}


function mapStateToProps(state) {  
    
    return {     
        user: state.todoReducer
    };
  }
  function matchDispatchToProps(dispatch){
    return bindActionCreators({addTodo, setFilter,toggleTodo}, dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(ToDoList);
