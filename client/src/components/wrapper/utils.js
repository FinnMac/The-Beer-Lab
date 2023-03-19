// src/components/pages/EditService.js

// v 1.0
// Finn McCarthy

// This file is the component wrapper

import React, { Element } from 'react';
import { useNavigate } from 'react-router-dom';

export const withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}