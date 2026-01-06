import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { RadioGroup } from '../components/RadioGroup';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

// Indonesian specific constants
const SIBLING_OPTIONS_ID = [
  "0 (hanya saya)", "1 saudara (saya +1)", "2 saudara (saya +2)", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

const POSITION_OPTIONS_ID = [
  "Nomor 1", "Nomor 2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

const SON_OPTIONS_ID = [
  "Tidak ada", "1 putra", "2 anak laki-laki", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

const DAUGHTER_OPTIONS_ID = [
  "Tidak ada", "1 anak perempuan", "2 anak perempuan", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"
];

const BasicInfoId: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    navigate('/id/skills-info');
  };

  const handleBack = () => {
    navigate('/');
  };

  const getCount = (val?: string) => {
    if (!val || val.includes("Tidak ada")) return 0;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const sonCount = getCount(formData.sonCount);
  const daughterCount = getCount(formData.daughterCount);
  
  // Custom logic for sibling count to handle "0 (hanya saya)" check correctly
  const isZeroSiblings = formData.siblingCount === "0 (hanya saya)";

  // Helper for array based inputs
  const getAgeArray = (val?: string) => {
    if (!val) return [];
    return val.split(',').map(s => s.trim());
  };

  const updateAge = (type: 'son' | 'daughter', index: number, value: string) => {
    const currentStr = type === 'son' ? formData.sonAges : formData.daughterAges;
    const count = type === 'son' ? sonCount : daughterCount;
    const arr = getAgeArray(currentStr);
    
    while (arr.length < count) arr.push('');
    while (arr.length > count) arr.pop();
    
    arr[index] = value;
    
    if (type === 'son') {
      updateFormData({ sonAges: arr.join(', ') });
    } else {
      updateFormData({ daughterAges: arr.join(', ') });
    }
  };

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
    // Correct age calculation
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      return (age - 1) < 24;
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

  // Special Skills Logic
  const handleSpecialSkillsChange = (vals: string[]) => {
    const noneOption = "Tidak ada";
    const otherOption = "Pengalaman lainnya";
    const oldVals = formData.specialSkills || [];
    
    if (vals.includes(noneOption) && !oldVals.includes(noneOption)) {
      updateFormData({ specialSkills: [noneOption], specialSkillsOther: undefined });
      return;
    }

    if (oldVals.includes(noneOption) && vals.length > 1) {
      updateFormData({ specialSkills: vals.filter(v => v !== noneOption) });
      return;
    }
    
    if (!vals.includes(otherOption) && oldVals.includes(otherOption)) {
        updateFormData({ specialSkills: vals, specialSkillsOther: undefined });
    } else {
        updateFormData({ specialSkills: vals });
    }
  };

  const handleLocationChange = (val: string) => {
    if (val !== "Sekarang di Hong Kong") {
      updateFormData({ 
        currentLocation: val,
        hkContractStatus: undefined,
        finishContractDate: undefined,
      });
    } else {
      updateFormData({ 
        currentLocation: val,
        workedInHkBefore: undefined 
      });
    }
  };

  const handleNationalityChange = (val: string) => {
    if (val !== "Lainnya Kewarganegaraan") {
        updateFormData({ nationality: val, nationalityOther: undefined });
    } else {
        updateFormData({ nationality: val });
    }
  };

  const handleReligionChange = (val: string) => {
    if (val !== "Lainnya agama") {
        updateFormData({ religion: val, religionOther: undefined });
    } else {
        updateFormData({ religion: val });
    }
  };

  const handleSiblingCountChange = (val: string) => {
    updateFormData({ siblingCount: val });
    if (val === "0 (hanya saya)") {
      updateFormData({ siblingPosition: undefined });
    }
  };

  const handleReferrerChange = (val: string) => {
    if (val === "Tidak ada perujuk") {
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <h2 className="font-bold text-center mb-6 border-b pb-4">Informasi Dasar</h2>

        <RadioGroup
          label="Ingin Melamar Apa?"
          name="applicationType"
          options={["Melamar sebagai PRT", "Melamar sebagai sopir Hong Kong (Harus memiliki SIM Hong Kong)"]}
          value={formData.applicationType}
          onChange={(val) => updateFormData({ applicationType: val })}
        />

        <CheckboxGroup
          label="Keahlian Khusus Anda?"
          options={[
            "Saya memiliki SIM luar negeri",
            "Pengalaman perawat",
            "Pengalaman guru",
            "Pengalaman panti jompo",
            "Saya telah mengikuti kursus perawatan anak",
            "Saya telah mengikuti kursus perawatan lansia",
            "Pengalaman hotel",
            "Pengalaman memasak di restoran",
            "Pengalaman berkebun",
            "Pengalaman pertukangan",
            "Tidak ada",
            "Pengalaman lainnya"
          ]}
          selectedValues={formData.specialSkills}
          onChange={handleSpecialSkillsChange}
        />
        {formData.specialSkills?.includes("Pengalaman lainnya") && (
          <Input 
            placeholder="Isilah keterampilan lainnya"
            value={formData.specialSkillsOther || ''}
            onChange={(e) => updateFormData({ specialSkillsOther: e.target.value })}
            className="mt-[-1rem]" 
            boldLabel={false}
          />
        )}

        <RadioGroup
          label="Jenis Kelamin?"
          name="gender"
          options={["Wanita", "Pria"]}
          value={formData.gender}
          onChange={(val) => updateFormData({ gender: val })}
        />

        <Input
          label="Nama Lengkap?"
          value={formData.fullName || ''}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
        />

        <RadioGroup
          label="Dimana Anda Sekarang?"
          name="currentLocation"
          options={["Sekarang di Hong Kong", "Sekarang di Filipina", "Sekarang di Indonesia", "Sekarang di Negara Lain"]}
          value={formData.currentLocation}
          onChange={handleLocationChange}
        />

        <RadioGroup
          label="Kewarganegaraan?"
          name="nationality"
          options={["Filipina", "Indonesia", "Lainnya Kewarganegaraan"]}
          value={formData.nationality}
          onChange={handleNationalityChange}
        />
        {formData.nationality === "Lainnya Kewarganegaraan" && (
          <Input 
            placeholder="Mengisi kebangsaan"
            value={formData.nationalityOther || ''}
            onChange={(e) => updateFormData({ nationalityOther: e.target.value })}
            className="mt-[-1rem]"
            boldLabel={false}
          />
        )}

        {formData.currentLocation === "Sekarang di Hong Kong" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <RadioGroup
              label="Status Kontrak HK?"
              name="hkContractStatus"
              options={[
                "Selesaikan kontrak",
                "Majikan sudah memutus kontrak",
                "Saya sudah melanggar kontrak",
                "Saya akan memutus kontrak jika mendapat majikan baru",
                "Majikan saat ini meninggal",
                "Majikan pindah negara",
                "Majikan ada masalah keuangan"
              ]}
              value={formData.hkContractStatus}
              onChange={(val) => updateFormData({ hkContractStatus: val })}
            />

            <Input
              type="date"
              label="Tanggal Selesai Kontrak ATAU Hari Kerja Terakhir?"
              value={formData.finishContractDate || ''}
              onChange={(e) => updateFormData({ finishContractDate: e.target.value })}
            />
          </div>
        )}

        {formData.currentLocation !== "Sekarang di Hong Kong" && (
          <RadioGroup
            label="Pernah Bekerja di Hong Kong Sebelumnya?"
            name="workedInHkBefore"
            options={["Ya, pernah bekerja di HK", "Tidak, ini pertama kali"]}
            value={formData.workedInHkBefore}
            onChange={(val) => updateFormData({ workedInHkBefore: val })}
          />
        )}

        <div>
          <Input
            type="date"
            label="Tanggal Habis Masa Berlaku Paspor?"
            value={formData.passportExpiryDate || ''}
            onChange={(e) => updateFormData({ passportExpiryDate: e.target.value })}
          />
          {isPassportExpiring(formData.passportExpiryDate) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded border border-red-200">
              <span className="text-red-900 font-bold">Paspor Anda akan segera kedaluwarsa. Harap segera perpanjang</span>
            </div>
          )}
        </div>

        <div>
          <Input
            type="date"
            label="Tanggal Lahir Anda?"
            value={formData.dateOfBirth || ''}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
          />
          {isUnder24(formData.dateOfBirth) && (
             <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded border border-red-200">
              <span className="text-red-900 font-bold">Silakan periksa apakah tanggal lahir Anda salah. Jika benar, abaikan pesan ini</span>
            </div>
          )}
        </div>

        <RadioGroup
          label="Agama Anda?"
          name="religion"
          options={["Tidak beragama", "Katolik", "Kristen", "Muslim", "Budha", "Lainnya agama"]}
          value={formData.religion}
          onChange={handleReligionChange}
        />
        {formData.religion === "Lainnya agama" && (
          <Input 
            placeholder="Mengisi agama"
            value={formData.religionOther || ''}
            onChange={(e) => updateFormData({ religionOther: e.target.value })}
            className="mt-[-1rem]"
            boldLabel={false}
          />
        )}

        <RadioGroup
          label="Status Pernikahan?"
          name="maritalStatus"
          options={[
            "Belum menikah, lajang", 
            "Pasangan belum menikah", 
            "Tinggal bersama pasangan", 
            "Menikah", 
            "Cerai hidup", 
            "Pisah", 
            "Orang tua tunggal", 
            "Janda"
          ]}
          value={formData.maritalStatus}
          onChange={(val) => updateFormData({ maritalStatus: val })}
        />

        <RadioGroup
          label="Pendidikan?"
          name="education"
          options={["SD", "SMP/SMA", "Diploma", "Sekolah kejuruan", "Universitas"]}
          value={formData.education}
          onChange={(val) => updateFormData({ education: val })}
        />

        <div>
          <Input
            type="number"
            inputMode="numeric"
            pattern="\d*"
            label="Tinggi Badan (cm)?"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: e.target.value })}
          />
          {isHeightWarning(formData.height) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded border border-red-200">
              <span className="text-red-900 font-bold">Catatan: Tulis dalam CM. Silakan periksa apakah tinggi badan Anda salah. Jika benar, abaikan pesan ini</span>
            </div>
          )}
        </div>

        <div>
          <Input
            type="number"
            inputMode="numeric"
            pattern="\d*"
            label="Berat Badan (kg)?"
            value={formData.weight || ''}
            onChange={(e) => updateFormData({ weight: e.target.value })}
          />
          {isWeightWarning(formData.weight) && (
            <div className="bg-red-100 p-2 mt-[-1rem] mb-4 rounded border border-red-200">
              <span className="text-red-900 font-bold">Catatan: Tulis dalam KG. Silakan periksa apakah berat badan Anda salah. Jika benar, abaikan pesan ini</span>
            </div>
          )}
        </div>

        <Input
          label="Pekerjaan Pasangan? (Jika Tidak Punya Pasangan, Isi N/A)"
          value={formData.spouseOccupation || ''}
          onChange={(e) => updateFormData({ spouseOccupation: e.target.value })}
        />

        <Select
          label="Jumlah Saudara?"
          options={SIBLING_OPTIONS_ID}
          value={formData.siblingCount || ''}
          onChange={(e) => handleSiblingCountChange(e.target.value)}
        />

        {!isZeroSiblings && (
          <Select
            label="Urutan Saya Di Antara Saudara?"
            options={POSITION_OPTIONS_ID}
            value={formData.siblingPosition || ''}
            onChange={(e) => updateFormData({ siblingPosition: e.target.value })}
          />
        )}

        <Select
          label="Berapa Jumlah Putra Anak Laki-Laki?"
          options={SON_OPTIONS_ID}
          value={formData.sonCount || ''}
          onChange={(e) => updateFormData({ sonCount: e.target.value })}
        />
        {sonCount > 0 && (
          <div className="flex flex-col gap-1 mb-4">
             <label className="text-gray-900 font-bold">Usia Putra Anak Laki-Laki?</label>
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
          label="Berapa Jumlah Anak Perempuan?"
          options={DAUGHTER_OPTIONS_ID}
          value={formData.daughterCount || ''}
          onChange={(e) => updateFormData({ daughterCount: e.target.value })}
        />
        {daughterCount > 0 && (
          <div className="flex flex-col gap-1 mb-4">
             <label className="text-gray-900 font-bold">Usia Anak Perempuan?</label>
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
          <label className="font-bold text-gray-900 mb-2 block">Nomor WhatsApp Anda? Sertakan Kode Negara</label>
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
          <label className="font-bold text-gray-900 mb-2 block">Nomor HP Negara Asal Anda? Sertakan Kode Negara</label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 62"
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
          label="Siapa Nama Perujuk?"
          name="hasReferrer"
          options={["Ya, saya punya perujuk", "Tidak ada perujuk"]}
          value={formData.hasReferrer}
          onChange={handleReferrerChange}
        />

        {formData.hasReferrer === "Ya, saya punya perujuk" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Input
              label="Siapa Nama Perujuk?"
              value={formData.referrerName || ''}
              onChange={(e) => updateFormData({ referrerName: e.target.value })}
            />
            
            <div className="w-full">
              <label className="font-bold text-gray-900 mb-2 block">Nomor WhatsApp Perujuk? Sertakan Kode Negara</label>
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
          label="Alamat Kota Asal Anda? (Tulis Provinsi, Negara Bagian, Kota Saja)"
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

export default BasicInfoId;