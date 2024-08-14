class UI{
    constructor(){
        this.profileDiv = document.querySelector("#profile");
        this.repoDiv = document.querySelector("#repos");
        this.lastUsers = document.querySelector("#last-users")
        this.cardBody = document.querySelector(".card-body")
    }

    showUserInfo(user){
        this.profileDiv.innerHTML = `
        
        <div id="profile">
            
            <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong>${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Followers <i class="fa-solid fa-user-group"></i></i> <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Following <i class="fa-solid fa-users"></i> <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repos <i class="fa-solid fa-code"></i> <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="company">${user.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
            </div>
            `;
    }

    showError(message){
        const div = document.createElement("div");
        div.className = "alert alert-danger";
        div.textContent = message;

        this.cardBody.appendChild(div)  //Add at the end

        setTimeout(() => {   // delete after 2 seconds
            div.remove();
        }, 2000);
    }




    showRepoInfo(repos){
        this.repoDiv.innerHTML = ""; //clear it first

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
                <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-4">
                        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Stars:  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forks:  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }


    addSearchedUserToUI(username){
        let users = Storage.getSearchedUsersFromStorage();

        if(users.indexOf(username) === -1){
            // <li class="list-group-item">SearchedUsers</li>

            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.lastUsers.appendChild(li);
        }
    }

    clearAllSearchedFromUI(){
        while(this.lastUsers.firstElementChild !== null){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild)
        }

        // This method (while) is more faster than this.lastusers.innerhtml = ""
    }
}