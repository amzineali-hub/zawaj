import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, ShieldCheck, HeartHandshake, Eye, CheckCheck, UserX, Ban, UserCheck, AlertCircle 
} from 'lucide-react';
import { UserProfile, ChatMessage, Conversation } from '../types';
import { MATRIMONIAL_QUESTIONS } from '../data/mockProfiles';
import { PrestigeAvatar } from './PrestigeAvatar';
import { Translations, Language, MATRIMONIAL_QUESTIONS_ARABIC, CITIES_ARABIC } from '../i18n/translations';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeConversation: Conversation | null;
  targetProfile: UserProfile | null;
  currentUser: UserProfile | null;
  conversations: Conversation[];
  onSelectConversation: (conv: Conversation) => void;
  blockedUserIds?: string[];
  onToggleBlockUser?: (userId: string, userName?: string) => void;
  t: Translations;
  lang: Language;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  activeConversation,
  targetProfile,
  currentUser,
  conversations,
  onSelectConversation,
  blockedUserIds = [],
  onToggleBlockUser,
  t,
  lang
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const [showConfirmBlock, setShowConfirmBlock] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const participantId = targetProfile?.id || activeConversation?.participantId || '';
  const participantName = targetProfile?.fullName || activeConversation?.participantName || (lang === 'ar' ? 'عضو ميثاق الموثق' : 'Correspondant Mithaq');
  const rawCity = targetProfile?.city || activeConversation?.participantCity || 'Maroc';
  const participantCity = lang === 'ar' ? (CITIES_ARABIC[rawCity] || rawCity) : rawCity;
  const participantProfession = targetProfile?.profession || activeConversation?.participantProfession || (lang === 'ar' ? 'عضو موثق' : 'Membre Certifié');
  const participantPhoto = targetProfile?.photoUrl || activeConversation?.participantAvatar || '';
  const participantGender = targetProfile?.gender || 'femme';

  const isParticipantBlocked = participantId ? blockedUserIds.includes(participantId) : false;

  const questionsList = lang === 'ar' ? MATRIMONIAL_QUESTIONS_ARABIC : MATRIMONIAL_QUESTIONS;

  // Initialize or load conversation messages
  useEffect(() => {
    if (!isOpen) return;

    const initialGreeting = lang === 'ar'
      ? `السلام عليكم ورحمة الله. اطلعت باعتزاز على ملفكم التعريفي ورؤيتكم النبيلة لبناء الأسرة على منصة ميثاق. يشرفني ويسعدني أن نفتتح هذا الحوار الطيب في كنف الوقار والاحترام المتبادل.`
      : `Salam aleykoum. J'ai eu l'honneur de lire votre présentation et votre vision du mariage sur Mithaq. C'est avec grand plaisir et respect que j'ouvre cet échange bienveillant.`;

    const initialMsgs: ChatMessage[] = [
      {
        id: 'msg-1',
        senderId: 'partner',
        senderName: participantName,
        receiverId: 'me',
        content: initialGreeting,
        timestamp: '14:20',
        isRead: true
      }
    ];

    if (activeConversation?.lastMessage) {
      initialMsgs.push({
        id: 'msg-2',
        senderId: 'partner',
        senderName: participantName,
        receiverId: 'me',
        content: activeConversation.lastMessage,
        timestamp: activeConversation.lastMessageTime || '14:25',
        isRead: true
      });
    }

    setMessages(initialMsgs);
  }, [isOpen, activeConversation, targetProfile, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: currentUser?.fullName || (lang === 'ar' ? 'أنتم' : 'Vous'),
      receiverId: 'partner',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setShowQuestionPicker(false);

    // Simulate gracious, dignified matrimonial response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const courteousRepliesFr = [
        `Je vous remercie sincèrement pour vos mots et votre démarche pleine de dignité. C'est exactement cet esprit d'écoute et de franchise que je recherche pour bâtir un foyer solide.`,
        `Votre point de vue sur les valeurs familiales et la sakina me touche particulièrement. Dans notre tradition comme dans la vie moderne, le respect mutuel et le dialogue sont l'essence même du mariage.`,
        `Je suis tout à fait réceptive à cette question. Prendre le temps de s'assurer de la compatibilité de nos projets de vie et de nos principes est la plus belle preuve de sérieux.`,
        `Si vous le souhaitez, après avoir approfondi nos présentations réciproques, nous pourrons envisager un échange téléphonique ou impliquer nos familles respectives en toute transparence.`
      ];

      const courteousRepliesAr = [
        `أشكركم من أعماق القلب على كلماتكم الكريمة ومقاربتكم المفعمة بالوقار. هذا الصدق وحسن الإنصات هو عين ما أبحث عنه لبناء بيت كريم ومستقر.`,
        `رؤيتكم حول مكانة السكينة والمودة الأسرية تلتقي تماماً مع تطلعاتي. إن التفاهم والتشاور هما عماد الزواج الصالح في تقاليدنا الكريمة.`,
        `طرحكم لهذا السؤال ينم عن نضج وحرص كبير على التوافق. إن التثبت من تقارب المبادئ والأهداف هو أفضل برهان على صدق المسعى ونقاء النية.`,
        `بإذن الله، بعد أن نتيح لأنفسنا الوقت الكافي للتعرف على الخطوط العريضة لرؤيتنا، يمكننا الانتقال لخطوة رسمية والتواصل مع الأسرة أو الولي بالمعروف.`
      ];

      let chosenReply = '';
      if (text.includes('💍')) {
        chosenReply = lang === 'ar'
          ? `يسعدني ويشرفني قبول دعوتكم المباركة للانتقال لعتبة الأسرتين ومرحلة الخطوبة. هذا هو الوقت الشرعي واللائق لتبادل بطاقات التعريف الرسمية (CIN) والتواصل بين العائلتين بكل وضوح وبركة.`
          : `C'est avec une profonde joie et le plus grand respect que j'accueille votre proposition pour l'Étape Fiançailles. C'est en effet le moment approprié pour impliquer nos familles et échanger nos pièces d'identité officielles (CIN) en toute sérénité.`;
      } else {
        const replies = lang === 'ar' ? courteousRepliesAr : courteousRepliesFr;
        chosenReply = replies[Math.floor(Math.random() * replies.length)];
      }

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: 'partner',
        senderName: participantName,
        receiverId: 'me',
        content: chosenReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };

      setMessages((prev) => [...prev, replyMsg]);
    }, 1400);
  };

  const handleSendQuestion = (question: string) => {
    const prefix = lang === 'ar' ? '[سؤال زوجي جوهري]' : '[Question Fondamentale Matrimoniale]';
    handleSendMessage(`${prefix} : ${question}`);
  };

  const handleRequestPhotoExchange = () => {
    const requestText = lang === 'ar'
      ? `أرجو بكل احترام وأدب تبادل الإذن بالاطلاع على صورنا الشخصية في إطار مسعانا الزوجي المبارك.`
      : `Je souhaite solliciter avec courtoisie l'accès mutuel à la consultation de nos photos respectives, dans le cadre de notre démarche matrimoniale.`;
    handleSendMessage(requestText);
    setTimeout(() => {
      setPhotoRevealed(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[800px] bg-[#160d13] border border-[#d4af37]/30 rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col md:flex-row text-left rtl:text-right">
        
        {/* Left/Right Sidebar: Conversations List */}
        <div className="hidden md:flex flex-col w-80 border-r rtl:border-r-0 rtl:border-l border-[#d4af37]/20 bg-[#120a0f]">
          <div className="p-4 border-b border-[#d4af37]/20 flex items-center justify-between">
            <span className="font-serif text-sm font-semibold text-[#fce0a2] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#f472b6]" />
              <span>{t.conversationsTitle}</span>
            </span>
            <span className="text-[11px] font-mono text-[#d4af37]">
              {conversations.length} {t.conversationsActive}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left rtl:text-right transition-all cursor-pointer ${
                  activeConversation?.id === conv.id
                    ? 'bg-[#251520] border border-[#d4af37]/40 shadow-sm'
                    : 'hover:bg-[#1a0f16] border border-transparent'
                }`}
              >
                <PrestigeAvatar
                  photoUrl={conv.participantAvatar}
                  name={conv.participantName}
                  isVerified={conv.isVerified}
                  size="sm"
                  gender={participantGender}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-medium text-xs text-[#f8ede8] truncate flex items-center gap-1.5">
                      <span>{conv.participantName}</span>
                      {blockedUserIds.includes(conv.participantId) && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-medium">
                          {t.blockedBadge}
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#b8a4aa] truncate mt-0.5">
                    {blockedUserIds.includes(conv.participantId) ? t.userBlockedNotice : conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#170e14] border-t border-[#d4af37]/15 text-[11px] text-[#a89098] text-center">
            {t.chatEncryptedNotice}
          </div>
        </div>

        {/* Main Area: Chat Window */}
        <div className="flex-1 flex flex-col h-full bg-[#180f15]">
          
          {/* Top Bar of Chat */}
          <div className="p-4 border-b border-[#d4af37]/20 bg-[#1e121a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PrestigeAvatar
                photoUrl={participantPhoto}
                name={participantName}
                isBlurred={!photoRevealed && targetProfile?.isPhotoBlurred}
                isVerified={true}
                size="sm"
                gender={participantGender}
              />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-semibold text-sm text-[#fff8f0]">
                    {participantName}
                  </h3>
                  {isParticipantBlocked ? (
                    <div className="flex items-center gap-1 text-[10px] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/40">
                      <Ban className="w-3 h-3 text-rose-400" />
                      <span>{t.blockedBadge}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-[#d4af37] bg-[#d4af37]/15 px-1.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                      <span>{t.certifiedBadge}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#b8a4aa]">
                  <span>{participantProfession}</span>
                  <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                  <span>{participantCity}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Block / Unblock Action Button */}
              <button
                onClick={() => {
                  if (isParticipantBlocked) {
                    onToggleBlockUser && onToggleBlockUser(participantId, participantName);
                  } else {
                    setShowConfirmBlock(true);
                  }
                }}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                  isParticipantBlocked
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 hover:bg-rose-900 shadow-sm shadow-rose-950/40'
                    : 'border-zinc-700/60 hover:border-rose-400/50 hover:bg-rose-950/30 text-zinc-400 hover:text-rose-400'
                }`}
                title={isParticipantBlocked ? t.unblockUserBtn : t.blockUserBtn}
              >
                {isParticipantBlocked ? <Ban className="w-3.5 h-3.5 text-rose-400" /> : <UserX className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{isParticipantBlocked ? t.unblockUserBtn : t.blockUserBtn}</span>
              </button>

              <button
                onClick={handleRequestPhotoExchange}
                type="button"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-xs text-[#fce0a2] transition-colors cursor-pointer"
                title="Demande d'autorisation photo mutuelle"
              >
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.requestPhotoAccessBtn}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer la messagerie"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Blocked Safety Banner */}
          {isParticipantBlocked && (
            <div className="bg-rose-950/60 border-b border-rose-500/40 p-3 sm:p-4 flex items-center justify-between gap-3 text-xs text-rose-200 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Ban className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <p className="font-semibold text-rose-100">{t.userBlockedBannerTitle}</p>
                  <p className="text-[11px] text-rose-300/90 mt-0.5">{t.userBlockedBannerDesc}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleBlockUser && onToggleBlockUser(participantId, participantName)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 border border-rose-400/50 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap shadow-sm"
              >
                {t.unblockUserBtn}
              </button>
            </div>
          )}

          {/* Ethical Charter Notice Ribbon */}
          <div className="bg-[#24141e]/90 px-4 py-2 border-b border-[#d4af37]/15 flex items-center justify-between text-xs text-[#d6c4c9]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] leading-relaxed">
                {t.decencyNotice}
              </span>
            </div>
            <button
              onClick={() => setShowQuestionPicker(!showQuestionPicker)}
              className="text-[11px] text-[#fce0a2] underline hover:text-white cursor-pointer whitespace-nowrap ml-2 rtl:ml-0 rtl:mr-2"
            >
              {t.tenMatrimonialQuestionsBtn}
            </button>
          </div>

          {/* Question Picker Drawer */}
          {showQuestionPicker && (
            <div className="p-3 bg-[#20121a] border-b border-[#d4af37]/30 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif font-semibold text-[#fce0a2]">
                  {t.askRecommendedQuestion}
                </span>
                <button
                  onClick={() => setShowQuestionPicker(false)}
                  className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                {questionsList.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuestion(q)}
                    className="p-2 rounded-xl bg-[#2a1722] hover:bg-[#341d2a] border border-[#d4af37]/20 text-left rtl:text-right text-xs text-[#f8ede8] transition-colors cursor-pointer"
                  >
                    « {q} »
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                      isMe
                        ? 'bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#fce0a2] text-[#160d13] font-medium rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none'
                        : 'bg-[#22141c] border border-[#d4af37]/20 text-[#f8ede8] rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isMe ? 'text-[#160d13]/70 font-mono' : 'text-zinc-500 font-mono'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#160d13]" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#b8a4aa] italic">
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce delay-200" />
                <span>{participantName} {t.typingIndicator}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Row (Hidden if user is blocked) */}
          {!isParticipantBlocked && (
            <div className="px-4 py-2 border-t border-[#d4af37]/15 bg-[#170e14] flex items-center gap-2 overflow-x-auto text-xs text-zinc-300">
              <button
                onClick={() => handleSendMessage(lang === 'ar' ? "السلام عليكم، هل ترغبون في تبادل الرأي حول تطلعاتنا المشتركة للبيت والأسرة ؟" : "Salam aleykoum, seriez-vous d'accord pour échanger autour de nos projets de vie futurs ?")}
                className="px-2.5 py-1 rounded-lg bg-[#20121a] hover:bg-[#281621] border border-[#d4af37]/20 text-[11px] text-[#d6c4c9] whitespace-nowrap cursor-pointer"
              >
                {t.proposeProjectsExchange}
              </button>
              <button
                onClick={() => handleSendMessage(lang === 'ar' ? "ما هي الخصال الأخلاقية التي تولونها الأهمية القصوى في رفيق الدرب ؟" : "Quelles sont pour vous les qualités primordiales chez un(e) futur(e) époux(se) ?")}
                className="px-2.5 py-1 rounded-lg bg-[#20121a] hover:bg-[#281621] border border-[#d4af37]/20 text-[11px] text-[#d6c4c9] whitespace-nowrap cursor-pointer"
              >
                {t.primeQualitiesPrompt}
              </button>
              <button
                onClick={() => handleSendMessage(t.familyStageInviteMessage)}
                className="px-2.5 py-1 rounded-lg bg-[#2a1723] hover:bg-[#381c2d] border border-[#d4af37]/40 text-[11px] text-[#fce0a2] font-medium whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <span>{t.proposeFamilyStagePrompt}</span>
              </button>
              <button
                onClick={handleRequestPhotoExchange}
                className="px-2.5 py-1 rounded-lg bg-[#20121a] hover:bg-[#281621] border border-[#d4af37]/20 text-[11px] text-[#fce0a2] whitespace-nowrap cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3 h-3 text-[#d4af37]" />
                <span>{t.mutualPhotoPrompt}</span>
              </button>
            </div>
          )}

          {/* Bottom Chat Input Form or Blocked Notice */}
          {isParticipantBlocked ? (
            <div className="p-4 bg-[#1a0f16] border-t border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rose-300">
              <div className="flex items-center gap-2 text-center sm:text-left rtl:sm:text-right">
                <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{t.userBlockedNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => onToggleBlockUser && onToggleBlockUser(participantId, participantName)}
                className="px-4 py-2 rounded-xl bg-rose-900/70 hover:bg-rose-800 border border-rose-400/50 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
              >
                {t.unblockUserBtn}
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-[#1e121a] border-t border-[#d4af37]/20 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t.chatInputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs sm:text-sm text-[#f8ede8] placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] text-left rtl:text-right"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#fce0a2] via-[#d4af37] to-[#b38728] text-[#160d13] font-semibold hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-[#d4af37]/15 flex items-center justify-center"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Confirmation Dialog for Blocking in Chat */}
      {showConfirmBlock && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1e111a] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl shadow-black">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400">
              <UserX className="w-6 h-6" />
            </div>

            <h4 className="text-base font-serif font-bold text-[#fff8f0]">
              {t.confirmBlockTitle}
            </h4>

            <p className="text-xs text-[#d6c4c9] leading-relaxed">
              {t.confirmBlockDesc}
            </p>

            <div className="pt-2 flex items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmBlock(false)}
                className="px-4 py-2 rounded-xl border border-[#d4af37]/30 text-xs font-medium text-[#f8ede8] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {t.cancelBtn}
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleBlockUser && onToggleBlockUser(participantId, participantName);
                  setShowConfirmBlock(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-md shadow-rose-900/40 transition-colors cursor-pointer"
              >
                {t.confirmBlockBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
