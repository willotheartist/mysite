"use client";

import ChatBubble from "@/components/magicui/chat-bubble";

export default function ChatBubbleMount() {
  return (
    <ChatBubble
      name="William"
      time="11:46"
      avatarSrc="/wlogo.png"
      message="Hey! Thanks for stopping by 😊"
      persistKey="chat-bubble-dismissed-v1"  // remove to show every visit
      delayMs={350}
      deliveredLabel="Delivered"
      maxWidthClass="max-w-[320px]"
    />
  );
}
