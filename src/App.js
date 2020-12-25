import React from "react";
import axios from "axios"; // data fetch를 위함

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [], //미래에 쓰일 것을 예상하고 만들어놔도 되고, 안만들어도 상관은 없음.
  };

  getMovies = async () => {
    //async와 await: 함수가 비동기. 실행이 시간이 걸릴 수도 있으니 기다리라는 말.
    const movies = await axios.get(
      "https://yts-proxy.nomadcoders1.now.sh/list_movies.json"
    ); //npm i axios 하고 써야 됨. API 주소에서 data를 가져온 것!
  };

  componentDidMount() {
    //fetch() : to fetch data, axios와 같은 역할 함. axios는 fetch위의 layer 같은 개념.
    this.getMovies();
  }

  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? "Loading..." : "We are ready"}</div>;
  }
}

export default App;
