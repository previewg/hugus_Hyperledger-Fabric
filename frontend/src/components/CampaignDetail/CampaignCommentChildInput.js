import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == false) {
      return "display:none;opacity:0";
    } else {
      return "opacity:1;transform: translateX(-100px);";
    }
  }};
  right: 0;
  background-color: #ffa500;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  width: 180px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
`;

const errorMsg = "답글을 입력하세요";

const CampaignCommentChildInput = ({ comment, campaign_id, setCampaignCommentList, commentLikenum, setCommentLikenum }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [comments, setComments] = useState("");
  // const [like,setLike] = useState(campaignId.like);
  const [error, setError] = useState(false);
  const commentChild = useRef();
  const [loading,setLoading] = useState(false);

  const onCommentChangeHandler = (e) => {
    setComments(e.target.value);
    setError(false);
  };

  const commentChildClear = () => {
    setComments("");
  };

  const commentChildAddHandler = async () => {
     if(comments !== "" && !loading) {
      setLoading(true)
      const result = await axios.post("/campaign_comment/child/add", 
      { 
        comment: comments, comment_id: comment.id, campaign_id: campaign_id 
      })
      setCampaignCommentList(result.data);
      setComments("");
      setLoading(false)
    }else{
      commentChild.current.focus();
      setError(true);
    }
  };




//   const likeHandler = async ( status ) => {
//     const result = await axios.put('/campaign_comment/like', { campaign_id: campaign_id, status: status });
//     if( result.data.success === 1 ) {
//       if(like) setCommentLikenum(likenum => likenum -1);
//       else setCommentLikenum(likenum => likenum +1)
//       setLike(!like);
//     }
// }





  const onClickHandler = () => {
    if (isClicked) setIsClicked(false);
    else setIsClicked(true);
  };

  return (
    <>
      <div className="like_group">


      {/* {like ? (
              <img
                onClick={() => likeHandler(true)}
                alt="like"
                className="like"
                src="/icons/like.svg"
              />
            ) : (
              <img
                onClick={() => likeHandler(false)}
                alt="unlike"
                className="unlike"
                src="/icons/unlike.svg"
              />
            )} */}






        <img className="like_normal" src="/icons/like_normal.png" />
        <img className="liked" src="/icons/like.png" />
        <img className="disLike_normal" src="/icons/disLike_normal.png" />
        <img className="disLiked" src="/icons/disLike.png" />
        <p onClick={onClickHandler}>답글</p>
      </div>
      {isClicked && (
        <div className="comment_child_input">
          <input
            ref={commentChild}
            value={comments}
            onChange={onCommentChangeHandler}
            placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
            onKeyDown={(id) => {
              if (id.key === "Enter") commentChildAddHandler(comment.id);
            }}
            placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
          />

          <div className="comment__buttons">
            <button onClick={commentChildClear}>취소</button>
            <button onClick={() => commentChildAddHandler(comment.id)}>
              등록
            </button>
          </div>
        </div>
      )}
      <ErrorBoxStyle error={error}>{errorMsg}</ErrorBoxStyle>
    </>
  );
};

export default CampaignCommentChildInput;