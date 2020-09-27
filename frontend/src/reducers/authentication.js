import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function parseJwt(token) {
  if (!token) return { nickname: "" };
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const initialState = {
  login: {
    status: "INIT",
  },
  register: {
    status: "INIT",
    error: -1,
  },
  status: {
    profile_path: "",
    confirm_pwd: "INIT",
    valid: false,
    isLoggedIn: getCookie("hugus") || false,
    currentUser: parseJwt(getCookie("hugus")).nickname || "",
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    // 회원가입
    case types.AUTH_SIGNUP:
      return update(state, {
        register: {
          status: { $set: "WAITING" },
        },
      });
    case types.AUTH_SIGNUP_SUCCESS:
      return update(state, {
        register: {
          status: { $set: "SUCCESS" },
        },
      });
    case types.AUTH_SIGNUP_FAILURE:
      return update(state, {
        register: {
          status: { $set: "FAILURE" },
          error: { $set: action.error },
        },
      });

    // 로그인
    case types.AUTH_SIGNIN:
      return update(state, {
        login: {
          status: { $set: "WAITING" },
        },
      });
    case types.AUTH_SIGNIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: "SUCCESS" },
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.nickname },
        },
      });
    case types.AUTH_SIGNIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: "FAILURE" },
        },
      });

    // 로그아웃
    case types.AUTH_SIGNOUT:
      return update(state, {
        login: {
          status: { $set: "INIT" },
        },
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
      });

    case types.AUTH_SIGNOUT_ERROR:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
      });
    //회원탈퇴
    case types.AUTH_SIGN_DESTROY:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
      });
    case types.AUTH_SIGN_DESTROY_ERROR:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
      });
    case types.CONFIRM:
      return update(state, {
        status: {
          confirm_pwd: { $set: "INIT" },
        },
      });
    case types.CONFIRM_PWD:
      return update(state, {
        status: {
          confirm_pwd: { $set: "SUCCESS" },
        },
      });
    case types.CONFIRM_PWD_ERROR:
      return update(state, {
        status: {
          confirm_pwd: { $set: "FAILURE" },
        },
      });
    case types.PROFILE_PATH_SUCCESS:
      return update(state, {
        status: {
          profile_path: { $set: action.profile_path },
        },
      });
    default:
      return state;
  }
}
