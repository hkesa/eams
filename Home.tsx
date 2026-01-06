import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { Button } from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useFormContext();

  const handleStart = () => {
    if (language === 'id') {
       navigate('/id/basic-info');
    } else {
       navigate('/en/basic-info');
    }
  };

  // Custom styles for the active state to be Pink/Rose instead of default Blue
  const activeLangClass = "bg-pink-600 border-pink-600 text-white hover:bg-pink-700 hover:border-pink-700 shadow-md";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col gap-8">
        <h1 className="text-center font-bold text-gray-900 text-xl">
          {language === 'id' 
            ? "Pendaftaran Online Horizon Employment Agency"
            : "Online Registration of Horizon Employment Agency"
          }
        </h1>

        <div className="flex flex-col gap-4">
          <p className="text-center font-medium">
            Choose Your Language／<br/>
            Pilih Bahasa Anda
          </p>
          
          <div className="flex flex-col gap-4">
            <Button 
              variant={language === 'en' ? 'primary' : 'outline'}
              onClick={() => setLanguage('en')}
              className={`flex items-center justify-center gap-2 ${language === 'en' ? activeLangClass : ''}`}
            >
              <span className="text-2xl">🇵🇭</span> English
            </Button>
            
            <Button 
              variant={language === 'id' ? 'primary' : 'outline'}
              onClick={() => setLanguage('id')}
              className={`flex items-center justify-center gap-2 ${language === 'id' ? activeLangClass : ''}`}
            >
              <span className="text-2xl">🇮🇩</span> Indonesian
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleStart}
            className="h-auto whitespace-normal leading-normal py-4"
          >
            {language === 'id' 
              ? "Saya ingin mencari majikan baru. Saya sedang mendaftar sekarang" 
              : "I want to find a new employer. I am registering my information now"
            }
          </Button>
          <span className="text-gray-500 text-sm">V1.2A</span>
        </div>
      </div>
    </div>
  );
};

export default Home;