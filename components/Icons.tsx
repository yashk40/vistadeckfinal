
import React from 'react';

// Helper to standardise premium icon props
const Icon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    {...props} 
  />
);

export const VistadeckLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM2 12l10 5 10-5-10-5-10 5z" />
  </Icon>
);

export const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.424-.108-.83-.31-1.187a10.042 10.042 0 01-2.288-4.43c-.155-.724.24-1.485 1.002-1.84a10.003 10.003 0 014.283-1.24c.95.026 1.84.45 2.541 1.154.673.673 1.05 1.583 1.05 2.533C22 17.5 17.5 22 12 22"/></Icon>
);

export const LayersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>
);

export const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>
);

export const FolderKanban: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path><path d="M8 10v4"></path><path d="M12 10v2"></path><path d="M16 10v6"></path></Icon>
);

export const PenToolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></Icon>
);

export const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.65-.75-2.2-.7-3.05-.05z"></path><path d="m12 15-3-3a9 9 0 0 1 3-7 9 9 0 0 1 7 3l-3 3"></path><path d="m15 12 3 3"></path><path d="M9.5 3.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.65-.75-2.2-.7-3.05-.05z"></path></Icon>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M4 6h16M4 12h16m-7 6h7" /></Icon>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M6 18L18 6M6 6l12 12" /></Icon>
);

export const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9s-1.4-.4-3.3-1.2c-.4 2.2-2.1 4.1-4.2 4.1H7.5c-2.1 0-4.2-1.9-4.2-4.1 0-2.2 2.1-4.1 4.2-4.1H12s-1.5-1.4-2.1-2.2c-.6-.8-1.1-1.9-1.1-1.9s2.1 1.2 4.2 2.2c1.4-1.2 3.3-1.2 3.3-1.2z"/></Icon>
);

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></Icon>
);

export const DribbbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-5.76-1.7-10.65-4.2-14.4-9.35M5.09 19.13c3.91-4.05 9.02-5.35 16.66-5.85"/></Icon>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon strokeWidth="2.5" className="h-5 w-5" {...props}><polyline points="20 6 9 17 4 12"/></Icon>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon className="h-6 w-6" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

export const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon className="h-6 w-6" {...props}><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.9.65-1.7 1.34-2.28a5.48 5.48 0 0 0 1.5-4.58 5.48 5.48 0 0 0-1.5-4.58A5.48 5.48 0 0 0 12.55 1a5.48 5.48 0 0 0-3.88 1.56 5.48 5.48 0 0 0-1.5 4.58 5.48 5.48 0 0 0 1.5 4.58c.69.58 1.16 1.38 1.34 2.28"/></Icon>
);

export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>
);

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>
);

export const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></Icon>
);

export const MessageCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></Icon>
);

export const SofaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon strokeWidth="1.2" {...props}><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/></Icon>
);

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon strokeWidth="1.2" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>
);

export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon strokeWidth="1.2" {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></Icon>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></Icon>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></Icon>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></Icon>
);

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polyline points="15 18 9 12 15 6"></polyline></Icon>
);

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polyline points="9 18 15 12 9 6"></polyline></Icon>
);

export const MaximizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></Icon>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></Icon>
);

export const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></Icon>
);

export const VideoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></Icon>
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></Icon>
);

export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></Icon>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></Icon>
);

export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></Icon>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></Icon>
);

export const DiamondIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M6 3h12l4 6-10 13L2 9z"></path></Icon>
);

export const CheckBadgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></Icon>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></Icon>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></Icon>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></Icon>
);

export const MonitorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></Icon>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></Icon>
);

export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></Icon>
);

export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></Icon>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></Icon>
);
