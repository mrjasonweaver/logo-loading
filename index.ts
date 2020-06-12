const fetchUserInfoURL = 'https://api.github.com/users/';
const searchUsersURL = 'https://api.github.com/search/users';
const logo = document.querySelector('#logo');
const topLeft = document.querySelector('#triangle-top-left');
const topRight = document.querySelector('#triangle-top-right');
const bottom = document.querySelector('#triangle-bottom');
const username = document.querySelector('#username');
const userForm = document.querySelector('#getUserForm');
const contentContainer = document.querySelector('#content');

interface TimingOptions {
  duration: number,
  iterations: number
}

interface GitHubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

userForm.addEventListener('submit', event => {
  event.preventDefault();
  contentContainer.innerHTML = '';
  animateLogo(true);
  const userUrl = `${fetchUserInfoURL}${event.target[0].value}`;
  fetchUserInfo(userUrl);
});

const fetchUserInfo = async (url: RequestInfo) => {
  let response = await fetch(url);
  let data = await response.json();
  const location = data.location;
  const searchUrl = `${searchUsersURL}?q=+location:${location.split(',')[0]}+type:user`; 
  searchUsers(searchUrl);
}

const searchUsers = async (url: RequestInfo) => {
  let response = await fetch(url);
  let data = await response.json();
  animateLogo(false);
  addContent(data.items);
}

const addContent = (content: GitHubUser[]) => {
  content.forEach((item: GitHubUser) => {
    const githubUser = `
      <a href="${item.html_url}" class="github-user">
        <h2 class="github-user-login">${item.login}</h2>
        <img class="github-user-avatar" src=${item.avatar_url} />
      </a>
    `;
    contentContainer.insertAdjacentHTML('beforeend', githubUser);
  });
}

const durationSlow = 3000;
const durationMedium = 800;
const durationFast = 500;

const timingOptions = (duration: number, iterations: number): TimingOptions => {
  return { duration, iterations }
}

const translateOptions = (args: Array<string>[]): Keyframe[] => {
  return args.map(item => {
    return {
      transform: `translate(${item[0]}, ${item[1]})`
    }
  });
}

const breakOutAnimationBottom: Array<string>[] = [
  ['0px', '0px'],
  ['0', '-8px'],
  ['0px', '0px']
];

const animateLogo = (playing: boolean): void => {
  const logoAnimation = logo.animate(
    translateOptions(breakOutAnimationBottom),
    timingOptions(durationMedium, 5)
  );
  return playing ? logoAnimation.play() : logoAnimation.pause()
}