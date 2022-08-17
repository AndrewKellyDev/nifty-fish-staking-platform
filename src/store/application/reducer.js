import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModalStatus: false,
  isApproved: false,
  metaDataUriPrefix: "ipfs:/QmPsYDvyrADWAQLkNeXZkvxRAoZx5e4Maw3ke4PDSVseNv/",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.walletModalStatus = action.payload;
    },
    setApproved(state, action) {
      state.isApproved = action.payload;
    },
    setMetaDataUriPrefix(state, action) {
      state.isApproved = action.payload;
    },
  },
});

export const { setOpenModal, setApproved, setMetaDataUriPrefix } = applicationSlice.actions;
export default applicationSlice.reducer;
