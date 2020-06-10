const fetchUserInfoURL = 'https://api.github.com/users/';
const searchUsersURL = 'https://api.github.com/search/users';
const logo = document.querySelector('#logo');
const topLeft = document.querySelector('#triangle-top-left');
const topRight = document.querySelector('#triangle-top-right');
const bottom = document.querySelector('#triangle-bottom');
const username = document.querySelector('#username');
const userForm = document.querySelector('#getUserForm');


userForm.addEventListener('submit', (event): Promise<Object> => {
  animateLogo(true);
  event.preventDefault();
  const userUrl = `${fetchUserInfoURL}${event.target[0].value}`;
  return fetchUserInfo(userUrl);
});

const fetchUserInfo = async (url: RequestInfo): Promise<Object> => {
  let response = await fetch(url);
  let data = await response.json();
  const location = data.location;
  const searchUrl = `${searchUsersURL}?q=+location:${location.split(',')[0]}+type:user`; 
  return searchUsers(searchUrl);
}

const searchUsers = async (url: RequestInfo) => {
  let response = await fetch(url);
  let data = await response.json();
  animateLogo(false);
  return data;
}

const animateLogo = (start: boolean) => {
  start
    ? logo.classList.add('loading')
    : logo.classList.remove('loading')
}