import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { Icon } from '../Icon';

const Container = styled.div`
  padding: 0 2rem;
  max-width: 35rem;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const DetailContainer = styled.div`
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled(Link)<{ $isActive: boolean }>`
  text-align: center;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
`;

const HomeBtn = styled(Link)`
  display: flex;
  align-items: center;
  position: fixed;
  top: 1rem;
  left: 1rem;
  font-size: 2.2rem;
  padding: 0.5rem 0;
  font-size: 1.6rem;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteState {
  state: {
    coinName: string;
  };
}

interface InfoInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface TickersInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { state } = useLocation() as RouteState;
  const { coinId } = useParams<string>();

  const priceMatch = useMatch(`/${coinId}/price`);
  const chartMatch = useMatch(`/${coinId}/chart`);

  const { isLoading: infoIsLoading, data: infoData } = useQuery<InfoInterface>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: tickersIsLoading, data: tickersData } =
    useQuery<TickersInterface>(
      ['tickers', coinId],
      () => fetchCoinTickers(coinId),
      { refetchInterval: 5000 }
    );

  /**
   * Not Use React Query
   */
  /*
  const [loading, setLoading] = useState(true);
  const [infoData, setInfo] = useState<InfoInterface>();
  const [tickersData, setPriceInfo] = useState<TickersInterface>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  */

  const isLoading = infoIsLoading || tickersIsLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.coinName
            ? state.coinName
            : isLoading
            ? 'Loading...'
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <HomeBtn to="/">
          <Icon name="arrow_back" />
        </HomeBtn>
        <Title>
          {state?.coinName
            ? state.coinName
            : isLoading
            ? 'Loading...'
            : infoData?.name}
        </Title>
      </Header>

      <DetailContainer>
        <Overview>
          <OverviewItem>
            <span>순위</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>기호</span>
            <span>{infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>현재 금액</span>
            <span>
              ${tickersData?.quotes?.USD?.price.toFixed(3) ?? 'Unknown'}
            </span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>총 발행량</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>최대 발행량</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>
        {infoData?.description ? (
          <Overview>
            <p>{infoData?.description}</p>
          </Overview>
        ) : null}

        <Tabs>
          <Tab to={`/${coinId}/price`} $isActive={priceMatch !== null}>
            가격
          </Tab>
          <Tab to={`/${coinId}/chart`} $isActive={chartMatch !== null}>
            차트
          </Tab>
        </Tabs>
        <Outlet context={{ coinId, tickersData }} />
      </DetailContainer>
    </Container>
  );
}

export default Coin;
