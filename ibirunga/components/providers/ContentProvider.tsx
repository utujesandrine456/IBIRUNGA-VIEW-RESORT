"use client";

import { createContext, useContext } from "react";
import type { CmsContent } from "@/lib/cms-types";

const ContentContext = createContext<CmsContent | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content: CmsContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useCmsContent() {
  const content = useContext(ContentContext);
  if (!content) {
    throw new Error("useCmsContent must be used within ContentProvider");
  }
  return content;
}
