import React from 'react';
import { getInitials } from '../../utils/helpers';

export const ProfileAvatar = ({ src, name = 'User', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'avatar-sm fs-7',
    md: 'avatar-md fs-6',
    lg: 'avatar-lg fs-4',
    xl: 'avatar-xl fs-2'
  };

  if (src) {
    return <img src={src} alt={name} className={`${sizeClasses[size] || 'avatar-md'} ${className}`} />;
  }

  return (
    <div
      className={`d-inline-flex align-items-center justify-content-center bg-primary text-white fw-bold rounded-circle ${
        sizeClasses[size] || 'avatar-md'
      } ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default ProfileAvatar;
