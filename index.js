import * as React from 'react';
import history from '@/router/history';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import { Form, Input } from 'antd';
import WrongSubjectModal from '@/components/WrongSubjectModal'//选择题目弹框
import HandModal from '@/components/HandModal'//交卷弹框
import JiandaTwoQuestion from '@/components/QuestionCard/JiandaTwoQuestion'//简答题
import MaterialAnalysis from '@/components/QuestionCard/MaterialAnalysis'
import JianDaquestiontwoanalysis from '@/components/QuestionCard/JianDaquestiontwoanalysis' 
import './style.less';
const left = require('@/statics/img/icon_return@3x.png');
const timerImg = require('@/statics/img/timerImg@2x.png');
const video = require('@/statics/img/video.png');
//自评简答题
class SelfAssQuestion extends React.Component {
	state = {
		examIndex: 0, // 当前题目索引
		listMainData: [],//存储弹框数据
		// =============
		modalFlag: false,
		modalTypeFlag: false,
		handPaperModalFlag: false,
		zipingti: 2,
		questionListData: { // 列表数据
			answerNumber: 1,
			noAnswerNumber: 3,
			detail: [
				{
					questionType: 6,
					questionList: [
						{
							serialNo: 23,
							questionType: 3,
							answer: 0, // 1:已作答,0:未作答
							questionId: 3
						},
						{
							serialNo: 4,
							questionType: 3,
							answer: 0, // 1:已作答,0:未作答
							questionId: 3
						},
					]
				},
				{
					questionType: 7,
					questionList: [
						{
							serialNo: 2,
							questionType: 3,
							answer: 0, // 1:已作答,0:未作答
							questionId: 3
						},
					]
				},

			],

		},
		title: '据统计，2012年第一季度，上海市签订外商直接投资合同共688项，比去年同期下降10.5%；签订外商直接投资合同金额52.75亿美元，增长11.9%；实际到位金额33.26亿美元，增长29.2%。 另外，一季度，与上海市签订外商直接投资合同的国家（地区）共57个。其中，与中国香港签订合同金额达24.2亿美元，比去年同期增长11.4%，占全市合同金额的45.9%，居签约国家（地区）的首位；美国合同金额7.3亿美元，下降45.3%，居第二位；日本合同金额4.77亿美元，增长39.5%，居第三位。其他合同金额超亿美元的国家（地区）还有毛里求斯、新加坡、英属维尔京群岛和荷兰，其合同金额分别为3.24亿美元、2.91亿美元、2.22亿美元和1.14亿美元。',
		answerquestion:[
		 {
					title:'简答题',
					content: '1、请描述什么是马克思列宁主义。',
					picture: true,
					answerquestion: '马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义',
					jiexi: '马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义'
			},
		 {
				title:'简答题',
					content: '2、请描述什么是马克思列宁主义1111。',
					picture: true,
					answerquestion: '马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义',
					jiexi: '马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义，马克思列宁主义'
			},

			//types: 1
		],   //0答题    1//解答简答题
		analysisData: {
			async:false,//样式不同，判断不同
			examineeAnswer:"我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案答案我是答案我是答案我是答案我是答案我是答案我是答案我是答案",
			correctAnswer:"正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案",
			analysis: "马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克马克思列宁主义就是马克思列宁主义就是马克",
			timerImg: timerImg,
			video: video,
	},

	}
	// 将所有题目合并成LIST
	getExamList() {
		const { questionListData } = this.state;
		const listMainData = questionListData.detail.reduce((prev, next) => {
			return prev.concat(next.questionList)
		}, [])
		this.setState({
			listMainData
		})
	}
	// 获取当前题目编号 （建议将索引或者题目ID加到路由上）
	getCurrentExamItem() {
		const { examIndex, listMainData } = this.state;
		return listMainData[examIndex];
	}

	handlerExam(type) {
		const { examIndex } = this.state;
		let index = type === 'next' ? examIndex + 1 : examIndex - 1
		// 请求接口逻辑...
		this.setState({
			examIndex: index
		})
		if (type === 'next') {
			history.push({
				path: `/path?Id=${id}`
			})
		}
	}
	// 打开弹框
	openModal = () => {
		this.setState({
			modalFlag: true,
			modalTypeFlag: true,
		})
	}
	openHandPaperModal = () => {
		this.setState({
			handPaperModalFlag: true,
			modalTypeFlag: false
		})
	}
	componentWillMount() {
		this.getExamList()
		
	}
	// 关闭弹框
	onClose = () => {
		this.setState({
			modalFlag: false,
			handPaperModalFlag: false,
		});
	};
	// 弹框选项回调
	navLinkToDetail = (item, type) => {
		let examIndex = 0;
		const { listMainData } = this.state;
		listMainData.forEach((v,index) => {
			if (v.serialNo === item.serialNo) {
				examIndex = index
			}
		})
		this.setState({
			modalFlag: false,
			activeType: type,
			examIndex
		});
	};

	showScore = () => {
		this.props.form.validateFields((err, values) => {
      if (!err) {
       history.push('/lib/subject/examresultstwo')
      }else{
				this.setState({
					handPaperModalFlag: true,
					modalTypeFlag: false
				})
			}
			this.form.resetFields();
    });
		
	}
	// 弹框选项回调
	handPaperToDetail = () => {
		this.setState({
			handPaperModalFlag: false,
			modalTypeFlag: false
		})
	};

	renderQuestionType() {
		const { activeType, choiceData, radioAnswerValue, analysisFlag } = this.state
		switch (activeType) {
				case 6:
						return (
							<div>
								<MaterialAnalysis title={this.state.title} />
								<JiandaTwoQuestion datas={this.state.answerquestion} 	nowSubscript={this.state.nowSubscript}/>
							</div>	
						)
				case 7:
						return (
							<div>
								<JiandaTwoQuestion datas={this.state.answerquestion} />
							</div>
						)
				default:
						break;
		}
}
renderQuestionTypes() {
	const { activeType, choiceData, radioAnswerValue, analysisFlag,analysisData } = this.state
	switch (activeType) {
			case 6:
					return (
						<div>
								<JianDaquestiontwoanalysis analysisData={analysisData}/>
						</div>	
					)
			case 7:
					return (
						<div>
							<JianDaquestiontwoanalysis analysisData={analysisData}/>
						</div>
					)
			default:
					break;
	}
}
	render() {
		// const { getFieldDecorator } = this.props.form;
		const { 
			examIndex,
			listMainData,
			modalTypeFlag,
			handPaperModalFlag,
			modalFlag,
			questionListData
		} = this.state
		return (
			<div className="self-ass-question">
				<div className="self_wrap_header">
					<img src={left} className="back_icon" type="left" onClick={this.goBack} />
					<span className="header_title">自评({this.state.zipingti}题)</span>
					<span onClick={this.showScore} style={{width:'2.13rem',marginLeft:'1rem'}}>提交评分</span>
				</div>
				<div className="wrong_subject_top" onClick={this.openModal}>
					<div className="left">
						<span>{examIndex + 1}</span>
						<span>/{listMainData.length}</span>
						<span className="sanjiao"></span>
					</div>
				</div>
			
			{/* 底部按钮 */ }
			<div className = "bottom_button" >
				<button type="button" disabled={examIndex === 0} onClick={() => { this.handlerExam("prev") }}>上一题</button>
				<button type="button" disabled={examIndex === listMainData.length - 1} onClick={() => { this.handlerExam("next") }}>下一题</button>
			</div>
			<Modal
				popup
				visible={modalTypeFlag ? modalFlag : handPaperModalFlag}
				onClose={this.onClose}
				animationType="slide-up"
				className={modalTypeFlag ? "modal-dialog" : "modal-dialog-middle"}
			>
				{
					modalTypeFlag
						? <WrongSubjectModal onClose={this.onClose} navLinkToDetail={this.navLinkToDetail} currentTopicNum={this.getCurrentExamItem().serialNo} listMainData={questionListData.detail}></WrongSubjectModal>
						: <HandModal onClose={this.onClose} handPaperToDetail={this.handPaperToDetail}></HandModal>
				}

			</Modal>
			</div >
		)
	}
}
export default Form.create()(SelfAssQuestion)