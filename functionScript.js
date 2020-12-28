
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

    getRepos(userName);
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
    
    
    async function getRepos(userName){
        clear();

        const url = `https://api.github.com/users/${userName}/repos`;
            //const response = await getRequest(url)
            //const result = await response.json()

            const result = await getRequest(url)

            
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

    
    
        