import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from "axios";

const StoryWriteStyle = styled.div`
            display:flex;
            justify-content:center;
            margin-top:60px;
            margin-bottom:70px;
                .layout {
                width:1000px;
                display:flex;
                flex-direction: column;
                align-items: center;
                .write_title {
                position:relative;
                text-align:center;
                width:260px;
                padding:10px;
                border-bottom:solid orange;
                }
                .title {
                margin-top:50px;
                display:flex;
                align-items:center;
                    p{
                    margin-right:50px;
                    }
                    input {
                    border:none;
                    width:300px;
                    padding:5px;
                    border-bottom:solid 0.1px gray;
                    :focus{
                        outline:none;
                    }
                    }
                }

            .info{
            margin-top:35px;

                p{
                
                }
                textarea {
                padding-top:12px;
                padding-left:12px;
                    
                }
            }


            .content{
                margin-top:50px;
                display:flex;
                flex-direction:column;
                div:nth-child(1){
                width:100%;
                display:flex;
                justify-content:space-between;
                align-items:flex-end;
                }
                div:nth-child(2){
                display:flex;
                width:15%;
                justify-content:flex-end;
                align-items: center;
                    p:nth-child(1) {
                    font-size:80%;
                    }
                    p:nth-child(2) {
                    display:flex;
                    justify-content:space-between;
                    img {
                    width:22px;
                    height:22px;
                    } 
                    }
                }
                textarea {
                padding-top:12px;
                padding-left:12px;
            }
        }
            .item {
                margin-top:35px;
                textarea {
                    border:solid 2px orange;
                    padding-top:12px;
                    padding-left:12px;
                    :focus{
                    outline:none;
                }
                }
            }
            .hashtag {
                margin-top:20px;
                textarea {
                padding-top:12px;
                padding-left:12px;
                border:none;
                }
            }

            .submit {
            width:100%;
            display:flex;
            justify-content:flex-end;
            align-items:center;
            button {
                margin-top:15px;
                border:none;
                background:white;
                font-size:large;
                }
            img {
                margin-top:15px;
                width:28px;
                height:28px;    
            }    
            }
            /* Tagging Basic Style */
.tagging {
	border: 1px solid #CCCCCC;
	cursor: text;
	font-size: 1em;
	height: auto;
	padding: 10px 10px 15px;
}

.tag {
	background: none repeat scroll 0 0 #EE7407;
	border-radius: 2px;
	color: white;
	cursor: default;
	display: inline-block;
	position: relative;
	white-space: nowrap;
	padding: 4px 20px 4px 0;
	margin: 5px 10px 0 0;
}

.tag span {
	background: none repeat scroll 0 0 #D66806;
	border-radius: 2px 0 0 2px;
	margin-right: 5px;
	padding: 5px 10px 5px;
}

.tag .tag-i {
	color: white;
	cursor: pointer;
	font-size: 1.3em;
	height: 0;
	line-height: 0.1em;
	position: absolute;
	right: 5px;
	top: 0.7em;
	text-align: center;
	width: 10px;
}

.tag .tag-i:hover {
	color: black;
	text-decoration: underline;
}

.type-zone {
	border: 0 none;
	height: auto;
	width: auto;
	min-width: 20px;
	display: inline-block;
}

.type-zone:focus {
	outline: none;
}



            }
        `;





const StoryWrite = () => {
    const [data, setData] = useState('')

    useEffect(() => {

    })

    return (
        <StoryWriteStyle>
            <div className="layout">
                <div className="write_title">글쓰기</div>
                <div className='title'>
                <p>제목</p>
                <input type="text" placeholder="제목을 입력하세요." name="story_title" class="form-control" />
                </div>


                <div className="info">
                    <p>작성자 소개</p>
                    <textarea rows="7" cols="100"
                    placeholder="본인을 마음껏 표현해주세요." class="form-control">
                    </textarea>
                </div>


                <div className="content">
                    <div>
                        <p>내용</p>
                        <div>
                        <p>파일 첨부</p>
                            <p>
                        <img className="clip" src="/icons/Clip.png"/>
                        {/* <img className="picture" src="/icons/Picture.png"/>
                        <img className="video" src="/icons/Video.png"/> */}
                            </p>                      
                        </div>
                    </div>

                    <textarea rows="18" cols="100"
                    class="form-control" placeholder="내용을 입력하세요. ">
                    </textarea>
                </div>


                <div className="item">
                    <p>필요 물품</p>
                    <textarea rows="7" cols="100"
                    placeholder="# 물품입력" class="form-control"> 
                    </textarea>
                </div>

                <div className="hashtag">
                    <p>태그</p>
                    <textarea rows="7" cols="100"
                    placeholder="#태그입력" class="form-control">
                    </textarea>
                </div>
                


                <div className="submit">
                        <button className="button" onClick="">
                        제출하기
                        </button>
                        <img src="/icons/PaperPlane.png"/>
                </div>

                

                <div class="example-wrapper">
        <div class="tags well">
            <label for="tag" class="control-label">Tag</label>
            <div data-tags-input-name="taggone" id="tag">preexisting-tag, another-tag</div>
        </div>
    </div>


            </div>
        </StoryWriteStyle>
    );
}

export default StoryWrite;