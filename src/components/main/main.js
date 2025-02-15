const search = document.querySelector(".search");
const listSuggestions = document.querySelector(".list-suggestions");
const searchBlock = document.querySelector(".title-block__search");

search.addEventListener("focus", () => {
  searchBlock.classList.add("title-block__search_radius");
  listSuggestions.classList.add("list-suggestions_show");
});

search.addEventListener("blur", () => {
  setTimeout(() => {
    listSuggestions.classList.remove("list-suggestions_show");
    searchBlock.classList.remove("title-block__search_radius");
  }, 200);
});
