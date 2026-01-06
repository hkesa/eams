import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { RadioGroup } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { 
  YEAR_RANGE_OPTIONS, 
  MONTH_OPTIONS, 
  MEMBER_COUNT_OPTIONS,
  MEMBER_ROLE_OPTIONS,
  CHILD_AGE_OPTIONS,
  HELPER_COUNT_OPTIONS
} from '../types';

const LatestExperienceEn: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (formData.leHasMoreExperience === "Yes, still have other employer") {
      navigate('/en/other-experience-2');
    } else {
      navigate('/en/other-question');
    }
  };

  const handleBack = () => {
    navigate('/en/skills-info');
  };

  // Helper logic for Dynamic Family Members
  const getMemberCount = (val?: string) => {
    if (!val) return 0;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const memberCount = getMemberCount(formData.leMemberCount);

  const updateMember = (index: number, field: string, value: string) => {
    const currentMembers = formData.leMembers || [];
    const newMembers = [...currentMembers];
    // Ensure array is big enough
    while (newMembers.length <= index) {
      newMembers.push({ role: '' });
    }
    newMembers[index] = { ...newMembers[index], [field]: value };
    updateFormData({ leMembers: newMembers });
  };

  const isAdult = (role?: string) => role === "Adult";

  // Helper logic for Pet Quantities
  const updatePetQty = (pet: string, qty: string) => {
    const currentQtys = formData.lePetQuantities || {};
    updateFormData({ 
      lePetQuantities: { ...currentQtys, [pet]: qty } 
    });
  };

  // Logic for checkboxes with exclusivity (No any / No pet)
  const handleDisabledCareChange = (option: string) => {
    let current = formData.leDisabledCare || [];
    if (option === "No any") {
      updateFormData({ leDisabledCare: ["No any"] });
    } else {
      if (current.includes("No any")) {
        current = []; // Clear "No any" if selecting something else
      }
      if (current.includes(option)) {
        updateFormData({ leDisabledCare: current.filter(c => c !== option) });
      } else {
        updateFormData({ leDisabledCare: [...current, option] });
      }
    }
  };

  const handlePetsChange = (option: string) => {
    let current = formData.lePets || [];
    if (option === "No pet") {
      updateFormData({ lePets: ["No pet"] });
    } else {
      if (current.includes("No pet")) {
        current = [];
      }
      if (current.includes(option)) {
        updateFormData({ lePets: current.filter(c => c !== option) });
      } else {
        updateFormData({ lePets: [...current, option] });
      }
    }
  };

  const handleResponsibilitiesChange = (option: string) => {
    let current = formData.leResponsibilities || [];
    if (option === "None of the following") {
        updateFormData({ leResponsibilities: ["None of the following"] });
    } else {
        if (current.includes("None of the following")) {
            current = [];
        }
        if (current.includes(option)) {
            updateFormData({ leResponsibilities: current.filter(c => c !== option) });
        } else {
            updateFormData({ leResponsibilities: [...current, option] });
        }
    }
  };

  // Option lists
  const disabledOptions = [
    "No any", "Bedridden care", "Disability care", "Tracheostomy care",
    "Wheelchair", "Walking slowly", "Medication feeding", "Bathing assistance",
    "Stroke", "Alzheimer's disease", "Parkinson's disease",
    "Other disabled person (1)", "Other disabled person (2)", "Other disabled person (3)"
  ];

  const petOptions = [
    "No pet", "Small dog", "Medium dog", "Big dog", "Cat", "Rabbit",
    "Other pet (1)", "Other pet (2)", "Other pet (3)"
  ];

  const respOptions = [
    "None of the following",
    "Car wash", "House cleaning", "Hand washing clothes",
    "I go to supermarket to buy food", "I go to Chinese wet-market to buy food",
    "I sharing room with other", "Cook Chinese food", "Cook Western food",
    "Other responsibilities (1)", "Other responsibilities (2)", "Other responsibilities (3)"
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        {/* Header */}
        <div className="bg-red-100 p-4 rounded-lg mb-6 border-l-4 border-red-800">
          <h2 className="font-bold text-red-900 text-[20px] leading-tight">
            Latest Domestic Helper Work Experience (Including Working in Hong Kong, in Other Countries, in Philippines, in Indonesia, Only Domestic Helper Experience)
          </h2>
        </div>

        {/* Country */}
        <Input
          label="Country of Employment? (If Hong Kong, Write Location, e.g. Causeway Bay)"
          value={formData.leCountry || ''}
          onChange={(e) => updateFormData({ leCountry: e.target.value })}
        />

        {/* Employer Nationality */}
        <RadioGroup
          label="Employer's Nationality?"
          name="leEmployerNationality"
          options={["Local people", "Foreigner", "Chinese", "Hong Kong people", "Asian"]}
          value={formData.leEmployerNationality}
          onChange={(val) => updateFormData({ leEmployerNationality: val })}
        />

        {/* Start Date */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">In This Employer, Start Work Year And Start Work Month?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Year"
                options={YEAR_RANGE_OPTIONS}
                value={formData.leStartYear || ''}
                onChange={(e) => updateFormData({ leStartYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Month"
                options={MONTH_OPTIONS}
                value={formData.leStartMonth || ''}
                onChange={(e) => updateFormData({ leStartMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">In This Employer, End Work Year And End Work Month?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Year"
                options={YEAR_RANGE_OPTIONS}
                value={formData.leEndYear || ''}
                onChange={(e) => updateFormData({ leEndYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Month"
                options={MONTH_OPTIONS}
                value={formData.leEndMonth || ''}
                onChange={(e) => updateFormData({ leEndMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        {/* House Size */}
        <Input
          label="Employer’s House Size? (e.g. 1000 square feet)"
          value={formData.leHouseSize || ''}
          onChange={(e) => updateFormData({ leHouseSize: e.target.value })}
        />

        {/* Family Members Count */}
        <Select
          label="Number of Employer Family Members? (Living in The Same Home)"
          options={MEMBER_COUNT_OPTIONS}
          value={formData.leMemberCount || ''}
          onChange={(e) => updateFormData({ leMemberCount: e.target.value })}
        />

        {/* Dynamic Family Members */}
        {memberCount > 0 && (
          <div className="mb-6 flex flex-col gap-6">
            <label className="font-bold text-gray-900 block border-b pb-2">
              Age of Employer Family Members?
            </label>
            
            {Array.from({ length: memberCount }).map((_, idx) => {
              const member = formData.leMembers?.[idx] || { role: '' };
              const showAges = !isAdult(member.role);

              return (
                <div key={idx} className="border border-red-200 rounded-lg overflow-hidden">
                  <div className="bg-red-50 p-3 border-b border-red-100">
                    <span className="text-red-900 font-bold">Member {idx + 1}</span>
                  </div>
                  <div className="p-4 bg-white">
                    <Select
                      label="Member"
                      boldLabel={true}
                      options={MEMBER_ROLE_OPTIONS}
                      value={member.role}
                      onChange={(e) => updateMember(idx, 'role', e.target.value)}
                      className="mb-4"
                    />

                    {showAges && (
                      <div className="flex flex-col gap-4">
                        <Select
                          label="Age When You Started (From)"
                          options={CHILD_AGE_OPTIONS}
                          value={member.ageStart || ''}
                          onChange={(e) => updateMember(idx, 'ageStart', e.target.value)}
                        />
                        <Select
                          label="Age When You Leave (Until)"
                          options={CHILD_AGE_OPTIONS}
                          value={member.ageEnd || ''}
                          onChange={(e) => updateMember(idx, 'ageEnd', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Number of Helpers */}
        <Select
          label="Number of Helpers?"
          options={HELPER_COUNT_OPTIONS}
          value={formData.leHelperCount || ''}
          onChange={(e) => updateFormData({ leHelperCount: e.target.value })}
        />

        {/* Contract Status */}
        <RadioGroup
          label="Contract Status?"
          name="leContractStatus"
          options={[
            "Finish contract", 
            "Employer terminated me already", 
            "I resigned already", 
            "Not contract and can leave anytime"
          ]}
          value={formData.leContractStatus}
          onChange={(val) => updateFormData({ leContractStatus: val })}
        />

        {/* Reason for Leaving */}
        <TextArea
          label="Reason for Leaving? (Clear And True Reason)"
          value={formData.leReasonLeaving || ''}
          onChange={(e) => updateFormData({ leReasonLeaving: e.target.value })}
        />

        {/* Disabled Person Care (Custom Checkbox Layout) */}
        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            In This Employer, Did You Take Care of Disabled Person?
          </label>
          <div className="flex flex-col gap-3">
            {disabledOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.leDisabledCare?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.leDisabledCare?.includes(option) || false}
                    onChange={() => handleDisabledCareChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>
                
                {/* Inputs below specific options */}
                {formData.leDisabledCare?.includes(option) && option === "Other disabled person (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (1)"
                        value={formData.leDisabledOther1 || ''}
                        onChange={(e) => updateFormData({ leDisabledOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.leDisabledCare?.includes(option) && option === "Other disabled person (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (2)"
                        value={formData.leDisabledOther2 || ''}
                        onChange={(e) => updateFormData({ leDisabledOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.leDisabledCare?.includes(option) && option === "Other disabled person (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (3)"
                        value={formData.leDisabledOther3 || ''}
                        onChange={(e) => updateFormData({ leDisabledOther3: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pets (Custom Checkbox Layout) */}
        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            Employer’s Pets?
          </label>
          <div className="flex flex-col gap-3">
            {petOptions.map((option) => (
              <div key={option}>
                 <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.lePets?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.lePets?.includes(option) || false}
                    onChange={() => handlePetsChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {/* Conditional Inputs */}
                {formData.lePets?.includes(option) && ["Small dog", "Medium dog", "Big dog", "Cat", "Rabbit"].includes(option) && (
                  <div className="mt-2 ml-4">
                     <Input 
                        type="number"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder={`Fill-in quantity for ${option.toLowerCase()}`}
                        value={formData.lePetQuantities?.[option] || ''}
                        onChange={(e) => updatePetQty(option, e.target.value)}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}

                {formData.lePets?.includes(option) && option.includes("Other pet") && (
                   <div className="mt-2 ml-4 flex gap-2">
                    {/* Logic to map correct state variable based on option string */}
                    <input 
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Fill-in pet"
                      value={option === "Other pet (1)" ? (formData.lePetOtherName1 || '') : option === "Other pet (2)" ? (formData.lePetOtherName2 || '') : (formData.lePetOtherName3 || '')}
                      onChange={(e) => {
                         if (option === "Other pet (1)") updateFormData({ lePetOtherName1: e.target.value });
                         else if (option === "Other pet (2)") updateFormData({ lePetOtherName2: e.target.value });
                         else updateFormData({ lePetOtherName3: e.target.value });
                      }}
                    />
                    <input 
                      type="number"
                      inputMode="numeric"
                      pattern="\d*"
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Fill-in quantity"
                      value={option === "Other pet (1)" ? (formData.lePetOtherQty1 || '') : option === "Other pet (2)" ? (formData.lePetOtherQty2 || '') : (formData.lePetOtherQty3 || '')}
                      onChange={(e) => {
                         if (option === "Other pet (1)") updateFormData({ lePetOtherQty1: e.target.value });
                         else if (option === "Other pet (2)") updateFormData({ lePetOtherQty2: e.target.value });
                         else updateFormData({ lePetOtherQty3: e.target.value });
                      }}
                    />
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* Job Responsibilities (Custom Checkbox Layout) */}
        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            In This Employer, Your Job Responsibilities?
          </label>
          <div className="flex flex-col gap-3">
            {respOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.leResponsibilities?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.leResponsibilities?.includes(option) || false}
                    onChange={() => handleResponsibilitiesChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {/* Conditional Inputs */}
                {formData.leResponsibilities?.includes(option) && option === "Other responsibilities (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (1)"
                        value={formData.leRespOther1 || ''}
                        onChange={(e) => updateFormData({ leRespOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.leResponsibilities?.includes(option) && option === "Other responsibilities (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (2)"
                        value={formData.leRespOther2 || ''}
                        onChange={(e) => updateFormData({ leRespOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.leResponsibilities?.includes(option) && option === "Other responsibilities (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (3)"
                        value={formData.leRespOther3 || ''}
                        onChange={(e) => updateFormData({ leRespOther3: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* More Experience? */}
        <RadioGroup
          label="Do You Still Have Other Domestic Helper Work Experience in HK OR in Other Countries OR in Philippines OR in Indonesia? (Only Domestic Helper Experience)?"
          name="leHasMoreExperience"
          options={[
            "Yes, still have other employer",
            "No, only one employer experience"
          ]}
          value={formData.leHasMoreExperience}
          onChange={(val) => updateFormData({ leHasMoreExperience: val })}
        />

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            className="w-1/2"
          >
            Previous Page
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNext} 
            className="w-1/2"
          >
            Save And Next Page
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LatestExperienceEn;