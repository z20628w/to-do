import React, { Component } from 'react'
import PropTypes, { number } from 'prop-types';
import axios from "axios"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('构造函数！')
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

  static propTypes = {
    // name:PropTypes.oneOfType([PropTypes.number,PropTypes.string])
    // name:PropTypes.oneOf(['名称'])
    name: (props, propName, componentName) => {
      console.log('props', props, 'propName', propName, 'componentName', componentName)
      if (!props[propName])
        return new Error(propName + "格式不对")
    }
  }

  static defaultProps = {
    name: "没传"
  }

  componentWillReceiveProps(){
    //  第一次传的数据不会执行
    console.log('组件将要接收数据更新钩子函数')
  }

  componentWillMount(){
    console.log('组件即将挂载钩子函数')
  }

  componentDidMount(prevProp,prevState,data){
    console.log('页面挂载完成钩子函数')
    this.forceUpdate() //强制更新
  }

  shouldComponentUpdate(){
    console.log('组件是否更新阀门钩子函数')
    // true -- 更新  false -- 不更新
    return true 
  }

  componentWillUpdate(){
    console.log('组件即将更新钩子函数')
  }

  componentDidUpdate(){
    console.log('组件更新完毕钩子函数')
  }

  componentWillUnmount(){
    console.log('页面即将卸载钩子函数')
  }

  static getDerivedStateFromProps(props,state){
    console.log('页面state的值不可更改了，直接为props,props为组件传入的值')
    // return null
    return {}
  }

  getSnapshotBeforeUpdate(){
    console.log('在组件更新之前执行，返回值为【组件更新完毕钩子函数】的第三个参数')
    return null
  }

  render() {
    return (
      <div className="main">
        {this.props.name}
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

  add() {
    axios.get(window.location.origin+'/api/v3/tag/list?pid=0&apiver=2&plat=0').then( res => {
      console.log('成功',res)
    }, req => console.log('失败',req))

    let mess = null
    if (!this.state.temp.name) mess = '请输入名称'
    if (!this.state.temp.content) mess = "请输入内容"
    if (mess) {
      alert(mess)
      return
    }

    this.state.list.unshift(this.state.temp)
    this.setState(this.state)
  }
}

export default App;
