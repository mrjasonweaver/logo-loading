const fetchUserInfoURL = 'https://api.github.com/users/';
const searchUsersURL = 'https://api.github.com/search/users';
const logo = document.querySelector('#logo');
const topLeft = document.querySelector('#triangle-top-left');
const topRight = document.querySelector('#triangle-top-right');
const bottom = document.querySelector('#triangle-bottom');
const username = document.querySelector('#username');
const userForm = document.querySelector('#getUserForm');
const userContainer = document.querySelector('#github-user');
const usersContainer = document.querySelector('#github-users');

const durationSlow = 1200;
const durationMedium = 800;
const durationFast = 500;

interface TimingOptions {
  duration: number,
  iterations: number
}

interface GitHubUser {
  avatar_url: string;
  html_url: string;
  login: string;
  repos_url: string;
  type: string;
  url: string;
  location?: string;
}

const renderGithubUser = (user: GitHubUser): string => {
  return `
    <a href="${user.html_url}" class="github-user">
      <h2 class="github-user-login">${user.login}</h2>
      <img class="github-user-avatar" src=${user.avatar_url} />
    </a>
  `
};

userForm.addEventListener('submit', event => {
  event.preventDefault();
  userContainer.innerHTML = '';
  usersContainer.innerHTML = '';
  animateLogo(true);
  const userUrl = `${fetchUserInfoURL}${event.target[0].value}`;
  fetchUserInfo(userUrl);
});

const fetchUserInfo = async (url: RequestInfo): Promise<void> => {
  let response = await fetch(url);
  let data = await response.json();
  const location = data.location.split(',')[0];
  const searchUrl = `${searchUsersURL}?q=+location:${location}+type:user+-user:${data.login}`; 
  addGithubUser(data, searchUrl);
};

const searchUsers = async (url: RequestInfo): Promise<void> => {
  let response = await fetch(url);
  let data = await response.json();
  addSearchedGithubUsers(data.items);
};

const addGithubUser = (user: GitHubUser, searchUrl: RequestInfo): void => {
  const githubUser = renderGithubUser(user);
  userContainer.insertAdjacentHTML('beforeend', githubUser);
  searchUsers(searchUrl);
}

const addSearchedGithubUsers = (content: GitHubUser[]): void => {
  content.forEach((user: GitHubUser) => {
    const githubUser = renderGithubUser(user);
    return usersContainer.insertAdjacentHTML('beforeend', githubUser);
  });
  animateLogo(false);
};

const timingOptions = (duration: number, iterations: number): TimingOptions => {
  return { duration, iterations }
};

const translateOptions = (args: Array<string>[]): Keyframe[] => {
  return args.map(item => {
    return {
      transform: `translate(${item[0]}, ${item[1]})`
    }
  });
};

const fillOptions = (args: Array<string>[]): Keyframe[] => {
  return args.map(item => {
    return {
      fill: `${item}`
    }
  });
};

const breakOutAnimationBottom: Array<string>[] = [
  ['0px', '0px'],
  ['0', '-8px'],
  ['0px', '0px']
];

const fillAnimation: Array<string>[] = [
  ['rgba(255,255,255,1)'],
  ['rgba(223, 78, 113, .8)'],
  ['rgba(255,255,255,1)']
];

const animateLogo = (playing: boolean): void => {
  const logoAnimation = logo.animate(
   fillOptions(fillAnimation),
    timingOptions(durationMedium, 5)
  );
  return playing ? logoAnimation.play() : logoAnimation.pause()
};