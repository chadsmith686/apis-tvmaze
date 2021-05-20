// Step 1
$("#search-form").on("submit", async function(evt) {
  evt.preventDefault();
  let query = $("#search-query").val();
  if (!query) {
    // console.log('Wooop, nothing here');
    return;
  }
  // console.log('===>>', query);

  // hide episode area
  $("#episodes-area").hide();

  // find some shows
  let shows = await searchShows(query);
  // console.log('===Show>>>', shows);

  // append shows to page
  const $showsList = $("#shows-list");
  for (let aShow of shows) {
    let $item = $(
      `
      <div>
        <div>Name of Show: ${aShow.show.name}</div>
        <div>${aShow.show.summary}</div>
      </div>
      `);
    $showsList.append($item);
    // console.log('===++++', aShow.show)
  }

});

// search api
async function searchShows(query) {
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  // console.log('===<<>><><><><><', response.data);
  return response.data;
}