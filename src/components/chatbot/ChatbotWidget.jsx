"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  ChevronRight,
  Loader2,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

// Markdown-like rendering for bot messages
const formatMessage = (text) => {
  if (!text) return text;

  // Simple markdown parsing
  return text.split("\n").map((line, i) => (
    <p key={i} className="mb-1 last:mb-0">
      {line}
    </p>
  ));
};

export default function ChatbotWidget({ dict, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem("chatbot_session_id");
    const savedMessages = localStorage.getItem("chatbot_messages");

    if (savedSessionId) {
      setSessionId(savedSessionId);
    }

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Save sessionId to localStorage
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("chatbot_session_id", sessionId);
    }
  }, [sessionId]);

  // Show welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        type: "bot",
        content:
          dict?.chatbot?.welcome ||
          "Merhaba! KAPDEM'e hoş geldiniz. 👋\n\nSize nasıl yardımcı olabilirim?",
        timestamp: new Date(),
        suggestions:
          lang === "tr"
            ? [
                "📚 Bugün ne okumak istersiniz?",
                "👥 Kurucu ekibimizi görün",
                "📂 Kategorileri göster",
                "🎬 Video içerikler",
                "📅 Etkinlikler",
              ]
            : [
                "📚 What would you like to read today?",
                "👥 Meet our team",
                "📂 Show categories",
                "🎬 Video content",
                "📅 Events",
              ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, dict, lang]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Count unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastUserMessageIndex = messages.findLastIndex(
        (m) => m.type === "user",
      );
      if (
        lastUserMessageIndex !== -1 &&
        lastUserMessageIndex < messages.length - 1
      ) {
        setUnreadCount(messages.length - lastUserMessageIndex - 1);
      }
    } else {
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = async (messageText = null, retryCount = 0) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    // User message
    const userMessage = {
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 100);

    try {
      const requestUrl = "/api/chatbot/message";

      const response = await axios.post(
        requestUrl,
        {
          message: message,
          lang: lang,
          sessionId: sessionId,
        },
        {
          timeout: 30000, // 30 second timeout
        },
      );

      const data = response.data;

      // Save session ID
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Bot response with slight delay for better UX
      setTimeout(() => {
        const botMessage = {
          type: "bot",
          content: data.message,
          suggestions: data.suggestions,
          action: data.action,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);

        // Handle different action types
        if (data.action?.type === "navigate") {
          setTimeout(() => {
            const path = data.action.data.path;
            // Ensure path starts with / if it doesn't already
            const fullPath = path.startsWith("/")
              ? `/${lang}${path}`
              : `/${lang}/${path}`;
            router.push(fullPath);
          }, 1500);
        } else if (data.action?.type === "search") {
          // Handle search results - suggestions already contain the results
          // User can click on suggestions to navigate to articles
        }
      }, 500);
    } catch (error) {
      console.error("Chatbot error:", error);

      let errorContent =
        dict?.chatbot?.error || "Bir hata oluştu. Lütfen tekrar deneyin.";
      let canRetry = false;

      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          errorContent =
            "Chatbot servisi bulunamadı. Lütfen daha sonra tekrar deneyin.";
        } else if (status === 429) {
          errorContent =
            "Çok fazla istek gönderdiniz. Lütfen birkaç saniye bekleyin.";
        } else if (status === 504 || status === 503) {
          errorContent = "Sunucu yanıt vermiyor. Lütfen tekrar deneyin.";
          canRetry = retryCount < 2; // Allow 2 retries for timeout/503 errors
        } else if (status >= 500) {
          errorContent =
            "Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.";
          canRetry = retryCount < 1; // Allow 1 retry for 5xx errors
        } else if (error.response.data?.message) {
          errorContent = error.response.data.message;
        }
      } else if (error.request) {
        errorContent =
          "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.";
        canRetry = retryCount < 2; // Allow 2 retries for network errors
      } else if (
        error.code === "ECONNABORTED" ||
        error.message?.includes("timeout")
      ) {
        errorContent = "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
        canRetry = retryCount < 2; // Allow 2 retries for timeout
      }

      const errorMessage = {
        type: "bot",
        content: errorContent,
        timestamp: new Date(),
        canRetry: canRetry,
        retryMessage: message,
        retryCount: retryCount,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion, postData = null) => {
    // If this suggestion is linked to a post, navigate to it
    if (postData?.slug) {
      router.push(`/${lang}/${postData.slug}`);
      return;
    }

    // Remove emoji and extra formatting for cleaner message
    const cleanSuggestion = suggestion
      .replace(/^[^\w\s]+/, "") // Remove leading emoji
      .trim();

    handleSendMessage(cleanSuggestion);
  };

  const handleRetry = (retryMessage, retryCount) => {
    handleSendMessage(retryMessage, retryCount + 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const clearChat = () => {
    if (
      confirm(
        dict?.chatbot?.clearConfirm ||
          "Konuşma geçmişini silmek istediğinize emin misiniz?",
      )
    ) {
      setMessages([]);
      setSessionId(null);
      localStorage.removeItem("chatbot_messages");
      localStorage.removeItem("chatbot_session_id");

      // Show welcome message
      const welcomeMessage = {
        type: "bot",
        content:
          dict?.chatbot?.welcome ||
          "Merhaba! KAPDEM'e hoş geldiniz. 👋\n\nSize nasıl yardımcı olabilirim?",
        timestamp: new Date(),
        suggestions:
          lang === "tr"
            ? [
                "📚 Bugün ne okumak istersiniz?",
                "👥 Kurucu ekibimizi görün",
                "📂 Kategorileri göster",
                "🎬 Video içerikler",
                "📅 Etkinlikler",
              ]
            : [
                "📚 What would you like to read today?",
                "👥 Meet our team",
                "📂 Show categories",
                "🎬 Video content",
                "📅 Events",
              ],
      };
      setMessages([welcomeMessage]);
    }
  };

  const restartChat = () => {
    handleSendMessage(lang === "tr" ? "Ana menü" : "Main menu");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        aria-label="Open chatbot"
      >
        <Image
          src="/images/onlylogo.png"
          alt="Chatbot"
          width={32}
          height={32}
          priority
        />
        {/* Unread notification dot */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] md:w-[420px] bg-white rounded-2xl shadow-2xl flex flex-col"
          style={{
            height: isMinimized ? "60px" : "auto",
            maxHeight: isMinimized ? "60px" : "min(600px, 80vh)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between flex-shrink-0 ${
              isMinimized
                ? "cursor-pointer hover:from-blue-700 hover:to-blue-800"
                : ""
            }`}
            onClick={isMinimized ? () => setIsMinimized(false) : undefined}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/onlylogo.png"
                  alt="Chatbot"
                  width={32}
                  height={32}
                  priority
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {dict?.chatbot?.title || "KAPDEM AI"}
                </h3>
                {!isMinimized && (
                  <p className="text-xs text-blue-100 truncate">
                    {isTyping
                      ? lang === "tr"
                        ? "Yazıyor..."
                        : "Typing..."
                      : lang === "tr"
                        ? "Çevrimiçi"
                        : "Online"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {!isMinimized && (
                <>
                  <button
                    onClick={restartChat}
                    className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                    aria-label="Restart"
                    title={
                      lang === "tr" ? "Ana menüye dön" : "Back to main menu"
                    }
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearChat}
                    className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                    aria-label="Clear chat"
                    title={lang === "tr" ? "Konuşmayı temizle" : "Clear chat"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeChatbot();
                }}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                aria-label="Minimize"
                title={lang === "tr" ? "Küçült" : "Minimize"}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeChatbot();
                }}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                aria-label="Close"
                title={lang === "tr" ? "Kapat" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100"
                style={{ maxHeight: "min(450px, 60vh)" }}
              >
                {messages.map((message, index) => (
                  <div key={index}>
                    <div
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
                            : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.type === "bot"
                            ? formatMessage(message.content)
                            : message.content}
                        </div>
                        {message.canRetry && (
                          <button
                            onClick={() =>
                              handleRetry(
                                message.retryMessage,
                                message.retryCount,
                              )
                            }
                            className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline font-medium"
                          >
                            {lang === "tr" ? "🔄 Tekrar Dene" : "🔄 Retry"}
                          </button>
                        )}
                        <p
                          className={`text-xs mt-2 ${
                            message.type === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString(
                            "tr-TR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => {
                          const hasEmoji =
                            /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
                              suggestion,
                            );

                          // Find matching post data if available
                          const postData = message.action?.data?.results?.[idx];

                          return (
                            <button
                              key={idx}
                              onClick={() =>
                                handleSuggestionClick(suggestion, postData)
                              }
                              className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all flex items-center gap-2 font-medium"
                            >
                              <span className={hasEmoji ? "text-sm" : ""}>
                                {suggestion}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-200">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      dict?.chatbot?.placeholder || "Mesajınızı yazın..."
                    }
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                    disabled={isTyping}
                    autoComplete="off"
                    maxLength={500}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    aria-label="Send message"
                  >
                    {isTyping ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {lang === "tr"
                    ? "Yapay zeka destekli asistan"
                    : "AI-powered assistant"}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
