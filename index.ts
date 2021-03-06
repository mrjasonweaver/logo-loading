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
const title = document.querySelector('#title');
const perPage = '100';
const durationSlow = 1200;
const durationMedium = 800;
const durationFast = 500;
let city: string;

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

interface Info {
  total: string;
  count: string;
  city: string;
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
  title.innerHTML = 'Searching GitHub...';
  animateLogo(true);
  const userUrl = `${fetchUserInfoURL}${event.target[0].value}`;
  fetchUserInfo(userUrl);
});

const fetchUserInfo = async (url: RequestInfo): Promise<void> => {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      city = data.location.split(',')[0];
      const searchUrl = `${searchUsersURL}?q=+location:${city}+type:user+-user:${data.login}&page=1&per_page=${perPage}`; 
      addGithubUser(data, searchUrl);
    } else if (response.status === 404) {
      title.innerHTML = 'GitHub user not found';
      animateLogo(false);
    } else {
      title.innerHTML = 'Unable to fetch user';
      animateLogo(false);
    }
  } catch(err) {
    title.innerHTML = err;
    animateLogo(false);
  }
};

const searchUsers = async (url: RequestInfo): Promise<void> => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    const infoObj: Info = {total: data.total_count, count: perPage, city};
    title.innerHTML = titleContent(infoObj);
    addSearchedGithubUsers(data.items);
  } catch(err) {
    title.innerHTML = err;
    animateLogo(false);
  }
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

const titleContent = (info: Info): string => {
  const { total, count, city } = info;
  return `Showing ${count} of ${total} GitHub users in ${city}`;
}

const timingOptions = (duration: number, iterations: number): TimingOptions => {
  return { duration, iterations }
};

const fillOptions = (args: Array<string>[]): Keyframe[] => {
  return args.map(item => {
    return {
      fill: `${item}`
    }
  });
};

const fillAnimation: Array<string>[] = [
  ['rgba(22,22,22,1)'],
  ['rgba(200, 100, 100, .7)'],
  ['rgba(170, 255, 150, .7)'],
  ['rgba(22,22,22,1)']
];

const animateLogo = (playing: boolean): void => {
  const logoAnimation = logo.animate(
    fillOptions(fillAnimation),
    timingOptions(durationMedium, 5)
  );
  return playing ? logoAnimation.play() : logoAnimation.pause()
};