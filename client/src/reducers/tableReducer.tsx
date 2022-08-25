export interface ITableState {
  table: { players: String[]; _id: string } | null;
  error: any;
}

export interface ICreateTable {
  readonly type: "CREATE_TABLE";
  readonly payload: { players: string[]; _id: string };
}

export interface ITableError {
  readonly type: "TABLE_ERROR";
  readonly payload: any;
}

export interface IJoinTable {
  readonly type: "JOIN_TABLE";
  readonly payload: { players: string[]; _id: string };
}

type Action = ICreateTable | ITableError | IJoinTable;

export const tableReducer = (
  state: ITableState = { table: null, error: null },
  action: Action
) => {
  switch (action.type) {
    case "CREATE_TABLE":
      return { ...state, table: action.payload };

    case "TABLE_ERROR":
      return { ...state, error: action.payload };

    case "JOIN_TABLE":
      return { ...state, table: action.payload };

    default:
      return state;
  }
};