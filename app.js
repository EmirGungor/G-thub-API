// Elementleri Seçme

const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUser = document.querySelector("#clear-last-users");
const lastUsers = document.querySelector("#last-users");
const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit", getData);
    clearLastUser.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched); //Showing the latest searches in the interface as the page is refreshed
}
function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Please Enter A Valid Username")
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("User not found.")
            }
            else{

                ui.addSearchedUserToUI(username);
                Storage.addSearchUserToStorage(username);
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err))
    }





    nameInput.value="";
    e.preventDefault();  //Blocking refresh page
}

function clearAllSearched(){
    // Clear All Searches
    if(confirm("Are you sure to clear all users ?")){
        Storage.clearAllSearchedUsersFromStorage(); //Delete storage
        ui.clearAllSearchedFromUI();
    }
}
function getAllSearched(){
    // retrieve the searched contacts from storage and add them to the interface

    let users = Storage.getSearchedUsersFromStorage();
    

    let result = "";
    users.forEach(user => {
        //<li class="list-group-item">SearchedUsers</li>
        result += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = result ;
}