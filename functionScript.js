
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

   // getRepos(userName, token);
    getUserDetails(userName, token);
    //d3.select('h1').style('color','red');
    generatePieGraph(userName,token);

    
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
            var count = -1;
            result.forEach(i=>{
                count++;
               // const anchor = document.createElement("a")
                //anchor.href = i.html_url
                //anchor.href = ""
                //anchor.textContent = i.full_name;
              //  datasetRepos[count] = i.full_name;
                

                //divResult.appendChild(anchor)
               // divResult.appendChild(document.createElement("br"))
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
    
        let followers = document.getElementById('followers');
        followers.innerHTML = `<b>Followers: </b>${user_info.followers}`;
        
        let following = document.getElementById('following');
        following.innerHTML = `<b>Following: </b>${user_info.following}`;
    
        let location = document.getElementById('location');
        location.innerHTML = `<b>Location: </b>${user_info.location}`;
    
        let public_repos = document.getElementById('public_repos');
        public_repos.innerHTML = `<b>Number of Public Repos: </b>${user_info.public_repos}`;
    
    
}   

async function generatePieGraph(userName, token){
  
    //Getting Repos  
    const url = `https://api.github.com/users/${userName}/repos`;
    const listOfRepos = await getRequest(url,token);
    
    let commits = [];
    for (let i = 0; i < listOfRepos.length; i++) 
    {
      const repoName = listOfRepos[i].name;
      const commitsList = await getRequest(`https://api.github.com/repos/${userName}/${repoName}/commits`,token).catch((error) => console.error(error));
      let b = { repo: repoName, commits: commitsList.length };
      commits.push(b);
    }
        //Make a Pie Chart
        drawPieChart(commits)
}

  
  function drawPieChart(argData) {

    var data = [];
    argData.forEach((element) => {
      data.push(element.commits);
    });

        var svg = d3.select(".chart1"),
              width = svg.attr('width'),
              height = svg.attr('height'),        
              radius = 200
        
        const g = svg.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        
        var color = d3.scaleOrdinal(['red', 'blue', 'green', 'gray', 'yellow', 'purple', 'pink']);    
        
        //const pie = d3.pie().commits(d => d.commits);

        const pie = d3.pie().sort(null);
        const path = d3.arc().outerRadius(radius).innerRadius(0);
        const pies= g.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc");
        pies.append('path').attr("d",path).attr('fill',function(d,i){ return color(i);});



  }
  
  
  
