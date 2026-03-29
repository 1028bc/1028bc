/**
 * 1028bc IDENTITY & ACCESS CONTROL
 * Defines the clearance levels, system IDs, and branding profiles.
 */

// 1. SYSTEM IDENTIFIERS
// Used for conditional routing and platform selection.
export type SystemID = 'FIELD_OPS' | 'COMMERCIAL_SALES' | 'ADMIN_CORE' | 'LOGIC_LAB';

// 2. CLEARANCE LEVELS
export type AccessLevel = 'USER' | 'ADMIN' | 'DEV' | 'GOD';

// 3. USER PROFILE STRUCTURE
// Used to determine if a user should "Auto-Drop" into a single platform.
export interface UserProfile {
  id: string;
  name: string;
  level: AccessLevel;
  authorizedSystems: SystemID[];
}

// 4. BRANDING & THEME MAPPING
// Controls the visual "Face" of the application based on clearance.
export const getSystemIdentity = (level: AccessLevel) => {
  switch (level) {
    case 'GOD':
      return {
        name: '1028bc_SOL',
        tagline: 'SYSTEM_PRIMARY_SOURCE',
        accent: 'text-red-500',
        border: 'border-red-500/50',
        font: 'font-mono'
      };
    case 'DEV':
      return {
        name: '1028bc_TERRA',
        tagline: 'FOUNDATION_STABLE',
        accent: 'text-green-400',
        border: 'border-green-500/30',
        font: 'font-mono'
      };
    case 'ADMIN':
      return {
        name: '1028bc_LUNA',
        tagline: 'REGULATORY_ORBIT',
        accent: 'text-slate-300',
        border: 'border-slate-500/30',
        font: 'font-sans'
      };
    default:
      return {
        name: '1028bc_URB',
        tagline: 'FIELD_UNIT_ACTIVE',
        accent: 'text-sky-400',
        border: 'border-sky-400/20',
        font: 'font-sans'
      };
  }
};