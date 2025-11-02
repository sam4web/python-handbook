"use client";

import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { Lightbulb, LightbulbOff, Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import EditorThemeDropdown from "./editor-theme-dropdown";

export default function ChallengeCodeEditor({ challenge }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="px-3 py-2 space-y-3">
      <div className="flex-between">
        <div className="flex-center gap-2">
          <EditorThemeDropdown />
          <Button
            variant="outline"
            className="code-editor-button"
            onClick={() => setShowHint((prev) => !prev)}
            title={`${showHint ? "Hide" : "Show"} Hints`}
          >
            {showHint ? (
              <>
                <LightbulbOff /> Hide Hints
              </>
            ) : (
              <>
                <Lightbulb /> Show Hints
              </>
            )}
          </Button>
        </div>
        <div className="flex-center gap-2">
          <Button variant="outline" className="code-editor-button" title="Reset editor">
            <RotateCcw />
            Reset
          </Button>
          <Button variant="outline" className="code-editor-button" title="View solution">
            Solution
          </Button>
          <Button variant="primary" className="code-editor-button outline outline-primary" title="Run tests">
            <Play />
            Run Tests
          </Button>
        </div>
      </div>
      {showHint ? (
        <div
          className={`rounded-md shadow-xs px-2 md:px-3 py-1 md:py-2 bg-primary/15 border border-primary ${firacode.className}`}
        >
          <p className="font-semibold text-sm text-foreground mb-1">Hints:</p>
          <ol>
            {challenge.hints.map((hint, idx) => (
              <li className="text-xs list-decimal ml-6 text-secondary-foreground" key={idx}>
                {hint}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
