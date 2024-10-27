import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  FileJson,
  Redo2,
  Undo2,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import HintButton from "./HintButton";
import { ActiveTool, Editor } from "@/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTab: ActiveTool;
  setActiveTab: (tab: ActiveTool) => void;
  editor: Editor | undefined;
}

const Navbar = ({ activeTab, setActiveTab, editor }: NavbarProps) => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b">
      <Link href="/">
        <div className="size-10 flex items-center justify-center relative shrink-0">
          <img
            src="https://img.logoipsum.com/248.svg"
            alt="The Canvas"
            className="shrink-0 hover:opacity-75 transition"
          />
        </div>
      </Link>
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              // onClick={() => openFilePicker()}
              className="flex items-center gap-x-2"
            >
              <FileJson className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <HintButton label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("select")}
            className={cn (activeTab === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </HintButton>
        <HintButton label="Undo" side="bottom" sideOffset={10}>
          <Button
            // disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </HintButton>
        <HintButton label="Redo" side="bottom" sideOffset={10}>
          <Button
            // disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </HintButton>
        <Separator orientation="vertical" className="mx-2" />
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.saveJson()}
              >
                <FileJson className="size-10" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.exportPng()}
              >
                <FileJson className="size-10" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Export as PNG image
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.exportJpg()}
              >
                <FileJson className="size-10" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Export as JPG image
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.exportSvg()}
              >
                <FileJson className="size-10" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Export as SVG vector
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Profile
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => handleBilling()}
              >
                <div>Billing</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => handleLogout()}
              >
                <div>Logout</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
