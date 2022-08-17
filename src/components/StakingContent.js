import React, { useState, useMemo, useCallback, useEffect } from "react";
import { formatEther } from "@ethersproject/units";
import ImageCard from "./ImageCard";
import {
  Container,
  TextSpan,
  TextH2,
  TextButton,
} from "./Design.styled";
import { Tabs } from "pages/Staking";
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from "./TransactionConfirmationModal";
import { useStakingContract } from "hooks/useContract";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import useInterval from "use-interval";
import { ButtonPrimary } from "./Button";

function StakingContent({
  currentTabStatus,
  ownerTokenIds,
  ownerStakedTokenIds,
  reload,
}) {
  const { account, active } = useActiveWeb3React();
  const [selectedList, setSelectedList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [attemptingTxn, setAttemptingTxn] = useState(false);
  const [totalReward, setTotalReward] = useState("");
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false);
    setTxHash("");
  }, [txHash]);

  const stakingContract = useStakingContract();

  const addRemoveSelectedList = (id) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleClaimAll = async () => {
    if (ownerStakedTokenIds.length !== 0) {
      try {
        setAttemptingTxn(true);
        setShowConfirm(true);
        const tx = await stakingContract.claim(ownerStakedTokenIds);
        await tx.wait();
        setTxHash(tx.hash);
        setAttemptingTxn(false);
        setSelectedList([]);
        load();
      } catch (error) {
        console.log(error);
        setAttemptingTxn(false);
      }
    }
  };

  const handleBatchClaim =async ()=>{
    if (selectedList.length !== 0) {
        try {
          setAttemptingTxn(true);
          setShowConfirm(true);
          const tx = await stakingContract.claim(selectedList);
          await tx.wait();
          setTxHash(tx.hash);
          setAttemptingTxn(false);
          load();
        setSelectedList([]);

        } catch (error) {
          console.log(error);
          setAttemptingTxn(false);
        }
      }
  }

  const handleBatchStake =async ()=>{
    if (selectedList.length !== 0) {
        try {
          setAttemptingTxn(true);
          setShowConfirm(true);
          const tx = await stakingContract.stake(selectedList);
          await tx.wait();
          setTxHash(tx.hash);
          setAttemptingTxn(false);
          reload();
        setSelectedList([]);

        } catch (error) {
          console.log(error);
          setAttemptingTxn(false);
        }
      }
  }

  const handleBatchUnstake = async ()=>{
    if (selectedList.length !== 0) {
        try {
          setAttemptingTxn(true);
          setShowConfirm(true);
          const tx = await stakingContract.unstake(selectedList);
          await tx.wait();
          setTxHash(tx.hash);
          setAttemptingTxn(false);
          reload();
          load();
        } catch (error) {
          console.log(error);
          setAttemptingTxn(false);
        }
      }
  }

  useEffect(() => {
    setSelectedList([]);
  }, [currentTabStatus]);

  const displayIds = useMemo(() => {
    return currentTabStatus === Tabs.staking
      ? ownerTokenIds
      : ownerStakedTokenIds;
  }, [ownerTokenIds, ownerStakedTokenIds, currentTabStatus]);

  const load = async () => {
    if (!active || ownerStakedTokenIds.length === 0) return;
    const _totalReward = await stakingContract.earningInfo(
      account,
      ownerStakedTokenIds
    );
    setTotalReward(formatEther(_totalReward.toString()));
  };

  useEffect(() => {
    load();
  }, [account, active, ownerStakedTokenIds]);

  useInterval(() => {
    load();
  }, 30000);

  return (
    <Container>
      {/* Text Container */}
      <div className="grid grid-cols-1 rounded-t-xl sm:grid-cols-3 bg-primary">
        <div className="border p-5 border-secondary">
          <TextSpan>Total Shark Labs</TextSpan>
          <TextH2>
            {ownerTokenIds.length + ownerStakedTokenIds.length} Shark Labs
          </TextH2>
        </div>
        <div className="border p-5  border-secondary">
          <TextSpan>Staked Terra Shark Labs</TextSpan>
          <TextH2>{ownerStakedTokenIds.length} Shark Labs</TextH2>
        </div>
        {/* <TextThirdDiv>
          <TextSpan>You have earned:</TextSpan>
          <TextH2>9.842.876</TextH2>
        </TextThirdDiv> */}
        <div className="border p-5 border-secondary flex justify-between items-center">
          <div>
            <TextSpan>Available For Claim</TextSpan>
            <TextH2>{totalReward ? Number(totalReward).toFixed(3) : 0}</TextH2>
          </div>
          <div>
            <TextButton onClick={() => handleClaimAll()}>Claim All</TextButton>
          </div>
        </div>
        {/* <TextFifthDiv>
          <TextSpan>Paid out</TextSpan>
          <TextH2>9.992.1287</TextH2>
        </TextFifthDiv> */}
      </div>

      {/* Text Container */}

      {/* Card Container */}
      <div className="bg-primary border-secondary border rounded-b-2xl p-7">
        <div className="p-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
            {displayIds.map((item, index) => (
              <ImageCard
                data={item}
                staking={currentTabStatus === Tabs.staking}
                reload={reload}
                refetchTotalReward={load}
                setShowConfirm={setShowConfirm}
                setTxHash={setTxHash}
                setAttemptingTxn={setAttemptingTxn}
                totalReward={totalReward}
                selectedList={selectedList}
                addRemoveSelectedList={addRemoveSelectedList}
                key={index}
              />
            ))}
        </div>
        <div className="flex justify-center">
          {selectedList.map((id, index) => (
            <span
              className="mr-2 bg-white text-primary rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
              key={index}
              onClick={() => addRemoveSelectedList(id)}
            >
              {id.toString()}
            </span>
          ))}
        </div>
      {selectedList.length !==0 && currentTabStatus===Tabs.unstaking && <div className="flex justify-center items-center w-80 mx-auto gap-10 mt-4">
             <ButtonPrimary onClick={()=>handleBatchClaim()}>   Claim</ButtonPrimary>
             <ButtonPrimary onClick={()=> handleBatchUnstake()}>   Unstake</ButtonPrimary>
        </div>}
        {selectedList.length !==0 && currentTabStatus===Tabs.staking && <div className="flex justify-center items-center w-80 mx-auto gap-10 mt-4">
             <ButtonPrimary onClick={()=>handleBatchStake()} >   Stake</ButtonPrimary>
        </div>}
      </div>

      {/* Card Container */}
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txHash}
        pendingText={<div>Transaction peding</div>}
        content={() => (
          <ConfirmationModalContent
            title={<div>Transaction Failed</div>}
            onDismiss={() => setShowConfirm(false)}
            topContent={
              "Transaction may fail or user denied transaction signature"
            }
          />
        )}
      />
    </Container>
  );
}

export default StakingContent;
