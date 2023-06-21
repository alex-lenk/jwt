import { Link, useMatch } from 'react-router-dom';
import { CottageOutlined, ContactSupportOutlined } from '@mui/icons-material';
import { PAGE_NAMES, ROUTES_LINKS } from './routesLinks';

const VerticalMenu = () => {
  const matchHome = useMatch(ROUTES_LINKS.MAIN);
  const matchHelp = useMatch(ROUTES_LINKS.HELP);

  return (
    <div className="vertical-menu">
      <ul className="menu h-100 list-unstyled" id="sidebar-menu">
        <li className={ `menu__item ${ matchHome ? 'active' : '' }` }>
          <Link to={ ROUTES_LINKS.MAIN } className="menu__link">
            <CottageOutlined className="menu__link-icon me-1"/>
            { PAGE_NAMES.MAIN }
          </Link>
        </li>

        <li className={ `menu__item ${ matchHelp ? 'active' : '' }` }>
          <Link to={ ROUTES_LINKS.HELP } className="menu__link">
            <ContactSupportOutlined className="menu__link-icon me-1"/>
            { PAGE_NAMES.HELP }
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenu;
