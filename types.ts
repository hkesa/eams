export interface FormData {
  // Basic Info
  applicationType?: string;
  specialSkills?: string[];
  specialSkillsOther?: string;
  gender?: string;
  fullName?: string;
  currentLocation?: string;
  nationality?: string;
  nationalityOther?: string;
  
  // Conditional: HK Status
  hkContractStatus?: string;
  finishContractDate?: string; 
  
  workedInHkBefore?: string;
  passportExpiryDate?: string;
  dateOfBirth?: string;
  religion?: string;
  religionOther?: string;
  maritalStatus?: string;
  education?: string;
  
  height?: string;
  weight?: string;
  
  // Spouse Name removed
  spouseOccupation?: string;
  
  siblingCount?: string;
  siblingPosition?: string;
  
  sonCount?: string;
  sonAges?: string; 
  
  daughterCount?: string;
  daughterAges?: string;
  
  whatsappCountryCode?: string;
  whatsappNumber?: string;
  
  homeCountryCode?: string;
  homePhoneNumber?: string;
  
  hasReferrer?: string;
  referrerName?: string;
  referrerCountryCode?: string;
  referrerNumber?: string;
  
  homeAddress?: string;

  // Skills Info
  cantoneseLevel?: string;
  englishLevel?: string;
  mandarinLevel?: string;
  
  yearsInHK?: string;
  yearsInSingapore?: string;
  yearsInTaiwan?: string;
  yearsInMalaysia?: string;
  yearsInMiddleEast?: string;
  yearsInSaudiArabia?: string;
  yearsInIndonesia?: string;
  yearsInPhilippines?: string;
  
  workedInOtherCountry?: string;
  workedInOtherCountryName?: string; // Added field
  yearsInOtherCountry?: string;
  
  willingNewborn?: string;
  willingChildren?: string;
  willingElderly?: string;
  willingDisabled?: string;
  willingPets?: string;
  willingCook?: string;

  // Latest Experience (LE)
  leCountry?: string;
  leEmployerNationality?: string;
  leStartYear?: string;
  leStartMonth?: string;
  leEndYear?: string;
  leEndMonth?: string;
  leHouseSize?: string;
  leMemberCount?: string;
  leMembers?: {
    role: string;
    ageStart?: string;
    ageEnd?: string;
  }[];
  leHelperCount?: string;
  leContractStatus?: string;
  leReasonLeaving?: string;
  leDisabledCare?: string[];
  leDisabledOther1?: string;
  leDisabledOther2?: string;
  leDisabledOther3?: string;
  lePets?: string[];
  lePetQuantities?: Record<string, string>;
  lePetOtherName1?: string;
  lePetOtherQty1?: string;
  lePetOtherName2?: string;
  lePetOtherQty2?: string;
  lePetOtherName3?: string;
  lePetOtherQty3?: string;
  leResponsibilities?: string[];
  leRespOther1?: string;
  leRespOther2?: string;
  leRespOther3?: string;
  leHasMoreExperience?: string;

  // Other Experience 2 (OE2)
  oe2Country?: string;
  oe2EmployerNationality?: string;
  oe2StartYear?: string;
  oe2StartMonth?: string;
  oe2EndYear?: string;
  oe2EndMonth?: string;
  oe2HouseSize?: string;
  oe2MemberCount?: string;
  oe2Members?: {
    role: string;
    ageStart?: string;
    ageEnd?: string;
  }[];
  oe2HelperCount?: string;
  oe2ContractStatus?: string;
  oe2ReasonLeaving?: string;
  oe2DisabledCare?: string[];
  oe2DisabledOther1?: string;
  oe2DisabledOther2?: string;
  oe2DisabledOther3?: string;
  oe2Pets?: string[];
  oe2PetQuantities?: Record<string, string>;
  oe2PetOtherName1?: string;
  oe2PetOtherQty1?: string;
  oe2PetOtherName2?: string;
  oe2PetOtherQty2?: string;
  oe2PetOtherName3?: string;
  oe2PetOtherQty3?: string;
  oe2Responsibilities?: string[];
  oe2RespOther1?: string;
  oe2RespOther2?: string;
  oe2RespOther3?: string;
  oe2HasMoreExperience?: string;

  // Other Experience 3 (OE3)
  oe3Country?: string;
  oe3EmployerNationality?: string;
  oe3StartYear?: string;
  oe3StartMonth?: string;
  oe3EndYear?: string;
  oe3EndMonth?: string;
  oe3HouseSize?: string;
  oe3MemberCount?: string;
  oe3Members?: {
    role: string;
    ageStart?: string;
    ageEnd?: string;
  }[];
  oe3HelperCount?: string;
  oe3ContractStatus?: string;
  oe3ReasonLeaving?: string;
  oe3DisabledCare?: string[];
  oe3DisabledOther1?: string;
  oe3DisabledOther2?: string;
  oe3DisabledOther3?: string;
  oe3Pets?: string[];
  oe3PetQuantities?: Record<string, string>;
  oe3PetOtherName1?: string;
  oe3PetOtherQty1?: string;
  oe3PetOtherName2?: string;
  oe3PetOtherQty2?: string;
  oe3PetOtherName3?: string;
  oe3PetOtherQty3?: string;
  oe3Responsibilities?: string[];
  oe3RespOther1?: string;
  oe3RespOther2?: string;
  oe3RespOther3?: string;
  oe3HasMoreExperience?: string;

  // Other Experience 4 (OE4)
  oe4Country?: string;
  oe4EmployerNationality?: string;
  oe4StartYear?: string;
  oe4StartMonth?: string;
  oe4EndYear?: string;
  oe4EndMonth?: string;
  oe4HouseSize?: string;
  oe4MemberCount?: string;
  oe4Members?: {
    role: string;
    ageStart?: string;
    ageEnd?: string;
  }[];
  oe4HelperCount?: string;
  oe4ContractStatus?: string;
  oe4ReasonLeaving?: string;
  oe4DisabledCare?: string[];
  oe4DisabledOther1?: string;
  oe4DisabledOther2?: string;
  oe4DisabledOther3?: string;
  oe4Pets?: string[];
  oe4PetQuantities?: Record<string, string>;
  oe4PetOtherName1?: string;
  oe4PetOtherQty1?: string;
  oe4PetOtherName2?: string;
  oe4PetOtherQty2?: string;
  oe4PetOtherName3?: string;
  oe4PetOtherQty3?: string;
  oe4Responsibilities?: string[];
  oe4RespOther1?: string;
  oe4RespOther2?: string;
  oe4RespOther3?: string;
  oe4HasMoreExperience?: string;

  // Other Experience 5 (OE5)
  oe5Country?: string;
  oe5EmployerNationality?: string;
  oe5StartYear?: string;
  oe5StartMonth?: string;
  oe5EndYear?: string;
  oe5EndMonth?: string;
  oe5HouseSize?: string;
  oe5MemberCount?: string;
  oe5Members?: {
    role: string;
    ageStart?: string;
    ageEnd?: string;
  }[];
  oe5HelperCount?: string;
  oe5ContractStatus?: string;
  oe5ReasonLeaving?: string;
  oe5DisabledCare?: string[];
  oe5DisabledOther1?: string;
  oe5DisabledOther2?: string;
  oe5DisabledOther3?: string;
  oe5Pets?: string[];
  oe5PetQuantities?: Record<string, string>;
  oe5PetOtherName1?: string;
  oe5PetOtherQty1?: string;
  oe5PetOtherName2?: string;
  oe5PetOtherQty2?: string;
  oe5PetOtherName3?: string;
  oe5PetOtherQty3?: string;
  oe5Responsibilities?: string[];
  oe5RespOther1?: string;
  oe5RespOther2?: string;
  oe5RespOther3?: string;
  oe5HasMoreExperience?: string;

  // Other Question
  oqLikeCooking?: string;
  oqLearnFromYoutube?: string;
  oqConfidentCooking?: string;
  oqSingOrStory?: string;
  oqTutoring?: string;
  oqStartWorkStatus?: string;
  oqVacationMonth?: string;
  oqStayHomeDuration?: string;
  oqAfraidDogs?: string;
  oqAfraidCats?: string;
  oqHasTattoos?: string;
  oqSmokingDrinking?: string;
  oqHealthAllergies?: string;
  oqHealthChronic?: string;
  oqAgreePICS?: string;
  oqFingersToes?: string;
  oqConfirmInfo?: string;
}

export type Language = 'en' | 'id';

export const SON_OPTIONS = [
  "No son", "1 son", "2 son", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

export const DAUGHTER_OPTIONS = [
  "No daughter", "1 daughter", "2 daughter", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"
];

export const SIBLING_OPTIONS = [
  "0 (only me)", "1 sibling (me +1)", "2 siblings (me +2)", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

export const POSITION_OPTIONS = [
  "Number 1", "Number 2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

// Helper to generate year options
export const generateYearOptions = (zeroLabel: string = "0") => {
  const options = [zeroLabel, "1 year", "2 years"];
  for (let i = 3; i <= 20; i++) {
    options.push(i.toString());
  }
  return options;
};

// Specific options for Other Country Years as requested
export const OTHER_COUNTRY_YEAR_OPTIONS = [
  "0", "1 year", "2 year", "3", "4", "5", "6", "7", "8", "9", 
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
];

// Constants for Experience Pages
export const YEAR_RANGE_OPTIONS = Array.from({length: 41}, (_, i) => (2000 + i).toString());
export const MONTH_OPTIONS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export const MEMBER_COUNT_OPTIONS = [
  "1 (Only employer)", "2 (employer +1)", "3 (employer +2)", "4 (employer +3)",
  "5 (employer +4)", "6 (employer +5)", "7 (employer +6)", "8 (employer +7)",
  "9 (employer +8)", "10 (employer +9)", "11 (employer +10)", "12 (employer +11)", "13 (employer +12)"
];

export const MEMBER_ROLE_OPTIONS = [
  "Adult", "Boy", "Girl", "Twins", "Triplets", "Grandpa", "Grandma"
];

export const CHILD_AGE_OPTIONS = [
  "Female employer is pregnant", "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", 
  "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", 
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
];

export const ELDERLY_AGE_OPTIONS = Array.from({length: 61}, (_, i) => (60 + i).toString());

export const HELPER_COUNT_OPTIONS = [
  "1 (Only me)", "2 (me +1)", "3 (me +2)", "4 (me +3)", "5 (me +4)", 
  "6 (me +5)", "7 (me +6)", "8 (me +7)", "9 (me +8)", "10 (me +9)", 
  "11 (me +10)", "12 (me +11)", "13 (me +12)"
];

// Other Question Options
export const WEEKS_OPTIONS = [
  "1 week", "2 weeks", "3 weeks", "4 weeks", "5 weeks", "6 weeks", 
  "7 weeks", "8 weeks", "9 weeks", "10 weeks", "11 weeks", "12 weeks"
];