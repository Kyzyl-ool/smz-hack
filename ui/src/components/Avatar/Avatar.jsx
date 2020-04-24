import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import placeholderUrl from './profile-placeholder-icon.svg';


const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      [theme.breakpoints.down('sm')]: {
        width: '32px',
        height: '32px'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width: '60px',
        height: '60px'
      },
      [theme.breakpoints.up['lg']]: {
        width: '80px',
        height: '80px'
      }
    },
    noResize: {
      width: '60px',
      height: '60px'
    },
    rounded: {
      borderRadius: '50%'
    },
    squared: {
      [theme.breakpoints.down('sm')]: {
        height: '1rem'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        height: '1.5rem'
      },
      [theme.breakpoints.up['lg']]: {
        height: '2rem'
      }
    }
  })
);

export const Avatar = ({ src, variant, noResize = false, ...props }) => {
  const classes = useStyles(props);
  return (
    <img
      className={
        !noResize
          ? clsx(
              variant === 'squared' ? null : classes.avatar,
              variant === 'squared' ? classes.squared : classes.rounded
            )
          : clsx(classes.noResize, variant === 'squared' ? classes.squared : classes.rounded)
      }
      src={src ? src : placeholderUrl}
      {...props}
     alt={'Avatar'}/>
  );
};


Avatar.propTypes = {
  src: PropTypes.string,
  variant: PropTypes.oneOf(['rounded', 'squared']),
  title: PropTypes.string,
  noResize: PropTypes.bool,
}
