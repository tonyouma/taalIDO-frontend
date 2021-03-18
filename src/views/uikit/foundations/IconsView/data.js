export const material = `
~~~ js
import React from 'react';
import AdbIcon from '@material-ui/icons/Adb';
import AddIcon from '@material-ui/icons/Add';
import AppleIcon from '@material-ui/icons/Apple';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

// ----------------------------------------------------------------------

function IconMaterial() {
  return (
    <>
      <AdbIcon color="action" />
      <AddIcon color="disabled" />
      <AccountCircleIcon color="error" />
      <AirplanemodeActiveIcon color="inherit" />
      <AppleIcon color="primary" />
    </>
  );
}


~~~`;

export const iconify = `
~~~ js
import React from 'react';
import { Icon } from '@iconify/react';
import { SvgIcon } from '@material-ui/core';
import clockFill from '@iconify/icons-eva/clock-fill';
import chargingFill from '@iconify/icons-eva/charging-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import colorPaletteFill from '@iconify/icons-eva/color-palette-fill';
import arrowCircleDownFill from '@iconify/icons-eva/arrow-circle-down-fill';

// ----------------------------------------------------------------------

function IconIconify() {
  return (
    <>
      <SvgIcon color="action">
        <Icon icon={alertCircleFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="disabled">
        <Icon icon={chargingFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="error">
        <Icon icon={arrowCircleDownFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="inherit">
        <Icon icon={clockFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="primary">
        <Icon icon={colorPaletteFill} width={24} height={24} />
      </SvgIcon>
    </>
  );
}


~~~`;

export const local = `
~~~ js
import React from 'react';
import { MIcon } from 'src/theme';

// ----------------------------------------------------------------------

function IconLocal() {
  return (
    <>
      <MIcon src="/static/icons/browser-edge.svg" size={24} />
      <MIcon src="/static/icons/shield.svg" color="error" size={24} />
      <MIcon src="/static/icons/elephant.svg" color="info" size={24} />
      <MIcon src="/static/icons/json-logo.svg" color="success" size={24} />
      <MIcon src="/static/icons/browser-edge.svg" color="action" size={24} />
      <MIcon src="/static/icons/love-camera.svg" color="warning" size={24} />
      <MIcon src="/static/icons/browser-edge.svg" color="primary" size={24} />
      <MIcon src="/static/icons/browser-edge.svg" color="disabled" size={24} />
    </>
  );
}

~~~`;
