
   
   async function fetchData(){
    var userName = document.getElementById("userNameBox").value;
    var token    = document.getElementById("tokenBox").value;

    getUserDetails(userName, token);
    generatePieGraph(userName,token);
    getLanguageGraph(userName, token);
    popularRepos(userName, token)
      
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

// Number of commits in a repo
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


// Takes list of starred repo from the user and plot them along their stargzer's count 
async function popularRepos(userName, token){

  let labelArray = [];
  let dataArray = [];

  // Getting Repos that are Starred by the User
  var url = `https://api.github.com/users/${userName}/starred`;
  const repoData = await getRequest(url, token)
  
 // Getting the number of stargazzers of each repos from all starred
  
 for(i in repoData){
  var owner = repoData[i].owner.login;
  var repoName = repoData[i].name;

  var url2 = `https://api.github.com/repos/${owner}/${repoName}`;
  const starredRepo = await getRequest(url, token);
  labelArray.push(repoName);
  dataArray.push(starredRepo[i].stargazers_count);

 }

  //Plot the bar graph where the user's starred repositories are plotted against the number of contributors to that contributors

  var ctx = document.getElementById('myPopularStarredRepoChart').getContext('2d');  
  createBarGraph(labelArray, dataArray, ctx, 'Number of Stargazers');

}

// Bar graph of languages used by the user in all repositories. 
async function getLanguageGraph(userName, token) {
  
  // Getting Repos of the User
  const url = `https://api.github.com/users/${userName}/repos`;
  const repoData = await getRequest(url, token)
  
  let labelArray = [];
  let dataArray = [];
  
  // Getting Languages of repos
  for (i in repoData) {
      let url = `https://api.github.com/repos/${userName}/${repoData[i].name}/languages`;
      let repoLanguages = await getRequest(url, token).catch(error => console.error(error));


      for (l in repoLanguages) {
          var index = labelArray.indexOf(l); 
          if(index != -1){  
            dataArray[index] = dataArray[index] + repoLanguages[l]; // Add number of bytes to the associated index of the language.

          } else {
              labelArray.push(l); // Create new language entry 
              dataArray.push(repoLanguages[l]);
              
          }
      }

  }
  var ctx = document.getElementById('myLanguagesChart').getContext('2d');  
createBarGraph(labelArray, dataArray, ctx, 'Bytes of Code');
}
 
async function createBarGraph(labelArray, dataArray, ctx, inputLabel){

  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelArray,
          datasets: [{
              label: inputLabel,
              data: dataArray,
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
