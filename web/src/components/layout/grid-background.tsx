import {cn} from "#/lib/utils.ts";

export const GridBackground = () => {

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/*-------------------Background gradient-------------------*/}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_top,rgba(59,130,246,.25),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,.12),transparent_40%)]"
        )}
      />

      {/*----------------------Aurora blobs----------------------*/}
      <div
        className="absolute -top-48 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] animate-pulse"/>

      <div
        className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]"
        style={{
          animation: "float 12s ease-in-out infinite",
        }}
      />

      {/*---------------------Animated Grid---------------------*/}
      <div
        className={cn(
          "absolute inset-0",
          "animate-[gridMove_35s_linear_infinite]",
          "bg-[linear-gradient(to_right,rgba(59,130,246,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,.06)_1px,transparent_1px)]",
          "bg-size-[60px_60px]",
          "mask-[radial-gradient(circle,black_45%,transparent_100%)]",
          "[-webkit-mask-image:radial-gradient(circle,black_45%,transparent_100%)]"
        )}
      />

      {/*------------------------Vignette------------------------*/}
      <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-transparent to-background/90"/>
    </div>
  );
};
