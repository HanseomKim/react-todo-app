import React, { Component } from "react";
import "./App.css";

export default class App extends Component {

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? 'line-through' : "none",
    }
  };

  state = {
    todoData: [],
    value: "",
  }

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // 입력란에 있던 글씨 지워주기
    this.setState({ todoData: [...this.state.todoData, newTodo], value: ""})

  };

  handleCompleChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({ todoData: newTodoData });
  }

  render() {
    return (
      <div className = "container">
        <div className = "todoBlock">
          <div class="title">
            <h1>할 일 목록</h1>
          </div>
          {/* map() 메소드: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
          {this.state.todoData.map((data) => (
            // React는 JSX Key 속성을 이용하여 바뀐 부분만 실제 돔에 적용합니다.
            // key에는 unique한 값을 넣어줍니다.
            // index도 0부터 unique한 값을 가지지만 리스트가 추가되거나 제거되면 key 값도 바뀌기에 추천하지 않습니다.
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input 
                type="checkbox" 
                onChange={() => this.handleCompleChange(data.id)}
                defaultChecked={false} />
                {data.title}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
            </div>
         ))}

          <form style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: 10, padding: '5px' }}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input 
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: 1 }}
            />
          </form>
        </div>
      </div>
    );
    }
}