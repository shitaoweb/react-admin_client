import React, { Component } from 'react'

import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Icon, Input, Button } from 'antd'
import { reqLogin } from '../../api/index.js'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleLogin = (e) => {
    e.preventDefault()
    // 得到form对象
    const form = this.props.form
    // 获取表单项的输入数据
    /*const value = form.getFieldsValue()
    console.log(value)*/
    // 对所有的表单进行验证
    form.validateFields(async (err, values) => {
      if (!err) {
        // 校验成功
        const {username, password} = values
        // TODO: 通过了验证, 发送ajax请求
        try {
          const response = await reqLogin(username, password)
          console.log('请求成功...', response.data)
        } catch (error) {
          console.log('请求出错...', error)
        }  
      } else {
        console.log('登录失败...', err);
        
      }
    })
    
  }
  // 自定义校验
  validatorPwd = (rule, value, callback) => {
    if(!value) {
      callback('请填写密码')
    } else if (value.length < 4) {
      callback('密码必须大于等于4位')
    } else {
      callback()
    }
  }

  render() {
    const form = this.props.form
    const { getFieldDecorator } = form

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h2>React项目: 后台管理系统</h2>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form onSubmit={this.handleLogin} className="login-form">
          <Form.Item>
            { 
              getFieldDecorator('username', {
                rules: [
                  {require: true, message: '用户名必须填写'},
                  {min: 4, message: '用户名必须大于等于4位'},
                  {max: 12, message: '用户名必须小于等于12位'},
                  {pattern: /^[a-z0-9A-Z]+$/, message: '用户名必须是英文、数字或下划线组成'}
                ],
                initialValue: 'admin' //初始值
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {rules: [
                {validator: this.validatorPwd}
              ]})(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  }
}

/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login)

export default WrapLogin