import React from 'react';
import { styled } from '@mui/system';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

const ErrorTooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.error.main,
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.error.main,
  },
}));

export default function ErrorTooltip(props: TooltipProps) {
  return <ErrorTooltipStyled {...props} />;
}
