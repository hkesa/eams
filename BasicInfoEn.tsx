import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { RadioGroup } from '../components/RadioGroup';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { 
  SON_OPTIONS, 
  DAUGHTER_OPTIONS, 
  SIBLING_OPTIONS, 
  POSITION_OPTIONS 
} from '../types';

const BasicInfoEn: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    navigate('/en/skills-info');
  };

  const handleBack = () => {
    navigate('/');
  };

  const getCount = (val?: string) => {
    if (!val || val.includes("No")) return 0;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const sonCount = getCount(formData.sonCount);
  const daughterCount = getCount(formData.daughterCount);
  const siblingCount = getCount(formData.siblingCount);

  // Validation Logic Helpers
  const isPassportExpiring = (dateStr?: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    const nineMonthsFromNow = new Date();
    nineMonthsFromNow.setMonth(today.getMonth() + 9);
    return date < nineMonthsFromNow;
  };

  const isUnder24 = (dateStr?: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      return age - 1 < 24;
    }
    return age < 24;
  };

  const isHeightWarning = (val?: string) => {
    if (!val) return false;
    const num = parseFloat(val);
    return num < 145 || num > 185;
  };

  const isWeightWarning = (val?: string) => {
    if (!val) return false;
    const num = parseFloat(val);
    return num < 40 || num > 70;
  };

  // Helper for array based inputs (Son/Daughter ages)
  const getAgeArray = (val?: string) => {
    if (!val) return [];
    return val.split(',').map(s => s.trim());
  };

  const updateAge = (type: 'son' | 'daughter', index: number, value: string) => {
    const currentStr = type === 'son' ? formData.sonAges : formData.daughterAges;
    const count = type === 'son' ? sonCount : daughterCount;
    const arr = getAgeArray(currentStr);
    
    // Ensure array length matches count
    while (arr.length < count) arr.push('');
    // Trim if too long
    while (arr.length > count) arr.pop();
    
    arr[index] = value;
    
    if (type === 'son') {
      updateFormData({ sonAges: arr.join(', ') });
    } else {
      updateFormData({ daughterAges: arr.join(', ') });
    }
  };

  // Referrer Data Cleanup Logic
  const handleReferrerChange = (val: string) => {
    if (val === "No referrer") {
      updateFormData({ 
        hasReferrer: val,
        referrerName: undefined,
        referrerCountryCode: undefined,
        referrerNumber: undefined
      });
    } else {
      updateFormData({ hasReferrer: val });
    }
  };

  // HK Status Data Cleanup
  const handleLocationChange = (val: string) => {
    if (val !== "Now in Hong Kong") {
      updateFormData({ 
        currentLocation: val,
        hkContractStatus: undefined,
        finishContractDate: undefined,
        // workedInHkBefore: undefined // Prompt specifically asked to hide "Worked in HK Before" if "Now in HK", logic below is reversed
      });
    } else {
      updateFormData({ 
        currentLocation: val,
        workedInHkBefore: undefined // Hide "Worked in HK Before" if Now in HK
      });
    }
  };

  // Sibling Data Cleanup
  const handleSiblingCountChange = (val: string) => {
    const count = getCount(val);
    if (count === 0) {
      updateFormData({ siblingCount: val, siblingPosition: undefined });
    } else {
      updateFormData({ siblingCount: val });
    }
  };

  // Special Skills Exclusive Logic
  const handleSpecialSkillsChange = (vals: string[]) => {
    const noneOption = "None of the above";
    const oldVals = formData.specialSkills || [];
    
    // If "None" is newly selected, clear everything else
    if (vals.includes(noneOption) && !oldVals.includes(noneOption)) {
      updateFormData({ specialSkills: [noneOption], specialSkillsOther: undefined });
      return;
    }

    // If "None" was already selected and we select something else, remove "None"
    if (oldVals.includes(noneOption) && vals.length > 1) {
      updateFormData({ specialSkills: vals.filter(v => v !== noneOption) });
      return;
    }
    
    // Check if "Other experience" was removed, if so clear the input
    if (!vals.includes("Other experience") && oldVals.includes("Other experience")) {
        updateFormData({ specialSkills: vals, specialSkillsOther: undefined });
    } else {
        updateFormData({ specialSkills: vals });
    }
  };

  // Clean up other inputs
  const handleNationalityChange = (val: string) => {
    if (val !== "Other nationality") {
        updateFormData({ nationality: val, nationalityOther: undefined });
    } else {
        updateFormData({ nationality: val });
    }
  };

  const handleReligionChange = (val: string) => {
    if (val !== "Other religion") {
        updateFormData({ religion: val, religionOther: undefined });
    } else {
        updateFormData({ religion: val });
    }
  };


  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <h2 className="font-bold text-center mb-6 border-b pb-4">Basic Information</h2>

        <RadioGroup
          label="What Do You Want to Apply?"
          name="applicationType"
          options={["Apply as domestic helper", "Apply as Hong Kong driver (Must have HK driving license)"]}
          value={formData.applicationType}
          onChange={(val) => updateFormData({ applicationType: val })}
        />

        <CheckboxGroup
          label="Your Special Skills?"
          options={[
            "I have overseas driving license",
            "Nurse experience",
            "Teacher experience",
            "Elderly home experience",
            "I have taken child care courses",
            "I have taken elderly care courses",
            "Hotel experience",
            "Restaurant cooking experience",
            "Gardening experience",
            "Carpentry experience",
            "None of the above",
            "Other experience"
          ]}
          selectedValues={formData.specialSkills}
          onChange={handleSpecialSkillsChange}
        />
        {formData.specialSkills?.includes("Other experience") && (
          <Input 
            placeholder="Fill-in other skills"
            value={formData.specialSkillsOther || ''}
            onChange={(e) => updateFormData({ specialSkillsOther: e.target.value })}
            className="mt-[-1rem]" 
            boldLabel={false}
          />
        )}

        <RadioGroup
          label="Helper Gender?"
          name="gender"
          options={["Female", "Male"]}
          value={formData.gender}
          onChange={(val) => updateFormData({ gender: val })}
        />

        <Input
          label="Helper Full Name?"
          value={formData.fullName || ''}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
        />

        <RadioGroup
          label="Where Are You Now?"
          name="currentLocation"
          options={["Now in Hong Kong", "Now in Philippines", "Now in Indonesia", "Now in other Country"]}
          value={formData.currentLocation}
          onChange={handleLocationChange}
        />

        <RadioGroup
          label="Helper Nationality?"
          name="nationality"
          options={["Filipino", "Indonesian", "Other nationality"]}
          value={formData.nationality}
          onChange={handleNationalityChange}
        />
        {formData.nationality === "Other nationality" && (
          <Input 
            placeholder="Fill-in other nationality"
            value={formData.nationalityOther || ''}
            onChange={(e) => updateFormData({ nationalityOther: e.target.value })}
            className="mt-[-1rem]"
            boldLabel={false}
          />
        )}

        {formData.currentLocation === "Now in Hong Kong" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <RadioGroup
              label="HK Contract Status?"
              name="hkContractStatus"
              options={[
                "Finish contract",
                "Employer terminated me already",
                "I breached contract already",
                "I will break contract if I find new employer",
                "Current employer passed away",
                "Current employer is relocating",
                "Current employer has financial problems"
              ]}
              value={formData.hkContractStatus}
              onChange={(val) => updateFormData({ hkContractStatus: val })}
            />

            <Input
              type="date"
              label="Finish Contract Date OR Last Working Date?"
              value={formData.finishContractDate || ''}
              onChange={(e) => updateFormData({ finishContractDate: e.target.value })}
            />
          </div>
        )}

        {formData.currentLocation !== "Now in Hong Kong" && (
          <RadioGroup
            label="Have You Worked in Hong Kong Before?"
            name="workedInHkBefore"
            options={["Yes, worked in HK before", "No, 1st time"]}
            value={formData.workedInHkBefore}
            onChange={(val) => updateFormData({ workedInHkBefore: val })}
          />
        )}

        <div>
          <Input
            type="date"
            label="Your Passport Expiry Date?"
            value={formData.passportExpiryDate || ''}
            onChange={(e) => updateFormData({ passportExpiryDate: e.target.value })}
          />
          {isPassportExpiring(formData.passportExpiryDate) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded">
              <span className="text-red-900 font-bold">Your passport is about to expire, please renew it as soon as possible</span>
            </div>
          )}
        </div>

        <div>
          <Input
            type="date"
            label="Your Date of Birth?"
            value={formData.dateOfBirth || ''}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
          />
          {isUnder24(formData.dateOfBirth) && (
             <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded">
              <span className="text-red-900 font-bold">Please check if your date of birth is entered incorrectly, if it is correct, you may ignore this message</span>
            </div>
          )}
        </div>

        <RadioGroup
          label="Your Religion?"
          name="religion"
          options={["No religion", "Catholic", "Christian", "Muslim", "Buddhist", "Other religion"]}
          value={formData.religion}
          onChange={handleReligionChange}
        />
        {formData.religion === "Other religion" && (
          <Input 
            placeholder="Fill-in other religion"
            value={formData.religionOther || ''}
            onChange={(e) => updateFormData({ religionOther: e.target.value })}
            className="mt-[-1rem]"
            boldLabel={false}
          />
        )}

        <RadioGroup
          label="Marital Status?"
          name="maritalStatus"
          options={[
            "Unmarried, single", 
            "Unmarried partner", 
            "Living with partner", 
            "Married", 
            "Divorced", 
            "Separated", 
            "Single parent", 
            "Widowed"
          ]}
          value={formData.maritalStatus}
          onChange={(val) => updateFormData({ maritalStatus: val })}
        />

        <RadioGroup
          label="Education?"
          name="education"
          options={["Primary school", "Secondary school", "College", "Vocational school", "University"]}
          value={formData.education}
          onChange={(val) => updateFormData({ education: val })}
        />

        <div>
          <Input
            type="number"
            inputMode="numeric"
            pattern="\d*"
            label="Your Height (cm)?"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: e.target.value })}
          />
          {isHeightWarning(formData.height) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded">
              <span className="text-red-900 font-bold">Note: Write in CM and please check if your height was entered incorrectly, if it is correct, you may ignore this message</span>
            </div>
          )}
        </div>

        <div>
          <Input
            type="number"
            inputMode="numeric"
            pattern="\d*"
            label="Your Weight (kg)?"
            value={formData.weight || ''}
            onChange={(e) => updateFormData({ weight: e.target.value })}
          />
          {isWeightWarning(formData.weight) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded">
              <span className="text-red-900 font-bold">Note: Write in KG and please check if your weight was entered incorrectly, if it is correct, you may ignore this message</span>
            </div>
          )}
        </div>

        <Input
          label="Your Spouse's Job Occupation? (If No Spouse, Please Fill in N/A)"
          value={formData.spouseOccupation || ''}
          onChange={(e) => updateFormData({ spouseOccupation: e.target.value })}
        />

        <Select
          label="Number of Siblings?"
          options={SIBLING_OPTIONS}
          value={formData.siblingCount || ''}
          onChange={(e) => handleSiblingCountChange(e.target.value)}
        />

        {siblingCount > 0 && (
          <Select
            label="My Position Among Siblings?"
            options={POSITION_OPTIONS}
            value={formData.siblingPosition || ''}
            onChange={(e) => updateFormData({ siblingPosition: e.target.value })}
          />
        )}

        <Select
          label="How Many Sons Do You Have?"
          options={SON_OPTIONS}
          value={formData.sonCount || ''}
          onChange={(e) => updateFormData({ sonCount: e.target.value })}
        />
        {sonCount > 0 && (
          <div className="flex flex-col gap-1 mb-4">
             <label className="text-gray-900 font-bold">Age of Sons?</label>
             {Array.from({ length: sonCount }).map((_, i) => (
                <Input
                  key={`son-${i}`}
                  type="number"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder={`Age of son ${i + 1}`}
                  value={getAgeArray(formData.sonAges)[i] || ''}
                  onChange={(e) => updateAge('son', i, e.target.value)}
                  className="mb-0" 
                  boldLabel={false}
                />
             ))}
          </div>
        )}

        <Select
          label="How Many Daughters Do You Have?"
          options={DAUGHTER_OPTIONS}
          value={formData.daughterCount || ''}
          onChange={(e) => updateFormData({ daughterCount: e.target.value })}
        />
        {daughterCount > 0 && (
          <div className="flex flex-col gap-1 mb-4">
             <label className="text-gray-900 font-bold">Age of Daughters?</label>
             {Array.from({ length: daughterCount }).map((_, i) => (
                <Input
                  key={`daughter-${i}`}
                  type="number"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder={`Age of daughter ${i + 1}`}
                  value={getAgeArray(formData.daughterAges)[i] || ''}
                  onChange={(e) => updateAge('daughter', i, e.target.value)}
                  className="mb-0"
                  boldLabel={false}
                />
             ))}
          </div>
        )}

        <div className="mb-6 w-full">
          <label className="font-bold text-gray-900 mb-2 block">Your WhatsApp Number? Include Country Code</label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 852"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                value={formData.whatsappCountryCode || ''}
                onChange={(e) => updateFormData({ whatsappCountryCode: e.target.value })}
              />
            </div>
            <div className="w-2/3">
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 96111003"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                value={formData.whatsappNumber || ''}
                onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-6 w-full">
          <label className="font-bold text-gray-900 mb-2 block">Your Home Country Mobile Phone Number? Include Country Code</label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 63"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                value={formData.homeCountryCode || ''}
                onChange={(e) => updateFormData({ homeCountryCode: e.target.value })}
              />
            </div>
            <div className="w-2/3">
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 96111003"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                value={formData.homePhoneNumber || ''}
                onChange={(e) => updateFormData({ homePhoneNumber: e.target.value })}
              />
            </div>
          </div>
        </div>

        <RadioGroup
          label="Who Referred You To Our Agency?"
          name="hasReferrer"
          options={["Yes, I have referrer", "No referrer"]}
          value={formData.hasReferrer}
          onChange={handleReferrerChange}
        />

        {formData.hasReferrer === "Yes, I have referrer" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Input
              label="Name of Referrer?"
              value={formData.referrerName || ''}
              onChange={(e) => updateFormData({ referrerName: e.target.value })}
            />
            
            <div className="w-full">
              <label className="font-bold text-gray-900 mb-2 block">Referrer’s WhatsApp Number? Include Country Code</label>
              <div className="flex gap-2">
                <div className="w-1/3">
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="e.g. 852"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                    value={formData.referrerCountryCode || ''}
                    onChange={(e) => updateFormData({ referrerCountryCode: e.target.value })}
                  />
                </div>
                <div className="w-2/3">
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="e.g. 96111003"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-[21px]"
                    value={formData.referrerNumber || ''}
                    onChange={(e) => updateFormData({ referrerNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <TextArea
          label="Your Hometown Address? (Only Write Province, State, City)"
          value={formData.homeAddress || ''}
          onChange={(e) => updateFormData({ homeAddress: e.target.value })}
          rows={2}
          className="min-h-[80px]" 
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

export default BasicInfoEn;