import { random as randomStarWarsName } from 'starwars-names';

export const getGithubNicknameFromCookie = (cookie: string): string => {
  const checkCookie = cookie
    .split('; ')
    .map(x => x.split('='))
    .find(([name]) => name === 'check');

  return checkCookie
    ? `${checkCookie[2].split('|')[0].slice(1)} (aka ${randomStarWarsName()})`
    : randomStarWarsName();
};
