import authentication from "./authentication";
import user from "./user";
import story from "./story";
import hashtag from "./hashtag";

import { combineReducers } from "redux";

export default combineReducers({
  authentication,
  user,
  story,
  hashtag,
});
