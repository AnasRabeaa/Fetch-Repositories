// Main Variables
let inputField = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos()
}

// Get Repos Function
function getRepos() {
    if (inputField.value == "") {
        reposData.innerHTML = `<span>Please Write Github Username.</span>`;
    } else {
        fetch(`https://api.github.com/users/${inputField.value}/repos`)
            .then((response) => response.json())
            .then((repos) => {
                // Empty The Container
                reposData.innerHTML = '';
                // Loop On Repositories
                repos.forEach((repo) => {
                    // Create The Main Div Element
                    let mainDiv = document.createElement('div');
                    // Create Repo Name Text
                    let repoName = document.createTextNode(repo.name);
                    // Append The Text To Main Div
                    mainDiv.appendChild(repoName);
                    // Create Repo URL Anchor
                    let theUrl = document.createElement('a');
                    // Create Repo Url Text
                    let theUrlText = document.createTextNode("Visitt");
                    // Append The Repo Url Text To Anchor Tag
                    theUrl.appendChild(theUrlText);
                    // Add Thr Hypertext Reference "href"
                    theUrl.href = `https://github.com/${inputField.value}/${repo.name}`;
                    // Set Attribute Blank
                    theUrl.setAttribute('target', '_blank');
                    // Append Url Anchor To Main Div
                    mainDiv.appendChild(theUrl);
                    // Create Stars Count Span
                    let starsSpan = document.createElement('span');
                    // Create The Stars Count Text
                    let starsSpanText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                    // Add Stars Count Text To Stars Span
                    starsSpan.appendChild(starsSpanText);
                    // Append Stars Count Span To Main Div
                    mainDiv.appendChild(starsSpan);
                    // Add Class On Main Div
                    mainDiv.className = 'repo-box';
                    // Append The Main Div To Container
                    reposData.appendChild(mainDiv);
                });
            });
    }
}