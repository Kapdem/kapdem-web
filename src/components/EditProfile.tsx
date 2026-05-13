"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/lib/data";
import {
  FaUser,
  FaGraduationCap,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaPlus,
  FaTrash,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditProfile({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    institution: "",
    title: "",
    profession: "",
    about: "",
    profilePicture: null,
    education: [],
    socialMediaLinks: {
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
    },
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();

      if (profileData) {
        setProfile(profileData);
        setFormData({
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          username: profileData.username || "",
          institution: profileData.institution || "",
          title: profileData.title || "",
          profession: profileData.profession || "",
          about: profileData.about || "",
          profilePicture: null,
          education: profileData.education || [],
          socialMediaLinks: {
            linkedin: profileData.socialMediaLinks?.linkedin || "",
            twitter: profileData.socialMediaLinks?.twitter || "",
            instagram: profileData.socialMediaLinks?.instagram || "",
            facebook: profileData.socialMediaLinks?.facebook || "",
          },
        });

        // Set existing profile picture preview if available
        if (profileData.profilePicture) {
          setProfilePicturePreview(profileData.profilePicture);
        }
      } else {
        // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("Profil yüklenirken hata:", error);
      // Hata durumunda da login sayfasına yönlendir
      router.push("/login");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: {
        ...prev.socialMediaLinks,
        [platform]: value,
      },
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startYear: new Date().getFullYear(),
          endYear: new Date().getFullYear(),
          isCompleted: false,
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Remove _id fields from education objects to avoid validation errors
      const cleanedEducation = formData.education.map((edu) => {
        const { _id, ...cleanEdu } = edu;
        return cleanEdu;
      });

      // Create FormData to handle both profile data and profile picture
      const formDataToSend = new FormData();

      // Add profile picture if exists
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      // Add other profile data as form fields
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("institution", formData.institution);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("about", formData.about);
      formDataToSend.append(
        "socialMediaLinks",
        JSON.stringify(formData.socialMediaLinks)
      );

      // Add education as JSON string
      formDataToSend.append("education", JSON.stringify(cleanedEducation));

      const result = await updateProfile(formDataToSend);

      if (result) {
        toast.success(
          dict?.toast?.profile?.updateSuccess || "Profil başarıyla güncellendi!"
        );
        setProfile(result);

        // Başarılı güncelleme sonrası /profile sayfasına yönlendir
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        toast.error(
          dict?.toast?.profile?.updateError ||
            "Profil güncellenirken hata oluştu!"
        );
      }
    } catch (error) {
      console.error("Profil güncellenirken hata:", error);
      toast.error(
        dict?.toast?.profile?.updateError ||
          "Profil güncellenirken hata oluştu!"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full">
                <FaUser className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-white">
                  {dict?.editProfile?.pageTitle || "Profil Yönetimi"}
                </h1>
                <p className="text-blue-100">
                  {dict?.editProfile?.pageSubtitle ||
                    "Kişisel bilgilerinizi güncelleyin"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Profil Fotoğrafı */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaCamera className="w-5 h-5 mr-2" />
                {dict?.editProfile?.profilePicture || "Profil Fotoğrafı"}
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Current/Preview Image */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profilePicturePreview ? (
                      <img
                        src={profilePicturePreview}
                        alt="Profil Fotoğrafı Önizleme"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center w-full px-6 py-8 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300">
                      <div className="text-center">
                        <FaCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">
                          {formData.profilePicture
                            ? formData.profilePicture.name
                            : dict?.editProfile?.uploadHint ||
                              "Profil fotoğrafınızı değiştirmek için tıklayın"}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          JPG, PNG, GIF (Max: 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kişisel Bilgiler */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaUser className="w-5 h-5 mr-2" />
                {dict?.editProfile?.personalInfoTitle || "Kişisel Bilgiler"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.firstName || "Ad"}
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.firstNamePlaceholder || "Adınızı girin"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.lastName || "Soyad"}
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.lastNamePlaceholder ||
                      "Soyadınızı girin"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.username || "Kullanıcı Adı"}
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.usernamePlaceholder ||
                      "Kullanıcı adınızı girin"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.institution || "Kurum"}
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) =>
                      handleInputChange("institution", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.institutionPlaceholder ||
                      "Çalıştığınız kurumu girin"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.titleLabel || "Unvan"}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.titlePlaceholder || "Unvanınızı girin"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict?.editProfile?.profession || "Meslek"}
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) =>
                      handleInputChange("profession", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.professionPlaceholder ||
                      "Mesleğinizi girin"
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict?.editProfile?.about || "Hakkımda"}
                </label>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    dict?.editProfile?.aboutPlaceholder ||
                    "Kendiniz hakkında kısa bir açıklama yazın..."
                  }
                />
              </div>
            </div>

            {/* Eğitim Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaGraduationCap className="w-5 h-5 mr-2" />
                  {dict?.editProfile?.educationTitle || "Eğitim Bilgileri"}
                </h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center hover:bg-blue-700"
                >
                  <FaPlus className="w-3 h-3 mr-1" />
                  {dict?.editProfile?.addEducation || "Ekle"}
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 mb-4 border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">
                      {dict?.editProfile?.educationNumber || "Eğitim"}{" "}
                      {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict?.editProfile?.educationInstitution || "Kurum"}
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={
                          dict?.editProfile?.educationInstitutionPlaceholder ||
                          "Üniversite/Okul adı"
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict?.editProfile?.educationDegree || "Derece"}
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={
                          dict?.editProfile?.educationDegreePlaceholder ||
                          "Lisans, Yüksek Lisans, Doktora"
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict?.editProfile?.educationField || "Alan"}
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) =>
                          handleEducationChange(index, "field", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={
                          dict?.editProfile?.educationFieldPlaceholder ||
                          "Eğitim alanı"
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict?.editProfile?.educationStartYear || "Başlangıç"}
                        </label>
                        <input
                          type="number"
                          value={edu.startYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "startYear",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict?.editProfile?.educationEndYear || "Bitiş"}
                        </label>
                        <input
                          type="number"
                          value={edu.endYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endYear",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={edu.isCompleted}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "isCompleted",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      {dict?.editProfile?.educationCompleted || "Tamamlandı"}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Sosyal Medya */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {dict?.editProfile?.socialMediaTitle ||
                  "Sosyal Medya Bağlantıları"}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaLinkedin className="w-5 h-5 text-blue-700" />
                  <input
                    type="url"
                    value={formData.socialMediaLinks.linkedin}
                    onChange={(e) =>
                      handleSocialMediaChange("linkedin", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.linkedinPlaceholder ||
                      "LinkedIn profil URL'i"
                    }
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <FaTwitter className="w-5 h-5 text-blue-400" />
                  <input
                    type="url"
                    value={formData.socialMediaLinks.twitter}
                    onChange={(e) =>
                      handleSocialMediaChange("twitter", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.twitterPlaceholder ||
                      "Twitter profil URL'i"
                    }
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <FaInstagram className="w-5 h-5 text-pink-500" />
                  <input
                    type="url"
                    value={formData.socialMediaLinks.instagram}
                    onChange={(e) =>
                      handleSocialMediaChange("instagram", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.instagramPlaceholder ||
                      "Instagram profil URL'i"
                    }
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                  <input
                    type="url"
                    value={formData.socialMediaLinks.facebook}
                    onChange={(e) =>
                      handleSocialMediaChange("facebook", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      dict?.editProfile?.facebookPlaceholder ||
                      "Facebook profil URL'i"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {dict?.editProfile?.saving || "Kaydediliyor..."}
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4 mr-2" />
                    {dict?.editProfile?.saveButton || "Profili Güncelle"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
