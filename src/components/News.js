import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalize = (words) =>{
    return words.charAt(0).toUpperCase() + words.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsApp`;
  }


  async componentDidMount() {
    this.props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      this.props.setProgress(30);
      let data = await fetch(url);
      let parseData = await data.json()
      this.props.setProgress(70);
      this.setState({articles : parseData.articles, totalResults : parseData.totalResults,loading: false})
      this.props.setProgress(100);
  }
  // async updateNews(){
  //   const url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39d47a25bf8e4e6c9d725bfaa37cf2e5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parseData = await data.json()
  //   this.setState({articles : parseData.articles, totalResults : parseData.totalResults,loading: false})
  // }
  handleNextPage = async () =>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
      this.props.setProgress(10);  
      let url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(50);
        let parseData = await data.json()
        this.props.setProgress(70);
        this.setState({
            page : this.state.page + 1,
            articles : parseData.articles,
            loading:false
        })
        this.props.setProgress(100);
    }


    // this.setState({page : this.state.page + 1});
    // this.updateNews();
}
 handlePreviousPage = async () =>{
  this.props.setProgress(10);
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    this.props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json()
    this.props.setProgress(70);
    this.setState({
        page : this.state.page - 1,
        articles : parseData.articles,
        loading:false
    })
    this.props.setProgress(100);

    // this.setState({page : this.state.page - 1});
    // this.updateNews();
}

  render() {
    // const { articles} = this.state; //When not rending in mobile
    return (
      <div className="container my-3">
       
        <h2 className="text-center" style={{margin:30, marginTop:'80px'}}>NewsAPP - Trending News from {this.capitalize(this.props.category)}</h2>
{this.state.loading && <Spinner />}
        <div className="row">
  
          {/* {!this.state.loading && this.state.articles.map((element) => { */}
           {!this.state.loading && Array.isArray(this.state.articles) && this.state.articles.map((element) => { 
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                author={element.author===null?"Unknown":element.author}
                date = {new Date(element.publishedAt).toGMTString()}
                  newsUrl={element.url}
                  title={element.title!== null?element.title.slice(0, 70):""}
                  description={element.description !== null?element.description.slice(0, 100):element.title}
                  urlToImage={element.urlToImage !== null ? element.urlToImage:"https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
            <button disabled={this.state.page<=1}  type="button" style={{width:110}} className="btn btn-secondary" onClick={this.handlePreviousPage}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" style={{width:110}} className="btn btn-primary" onClick={this.handleNextPage}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
