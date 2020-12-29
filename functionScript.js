
   
   async function fetchData(){
    var userName = document.getElementById("userNameBox").value;
   // var token    = document.getElementById("tokenBox").value;

   // var userName = 'taaanmay';
    var token = '902a3fb5aae5a46fa00aa1ad5e05774052511ff0';
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
    
    let data = [];
    for (let i = 0; i < listOfRepos.length; i++) 
    {
      const repoName = listOfRepos[i].name;
      const commitsList = await getRequest(`https://api.github.com/repos/${userName}/${repoName}/commits`,token).catch((error) => console.error(error));
      let b = { key: repoName, value: commitsList.length };
      data.push(b);
    }


    var keyTable = [];
    data.forEach((element) => {
      keyTable.push(element.key);
    });

    var valueTable = [];
    data.forEach((element) => {
      valueTable.push(element.value);
    });

    //Make a Pie Chart
    createPieGraph(keyTable, valueTable);
    

  
}

async function createPieGraph(dataTable, dataName){

  
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: dataTable,
          datasets: [{
              label: 'Total Number of Commits',
              data: dataName,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(200, 100, 64, 0.2)',
                  'rgba(150, 100, 100, 0.2)',
                  'rgba(200, 200, 64, 0.2)',
                  'rgba(175, 200, 64, 0.2)',
                  'rgba(125, 55, 164, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

}


