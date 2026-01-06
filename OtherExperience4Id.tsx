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
} from '../types';

const OtherExperience4Id: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (formData.oe4HasMoreExperience === "Ya, masih punya majikan lain") {
      navigate('/id/other-experience-5');
    } else {
      navigate('/id/other-question');
    }
  };

  const handleBack = () => {
    navigate('/id/other-experience-3');
  };

  // Indonesian Options
  const MONTH_OPTIONS_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const MEMBER_COUNT_OPTIONS_ID = [
    "1 (Hanya majikan)", "2 (Majikan +1)", "3 (Majikan +2)", "4 (Majikan +3)", "5 (Majikan +4)", 
    "6 (Majikan +5)", "7 (Majikan +6)", "8 (Majikan +7)", "9 (Majikan +8)", "10 (Majikan +9)", 
    "11 (Majikan +10)", "12 (Majikan +11)", "13 (Majikan +12)"
  ];

  const MEMBER_ROLE_OPTIONS_ID = [
    "Dewasa", "Anak laki-laki", "Anak perempuan", "Anak kembar", "Anak kembar Tiga", "Kakek", "Nenek"
  ];

  const CHILD_AGE_OPTIONS_ID = [
    "Majikan perempuan sedang hamil", "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", 
    "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
  ];

  const ELDERLY_AGE_OPTIONS_ID = Array.from({length: 61}, (_, i) => (60 + i).toString());

  const HELPER_COUNT_OPTIONS_ID = [
    "1 (Hanya aku)", "2 (Saya +1)", "3 (Saya +2)", "4 (Saya +3)", "5 (Saya +4)", 
    "6 (Saya +5)", "7 (Saya +6)", "8 (Saya +7)", "9 (Saya +8)", "10 (Saya +9)", 
    "11 (Saya +10)", "12 (Saya +11)", "13 (Saya +12)"
  ];

  const getMemberCount = (val?: string) => {
    if (!val) return 0;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const memberCount = getMemberCount(formData.oe4MemberCount);

  const updateMember = (index: number, field: string, value: string) => {
    const currentMembers = formData.oe4Members || [];
    const newMembers = [...currentMembers];
    while (newMembers.length <= index) {
      newMembers.push({ role: '' });
    }
    newMembers[index] = { ...newMembers[index], [field]: value };
    updateFormData({ oe4Members: newMembers });
  };

  const isAdult = (role?: string) => role === "Dewasa";
  const isElderly = (role?: string) => role === "Kakek" || role === "Nenek";

  const updatePetQty = (pet: string, qty: string) => {
    const currentQtys = formData.oe4PetQuantities || {};
    updateFormData({ 
      oe4PetQuantities: { ...currentQtys, [pet]: qty } 
    });
  };

  const handleDisabledCareChange = (option: string) => {
    let current = formData.oe4DisabledCare || [];
    if (option === "Tidak") {
      updateFormData({ oe4DisabledCare: ["Tidak"] });
    } else {
      if (current.includes("Tidak")) current = [];
      if (current.includes(option)) {
        updateFormData({ oe4DisabledCare: current.filter(c => c !== option) });
      } else {
        updateFormData({ oe4DisabledCare: [...current, option] });
      }
    }
  };

  const handlePetsChange = (option: string) => {
    let current = formData.oe4Pets || [];
    if (option === "Tidak") {
      updateFormData({ oe4Pets: ["Tidak"] });
    } else {
      if (current.includes("Tidak")) current = [];
      if (current.includes(option)) {
        updateFormData({ oe4Pets: current.filter(c => c !== option) });
      } else {
        updateFormData({ oe4Pets: [...current, option] });
      }
    }
  };

  const handleResponsibilitiesChange = (option: string) => {
    let current = formData.oe4Responsibilities || [];
    if (option === "Tidak satupun dari berikut ini") {
        updateFormData({ oe4Responsibilities: ["Tidak satupun dari berikut ini"] });
    } else {
        if (current.includes("Tidak satupun dari berikut ini")) current = [];
        if (current.includes(option)) {
            updateFormData({ oe4Responsibilities: current.filter(c => c !== option) });
        } else {
            updateFormData({ oe4Responsibilities: [...current, option] });
        }
    }
  };

  const disabledOptions = [
    "Tidak", "Perawatan pasien terbaring", "Perawatan disabilitas", "Perawatan trakeostomi",
    "Kursi roda", "Berjalan perlahan", "Pemberian obat", "Bantuan mandi",
    "Stroke", "Alzheimer", "Parkinson",
    "Penyandang disabilitas lainnya (1)", "Penyandang disabilitas lainnya (2)", "Penyandang disabilitas lainnya (3)"
  ];

  const petOptions = [
    "Tidak", "Anjing kecil", "Anjing sedang", "Anjing besar", "Kucing", "Kelinci",
    "Peliharaan lain (1)", "Peliharaan lain (2)", "Peliharaan lain (3)"
  ];

  const respOptions = [
    "Tidak satupun dari berikut ini",
    "Cuci mobil", "Bersih-bersih rumah", "Cuci baju tangan",
    "Pergi ke pasar beli makanan", "Saya pergi ke pasar basah Cina untuk membeli makanan",
    "Berbagi kamar dengan orang lain", "Masak makanan Cina", "Masak makanan Barat",
    "Tanggung jawab lainnya (1)", "Tanggung jawab lainnya (2)", "Tanggung jawab lainnya (3)"
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <div className="bg-red-100 p-4 rounded-lg mb-6 border-l-4 border-red-800">
          <h2 className="font-bold text-red-900 text-[20px] leading-tight">
            PRT Pengalaman Lainnya (4) (Termasuk Hong Kong, Negara Lain, Filipina, Indonesia, hanya PRT)
          </h2>
        </div>

        <Input
          label="Negara Tempat Bekerja? (Jika Hong Kong, Tulis Lokasi, Misalnya Causeway Bay)"
          value={formData.oe4Country || ''}
          onChange={(e) => updateFormData({ oe4Country: e.target.value })}
        />

        <RadioGroup
          label="Kewarganegaraan Majikan?"
          name="oe4EmployerNationality"
          options={["Orang Lokal", "Orang Asing", "Orang Cina", "Orang Hong Kong", "Orang Asia"]}
          value={formData.oe4EmployerNationality}
          onChange={(val) => updateFormData({ oe4EmployerNationality: val })}
        />

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">Di Majikan Ini, Tahun Dan Bulan Mulai Kerja?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Tahun"
                options={YEAR_RANGE_OPTIONS}
                value={formData.oe4StartYear || ''}
                onChange={(e) => updateFormData({ oe4StartYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Bulan"
                options={MONTH_OPTIONS_ID}
                value={formData.oe4StartMonth || ''}
                onChange={(e) => updateFormData({ oe4StartMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-gray-900">Di Majikan Ini, Tahun Dan Bulan Selesai Kerja?</label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Tahun"
                options={YEAR_RANGE_OPTIONS}
                value={formData.oe4EndYear || ''}
                onChange={(e) => updateFormData({ oe4EndYear: e.target.value })}
                className="mb-0"
              />
            </div>
            <div className="w-1/2">
              <Select
                label=""
                boldLabel={false}
                placeholder="Bulan"
                options={MONTH_OPTIONS_ID}
                value={formData.oe4EndMonth || ''}
                onChange={(e) => updateFormData({ oe4EndMonth: e.target.value })}
                className="mb-0"
              />
            </div>
          </div>
        </div>

        <Input
          label="Ukuran Rumah Majikan? (Contoh 1000 Kaki Persegi)"
          value={formData.oe4HouseSize || ''}
          onChange={(e) => updateFormData({ oe4HouseSize: e.target.value })}
        />

        <Select
          label="Jumlah Anggota Keluarga Majikan? (Tinggal di Rumah Yang Sama)"
          options={MEMBER_COUNT_OPTIONS_ID}
          value={formData.oe4MemberCount || ''}
          onChange={(e) => updateFormData({ oe4MemberCount: e.target.value })}
        />

        {memberCount > 0 && (
          <div className="mb-6 flex flex-col gap-6">
            <label className="font-bold text-gray-900 block border-b pb-2">
              Umur Anggota Keluarga Majikan?
            </label>
            
            {Array.from({ length: memberCount }).map((_, idx) => {
              const member = formData.oe4Members?.[idx] || { role: '' };
              const showAges = !isAdult(member.role);
              const isElderlyRole = isElderly(member.role);

              return (
                <div key={idx} className="border border-red-200 rounded-lg overflow-hidden">
                  <div className="bg-red-50 p-3 border-b border-red-100">
                    <span className="text-red-900 font-bold">Anggota {idx + 1}</span>
                  </div>
                  <div className="p-4 bg-white">
                    <Select
                      label="Anggota"
                      boldLabel={true}
                      options={MEMBER_ROLE_OPTIONS_ID}
                      value={member.role}
                      onChange={(e) => updateMember(idx, 'role', e.target.value)}
                      className="mb-4"
                    />

                    {showAges && (
                      <div className="flex flex-col gap-4">
                        <Select
                          label="Usia Mulai Bekerja (Dari)"
                          options={isElderlyRole ? ELDERLY_AGE_OPTIONS_ID : CHILD_AGE_OPTIONS_ID}
                          value={member.ageStart || ''}
                          onChange={(e) => updateMember(idx, 'ageStart', e.target.value)}
                        />
                        <Select
                          label="Usia Berhenti Bekerja (Sampai)"
                          options={isElderlyRole ? ELDERLY_AGE_OPTIONS_ID : CHILD_AGE_OPTIONS_ID}
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
          label="PRT Jumlah Orang?"
          options={HELPER_COUNT_OPTIONS_ID}
          value={formData.oe4HelperCount || ''}
          onChange={(e) => updateFormData({ oe4HelperCount: e.target.value })}
        />

        <RadioGroup
          label="Status Kontrak?"
          name="oe4ContractStatus"
          options={[
            "Selesaikan kontrak", 
            "Majikan sudah memutus kontrak", 
            "Saya mengundurkan diri", 
            "Tidak ada kontrak, bisa keluar kapan saja"
          ]}
          value={formData.oe4ContractStatus}
          onChange={(val) => updateFormData({ oe4ContractStatus: val })}
        />

        <TextArea
          label="Alasan Keluar? (Alasan Jelas Dan Benar)"
          value={formData.oe4ReasonLeaving || ''}
          onChange={(e) => updateFormData({ oe4ReasonLeaving: e.target.value })}
        />

        <div className="flex flex-col gap-3 w-full mb-6">
          <label className="text-gray-900 font-bold">
            Di Majikan Ini, Apakah Anda Mengurus Orang Disabilitas?
          </label>
          <div className="flex flex-col gap-3">
            {disabledOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe4DisabledCare?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe4DisabledCare?.includes(option) || false}
                    onChange={() => handleDisabledCareChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>
                
                {formData.oe4DisabledCare?.includes(option) && option === "Penyandang disabilitas lainnya (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan disabilitas lainnya (1)"
                        value={formData.oe4DisabledOther1 || ''}
                        onChange={(e) => updateFormData({ oe4DisabledOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe4DisabledCare?.includes(option) && option === "Penyandang disabilitas lainnya (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan disabilitas lainnya (2)"
                        value={formData.oe4DisabledOther2 || ''}
                        onChange={(e) => updateFormData({ oe4DisabledOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe4DisabledCare?.includes(option) && option === "Penyandang disabilitas lainnya (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan disabilitas lainnya (3)"
                        value={formData.oe4DisabledOther3 || ''}
                        onChange={(e) => updateFormData({ oe4DisabledOther3: e.target.value })}
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
            Hewan Peliharaan Majikan?
          </label>
          <div className="flex flex-col gap-3">
            {petOptions.map((option) => (
              <div key={option}>
                 <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe4Pets?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe4Pets?.includes(option) || false}
                    onChange={() => handlePetsChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {formData.oe4Pets?.includes(option) && ["Anjing kecil", "Anjing sedang", "Anjing besar", "Kucing", "Kelinci"].includes(option) && (
                  <div className="mt-2 ml-4">
                     <Input 
                        type="number"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="Tuliskan jumlahnya"
                        value={formData.oe4PetQuantities?.[option] || ''}
                        onChange={(e) => updatePetQty(option, e.target.value)}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}

                {formData.oe4Pets?.includes(option) && option.toLowerCase().includes("peliharaan lain") && (
                   <div className="mt-2 ml-4 flex gap-2">
                    <input 
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Tulis hewan peliharaan"
                      value={option === "Peliharaan lain (1)" ? (formData.oe4PetOtherName1 || '') : option === "Peliharaan lain (2)" ? (formData.oe4PetOtherName2 || '') : (formData.oe4PetOtherName3 || '')}
                      onChange={(e) => {
                         if (option === "Peliharaan lain (1)") updateFormData({ oe4PetOtherName1: e.target.value });
                         else if (option === "Peliharaan lain (2)") updateFormData({ oe4PetOtherName2: e.target.value });
                         else updateFormData({ oe4PetOtherName3: e.target.value });
                      }}
                    />
                    <input 
                      type="number"
                      inputMode="numeric"
                      pattern="\d*"
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg text-[21px]"
                      placeholder="Tuliskan jumlahnya"
                      value={option === "Peliharaan lain (1)" ? (formData.oe4PetOtherQty1 || '') : option === "Peliharaan lain (2)" ? (formData.oe4PetOtherQty2 || '') : (formData.oe4PetOtherQty3 || '')}
                      onChange={(e) => {
                         if (option === "Peliharaan lain (1)") updateFormData({ oe4PetOtherQty1: e.target.value });
                         else if (option === "Peliharaan lain (2)") updateFormData({ oe4PetOtherQty2: e.target.value });
                         else updateFormData({ oe4PetOtherQty3: e.target.value });
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
            Di Majikan Ini, Apa Tugas Pekerjaan Anda?
          </label>
          <div className="flex flex-col gap-3">
            {respOptions.map((option) => (
              <div key={option}>
                <label 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.oe4Responsibilities?.includes(option)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.oe4Responsibilities?.includes(option) || false}
                    onChange={() => handleResponsibilitiesChange(option)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-[18px] text-gray-800">{option}</span>
                </label>

                {formData.oe4Responsibilities?.includes(option) && option === "Tanggung jawab lainnya (1)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan tanggung jawab lainnya (1)"
                        value={formData.oe4RespOther1 || ''}
                        onChange={(e) => updateFormData({ oe4RespOther1: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe4Responsibilities?.includes(option) && option === "Tanggung jawab lainnya (2)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan tanggung jawab lainnya (2)"
                        value={formData.oe4RespOther2 || ''}
                        onChange={(e) => updateFormData({ oe4RespOther2: e.target.value })}
                        className="mb-0"
                        boldLabel={false}
                     />
                  </div>
                )}
                {formData.oe4Responsibilities?.includes(option) && option === "Tanggung jawab lainnya (3)" && (
                  <div className="mt-2 ml-4">
                     <Input 
                        placeholder="Tuliskan tanggung jawab lainnya (3)"
                        value={formData.oe4RespOther3 || ''}
                        onChange={(e) => updateFormData({ oe4RespOther3: e.target.value })}
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
          label="Apakah Anda Masih Punya Pengalaman Kerja Sebagai PRT Di Hong Kong, Negara Lain, Filipina, Atau Indonesia? (Hanya Pengalaman PRT)"
          name="oe4HasMoreExperience"
          options={[
            "Ya, masih punya majikan lain",
            "Tidak, hanya 4 pengalaman majikan"
          ]}
          value={formData.oe4HasMoreExperience}
          onChange={(val) => updateFormData({ oe4HasMoreExperience: val })}
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

export default OtherExperience4Id;