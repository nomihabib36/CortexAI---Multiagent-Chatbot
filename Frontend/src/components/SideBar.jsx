import { useEffect, useState } from "react";
import {
  User,
  Coins,
  LogOut,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/getConversations.js";
import { createConversation } from "../features/createConversation.js";
import {
  addConversation,
  setConversation,
  setSelectedConversation,
} from "../redux/store/conversationSlice.js";
import { setUserData } from "../redux/store/userSlice.js";
import logout from "../features/logout.js";
import BillingDrawer from "./BillingDrawer.jsx";

export default function Sidebar() {
  //sidebar state
  const [collapsed, setCollapsed] = useState(false);
  //error in image state
  const [imageError, setImageError] = useState(false);

  const [showBilling, setShowBilling] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  // Get conversations from Redux state
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );

  // Get User data from Redux state
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();

      dispatch(setConversation(data));
    };
    getConv();
  }, [userData?._id]);

  //create COnversation and handle
  const handleCreateConv = async () => {
    const data = await createConversation();

    dispatch(addConversation(data));
  };

  if (collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0">
        {/* Panel Button */}
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
        >
          <PanelRight />
        </button>
        {/* New Chat Button */}
        <button
          onClick={handleCreateConv}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
        >
          <Plus size={17} />
        </button>
        {/* Conversation icon */}
        <div className="flex-1 overflow-y-auto px-2.5 pb[scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5">
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                //// Set the clicked conversation as the selected conversation

                onClick={() => {
                  dispatch(setSelectedConversation(conv));
                }}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-color duration-150 
                    ${
                      isActive
                        ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                        : "bg-transparent border-transparent"
                    }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150
                    ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-white/[0.05] text-slate-500"
                    }    
                        `}
                >
                  <MessageSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>

        {/* image icon */}
        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <img
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
              src={userData?.avatar}
              alt={"image"}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center ">
              <user size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* hamburger for mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer"
      >
        <Menu size={14} />
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}
      {/* Main Container */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06] transition-transform duration-250
      ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className=" flex items-center gap-2.5 px-4 py-4 border-b border-white/ [0/06]">
            {/* Panel Icon */}
            <div
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white-[0.05] transition-colors duration-150 bg-transparent"
              onClick={() => setCollapsed(true)}
            >
              <PanelLeftIcon />
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            >
              <X size={14} />
            </button>
            {/* App Title */}
            <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
              CortexAi
            </span>
            {/* Subscription Status */}
            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
              {userData?.plan || "free plan"}
            </span>
            {/* newChat icon */}
            <button
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-color duration-150 bg-transparent border-none cursor-pointer "
              onClick={() => dispatch(setSelectedConversation(null))}
            >
              <PenSquare size={14} onClick={handleCreateConv} />
            </button>
          </div>
          {/* New Chat button */}
          <div className="px-4 pt-4 pb-1">
            <button
              onClick={handleCreateConv}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150 "
              // onClick={() => dispatch(setSelectedConversation(null))}
            >
              <Plus size={15} />
              New Chat
            </button>
          </div>
          {/* Conversation */}
          {conversations.length == 0 ? (
            //When No Conversation
            <div className="px-5 pt-4 pb-1.5 text=[10.5px] font-semibouppercase tracking-widest text-slate-600">
              No Recent Conversation
            </div>
          ) : (
            // When any Conversation
            <div className="px-5 pt-4 pb-1.5 text=[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              Recents
            </div>
          )}

          {/* Conversation List UI*/}
          <div className="flex-1 overflow-y-auto px-2.5 pb[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {conversations.map((conv, i) => {
              const isActive = selectedConversation?._id == conv?._id;
              return (
                <div
                  //// Set the clicked conversation as the selected conversation

                  onClick={() => {
                    dispatch(setSelectedConversation(conv));
                  }}
                  className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-color duration-150 
                    ${
                      isActive
                        ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                        : "bg-transparent border-transparent"
                    }`}
                >
                  {/* chat icon */}
                  <div
                    className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150
                    ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-white/[0.05] text-slate-500"
                    }    
                        `}
                  >
                    <MessageSquare size={13} />
                  </div>
                  <span
                    className={`text=[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}
                  >
                    {conv?.title || "New Chat "}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer Line */}
          <div className="mx-2.5 h-px bg-white"></div>
          {/* Footer */}
          <div className="px-3.5 py-3.5">
            {/* use User Data to add user detail in footer */}

            {/* Condition When user is login then show user data */}
            {userData ? (
              <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                {/* User Image */}
                <div className="relative shrink-0">
                  {userData?.avatar && !imageError ? (
                    <img
                      className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                      src={userData?.avatar}
                      alt={"image"}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center ">
                      <User size={15} className="text-slate-400" />
                    </div>
                  )}
                </div>
                {/* User Name and Plan*/}
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-slate-100 truncate ">
                    {userData?.name || "user"}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-px">
                    {`${userData?.plan}` || "Free Plan  "}
                  </p>
                </div>

                {/* Credit & Logout Button */}
                <div className="flex gap-1">
                  {/* Credit Button */}
                  <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.06] hover:text-slate-400 transition-all duration-150">
                    <Coins
                      size={16}
                      onClick={() => {
                        setShowBilling(true);
                      }}
                    />
                  </button>
                  {/* LogOut Button */}
                  <button
                    onClick={() => {
                      (logout(), dispatch(setUserData(null)));
                    }}
                    className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.06] hover:text-slate-400 transition-all duration-150  "
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // When User in not Logedin then show login button
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.05] border border-white/[0.08] rounded-xl px-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <BillingDrawer open={showBilling} onClose={() => setShowBilling(false)} />
    </>
  );
}
