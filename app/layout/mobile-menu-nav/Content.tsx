
// ----------------------------------------------------------------------

import { SignButton } from "@/app/component/SignInButton";

interface NavItem {
  title: string;
  handleClick: ()=>void;
  component?: React.ReactElement
}

const navConfig: NavItem[] = [
  {
    title: 'Home',
    handleClick: ()=>{ },

  },
  {
    title: 'About',
    handleClick: ()=>{ },
  },




  {
   
    title: 'Join now',
    handleClick: ()=>{},
    component:<SignButton title="Join now" onClick={()=>{}}/>
  },

  
 
];

export default navConfig;