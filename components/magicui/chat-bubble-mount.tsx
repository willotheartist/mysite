"use client";

import ChatBubble from "@/components/magicui/chat-bubble";

export default function ChatBubbleMount() {
  return (
    <ChatBubble
      name="Your Name"
      time="11:46"
      avatarSrc="/images/your-avatar.jpg"
      message="That’s awesome. I think our users will really appreciate the improvements."
      persistKey="chat-bubble-dismissed-v1"  // remove to show every visit
      delayMs={350}
      deliveredLabel="Delivered"
      maxWidthClass="max-w-[320px]"
    />
  );
}
