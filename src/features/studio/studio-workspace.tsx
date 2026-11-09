"use client";

import type { DemoDefinition, StyleTokens } from "@/core/schemas";
import { DemoLandingEngine } from "@/features/demo-landing";
import { useMemo, useState } from "react";
import type { StudioSidebarStyle } from "./studio-sidebar";
import { StudioToolbar } from "./studio-toolbar";
import { SystemDrawer } from "./system-drawer";

export type StudioWorkspaceProps = {
  templateId: string;
  templateTitle: string;
  styleId: string;
  styleTitle: string;
  styleDescription: string;
  styleIds: string[];
  styles: StudioSidebarStyle[];
  promptRu: string;
  promptEn: string;
  promptConstructorRu: string;
  promptConstructorEn: string;
  modeLabel: "Light" | "Dark";
  tokens: StyleTokens;
  demo: DemoDefinition;
};

export function StudioWorkspace({
  templateId,
  templateTitle,
  styleId,
  styleTitle,
  styleDescription,
  styleIds,
  styles,
  promptRu,
  promptEn,
  promptConstructorRu,
  promptConstructorEn,
  modeLabel,
  tokens,
  demo,
}: StudioWorkspaceProps) {
  const [systemOpen, setSystemOpen] = useState(false);

  const activeStyle = useMemo(
    () => styles.find((style) => style.id === styleId) ?? styles[0]!,
    [styleId, styles],
  );

  return (
    <section
      className="relative flex min-w-0 flex-1 flex-col bg-background"
      aria-label="Превью лендинга"
    >
      <StudioToolbar
        templateId={templateId}
        templateTitle={templateTitle}
        styleId={styleId}
        styleTitle={styleTitle}
        styleDescription={styleDescription}
        styleIds={styleIds}
        promptRu={promptRu}
        promptEn={promptEn}
        promptConstructorRu={promptConstructorRu}
        promptConstructorEn={promptConstructorEn}
        modeLabel={modeLabel}
        onOpenSystem={() => setSystemOpen(true)}
        systemOpen={systemOpen}
      />

      <div id="studio-preview" className="min-h-0 flex-1 overflow-auto p-3 sm:p-5">
        <DemoLandingEngine
          styleId={styleId}
          styleTitle={styleTitle}
          tokens={tokens}
          demo={demo}
          locale="ru"
        />
      </div>

      <SystemDrawer open={systemOpen} onClose={() => setSystemOpen(false)} style={activeStyle} />
    </section>
  );
}
