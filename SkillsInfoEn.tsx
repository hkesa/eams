import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { RadioGroup } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { generateYearOptions, OTHER_COUNTRY_YEAR_OPTIONS } from '../types';
import { Input } from '../components/Input';

const SkillsInfoEn: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    navigate('/en/latest-experience');
  };

  const handleBack = () => {
    navigate('/en/basic-info');
  };

  const LANGUAGE_OPTIONS = ["Learning", "Average", "Good"];
  const YES_NO_WILLING = ["Yes, willing", "No"];

  const handleOtherCountryChange = (val: string) => {
    if (val === "No other country") {
      updateFormData({ 
        workedInOtherCountry: val,
        workedInOtherCountryName: undefined,
        yearsInOtherCountry: undefined
      });
    } else {
      updateFormData({ workedInOtherCountry: val });
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <h2 className="font-bold text-center mb-6 border-b pb-4">Skills Information</h2>

        <RadioGroup
          label="Your Cantonese Language?"
          name="cantoneseLevel"
          options={LANGUAGE_OPTIONS}
          value={formData.cantoneseLevel}
          onChange={(val) => updateFormData({ cantoneseLevel: val })}
        />

        <RadioGroup
          label="Your English Language?"
          name="englishLevel"
          options={LANGUAGE_OPTIONS}
          value={formData.englishLevel}
          onChange={(val) => updateFormData({ englishLevel: val })}
        />

        <RadioGroup
          label="Your Mandarin Language?"
          name="mandarinLevel"
          options={LANGUAGE_OPTIONS}
          value={formData.mandarinLevel}
          onChange={(val) => updateFormData({ mandarinLevel: val })}
        />

        <Select
          label="How Many Years Have You Worked in Hong Kong? (Only Domestic Helper Experience)"
          options={generateYearOptions("0 (Never been to Hong Kong)")}
          value={formData.yearsInHK || ''}
          onChange={(e) => updateFormData({ yearsInHK: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Singapore? (Only Domestic Helper Experience)"
          options={generateYearOptions("0 (Never been to Singapore)")}
          value={formData.yearsInSingapore || ''}
          onChange={(e) => updateFormData({ yearsInSingapore: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Taiwan? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInTaiwan || ''}
          onChange={(e) => updateFormData({ yearsInTaiwan: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Malaysia? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInMalaysia || ''}
          onChange={(e) => updateFormData({ yearsInMalaysia: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Middle East? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInMiddleEast || ''}
          onChange={(e) => updateFormData({ yearsInMiddleEast: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Saudi Arabia? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInSaudiArabia || ''}
          onChange={(e) => updateFormData({ yearsInSaudiArabia: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Indonesia? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInIndonesia || ''}
          onChange={(e) => updateFormData({ yearsInIndonesia: e.target.value })}
        />

        <Select
          label="How Many Years Have You Worked in Philippines? (Only Domestic Helper Experience)"
          options={generateYearOptions("0")}
          value={formData.yearsInPhilippines || ''}
          onChange={(e) => updateFormData({ yearsInPhilippines: e.target.value })}
        />

        <RadioGroup
          label="Have You Worked in Other Country? (Only Domestic Helper Experience)"
          name="workedInOtherCountry"
          options={["Yes, I have worked in other country", "No other country"]}
          value={formData.workedInOtherCountry}
          onChange={handleOtherCountryChange}
        />

        {formData.workedInOtherCountry === "Yes, I have worked in other country" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <label className="font-bold text-gray-900 mb-2 block">How Many Years Worked in Other Country? (Only Domestic Helper Experience)</label>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input
                  label=""
                  boldLabel={false}
                  placeholder="Fill-in Country"
                  value={formData.workedInOtherCountryName || ''}
                  onChange={(e) => updateFormData({ workedInOtherCountryName: e.target.value })}
                  className="mb-0"
                />
              </div>
              <div className="w-1/2">
                <Select
                  label=""
                  boldLabel={false}
                  options={OTHER_COUNTRY_YEAR_OPTIONS}
                  value={formData.yearsInOtherCountry || ''}
                  onChange={(e) => updateFormData({ yearsInOtherCountry: e.target.value })}
                  className="mb-0"
                />
              </div>
            </div>
          </div>
        )}

        <RadioGroup
          label="Are You Willing to Take Care of Newborn Babies?"
          name="willingNewborn"
          options={YES_NO_WILLING}
          value={formData.willingNewborn}
          onChange={(val) => updateFormData({ willingNewborn: val })}
        />

        <RadioGroup
          label="Are You Willing to Take Care of Children?"
          name="willingChildren"
          options={YES_NO_WILLING}
          value={formData.willingChildren}
          onChange={(val) => updateFormData({ willingChildren: val })}
        />

        <RadioGroup
          label="Are You Willing to Take Care of Elderly?"
          name="willingElderly"
          options={YES_NO_WILLING}
          value={formData.willingElderly}
          onChange={(val) => updateFormData({ willingElderly: val })}
        />

        <RadioGroup
          label="Are You Willing to Take Care of Disabled Persons?"
          name="willingDisabled"
          options={YES_NO_WILLING}
          value={formData.willingDisabled}
          onChange={(val) => updateFormData({ willingDisabled: val })}
        />

        <RadioGroup
          label="Are You Willing to Take Care of Pets?"
          name="willingPets"
          options={YES_NO_WILLING}
          value={formData.willingPets}
          onChange={(val) => updateFormData({ willingPets: val })}
        />

        <RadioGroup
          label="Are You Willing to Cook?"
          name="willingCook"
          options={YES_NO_WILLING}
          value={formData.willingCook}
          onChange={(val) => updateFormData({ willingCook: val })}
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

export default SkillsInfoEn;