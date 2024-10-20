import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialSearchState = {
    search: ""
}

const SearchSlice= createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        searchWord: (state: TSearchState, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

export const searchActions = SearchSlice.actions;

export type TSearchState = typeof initialSearchState;

export default SearchSlice.reducer;