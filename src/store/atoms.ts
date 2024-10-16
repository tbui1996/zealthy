import { atom } from 'recoil';

export type PageConfig = {
  [key: number]: string[];
};

const defaultPageConfig: PageConfig = {
  1: ['aboutMe'],
  2: ['address', 'birthdate'],
};

export const pageConfigState = atom<PageConfig>({
  key: 'pageConfigState',
  default: defaultPageConfig,
});