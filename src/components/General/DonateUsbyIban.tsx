import React from "react";

type Props = {
  dict?: any;
};

export default function DonateUsbyIban({ dict }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {dict?.donateByIban?.title || "BİZİ DESTEKLE"}
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <p className="text-gray-700 mb-8 leading-relaxed">
          <span className="font-semibold">
            {dict?.donateByIban?.organizationName ||
              "Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi"}
          </span>
          {dict?.donateByIban?.description ||
            "'ne bağış yapmak isteyen gönüllülerimiz aşağıda bilgileri yer alan kurumsal banka hesabımıza, açıklamaya"}{" "}
          <span className="font-semibold">
            "{dict?.donateByIban?.donationNote || "BAĞIŞ"}"
          </span>{" "}
          {dict?.donateByIban?.noteInstruction ||
            "yazarak merkezimize destekte bulunabilirler."}
        </p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
            <div className="font-semibold text-gray-900 sm:w-1/3 mb-2 sm:mb-0">
              {dict?.donateByIban?.bankName || "BANKA ADI:"}
            </div>
            <div className="text-gray-700 sm:w-2/3">
              {dict?.donateByIban?.bankNameValue || "T.C. ZİRAAT BANKASI A.Ş."}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
            <div className="font-semibold text-gray-900 sm:w-1/3 mb-2 sm:mb-0">
              {dict?.donateByIban?.branchCode || "ŞUBE KODU:"}
            </div>
            <div className="text-gray-700 sm:w-2/3">1537</div>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
            <div className="font-semibold text-gray-900 sm:w-1/3 mb-2 sm:mb-0">
              {dict?.donateByIban?.accountNo || "HESAP NO:"}
            </div>
            <div className="text-gray-700 sm:w-2/3">98032243</div>
          </div>

          <div className="flex flex-col sm:flex-row py-4">
            <div className="font-semibold text-gray-900 sm:w-1/3 mb-2 sm:mb-0">
              {dict?.donateByIban?.iban || "IBAN:"}
            </div>
            <div className="text-gray-700 sm:w-2/3 font-mono">
              TR10 0001 0015 3798 0322 4350 01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
