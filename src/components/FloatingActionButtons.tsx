import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import { TabName } from '../consts';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabs = [
  {
    color: 'primary' as 'primary',
    sx: fabStyle,
    icon: <AddIcon />,
    label: 'Add bottle',
    tab: TabName.Bottles,
  },
  {
    color: 'primary' as 'primary',
    sx: fabStyle,
    icon: <AddIcon />,
    label: 'Add cocktail',
    tab: TabName.Cocktails,
  },
];

interface Props {
  tab: TabName,
  onFABClick: ((tab: TabName) => void)
}

export default function FloatingActionButtons({ tab, onFABClick }: Props): JSX.Element {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      {fabs.map((fab) => (
        <Zoom
          key={fab.tab}
          in={tab === fab.tab}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${tab === fab.tab ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={fab.sx}
            aria-label={fab.label}
            color={fab.color}
            onClick={() => onFABClick(fab.tab)}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
}
