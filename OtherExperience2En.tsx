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

const OtherExperience2En: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (formData.oe2HasMoreExperience === "Yes, still have other employer") {
      navigate('/en/other-experience-3');
    } else {
      navigate('/en/other-question');
    }
  };

  const handleBack = () => {
    navigate('/en/latest-experience');
  };

  const getMemberCount = (val?: string) => {
    if (!val) return 0;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const memberCount = getMemberCount(formData.oe2MemberCount);

  const updateMember = (index: number, field: string, value: string) => {
    const currentMembers = formData.oe2Members || [];
    const newMembers = [...currentMembers];
    while (newMembers.length <= index) {
      newMembers.push({ role: '' });
    }
    newMembers[index] = { ...newMembers[index], [field]: value };
    updateFormData({ oe2Members: newMembers });
  };

  const isAdult = (role?: string) => role === "Adult";

  const updatePetQty = (pet: string, qty: string) => {
    const currentQtys = formData.oe2PetQuantities || {};
    updateFormData({ 
      oe2PetQuantities: { ...currentQtys, [pet]: qty } 
    });
  };

  const handleDisabledCareChange = (option: string) => {
    let current = formData.oe2DisabledCare || [];
    if (option === "No any") {
      updateFormData({ oe2DisabledCare: ["No any"] });
    } else {
      if (current.includes("No any")) current = [];
      if (current.includes(option)) {
        updateFormData({ oe2DisabledCare: current.filter(c => c !== option) });
      } else {
        updateFormData({ oe2DisabledCare: [...current, option] });
      }
    }
  };

  const handlePetsChange = (option: string) => {
    let current = formData.oe2Pets || [];
    if (option === "No pet") {
      updateFormData({ oe2Pets: ["No pet"] });
    } else {
      if (current.includes("No pet")) current = [];
      if (current.includes(option)) {
        updateFormData({ oe2Pets: current.filter(c => c !== option) });
      } else {
        updateFormData({ oe2Pets: [...current, option] });
      }
    }
  };

  const handleResponsibilitiesChange = (option: string) => {
    let current = formData.oe2Responsibilities || [];
    if (option === "None of the following") {
        updateFormData({ oe2Responsibilities: ["None of the following"] });
    } else {
        if (current.includes("None of the following")) {
            current = [];
        }
        if (current.includes(option)) {
            updateFormData({ oe2Responsibilities: current.filter(c => c !== option) });
        } else {
            updateFormData({ oe2Responsibilities: [...current, option] });
        }
    }
  };

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
        
        <div className="bg-red-100 p-4 rounded-lg mb-6 border-l-4 border-red-800">
          <h2 className="font-bold text-red-900 text-[20px] leading-tight">
            Other Domestic Helper Experience (2) (Including Working in Hong Kong, in Other Countries, in Philippines, in Indonesia, Only Domestic Helper Experience)
          </h2>
        </div>

        <Input
          label="Country of Employment? (If Hong Kong, Write Location, e.g. Causeway Bay)"
          value={formData.oe2Country || ''}
          onChange={(e) => updateFormData({ oe2Country: e.target.value })}
        />

        <RadioGroup
          label="Employer's Nationality?"
          name="oe2EmployerNationality"
          options={["Local people", "Foreigner", "Chinese", "Hong Kong people", "Asian"]}
          value={formData.oe2EmployerNationality}
          onChange={(val) => updateFormData({ oe2EmployerNationality: val })}
        />

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">In This Employer, Start Work Year And Start Work Month?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Year"
                options={YEAR_RANGE_OPTIONS}
                value={formData.oe2StartYear || ''}
                onChange={(e) => updateFormData({ oe2StartYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Month"
                options={MONTH_OPTIONS}
                value={formData.oe2StartMonth || ''}
                onChange={(e) => updateFormData({ oe2StartMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">In This Employer, End Work Year And End Work Month?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Year"
                options={YEAR_RANGE_OPTIONS}
                value={formData.oe2EndYear || ''}
                onChange={(e) => updateFormData({ oe2EndYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Month"
                options={MONTH_OPTIONS}
                value={formData.oe2EndMonth || ''}
                onChange={(e) => updateFormData({ oe2EndMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        <Input
          label="Employer’s House Size? (e.g. 1000 square feet)"
          value={formData.oe2HouseSize || ''}
          onChange={(e) => updateFormData({ oe2HouseSize: e.target.value })}
        />

        <Select
          label="Number of Employer Family Members? (Living in The Same Home)"
          options={MEMBER_COUNT_OPTIONS}
          value={formData.oe2MemberCount || ''}
          onChange={(e) => updateFormData({ oe2MemberCount: e.target.value })}
        />

        {memberCount > 0 && (
          <div className="mb-6 flex flex-col gap-6">
            <label className="font-bold text-gray-900 block border-b pb-2">
              Age of Employer Family Members?
            </label>
            
            {Array.from({ length: memberCount }).map((_, idx) => {
              const member = formData.oe2Members?.[idx] || { role: '' };
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

        <Select
          label="Number of Helpers?"
          options={HELPER_COUNT_OPTIONS}
          value={formData.oe2HelperCount || ''}
          onChange={(e) => updateFormData({ oe2HelperCount: e.target.value })}
        />

        <RadioGroup
          label="Contract Status?"
          name="oe2ContractStatus"
          options={[
            "Finish contract", 
            "Employer terminated me already", 
            "I resigned already", 
            "Not contract and can leave anytime"
          ]}
          value={formData.oe2ContractStatus}
          onChange={(val) => updateFormData({ oe2ContractStatus: val })}
        />

        <TextArea
          label="Reason for Leaving? (Clear And True Reason)"
          value={formData.oe2ReasonLeaving || ''}
          onChange={(e) => updateFormData({ oe2ReasonLeaving: e.target.value })}
        />

        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            In This Employer, Did You Take Care of Disabled Person?
          </label>
          <div className="flex flex-col gap-3">
            {disabledOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe2DisabledCare?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe2DisabledCare?.includes(option) || false}
                    onChange={() => handleDisabledCareChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>
                
                {formData.oe2DisabledCare?.includes(option) && option === "Other disabled person (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (1)"
                        value={formData.oe2DisabledOther1 || ''}
                        onChange={(e) => updateFormData({ oe2DisabledOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe2DisabledCare?.includes(option) && option === "Other disabled person (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (2)"
                        value={formData.oe2DisabledOther2 || ''}
                        onChange={(e) => updateFormData({ oe2DisabledOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe2DisabledCare?.includes(option) && option === "Other disabled person (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other disabled (3)"
                        value={formData.oe2DisabledOther3 || ''}
                        onChange={(e) => updateFormData({ oe2DisabledOther3: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            Employer’s Pets?
          </label>
          <div className="flex flex-col gap-3">
            {petOptions.map((option) => (
              <div key={option}>
                 <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe2Pets?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe2Pets?.includes(option) || false}
                    onChange={() => handlePetsChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {formData.oe2Pets?.includes(option) && ["Small dog", "Medium dog", "Big dog", "Cat", "Rabbit"].includes(option) && (
                  <div className="mt-2 ml-4">
                     <Input 
                        type="number"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder={`Fill-in quantity for ${option.toLowerCase()}`}
                        value={formData.oe2PetQuantities?.[option] || ''}
                        onChange={(e) => updatePetQty(option, e.target.value)}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}

                {formData.oe2Pets?.includes(option) && option.includes("Other pet") && (
                   <div className="mt-2 ml-4 flex gap-2">
                    <input 
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Fill-in pet"
                      value={option === "Other pet (1)" ? (formData.oe2PetOtherName1 || '') : option === "Other pet (2)" ? (formData.oe2PetOtherName2 || '') : (formData.oe2PetOtherName3 || '')}
                      onChange={(e) => {
                         if (option === "Other pet (1)") updateFormData({ oe2PetOtherName1: e.target.value });
                         else if (option === "Other pet (2)") updateFormData({ oe2PetOtherName2: e.target.value });
                         else updateFormData({ oe2PetOtherName3: e.target.value });
                      }}
                    />
                    <input 
                      type="number"
                      inputMode="numeric"
                      pattern="\d*"
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Fill-in quantity"
                      value={option === "Other pet (1)" ? (formData.oe2PetOtherQty1 || '') : option === "Other pet (2)" ? (formData.oe2PetOtherQty2 || '') : (formData.oe2PetOtherQty3 || '')}
                      onChange={(e) => {
                         if (option === "Other pet (1)") updateFormData({ oe2PetOtherQty1: e.target.value });
                         else if (option === "Other pet (2)") updateFormData({ oe2PetOtherQty2: e.target.value });
                         else updateFormData({ oe2PetOtherQty3: e.target.value });
                      }}
                    />
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            In This Employer, Your Job Responsibilities?
          </label>
          <div className="flex flex-col gap-3">
            {respOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe2Responsibilities?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe2Responsibilities?.includes(option) || false}
                    onChange={() => handleResponsibilitiesChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {formData.oe2Responsibilities?.includes(option) && option === "Other responsibilities (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (1)"
                        value={formData.oe2RespOther1 || ''}
                        onChange={(e) => updateFormData({ oe2RespOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe2Responsibilities?.includes(option) && option === "Other responsibilities (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (2)"
                        value={formData.oe2RespOther2 || ''}
                        onChange={(e) => updateFormData({ oe2RespOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe2Responsibilities?.includes(option) && option === "Other responsibilities (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Fill-in other responsibilities (3)"
                        value={formData.oe2RespOther3 || ''}
                        onChange={(e) => updateFormData({ oe2RespOther3: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <RadioGroup
          label="Do You Still Have Other Domestic Helper Work Experience in HK OR in Other Countries OR in Philippines OR in Indonesia? (Only Domestic Helper Experience)?"
          name="oe2HasMoreExperience"
          options={[
            "Yes, still have other employer",
            "No, only 2 employer experience"
          ]}
          value={formData.oe2HasMoreExperience}
          onChange={(val) => updateFormData({ oe2HasMoreExperience: val })}
        />

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

export default OtherExperience2En;