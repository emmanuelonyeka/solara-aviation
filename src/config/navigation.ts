export interface NavigationLink {
    label: string;
    to: string;
  }
  
  export interface NavigationGroup {
    label: string;
    children: readonly NavigationLink[];
  }
  
  export type PrimaryNavigationItem = NavigationLink | NavigationGroup;
  
  export const primaryNavigation = [
    { label: 'Fleet', to: '/fleet' },
    { label: 'Destinations', to: '/destinations' },
    {
      label: 'Services',
      children: [
        { label: 'Membership', to: '/membership' },
        { label: 'Corporate Charter', to: '/corporate' },
        { label: 'Empty Legs', to: '/empty-legs' },
        { label: 'Concierge', to: '/concierge' },
        { label: 'The Experience', to: '/experience' },
      ],
    },
    { label: 'Safety', to: '/safety' },
    {
      label: 'About',
      children: [
        { label: 'Our Story', to: '/about' },
        { label: 'Journal', to: '/blog' },
        { label: 'Contact', to: '/contact' },
      ],
    },
  ] as const satisfies readonly PrimaryNavigationItem[];
  
  export const footerNavigation = [
    {
      heading: 'Fly',
      links: [
        { label: 'Aircraft Fleet', to: '/fleet' },
        { label: 'Destinations', to: '/destinations' },
        { label: 'Empty Legs', to: '/empty-legs' },
        { label: 'Request a Quote', to: '/quote' },
      ],
    },
    {
      heading: 'Services',
      links: [
        { label: 'Membership', to: '/membership' },
        { label: 'Corporate Charter', to: '/corporate' },
        { label: 'Concierge', to: '/concierge' },
        { label: 'The Experience', to: '/experience' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Safety', to: '/safety' },
        { label: 'Journal', to: '/blog' },
        { label: 'Contact', to: '/contact' },
      ],
    },
  ] as const;
  
  export const legalNavigation = [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Disclosures', to: '/disclosures' },
  ] as const;
  
  export function isNavigationGroup(item: PrimaryNavigationItem): item is NavigationGroup {
    return 'children' in item;
  }
  
  export function isPathActive(pathname: string, to: string): boolean {
    if (to === '/') return pathname === '/';
    return pathname === to || pathname.startsWith(`${to}/`);
  }
  
  export function navigationId(scope: 'desktop' | 'mobile', label: string): string {
    return `${scope}-${label.toLowerCase().replace(/\s+/g, '-')}`;
  }