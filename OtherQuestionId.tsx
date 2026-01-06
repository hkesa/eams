import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { RadioGroup } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { submitToGoogleSheet } from '../services/googleSheetService';

const OtherQuestionId: React.FC = () => {
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
    
    if (nationality === "Filipina") {
      if (currentLocation === "Sekarang di Filipina" || currentLocation === "Sekarang di Negara Lain") {
        navigate('/en/overseas');
      } else {
        navigate('/id/completion');
      }
    } else {
      navigate('/id/completion');
    }
  };

  const handleBack = () => {
    if (formData.oe4HasMoreExperience === "Ya, masih punya majikan lain") {
      return navigate('/id/other-experience-5');
    }
    if (formData.oe3HasMoreExperience === "Ya, masih punya majikan lain") {
      return navigate('/id/other-experience-4');
    }
    if (formData.oe2HasMoreExperience === "Ya, masih punya majikan lain") {
      return navigate('/id/other-experience-3');
    }
    if (formData.leHasMoreExperience === "Ya, masih punya majikan lain") {
      return navigate('/id/other-experience-2');
    }
    return navigate('/id/latest-experience');
  };

  const handleStartWorkChange = (val: string) => {
    if (val === "Ya, saya bisa mulai kerja dulu") {
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

  const MONTH_OPTIONS_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const WEEKS_OPTIONS_ID = Array.from({length: 12}, (_, i) => `${i + 1} minggu`);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        
        <h2 className="font-bold text-center mb-6 border-b pb-4 text-2xl">Pertanyaan Lain</h2>

        <RadioGroup
          label="Apakah Anda Suka Memasak?"
          name="oqLikeCooking"
          options={["Ya, saya suka", "Tidak"]}
          value={formData.oqLikeCooking}
          onChange={(val) => updateFormData({ oqLikeCooking: val })}
        />

        <RadioGroup
          label="Bisakah Anda Belajar Masakan Baru Sendiri Dari YouTube?"
          name="oqLearnFromYoutube"
          options={["Ya, saya bisa", "Tidak"]}
          value={formData.oqLearnFromYoutube}
          onChange={(val) => updateFormData({ oqLearnFromYoutube: val })}
        />

        <RadioGroup
          label="Apakah Anda Percaya Diri Dengan Masakan Anda?"
          name="oqConfidentCooking"
          options={["Ya, saya percaya diri", "Tidak"]}
          value={formData.oqConfidentCooking}
          onChange={(val) => updateFormData({ oqConfidentCooking: val })}
        />

        <RadioGroup
          label="Bisakah Anda Menyanyikan Lagu ATAU Bercerita Untuk Menidurkan Anak?"
          name="oqSingOrStory"
          options={["Ya, saya bisa", "Tidak"]}
          value={formData.oqSingOrStory}
          onChange={(val) => updateFormData({ oqSingOrStory: val })}
        />

        <RadioGroup
          label="Apakah Anda Punya Pengalaman Mengajari Anak-Anak PR Mereka?"
          name="oqTutoring"
          options={["Ya, saya berpengalaman", "Tidak"]}
          value={formData.oqTutoring}
          onChange={(val) => updateFormData({ oqTutoring: val })}
        />

        <RadioGroup
          label="Saat Anda Mendapatkan Visa Baru, Bisakah Anda Mulai Bekerja Dulu?"
          name="oqStartWorkStatus"
          options={["Ya, saya bisa mulai kerja dulu", "Tidak, saya pulang dulu"]}
          value={formData.oqStartWorkStatus}
          onChange={handleStartWorkChange}
        />

        {formData.oqStartWorkStatus === "Ya, saya bisa mulai kerja dulu" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Select
              label="Kapan Kamu Akan Pulang Untuk Liburan?"
              options={MONTH_OPTIONS_ID}
              value={formData.oqVacationMonth || ''}
              onChange={(e) => updateFormData({ oqVacationMonth: e.target.value })}
            />
          </div>
        )}

        {formData.oqStartWorkStatus === "Tidak, saya pulang dulu" && (
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <Select
              label="Berapa Lama Anda Akan Tinggal di Rumah, Lalu Kembali ke HK Untuk Bekerja?"
              options={WEEKS_OPTIONS_ID}
              value={formData.oqStayHomeDuration || ''}
              onChange={(e) => updateFormData({ oqStayHomeDuration: e.target.value })}
            />
           </div>
        )}

        <RadioGroup
          label="Apakah Anda Takut Anjing?"
          name="oqAfraidDogs"
          options={["Ya, takut", "Tidak"]}
          value={formData.oqAfraidDogs}
          onChange={(val) => updateFormData({ oqAfraidDogs: val })}
        />

        <RadioGroup
          label="Apakah Anda Takut Kucing?"
          name="oqAfraidCats"
          options={["Ya, takut", "Tidak"]}
          value={formData.oqAfraidCats}
          onChange={(val) => updateFormData({ oqAfraidCats: val })}
        />

        <div>
            <RadioGroup
            label="Apakah Anda Memiliki Tato?"
            name="oqHasTattoos"
            options={["Ya, saya punya", "Tidak"]}
            value={formData.oqHasTattoos}
            onChange={(val) => updateFormData({ oqHasTattoos: val })}
            />
            {formData.oqHasTattoos === "Ya, saya punya" && (
                <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">Jika Anda memiliki tato, harap kirim foto tato nanti</span>
                </div>
            )}
        </div>

        <RadioGroup
          label="Apakah Anda Memiliki Kebiasaan Merokok ATAU Minum Alkohol?"
          name="oqSmokingDrinking"
          options={["Ya, saya punya", "Tidak"]}
          value={formData.oqSmokingDrinking}
          onChange={(val) => updateFormData({ oqSmokingDrinking: val })}
        />

        <RadioGroup
          label="Apakah Anda Memiliki Alergi, Penyakit, Iritasi Kulit, Penyakit Menular, Atau Kondisi Lainnya?"
          name="oqHealthAllergies"
          options={["Ya, saya punya", "Tidak"]}
          value={formData.oqHealthAllergies}
          onChange={(val) => updateFormData({ oqHealthAllergies: val })}
        />

        <RadioGroup
          label="Apakah Anda Memiliki Penyakit Kronis, Perlu Suntikan, Minum Obat, Perlu Janji Temu Lanjutan, Diabetes, Penyakit Jantung, Atau Penyakit Serius Lainnya?"
          name="oqHealthChronic"
          options={["Ya, saya punya", "Tidak"]}
          value={formData.oqHealthChronic}
          onChange={(val) => updateFormData({ oqHealthChronic: val })}
        />

        <div>
            <RadioGroup
            label="Apakah Anda Sudah Membaca, Memahami, Menyetujui, Mengakui, Dan Memberikan Wewenang Pada Pernyataan Pengumpulan Informasi Pribadi Perusahaan Kami, Dan Anda Tidak Keberatan?"
            name="oqAgreePICS"
            options={["Ya, saya sudah membaca dan setuju", "Tidak"]}
            value={formData.oqAgreePICS}
            onChange={(val) => updateFormData({ oqAgreePICS: val })}
            />
            {formData.oqAgreePICS === "Tidak" && (
                <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">Jika Anda memilih “Tidak” atau tidak setuju, agen kami mungkin tidak dapat mengunggah informasi Anda</span>
                </div>
            )}
        </div>

        <RadioGroup
          label="Apakah Jari Tangan Dan Jari Kaki Anda Normal, Tidak Lebih Dan Tidak Kurang?"
          name="oqFingersToes"
          options={["Ya, normal", "Tidak, saya punya lebih atau kurang"]}
          value={formData.oqFingersToes}
          onChange={(val) => updateFormData({ oqFingersToes: val })}
        />

        <div>
            <RadioGroup
            label="Saya Mengonfirmasi Bahwa Semua Informasi di Atas Benar, Lengkap, Dan Benar. Saya Akan Bertanggung Jawab Penuh Atas Segala Kesalahan Atau Kelalaian. Saya (PRT) Juga Setuju Agar Horizon Employment Agency Mengirimkan Dan Menggunakan Informasi Saya di Atas Kepada Semua Calon Pemberi Kerja?"
            name="oqConfirmInfo"
            options={["Ya, saya sudah membaca dan setuju", "Tidak"]}
            value={formData.oqConfirmInfo}
            onChange={(val) => updateFormData({ oqConfirmInfo: val })}
            />
            {formData.oqConfirmInfo === "Tidak" && (
                <div className="bg-red-100 p-2 mt-[-1rem] mb-6 rounded border border-red-200">
                    <span className="text-red-900 font-bold">Jika Anda memilih “Tidak” atau tidak setuju, agen kami mungkin tidak dapat mengunggah informasi Anda</span>
                </div>
            )}
        </div>

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
            onClick={handleSubmit} 
            className="w-1/2"
          >
            Kirim Pendaftaran
          </Button>
        </div>

      </div>
    </div>
  );
};

export default OtherQuestionId;