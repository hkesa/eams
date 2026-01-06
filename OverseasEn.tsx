import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const OverseasEn: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    navigate('/en/completion');
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-800">
          <h2 className="font-bold text-red-900 text-[20px] leading-tight">
            Below message for all Overseas helpers and applicants:
          </h2>
        </div>

        <div className="flex flex-col gap-6 text-gray-900 text-[18px]">
          <p>
            You pay Zero peso, 0 piso, no salary deduction, you no need to pay any Philippine fees, such as the training fee, medical fee
          </p>
          <p>
            You only need to be responsible for the accommodation and air tickets and transportation go to our Manila agency (in Makati City) for training, medical, other processes and getting your flight from Manila to Hong Kong
          </p>
          <p>
            You need to calculate how much money you need to prepare and you will need to go to Manila agency 2 times, I think usually around 9000 peso, but depending on how far you are from Manila. You pay 9000 peso is for your accommodation and transportation to go to Manila agency 2 times from your hometown
          </p>
          <p>
            If you don't have enough money to pay for transportation, food and accommodation, please start working and prepare the money now. You need to go to the Manila agency 2 times and stay in Manila for a few days each time
          </p>
          <p>
            1st time you go to the Manila agency is when you get hired by our Employer. You go Manila for reporting, do medical and others, stay 6-9 days, after that you can go home to wait Hong Kong visa or you can find a job work in Manila to wait Hong Kong visa
          </p>
          <p>
            After 6-8 weeks, 2nd time go to Manila agency. When all documents is finished, I will tell you, then you go to Manila stay 2-3 days for getting your flight from Manila to Hong Kong
          </p>
          <p>
            The Hong Kong visa application process to come to Hong Kong takes about 2-3 months, so you need to start working from now until you can fly to Hong Kong. Otherwise, you won't have the financial to support your family's living expenses for these few months and cover the costs of air tickets and accommodation for the flight to Manila for processing
          </p>
        </div>

        <div className="mt-4">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleNext}
          >
            Understand And Next Page
          </Button>
        </div>

      </div>
    </div>
  );
};

export default OverseasEn;