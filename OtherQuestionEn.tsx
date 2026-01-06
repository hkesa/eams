import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { RadioGroup } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { submitToGoogleSheet } from '../services/googleSheetService';
import { MONTH_OPTIONS, WEEKS_OPTIONS } from '../types';

const OtherQuestionEn: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    const success = await submitToGoogleSheet(formData);
    if (!success) {
      alert("Submission failed. Please try again.");
      return;
    }

    const { nationality, currentLocation } = formData;
    
    if (nationality === "Filipino") {
      if (currentLocation === "Now in Philippines" || currentLocation === "Now in other Country") {
        navigate('/en/overseas');
      } else {
        navigate('/en/completion');
      }
    } 
    else if (nationality === "Indonesian") {
      navigate('/id/completion');
    } 
    else {
      navigate('/en/completion');
    }
  };

  const handleBack = () => {
    if (formData.oe4HasMoreExperience === "Yes, still have other employer") {
      return navigate('/en/other-experience-5');
    }
    if (formData.oe3HasMoreExperience === "Yes, still have other employer") {
      return navigate('/en/other-experience-4');
    }
    if (formData.oe2HasMoreExperience === "Yes, still have other employer") {
      return navigate('/en/other-experience-3');
    }
    if (formData.leHasMoreExperience === "Yes, still have other employer") {
      return navigate('/en/other-experience-2');
    }
    return navigate('/en/latest-experience');
  };

  const handleStartWorkChange = (val: string) => {
    if (val === "Yes, I can start work first") {
      updateFormData({ 
        oqStartWorkStatus: val,
        oqStayHomeDuration: undefined
      });
    } else {
      updateFormData({ 
        oqStartWorkStatus: val, 
        oqVacationMonth: undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <h2 className="font-bold text-center mb-6 border-b pb-4 text-2xl">Other Question</h2>

        <RadioGroup
          label="Do You Like Cooking?"
          name="oqLikeCooking"
          options={["Yes, I like", "No"]}
          value={formData.oqLikeCooking}
          onChange={(val) => updateFormData({ oqLikeCooking: val })}
        />

        <RadioGroup
          label="Can You Learn New Dishes by Yourself From YouTube?"
          name="oqLearnFromYoutube"
          options={["Yes, I can", "No"]}
          value={formData.oqLearnFromYoutube}
          onChange={(val) => updateFormData({ oqLearnFromYoutube: val })}
        />

        <RadioGroup
          label="Are You Confident in Your Cooking?"
          name="oqConfidentCooking"
          options={["Yes, I am confident", "No"]}
          value={formData.oqConfidentCooking}
          onChange={(val) => updateFormData({ oqConfidentCooking: val })}
        />

        <RadioGroup
          label="Can You Sing a Song OR Tell a Story to Lull The Child to Sleep?"
          name="oqSingOrStory"
          options={["Yes, I can", "No"]}
          value={formData.oqSingOrStory}
          onChange={(val) => updateFormData({ oqSingOrStory: val })}
        />

        <RadioGroup
          label="Do You Have Experience Tutoring Children With Their Homework?"
          name="oqTutoring"
          options={["Yes, I have experience", "No"]}
          value={formData.oqTutoring}
          onChange={(val) => updateFormData({ oqTutoring: val })}
        />

        <RadioGroup
          label="When You Get Your New Visa, Can You Start Working First?"
          name="oqStartWorkStatus"
          options={["Yes, I can start work first", "No, I will go home first"]}
          value={formData.oqStartWorkStatus}
          onChange={handleStartWorkChange}
        />

        {formData.oqStartWorkStatus === "Yes, I can start work first" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Select
              label="When Will You Go Home For Vacation?"
              options={MONTH_OPTIONS}
              value={formData.oqVacationMonth || ''}
              onChange={(e) => updateFormData({ oqVacationMonth: e.target.value })}
            />
          </div>
        )}

        {formData.oqStartWorkStatus === "No, I will go home first" && (
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Select
              label="How Long Will You Stay Home, Then You Back to HK to Work?"
              options={WEEKS_OPTIONS}
              value={formData.oqStayHomeDuration || ''}
              onChange={(e) => updateFormData({ oqStayHomeDuration: e.target.value })}
            />
           </div>
        )}

        <RadioGroup
          label="Are You Afraid of Dogs?"
          name="oqAfraidDogs"
          options={["Yes, afraid", "No"]}
          value={formData.oqAfraidDogs}
          onChange={(val) => updateFormData({ oqAfraidDogs: val })}
        />

        <RadioGroup
          label="Are You Afraid of Cats?"
          name="oqAfraidCats"
          options={["Yes, afraid", "No"]}
          value={formData.oqAfraidCats}
          onChange={(val) => updateFormData({ oqAfraidCats: val })}
        />

        <div>
            <RadioGroup
            label="Do You Have Any Tattoos?"
            name="oqHasTattoos"
            options={["Yes, I have", "No"]}
            value={formData.oqHasTattoos}
            onChange={(val) => updateFormData({ oqHasTattoos: val })}
            />
            {formData.oqHasTattoos === "Yes, I have" && (
                <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">If you have tattoos, please send tattoo photos later</span>
                </div>
            )}
        </div>

        <RadioGroup
          label="Do You Have Smoking OR Drinking Habits?"
          name="oqSmokingDrinking"
          options={["Yes, I have", "No"]}
          value={formData.oqSmokingDrinking}
          onChange={(val) => updateFormData({ oqSmokingDrinking: val })}
        />

        <RadioGroup
          label="Do You Have Any Allergies, illnesses, Diseases, Skin Irritations, Infectious Diseases, or Other Conditions?"
          name="oqHealthAllergies"
          options={["Yes, I have", "No"]}
          value={formData.oqHealthAllergies}
          onChange={(val) => updateFormData({ oqHealthAllergies: val })}
        />

        <RadioGroup
          label="Do You Have Any Chronic illnesses, Require Injections, Take Medication, Need Follow-up Appointments, Diabetes, Heart Disease, or Other Serious illnesses?"
          name="oqHealthChronic"
          options={["Yes, I have", "No"]}
          value={formData.oqHealthChronic}
          onChange={(val) => updateFormData({ oqHealthChronic: val })}
        />

        <div>
            <RadioGroup
            label="Have You Read, Understood, Agreed to, Acknowledged, and Authorized Our Company’s Personal Information Collection Statement, and Do You Not Object to It?"
            name="oqAgreePICS"
            options={["Yes, I have read and agree", "No"]}
            value={formData.oqAgreePICS}
            onChange={(val) => updateFormData({ oqAgreePICS: val })}
            />
            {formData.oqAgreePICS === "No" && (
                 <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">If you choose “No” or don't agree, our agency may not upload your information</span>
                </div>
            )}
        </div>

        <RadioGroup
          label="Are Your Fingers And Toes Normal, No More And No Less?"
          name="oqFingersToes"
          options={["Yes, normal", "No, I have more or fewer"]}
          value={formData.oqFingersToes}
          onChange={(val) => updateFormData({ oqFingersToes: val })}
        />

        <div>
            <RadioGroup
            label="I Confirm That All of the Above Information is Correct, Complete, and True. I (FDH) Will Take Full Responsibility for Any Errors or Omissions. I Also Agree to Allow Horizon Employment Agency to Send and Use My Above Information for All Prospective Employers?"
            name="oqConfirmInfo"
            options={["Yes, I have read and agree", "No"]}
            value={formData.oqConfirmInfo}
            onChange={(val) => updateFormData({ oqConfirmInfo: val })}
            />
            {formData.oqConfirmInfo === "No" && (
                 <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">If you choose “No” or don't agree, our agency may not upload your information</span>
                </div>
            )}
        </div>

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
            onClick={handleSubmit} 
            className="w-1/2"
          >
            Submit Registration
          </Button>
        </div>

      </div>
    </div>
  );
};

export default OtherQuestionEn;