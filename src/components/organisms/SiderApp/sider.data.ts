import { Home, User, Users, Doc, UserQuestion } from '@icons';
import { ComponentType, SVGProps } from 'react';

interface MenuItem {
  key: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const menuItems: MenuItem[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'account', label: 'My Account', icon: User },
  { key: 'postsnippet', label: 'Post snippet', icon: Doc },
  { key: 'mysnippets', label: 'My snippets', icon: Doc },
  { key: 'questions', label: 'Questions', icon: UserQuestion },
  { key: 'users', label: 'Users', icon: Users },
];
