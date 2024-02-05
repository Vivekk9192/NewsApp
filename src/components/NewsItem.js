import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description,urlToImage,newsUrl,author,date } = this.props;
    return (
      <div className="my-3">        
        <div className="card">
        <a href={newsUrl} rel="noreferrer" target="_blank">
          <img
            src={urlToImage}
            className="card-img-top"
            alt="..."
            style={{height:180}}
          />
             </a>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More. . . 
            </a>
          </div>
        </div>     
      </div>
    );
  }
}

export default NewsItem;
