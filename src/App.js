import React from 'react';
import './App.css';
import AddModalFprm from './components/AddModalFprm'
import { Table,Button,Modal, message } from 'antd';

export default class App extends React.Component{
   columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text,record,aa) => {
        return(
         <div>
           <Button onClick={()=>{
             this.setState({
              warnMessages:record
             })
             this.showModal(record)}
             }>编辑</Button>&nbsp;&nbsp;&nbsp;
           <span>删除</span>
         </div>
        )
    },
  }
   
  ];
  state={
    warnMessages:{},
    datas:[],
    visible: 0,//控制模态框的显隐 0不显示，1添加模态框，2隐藏模态框
    data:[
      {
        key: 0,
        name: 'aa',
        age: 32,
        address: '北京',
      },
      {
        key: 1,
        name: 'bb',
        age: 32,
        address: '南京',
      },
      {
        key: 2,
        name: 'cc',
        age: 22,
        address: '上海',
      },
    ]
  }
  //更新的模态框
  showModal = (informations) => {
    this.informations=informations//让输入框里有原本的数值
    this.setState({
      visible: 2,
    });
  };
  //添加的模态框
  showAddModal = () => {
    this.informations=null  //因为公用一个模态框，让添加的时候，将模态框的值制空
    this.setState({
      visible: 1,
    });
  };
componentDidMount(){
  this.setState({
    datas:this.state.data
  })
}
  handleOk = e => {
    this.forms.validateFields((err,values)=>{
     if(!err){
         let aa= this.state.data.filter((iten,index)=>{
          values.key=index
            if(iten.key===values.key){
              return values
            }
            return iten
            
          })
          this.setState({
            datas:aa
          })
          this.setState({
            visible: false,
          });
          this.forms.resetFields();//form表单制空
     }else{
      message.error('添加失败，请检查之后在添加')
     }
      
    
    });
    
  };

  handleCancel = () => {
      // 清除输入数据
      this.forms.resetFields()
      this.setState({
        visible: 0,
      });
  };
  render(){
    const {visible}=this.state
    const informations = this.informations || {} // 如果还没有指定一个空对象 将值传入form组件里
    let modalTitle
    if (visible===1) {
      modalTitle = '添加分类'
    } else if (visible===2) {
      modalTitle = '更新分类'
    }
    return(
      <div>
        <Table columns={this.columns} dataSource={this.state.datas} />
        <Modal
          title={modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddModalFprm informations={informations} setForms={forms=>this.forms=forms} />                                                           
        </Modal>
        <Button onClick={this.showAddModal}
             >添加</Button>&nbsp;&nbsp;&nbsp;
      </div>
      
    )
  }
};
