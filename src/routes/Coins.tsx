import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

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

const CoinList = styled.ul`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  min-height: 3.5rem;
  border-radius: 0.5rem;
  a {
    display: flex;
    padding: 1rem;
    width: 100%;
    align-items: center;
    transition: color 0.3s;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Logo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.7rem;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins);

  /**
   * Not Use React Query
   */
  /*
  const [coins, setCoins] = useState<ICoin[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  */

  return (
    <Container>
      <Helmet>
        <title>코인 리스트</title>
      </Helmet>
      <Header>
        <Title>코인 리스트</Title>
      </Header>
      <CoinList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ coinName: coin.name }}>
                <Logo
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.id}
              </Link>
            </Coin>
          ))
        )}
      </CoinList>
    </Container>
  );
}

export default Coins;
