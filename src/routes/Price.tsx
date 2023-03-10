import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { TickersInterface } from './Coin';

interface PriceProps {
  tickersData: TickersInterface;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 8rem;
  p {
    line-height: 1.5;
  }
`;

const Overview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  padding: 1rem;
  width: 100%;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  span:first-child {
    font-size: 0.75rem;
    font-weight: 700;
    opacity: 0.6;
  }
`;

const ProgressItem = styled.span<{ $isUp: boolean }>`
  color: ${(props) =>
    props.$isUp ? props.theme.upwardColor : props.theme.downwardColor};
`;

function Price() {
  const { tickersData } = useOutletContext<PriceProps>();

  const quotes = tickersData?.quotes?.USD;
  const athDate = new Date(quotes?.ath_date);
  const athDateString = athDate.toLocaleDateString('ko-KR');
  const athTimeString = athDate.toLocaleTimeString('ko-KR');

  return (
    <Container>
      <Overview>
        <OverviewItem>
          <span>최고금액 날짜</span>
          <span>{`${athDateString} ${athTimeString}`}</span>
        </OverviewItem>
        <OverviewItem>
          <span>금액</span>
          <span>${quotes?.ath_price?.toFixed(3)}</span>
        </OverviewItem>
      </Overview>

      <Overview>
        <OverviewItem>
          <span>1시간 전 비교</span>
          <ProgressItem $isUp={quotes?.percent_change_1h >= 0 ? true : false}>
            {quotes?.percent_change_1h}%
          </ProgressItem>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>24시간 전 비교</span>
          <ProgressItem $isUp={quotes?.percent_change_24h >= 0 ? true : false}>
            {quotes?.percent_change_24h}%
          </ProgressItem>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>일주일 전 비교</span>
          <ProgressItem $isUp={quotes?.percent_change_7d >= 0 ? true : false}>
            {quotes?.percent_change_7d}%
          </ProgressItem>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>한달 전 비교</span>
          <ProgressItem $isUp={quotes?.percent_change_30d >= 0 ? true : false}>
            {quotes?.percent_change_30d}%
          </ProgressItem>
        </OverviewItem>
      </Overview>
    </Container>
  );
}

export default Price;
