import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlipMove from 'react-flip-move';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      title: 'Simple Todo List App',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){
    this.refs.todo.focus();
  }

  handleSubmit= (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let todo = this.refs.todo.value;

    if( this.state.act === 0 ){
      let data = {
        todo
      }
      datas.push(data)
    } else {
      let index = this.state.index;
      datas[index].todo = todo;
    }


    

    this.setState({
      datas: datas,
      act: 0
    })

    this.refs.myForm.reset();
    this.refs.todo.focus();
  }

  handleDelete = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    })

    this.refs.myForm.reset();
    this.refs.todo.focus();
  }

  handleUpdate = (i) => {
    let data = this.state.datas[i];
    this.refs.todo.value = data.todo;
    
    this.setState({
      act: 1,
      index: i
    })
  }

  render() {
    console.log(this.state.datas.todo)
    return (
      <div className="App container shadow mt-5 bg-gg jumbotron">
        <h2 className="my-4">{this.state.title}</h2>
        <form ref="myForm">
            <div className="col-auto">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <button className="btn btn-primary" onClick={ (e)=>this.handleSubmit(e) }>Set</button>
                </div>
                <input type="text" className="form-control" ref="todo" id="inlineFormInputGroup" placeholder="Today I will..."/>
              </div>
            </div>
        </form>

        <div className="mt-4">
          
            <ul className="list-group list-group-flush">
            <FlipMove duration={250} easing="ease-out">
            { this.state.datas.map((datas, i)=>
              <li key={i} className="list-group-item text-left mt-2">
              <div className="row">
                <div className="col-1">
                  <input class="form-check-input m-auto" type="checkbox" value="" id="defaultCheck1"/>
                </div>
                <div className="col-9 h3">
                  {datas.todo}
                </div>
                <div className="row-2">
                  <button className="mx-1 btn btn-danger" onClick={ ()=>this.handleDelete(i) }>
                      <i class="far fa-times-circle"></i>
                  </button>
                  <button className="mx-1 btn btn-warning text-light" onClick={ ()=>this.handleUpdate(i) }>
                    <i class="fas fa-pen"></i></button>
                </div>
              </div>
              </li>
              ) } 
              </FlipMove>
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
