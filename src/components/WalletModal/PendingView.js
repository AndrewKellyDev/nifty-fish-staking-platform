import { ButtonEmpty, ButtonPrimary } from "components/Button";
import styled from "styled-components/macro";
import Loader from "../Loader";

const PendingSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  & > * {
    padding: 1rem;
  }
`;

const ErrorGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
  resetAccountView,
}) {
  return (
    <PendingSection>
      <LoadingMessage>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div style={{ marginBottom: 12 }}>
                <div>Error connecting</div>
              </div>
              <div
                style={{ fontSize: 14, marginBottom: 36, textAlign: "center" }}
              >
                <div>
                  The connection attempt failed. Please click try again and
                  follow the steps to connect in your wallet.
                </div>
              </div>
              <ButtonPrimary
                $borderRadius="12px"
                padding="12px"
                onClick={() => {
                  setPendingError(false);
                  connector && tryActivation(connector);
                }}
              >
                <div>Try Again</div>
              </ButtonPrimary>
              <ButtonEmpty width="fit-content" padding="0" marginTop={20}>
                <div style={{ fontSize: 12 }} onClick={resetAccountView}>
                  <div>Back to wallet selection</div>
                </div>
              </ButtonEmpty>
            </ErrorGroup>
          ) : (
            <>
              <div
                style={{
                  color: "#fff",
                  fontSize: 20,
                  marginLeft: 16,
                  marginRight: 16,
                }}
              >
                <LoaderContainer>
                  <Loader stroke="currentColor" size="32px" />
                </LoaderContainer>
                <div>Connecting...</div>
              </div>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
    </PendingSection>
  );
}
