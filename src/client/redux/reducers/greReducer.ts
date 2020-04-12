import { IWordsState, TWordActions } from "./../actions/greActions";
import { greWordsActionEnum } from "../actions/greActions";
import { produce } from "immer";

const initialState: IWordsState = {
  words: [],
};

export const greReducer = (
  state: IWordsState = initialState,
  action: TWordActions
): IWordsState => {
  let nextState: IWordsState;

  switch (action.type) {
    case greWordsActionEnum.GET_WORDS_SUCCESS:
      nextState = produce(state, (draft) => {
        action.payload.forEach((x) => draft.words.push(x));
      });

      return nextState;

    case greWordsActionEnum.GET_WORDS_FAILURE:
      //create a state variable to hold success failure status.  WordFetchStatus
      return state;

    case greWordsActionEnum.DELETE_WORDS:
      nextState = produce(state, (d) => {
        d.words.filter((x) => x.word !== action.payload[0].word);
      });
      return nextState;

    default:
      return state;
  }
};
