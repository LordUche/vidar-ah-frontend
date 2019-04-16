import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateArticle from '../../views/createArticle/index';

describe('Create Article', () => {
  const mockStore = configureStore([thunk]);
  let component;
  it('renders correctly', () => {
    const store = mockStore({
      articleReducer: {
        articles: [],
      },
    });

    component = mount(
      <Provider store={store}>
        <CreateArticle history={{ location: { pathname: '/create-article' } }} />
      </Provider>
    );
    expect(component.find('.create-article-container').exists()).toBe(true);
  });
});