import React from "react";
import axios from "axios"; // data fetch를 위함
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [], //미래에 쓰일 것을 예상하고 만들어놔도 되고, 안만들어도 상관은 없음.
  };

  getMovies = async () => {
    //async와 await: 함수가 비동기. 실행이 시간이 걸릴 수도 있으니 기다리라는 말.
    const {
      data: {
        data: { movies }, // 받아온거.data.data.movies와 똑같은말. 이후에 더 편하게 쓰게 하려고!
      },
    } = await axios.get(
      "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating" //끝에 sort_by=rating은 list를 sort한 것
    ); //npm i axios 하고 써야 됨. API 주소에서 data를 가져온 것!
    this.setState({ movies: movies, isLoading: false }); //state의 movies를 받아온 movies로 설정
  };

  componentDidMount() {
    //fetch() : to fetch data, axios와 같은 역할 함. axios는 fetch위의 layer 같은 개념.
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      //html처럼 보이지만 이건 결국 javascript이기 떄문에, class 말고 clasName이라는 attribute 사용해야 함. (javascript clas 안에 있으면 component clas에 의해 혼란스러워질 수 있음)
      //jsx에서 완벽한 html처럼 쓰지는 않는다는게 핵심!
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie //받아온 movies 값을 사용해 rendering?
                key={movie.id} //React에서 list의 모든 원소는 unique해야 하기 때문
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
