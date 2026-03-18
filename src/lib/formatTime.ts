export function formatTime(date_string: string): string {
    const date = new Date(date_string)
    const now = new Date()
    const diff_ms = now.getTime() - date.getTime()
    const diff_days = Math.floor(diff_ms / 86400000)

    if (diff_days >= 1) {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    }

    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}
