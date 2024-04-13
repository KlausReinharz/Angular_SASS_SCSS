import { createSelector, createFeatureSelector } from "@ngrx/store";
import { DictionariesState } from "./dictionaries.reducer";
//uesde firebase de obtine la data que se va a almancenar en memorialo actions pasa el reducer
export const getDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

//los selector me va a permitir obtner la data del store
// el metodo que va a devolver la informacion solicitida
export const getDictionaries = createSelector(
  getDictionariesState,
  (state)=>state.entities
)

export const getLoading= createSelector(
  getDictionariesState,
  (state)=>state.loading
)
// la data esta lista para ser comsumida
export const getIsReady= createSelector(
  getDictionariesState,
  (state)=>state.entities && !state.loading
)
//acceder al store a la data
export const getRoles = createSelector(
  getDictionaries,
  (state)=>state?.roles
)

export const getQualifications = createSelector(
  getDictionaries,
  (state)=>state?.qualifications
)

export const getSkills = createSelector(
  getDictionaries,
  (state)=>state?.skills
)

export const getSpecializations = createSelector(
  getDictionaries,
  (state)=>state?.specializations
)



