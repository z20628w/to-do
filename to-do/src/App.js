
import React, { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: "测试名称",
          time: "2021/1/4 下午8:48:07",
          content: "测试内容"
        },
      ],
      temp: {
        name: "",
        time: "",
        content: ""
      },
    };
  }
  render() {
    return (
      <div className="main">
        {/* 标题 */}
        <div className="title">
          待办事项表格
        </div>

        {/* 按钮列表 */}
        <div className="butts">
          {/* 操作页面 */}
          <div className="addContent">
            <div>
              <span>
                待办事项名称
            </span>
              <input placeholder="请输入待办名称" value={this.state.temp.name} onChange={(event) => { this.change('name', event) }} />
            </div>
            <div>
              <span>
                待办事项内容
            </span>
              <input className="textarea" placeholder="请输入待办内容" value={this.state.temp.content} onChange={(event) => { this.change('content', event) }} />
            </div>
            <div className="butAdd" onClick={() => this.add()}>添加</div>
          </div>
        </div>

        {/* 表格 */}
        <ul className="table">
          <li className="tit">
            <span>待办事项名称</span>
            <span>待办事项时间</span>
            <span>待办事项内容</span>
            <span>操作</span>
          </li>
          {
            this.state.list.map((item, index) => {
              return <li key={index}>
                <span>{item.name}</span>
                <span>{item.time}</span>
                <span>{item.content}</span>
                <div className="Operation">
                  <span className="dele" onClick={() => this.clickevent(item, index)}>删除</span>
                </div>
              </li>
            })
          }
        </ul>

      </div>
    )
  }

  clickevent = (data, index) => {
    this.state.list.splice(index, 1)
    this.setState(this.state)
  }

  change(name, value) {
    var date = new Date();
    this.state.temp[name] = value.target.value
    this.state.temp['time'] = `${date.toLocaleString()}`
    this.setState(this.state)
  }

  add(){
    let mess = null
    if(!this.state.temp.name) mess = '请输入名称'
    if(!this.state.temp.content) mess="请输入内容"
    if(mess){
      alert(mess)
      return
    }

    this.state.list.unshift(this.state.temp)
    this.setState(this.state)
  }
}

export default App;
