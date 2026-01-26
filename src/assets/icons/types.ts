// Auto-generated file. Do not edit manually.
export const availableIcons = [
    "Icon-zalo",
    "arrow-down-01",
    "briefcase",
    "building-06",
    "cancel-01",
    "chevron-left",
    "chevron-right",
    "coins-01",
    "eye",
    "eye-off",
    "file-text",
    "filter-horizontal",
    "license",
    "list",
    "mail-02",
    "more-vertical",
    "plus",
    "search",
    "send",
    "settings",
    "square-lock-01",
    "ticket",
    "user-check",
    "user-circle",
    "users",
    "x",
    "bill",
    "checked",
    "checkmark-circle-01",
    "plus-sign",
    "checkmark-square-02",
    "switch-horizontal-02",
    "setting-01",
    "dashboard-square-01",
    "social"
] as const

export type IconName = (typeof availableIcons)[number]

export interface IconProps {
    name: IconName
    size?: number | string
    color?: string
    className?: string
}
