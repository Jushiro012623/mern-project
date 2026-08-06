import {cn} from "#/lib/utils.ts";

export const GridBackground = () => {
  return (<div className="absolute inset-0 overflow-hidden">
    <div
      className={cn(
        "absolute inset-0",
        "animate-[gridMove_20s_linear_infinite]",
        "bg-[linear-gradient(to_right,rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)]",
        "bg-size-[50px_50px]",
        "mask-[radial-gradient(ellipse_at_center,black_30%,rgba(0,0,0,0.85)_55%,rgba(0,0,0,0.4)_75%,transparent_100%)]",
        "[-webkit-mask-image:radial-gradient(ellipse_at_center,black_30%,rgba(0,0,0,0.85)_55%,rgba(0,0,0,0.4)_75%,transparent_100%)]"
      )}
    />
  </div>)
}
