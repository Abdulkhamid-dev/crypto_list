import React, { useState, useEffect, useRef } from "react";
import { Select, Button, Layout, Table, message, Popconfirm } from "antd";
import { StyledMain } from "./Main.style";
import Logo from "../../../assets/img/crypto_logo.png";
import axios from "axios";
import { HiArrowTrendingDown, HiOutlineArrowTrendingUp } from "react-icons/hi2";
type TCoin = {
  name: string;
  USD: number;
};
const { Header, Content } = Layout;
function Main() {
  const prevCoins = useRef<TCoin[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [coinList, setCoinList] = useState<string[]>(["DOGE"]);
  const [coinData, setCoinData] = useState<TCoin[]>([]);

  const handleSearch = () => {
    if (coinList.includes(searchVal)) {
      message.warning("This currency already exist");
    } else {
      setCoinList([...coinList, searchVal]);
    }
  };

  const getCoin = async (coin: string) => {
    try {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=4467f9c263b8d45582b456a0d5e9fe7189406c9234c8e7c731db239b904de84d&gt`
      );
      return { name: coin, USD: data.USD };
    } catch (error) {
      return error;
    }
  };

  const getData = async () => {
    let promiseArray: any[] = [];
    for (let i = 0; i < coinList.length; i++) {
      promiseArray.push(getCoin(coinList[i]));
    }

    Promise.all(promiseArray)
      .then((values) => setCoinData(values))
      .catch((err) => console.log(err));
  };

  const calcWithPrev = (coin: TCoin) => {
    if (prevCoins.current) {
      let currentCoin = prevCoins.current.find(
        (item) => item.name === coin.name
      );
      if (currentCoin) {
        return coin.USD > currentCoin.USD ? (
          <HiOutlineArrowTrendingUp size={25} color="green" />
        ) : coin.USD < currentCoin.USD ? (
          <HiArrowTrendingDown size={25} color="red" />
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


  const deleteCoin = (coinName: string) => {
    let filteredCoinList = coinList.filter((item: string) => item !== coinName);
    let filteredCoins = coinData.filter(
      (item: TCoin) => item.name !== coinName
    );
    setCoinList(filteredCoinList);
    setCoinData(filteredCoins);
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
      title: "Rate",
      dataIndex: "",
      key: "rate",
      render: (record: any, text: any) => {
        return calcWithPrev(record);
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (record: any, text: any) => {
        return (
          <Popconfirm
            title="Delete the currency"
            onConfirm={() => deleteCoin(record?.name)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        );
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
