import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import NavDrawer from 'react-md/lib/NavigationDrawers/NavDrawer';

import { getNavItems } from 'utils/RouteUtils';
import { mediaChange, setMobileSearch } from 'actions/ui';

@connect(({ ui: { drawer } }) => ({
  defaultMedia: drawer.initialDrawerType,
  toolbarTitle: drawer.toolbarTitle,
  tabletDrawerType: drawer.tabletDrawerType,
  desktopDrawerType: drawer.desktopDrawerType,
  inactive: drawer.inactive,
}), { mediaChange, setMobileSearch })
export default class App extends PureComponent {
  static propTypes = {
    className: PropTypes.string,

    // Injected from react-router
    location: PropTypes.object.isRequired,
    children: PropTypes.node,

    // Injected from react-redux
    defaultMedia: PropTypes.string.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    inactive: PropTypes.bool.isRequired,
    tabletDrawerType: PropTypes.string.isRequired,
    desktopDrawerType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      location: { pathname },
      children,
      inactive,
      defaultMedia,
      tabletDrawerType,
      desktopDrawerType,
      toolbarTitle,
    } = this.props;

    return (
      <NavDrawer
        drawerTitle="react-md"
        defaultMedia={defaultMedia}
        tabletDrawerType={tabletDrawerType}
        desktopDrawerType={desktopDrawerType}
        toolbarTitle={toolbarTitle}
        toolbarStyle={{ boxShadow: inactive ? 'none' : undefined }}
        drawerChildren={<h1>Helo, World!</h1>}
        navItems={getNavItems(pathname)}
      >
        {children ? cloneElement(children, { key: pathname + 'woop' }) : null}
      </NavDrawer>
    );
  }
}
