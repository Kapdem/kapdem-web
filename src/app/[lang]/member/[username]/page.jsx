import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import {
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import {
  FaGraduationCap,
  FaBuilding,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaComments,
} from "react-icons/fa";
import { getPostByUsername } from "@/lib/posts/data";

export default async function TeamMemberPage({ params }) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);
  const res = await getPostByUsername(awaitedParams.username);

  const posts = res;

  if (!posts || posts.length === 0) {
    notFound();
  }

  const author = posts[0]?.author;

  if (!author) {
    notFound();
  }

  return (
    <div className="py-16 pt-32 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Author Profile Header */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-[#b61e24]/20">
                <Image
                  src={author.profilePicture || "/images/onlylogo.png"}
                  alt={`${author.firstName} ${author.lastName}`}
                  className="w-full h-full object-cover bg-black/20"
                  width={192}
                  height={192}
                />
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1D3557] mb-2">
                {`${author.firstName} ${author.lastName}`}
              </h1>
              {author.title && (
                <p className="text-xl text-[#b61e24] font-semibold mb-2">
                  {author.title}
                </p>
              )}
              {author.profession && (
                <p className="text-lg text-gray-600 mb-2">
                  {author.profession}
                </p>
              )}
              {author.institution && (
                <p className="text-base text-gray-500 mb-4">
                  {author.institution}
                </p>
              )}
              {author.about && (
                <p className="text-gray-600 leading-relaxed mb- text-justify">
                  {author.about}
                </p>
              )}

              {/* Social Links */}
              {author.socialMediaLinks &&
                Object.keys(author.socialMediaLinks).length > 0 && (
                  <div className="flex justify-center md:justify-start space-x-4 mb-6">
                    {author.socialMediaLinks.linkedin && (
                      <Link
                        href={author.socialMediaLinks.linkedin}
                        className="w-10 h-10 bg-[#0077B5] text-white rounded-full flex items-center justify-center hover:bg-[#005885] transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={18} />
                      </Link>
                    )}
                    {author.socialMediaLinks.twitter && (
                      <Link
                        href={author.socialMediaLinks.twitter}
                        className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:bg-[#0d8bd9] transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter size={18} />
                      </Link>
                    )}
                    {author.socialMediaLinks.instagram && (
                      <Link
                        href={author.socialMediaLinks.instagram}
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram size={18} />
                      </Link>
                    )}
                    {author.socialMediaLinks.facebook && (
                      <Link
                        href={author.socialMediaLinks.facebook}
                        className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:bg-[#166fe5] transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook size={18} />
                      </Link>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Education Section */}
        {author.education && author.education.length > 0 && (
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-[#1D3557] mb-6 flex items-center gap-3">
              <FaGraduationCap className="text-[#b61e24]" />
              {dict?.memberProfile?.education || "Eğitim"}
            </h2>
            <div className="space-y-4">
              {author.education.map((edu, index) => (
                <div
                  key={edu._id || index}
                  className="border-l-4 border-[#b61e24] pl-4 py-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#1D3557]">
                      {edu.degree} - {edu.field}
                    </h3>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <FaCalendarAlt size={12} />
                      {edu.startYear} -{" "}
                      {edu.isCompleted
                        ? edu.endYear
                        : dict?.memberProfile?.ongoing || "Devam Ediyor"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaBuilding size={14} className="text-[#b61e24]" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        edu.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {edu.isCompleted
                        ? dict?.memberProfile?.completed || "Tamamlandı"
                        : dict?.memberProfile?.ongoing || "Devam Ediyor"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Author's Posts */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1D3557]">
              {dict?.memberProfile?.articles || "Yazılar"} ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-gray-500 text-center py-8 text-lg">
              {dict?.memberProfile?.noArticles ||
                "Yazar tarafından henüz bir makale yayınlanmamış."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/${awaitedParams.lang}/${post.slug}`}
                  className="group bg-[#F8FAFC] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-transparent hover:border-[#b61e24]/40"
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-b-none rounded-t-2xl"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-5">
                    <h3 className="text-lg font-bold text-[#1D3557] mb-2 group-hover:text-[#b61e24] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "tr-TR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {post.stats?.commentCount > 0 && (
                          <span className="flex items-center gap-1">
                            <FaComments size={10} />
                            {post.stats.commentCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
