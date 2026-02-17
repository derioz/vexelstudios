"use client";

import { useUILibrary } from "@/components/ui-library-provider";
import type { UILibrary } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uitripled/react-shadcn/ui/select";
import Image from "next/image";

const uiLibraries = [
  {
    id: "shadcnui",
    name: "shadcn/ui",
    logoLight: "/logos/shadcnui_dark.svg",
    logoDark: "/logos/shadcnui_white.svg",
    description: "Beautifully designed components",
    badge: "Popular",
  },
  {
    id: "baseui",
    name: "Base UI",
    logoLight: "/logos/baseui_white.svg",
    logoDark: "/logos/baseui_dark.svg",
    description: "Unstyled React components",
  },
];

export function LibrarySelector() {
  const { selectedLibrary, setSelectedLibrary } = useUILibrary();

  return (
    <Select
      value={selectedLibrary}
      onValueChange={(value) => setSelectedLibrary(value as UILibrary)}
    >
      <SelectTrigger
        className="h-8 w-auto gap-2 cursor-pointer border-none bg-transparent px-2 focus:ring-0 shadow-none focus:ring-offset-0 ring-offset-0 outline-none"
        aria-label="Select UI library"
      >
        <SelectValue placeholder="Select Library">
          {selectedLibrary && (
            <div className="flex items-center gap-2">
              {/* Light Mode Logo */}
              <Image
                src={
                  uiLibraries.find((lib) => lib.id === selectedLibrary)
                    ?.logoLight || ""
                }
                alt={
                  uiLibraries.find((lib) => lib.id === selectedLibrary)?.name ||
                  ""
                }
                width={16}
                height={16}
                className="rounded-sm block dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src={
                  uiLibraries.find((lib) => lib.id === selectedLibrary)
                    ?.logoDark || ""
                }
                alt={
                  uiLibraries.find((lib) => lib.id === selectedLibrary)?.name ||
                  ""
                }
                width={16}
                height={16}
                className="hidden dark:block"
              />
              <span className="font-medium text-sm">
                {uiLibraries.find((lib) => lib.id === selectedLibrary)?.name}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="">
        {uiLibraries.map((lib) => (
          <SelectItem
            key={lib.id}
            value={lib.id}
            className="py-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="mt-0.5 rounded-sm overflow-hidden flex-shrink-0">
                <Image
                  src={lib.logoLight || "/placeholder.svg"}
                  alt={lib.name}
                  width={20}
                  height={20}
                  className="block dark:hidden"
                />
                <Image
                  src={lib.logoDark || "/placeholder.svg"}
                  alt={lib.name}
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">
                    {lib.name}
                  </span>
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
