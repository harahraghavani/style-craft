// MUI Imports
import { useTheme } from "@mui/material/styles";

// Component Imports
import HorizontalNav, { Menu, MenuItem } from "@menu/horizontal-menu";
import VerticalNavContent from "./VerticalNavContent";

// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledHorizontalNavExpandIcon from "@menu/styles/horizontal/StyledHorizontalNavExpandIcon";
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/horizontal/menuItemStyles";
import menuRootStyles from "@core/styles/horizontal/menuRootStyles";
import verticalNavigationCustomStyles from "@core/styles/vertical/navigationCustomStyles";
import verticalMenuItemStyles from "@core/styles/vertical/menuItemStyles";
import verticalMenuSectionStyles from "@core/styles/vertical/menuSectionStyles";

const RenderExpandIcon = ({ level }) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className="tabler-chevron-right" />
  </StyledHorizontalNavExpandIcon>
);

const RenderVerticalExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="tabler-chevron-right" />
  </StyledVerticalNavExpandIcon>
);

const HorizontalMenu = () => {
  // Hooks
  const verticalNavOptions = useVerticalNav();
  const theme = useTheme();

  // Vars
  const { transitionDuration } = verticalNavOptions;

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: "var(--mui-palette-background-paper)",
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, "tabler-circle")}
        renderExpandedMenuItemIcon={{
          icon: <i className="text-xs tabler-circle" />,
        }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0,
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon
              open={open}
              transitionDuration={transitionDuration}
            />
          ),
          renderExpandedMenuItemIcon: {
            icon: <i className="text-xs tabler-circle" />,
          },
          menuSectionStyles: verticalMenuSectionStyles(
            verticalNavOptions,
            theme
          ),
        }}
      >
        <MenuItem href="/" icon={<i className="tabler-world" />}>
          Discover
        </MenuItem>
        <MenuItem href="/about" icon={<i className="tabler-info-circle" />}>
          About
        </MenuItem>
      </Menu>
      {/* <Menu
          rootStyles={menuRootStyles(theme)}
          renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
          menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
          renderExpandedMenuItemIcon={{ icon: <i className='text-xs tabler-circle' /> }}
          popoutMenuOffset={{
            mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
            alignmentAxis: 0
          }}
          verticalMenuProps={{
            menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
            renderExpandIcon: ({ open }) => (
              <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
            ),
            renderExpandedMenuItemIcon: { icon: <i className='text-xs tabler-circle' /> },
            menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
          }}
        >
          <GenerateHorizontalMenu menuData={menuData(dictionary)} />
        </Menu> */}
    </HorizontalNav>
  );
};

export default HorizontalMenu;
