import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { RadioGroup } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const SkillsInfoId: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    navigate('/id/latest-experience'); 
  };

  const handleBack = () => {
    navigate('/id/basic-info');
  };

  const LANGUAGE_OPTIONS_ID = ["Sedang belajar", "Rata-rata", "Bagus"];
  const YES_NO_WILLING_ID = ["Ya, bersedia", "Tidak"];

  // Helper to generate year options for Indonesian
  const generateYearOptionsId = (zeroLabel: string = "0") => {
    const options = [zeroLabel, "1 tahun", "2 tahun"];
    for (let i = 3; i <= 20; i++) {
      options.push(i.toString());
    }
    return options;
  };

  const OTHER_COUNTRY_YEAR_OPTIONS_ID = [
    "0", "1 tahun", "2 tahun", "3", "4", "5", "6", "7", "8", "9", 
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
  ];

  const handleOtherCountryChange = (val: string) => {
    if (val === "Tidak ada negara lain") {
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
        
        <h2 className="font-bold text-center mb-6 border-b pb-4">Informasi Keterampilan</h2>

        <RadioGroup
          label="Bahasa Kantonis Anda?"
          name="cantoneseLevel"
          options={LANGUAGE_OPTIONS_ID}
          value={formData.cantoneseLevel}
          onChange={(val) => updateFormData({ cantoneseLevel: val })}
        />

        <RadioGroup
          label="Bahasa Inggris Anda?"
          name="englishLevel"
          options={LANGUAGE_OPTIONS_ID}
          value={formData.englishLevel}
          onChange={(val) => updateFormData({ englishLevel: val })}
        />

        <RadioGroup
          label="Bahasa Mandarin Anda?"
          name="mandarinLevel"
          options={LANGUAGE_OPTIONS_ID}
          value={formData.mandarinLevel}
          onChange={(val) => updateFormData({ mandarinLevel: val })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Hong Kong? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0 (Belum pernah ke Hong Kong)")}
          value={formData.yearsInHK || ''}
          onChange={(e) => updateFormData({ yearsInHK: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Singapura? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0 (Belum pernah ke Singapura)")}
          value={formData.yearsInSingapore || ''}
          onChange={(e) => updateFormData({ yearsInSingapore: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Taiwan? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInTaiwan || ''}
          onChange={(e) => updateFormData({ yearsInTaiwan: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Malaysia? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInMalaysia || ''}
          onChange={(e) => updateFormData({ yearsInMalaysia: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Timur Tengah? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInMiddleEast || ''}
          onChange={(e) => updateFormData({ yearsInMiddleEast: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Arab Saudi? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInSaudiArabia || ''}
          onChange={(e) => updateFormData({ yearsInSaudiArabia: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Indonesia? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInIndonesia || ''}
          onChange={(e) => updateFormData({ yearsInIndonesia: e.target.value })}
        />

        <Select
          label="Berapa Tahun Anda Bekerja di Filipina? (Hanya Pengalaman PRT)"
          options={generateYearOptionsId("0")}
          value={formData.yearsInPhilippines || ''}
          onChange={(e) => updateFormData({ yearsInPhilippines: e.target.value })}
        />

        <RadioGroup
          label="Apakah Anda Pernah Bekerja di Negara Lain? (Hanya Pengalaman PRT)"
          name="workedInOtherCountry"
          options={["Ya, saya pernah bekerja di negara lain", "Tidak ada negara lain"]}
          value={formData.workedInOtherCountry}
          onChange={handleOtherCountryChange}
        />

        {formData.workedInOtherCountry === "Ya, saya pernah bekerja di negara lain" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <label className="font-bold text-gray-900 mb-2 block">Berapa Tahun Anda Bekerja di negara-negara lain? (Hanya Pengalaman PRT)</label>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input
                  label=""
                  boldLabel={false}
                  placeholder="Isi negara lain"
                  value={formData.workedInOtherCountryName || ''}
                  onChange={(e) => updateFormData({ workedInOtherCountryName: e.target.value })}
                  className="mb-0"
                />
              </div>
              <div className="w-1/2">
                <Select
                  label=""
                  boldLabel={false}
                  options={OTHER_COUNTRY_YEAR_OPTIONS_ID}
                  value={formData.yearsInOtherCountry || ''}
                  onChange={(e) => updateFormData({ yearsInOtherCountry: e.target.value })}
                  className="mb-0"
                />
              </div>
            </div>
          </div>
        )}

        <RadioGroup
          label="Apakah Anda Bersedia Merawat Bayi Baru Lahir?"
          name="willingNewborn"
          options={YES_NO_WILLING_ID}
          value={formData.willingNewborn}
          onChange={(val) => updateFormData({ willingNewborn: val })}
        />

        <RadioGroup
          label="Apakah Anda Bersedia Merawat Anak-Anak?"
          name="willingChildren"
          options={YES_NO_WILLING_ID}
          value={formData.willingChildren}
          onChange={(val) => updateFormData({ willingChildren: val })}
        />

        <RadioGroup
          label="Apakah Anda Bersedia Merawat Lansia?"
          name="willingElderly"
          options={YES_NO_WILLING_ID}
          value={formData.willingElderly}
          onChange={(val) => updateFormData({ willingElderly: val })}
        />

        <RadioGroup
          label="Apakah Anda Bersedia Merawat Orang Cacat?"
          name="willingDisabled"
          options={YES_NO_WILLING_ID}
          value={formData.willingDisabled}
          onChange={(val) => updateFormData({ willingDisabled: val })}
        />

        <RadioGroup
          label="Apakah Anda Bersedia Merawat Hewan Peliharaan?"
          name="willingPets"
          options={YES_NO_WILLING_ID}
          value={formData.willingPets}
          onChange={(val) => updateFormData({ willingPets: val })}
        />

        <RadioGroup
          label="Apakah Anda Bersedia Memasak?"
          name="willingCook"
          options={YES_NO_WILLING_ID}
          value={formData.willingCook}
          onChange={(val) => updateFormData({ willingCook: val })}
        />

        <div className="flex gap-4 mt-8">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            className="w-1/2"
          >
            Halaman Sebelumnya
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNext} 
            className="w-1/2"
          >
            Simpan Dan Halaman Berikutnya
          </Button>
        </div>

      </div>
    </div>
  );
};

export default SkillsInfoId;