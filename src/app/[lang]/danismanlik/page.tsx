import React from "react";
import {
  Users,
  Lightbulb,
  Target,
  Shield,
  Globe,
  FileText,
  Mail,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);
  const consulting = dict.consulting;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center mt-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002C54] via-blue-800 to-indigo-900" />
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400/20 blur-xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-indigo-400/20 blur-xl" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rotate-45 bg-white/10" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(90deg, white 1px, transparent 1px),
                linear-gradient(180deg, white 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative w-full px-6 max-w-6xl mx-auto z-10 text-center">
          <div className="mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-8 rounded-full" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              <Image
                src={"/images/kapdem-logo-2.png"}
                alt="KAPDEM Logo"
                width={1920}
                height={1080}
                className="mx-auto mb-4 w-[400px] h-auto"
              />
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent block">
                {consulting.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto">
              {consulting.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* About Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {consulting.aboutTitle}
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                <p>{consulting.aboutText1}</p>
                <p>{consulting.aboutText2}</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {consulting.features.analytical.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {consulting.features.analytical.description}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {consulting.features.independence.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {consulting.features.independence.description}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {consulting.features.innovation.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {consulting.features.innovation.description}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {consulting.features.expertise.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {consulting.features.expertise.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {consulting.servicesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {consulting.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: consulting.services.policyDesign.title,
                description: consulting.services.policyDesign.description,
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: consulting.services.politicalAnalysis.title,
                description: consulting.services.politicalAnalysis.description,
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: consulting.services.implementationSupport.title,
                description:
                  consulting.services.implementationSupport.description,
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: consulting.services.evaluation.title,
                description: consulting.services.evaluation.description,
                gradient: "from-pink-500 to-red-600",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: consulting.services.research.title,
                description: consulting.services.research.description,
                gradient: "from-red-500 to-orange-600",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: consulting.services.strategicPlanning.title,
                description: consulting.services.strategicPlanning.description,
                gradient: "from-orange-500 to-yellow-600",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {consulting.audienceTitle}
                </h2>
                <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                  {consulting.audienceSubtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: consulting.audience.political.title,
                    description: consulting.audience.political.description,
                    icon: <Users className="w-6 h-6" />,
                  },
                  {
                    title: consulting.audience.administrative.title,
                    description: consulting.audience.administrative.description,
                    icon: <Shield className="w-6 h-6" />,
                  },
                  {
                    title: consulting.audience.privateSector.title,
                    description: consulting.audience.privateSector.description,
                    icon: <Globe className="w-6 h-6" />,
                  },
                  {
                    title: consulting.audience.civilSociety.title,
                    description: consulting.audience.civilSociety.description,
                    icon: <Award className="w-6 h-6" />,
                  },
                ].map((audience, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                      {audience.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{audience.title}</h3>
                    <p className="text-blue-100 text-sm">
                      {audience.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Principles Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {consulting.principlesTitle}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: consulting.principles.impartiality.title,
                      description:
                        consulting.principles.impartiality.description,
                    },
                    {
                      title: consulting.principles.independence.title,
                      description:
                        consulting.principles.independence.description,
                    },
                    {
                      title: consulting.principles.voluntariness.title,
                      description:
                        consulting.principles.voluntariness.description,
                    },
                    {
                      title: consulting.principles.scientificApproach.title,
                      description:
                        consulting.principles.scientificApproach.description,
                    },
                  ].map((principle, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {consulting.ethicsTitle}
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                <p>{consulting.ethicsText1}</p>
                <p>{consulting.ethicsText2}</p>
                <p>{consulting.ethicsText3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
              <Mail className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {consulting.contactTitle}
            </h2>

            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {consulting.contactSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`mailto:${consulting.contactEmail}`}
                className="group bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {consulting.contactEmail}
              </a>

              <div className="text-blue-200 text-sm">
                {consulting.contactInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
