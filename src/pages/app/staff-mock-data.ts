export interface FanpageMember {
    id: string
    name: string
    avatar: string
    platform: "facebook" | "zalo" | "zalo-oa" | "whatsapp"
}

export interface StaffMember {
    id: string
    name: string
    avatar: string
    role: string
    last_seen: string
    fanpages: FanpageMember[]
    status: "joined" | "invited"
}

const makeFanpages = (seed: number): FanpageMember[] => {
    const platforms: Array<"facebook" | "zalo" | "zalo-oa" | "whatsapp"> = ["facebook", "zalo", "zalo-oa", "whatsapp"]
    return Array.from({ length: 8 }, (_, i) => ({
        id: `fp-${seed}-${i}`,
        name: `Page ${i + 1}`,
        avatar: `https://picsum.photos/28?random=${seed * 10 + i}`,
        platform: platforms[i % platforms.length]
    }))
}

export const mock_staff_list: StaffMember[] = [
    {
        id: "1",
        name: "Quang Smit",
        avatar: "https://i.pravatar.cc/40?u=staff1",
        role: "Nhân viên",
        last_seen: "3 phút trước",
        status: "joined",
        fanpages: makeFanpages(1)
    },
    {
        id: "2",
        name: "Minh Trần",
        avatar: "https://i.pravatar.cc/40?u=staff2",
        role: "Admin",
        last_seen: "1 giờ trước",
        status: "joined",
        fanpages: makeFanpages(2)
    },
    {
        id: "3",
        name: "Thu Hà",
        avatar: "https://i.pravatar.cc/40?u=staff3",
        role: "Nhân viên",
        last_seen: "30 phút trước",
        status: "joined",
        fanpages: makeFanpages(3)
    },
    {
        id: "4",
        name: "Khoa Mac",
        avatar: "https://i.pravatar.cc/40?u=staff4",
        role: "Supervisor",
        last_seen: "Vừa xong",
        status: "joined",
        fanpages: makeFanpages(4)
    },
    {
        id: "5",
        name: "Linh Nguyễn",
        avatar: "https://i.pravatar.cc/40?u=staff5",
        role: "Nhân viên",
        last_seen: "2 ngày trước",
        status: "joined",
        fanpages: makeFanpages(5)
    },
    {
        id: "6",
        name: "Đức Lê",
        avatar: "https://i.pravatar.cc/40?u=staff6",
        role: "Nhân viên",
        last_seen: "5 phút trước",
        status: "joined",
        fanpages: makeFanpages(6)
    },
    {
        id: "7",
        name: "Bảo Trần",
        avatar: "https://i.pravatar.cc/40?u=staff7",
        role: "Nhân viên",
        last_seen: "Đã mời 1 ngày trước",
        status: "invited",
        fanpages: makeFanpages(7)
    },
    {
        id: "8",
        name: "Hương Phạm",
        avatar: "https://i.pravatar.cc/40?u=staff8",
        role: "Admin",
        last_seen: "Đã mời 3 ngày trước",
        status: "invited",
        fanpages: makeFanpages(8)
    }
]
