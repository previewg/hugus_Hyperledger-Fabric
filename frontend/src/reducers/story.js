import {
  STORY_ADD,
  STORY_ADD_FAILURE,
  STORY_ADD_SUCCESS,
  STORY_LIST_LOAD,
  STORY_LIST_LOAD_SUCCESS,
  STORY_LIST_LOAD_FAILURE,
  STORY_LOAD,
  STORY_LOAD_SUCCESS,
  STORY_LOAD_FAILURE,
  STORY_LIST_NUM_INCREASE,
} from "../actions/story";
import update from "react-addons-update";

const initialState = {
  add: {
    status: "INIT",
  },
  delete: {
    status: "INIT",
  },
  update: {
    status: "INIT",
  },
  list: {
    status: "INIT",
    data: [],
    num: 1,
  },
  detail: {
    status: "INIT",
    data: null,
  },
};

export default function story(state = initialState, action) {
  switch (action.type) {
    case STORY_ADD:
      return update(state, {
        add: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_ADD_SUCCESS:
      return update(state, {
        add: {
          status: { $set: "SUCCESS" },
        },
      });

    case STORY_ADD_FAILURE:
      return update(state, {
        add: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LIST_LOAD:
      return update(state, {
        list: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LIST_LOAD_SUCCESS:
      let newData = state.list.data.concat(action.list);
      if (action.status===true){
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: newData },
            num:{$set:state.list.num +1}
          },
        });
      }else if(state.list.num===1 && action.status===false){
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.list },
          },
        });
      }
      else{
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
          },
        });
      }


    case STORY_LIST_LOAD_FAILURE:
      return update(state, {
        list: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LOAD:
      return update(state, {
        detail: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LOAD_SUCCESS:
      return update(state, {
        detail: {
          status: { $set: "SUCCESS" },
          data: { $set: action.data },
        },
      });

    case STORY_LOAD_FAILURE:
      return update(state, {
        detail: {
          status: { $set: "FAILURE" },
        },
      });

    default:
      return state;
  }
}
