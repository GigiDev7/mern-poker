export interface IPlayer {
  cards: string[];
  chips: number;
  player: string;
}

export interface ITableState {
  table: { players: IPlayer[]; _id: string } | null;
  error: any;
  playingChips: any;
  pot: number;
}

export interface ICreateTable {
  readonly type: "CREATE_TABLE";
  readonly payload: { players: IPlayer[]; _id: string };
}

export interface ITableError {
  readonly type: "TABLE_ERROR";
  readonly payload: any;
}

export interface IJoinTable {
  readonly type: "JOIN_TABLE";
  readonly payload: { players: IPlayer[]; _id: string };
}

export interface IUpdateTable {
  readonly type: "UPDATE_TABLE";
  readonly payload: { players: string[]; _id: string };
}

export interface IUpdateChips {
  readonly type: "UPDATE_CHIPS";
  readonly payload: { chips: number; player: string };
}

type Action =
  | ICreateTable
  | ITableError
  | IJoinTable
  | IUpdateTable
  | IUpdateChips;

export const tableReducer = (
  state: ITableState = { table: null, playingChips: null, pot: 0, error: null },
  action: Action
) => {
  switch (action.type) {
    case "CREATE_TABLE":
      return { ...state, table: action.payload };

    case "TABLE_ERROR":
      return { ...state, error: action.payload };

    case "JOIN_TABLE":
      return { ...state, table: action.payload };

    case "UPDATE_TABLE":
      return { ...state, table: action.payload };

    case "UPDATE_CHIPS":
      const player = state.table?.players.find(
        (el) => el.player === action.payload.player
      );
      const newPlayer = {
        ...player,
        chips: player!.chips - action.payload.chips,
      };
      Object.assign(player as IPlayer, newPlayer);

      let newPlayingChips = {
        ...state.playingChips,
        [action.payload.player]: action.payload.chips,
      };

      const vals: number[] = Object.values(newPlayingChips);

      let newPot = vals.reduce((a, b) => a + b, 0);

      return {
        ...state,
        pot: newPot,
        playingChips: newPlayingChips,
      };

    default:
      return state;
  }
};
