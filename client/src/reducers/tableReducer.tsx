export interface ITableState {
  table: { players: String[]; _id: string } | null;
}

export interface ICreateTable {
  readonly type: "CREATE_TABLE";
  readonly payload: { players: string[] };
}

type Action = ICreateTable;

export const tableReducer = (
  state: ITableState = { table: null },
  action: Action
) => {
  switch (action.type) {
    case "CREATE_TABLE":
      return { ...state, table: action.payload };

    default:
      return state;
  }
};
