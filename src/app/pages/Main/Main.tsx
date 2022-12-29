import React, { useState, useEffect, useRef } from "react";
import { Select,  Button, Layout, Table, message } from "antd";
import { StyledMain } from "./Main.style";
import Logo from "../../../assets/img/crypto_logo.png";
import axios from "axios";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
type TCoin = {
  name: string;
  USD: number;
};
const { Header, Content, Footer } = Layout;
function Main() {
  const prevCoins = useRef<TCoin[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [coinList, setCoinList] = useState<string[]>(["DOGE", "BTC"]);
  const [coinData, setCoinData] = useState<TCoin[]>([]);

  const handleSearch = () => {
    if (coinList.includes(searchVal)) {
      alert("Already exist");
    } else {
      setCoinList([...coinList, searchVal]);
    }
  };

  const getCoin = async (coin: string) => {
    try {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=4467f9c263b8d45582b456a0d5e9fe7189406c9234c8e7c731db239b904de84d&gt`
      );
      return data;
    } catch (error) {}
  };

  const getData = async () => {
    let result: TCoin[] = [];
    coinList.forEach(async (coin) => {
      let data = await getCoin(coin);
      result.push({ name: coin, USD: data.USD });
    });
    setTimeout(() => {
      setCoinData(result);
    }, 1000);
  };

  const calcWithPrev = (coin: TCoin) => {
    if (prevCoins.current) {
      let currentCoin = prevCoins.current.find(
        (item) => item.name === coin.name
      );
      console.log(currentCoin);
      if (currentCoin) {
        return coin.USD > currentCoin.USD ? (
          <TiArrowSortedUp color="green" />
        ) : coin.USD < currentCoin.USD ? (
          <TiArrowSortedDown color="red" />
        ) : (
          "-"
        );
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "",
      width: 50,
      key: "number",
      render: (record: any, text: any, index: number) => {
        return <h5>{index + 1}</h5>;
      },
    },
    {
      title: "Name",
      dataIndex: "",
      key: "name",
      render: (record: any, text: any) => {
        return <h5>{record.name}</h5>;
      },
    },
    {
      title: "In USD",
      dataIndex: "",
      key: "value",
      render: (record: any, text: any) => {
        return <h5>{record?.USD}</h5>;
      },
    },
    {
      title: "In Graphic",
      dataIndex: "",
      key: "graphics",
      render: (record: any, text: any) => {
        return calcWithPrev(record);
      },
    },
  ];
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 5000);
    return () => clearInterval(interval);
  }, [coinList]);

  useEffect(() => {
    prevCoins.current = coinData;
  }, [coinData]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledMain>
      <header></header>
      <Layout>
        <Header>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="form_body">
            <Select
              showSearch
              className="search_inp"
              style={{ width: "250px" }}
              size="large"
              placeholder="Select a coin"
              onChange={(value: string) => setSearchVal(value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "DOGE",
                  label: "DogeCoin",
                },
                {
                  value: "BTC",
                  label: "Bitcoin",
                },
                {
                  value: "ETH",
                  label: "Ethereum",
                },
                {
                  value: "BUSD",
                  label: "BUSD",
                },
                {
                  value: "USDT",
                  label: "Tether",
                },
                {
                  value: "BNB",
                  label: "Binance",
                },
                {
                  value: "LTC",
                  label: "Litecoin",
                },
                {
                  value: "SOL",
                  label: "Solana",
                },
              ]}
            />
            <Button
              className="sbm_btn"
              size="large"
              type="primary"
              htmlType="submit"
              onClick={handleSearch}
              disabled={!searchVal}
            >
              Search
            </Button>
          </div>
        </Header>
        <Content className="site-layout">
          <div className="main_content" style={{ minHeight: 600 }}>
            <Table columns={columns} dataSource={coinData} />
          </div>
        </Content>
      </Layout>
    </StyledMain>
  );
}

export default Main;
