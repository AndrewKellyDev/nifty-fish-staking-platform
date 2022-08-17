import React, { useCallback, useEffect, useState } from "react";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useNFTContract, useStakingContract } from "hooks/useContract";
import { formatEther } from "@ethersproject/units";
import { Image, Shimmer } from "react-shimmer";
import {
  InnerCard,
  Unstake,
  Collect,
  InnerCardSpan,
  Line,
} from "./Design.styled";
import { useIsApproved, useToggleApproved } from "store/application/hooks";

function ImageCard({
  data,
  staking,
  reload,
  setTxHash,
  setShowConfirm,
  setAttemptingTxn,
  totalReward,
  refetchTotalReward,
  addRemoveSelectedList,
  selectedList,
}) {
  const { account } = useActiveWeb3React();
  const stakingContract = useStakingContract();
  const nftContract = useNFTContract();
  const [reward, setReward] = useState();
  const [stakedTime, setStakedTime] = useState();
  const approved = useIsApproved();
  const toggleApprove = useToggleApproved();
  const handleStake = async () => {
    try {
      setAttemptingTxn(true);
      setShowConfirm(true);
      const tx = await stakingContract.stake([data.toString()]);
      await tx.wait();
      setTxHash(tx.hash);
      reload();
      setAttemptingTxn(false);
    } catch (error) {
      console.log(error);
      setAttemptingTxn(false);
    }
  };

  const handleUnstake = async () => {
    try {
      setAttemptingTxn(true);
      setShowConfirm(true);
      const tx = await stakingContract.unstake([data.toString()]);
      await tx.wait();
      setTxHash(tx.hash);
      reload();
      refetchTotalReward();
      setAttemptingTxn(false);
    } catch (error) {
      console.log(error);
      setAttemptingTxn(false);
    }
  };

  const handleApprove = async () => {
    try {
      setAttemptingTxn(true);
      setShowConfirm(true);
      const tx = await nftContract.setApprovalForAll(
        "0xa166d47Ee78675aF3DAd200054cA22F3215E3BB6",
        true
      );
      const confirm = await tx.wait();
      if (confirm.status) {
        setTxHash(tx.hash);
        toggleApprove();
        setAttemptingTxn(false);
      }
    } catch (error) {
      console.log(error);
      setAttemptingTxn(false);
    }
  };
  const load = async () => {
    const calls = [
      stakingContract.earningInfo(account, [data.toString()]),
      stakingContract.vault(data.toString()),
    ];
    const [_reward, _stakedTime] = await Promise.all(calls);
    console.log(_reward)
    setReward(formatEther(_reward.toString()));
    setStakedTime(_stakedTime.timestamp);
  };

  const handleClaim = async () => {
    try {
      setAttemptingTxn(true);
      setShowConfirm(true);
      const tx = await stakingContract.claim([data.toString()]);
      await tx.wait();
      setTxHash(tx.hash);
      refetchTotalReward();
      setAttemptingTxn(false);
    } catch (error) {
      console.log(error);
      setAttemptingTxn(false);
    }
  };

  useEffect(() => {
    if (!staking) load();
  }, [totalReward]);

  const stakedDay = (new Date().getTime() / 1000 - stakedTime) / 3600 / 24;

  return (
    <InnerCard>
      {/* Card Image */}
      <div
        className="cursor-pointer px-5 pb-5 pt-10 pb-4 relative"
        onClick={() => {
          addRemoveSelectedList(data);
        }}
      >
        <input
          className="mb-2 cursor-pointer absolute top-4 right-5"
          type="checkbox"
          readOnly
          checked={selectedList.includes(data)}
        />
        <Image
          src={`https://gateway.pinata.cloud/ipfs/Qmci5vemotjePa3MKgBs9pN5gqLhaxx2ZwTjRb8KYXJmwr/${data.toString()}.png`}
          fallback={<Shimmer width={300} height={200} />}
        />
      </div>
      {/* Card Image */}

      {/* Card Text */}
      <div className="px-5 pb-3">
        <div className="text-center">Shark Labs #{data.toString()}</div>
        {!staking && (
          <div className="mt-2">
            < div className="flex justify-between items-center">
              <InnerCardSpan>Earned:</InnerCardSpan>
              <div className="text-xs">
                {reward ? Number(reward).toFixed(3) : 0}
              </div>
            </div>
            <Line percent={(stakedDay / 7) * 100} />
            < div className="flex justify-between items-center">

              <InnerCardSpan>Time staked:</InnerCardSpan>
              <div className="text-xs">
                {stakedTime ? parseInt(stakedDay) : 0}/7 days
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Text */}

      {/* Card Button */}
      <div className="flex justify-around text-sm border-t border-secondary">
        <Unstake
          onClick={() => {
            if (staking) {
              if (approved) handleStake();
              else handleApprove();
            } else handleUnstake();
          }}
        >
          {staking ? (approved ? "Stake" : "Approve") : "Unstake"}
        </Unstake>
        {!staking && (
          <Collect
            onClick={() => {
              handleClaim();
            }}
          >
            Claim
          </Collect>
        )}
      </div>
      {/* Card Button */}
    </InnerCard>
  );
}

export default ImageCard;
