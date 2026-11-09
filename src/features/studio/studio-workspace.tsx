"use client";

import type { DemoDefinition, StyleTokens } from "@/core/schemas";
import { DemoLandingEngine } from "@/features/demo-landing";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  applyTokenOverrides,
  formatSystemOverridesNote,
  hasTokenOverrides,
  type StyleTokenOverrides,
} from "./apply-token-overrides";
import type { TemplateSectionOutline } from "./compose-prompt";
import { SystemFontLoader } from "./system-font-loader";
import type { StudioSidebarStyle } from "./studio-sidebar";
import { StudioToolbar } from "./studio-toolbar";
import { SystemDrawer } from "./system-drawer";
import {
  getServerSystemHistorySnapshot,
  getSystemHistorySnapshot,
  setSystemHistory,
  subscribeSystemHistory,
} from "./system-history-store";
import {
  createHistoryEntry,
  entriesForStyle,
  pushHistoryEntry,
  removeHistoryEntry,
} from "./system-history";

export type StudioWorkspaceProps = {
  templateId: string;
  templateTitle: string;
  templateSections: TemplateSectionOutline[];
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
  templateSections,
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
  const [overrideBag, setOverrideBag] = useState<{
    styleId: string;
    value: StyleTokenOverrides;
  }>({ styleId, value: {} });

  const history = useSyncExternalStore(
    subscribeSystemHistory,
    getSystemHistorySnapshot,
    getServerSystemHistorySnapshot,
  );

  const overrides = useMemo(
    () => (overrideBag.styleId === styleId ? overrideBag.value : {}),
    [overrideBag, styleId],
  );

  function setOverrides(value: StyleTokenOverrides) {
    setOverrideBag({ styleId, value });
  }

  function commitHistory(value: StyleTokenOverrides = overrides) {
    if (!hasTokenOverrides(value)) return;
    setSystemHistory(pushHistoryEntry(history, createHistoryEntry(styleId, value)));
  }

  function toggleSystem() {
    if (systemOpen) {
      commitHistory();
      setSystemOpen(false);
      return;
    }
    setSystemOpen(true);
  }

  const activeStyle = useMemo(
    () => styles.find((style) => style.id === styleId) ?? styles[0]!,
    [styleId, styles],
  );

  const styleHistory = useMemo(
    () => entriesForStyle(history, styleId),
    [history, styleId],
  );

  const previewTokens = useMemo(
    () => applyTokenOverrides(tokens, overrides),
    [overrides, tokens],
  );

  const systemOverridesNoteRu = useMemo(
    () => formatSystemOverridesNote(overrides, "ru"),
    [overrides],
  );
  const systemOverridesNoteEn = useMemo(
    () => formatSystemOverridesNote(overrides, "en"),
    [overrides],
  );

  return (
    <section
      className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-background"
      aria-label="Превью лендинга"
    >
      <SystemFontLoader
        headingStack={previewTokens.typography.heading}
        bodyStack={previewTokens.typography.body}
      />

      <div className="shrink-0 border-b border-border bg-background/95">
        <StudioToolbar
          templateId={templateId}
          templateTitle={templateTitle}
          templateSections={templateSections}
          styleId={styleId}
          styleTitle={styleTitle}
          styleDescription={styleDescription}
          styleIds={styleIds}
          promptRu={promptRu}
          promptEn={promptEn}
          promptConstructorRu={promptConstructorRu}
          promptConstructorEn={promptConstructorEn}
          systemOverridesNoteRu={systemOverridesNoteRu}
          systemOverridesNoteEn={systemOverridesNoteEn}
          modeLabel={modeLabel}
          onOpenSystem={toggleSystem}
          systemOpen={systemOpen}
        />
      </div>

      <div className="flex min-h-0 flex-1">
        <div id="studio-preview" className="min-h-0 min-w-0 flex-1 overflow-auto p-3 sm:p-5">
          <DemoLandingEngine
            styleId={styleId}
            styleTitle={styleTitle}
            tokens={previewTokens}
            demo={demo}
            locale="ru"
            templateId={templateId}
          />
        </div>

        <SystemDrawer
          open={systemOpen}
          onClose={toggleSystem}
          style={activeStyle}
          tokens={tokens}
          overrides={overrides}
          onOverridesChange={setOverrides}
          history={styleHistory}
          onSaveHistory={() => commitHistory()}
          onRestoreHistory={(entry) => setOverrides(entry.overrides)}
          onDeleteHistory={(id) => setSystemHistory(removeHistoryEntry(history, id))}
        />
      </div>
    </section>
  );
}
