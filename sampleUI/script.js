let search=document.querySelector(".search");
let user=document.querySelector("#search-user");
let profileName=document.querySelector(".name");
let handle=document.querySelector(".user-handle");
let bio=document.querySelector(".user-bio");
let noOfFollowing=document.querySelector(".following-count");
let noOfFollowers=document.querySelector(".followers-count");

search.addEventListener("click", async function(){
    let value=user.value;
    //console.log(value);
    let userData= await axios.get(`http://localhost:3000/user/${value}`);
    //console.log(userData.data.User[0]);
    let profile=userData.data.User[0];
    profileName.innerHTML= profile.name;
    handle.innerHTML=profile.handle;
    bio.innerHTML=profile.bio;

    let followingCount= await axios.get(`http://localhost:3000/user/following/count/${value}`);
    noOfFollowing.innerHTML=followingCount.data.following;
    console.log(followingCount);
    let followerCount= await axios.get(`http://localhost:3000/user/follower/count/${value}`);
    noOfFollowers.innerHTML=followerCount.data.following;



})