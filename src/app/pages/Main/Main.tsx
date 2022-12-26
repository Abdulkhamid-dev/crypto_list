import React, { useState, useEffect } from "react";
import { Select, Form, Button, Layout, Table } from "antd";
import { StyledMain } from "./Main.style";
import Logo from "../../../assets/img/crypto_logo.png";
import axios from "axios";
type TCoin = {
  name: string;
  value: number;
};
const { Header, Content, Footer } = Layout;
function Main() {
  const [searchVal, setSearchVal] = useState<string>("");
  const [coinList, setCoinList] = useState<string[]>(["DOGE"]);
  const [coinData, setCoinData] = useState<any[]>([]);

  const handleSearch = () => {
    if (coinList.includes(searchVal)) {
      alert("Already exist");
    }
    setCoinList([...coinList, searchVal]);
  };

  console.log(coinList);

  const sendReq = async () => {
    try {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD&api_key=4467f9c263b8d45582b456a0d5e9fe7189406c9234c8e7c731db239b904de84d&gt`
      );
      console.log(data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {});

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "In USD",
      dataIndex: "value",
      key: "value",
    },
  ];
  useEffect(() => {
    sendReq();
  }, [coinList]);
  useEffect(() => {
    setInterval(() => {
      sendReq();
    }, 5000);
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
            <Button>Get</Button>
            {/* <Table columns={columns} dataSource={coinData} /> */}
            {JSON.stringify(coinData)}
          </div>
        </Content>
      </Layout>
    </StyledMain>
  );
}

export default Main;
