import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Send, Upload } from "lucide-react";

interface SendPaperFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  isSubmitting?: boolean;
  dict?: any;
}

const SendPaperForm: React.FC<SendPaperFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  dict,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form id="send-paper-form" className="space-y-6">
          {/* Kişisel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.firstName || "Ad"} *
              </label>
              <Field
                name="firstName"
                type="text"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder={
                  dict?.sendPaperForm?.placeholders?.firstName ||
                  "Adınızı girin"
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.lastName || "Soyad"} *
              </label>
              <Field
                name="lastName"
                type="text"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder={
                  dict?.sendPaperForm?.placeholders?.lastName ||
                  "Soyadınızı girin"
                }
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.email || "E-posta"} *
              </label>
              <Field
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder={
                  dict?.sendPaperForm?.placeholders?.email || "email@ornek.com"
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.phone || "Telefon"}
              </label>
              <Field
                name="phone"
                type="tel"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder={
                  dict?.sendPaperForm?.placeholders?.phone ||
                  "+90 5XX XXX XX XX"
                }
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
          </div>

          {/* Kurum/Kuruluş */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {dict?.sendPaperForm?.labels?.institution || "Kurum/Kuruluş"}
            </label>
            <Field
              name="institution"
              type="text"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              placeholder={
                dict?.sendPaperForm?.placeholders?.institution ||
                "Çalıştığınız kurum veya kuruluş"
              }
            />
            <ErrorMessage
              name="institution"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {/* Yazı Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.title || "Yazı Başlığı"} *
              </label>
              <Field
                name="title"
                type="text"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder={
                  dict?.sendPaperForm?.placeholders?.title ||
                  "Yazınızın başlığı"
                }
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {dict?.sendPaperForm?.labels?.category || "Kategori"}
              </label>
              <Field
                as="select"
                name="category"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                <option value="">
                  {dict?.sendPaperForm?.categories?.select || "Kategori seçin"}
                </option>
                <option value="politik">
                  {dict?.sendPaperForm?.categories?.politik || "Politik"}
                </option>
                <option value="ekonomi">
                  {dict?.sendPaperForm?.categories?.ekonomi || "Ekonomi"}
                </option>
                <option value="sosyal">
                  {dict?.sendPaperForm?.categories?.sosyal || "Sosyal"}
                </option>
                <option value="guvenlik">
                  {dict?.sendPaperForm?.categories?.guvenlik || "Güvenlik"}
                </option>
                <option value="egitim">
                  {dict?.sendPaperForm?.categories?.egitim || "Eğitim"}
                </option>
                <option value="kultur">
                  {dict?.sendPaperForm?.categories?.kultur || "Kültür"}
                </option>
                <option value="goc">
                  {dict?.sendPaperForm?.categories?.goc || "Göç"}
                </option>
                <option value="savunma">
                  {dict?.sendPaperForm?.categories?.savunma ||
                    "Savunma ve Güvenlik"}
                </option>
                <option value="gorus">
                  {dict?.sendPaperForm?.categories?.gorus || "Görüş Yazıları"}
                </option>
                <option value="roportaj">
                  {dict?.sendPaperForm?.categories?.roportaj || "Röportajlar"}
                </option>
                <option value="kitap">
                  {dict?.sendPaperForm?.categories?.kitap ||
                    "Kitap İncelemeleri"}
                </option>
                <option value="diger">
                  {dict?.sendPaperForm?.categories?.diger || "Diğer"}
                </option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
          </div>

          {/* Yazı Özeti */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {dict?.sendPaperForm?.labels?.summary || "Yazı Özeti"} *
            </label>
            <Field
              as="textarea"
              name="summary"
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder={
                dict?.sendPaperForm?.placeholders?.summary ||
                "Yazınızın kısa özeti (200-300 kelime)"
              }
            />
            <ErrorMessage
              name="summary"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {/* Yazı İçeriği */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {dict?.sendPaperForm?.labels?.content || "Yazı İçeriği"} *
            </label>
            <Field
              as="textarea"
              name="content"
              rows={8}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder={
                dict?.sendPaperForm?.placeholders?.content ||
                "Yazınızın tam metni"
              }
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {/* Fotoğraf Yükleme */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {dict?.sendPaperForm?.labels?.photo || "Fotoğraf (İsteğe bağlı)"}
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  setFieldValue("photo", file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center w-full px-4 py-8 bg-slate-700/50 border-2 border-dashed border-slate-600/50 rounded-xl hover:border-blue-500/50 transition-all duration-300">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">
                    {values.photo
                      ? values.photo.name
                      : dict?.sendPaperForm?.placeholders?.photo ||
                        "Fotoğraf yüklemek için tıklayın"}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {dict?.sendPaperForm?.placeholders?.photoInfo ||
                      "JPG, PNG, GIF (Max: 5MB)"}
                  </p>
                </div>
              </div>
            </div>
            <ErrorMessage
              name="photo"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {/* Biyografi */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {dict?.sendPaperForm?.labels?.biography || "Kısa Biyografi"}
            </label>
            <Field
              as="textarea"
              name="biografi"
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder={
                dict?.sendPaperForm?.placeholders?.biography ||
                "Kendiniz hakkında kısa bilgi"
              }
            />
            <ErrorMessage
              name="biografi"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {/* Gönder Butonu */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>
                    {dict?.sendPaperForm?.buttons?.submitting ||
                      "Gönderiliyor..."}
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>
                    {dict?.sendPaperForm?.buttons?.submit || "Yazımı Gönder"}
                  </span>
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SendPaperForm;
