class Storage {

    static getSearchedUsersFromStorage(){
        // Get all users

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];  // empty array
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"))   //Converting data stored as string to json
        }
        return users;
    }

    static addSearchUserToStorage(username){
        // Adding users
        let users = this.getSearchedUsersFromStorage();

        //IndexOf 

        if(users.indexOf(username) === -1){  //if its not in array
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users)); //adding to local storage
    }


    static clearAllSearchedUsersFromStorage(){
        // Clear all users 

        localStorage.removeItem("searched");
    }
}