
    //Buttons
    /*
        const btnRepos  =   document.getElementById("btnRepos")
        const btnUserName  =   document.getElementById("btnUserName")
        const divResult =   document.getElementById("divResult")

        btnRepos.addEventListener("click", getRepos)
        btnUserName.addEventListener("click", takeInput)

        async function takeInput(){
            var userName = document.getElementById("textBox").nodeValue;
            console.log(userName);
        }
    */

    async function fetchData(){
        var userName = document.getElementById("userNameBox").value;
        var token    = document.getElementById("tokenBox").value;

        getRepos(userName, token);
        getUserDetails(userName, token);
    }
    async function getRequest(url, token) {
        
        const headers = {
            'Authorization': `Token ${token}`
        }

        const response = (token == undefined) ? await fetch(url) : await fetch(url, {
            "method": "GET",
            "headers": headers
        });

            let data = await response.json();
            return data;
    }
        
    async function getRepos(userName, token){
                clear();
                const url = `https://api.github.com/users/${userName}/repos`;
            
                //const response = await getRequest(url)
                //const result = await response.json()

                const result = await getRequest(url, token)
                result.forEach(i=>{

                    const anchor = document.createElement("a")
                    anchor.href = i.html_url
                    //anchor.href = ""
                    anchor.textContent = i.full_name

                    divResult.appendChild(anchor)
                    divResult.appendChild(document.createElement("br"))
                })
                /*
                let public_repos = document.getElementById('public_repos');
                public_repos.innerHTML = `<b>Public Repos: </b>${user_info.public_repos}`;
                */
            function clear(){
                while(divResult.firstChild)
                    divResult.removeChild(divResult.firstChild)
            }
    }

    async function getUserDetails(userName, token){
            const url = `https://api.github.com/users/${userName}`;
            const user_info = await getRequest(url,token);

            let img = document.getElementById('img');
            img.src = user_info.avatar_url
        
            let name = document.getElementById('name');
            name.innerHTML = `<b>Name: </b>${user_info.name}`;
        
            let login = document.getElementById('login');
            login.innerHTML = `<b>Username: </b>${user_info.login}`;
        
            let profileURL = document.getElementById('profileURL');
            profileURL.innerHTML = `<b>URL: </b>${user_info.html_url }`;
        
            let created_at = document.getElementById('created_at');
            created_at.innerHTML = `<b>Created On: </b>${user_info.created_at}`;
        
            let followers = document.getElementById('followers');
            followers.innerHTML = `<b>Followers: </b>${user_info.followers}`;
            
            let following = document.getElementById('following');
            following.innerHTML = `<b>Following: </b>${user_info.following}`;
        
            let location = document.getElementById('location');
            location.innerHTML = `<b>Location: </b>${user_info.location}`;
        
            let public_repos = document.getElementById('public_repos');
            public_repos.innerHTML = `<b>Number of Public Repos: </b>${user_info.public_repos}`;
        
            
        
        
    }   
            
        
        
