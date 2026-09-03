import { LuInfo, LuTriangleAlert, LuOctagonAlert } from "react-icons/lu";

type Props = {
  type?: "note" | "warn" | "danger";
  title?: string;
  children: React.ReactNode;
};

const VARIANTS = {
  note: {
    border: "border-primaryColor/25",
    bg: "bg-primaryColor/[0.04]",
    icon: "text-primaryColor",
    titleColor: "text-primaryColor",
    Icon: LuInfo,
    defaultTitle: "Note",
  },
  warn: {
    border: "border-starYellow/25",
    bg: "bg-starYellow/[0.05]",
    icon: "text-starYellow",
    titleColor: "text-starYellow",
    Icon: LuTriangleAlert,
    defaultTitle: "Watch out",
  },
  danger: {
    border: "border-error/25",
    bg: "bg-error/[0.05]",
    icon: "text-error",
    titleColor: "text-error",
    Icon: LuOctagonAlert,
    defaultTitle: "Do not",
  },
} as const;

export default function Callout({ type = "note", title, children }: Props) {
  const v = VARIANTS[type];
  const Icon = v.Icon;
  return (
    <div
      className={`mb-6 flex items-start gap-3 rounded-xl border ${v.border} ${v.bg} px-4 py-3.5`}
    >
      <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${v.icon}`} />
      <div className="min-w-0">
        <div className={`mb-1 text-sm font-semibold ${v.titleColor}`}>
          {title ?? v.defaultTitle}
        </div>
        <div className="text-[15px] leading-relaxed text-textSecondary [&_code]:text-accentGreen [&_p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
