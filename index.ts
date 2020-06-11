const fetchUserInfoURL = 'https://api.github.com/users/';
const searchUsersURL = 'https://api.github.com/search/users';
const logo = document.querySelector('#logo');
const topLeft = document.querySelector('#triangle-top-left');
const topRight = document.querySelector('#triangle-top-right');
const bottom = document.querySelector('#triangle-bottom');
const username = document.querySelector('#username');
const userForm = document.querySelector('#getUserForm');
const contentContainer = document.querySelector('#content');

userForm.addEventListener('submit', (event): Promise<Object> => {
  event.preventDefault();
  animateLogo(true);
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

const searchUsers = async (url: RequestInfo): Promise<any> => {
  let response = await fetch(url);
  let data = await response.json();
  animateLogo(false);
  return addContent(data.items);
}

const addContent = content => {
  content.forEach(item => {
    console.log(item);
    const githubUser = `
    <div class="github-user">
      <h2 class="github-user-login">${item.login}</h2>
      <img class="github-user-avatar" src=${item.avatar_url} />
    </div>
  `;
    contentContainer.insertAdjacentHTML('beforeend', githubUser);
  })
}

interface TimingOptions {
  duration: number,
  iterations: number
}

const durationReset = 0;
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