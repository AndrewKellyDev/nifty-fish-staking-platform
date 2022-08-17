import { darken } from "polished";
import styled, { css } from 'styled-components/macro'
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Activity } from "react-feather";
import { useWalletModalToggle } from "store/application/hooks";
import { shortenAddress } from "utils";
import StatusIcon from "../Identicon/StatusIcon";
import { ButtonSecondary } from "../Button";

const Web3StatusGeneric = styled(ButtonSecondary)`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 14px;
  cursor: pointer;
  user-select: none;
  height: 36px;
  margin-right: 2px;
  margin-left: 1px;
  :focus {
    outline: none;
  }
`;

const Web3StatusConnect = styled(Web3StatusGeneric)`
  background-color: #376bad70;
  border: none;

  color: #5090ea;
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${ darken(0.05, "#376bad70")};
    color: #5090ea;
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: #153d6f70;
      border: 1px solid #153d6f70;
      color: #5090ea;

      :hover,
      :focus {
        border: 1px solid ${darken(0.05, "#376bad70")};
        color: ${darken(0.05, "#5090ea")};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)`
  background-color: ${({ pending }) => (pending ? "#2172E5" : "#212429")};
  border: 1px solid ${({ pending }) => (pending ? "#2172E5" : "#212429")};
  color: #ffffff;
  font-weight: 500;
  :hover,
  :focus {
    border: 1px solid ${darken(0.05, "#40444F")};

    :focus {
      border: 1px solid
        ${({ pending }) =>
          pending ? darken(0.1, "#2172E5") : darken(0.1, "#2C2F36")};
    }
  }
`;

const Text = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`;
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: #ff4343;
  border: 1px solid #ff4343;
  color: #fff;
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${darken(0.1, "#FF4343")};
  }
`;
const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + "px" : "32px")};
    width: ${({ size }) => (size ? size + "px" : "32px")};
  }
`;

function WrappedStatusIcon({ connector }) {
  return (
    <IconWrapper size={16}>
      <StatusIcon connector={connector} />
    </IconWrapper>
  );
}

export const ConnectButton = () => {
  const { account, connector, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return (
      <Web3StatusConnected
        id="web3-status-connected"
        onClick={toggleWalletModal}
      >
        <Text>{shortenAddress(account)}</Text>
        {connector && <WrappedStatusIcon connector={connector} />}
      </Web3StatusConnected>
    );
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>
          {error instanceof UnsupportedChainIdError ? (
            <div>Wrong Network</div>
          ) : (
            <div>Error</div>
          )}
        </Text>
      </Web3StatusError>
    );
  } else {
    return (
        <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Text>
          <div>Connect Wallet</div>
        </Text>
      </Web3StatusConnect>
    );
  }
};
