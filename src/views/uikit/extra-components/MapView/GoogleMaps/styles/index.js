import { withStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function important(input) {
  return `${input} !important`;
}

const SHADOW = '0 8px 16px 0 rgba(145, 158, 171, 0.48)';
const BUTTON_SIZE = '28px';

const ControlStyle = withStyles((theme) => ({
  '@global': {
    '.gmnoprint > div': {
      width: important('auto'),
      height: important('auto'),
      backgroundColor: important('transparent')
    },

    // Control Style Map
    '.gm-style-mtc': {
      '& button': {
        alignItems: 'center',
        display: important('flex'),
        fontSize: important('14px'),
        padding: important('0 10px'),
        height: important(BUTTON_SIZE),
        fontFamily: important(theme.typography.fontFamily),
        '&:focus': {
          outline: important('none')
        }
      },
      '& button[title="Change map style"]': {
        flip: false, // disabled RTL
        paddingRight: important('20px'),
        borderRadius: important('8px')
      },
      '& button[title="Show street map"]': {
        flip: false, // disabled RTL
        borderTopLeftRadius: important('8px'),
        borderBottomLeftRadius: important('8px')
      },
      '& button[title="Show satellite imagery"]': {
        flip: false, // disabled RTL
        borderTopRightRadius: important('8px'),
        borderBottomRightRadius: important('8px')
      },
      '& ul': {
        top: important('32px'),
        padding: important('0'),
        width: important('120px'),
        boxShadow: important(SHADOW),
        overflow: important('hidden'),
        borderRadius: important('8px'),
        left: important('0'),
        '& li': {
          outline: important('none'),
          padding: important('4px 12px'),
          fontFamily: important(theme.typography.fontFamily)
        },
        '& li[title="Show street map with terrain"], li[title="Show imagery with street names"]': {
          display: 'flex',
          alignItems: 'center',
          padding: important('8px'),
          '& > span': {
            flip: false, // disabled RTL
            marginTop: -1,
            marginRight: 6
          }
        }
      }
    },

    // Fullscreen Control
    'button[title="Toggle fullscreen view"]': {
      margin: important('8px'),
      width: important(BUTTON_SIZE),
      height: important(BUTTON_SIZE),
      borderRadius: important('8px'),
      backgroundColor: important(theme.palette.common.white)
    },

    // Zoom Control
    '.gm-bundled-control-on-bottom': {
      margin: important('12px'),
      '& button[title="Zoom in"], button[title="Zoom out"]': {
        width: important(BUTTON_SIZE),
        height: important(BUTTON_SIZE),
        backgroundColor: important(theme.palette.common.white),
        '& img': {
          width: important('12px'),
          height: important('12px')
        },
        '& + div': {
          margin: important('0'),
          width: important('100%'),
          backgroundColor: important(theme.palette.divider)
        }
      }
    },
    'button[title="Zoom in"]': {
      borderTopLeftRadius: important('8px'),
      borderTopRightRadius: important('8px')
    },
    'button[title="Zoom out"]': {
      borderBottomLeftRadius: important('8px'),
      borderBottomRightRadius: important('8px')
    },

    // Drawing Control
    '.gmnoprint button': {
      '&[title="Stop drawing"],&[title="Add a marker"],&[title="Draw a line"],&[title="Draw a rectangle"],&[title="Draw a circle"],&[title="Draw a shape"]': {
        display: important('flex'),
        alignItems: important('center'),
        justifyContent: important('center')
      },
      '&[title="Stop drawing"]': {
        flip: false, // disabled RTL
        borderTopLeftRadius: important('8px'),
        borderBottomLeftRadius: important('8px')
      },
      '&[title="Draw a shape"]': {
        flip: false, // disabled RTL
        borderTopRightRadius: important('8px'),
        borderBottomRightRadius: important('8px')
      }
    },

    // Street View
    '.gmnoprint > .gm-svpc': {
      boxShadow: important(SHADOW),
      width: important(BUTTON_SIZE),
      height: important(BUTTON_SIZE),
      borderRadius: important('8px'),
      backgroundColor: important(theme.palette.common.white)
    },

    // Marker Tooltip
    '.gm-style': {
      fontFamily: important(theme.typography.fontFamily)
    },
    '.gm-style-iw-c': {
      padding: important(theme.spacing(2)),
      boxShadow: important(SHADOW),
      '& button[title="Close"]': {
        top: important('4px'),
        right: important('4px'),
        width: important('24px'),
        height: important('24px'),
        display: important('flex'),
        alignItems: important('center'),
        justifyContent: important('center')
      }
    },
    '.gm-style-iw-d': {
      overflow: important('auto')
    },
    '.gm-style-iw-t': {
      '&:after': {
        top: important('-2px'),
        width: important('14px'),
        height: important('14px')
      }
    }
  }
}))(() => null);

export default ControlStyle;
