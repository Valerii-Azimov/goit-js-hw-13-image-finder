import './styles.css';
import apiService from './services/apiService';
import articleListItemsTemplate from './templates/article-list-item.hbs';

const refs = {
  searchForm: document.querySelector('#searchForm'),
  articleList: document.querySelector('#articleList'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  //   console.dir(e.currentTarget);
  const inputValue = e.currentTarget.elements.query.value;

  clearListItems();

  apiService.resrtPage();

  apiService.searchQuery = inputValue;

  apiService.fetchArticles().then(data => {
    const markup = buildListItemsMarkup(data.hits);
    // console.log(markup);

    insertListItems(markup);
  });
}

function insertListItems(items) {
  refs.articleList.insertAdjacentHTML('beforeend', items);
}

function buildListItemsMarkup(items) {
  return articleListItemsTemplate(items);
}

function loadMoreBtnHandler() {
  apiService.fetchArticles().then(data => {
    const markup = buildListItemsMarkup(data.hits);
    console.log(markup);

    insertListItems(markup);
  });
}
function clearListItems() {
  refs.articleList.innerHTML = '';
}
