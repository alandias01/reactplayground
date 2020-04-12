export enum greWordsActionEnum {
  GET_WORDS_BEGIN = "GET_WORDS_BEGIN",
  GET_WORDS_SUCCESS = "GET_WORDS_SUCCESS",
  GET_WORDS_FAILURE = "GET_WORDS_FAILURE",
  DELETE_WORDS = "DELETE_WORDS",
}

export interface IWord {
  word: string;
  definition: string;
  partOfSpeech: string;
}

export interface IWordsState {
  words: IWord[];
}

export interface IRootState {
  gre: IWordsState;
}

interface IGetWordsBeginAction {
  type: greWordsActionEnum.GET_WORDS_BEGIN;
}

interface IGetWordsSuccessAction {
  type: greWordsActionEnum.GET_WORDS_SUCCESS;
  payload: IWord[];
}

interface IGetWordsFailureAction {
  type: greWordsActionEnum.GET_WORDS_FAILURE;
  error: string;
}

interface IDeleteWordsAction {
  type: greWordsActionEnum.DELETE_WORDS;
  payload: IWord[];
}

export type TWordActions =
  | IGetWordsBeginAction
  | IGetWordsSuccessAction
  | IGetWordsFailureAction
  | IDeleteWordsAction;

export const getWords = (): TWordActions => ({
  type: greWordsActionEnum.GET_WORDS_BEGIN,
});

export const getWordsSuccess = (words: IWord[]): TWordActions => ({
  type: greWordsActionEnum.GET_WORDS_SUCCESS,
  payload: words,
});

export const getWordsFailure = (error: string): TWordActions => ({
  type: greWordsActionEnum.GET_WORDS_FAILURE,
  error: error,
});

export const deleteWords = (words: IWord[]): TWordActions => ({
  type: greWordsActionEnum.DELETE_WORDS,
  payload: words,
});
