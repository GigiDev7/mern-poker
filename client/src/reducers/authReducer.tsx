export interface IUser {
  email: string;
  dateOfBirth: Date;
  username: string;
  token: string;
}

export interface IUserState {
  user: IUser | null;
  error: any;
}

export interface ISetUser {
  readonly type: "SET_USER";
  readonly payload: IUser;
}

export interface IAuthError {
  readonly type: "AUTH_ERROR";
  readonly payload: any;
}

export interface ILogout {
  readonly type: "LOGOUT";
}

export interface IClearErrors {
  readonly type: "CLEAR_ERRORS";
}

type Action = ISetUser | IAuthError | ILogout | IClearErrors;

export const authReducer = (
  state: IUserState = { user: null, error: null },
  action: Action
) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "AUTH_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_ERRORS":
      return { ...state, error: null };

    default:
      return state;
  }
};
