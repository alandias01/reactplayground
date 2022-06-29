import React, { createContext, useReducer } from 'react';

type IAction = { type: string, payload?: any };

type IFetchDataState = {
  data?: any;
  isLoading: boolean;
  error?: Error;
}

const fetchDataInitialState: IFetchDataState = { isLoading: false }

const FetchDataAction = {
  REQUEST: "REQUEST",
  DONE: "DONE",
  ERROR: "ERROR"
}

function ArticleReducer(prevState: IFetchDataState, action: IAction): IFetchDataState {
  switch (action.type) {
    case FetchDataAction.REQUEST:
      return { ...prevState, isLoading: true }
    case FetchDataAction.DONE:
      return { ...prevState, isLoading: false, data: action.payload, error: undefined }
    case FetchDataAction.ERROR:
      return { ...prevState, isLoading: false, data: undefined, error: action.payload }
    default:
      return prevState;
  }
}

const ArticleContext = createContext({ articles: fetchDataInitialState, dispatchArticles: (article: IAction) => { } });

export function ArticleContextProvider({ children }: { children: React.ReactNode }) {
  const [articles, dispatchArticles] = useReducer(ArticleReducer, fetchDataInitialState);
  return (
    <div>
      <ArticleContext.Provider value={{ articles, dispatchArticles }}>
        {children}
      </ArticleContext.Provider>
    </div>
  );
}