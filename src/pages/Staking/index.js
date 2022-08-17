import { useEffect, useState } from "react";

import ChildNavbar from "components/ChildNavbar";
import Footer from "components/Footer";
import StakingContent from "components/StakingContent";
import Navbar from "components/Navbar";
import WalletModal from "components/WalletModal";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useNFTContract, useStakingContract } from "hooks/useContract";
import { useToggleApproved } from "store/application/hooks";

export const Tabs = {
  staking: "staking",
  unstaking: "unstaking",
};

const StakingPage = () => {
  const { account, active } = useActiveWeb3React();
  const [ownerTokenIds, setOwnerTokenIds] = useState([]);
  const [ownerStakedTokenIds, setOwnerStakedTokenIds] = useState([]);
  const [currentTabStatus, setCurrentTabStatus] = useState(Tabs.staking);
  const nftContract = useNFTContract();
  const stakingContract = useStakingContract();

  const toggleApproved = useToggleApproved()

  const loadData = async () => {
    const calls = [
      nftContract.walletOfOwner(account),
      stakingContract.tokensOfOwner(account),
      nftContract.isApprovedForAll(account, "0xa166d47Ee78675aF3DAd200054cA22F3215E3BB6"),
    ];
    const [_ownerTokenIds, _ownerStakedTokenIds, _approved] = await Promise.all(calls);
    setOwnerTokenIds(_ownerTokenIds);
    setOwnerStakedTokenIds(_ownerStakedTokenIds);
    if(_approved){
        toggleApproved()
    }
  };
  useEffect(() => {
    if (active) loadData();
  }, [active, account]);

  return (
    <div>
      <WalletModal />
      <Navbar />
      <ChildNavbar
        currentTabStatus={currentTabStatus}
        setCurrentTabStatus={setCurrentTabStatus}
        ownerTokenCount={ownerTokenIds.length}
        ownerStakedTokenCount = {ownerStakedTokenIds.length}
      />
      <StakingContent currentTabStatus={currentTabStatus} ownerTokenIds={ownerTokenIds} ownerStakedTokenIds={ownerStakedTokenIds} reload={loadData} />
      <Footer /> 
    </div>
  );
};

export default StakingPage;
