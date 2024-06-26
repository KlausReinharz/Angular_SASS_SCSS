import {User} from './user.models';

import * as fromActions from './user.actions';

export interface UserState{
  entity: User | null;
  loading: boolean| null;
  error: string | null;
}

const initialState: UserState ={
  entity: null,
  loading: null,
  error:null
}


export  function reducer (state = initialState, action: fromActions.All|any): UserState{
  switch(action.type){
    case fromActions.Types.READ:{
      return {...state, loading: true, error: null};
    }

    case fromActions.Types.READ_SUCCESS:{
      return {...state, entity: action.user, loading: false, error: null};
    }

    case fromActions.Types.READ_ERROR:{
      return {...state,entity:null, loading: false, error: action.error};
    }

    case fromActions.Types.CLEAR:{
      return {...initialState};
    }

    default:{
      return state;
    }
  }
}
