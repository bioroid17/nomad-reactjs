import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("0");
  const [coin, setCoin] = useState(null);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (coins.length !== 0) {
      setCoin(coins[0]);
    }
  }, [coins]);
  const onChange = (event) => setMoney(event.target.value);
  const onSelect = (event) => setCoin(JSON.parse(event.target.value));
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id} value={JSON.stringify(coin)}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <br />
      <input value={money} onChange={onChange} type="number" /> USD
      <br />
      <br />
      is equals to...
      {loading ? (
        ""
      ) : (
        <h2>
          {money.length === 0
            ? 0
            : coin != null
            ? parseFloat(money) / coin.quotes.USD.price
            : 0}
          &nbsp;BTC {coin != null ? `(${coin.symbol})` : null}
        </h2>
      )}
    </div>
  );
}

export default App;
