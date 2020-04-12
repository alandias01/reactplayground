import { put, takeEvery } from "redux-saga/effects";
import {
  greWordsActionEnum,
  getWordsSuccess,
  getWordsFailure,
  IWord,
} from "./../actions/greActions";

function* mySaga() {
  yield takeEvery(greWordsActionEnum.GET_WORDS_BEGIN, fetchUser);
}

function* fetchUser(action: any) {
  try {
    //API call to get data
    //const user = yield call(Api.fetchUser, action.payload.userId);
    const words: IWord[] = [];
    words.push({
      word: "sagaword",
      definition: "sagadef",
      partOfSpeech: "sagapos",
    });
    const res = getWordsSuccess(words);
    yield put(res);
  } catch (e) {
    //yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(getWordsFailure("sagaFailure"));
  }
}

export default mySaga;
