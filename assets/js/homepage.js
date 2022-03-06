var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    var titleEl = document.createElement("span");
    titleEl.textConent = repoName;
    repoEl.appendChild(titleEl);
    repoContainerEl.appendChild(repoEl);
  }
  console.log(repos);
  console.log(searchTerm);
};

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, user);
    });
  });
};

userFormEl.addEventListener("submit", formSubmitHandler);
