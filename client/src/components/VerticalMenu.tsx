import { Link, useMatch } from 'react-router-dom';
import { CottageOutlined, ContactSupportOutlined } from '@mui/icons-material';
import { PAGE_NAMES, ROUTES_LINKS } from './routesLinks';
import { useStores } from '../store';
import { observer } from 'mobx-react';
import logoWs from '../assets/img/logo-w-s.svg';
import logoW from '../assets/img/logo-w.svg';

const VerticalMenu = () => {
  const { networkStore } = useStores();
  const matchHome = useMatch(ROUTES_LINKS.MAIN);
  const matchHelp = useMatch(ROUTES_LINKS.HELP);
  const menuClass = networkStore.menuIsActive ? ' active' : '';
  const menuLogo = networkStore.menuIsActive ? logoWs : logoW;

  return (
    <div className={`vertical-menu${menuClass}`}>
      <Link to={ ROUTES_LINKS.MAIN } className="logo">
        <img className="logo__img" src={ menuLogo } alt=""/>
      </Link>

      <ul className="menu h-100 list-unstyled" id="sidebar-menu">
        <li className={ `menu__item ${ matchHome ? 'active' : '' }` }>
          <Link to={ ROUTES_LINKS.MAIN } className="menu__link">
            <CottageOutlined className="menu__link-icon"/>
            <span className="menu__item-text ms-1">{ PAGE_NAMES.MAIN }</span>
          </Link>
        </li>

        <li className={ `menu__item ${ matchHelp ? 'active' : '' }` }>
          <Link to={ ROUTES_LINKS.HELP } className="menu__link">
            <ContactSupportOutlined className="menu__link-icon"/>
            <span className="menu__item-text ms-1">{ PAGE_NAMES.HELP }</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default observer(VerticalMenu);
