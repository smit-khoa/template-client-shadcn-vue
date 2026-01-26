import currencyFormatter from "currency-formatter"
import moment from "moment"

const formatCurrency = (value: any, currency = "VND") => {
    return currencyFormatter.format(value, {
        code: currency
        // decimalDigits: 0,
        // decimalSeparator: "."
    })
}

const formatNumber = (value: any) => {
    const num_value = parseFloat(value)
    if (isNaN(num_value)) return value

    return num_value.toLocaleString("vi-VN")
}

interface FormatDateOptions {
    date: Date | string | number | any
    format?: string
    fromNow?: boolean
}

const formatDate = (options: FormatDateOptions): string => {
    const { date, format = "DD/MM/YYYY", fromNow = false } = options

    // Kiểm tra null/undefined trước
    if (date === null || date === undefined) return "Invalid Date"
    // Sử dụng strict parsing để tránh deprecation warning
    let moment_date
    if (typeof date === "string") {
        // Thử parse với các format phổ biến
        moment_date = moment(date, ["YYYY-MM-DD", "DD/MM/YYYY", "YYYY-MM-DDTHH:mm:ss", moment.ISO_8601], true)
        // Nếu strict parsing fail, thử lại với Date object
        if (!moment_date.isValid()) {
            const parsed_date = new Date(date)
            moment_date = moment(parsed_date)
        }
    } else {
        moment_date = moment(date)
    }

    if (!moment_date.isValid()) return "Invalid Date"

    // lấy thời gian về trước
    moment.locale("vi")
    if (fromNow) return moment_date.fromNow()

    return moment_date.format(format)
}

const randomString = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

const image = (name: string) => {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}

const copy = (text: string) => {
    navigator.clipboard.writeText(text)
}

export { formatCurrency, formatNumber, formatDate, randomString, image, copy }
