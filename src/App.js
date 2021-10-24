import React, { useState, useEffect } from "react";
import "./styles.css";
import "mvp.css";

function currencyFormat(num, query) {
  return query + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function numberFormat(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function App() {
  const [data, setData] = useState({ coins: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [toggle, setToggle] = React.useState(false);
  const buttonClass = toggle ? "on" : "off";

  function checkOutput(query) {
    if (!query) return setUrl("") || setData({ coins: [] });
  }

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((response) => response.json())
      .then(setData);
  }, [url]);

  if (!data) return null;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title"> List of Cryptocurrencies </h1>
        <form className="box">
          <div className="field">
            <label className="label">
              Search Cryptocurrencies Price by Currency Code
            </label>
          </div>
          <div>
            <input
              type="text"
              onfocus="this.value=''"
              onClick={() => setData({ coins: [] })}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              className={buttonClass}
              type="button"
              onClick={() =>
                setToggle(!toggle) ||
                setUrl(
                  `https://api.coinstats.app/public/v1/coins?currency=${query.toUpperCase()}`
                ) ||
                checkOutput(query)
              }
            >
              Search
            </button>
          </div>
          <div className="field">
            <p className="help">
              Try these search
              <a
                className="subHelp"
                href="#USD"
                onClick={() => setQuery("USD") || setData({ coins: [] })}
              >
                USD
              </a>
              ||
              <a
                className="subHelp"
                href="#CAD"
                onClick={() => setQuery("CAD") || setData({ coins: [] })}
              >
                CAD
              </a>
              ||
              <a
                className="subHelp"
                href="#EUR"
                onClick={() => setQuery("EUR") || setData({ coins: [] })}
              >
                EUR
              </a>
              .
            </p>
          </div>
          <ul>
            {data.coins.map((item) => (
              <li key={item.id}>
                <summary>
                  <img src={item.icon} alt={item.symbol} /> {item.name}
                </summary>
                <p>
                  <sup>Website: {item.websiteUrl}</sup>
                  <sup>
                    Price:{currencyFormat(item.price, query.toUpperCase())}
                  </sup>
                  <sup>
                    MarketCap:
                    {currencyFormat(item.marketCap, query.toUpperCase())}
                  </sup>
                  <sup>
                    Available Supply: {numberFormat(item.availableSupply)}
                  </sup>
                </p>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </section>
  );
}
export default App;
