import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {signInBtnIsClicked, signUpBtnIsClicked} from "../../actions/nav";

const SignInStyle = styled.div`
	position: fixed;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	${props=>props.signInBtn ? 'display: flex;	background-color: rgba(0,0,0,0.5); z-index:10':'display: none	;	z-index: -10;'};
	section{
			background-color: white;
			width: 400px;
			height: 550px;
			.header{
				.close__btn{
					font-size: 12px;
					position: relative;
					left: 170px;
					cursor: pointer;
				}
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 25%;
				p{
					font-size: 25px;
				}
			}
			.form{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 35%;
				input{
					width: 70%;
					height: 25px;
					font-size: 15px;
					transition: 0.4s ease-in-out;
					border:solid 0.1px lightgray;
					padding:10px;
					:focus{
						outline: none;
						border: solid 0.1px orange;
					}
				}
				>div{
					width: 70%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					p{
							font-size: 12px;
							color: gray;
						}
					.checkbox{
						display: flex;
						align-items: center;
						justify-content: space-between;
						input{
							width: 15px;
							margin-right: 5px;
						}
					}
				}
			}
				
	
			.buttons{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 40%;
				button{
					width: 70%;
					height: 35px;
					border: none;
					cursor:pointer;
					:focus{
						outline: none;
					}
					:nth-child(1){
						background-color: pink;
						color: white;
					}
					:nth-child(2){
						background-color: #f7e100;
					}
					:nth-child(3){
						background-color: #4064ac;
						color: white;
					}
				}
				.already{
					font-size: 12px;
					color: gray;
					display: flex;
					justify-content: space-around;
					width: 50%;
					p:nth-child(2){
						color: orange;
						cursor:pointer;
					}
				}
			}
	}

`;

const SignIn = (props) => {
	const dispatch = useDispatch();

	const onClickHandler = (e) =>{
		if(e.target === e.currentTarget){
			dispatch(signInBtnIsClicked())
		}
	}
	return (
		<SignInStyle signInBtn={props.signInBtn} onClick={onClickHandler}>
			<section>
				<article className='header'>
					<p className='close__btn' onClick={()=>dispatch(signInBtnIsClicked())}>닫기</p>
					<p>로그인</p>
				</article>
				<article className='form'>
					<input placeholder='이메일'/>
					<input placeholder='비밀번호'/>
					<div>
						<div className='checkbox'>
							<input type='checkbox'/>
							<p>로그인 유지하기</p>
						</div>

						<p>아이디/비밀번호 찾기</p>
					</div>
				</article>
				<article className='buttons'>
					<button>HUGUS 계정으로 로그인</button>
					<button>카카오 계정으로 로그인</button>
					<button>페이스북 계정으로 로그인</button>
					<div className='already'>
						<p>회원이 아니신가요?</p>
						<p onClick={()=>dispatch(signUpBtnIsClicked())}>회원가입</p>
					</div>
				</article>
			</section>
		</SignInStyle>
	)
}

export default SignIn;

