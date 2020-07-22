<import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
class AddModalFprm extends React.Component{
	componentWillMount() {
		// 将form对象通过setForm()传递父组件
    this.props.setForms(this.props.form)
	}
    render(){
			const {informations}=this.props
			const { getFieldDecorator } = this.props.form;
        return(
            <Form>
							<Form.Item 	label="Name" >
							{
								getFieldDecorator('userName',{
									initialValue:informations.name||'',
									  rules: [{ required: true, message: 'Username is required!' }],
									})(
											<Input />
										)
							}
							</Form.Item>
							<Form.Item 	label="Age" >
							{
								getFieldDecorator('userAge',{
									initialValue:informations.age||'',
									rules: [{ required: true, message: 'userAge is required!' }],
									})(
											<Input />
										)
							}
							</Form.Item>
							<Form.Item 	label="Adress" >
							{
								getFieldDecorator('userAdress',{
									initialValue:informations.address||'',
									rules:[]
									})(
											<Input />
										)
							}
							</Form.Item>
          </Form>
        )
    }
}

 export default Form.create()(AddModalFprm);