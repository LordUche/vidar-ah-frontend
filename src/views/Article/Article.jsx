/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import {
  Container,
  Row,
  CardDeck
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import ArticleTitle from '../../components/articleTitle/ArticleTitle';
import ArticleBody from '../../components/articleBody/ArticleBody';
import ImageContainer from '../../components/imageContainer/ImageContainer';
import ArticleSummary from '../../components/articleSummary/ArticleSummary';
import ArticleDescription from '../../components/articleDescription/ArticleDescription';
import { getArticleRequest } from '../../redux/actions/articles';

const Article = (props) => {
  const { history } = props;
  const { article, getArticle } = props;
  const { match: { params: { slug } } } = props;
  useEffect(() => {
    getArticle(slug);
  }, []);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="article-container">
      <Container>
        <Header location={history.location.pathname} />
      </Container>
      <Container>
        <ArticleTitle title={article.title} />
        <ArticleDescription description={article.description} />
        <ImageContainer src={article.images[0] || 'https://res.cloudinary.com/djdsxql5q/image/upload/v1554806589/Authors%20Haven/culture.jpg'} />
        <ArticleBody body={article.body} />
      </Container>
      <hr />
      <Container>
        <CardDeck>
          <Row>
            {
              props.recommendedArticles.map(recArticle => (
                <ArticleSummary
                          key={recArticle.id}
                          src={recArticle.images[0]}
                          header={recArticle.title}
                          slug={recArticle.slug}
                          time={recArticle.updatedAt}
                        />
              ))
            }
          </Row>
        </CardDeck>
      </Container>
    </div>
  );
};
Article.propTypes = {
  article: PropTypes.instanceOf(Object),
  getArticle: PropTypes.func.isRequired,
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  recommendedArticles: PropTypes.array.isRequired
};

Article.defaultProps = {
  article: null,
  history: {}
};

const mapStateToProps = state => ({
  article: state.articleReducer.article,
  recommendedArticles: state.articleReducer.trendingArticles.slice(0, 4)
});

const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(getArticleRequest(slug)),
});

const ConnectedArticle = connect(mapStateToProps, mapDispatchToProps)(Article);
export default ConnectedArticle;
