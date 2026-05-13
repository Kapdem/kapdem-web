/**
 * User role definitions for the application
 */
export const UserRoles = {
  FREE: "free",
  PAID: "paid",
  PREMIUM: "premium",
  ADMIN: "admin",
};

/**
 * Icon paths for each user role
 * These icons should be placed in the public/images/user-icons folder
 */
export const UserRoleIcons = {
  [UserRoles.FREE]: "/images/user-icons/free-icon.png",
  [UserRoles.PAID]: "/images/user-icons/paid-icon.png",
  [UserRoles.PREMIUM]: "/images/user-icons/premium-icon.png",
  [UserRoles.ADMIN]: "/images/user-icons/admin-icon.png",
};

/**
 * Get the appropriate icon for a user based on their role
 * @param {string|undefined} role - The user's role from UserRoles enum
 * @returns {string} - The path to the icon image
 */
export const getUserRoleIcon = (role) => {
  // If role is undefined, null, or not in our mapping, return the default FREE icon
  if (!role || !UserRoleIcons[role]) {
    return UserRoleIcons[UserRoles.FREE];
  }
  return UserRoleIcons[role];
};
