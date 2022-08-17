import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setApproved,
  setMetaDataUriPrefix,
  setOpenModal,
} from "./reducer";

export function useWalletModalOpen() {
  return  useAppSelector(
    (state) => state.application.walletModalStatus
  )
}

export function useWalletModalToggle() {
  const open = useWalletModalOpen();
  const dispatch = useAppDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? false : true)),
    [dispatch, open]
  );
}

export function useIsApproved() {
  return  useAppSelector(
    (state) => state.application.isApproved
  )
}

export function useToggleApproved() {
  const dispatch = useAppDispatch();
  return useCallback(
    () => dispatch(setApproved(true)),
    [dispatch]
  );
}
