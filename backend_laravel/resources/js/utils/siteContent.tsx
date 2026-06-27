/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as LucideIcons from "lucide-react";
import { ShieldCheck } from "lucide-react";

export function GuaranteeIcon({ name, className }: { name: string; className?: string }) {
  const icons = LucideIcons as Record<string, React.ComponentType<{ className?: string }>>;
  const Icon = icons[name] ?? ShieldCheck;
  return <Icon className={className} />;
}

export function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}
