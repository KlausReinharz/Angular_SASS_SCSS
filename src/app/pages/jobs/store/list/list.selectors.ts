import { createSelector } from "@ngrx/store";
import { getJobsState, JobState } from "../index";
import { listAdapter } from "./list.reducer";

export const getListState = createSelector(
  getJobsState,
  (state: JobState) => state.list
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = listAdapter.getSelectors(getListState);

/*export const selectEntityById = createSelector(
  selectEntities,
  (entities:any, props:{
    id:string
  }) => {return entities[props.id]}
)*/
export const selectEntityById = (id:string)=> createSelector(
  selectEntities,
  entities => entities[id]
);
