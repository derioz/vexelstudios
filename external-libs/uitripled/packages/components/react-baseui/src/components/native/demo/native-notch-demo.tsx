"use client";

import { Avatar } from "@base-ui/react/avatar";
import { NativeNotch } from "../native-notch-baseui";

export function NativeNotchDefault() {
  return (
    <div className="relative h-[400px] w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg overflow-hidden">
      <NativeNotch
        collapsedIcon={
          <Avatar.Root className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-muted">
            <Avatar.Image
              src="https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtoUjLg4dAryGEidskK72wBCQA6DNcZH4Xh5b8"
              alt="@baseui"
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="text-xs text-foreground">
              BU
            </Avatar.Fallback>
          </Avatar.Root>
        }
      >
        <div className="text-foreground">
          <div className="flex items-start gap-3 mb-3">
            <Avatar.Root className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-muted">
              <Avatar.Image
                src="https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtoUjLg4dAryGEidskK72wBCQA6DNcZH4Xh5b8"
                alt="@baseui"
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback className="text-sm text-foreground">
                BU
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Base UI</h3>
              <p className="text-sm text-muted-foreground">@baseui</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unstyled React components and low-level hooks for building accessible, customizable UIs.
          </p>
        </div>
      </NativeNotch>
    </div>
  );
}

export function NativeNotchLeftAlign() {
  return (
    <div className="relative h-[400px] w-full bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg overflow-hidden">
      <NativeNotch
        collapsedIcon={
          <Avatar.Root className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-muted">
            <Avatar.Image
              src="https://github.com/vercel.png"
              alt="@vercel"
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="text-xs text-foreground">
              VC
            </Avatar.Fallback>
          </Avatar.Root>
        }
        position={{ top: 32, align: "left" }}
      >
        <div className="text-foreground">
          <div className="flex items-start gap-3 mb-3">
            <Avatar.Root className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-muted">
              <Avatar.Image
                src="https://github.com/vercel.png"
                alt="@vercel"
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback className="text-sm text-foreground">
                VC
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Vercel</h3>
              <p className="text-sm text-muted-foreground">@vercel</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Develop. Preview. Ship. The best frontend teams use Vercel.
          </p>
        </div>
      </NativeNotch>
    </div>
  );
}

export function NativeNotchRelative() {
  return (
    <div className="relative h-[400px] w-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-lg overflow-hidden p-8">
      <div className="grid justify-center">
        <NativeNotch
          collapsedIcon={
            <Avatar.Root className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-muted">
              <Avatar.Image
                src="https://github.com/nextjs.png"
                alt="@nextjs"
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback className="text-xs text-foreground">
                NX
              </Avatar.Fallback>
            </Avatar.Root>
          }
          className="relative top-0 left-0"
          position={{ top: 0, align: "left" }}
        >
          <div className="text-foreground">
            <div className="flex items-start gap-3 mb-3">
              <Avatar.Root className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-muted">
                <Avatar.Image
                  src="https://github.com/nextjs.png"
                  alt="@nextjs"
                  className="w-full h-full object-cover"
                />
                <Avatar.Fallback className="text-sm text-foreground">
                  NX
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Next.js</h3>
                <p className="text-sm text-muted-foreground">@nextjs</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The React Framework for the Web. Used by some of the world's largest companies.
            </p>
          </div>
        </NativeNotch>
      </div>
    </div>
  );
}
